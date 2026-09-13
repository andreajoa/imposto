import { useEffect, useMemo, useRef, useState } from 'react'

let stripeScriptPromise

function loadStripeScript() {
  if (window.Stripe) return Promise.resolve(window.Stripe)
  if (stripeScriptPromise) return stripeScriptPromise

  stripeScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/'
    script.async = true
    script.onload = () => window.Stripe ? resolve(window.Stripe) : reject(new Error('Stripe.js não carregou corretamente.'))
    script.onerror = () => reject(new Error('Não foi possível carregar o checkout seguro do Stripe.'))
    document.head.appendChild(script)
  })

  stripeScriptPromise = stripeScriptPromise.catch((error) => {
    stripeScriptPromise = null
    throw error
  })
  return stripeScriptPromise
}

async function resolvePublishableKey() {
  const buildKey =
    import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY ||
    import.meta.env?.VITE_STRIPE_PUBLIC_KEY ||
    ''

  try {
    const response = await fetch('/api/stripe-config', {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    const payload = await response.json().catch(() => ({}))
    if (response.ok && payload.publishableKey) return payload.publishableKey
    if (buildKey) return buildKey
    throw new Error(payload.error || 'A chave pública do Stripe não foi encontrada no ambiente de produção.')
  } catch (error) {
    if (buildKey) return buildKey
    throw error
  }
}

export default function EmbeddedStripeCheckout({ items, onReady }) {
  const [attempt, setAttempt] = useState(0)
  const mountRef = useRef(null)
  const checkoutRef = useRef(null)
  const [state, setState] = useState({ status: 'loading', message: 'Preparando seu checkout seguro…' })

  const productIds = useMemo(() => items.map((item) => item.id).sort(), [items])
  const productKey = productIds.join('|')

  useEffect(() => {
    let active = true

    const start = async () => {
      if (!productIds.length || !mountRef.current) return
      setState({ status: 'loading', message: 'Preparando seu checkout seguro…' })

      try {
        // Resolve the server session before mounting Stripe, so API failures do not
        // leave its iframe waiting for a client secret until it times out.
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ productIds }),
          cache: 'no-store',
          signal: AbortSignal.timeout(25000),
        })
        const payload = await response.json().catch(() => ({}))
        if (!response.ok || !payload.clientSecret) {
          const reference = payload.reference ? ` Referência: ${payload.reference}.` : ''
          throw new Error((payload.error || 'Não foi possível iniciar o pagamento.') + reference)
        }
        if (!active) return
        const [publishableKey, Stripe] = await Promise.all([resolvePublishableKey(), loadStripeScript()])
        if (!active) return
        const stripe = Stripe(publishableKey)
        const checkout = await stripe.initEmbeddedCheckout({ clientSecret: payload.clientSecret })

        if (!active) {
          checkout.destroy?.()
          return
        }

        checkoutRef.current = checkout
        checkout.mount(mountRef.current)
        setState({ status: 'ready', message: '' })
        onReady?.()
      } catch (error) {
        if (!active) return
        setState({
          status: 'error',
          message: error?.message || 'Não foi possível abrir o checkout agora.',
        })
      }
    }

    start()

    return () => {
      active = false
      checkoutRef.current?.destroy?.()
      checkoutRef.current = null
      if (mountRef.current) mountRef.current.innerHTML = ''
    }
  }, [productKey, attempt])

  return (
    <div className="embedded-stripe-shell">
      {state.status === 'loading' && (
        <div className="embedded-stripe-state">
          <span className="embedded-stripe-spinner" aria-hidden="true" />
          <p>{state.message}</p>
        </div>
      )}

      {state.status === 'error' && (
        <div className="embedded-stripe-state embedded-stripe-state--error" role="alert">
          <strong>Não foi possível abrir o pagamento</strong>
          <p>{state.message}</p>
          <button type="button" onClick={() => setAttempt((value) => value + 1)}>Tentar novamente</button>
          <small>Precisa de ajuda? support@express-solution.com</small>
        </div>
      )}

      <div ref={mountRef} className="embedded-stripe-mount" aria-live="polite" />
    </div>
  )
}
