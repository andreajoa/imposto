export default function ThankYou() {
  const handleDownload = () => {
    // Direct download of the PDF
    const link = document.createElement('a')
    link.href = '/guia-impostos-imigrantes-eua.pdf'
    link.download = 'Guia-Completo-Impostos-Imigrantes-EUA-Kelly-Marques.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="thankyou-page">
      {/* Decorative top bar */}
      <div className="thankyou-topbar" />

      <div className="thankyou-container">
        {/* Success animation */}
        <div className="thankyou-icon-wrapper">
          <div className="thankyou-check">✓</div>
          <div className="thankyou-ring" />
        </div>

        <h1 className="thankyou-title">Pagamento Confirmado!</h1>
        <p className="thankyou-subtitle">
          Obrigada por confiar no meu trabalho! 🎉
        </p>

        <div className="thankyou-card">
          <div className="thankyou-card-icon">📚</div>
          <h2>Guia Completo de Impostos para Imigrantes nos EUA</h2>
          <p className="thankyou-card-author">por Kelly Marques</p>
          <p className="thankyou-card-desc">
            Seu material está pronto para download. Clique no botão abaixo para
            receber o PDF completo diretamente no seu dispositivo.
          </p>

          <button className="btn-download" onClick={handleDownload}>
            <span className="btn-download-icon">📥</span>
            <div>
              <strong>Receba seu material agora</strong>
              <span>PDF — Download imediato</span>
            </div>
          </button>
        </div>

        <div className="thankyou-tips">
          <h3>💡 Dicas importantes</h3>
          <ul>
            <li>
              <strong>Salve o arquivo</strong> em um local seguro no seu computador ou celular.
            </li>
            <li>
              <strong>O material é atualizado</strong> — você sempre terá acesso à versão mais recente.
            </li>
            <li>
              <strong>Dúvidas?</strong> Entre em contato pelo{' '}
              <a href="https://wa.me/18572443842" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>{' '}
              ou{' '}
              <a href="mailto:expressinc1040@gmail.com">e-mail</a>.
            </li>
          </ul>
        </div>

        <div className="thankyou-footer">
          <p>© {new Date().getFullYear()} Kelly Marques — Todos os direitos reservados</p>
          <a href="/" className="thankyou-back">← Voltar para a página inicial</a>
        </div>
      </div>
    </div>
  )
}
