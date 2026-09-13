import { PRODUCT_DEFS, json, normalizeProductIds, resolveStripePrice, stripeRequest } from '../_lib/products.js'

function normalizeEnv(source = {}) {
  return {
    ...source,
    STRIPE_SECRET_KEY:
      source.STRIPE_SECRET_KEY ||
      source.STRIPE_SECRET ||
      source.STRIPE_SK ||
      '',
  }
}

async function createCheckout(body, env, origin) {
  const productIds = normalizeProductIds(body?.productIds)
  if (!productIds.length) return { status: 400, data: { error: 'Selecione pelo menos um produto.' } }
  if (!env.STRIPE_SECRET_KEY) return { status: 503, data: { error: 'Checkout não configurado.' } }

  const resolved = []
  for (const productId of productIds) {
    const product = PRODUCT_DEFS[productId]
    const price = await resolveStripePrice(product, env)
    if (!price) {
      return {
        status: 409,
        data: { error: `Produto ainda não habilitado no Stripe: ${product.title}` },
      }
    }
    resolved.push({ product, price })
  }

  const params = new URLSearchParams()
  params.set('ui_mode', 'embedded_page')
  params.set('mode', 'payment')
  params.set('customer_creation', 'always')
  params.set('billing_address_collection', 'auto')
  params.set('return_url', `${String(env.SITE_URL || origin).replace(/\/$/, '')}/obrigado?session_id={CHECKOUT_SESSION_ID}`)
  params.set('metadata[product_ids]', productIds.join(','))

  resolved.forEach(({ product, price }, index) => {
    if (price.id) {
      params.set(`line_items[${index}][price]`, price.id)
    } else {
      params.set(`line_items[${index}][price_data][currency]`, price.currency || product.currency || 'usd')
      params.set(`line_items[${index}][price_data][unit_amount]`, String(price.unit_amount))
      params.set(`line_items[${index}][price_data][product_data][name]`, product.title)
      params.set(`line_items[${index}][price_data][product_data][metadata][catalog_id]`, product.id)
    }
    params.set(`line_items[${index}][quantity]`, '1')
  })

  try {
    const session = await stripeRequest(env, '/v1/checkout/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })

    if (!session.client_secret) {
      return { status: 502, data: { error: 'O Stripe não retornou um client secret para o checkout embutido.' } }
    }

    return { status: 200, data: { clientSecret: session.client_secret } }
  } catch (error) {
    console.error('Stripe checkout error', error.message)
    return { status: 502, data: { error: error.message || 'Não foi possível iniciar o pagamento agora.' } }
  }
}

export async function onRequestPost({ request, env }) {
  let body = {}
  try { body = await request.json() } catch { return json({ error: 'Pedido inválido.' }, 400) }

  const result = await createCheckout(body, normalizeEnv(env), new URL(request.url).origin)
  return json(result.data, result.status)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  let body = req.body || {}
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { return res.status(400).json({ error: 'Pedido inválido.' }) }
  }

  const proto = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim()
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || 'www.express-solution.com').split(',')[0].trim()
  const origin = `${proto}://${host}`

  const result = await createCheckout(body, normalizeEnv(process.env), origin)
  return res.status(result.status).json(result.data)
}
