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

  return stripeScriptPromise
}

export default function EmbeddedStripeCheckout({ items, onReady }) {
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
        const configResponse = await fetch('/api/stripe-config', { headers: { Accept: 'application/json' } })
        const config = await configResponse.json().catch(() => ({}))
        if (!configResponse.ok || !config.publishableKey) {
          throw new Error(config.error || 'O checkout ainda não foi configurado para pagamentos embutidos.')
        }

        const Stripe = await loadStripeScript()
        if (!active) return

        const stripe = Stripe(config.publishableKey)
        const checkout = await stripe.initEmbeddedCheckout({
          fetchClientSecret: async () => {
            const response = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify({ productIds }),
            })
            const payload = await response.json().catch(() => ({}))
            if (!response.ok || !payload.clientSecret) {
              throw new Error(payload.error || 'Não foi possível iniciar o pagamento.')
            }
            return payload.clientSecret
          },
        })

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
  }, [productKey])

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
          <strong>Checkout indisponível</strong>
          <p>{state.message}</p>
          <small>Se o problema persistir, escreva para support@express-solution.com.</small>
        </div>
      )}

      <div ref={mountRef} className="embedded-stripe-mount" aria-live="polite" />
    </div>
  )
}
