const proofs = [
  { num: '8+', label: 'Capítulos Completos' },
  { num: '11', label: 'Ferramentas Práticas' },
  { num: '100%', label: 'Em Português' },
  { num: '2027', label: 'Ano Fiscal Atualizado' },
]

export default function ProofBar() {
  return (
    <div className="proof-bar">
      <div className="proof-inner">
        {proofs.map((p, i) => (
          <div className="proof-item" key={i}>
            <strong>{p.num}</strong>
            <span>{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
