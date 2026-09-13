import { PRODUCT_DEFS, json, resolveStripePrice } from '../_lib/products.js'

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

async function hydrateProduct(product, env) {
  try {
    const price = await resolveStripePrice(product, env)
    if (!price) {
      return {
        id: product.id,
        title: product.title,
        shortTitle: product.shortTitle,
        route: product.route,
        image: product.image,
        orderBumpIds: product.orderBumpIds,
        crossSellIds: product.crossSellIds,
        configured: false,
        available: false,
        price: null,
        currency: product.currency || 'usd',
      }
    }

    return {
      id: product.id,
      title: product.title,
      shortTitle: product.shortTitle,
      route: product.route,
      image: product.image,
      orderBumpIds: product.orderBumpIds,
      crossSellIds: product.crossSellIds,
      configured: true,
      available: price.active !== false,
      price: typeof price.unit_amount === 'number' ? price.unit_amount / 100 : null,
      currency: price.currency || product.currency || 'usd',
    }
  } catch (error) {
    console.error('Stripe catalog product error', product.id, error.message)
    return {
      id: product.id,
      title: product.title,
      shortTitle: product.shortTitle,
      route: product.route,
      image: product.image,
      orderBumpIds: product.orderBumpIds,
      crossSellIds: product.crossSellIds,
      configured: false,
      available: false,
      price: null,
      currency: product.currency || 'usd',
    }
  }
}

async function getCatalog(env) {
  return Promise.all(Object.values(PRODUCT_DEFS).map((product) => hydrateProduct(product, env)))
}

export async function onRequestGet({ env }) {
  const products = await getCatalog(normalizeEnv(env))
  return json({ products })
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const products = await getCatalog(normalizeEnv(process.env))
  return res.status(200).json({ products })
}
