export default function Author() {
  return (
    <section className="section author-section" id="autora">
      <div className="author-inner">
        <img src="/image/autora.png" alt="Kelly Moraes" className="author-photo" />
        <div className="author-info">
          <div className="section-label" style={{ color: 'var(--gold-light)' }}>Conheça a autora</div>
          <h3>Kelly Moraes</h3>
          <div className="author-role">Preparadora de Impostos</div>
          <p>
            Com anos de experiência atendendo famílias imigrantes nos Estados Unidos, Kelly entende as dificuldades e medos de quem chega sem entender nada sobre o sistema tributário americano.
          </p>
          <p>
            Criou este guia para que pessoas como você — que trabalham duro e querem fazer o certo — tenham acesso a informações claras, em português e baseadas em dados reais do IRS.
          </p>
          <p>
            <strong style={{ color: 'var(--gold)' }}>Missão:</strong> Ajudar imigrantes a economizar dinheiro e ter tranquilidade financeira nos EUA.
          </p>
        </div>
      </div>
    </section>
  )
}
