export default function CTA() {
  return (
    <section className="cta-section" id="contato">
      <div className="cta-inner">
        <div className="section-label">Garanta o seu</div>
        <h2>Comece sua jornada de organização financeira hoje</h2>
        <p>
          Não espere a época de impostos chegar para se preparar. Quanto mais cedo você se organizar, mais dinheiro vai economizar. Este guia é para usar o ano inteiro.
        </p>
        <div className="cta-buttons">
          <a
            href="https://wa.me/18572443842?text=Ol%C3%A1%20Kelly!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Guia%20Completo%20de%20Impostos."
            className="btn-primary"
            target="_blank"
            rel="noopener"
          >
            📱 Falar pelo WhatsApp
          </a>
          <a
            href="mailto:expressinc1040@gmail.com?subject=Guia%20Completo%20de%20Impostos"
            className="btn-secondary"
            style={{ color: 'var(--blue)', borderColor: 'var(--blue)' }}
          >
            ✉️ Enviar E-mail
          </a>
        </div>
        <p className="cta-price">Material digital completo • Entrega imediata • <strong>Atualizado para 2027</strong></p>
      </div>
    </section>
  )
}
