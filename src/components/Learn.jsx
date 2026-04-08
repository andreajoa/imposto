const parts = [
  { icon: '📘', title: 'Parte 1 — Entenda o Sistema', sub: 'Por que declarar • Como o IRS funciona • Glossário completo' },
  { icon: '📗', title: 'Parte 2 — Organize sua Vida', sub: 'Organização durante o ano • Processo de declaração passo a passo' },
  { icon: '📙', title: 'Parte 3 — Pague Menos Legalmente', sub: 'Créditos e deduções • Dependentes • Estratégias para pagar menos' },
  { icon: '📕', title: 'Parte 4 — Evite os Erros', sub: 'Erros comuns que custam dinheiro • Conclusão e próximos passos' },
]

const stats = [
  { value: '$7.830', label: 'EIC máximo (3+ filhos)' },
  { value: '$2.200', label: 'Child Tax Credit' },
  { value: '$0,70', label: 'por milha (IRS)' },
]

export default function Learn() {
  return (
    <section className="section learn" id="conteudo">
      <div className="section-inner">
        <div className="section-header-center">
          <div className="section-label">O que você vai aprender</div>
          <h2 className="section-title">Conteúdo completo, organizado e prático</h2>
          <p className="section-desc">
            8 capítulos + glossário + 11 ferramentas práticas para você usar o ano inteiro.
          </p>
        </div>
        <div className="learn-grid">
          <ul className="learn-list">
            {parts.map((p, i) => (
              <li key={i}>
                <div className="li-icon">{p.icon}</div>
                <div className="li-text">
                  <strong>{p.title}</strong>
                  <span>{p.sub}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="learn-highlight">
            <h3>📊 Números que importam</h3>
            <p>Este guia inclui valores atualizados do IRS para o ano fiscal vigente, incluindo limites de renda, valores de créditos, deduções padrão e taxas de quilometragem.</p>
            <p>Tudo com exemplos reais e em português, para que qualquer pessoa entenda — independentemente do nível de conhecimento.</p>
            <div className="stat-row">
              {stats.map((s, i) => (
                <div className="stat" key={i}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
