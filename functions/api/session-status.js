import { PRODUCT_DEFS, getDownloadUrl, json, normalizeProductIds, stripeRequest } from '../_lib/products.js'

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

async function lookupSession(sessionId, env) {
  if (!sessionId.startsWith('cs_')) {
    return { status: 400, data: { error: 'Sessão de pagamento inválida.' } }
  }
  if (!env.STRIPE_SECRET_KEY) {
    return { status: 503, data: { error: 'Stripe não configurado.' } }
  }

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

    return {
      status: 200,
      data: {
        status: session.status,
        paymentStatus: session.payment_status,
        paid,
        customerEmail: session.customer_details?.email || '',
        products,
      },
    }
  } catch (error) {
    console.error('Stripe session lookup error', error.message)
    return { status: 502, data: { error: 'Não foi possível confirmar este pagamento.' } }
  }
}

export async function onRequestGet({ request, env }) {
  const sessionId = new URL(request.url).searchParams.get('session_id') || ''
  const result = await lookupSession(sessionId, normalizeEnv(env))
  return json(result.data, result.status)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const url = new URL(req.url, `https://${req.headers.host || 'www.express-solution.com'}`)
  const sessionId = url.searchParams.get('session_id') || ''
  const result = await lookupSession(sessionId, normalizeEnv(process.env))
  return res.status(result.status).json(result.data)
}
