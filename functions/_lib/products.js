export const PRODUCT_DEFS = {
  'guia-impostos': {
    id: 'guia-impostos',
    title: 'Guia Completo de Impostos para Imigrantes nos EUA',
    shortTitle: 'Guia de Impostos',
    priceEnv: 'STRIPE_PRICE_GUIA_IMPOSTOS',
    route: '/',
    image: '/image/book-cover-cart.svg',
    downloadUrl: '/guia-impostos-imigrantes-eua-padded.pdf',
    orderBumpIds: ['abertura-empresa'],
    crossSellIds: ['abertura-empresa'],
  },
  'abertura-empresa': {
    id: 'abertura-empresa',
    title: 'Abertura de Empresa nos EUA',
    shortTitle: 'Abertura de Empresa nos EUA',
    priceEnv: 'STRIPE_PRICE_ABERTURA_EMPRESA',
    route: '/abertura-de-empresa-nos-eua',
    image: '/image/book-cover-business.svg',
    downloadUrlEnv: 'DOWNLOAD_ABERTURA_EMPRESA_URL',
    orderBumpIds: ['guia-impostos'],
    crossSellIds: ['guia-impostos'],
  },
}

export function getPriceId(product, env) {
  return product?.priceEnv ? env[product.priceEnv] || '' : ''
}

export function getDownloadUrl(product, env) {
  if (!product) return ''
  if (product.downloadUrl) return product.downloadUrl
  if (product.downloadUrlEnv) return env[product.downloadUrlEnv] || ''
  return ''
}

export function normalizeProductIds(value) {
  const list = Array.isArray(value) ? value : []
  const unique = [...new Set(list.map((item) => String(item || '').trim()).filter(Boolean))]
  return unique.filter((id) => Boolean(PRODUCT_DEFS[id])).slice(0, 8)
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

export async function stripeRequest(env, path, options = {}) {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY não configurada.')
  }

  const response = await fetch(`https://api.stripe.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      ...(options.headers || {}),
    },
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(payload?.error?.message || 'Stripe request failed.')
    error.status = response.status
    throw error
  }

  return payload
}
