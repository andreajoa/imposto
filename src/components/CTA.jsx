import { useCart, BOOK } from '../context/CartContext'

export default function CTA() {
  const { addToCart } = useCart()

  return (
    <section className="cta-section" id="contato">
      <div className="cta-inner">
        <div className="cta-product-mini">
          <img src="/image/book-cover-cart.svg" alt="Guia Completo de Impostos para Imigrantes nos EUA" />
          <div>
            <h3>Guia Completo de Impostos para Imigrantes nos EUA</h3>
            <p>PDF • Acesso imediato • Em português</p>
          </div>
        </div>

        <div className="cta-price-box">
          <span>Por apenas</span>
          <strong>$6.99 <small>USD</small></strong>
          <p>Pagamento único • Acesso vitalício</p>
        </div>

        <button className="btn-primary cta-final-button" onClick={addToCart}>
          🛒 Quero o Guia Completo
        </button>

        <p className="secure-note">🔒 Compra segura via Stripe</p>
        <p className="cta-author">Por {BOOK.author} — {BOOK.authorRole}</p>
      </div>
    </section>
  )
}
