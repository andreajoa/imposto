import { PRODUCT_DEFS, getPriceId, json, normalizeProductIds, stripeRequest } from '../_lib/products.js'

export async function onRequestPost({ request, env }) {
  let body = {}
  try { body = await request.json() } catch { return json({ error: 'Pedido inválido.' }, 400) }

  const productIds = normalizeProductIds(body.productIds)
  if (!productIds.length) return json({ error: 'Selecione pelo menos um produto.' }, 400)
  if (!env.STRIPE_SECRET_KEY) return json({ error: 'Checkout não configurado.' }, 503)

  const params = new URLSearchParams()
  params.set('ui_mode', 'embedded_page')
  params.set('mode', 'payment')
  params.set('customer_creation', 'always')
  params.set('billing_address_collection', 'auto')
  params.set('return_url', `${String(env.SITE_URL || new URL(request.url).origin).replace(/\/$/, '')}/obrigado?session_id={CHECKOUT_SESSION_ID}`)
  params.set('metadata[product_ids]', productIds.join(','))

  for (let index = 0; index < productIds.length; index += 1) {
    const product = PRODUCT_DEFS[productIds[index]]
    const priceId = getPriceId(product, env)
    if (!priceId) return json({ error: `Produto ainda não habilitado: ${product.title}` }, 409)
    params.set(`line_items[${index}][price]`, priceId)
    params.set(`line_items[${index}][quantity]`, '1')
  }

  try {
    const session = await stripeRequest(env, '/v1/checkout/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    return json({ clientSecret: session.client_secret })
  } catch (error) {
    console.error('Stripe checkout error', error.message)
    return json({ error: 'Não foi possível iniciar o pagamento agora.' }, 502)
  }
}
