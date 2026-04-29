const withGuide = [
  'Entende o que declarar e o que deduzir',
  'Evita erros que causam multas e problemas',
  'Maximiza seu reembolso legalmente',
  'Organiza seus documentos com facilidade',
  'Aprende em português, direto ao ponto',
]

const withoutGuide = [
  'Paga mais imposto do que deveria',
  'Corre risco de cair na malha fina',
  'Perde deduções e créditos importantes',
  'Desorganização e estresse na hora da tax',
  'Informações confusas e desencontradas',
]

const chapters = [
  { num: '01', title: 'Entenda o Sistema', desc: 'Como o IRS funciona e o que você precisa saber.' },
  { num: '02', title: 'Organize sua Vida', desc: 'Documentos, prazos e planejamento financeiro.' },
  { num: '03', title: 'Pague Menos Legalmente', desc: 'Deduções e créditos que fazem diferença.' },
  { num: '04', title: 'Evite os Erros', desc: 'Erros comuns que custam caro e como evitá-los.' },
  { num: '05', title: 'Declaração Passo a Passo', desc: 'Do início ao envio, sem complicação.' },
  { num: '06', title: 'E muito mais!', desc: 'Bônus, checklists e exemplos práticos.' },
]

export default function Learn() {
  return (
    <section className="section learn" id="conteudo">
      <div className="section-inner">
        <div className="comparison-row">
          <div className="comparison-card dark">
            <div className="section-label">Com este guia</div>
            <ul>
              {withGuide.map((item, i) => <li key={i}>✓ {item}</li>)}
            </ul>
            <strong>Confiança, economia e tranquilidade.</strong>
          </div>

          <div className="vs-badge">VS</div>

          <div className="comparison-card light">
            <div className="section-label">Sem este guia</div>
            <ul>
              {withoutGuide.map((item, i) => <li key={i}>✕ {item}</li>)}
            </ul>
            <strong>Mais custos, riscos e preocupações.</strong>
          </div>
        </div>

        <div className="section-header-center content-heading">
          <div className="section-label">O que você vai encontrar</div>
          <h2 className="section-title">8+ capítulos que descomplicam sua declaração</h2>
        </div>

        <div className="chapter-strip">
          {chapters.map((c, i) => (
            <div className="chapter-card" key={i}>
              <span>{c.num}</span>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
