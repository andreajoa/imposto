export default function ThankYou() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/guia-impostos-imigrantes-eua-padded.pdf'
    link.download = 'Guia-Completo-Impostos-Imigrantes-EUA-Kelly-Marques.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="thankyou-premium-page">
      <header className="thankyou-nav">
        <a href="/" className="thankyou-logo">Impostos<span>USA</span></a>
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
            <a
              href="https://wa.me/18572443842?text=Ol%C3%A1%20Kelly!%20Acabei%20de%20comprar%20o%20guia%20e%20preciso%20de%20ajuda."
              className="thankyou-outline-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Falar com Kelly no WhatsApp
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
              <p>Siga a ordem sugerida e aplique as ferramentas para evitar erros e pagar menos impostos.</p>
            </div>
          </div>
        </section>

        <section className="thankyou-trust-strip">
          <div>
            <strong>🛡️ Compra 100% segura</strong>
            <span>Pagamento processado por plataforma segura.</span>
          </div>
          <div>
            <strong>🔓 Acesso imediato</strong>
            <span>Download disponível logo após a confirmação.</span>
          </div>
          <div>
            <strong>✅ Conteúdo confiável</strong>
            <span>Informações práticas para brasileiros nos EUA.</span>
          </div>
          <div>
            <strong>🎧 Suporte dedicado</strong>
            <span>Conte comigo para te ajudar sempre que precisar.</span>
          </div>
        </section>

        <section className="thankyou-author-support">
          <div className="thankyou-author-box">
            <img src="/image/autora.png" alt="Kelly Marques" />
            <div>
              <span>Conheça a autora</span>
              <h2>Kelly Marques</h2>
              <strong>Preparadora de Impostos</strong>
              <p>
                Com anos de experiência atendendo famílias imigrantes nos Estados Unidos, Kelly entende as dificuldades de quem chega e precisa entender o sistema tributário americano.
              </p>
            </div>
          </div>

          <div className="thankyou-help-box">
            <span>Precisa de ajuda?</span>
            <h3>Estou aqui para te apoiar.</h3>
            <a href="https://wa.me/18572443842" target="_blank" rel="noopener noreferrer">
              WhatsApp: (857) 244-3842
            </a>
            <a href="mailto:expressinc1040@gmail.com">
              expressinc1040@gmail.com
            </a>
            <p>Atendimento em português para brasileiros nos EUA.</p>
          </div>
        </section>

        <section className="thankyou-final-message">
          <div>♡</div>
          <h2>Obrigada pela sua confiança!</h2>
          <p>Estou muito feliz em fazer parte da sua jornada financeira aqui nos EUA.</p>
        </section>
      </main>

      <footer className="thankyou-premium-footer">
        <p>© Kelly Marques — Preparadora de Impostos. Todos os direitos reservados.</p>
        <p>Este material não substitui aconselhamento jurídico ou financeiro. Consulte um CPA para orientação específica.</p>
      </footer>
    </div>
  )
}
