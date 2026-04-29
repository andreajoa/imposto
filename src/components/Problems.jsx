const problems = [
  { icon: '😰', title: 'Medo de errar a declaração', desc: 'Você não sabe quais formulários usar, o que declarar ou se está esquecendo algo importante.' },
  { icon: '💸', title: 'Dinheiro perdido todo ano', desc: 'Créditos, deduções e benefícios ficam de fora por falta de informação clara.' },
  { icon: '📋', title: 'Bagunça com documentos', desc: 'W-2, 1099, Schedule C, ITIN, SSN e recibos parecem difíceis de organizar.' },
  { icon: '🇧🇷', title: 'Tudo em inglês, nada claro', desc: 'As informações do IRS são complexas. Este guia traduz isso para uma linguagem simples.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Dependentes e família', desc: 'Erros com filhos, cônjuge ou pais podem custar milhares de dólares em créditos perdidos.' },
  { icon: '🏢', title: 'Trabalha por conta própria?', desc: 'Uber, delivery, limpeza, salão e serviços têm regras diferentes. Sem orientação, você pode pagar mais.' },
]

export default function Problems() {
  return (
    <section className="section problems" id="problemas">
      <div className="section-inner split-intro">
        <div>
          <div className="section-label">Por que este guia existe?</div>
          <h2 className="section-title">Mais do que informação. É clareza que vira dinheiro no seu bolso.</h2>
          <p className="section-desc">
            Milhares de brasileiros nos EUA cometem erros caros na declaração de imposto. Não por falta de inteligência, mas por falta de orientação clara em português.
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
