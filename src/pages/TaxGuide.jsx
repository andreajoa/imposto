import { useEffect, useMemo, useRef } from 'react'
import { useCart, BOOK } from '../context/CartContext'
import CartSlideOut from '../components/CartSlideOut'
import ContactForm from '../components/ContactForm'
import '../styles/tax-guide.css'

const problems = [
  {
    number: '01',
    title: 'Entender o que realmente precisa ser declarado',
    text: 'Renda, documentos, dependentes, trabalho por conta própria e outras situações ficam mais fáceis de organizar quando você entende a lógica do sistema.',
  },
  {
    number: '02',
    title: 'Parar de perder informação importante pelo caminho',
    text: 'Checklists e modelos ajudam a reunir documentos, comprovantes e dados antes da temporada de impostos virar uma corrida contra o relógio.',
  },
  {
    number: '03',
    title: 'Reconhecer créditos, deduções e cuidados que podem se aplicar',
    text: 'O guia mostra onde olhar e quais perguntas fazer, sem prometer resultado automático ou substituir uma análise profissional individual.',
  },
]

const chapters = [
  ['01', 'Como funciona o sistema', 'Entenda IRS, obrigações, prazos e os conceitos que aparecem na declaração.'],
  ['02', 'Documentos e organização', 'Saiba o que guardar, como separar e como chegar mais preparado à temporada de impostos.'],
  ['03', 'Rendas que precisam de atenção', 'W-2, 1099, trabalho autônomo e outras fontes explicadas em linguagem direta.'],
  ['04', 'Créditos e deduções', 'Aprenda a identificar possibilidades e limites sem confundir benefício fiscal com promessa de reembolso.'],
  ['05', 'Família e dependentes', 'Pontos de atenção para filhos, cônjuge, responsáveis e situações familiares comuns.'],
  ['06', 'Trabalho por conta própria', 'Schedule C, despesas, recibos, quilometragem e organização para quem presta serviços.'],
  ['07', 'Erros que custam caro', 'Falhas de documentação, informação incompleta e decisões tomadas sem entender as consequências.'],
  ['08', 'Planejamento para o ano inteiro', 'Uma rotina prática para não pensar em impostos apenas na época de declarar.'],
]

const tools = [
  'Checklist de documentos',
  'Lista de rendas a declarar',
  'Guia de deduções pessoais',
  'Guia de Schedule C',
  'Controle de quilometragem',
  'Controle de recibos',
  'Perguntas sobre família e dependentes',
  'Despesas médicas',
  'Despesas de imóvel',
  'Modelo de organização anual',
  'Dicas práticas para o cliente',
]

const faq = [
  ['O guia é entregue como?', 'O produto é digital e o acesso é em PDF. Depois da confirmação do pagamento, a entrega deve ser liberada de forma imediata pelo fluxo de compra do site.'],
  ['É só para quem já declara imposto nos EUA?', 'Não. O material foi pensado tanto para quem está começando a entender o sistema quanto para quem já declara e quer se organizar melhor.'],
  ['O guia substitui um preparador de impostos?', 'Não. O conteúdo é educacional e informativo. Situações individuais podem exigir análise profissional específica.'],
  ['O material está em português?', 'Sim. A proposta é explicar conceitos do sistema tributário americano em português claro, mantendo os termos importantes em inglês quando necessário.'],
]

const fillSentence = 'Você não precisa decorar formulários para tomar decisões melhores. Precisa entender o que observar, o que organizar e quando procurar ajuda profissional.'

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

function GuideBookMockup({ compact = false }) {
  return (
    <div className={`tg-book-stage${compact ? ' tg-book-stage--compact' : ''}`}>
      <img
        className="tg-book-premium"
        src="/image/tax-guide-3d.svg"
        alt="Guia Completo de Impostos para Imigrantes nos EUA, por Kelly Moraes"
        loading={compact ? 'lazy' : 'eager'}
        decoding="async"
      />
    </div>
  )
}

