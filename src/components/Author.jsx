export default function Author() {
  return (
    <section className="section author-section" id="autora">
      <div className="author-inner">
        <div className="author-photo-wrap">
          <img src="/image/autora.png" alt="Kelly Marques" className="author-photo" />
          <div className="signature">Kelly Marques</div>
        </div>

        <div className="author-info">
          <div className="section-label">Conheça a autora</div>
          <h3>Kelly Marques</h3>
          <div className="author-role">Preparadora de Impostos</div>
          <p>
            Com anos de experiência atendendo famílias imigrantes nos Estados Unidos, Kelly entende as dificuldades e medos de quem chega sem entender o sistema tributário americano.
          </p>
          <p>
            Criou este guia para que pessoas como você — que trabalham duro e querem fazer o certo — tenham acesso a informações claras, em português e baseadas em dados reais.
          </p>
        </div>

        <div className="author-points">
          <div>👩‍💼 Especialista em impostos</div>
          <div>🇧🇷 Conteúdo 100% em português</div>
          <div>📊 Exemplos reais e práticos</div>
          <div>💬 Foco em imigrantes brasileiros</div>
        </div>
      </div>
    </section>
  )
}
