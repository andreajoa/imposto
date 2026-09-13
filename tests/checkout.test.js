import test from 'node:test'
import assert from 'node:assert/strict'
import { onRequestPost } from '../functions/api/checkout.js'
import { onRequestGet as status } from '../functions/api/session-status.js'
import { resolveStripePrice, PRODUCT_DEFS } from '../functions/_lib/products.js'
import fs from 'node:fs'

const env = { STRIPE_SECRET_KEY: 'test-placeholder', SITE_URL: 'https://www.express-solution.com' }
const request = (productIds) => new Request('https://www.express-solution.com/api/checkout', {
  method: 'POST', body: JSON.stringify({ productIds }),
})
const price = (id) => ({ id: `price_${id}`, active: true, type: 'one_time', currency: 'usd', unit_amount: 2499 })
const json = (body, status = 200) => new Response(JSON.stringify(body), { status })

test('native Vercel entry points and routing keep API out of SPA fallback', async () => {
  for (const name of ['checkout', 'catalog', 'stripe-config', 'session-status', 'contact']) {
    assert.equal(typeof (await import(`../api/${name}.js`)).default, 'function')
  }
  const config = JSON.parse(fs.readFileSync('vercel.json'))
  assert.equal(config.rewrites, undefined)
  assert.equal(config.cleanUrls, true)
})

test('rejects invalid products and missing configuration', async () => {
  assert.equal((await onRequestPost({ request: request(['unknown']), env })).status, 400)
  assert.equal((await onRequestPost({ request: request(['guia-impostos', 'unknown']), env })).status, 400)
  assert.equal((await onRequestPost({ request: request(['guia-impostos']), env: {} })).status, 503)
})

test('each product and combined checkout use correct Stripe prices and metadata', async () => {
  const original = globalThis.fetch
  try {
    for (const ids of [['guia-impostos'], ['abertura-empresa'], ['guia-impostos', 'abertura-empresa']]) {
      let params
      globalThis.fetch = async (url, options) => {
        if (url.includes('/v1/products?')) return json({ data: Object.values(PRODUCT_DEFS).map(p => ({ id: `prod_${p.id}`, name: p.title, metadata: { catalog_id: p.id }, default_price: price(p.id) })) })
        assert.ok(url.endsWith('/v1/checkout/sessions'))
        params = new URLSearchParams(options.body)
        return json({ client_secret: 'session-secret-placeholder' })
      }
      const response = await onRequestPost({ request: request([...ids, ids[0]]), env })
      assert.equal(response.status, 200)
      assert.equal(params.get('metadata[product_ids]'), ids.join(','))
      ids.forEach((id, index) => assert.equal(params.get(`line_items[${index}][price]`), `price_${id}`))
      assert.equal(params.get('ui_mode'), 'embedded')
      assert.equal(params.get('return_url'), `${env.SITE_URL}/obrigado?session_id={CHECKOUT_SESSION_ID}`)
    }
  } finally { globalThis.fetch = original }
})

test('inactive, recurring and wrong-currency prices cannot be charged', async () => {
  const original = globalThis.fetch
  try {
    for (const patch of [{ active: false }, { type: 'recurring' }, { currency: 'eur' }]) {
      globalThis.fetch = async () => json({ ...price('bad'), ...patch })
      assert.equal(await resolveStripePrice(PRODUCT_DEFS['guia-impostos'], { ...env, STRIPE_PRICE_GUIA_IMPOSTOS: 'price_bad' }), null)
    }
    globalThis.fetch = async () => json({ error: { message: 'Invalid API key' } }, 401)
    const response = await onRequestPost({ request: request(['guia-impostos']), env })
    assert.equal(response.status, 502)
    assert.equal((await response.json()).error.includes('Invalid API key'), false)
  } finally { globalThis.fetch = original }
})

test('only confirmed sessions receive the purchased materials', async () => {
  const original = globalThis.fetch
  try {
    for (const paid of [false, true]) {
      globalThis.fetch = async () => json({ status: paid ? 'complete' : 'open', payment_status: paid ? 'paid' : 'unpaid', metadata: { product_ids: 'abertura-empresa' } })
      const response = await status({ request: new Request('https://www.express-solution.com/api/session-status?session_id=cs_example'), env: { ...env, DOWNLOAD_ABERTURA_EMPRESA_URL: 'https://files.example/business.pdf' } })
      const data = await response.json()
      assert.equal(data.paid, paid)
      assert.deepEqual(data.products.map(p => p.id), ['abertura-empresa'])
      assert.equal(data.products[0].downloadUrl, paid ? 'https://files.example/business.pdf' : '')
      assert.equal(data.products[0].image, '/image/business-opening-cover.png')
    }
  } finally { globalThis.fetch = original }
})

test('invalid return URL is rejected before session creation', async () => {
  const original = globalThis.fetch
  try {
    globalThis.fetch = async () => json({ data: [] })
    const response = await onRequestPost({ request: request(['guia-impostos']), env: { ...env, SITE_URL: 'not-a-url' } })
    assert.equal(response.status, 503)
    assert.equal((await response.json()).reference, 'CHECKOUT_RETURN_URL')
  } finally { globalThis.fetch = original }
})
test('Stripe session rejection returns diagnostic reference without raw secrets', async () => {
  const original = globalThis.fetch
  try {
    globalThis.fetch = async (url) => url.includes('/v1/products?') ? json({ data: [] }) : new Response(JSON.stringify({ error: { message: 'Private diagnostic', type: 'invalid_request_error', code: 'parameter_invalid_empty', param: 'return_url' } }), { status: 400, headers: { 'request-id': 'req_diagnostic' } })
    const response = await onRequestPost({ request: request(['guia-impostos']), env })
    const body = await response.json()
    assert.equal(response.status, 502)
    assert.equal(body.reference, 'req_diagnostic')
    assert.equal(body.parameter, 'return_url')
    assert.equal(body.error.includes('Private diagnostic'), false)
  } finally { globalThis.fetch = original }
})
