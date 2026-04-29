const tools = [
  { num: '01', icon: '📋', title: 'Checklist de Documentos' },
  { num: '02', icon: '📁', title: 'Organize sua Vida' },
  { num: '03', icon: '🧾', title: 'Lista de Recebíveis' },
  { num: '04', icon: '🧮', title: 'Guia de Retenções' },
  { num: '05', icon: '👨‍👩‍👧‍👦', title: 'Q&A Família' },
  { num: '06', icon: '💼', title: 'Deduções de Trabalho' },
  { num: '07', icon: '🏥', title: 'Despesas Médicas' },
  { num: '08', icon: '🏠', title: 'Despesas de Imóvel' },
  { num: '09', icon: '📄', title: 'Declaração Passo a Passo' },
  { num: '10', icon: '🚗', title: 'Controle de Quilometragem' },
  { num: '11', icon: '📦', title: 'Controle de Recibos' },
]

export default function Tools() {
  return (
    <section className="section tools" id="ferramentas">
      <div className="section-inner tools-inner">
        <div className="tools-copy">
          <div className="section-label">Ferramentas práticas</div>
          <h2>11 ferramentas práticas para usar o ano inteiro</h2>
          <p>
            Não é só leitura. São checklists, controles e modelos para você se organizar antes, durante e depois da temporada de impostos.
          </p>
        </div>

        <div className="tools-grid">
          {tools.map((t, i) => (
            <div className="tool-card" key={i}>
              <div className="tool-top">
                <span>{t.num}</span>
                <strong>{t.icon}</strong>
              </div>
              <h4>{t.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