export default function TaxGuide() {
  const rootRef = useRef(null)
  const { buyNow } = useCart()
  const purchase = () => buyNow(BOOK.id)

  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: BOOK.title,
    description: 'Guia digital em português sobre organização e compreensão do sistema de impostos nos Estados Unidos.',
    brand: { '@type': 'Brand', name: 'Express Solution Tax & Accounting, Inc.' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: BOOK.price.toFixed(2),
      availability: 'https://schema.org/InStock',
    },
  }), [])

  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute('content') || ''

    document.title = 'Guia Completo de Impostos para Imigrantes nos EUA | Kelly Moraes'
    description?.setAttribute(
      'content',
      'Guia digital em português para brasileiros e imigrantes nos EUA entenderem documentos, rendas, créditos, deduções, organização e cuidados na declaração de impostos.'
    )

    const root = rootRef.current
    if (!root) return undefined

    const progress = root.querySelector('[data-tg-progress]')
    const fillSection = root.querySelector('[data-tg-fill]')
    const words = Array.from(root.querySelectorAll('[data-tg-word]'))
    const stackCards = Array.from(root.querySelectorAll('[data-tg-stack]'))
    const revealItems = Array.from(root.querySelectorAll('[data-tg-reveal]'))
    const lightCards = Array.from(root.querySelectorAll('[data-tg-light]'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let frame = 0
    const update = () => {
      frame = 0
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      if (progress) progress.style.transform = `scaleX(${clamp(scrollTop / maxScroll)})`

      if (fillSection && words.length) {
        const rect = fillSection.getBoundingClientRect()
        const p = clamp((window.innerHeight * 0.78 - rect.top) / (rect.height + window.innerHeight * 0.2))
        const cursor = p * (words.length + 4) - 2
        words.forEach((word, index) => {
          const amount = clamp((cursor - index) / 2.4)
          word.style.opacity = String(0.15 + amount * 0.85)
        })
      }

      if (!reduceMotion) {
        stackCards.forEach((card, index) => {
          const next = stackCards[index + 1]
          if (!next) return
          const pressure = clamp((180 - next.getBoundingClientRect().top) / 220)
          card.style.transform = `scale(${1 - pressure * 0.045})`
          card.style.filter = `brightness(${1 - pressure * 0.12})`
        })
      }
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    }, { threshold: 0.14 })

    revealItems.forEach((item) => observer.observe(item))

    const pointer = (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    lightCards.forEach((card) => card.addEventListener('pointermove', pointer))

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    update()

    return () => {
      document.title = previousTitle
      description?.setAttribute('content', previousDescription)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) cancelAnimationFrame(frame)
      observer.disconnect()
      lightCards.forEach((card) => card.removeEventListener('pointermove', pointer))
    }
  }, [])

  return (
    <div className="tax-guide-page" ref={rootRef}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="tg-progress" aria-hidden="true"><span data-tg-progress /></div>

      <header className="tg-nav">
        <a className="tg-logo" href="#topo" aria-label="Express Solution">
          <img src="/image/express-solution-logo.svg" alt="Express Solution Tax & Accounting, Inc." />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#por-que">Por que este guia</a>
          <a href="#conteudo">Conteúdo</a>
          <a href="#ferramentas">Ferramentas</a>
          <a href="#autora">Autora</a>
        </nav>
        <button className="tg-nav-buy" onClick={purchase}>
          Comprar • ${BOOK.price.toFixed(2)}
        </button>
      </header>

      <main>
        <section className="tg-hero" id="topo">
          <div className="tg-hero-grid" aria-hidden="true" />
          <div className="tg-hero-copy">
            <p className="tg-eyebrow"><span /> Guia digital em português para quem vive nos EUA</p>
            <h1>Impostos nos EUA,<br /><em>sem depender de adivinhação.</em></h1>
            <p className="tg-hero-lead">
              Um guia prático para entender documentos, rendas, créditos, deduções e organização fiscal com uma linguagem clara — antes que a temporada de impostos vire estresse.
            </p>

            <div className="tg-hero-actions">
              <button className="tg-button tg-button--light" onClick={purchase}>Quero o guia completo <span>↗</span></button>
              <a className="tg-button tg-button--ghost" href="#conteudo">Ver o que tem dentro</a>
            </div>

            <div className="tg-price-row">
              <strong>${BOOK.price.toFixed(2)}</strong>
              <span>PDF digital</span>
              <span>Acesso após confirmação</span>
              <span>Conteúdo em português</span>
            </div>

            <div className="tg-hero-proof">
              <div><b>11</b><span>ferramentas práticas</span></div>
              <div><b>8+</b><span>blocos de conteúdo</span></div>
              <div><b>1</b><span>guia para usar o ano inteiro</span></div>
            </div>
          </div>

          <div className="tg-hero-product">
            <GuideBookMockup />
            <div className="tg-floating-note tg-floating-note--one"><strong>PDF</strong><span>leitura imediata</span></div>
            <div className="tg-floating-note tg-floating-note--two"><strong>PT-BR</strong><span>explicado sem juridiquês</span></div>
          </div>
        </section>

        <section className="tg-trust-rail" aria-label="Temas do guia">
          <span>W-2</span><i />
          <span>1099</span><i />
          <span>Schedule C</span><i />
          <span>Dependentes</span><i />
          <span>Deduções</span><i />
          <span>Créditos</span><i />
          <span>Organização anual</span>
        </section>

        <section className="tg-fill" data-tg-fill>
          <p className="tg-index">01 / A ideia central</p>
          <p className="tg-fill-copy">
            {fillSentence.split(' ').map((word, index) => (
              <span data-tg-word key={`${word}-${index}`}>{word} </span>
            ))}
          </p>
        </section>

        <section className="tg-problems" id="por-que">
          <div className="tg-section-head">
            <div>
              <p className="tg-index">02 / Por que este guia existe</p>
              <h2>Da informação solta<br /><em>para uma visão organizada.</em></h2>
            </div>
            <p>O objetivo não é transformar você em especialista tributário. É dar clareza suficiente para você se organizar, fazer perguntas melhores e reconhecer quando uma situação merece análise individual.</p>
          </div>

          <div className="tg-stack">
            {problems.map((item, index) => (
              <article className={`tg-stack-card tg-stack-card--${index + 1}`} data-tg-stack key={item.number}>
                <span className="tg-stack-num">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <span className="tg-stack-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="tg-content" id="conteudo">
          <div className="tg-section-head tg-section-head--light">
            <div>
              <p className="tg-index">03 / O que você vai aprender</p>
              <h2>Um mapa do sistema.<br /><em>Sem excesso de complicação.</em></h2>
            </div>
            <p>O conteúdo foi organizado para você enxergar a declaração como um processo — e não como um monte de siglas desconectadas.</p>
          </div>

          <div className="tg-chapters">
            {chapters.map(([num, title, text]) => (
              <article className="tg-chapter" data-tg-light data-tg-reveal key={num}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <i aria-hidden="true">↘</i>
              </article>
            ))}
          </div>
        </section>

        <section className="tg-tools" id="ferramentas">
          <div className="tg-tools-sticky">
            <p className="tg-index">04 / Ferramentas práticas</p>
            <h2>Não é um PDF para ler e esquecer.</h2>
            <p>O guia reúne materiais de apoio para organizar sua rotina antes, durante e depois da declaração.</p>
            <div className="tg-tools-count"><strong>11</strong><span>ferramentas para consultar quando precisar</span></div>
          </div>

          <div className="tg-tools-list">
            {tools.map((tool, index) => (
              <div className="tg-tool-row" data-tg-reveal key={tool}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{tool}</strong>
                <i>↗</i>
              </div>
            ))}
          </div>
        </section>

        <section className="tg-offer" id="comprar">
          <div className="tg-offer-visual">
            <GuideBookMockup compact />
          </div>

          <div className="tg-offer-card" data-tg-reveal>
            <p className="tg-eyebrow tg-eyebrow--dark"><span /> Acesso digital</p>
            <h2>Guia Completo de Impostos para Imigrantes nos EUA</h2>
            <p>Por Kelly Moraes • Express Solution Tax &amp; Accounting, Inc.</p>

            <div className="tg-offer-price">
              <strong>${BOOK.price.toFixed(2)}</strong>
              <span>pagamento único</span>
            </div>

            <ul>
              <li>PDF digital em português</li>
              <li>8+ blocos de conteúdo prático</li>
              <li>11 ferramentas de organização</li>
              <li>Material pensado para brasileiros e imigrantes nos EUA</li>
              <li>Acesso liberado após confirmação do pagamento</li>
            </ul>

            <button className="tg-button tg-button--dark tg-button--full" onClick={purchase}>
              Comprar o guia agora <span>↗</span>
            </button>
            <small>Pagamento processado com segurança pelo checkout conectado ao site.</small>
          </div>
        </section>

        <section className="tg-author" id="autora">
          <div className="tg-author-photo" data-tg-reveal>
            <img src="/image/autora.png" alt="Kelly Moraes" />
            <div><strong>Kelly Moraes</strong><span>Express Solution Tax &amp; Accounting, Inc.</span></div>
          </div>
          <div className="tg-author-copy" data-tg-reveal>
            <p className="tg-index">05 / Quem está por trás do guia</p>
            <h2>Informação que aproxima o sistema da vida real.</h2>
            <p>Kelly Moraes atua na Express Solution Tax &amp; Accounting, Inc. e desenvolveu este material com foco em uma dificuldade recorrente de brasileiros nos Estados Unidos: encontrar explicações claras, organizadas e em português para temas que costumam chegar de forma fragmentada.</p>
            <blockquote>“A proposta é ajudar você a entender melhor o processo, se organizar e chegar às decisões com mais clareza.”</blockquote>
          </div>
        </section>

        <section className="tg-faq">
          <div className="tg-section-head tg-section-head--compact">
            <div>
              <p className="tg-index">06 / Antes de comprar</p>
              <h2>Perguntas frequentes.</h2>
            </div>
          </div>
          <div className="tg-faq-grid">
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="tg-contact" id="contato">
          <div className="tg-contact-copy">
            <p className="tg-index">07 / Express Solution</p>
            <h2>Ficou com alguma dúvida antes da compra?</h2>
            <p>Envie sua mensagem. O contato será direcionado para <strong>support@express-solution.com</strong>.</p>
          </div>
          <ContactForm variant="dark" compact />
        </section>
      </main>

      <footer className="tg-footer">
        <div>
          <img src="/image/express-solution-logo.svg" alt="Express Solution" />
          <p>Conteúdo educacional e informativo. Situações fiscais específicas podem exigir orientação profissional individual.</p>
        </div>
        <div>
          <span>© 2026 Express Solution Tax &amp; Accounting, Inc.</span>
          <a href="mailto:support@express-solution.com">support@express-solution.com</a>
          <a href="/abertura-de-empresa-nos-eua">Abertura de Empresa nos EUA</a>
        </div>
      </footer>

      <button className="tg-mobile-buy" onClick={purchase}>
        <span>Guia completo</span><strong>${BOOK.price.toFixed(2)} • Comprar</strong>
      </button>

      <CartSlideOut checkoutOnly />
    </div>
  )
}
