import Book3D from './Book3D'
import { useCart, BOOK } from '../context/CartContext'

export default function Hero() {
  const { addToCart } = useCart()

  return (
    <section className="hero">
      <div className="hero-bg-glow hero-bg-glow-one"></div>
      <div className="hero-bg-glow hero-bg-glow-two"></div>

      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-badge animate">📋 Guia de Impostos</div>

          <h1 className="animate delay-1">
            Guia Completo de<br />
            Impostos para <em>Imigrantes</em><br />
            nos EUA
          </h1>

          <p className="hero-subtitle animate delay-2">
            Entenda o sistema, evite erros, aumente seu reembolso e organize sua vida financeira com segurança — tudo explicado em português.
          </p>

          <div className="hero-buttons animate delay-3">
            <button className="btn-primary" onClick={addToCart}>
              🛒 Quero o Guia Completo
            </button>
            <a href="#conteudo" className="btn-secondary">Ver conteúdo</a>
          </div>

          <div className="hero-meta animate delay-3">
            <span>💵 $6.99</span>
            <span>⚡ Acesso imediato</span>
            <span>📄 PDF</span>
            <span>🇧🇷 Em português</span>
          </div>

          <p className="hero-author">Por {BOOK.author} — {BOOK.authorRole}</p>
        </div>

        <div className="hero-showcase animate delay-2">
          <div className="hero-card hero-card-left">
            <strong>Passo a passo</strong>
            <span>Do zero à declaração com confiança.</span>
          </div>

          <div className="hero-card hero-card-right top">
            <strong>Em português</strong>
            <span>Linguagem clara, exemplos reais e diretos.</span>
          </div>

          <div className="hero-card hero-card-right bottom">
            <strong>Seguro e atualizado</strong>
            <span>Conteúdo alinhado às regras fiscais vigentes.</span>
          </div>

          <div className="hero-pedestal">
            <Book3D />
          </div>
        </div>
      </div>
    </section>
  )
}
