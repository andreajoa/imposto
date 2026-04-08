import Book3D from './Book3D'

export default function Hero() {
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
            <a href="#contato" className="btn-primary">Quero o Guia Completo →</a>
            <a href="#conteudo" className="btn-secondary">Ver Conteúdo</a>
          </div>
        </div>
        <Book3D />
      </div>
    </section>
  )
}
