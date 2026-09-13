export default function ThankYou() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/guia-impostos-imigrantes-eua-padded.pdf'
    link.download = 'Guia-Completo-Impostos-Imigrantes-EUA-Kelly-Moraes.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="thankyou-premium-page">
      <header className="thankyou-nav">
        <a href="/" className="thankyou-logo">Express<span>Solution</span></a>
        <div className="thankyou-nav-links">
          <a href="/">Página inicial</a>
          <a href="/#conteudo">Conteúdo</a>
          <a href="/#autora">Autora</a>
        </div>
      </header>

      <section className="thankyou-hero-option">
        <div className="thankyou-hero-inner">
          <div className="thankyou-hero-copy">
            <div className="thankyou-success-icon">✓</div>
            <div className="thankyou-label">Compra confirmada</div>
            <h1>Compra confirmada com sucesso!</h1>
            <p>
              Seu pagamento foi aprovado e o Guia Completo de Impostos para Imigrantes nos EUA já está pronto para você acessar.
            </p>

            <div className="thankyou-email-note">
              <span>✉️</span>
              <div>
                <strong>Enviamos os detalhes da sua compra para o e-mail informado.</strong>
                <small>Verifique também sua caixa de spam ou promoções.</small>
              </div>
            </div>
          </div>

          <div className="thankyou-book-area">
            <img
              src="/image/mockup-apostila.png"
              alt="Guia Completo de Impostos para Imigrantes nos EUA"
              className="thankyou-book-img"
            />
          </div>
        </div>
      </section>

      <main className="thankyou-main">
        <section className="thankyou-download-card">
          <div className="thankyou-download-copy">
            <h2>Seu guia está pronto!</h2>
            <p>Baixe agora e comece a organizar sua vida financeira.</p>
          </div>

          <div className="thankyou-download-actions">
            <button className="thankyou-download-button" onClick={handleDownload}>
              ⬇️ Baixar meu guia agora
            </button>
            <p>Download imediato • Formato PDF • Acesso ilimitado</p>
          </div>

          <div className="thankyou-secondary-actions">
            <a href="/" className="thankyou-outline-button">📄 Voltar para o site</a>
            <a href="mailto:support@express-solution.com" className="thankyou-outline-button">
              ✉️ Falar com a Express Solution
            </a>
          </div>
        </section>

        <section className="thankyou-steps-section">
          <div className="thankyou-section-heading">
            <span>Próximos passos</span>
            <h2>O que fazer agora</h2>
          </div>

          <div className="thankyou-steps-grid">
            <div className="thankyou-step-card">
              <div className="thankyou-step-number">1</div>
              <div className="thankyou-step-icon">📄</div>
              <h3>Baixe seu guia PDF</h3>
              <p>Clique no botão acima para baixar o Guia Completo de Impostos para Imigrantes nos EUA.</p>
            </div>

            <div className="thankyou-step-card">
              <div className="thankyou-step-number">2</div>
              <div className="thankyou-step-icon">📁</div>
              <h3>Salve em um lugar seguro</h3>
              <p>Guarde o arquivo no celular, computador ou nuvem para acessar sempre que precisar.</p>
            </div>

            <div className="thankyou-step-card">
              <div className="thankyou-step-number">3</div>
              <div className="thankyou-step-icon">📖</div>
              <h3>Comece pelos primeiros capítulos</h3>
              <p>Siga a ordem sugerida e aplique as ferramentas para reduzir erros de organização fiscal.</p>
            </div>
          </div>
        </section>

        <section className="thankyou-trust-strip">
          <div><strong>🛡️ Compra segura</strong><span>Pagamento processado por plataforma segura.</span></div>
          <div><strong>🔓 Acesso imediato</strong><span>Download disponível logo após a confirmação.</span></div>
          <div><strong>✅ Conteúdo em português</strong><span>Informações práticas para brasileiros nos EUA.</span></div>
          <div><strong>✉️ Suporte</strong><span>Contato direto com a Express Solution.</span></div>
        </section>

        <section className="thankyou-author-support">
          <div className="thankyou-author-box">
            <img src="/image/autora.png" alt="Kelly Moraes" />
            <div>
              <span>Conheça a autora</span>
              <h2>Kelly Moraes</h2>
              <strong>Express Solution Tax &amp; Accounting, Inc.</strong>
              <p>
                Kelly produz conteúdos em português para ajudar brasileiros nos Estados Unidos a compreender melhor sua organização tributária e financeira.
              </p>
            </div>
          </div>

          <div className="thankyou-help-box">
            <span>Precisa de ajuda?</span>
            <h3>A equipe da Express Solution está à disposição.</h3>
            <a href="tel:+18572443842">+1 (857) 244-3842</a>
            <a href="mailto:support@express-solution.com">support@express-solution.com</a>
            <p>Atendimento em português para brasileiros nos EUA.</p>
          </div>
        </section>

        <section className="thankyou-final-message">
          <div>♡</div>
          <h2>Obrigada pela sua confiança!</h2>
          <p>Esperamos que o material torne sua jornada mais clara e organizada.</p>
        </section>
      </main>

      <footer className="thankyou-premium-footer">
        <p>© Kelly Moraes — Express Solution Tax &amp; Accounting, Inc. Todos os direitos reservados.</p>
        <p>Este material é educacional e não substitui aconselhamento tributário, jurídico, migratório ou financeiro individualizado.</p>
      </footer>
    </div>
  )
}
