const tools = [
  { num: '01', title: 'Checklist de Documentos', desc: 'Nunca mais esqueça um documento na hora de declarar.' },
  { num: '02', title: 'Checklist Anual', desc: 'Planejamento mês a mês para estar sempre preparado.' },
  { num: '03', title: 'Lista de Rendas', desc: 'Todos os tipos de renda que você precisa declarar.' },
  { num: '04', title: 'Quiz de Rendas', desc: 'Teste seus conhecimentos sobre tipos de renda.' },
  { num: '05', title: 'Quiz Familiar', desc: 'Dependentes e childcare — descubra o que você tem direito.' },
  { num: '06', title: 'Dedutível ou Não?', desc: 'Tabela completa do que é e do que não é dedutível.' },
  { num: '07', title: 'Despesas Schedule C', desc: 'Controle de despesas para quem trabalha por conta própria.' },
  { num: '08', title: 'Despesas de Imóvel', desc: 'Controle para quem tem propriedades de aluguel.' },
  { num: '09', title: 'Deduções Pessoais', desc: 'Registro de todas as suas deduções no Form 1040.' },
  { num: '10', title: 'Controle de Quilometragem', desc: 'Modelo completo para registrar cada viagem de negócio.' },
  { num: '11', title: 'Controle de Recibos', desc: 'Organize e digitalize todos os seus recibos fiscais.' },
]

export default function Tools() {
  return (
    <section className="section tools" id="ferramentas">
      <div className="section-inner">
        <div className="section-header-center">
          <div className="section-label">Ferramentas práticas</div>
          <h2 className="section-title">11 ferramentas para usar o ano inteiro</h2>
          <p className="section-desc">
            Não é só leitura — são ferramentas práticas com campos preenchíveis para você organizar sua vida financeira.
          </p>
        </div>
        <div className="tools-grid">
          {tools.map((t, i) => (
            <div className="tool-card" key={i}>
              <div className="tool-num">{t.num}</div>
              <h4>{t.title}</h4>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
