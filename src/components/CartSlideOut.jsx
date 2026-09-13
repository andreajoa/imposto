import { useMemo } from 'react'
import { useCart } from '../context/CartContext'
import EmbeddedStripeCheckout from './EmbeddedStripeCheckout'

export default function CartSlideOut() {
  const {
    catalog,
    items,
    isCheckoutOpen,
    total,
    addToCart,
    removeFromCart,
    closeCheckout,
  } = useCart()

  const bumpProduct = useMemo(() => {
    if (!items.length) return null
    const selected = new Set(items.map((item) => item.id))

    for (const item of items) {
      const source = catalog[item.id]
      for (const bumpId of source?.orderBumpIds || []) {
        const candidate = catalog[bumpId]
        if (candidate?.available && typeof candidate.price === 'number' && !selected.has(bumpId)) {
          return candidate
        }
      }
    }

    return null
  }, [catalog, items])

  if (!isCheckoutOpen || !items.length) return null

  return (
    <div className="embedded-checkout-overlay" role="dialog" aria-modal="true" aria-label="Pagamento seguro">
      <div className="embedded-checkout-panel">
        <button className="embedded-checkout-close" onClick={closeCheckout} aria-label="Fechar pagamento">×</button>

        <aside className="embedded-checkout-summary">
          <div className="embedded-checkout-brand">
            <img src="/image/express-solution-logo.svg" alt="Express Solution" />
            <span>Checkout seguro</span>
          </div>

          <div className="embedded-checkout-copy">
            <p>Seu pedido</p>
            <h2>Finalize sua compra sem sair da Express Solution.</h2>
          </div>

          <div className="embedded-checkout-items">
            {items.map((item) => (
              <div key={item.id}>
                <img src={item.image} alt="" />
                <span>
                  <strong>{item.shortTitle}</strong>
                  <small>PDF digital</small>
                </span>
                <b>${Number(item.price || 0).toFixed(2)}</b>
                {items.length > 1 && (
                  <button
                    type="button"
                    className="embedded-checkout-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remover ${item.shortTitle}`}
                  >×</button>
                )}
              </div>
            ))}
          </div>

          {bumpProduct && (
            <section className="embedded-order-bump" aria-label="Oferta complementar">
              <span className="embedded-order-bump-kicker">Adicione ao pedido</span>
              <div className="embedded-order-bump-product">
                <img src={bumpProduct.image} alt="" />
                <div>
                  <strong>{bumpProduct.shortTitle}</strong>
                  <small>Complete sua biblioteca Express Solution</small>
                </div>
                <b>${Number(bumpProduct.price).toFixed(2)}</b>
              </div>
              <button type="button" onClick={() => addToCart(bumpProduct.id)}>
                + Adicionar esta apostila
              </button>
            </section>
          )}

          <div className="embedded-checkout-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <div className="embedded-checkout-trust">
            <span>✓ Pagamento processado pelo Stripe</span>
            <span>✓ Checkout dentro da Express Solution</span>
            <span>✓ PDF liberado depois da confirmação</span>
          </div>
        </aside>

        <section className="embedded-checkout-payment">
          <div className="embedded-checkout-mobile-title">
            <span>Pagamento seguro</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <EmbeddedStripeCheckout items={items} />
        </section>
      </div>
    </div>
  )
}
