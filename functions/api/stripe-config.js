import { json } from '../_lib/products.js'

export function onRequestGet({ env }) {
  if (!env.STRIPE_PUBLISHABLE_KEY) {
    return json({ error: 'STRIPE_PUBLISHABLE_KEY não configurada.' }, 503)
  }

  return json({ publishableKey: env.STRIPE_PUBLISHABLE_KEY })
}
