import { PRODUCT_DEFS, getPriceId, json, stripeRequest } from '../_lib/products.js'

async function hydrateProduct(product, env) {
  const priceId = getPriceId(product, env)
  if (!priceId) {
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
      currency: 'usd',
    }
  }

  try {
    const price = await stripeRequest(env, `/v1/prices/${encodeURIComponent(priceId)}?expand[]=product`)
    return {
      id: product.id,
      title: product.title,
      shortTitle: product.shortTitle,
      route: product.route,
      image: product.image,
      orderBumpIds: product.orderBumpIds,
      crossSellIds: product.crossSellIds,
      configured: true,
      available: Boolean(price.active),
      price: typeof price.unit_amount === 'number' ? price.unit_amount / 100 : null,
      currency: price.currency || 'usd',
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
      configured: true,
      available: false,
      price: null,
      currency: 'usd',
    }
  }
}

export async function onRequestGet({ env }) {
  const products = await Promise.all(Object.values(PRODUCT_DEFS).map((product) => hydrateProduct(product, env)))
  return json({ products })
}
