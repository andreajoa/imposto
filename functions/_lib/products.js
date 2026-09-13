export const PRODUCT_DEFS = {
  'guia-impostos': {
    id: 'guia-impostos',
    title: 'Guia Completo de Impostos para Imigrantes nos EUA',
    shortTitle: 'Guia de Impostos',
    priceEnv: 'STRIPE_PRICE_GUIA_IMPOSTOS', // optional backward compatibility only
    stripeNames: [
      'Guia Completo de Impostos para Imigrantes nos EUA',
      'Guia de Impostos',
      'Guia Completo de Impostos',
    ],
    fallbackUnitAmount: 2499,
    currency: 'usd',
    route: '/',
    image: '/image/tax-guide-cover.png',
    downloadUrl: '/guia-impostos-imigrantes-eua-padded.pdf',
    orderBumpIds: ['abertura-empresa'],
    crossSellIds: ['abertura-empresa'],
  },
  'abertura-empresa': {
    id: 'abertura-empresa',
    title: 'Abertura de Empresa nos EUA',
    shortTitle: 'Abertura de Empresa nos EUA',
    priceEnv: 'STRIPE_PRICE_ABERTURA_EMPRESA', // optional backward compatibility only
    stripeNames: ['Abertura de Empresa nos EUA'],
    currency: 'usd',
    route: '/abertura-de-empresa-nos-eua',
    image: '/image/business-opening-cover.png',
    downloadUrlEnv: 'DOWNLOAD_ABERTURA_EMPRESA_URL',
    orderBumpIds: ['guia-impostos'],
    crossSellIds: ['guia-impostos'],
  },
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

export function getPriceId(product, env) {
  return product?.priceEnv ? env[product.priceEnv] || '' : ''
}

function usablePrice(price, product) {
  return price?.active === true && price.type === 'one_time' &&
    Number.isInteger(price.unit_amount) && price.unit_amount > 0 &&
    price.currency === product.currency && price.product?.active !== false
}

export async function resolveStripePrice(product, env) {
  if (!product) return null

  const explicitPriceId = getPriceId(product, env)
  if (explicitPriceId) {
    const price = await stripeRequest(env, `/v1/prices/${encodeURIComponent(explicitPriceId)}?expand[]=product`)
    return usablePrice(price, product) ? price : null
  }

  try {
    const payload = await stripeRequest(env, '/v1/products?active=true&limit=100&expand[]=data.default_price')
    const acceptedNames = new Set((product.stripeNames || [product.title]).map(normalizeName))
    const stripeProduct = (payload.data || []).find((candidate) => {
      const catalogId = String(candidate?.metadata?.catalog_id || candidate?.metadata?.catalogId || '').trim()
      if (catalogId && catalogId === product.id) return true
      return acceptedNames.has(normalizeName(candidate?.name))
    })

    if (stripeProduct) {
      if (stripeProduct.default_price && typeof stripeProduct.default_price === 'object') {
        const defaultPrice = stripeProduct.default_price
        if (usablePrice(defaultPrice, product)) return defaultPrice
      }

      const productId = stripeProduct.id
      if (productId) {
        const prices = await stripeRequest(
          env,
          `/v1/prices?active=true&limit=20&type=one_time&product=${encodeURIComponent(productId)}`
        )
        const price = (prices.data || []).find((candidate) => usablePrice(candidate, product))
        if (price) return price
      }
    }
  } catch (error) {
    throw error
  }

  if (Number.isInteger(product.fallbackUnitAmount) && product.fallbackUnitAmount > 0) {
    return {
      id: '',
      active: true,
      currency: product.currency || 'usd',
      unit_amount: product.fallbackUnitAmount,
      synthetic: true,
    }
  }

  return null
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
