import Book3D from './Book3D'
import { useCart } from '../context/CartContext'

export default function Hero() {
  const { addToCart } = useCart()

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-badge animate">📚 Guia de Impostos</div>
          <h1 className="animate delay-1">Guia Completo de<br />Impostos para <em>Imigrantes</em><br />nos EUA</h1>
          <p className="hero-subtitle animate delay-2">
            Entenda o sistema, evite erros, aumente seu reembolso e organize sua vida financeira com segurança — tudo explicado em português.
          </p>
          <div className="hero-buttons animate delay-3">
            <button className="btn-primary" onClick={addToCart}>
              🛒 Quero o Guia Completo
            </button>
            <a href="#conteudo" className="btn-secondary">Ver Conteúdo</a>
          </div>
          <p className="hero-price-tag animate delay-3">💰 $4.99 <span className="price-original">(era $26.89)</span> • Entrega imediata • PDF</p>
        </div>
        <Book3D />
      </div>
    </section>
  )
}
