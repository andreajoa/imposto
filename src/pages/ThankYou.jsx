import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartSlideOut from '../components/CartSlideOut'

export default function ThankYou() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id') || ''
  const { catalog, addToCart } = useCart()
  const [session, setSession] = useState({ status: 'loading', data: null, error: '' })

  useEffect(() => {
    let active = true

    if (!sessionId) {
      setSession({ status: 'error', data: null, error: 'Não encontramos uma sessão de pagamento nesta página.' })
      return () => { active = false }
    }

    fetch(`/api/session-status?session_id=${encodeURIComponent(sessionId)}`, { headers: { Accept: 'application/json' } })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(payload.error || 'Não foi possível confirmar o pagamento.')
        return payload
      })
      .then((payload) => {
        if (!active) return
        if (!payload.paid) {
          setSession({ status: 'pending', data: payload, error: '' })
          return
        }
        setSession({ status: 'paid', data: payload, error: '' })
      })
      .catch((error) => {
        if (!active) return
        setSession({ status: 'error', data: null, error: error.message })
      })

    return () => { active = false }
  }, [sessionId])

  const purchasedIds = useMemo(
    () => new Set((session.data?.products || []).map((product) => product.id)),
    [session.data]
  )

  const upsell = useMemo(() => {
    if (session.status !== 'paid') return null
    return Object.values(catalog).find((product) => product.available && !purchasedIds.has(product.id)) || null
  }, [catalog, purchasedIds, session.status])

  const download = (product) => {
    if (!product.downloadUrl) return
    const link = document.createElement('a')
    link.href = product.downloadUrl
    link.download = `${product.title.replace(/[^a-z0-9]+/gi, '-')}-Kelly-Moraes.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (session.status === 'loading') {
    return (
      <div className="thankyou-premium-page thankyou-status-page">
        <div className="thankyou-status-card">
          <span className="embedded-stripe-spinner" />
          <h1>Confirmando seu pagamento…</h1>
          <p>Aguarde alguns segundos enquanto consultamos o Stripe com segurança.</p>
        </div>
      </div>
    )
  }

  if (session.status === 'pending') {
    return (
      <div className="thankyou-premium-page thankyou-status-page">
        <div className="thankyou-status-card">
          <div className="thankyou-success-icon">…</div>
          <h1>Pagamento em processamento</h1>
          <p>O Stripe ainda não marcou esta sessão como paga. Assim que a confirmação for concluída, o acesso será liberado.</p>
          <a className="thankyou-outline-button" href={`/obrigado?session_id=${encodeURIComponent(sessionId)}`}>Verificar novamente</a>
        </div>
      </div>
    )
  }

  if (session.status === 'error') {
    return (
      <div className="thankyou-premium-page thankyou-status-page">
        <div className="thankyou-status-card">
          <h1>Não foi possível liberar o material</h1>
          <p>{session.error}</p>
          <p>Se você concluiu o pagamento, escreva para <a href="mailto:support@express-solution.com">support@express-solution.com</a>.</p>
          <a className="thankyou-outline-button" href="/">Voltar ao site</a>
        </div>
      </div>
    )
  }

  const products = session.data?.products || []

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
            <div className="thankyou-label">Pagamento confirmado pelo Stripe</div>
            <h1>Obrigada pela sua compra!</h1>
            <p>Seu pagamento foi confirmado. Agora você pode escolher entre abrir o PDF online ou baixar o arquivo para guardar no seu dispositivo.</p>
            {session.data?.customerEmail && (
              <div className="thankyou-email-note">
                <span>✉️</span>
                <div>
                  <strong>Compra vinculada a {session.data.customerEmail}</strong>
                  <small>Guarde esta página como referência da sua compra.</small>
                </div>
              </div>
            )}
          </div>

          <div className="thankyou-book-area">
            <img src={products[0]?.image || '/image/tax-guide-cover.png'} alt={products[0]?.title || 'Apostila Express Solution'} className="thankyou-book-img" />
          </div>
        </div>
      </section>

      <main className="thankyou-main">
        <section className="thankyou-download-card">
          <div className="thankyou-download-copy">
            <span>Seus materiais</span>
            <h2>Escolha como quer acessar.</h2>
            <p>Visualize no navegador ou faça o download do PDF.</p>
          </div>

          <div className="thankyou-product-access-list">
            {products.map((product) => (
              <article className="thankyou-product-access" key={product.id}>
                <img src={product.image} alt="" />
                <div>
                  <h3>{product.title}</h3>
                  {product.downloadUrl ? (
                    <div className="thankyou-download-actions">
                      <a className="thankyou-outline-button" href={product.downloadUrl} target="_blank" rel="noreferrer">Abrir PDF online</a>
                      <button className="thankyou-download-button" onClick={() => download(product)}>Baixar PDF</button>
                    </div>
                  ) : (
                    <p>O arquivo desta apostila ainda não está associado ao catálogo de entrega. Entre em contato com o suporte.</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {upsell && (
          <section className="thankyou-upsell">
            <div className="thankyou-upsell-copy">
              <span>Próximo passo</span>
              <h2>Complete sua biblioteca Express Solution.</h2>
              <p>{upsell.title} complementa o conteúdo que você acabou de adquirir e pode ser adicionado em uma nova compra segura sem sair do site.</p>
              <button onClick={() => addToCart(upsell.id)}>Adicionar {upsell.shortTitle} • ${Number(upsell.price).toFixed(2)}</button>
            </div>
            <img src={upsell.image} alt={upsell.title} />
          </section>
        )}

        <section className="thankyou-trust-strip">
          <div><strong>Compra verificada</strong><span>O acesso só aparece depois da confirmação da sessão no Stripe.</span></div>
          <div><strong>Visualizar ou baixar</strong><span>Você escolhe como prefere usar o PDF.</span></div>
          <div><strong>Conteúdo em português</strong><span>Materiais da Express Solution para brasileiros nos EUA.</span></div>
          <div><strong>Suporte</strong><span>support@express-solution.com</span></div>
        </section>

        <section className="thankyou-author-support">
          <div className="thankyou-author-box">
            <img src="/image/autora.png" alt="Kelly Moraes" />
            <div>
              <span>Autora</span>
              <h2>Kelly Moraes</h2>
              <strong>Express Solution Tax &amp; Accounting, Inc.</strong>
              <p>Conteúdo em português para ajudar brasileiros nos Estados Unidos a compreender e organizar melhor temas tributários e empresariais.</p>
            </div>
          </div>

          <div className="thankyou-help-box">
            <span>Precisa de ajuda?</span>
            <h3>A equipe da Express Solution está à disposição.</h3>
            <a href="mailto:support@express-solution.com">support@express-solution.com</a>
            <p>Atendimento em português.</p>
          </div>
        </section>
      </main>

      <footer className="thankyou-premium-footer">
        <p>© Kelly Moraes — Express Solution Tax &amp; Accounting, Inc.</p>
        <p>Material educacional e informativo; não substitui orientação individualizada.</p>
      </footer>

      <CartSlideOut />
    </div>
  )
}
