import { useCart } from '../context/CartContext'

export default function CartSlideOut() {
  const { items, isOpen, closeCart, removeFromCart, total } = useCart()

  const handleCheckout = () => {
    // Stripe checkout URL — replace with your actual Stripe Payment Link
    const STRIPE_URL = 'https://buy.stripe.com/YOUR_PAYMENT_LINK_HERE'
    window.open(STRIPE_URL, '_blank')
    closeCart()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? 'active' : ''}`}
        onClick={closeCart}
      />

      {/* Cart Panel */}
      <aside className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>🛒 Seu Carrinho</h3>
          <button className="cart-close" onClick={closeCart}>✕</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>
              <p>Seu carrinho está vazio</p>
              <button className="btn-secondary" onClick={closeCart}>
                ← Continuar navegando
              </button>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p className="cart-item-author">Por {item.author} — {item.authorRole || 'Autor'}</p>
                  <p className="cart-item-desc">{item.description}</p>
                  <p className="cart-item-price">
                    <strong>${item.price.toFixed(2)}</strong>
                    <span className="cart-item-price-original">${item.originalPrice?.toFixed(2) || ''}</span>
                  </p>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={removeFromCart}
                  title="Remover"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button className="btn-cart-checkout" onClick={handleCheckout}>
              🔒 Pagar com Stripe
            </button>
            <p className="cart-secure">
              🔐 Pagamento seguro • Acesso imediato após confirmação
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
