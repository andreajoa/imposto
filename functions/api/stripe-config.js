import { json } from '../_lib/products.js'

function getPublishableKey(env) {
  return (
    env.STRIPE_PUBLISHABLE_KEY ||
    env.VITE_STRIPE_PUBLISHABLE_KEY ||
    env.PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    env.STRIPE_PUBLIC_KEY ||
    ''
  )
}

function missingPayload() {
  return {
    error: 'Chave pública do Stripe não encontrada no ambiente de produção.',
    expected: [
      'STRIPE_PUBLISHABLE_KEY',
      'VITE_STRIPE_PUBLISHABLE_KEY',
      'PUBLIC_STRIPE_PUBLISHABLE_KEY',
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
      'STRIPE_PUBLIC_KEY',
    ],
  }
}

export function onRequestGet({ env }) {
  const publishableKey = getPublishableKey(env)
  if (!publishableKey) return json(missingPayload(), 503)
  return json({ publishableKey })
}

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const publishableKey = getPublishableKey(process.env)
  if (!publishableKey) return res.status(503).json(missingPayload())
  return res.status(200).json({ publishableKey })
}
