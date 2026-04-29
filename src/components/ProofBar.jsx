const proofs = [
  { icon: '📖', num: '8+', label: 'Capítulos completos' },
  { icon: '🛠️', num: '11', label: 'Ferramentas práticas' },
  { icon: '🇧🇷', num: '100%', label: 'Em português' },
  { icon: '🛡️', num: 'Sempre', label: 'Atualizado' },
]

export default function ProofBar() {
  return (
    <section className="proof-bar">
      <div className="proof-inner">
        {proofs.map((p, i) => (
          <div className="proof-item" key={i}>
            <div className="proof-icon">{p.icon}</div>
            <strong>{p.num}</strong>
            <span>{p.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
