import { useMemo } from 'react'
import { useCart } from '../context/CartContext'
import EmbeddedStripeCheckout from './EmbeddedStripeCheckout'

export default function CartSlideOut({ checkoutOnly = false }) {
  const {
    catalog,
    items,
    isOpen,
    isCheckoutOpen,
    closeCart,
    removeFromCart,
    total,
    addToCart,
    openCheckout,
    closeCheckout,
  } = useCart()

  const bumpProduct = useMemo(() => {
    if (!items.length) return null
    const inCart = new Set(items.map((item) => item.id))

    for (const item of items) {
      const source = catalog[item.id]
      for (const bumpId of source?.orderBumpIds || []) {
        const candidate = catalog[bumpId]
        if (candidate?.available && typeof candidate.price === 'number' && !inCart.has(bumpId)) {
          return candidate
        }
      }
    }

    return null
  }, [catalog, items])

  return (
    <>
      {!checkoutOnly && (
        <>
          <div className={`cart-backdrop ${isOpen ? 'active' : ''}`} onClick={closeCart} />

          <aside className={`cart-panel ${isOpen ? 'open' : ''}`} aria-label="Carrinho de compras">
            <div className="cart-header">
              <div>
                <small>Express Solution</small>
                <h3>Seu carrinho</h3>
              </div>
              <button className="cart-close" onClick={closeCart} aria-label="Fechar carrinho">✕</button>
            </div>

            <div className="cart-body">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <span className="cart-empty-icon">◇</span>
                  <p>Seu carrinho está vazio.</p>
                  <button className="btn-secondary" onClick={closeCart}>Continuar navegando</button>
                </div>
              ) : (
                <>
                  <div className="cart-items-list">
                    {items.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <div className="cart-item-image">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="cart-item-details">
                          <h4>{item.title}</h4>
                          <p className="cart-item-author">Por {item.author}</p>
                          <p className="cart-item-desc">{item.description}</p>
                          <p className="cart-item-price">
                            <strong>${Number(item.price || 0).toFixed(2)}</strong>
                          </p>
                        </div>
                        <button
                          className="cart-item-remove"
                          onClick={() => removeFromCart(item.id)}
                          title="Remover"
                          aria-label={`Remover ${item.title}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  {bumpProduct && (
                    <section className="cart-order-bump" aria-label="Oferta complementar">
                      <div className="cart-order-bump-label">Adicione ao pedido</div>
                      <div className="cart-order-bump-content">
                        <img src={bumpProduct.image} alt="" />
                        <div>
                          <strong>{bumpProduct.shortTitle}</strong>
                          <span>Complete sua biblioteca Express Solution.</span>
                        </div>
                        <b>${bumpProduct.price.toFixed(2)}</b>
                      </div>
                      <button onClick={() => addToCart(bumpProduct.id)}>
                        + Adicionar esta apostila ao pedido
                      </button>
                    </section>
                  )}
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>
                <button className="btn-cart-checkout" onClick={openCheckout}>
                  Continuar para pagamento seguro
                </button>
                <p className="cart-secure">Stripe embutido • você permanece no site • pagamento criptografado</p>
              </div>
            )}
          </aside>
        </>
      )}

      {isCheckoutOpen && items.length > 0 && (
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
                <h2>Revise e finalize sem sair da Express Solution.</h2>
              </div>

              <div className="embedded-checkout-items">
                {items.map((item) => (
                  <div key={item.id}>
                    <img src={item.image} alt="" />
                    <span><strong>{item.shortTitle}</strong><small>PDF digital</small></span>
                    <b>${Number(item.price || 0).toFixed(2)}</b>
                  </div>
                ))}
              </div>

              <div className="embedded-checkout-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>

              <div className="embedded-checkout-trust">
                <span>✓ Acesso após confirmação</span>
                <span>✓ Checkout hospedado pelo Stripe</span>
                <span>✓ Dados do cartão não passam pelo nosso servidor</span>
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
      )}
    </>
  )
}
