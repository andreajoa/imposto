import { json } from '../_lib/products.js'

export function onRequestGet({ env }) {
  const publishableKey =
    env.STRIPE_PUBLISHABLE_KEY ||
    env.VITE_STRIPE_PUBLISHABLE_KEY ||
    env.PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    env.STRIPE_PUBLIC_KEY ||
    ''

  if (!publishableKey) {
    return json({
      error: 'Chave pública do Stripe não encontrada no ambiente de produção.',
      expected: [
        'STRIPE_PUBLISHABLE_KEY',
        'VITE_STRIPE_PUBLISHABLE_KEY',
        'PUBLIC_STRIPE_PUBLISHABLE_KEY',
        'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
        'STRIPE_PUBLIC_KEY',
      ],
    }, 503)
  }

  return json({ publishableKey })
}
