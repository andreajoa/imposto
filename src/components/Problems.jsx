const problems = [
  { icon: '😰', title: 'Medo de errar a declaração', desc: 'Você não sabe quais formulários usar, o que declarar, ou se está esquecendo algo importante. O medo de cair na malha fina paralisa.' },
  { icon: '💸', title: 'Dinheiro perdido todo ano', desc: 'Você paga mais imposto do que deveria — e nem sabe. Créditos, deduções e benefícios ficam de fora por falta de conhecimento.' },
  { icon: '📋', title: 'Bagunça com documentos', desc: 'W-2, 1099, Schedule C, ITIN, SSN... parece outro idioma. Você não sabe organizar nem preparar a documentação necessária.' },
  { icon: '🇧🇷', title: 'Tudo em inglês, nada claro', desc: 'As informações do IRS são complexas e em inglês. Tradutores automáticos não explicam — só confundem mais.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Dependentes e família', desc: 'Você não sabe se pode declarar seus filhos, cônjuge ou pais. Erros aqui podem custar milhares de dólares em créditos perdidos.' },
  { icon: '🏢', title: 'Trabalha por conta própria?', desc: 'Uber, delivery, limpeza, salão... Se você é autônomo, as regras são diferentes e mais complexas. Sem orientação, você paga o dobro.' },
]

export default function Problems() {
  return (
    <section className="section problems" id="problemas">
      <div className="section-inner">
        <div className="section-header-center">
          <div className="section-label">Você se identifica?</div>
          <h2 className="section-title">Dores de quem chega nos EUA e não entende de impostos</h2>
          <p className="section-desc">
            Milhares de imigrantes brasileiros cometem erros caros na declaração de imposto — não por falta de inteligência, mas por falta de informação clara e em português.
          </p>
        </div>
        <div className="problems-grid">
          {problems.map((p, i) => (
            <div className="problem-card" key={i}>
              <div className="card-icon">{p.icon}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
