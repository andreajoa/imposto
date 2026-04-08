import { useCart } from '../context/CartContext'

export default function CTA() {
  const { addToCart } = useCart()

  return (
    <section className="cta-section" id="contato">
      <div className="cta-inner">
        <div className="section-label">Garanta o seu</div>
        <h2>Comece sua jornada de organização financeira hoje</h2>
        <p>
          Não espere a época de impostos chegar para se preparar. Quanto mais cedo você se organizar, mais dinheiro vai economizar. Este guia é para usar o ano inteiro.
        </p>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={addToCart}>
            🛒 Adicionar ao Carrinho — $4.99
            <span className="btn-price-original">era $26.89</span>
          </button>
          <a
            href="https://wa.me/18572443842?text=Ol%C3%A1%20Kelly!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Guia%20Completo%20de%20Impostos."
            className="btn-secondary"
            target="_blank"
            rel="noopener"
          >
            📱 Dúvidas? Fale pelo WhatsApp
          </a>
        </div>
        <p className="cta-price">Material digital completo • Entrega imediata • <strong>Sempre atualizado</strong></p>
      </div>
    </section>
  )
}
