import { PRODUCT_DEFS, getDownloadUrl, json, normalizeProductIds, stripeRequest } from '../_lib/products.js'

export async function onRequestGet({ request, env }) {
  const sessionId = new URL(request.url).searchParams.get('session_id') || ''
  if (!sessionId.startsWith('cs_')) return json({ error: 'Sessão de pagamento inválida.' }, 400)
  if (!env.STRIPE_SECRET_KEY) return json({ error: 'Stripe não configurado.' }, 503)

  try {
    const session = await stripeRequest(env, `/v1/checkout/sessions/${encodeURIComponent(sessionId)}`)
    const productIds = normalizeProductIds(String(session?.metadata?.product_ids || '').split(','))
    const paid = session.payment_status === 'paid' || session.payment_status === 'no_payment_required'

    const products = productIds.map((id) => {
      const product = PRODUCT_DEFS[id]
      return {
        id,
        title: product.title,
        shortTitle: product.shortTitle,
        route: product.route,
        image: product.image,
        downloadUrl: paid ? getDownloadUrl(product, env) : '',
      }
    })

    return json({
      status: session.status,
      paymentStatus: session.payment_status,
      paid,
      customerEmail: session.customer_details?.email || '',
      products,
    })
  } catch (error) {
    console.error('Stripe session lookup error', error.message)
    return json({ error: 'Não foi possível confirmar este pagamento.' }, 502)
  }
}
