import { PRODUCT_DEFS, json, normalizeProductIds, resolveStripePrice, stripeRequest } from '../_lib/products.js'

export async function onRequestPost({ request, env }) {
  let body = {}
  try { body = await request.json() } catch { return json({ error: 'Pedido inválido.' }, 400) }

  const productIds = normalizeProductIds(body.productIds)
  if (!productIds.length) return json({ error: 'Selecione pelo menos um produto.' }, 400)
  if (!env.STRIPE_SECRET_KEY) return json({ error: 'Checkout não configurado.' }, 503)

  const resolved = []
  for (const productId of productIds) {
    const product = PRODUCT_DEFS[productId]
    const price = await resolveStripePrice(product, env)
    if (!price) return json({ error: `Produto ainda não habilitado no Stripe: ${product.title}` }, 409)
    resolved.push({ product, price })
  }

  const params = new URLSearchParams()
  params.set('ui_mode', 'embedded')
  params.set('mode', 'payment')
  params.set('customer_creation', 'always')
  params.set('billing_address_collection', 'auto')
  params.set('return_url', `${String(env.SITE_URL || new URL(request.url).origin).replace(/\/$/, '')}/obrigado?session_id={CHECKOUT_SESSION_ID}`)
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
    return json({ clientSecret: session.client_secret })
  } catch (error) {
    console.error('Stripe checkout error', error.message)
    return json({ error: error.message || 'Não foi possível iniciar o pagamento agora.' }, 502)
  }
}
