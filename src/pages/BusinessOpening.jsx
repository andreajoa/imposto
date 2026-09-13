import { useEffect, useRef, useState } from 'react'
import ContactForm from '../components/ContactForm'
import '../styles/business-opening.css'

const decisionCards = [
  {
    key: 'sole',
    kicker: 'Estrutura 01',
    title: 'Sole Proprietorship',
    text: 'A forma mais direta de operar individualmente, mas sem criar uma entidade jurídica separada do proprietário.',
    detail: 'Pode ser simples para começar, porém exige atenção especial à responsabilidade pessoal, registros e tributação.',
  },
  {
    key: 'llc',
    kicker: 'Estrutura 02',
    title: 'LLC',
    text: 'Uma estrutura flexível que pode ajudar a separar a empresa do patrimônio pessoal e permite diferentes classificações fiscais.',
    detail: 'Single-Member e Multi-Member LLCs têm diferenças importantes de gestão, documentação e tratamento fiscal padrão.',
  },
  {
    key: 'corp',
    kicker: 'Estrutura 03',
    title: 'Corporation',
    text: 'Entidade jurídica formal, com regras próprias de governança, registro, manutenção e tributação.',
    detail: 'C Corporation e eleição S Corporation não são sinônimos de “empresa grande” ou “empresa pequena”. Elegibilidade importa.',
  },
]

const openingSteps = [
  ['01', 'Defina a operação', 'Onde a empresa realmente atuará, quem será proprietário e qual atividade será exercida.'],
  ['02', 'Escolha a estrutura', 'Compare responsabilidade, gestão, tributação, custos e exigências de manutenção.'],
  ['03', 'Verifique nome e estado', 'Confirme disponibilidade do nome e entenda as regras do estado de formação e do estado de operação.'],
  ['04', 'Formalize a entidade', 'Faça o filing apropriado, organize o Registered Agent e prepare os documentos internos.'],
  ['05', 'Organize a parte fiscal', 'Avalie EIN, classificação fiscal, registros estaduais e obrigações relacionadas aos proprietários.'],
  ['06', 'Separe e mantenha', 'Conta bancária, bookkeeping, comprovantes, calendário de compliance e documentação da empresa.'],
]

const chapters = [
  'Antes de abrir: as decisões que vêm primeiro',
  'Sole Proprietorship sem simplificações perigosas',
  'LLC: o que é, o que não é e por que importa',
  'Single-Member LLC',
  'Multi-Member LLC',
  'Corporation, C Corporation e S Corporation',
  'Qual estado escolher',
  'Do nome ao filing',
  'Conta bancária e bookkeeping',
  'Classificação fiscal',
  'Proprietário estrangeiro e Form 5472',
  'Licenças, insurance e compliance',
  'Erros frequentes',
  'Matriz de decisão e casos práticos',
]

const fillSentence = 'Abrir uma empresa nos Estados Unidos não começa pelo formulário. Começa por entender quem será dono, onde a empresa vai operar, como o negócio será administrado e quais obrigações acompanham cada escolha.'

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

export default function BusinessOpening() {
  const rootRef = useRef(null)
  const [activeStructure, setActiveStructure] = useState('llc')

  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute('content') || ''

    document.title = 'Abertura de Empresa nos EUA — Kelly Moraes | Express Solution'
    description?.setAttribute(
      'content',
      'Guia em português sobre abertura de empresa nos EUA, LLC, Sole Proprietorship, Corporation, EIN, compliance e decisões fiscais. Por Kelly Moraes, Express Solution Tax & Accounting, Inc.'
    )

    const root = rootRef.current
    if (!root) return undefined

    const progress = root.querySelector('[data-scroll-progress]')
    const fillSection = root.querySelector('[data-fill-section]')
    const fillWords = Array.from(root.querySelectorAll('[data-fill-word]'))
    const stackCards = Array.from(root.querySelectorAll('[data-stack-card]'))
    const timeline = root.querySelector('[data-timeline]')
    const timelineFill = root.querySelector('[data-timeline-fill]')
    const timelineItems = Array.from(root.querySelectorAll('[data-timeline-item]'))
    const lightCards = Array.from(root.querySelectorAll('[data-light-card]'))

    let frame = 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const update = () => {
      frame = 0
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      if (progress) progress.style.transform = `scaleX(${clamp(scrollTop / maxScroll)})`

      if (fillSection && fillWords.length) {
        const rect = fillSection.getBoundingClientRect()
        const p = clamp((window.innerHeight * 0.82 - rect.top) / (rect.height + window.innerHeight * 0.25))
        const cursor = p * (fillWords.length + 5) - 2
        fillWords.forEach((word, index) => {
          const amount = clamp((cursor - index) / 2.6)
          word.style.opacity = String(0.18 + amount * 0.82)
        })
      }

      if (!reduceMotion) {
        stackCards.forEach((card, index) => {
          const next = stackCards[index + 1]
          if (!next) return
          const nextRect = next.getBoundingClientRect()
          const pressure = clamp((170 - nextRect.top) / 190)
          card.style.transform = `scale(${1 - pressure * 0.055})`
          card.style.filter = `brightness(${1 - pressure * 0.2})`
        })
      }

      if (timeline && timelineFill) {
        const rect = timeline.getBoundingClientRect()
        const lineProgress = clamp((window.innerHeight * 0.58 - rect.top) / Math.max(1, rect.height))
        timelineFill.style.height = `${lineProgress * 100}%`
        timelineItems.forEach((item) => {
          const itemRect = item.getBoundingClientRect()
          item.classList.toggle('is-active', itemRect.top < window.innerHeight * 0.62)
        })
      }
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const onPointerMove = (event) => {
      const card = event.currentTarget
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }

    lightCards.forEach((card) => card.addEventListener('pointermove', onPointerMove))
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    update()

    return () => {
      document.title = previousTitle
      description?.setAttribute('content', previousDescription)
      lightCards.forEach((card) => card.removeEventListener('pointermove', onPointerMove))
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="business-page" ref={rootRef}>
      <div className="bo-progress" aria-hidden="true"><span data-scroll-progress /></div>

      <header className="bo-nav">
        <a className="bo-brand" href="/" aria-label="Express Solution — página inicial">
          <img src="/image/express-solution-logo.svg" alt="Express Solution Tax & Accounting, Inc." />
        </a>
        <nav aria-label="Navegação da apostila">
          <a href="#estruturas">Estruturas</a>
          <a href="#conteudo">Conteúdo</a>
          <a href="#autora">Autora</a>
          <a className="bo-nav-cta" href="#contato">Fale conosco</a>
        </nav>
      </header>

      <main>
        <section className="bo-hero">
          <div className="bo-hero-orbit bo-hero-orbit--one" aria-hidden="true" />
          <div className="bo-hero-orbit bo-hero-orbit--two" aria-hidden="true" />
          <div className="bo-dot-grid bo-dot-grid--hero" aria-hidden="true" />

          <div className="bo-hero-copy">
            <p className="bo-eyebrow"><span /> Guia profissional em português</p>
            <h1>Abertura de<br /><em>Empresa nos EUA</em></h1>
            <p className="bo-hero-lead">
              Um guia prático para entender estruturas empresariais, organizar a abertura e enxergar as responsabilidades fiscais antes de tomar decisões que afetam o negócio inteiro.
            </p>
            <div className="bo-hero-actions">
              <a className="bo-button bo-button--solid" href="#conteudo">Explorar a apostila <span>↘</span></a>
              <a className="bo-button bo-button--ghost" href="#contato">Falar com a Express Solution</a>
            </div>
            <div className="bo-hero-signature">
              <strong>Kelly Moraes</strong>
              <span>Express Solution Tax &amp; Accounting, Inc.</span>
            </div>
          </div>

          <div className="bo-hero-visual" aria-label="Capa da apostila Abertura de Empresa nos EUA">
            <div className="bo-book-stage">
              <div className="bo-book-shadow" />
              <article className="bo-book">
                <div className="bo-book-spine" aria-hidden="true" />
                <div className="bo-book-cover">
                  <img className="bo-book-logo" src="/image/express-solution-logo.svg" alt="" />
                  <div className="bo-book-title">Abertura de<br />Empresa nos EUA</div>
                  <p>Estruturas, abertura e responsabilidades fiscais.</p>
                  <div className="bo-book-photo-frame">
                    <img src="/image/autora.png" alt="Kelly Moraes" />
                  </div>
                  <div className="bo-book-author">Kelly Moraes</div>
                  <div className="bo-book-company">Express Solution Tax &amp; Accounting, Inc.</div>
                </div>
              </article>
            </div>
            <div className="bo-hero-note bo-hero-note--one"><strong>14</strong><span>capítulos objetivos</span></div>
            <div className="bo-hero-note bo-hero-note--two"><strong>+</strong><span>checklists e matriz de decisão</span></div>
          </div>
        </section>

        <section className="bo-trust-strip" aria-label="Destaques da apostila">
          <span>LLC</span><i />
          <span>Sole Proprietorship</span><i />
          <span>Corporation</span><i />
          <span>EIN</span><i />
          <span>Compliance</span><i />
          <span>Proprietário estrangeiro</span>
        </section>

        <section className="bo-fill" data-fill-section>
          <p className="bo-section-index">01 / O ponto de partida</p>
          <div className="bo-fill-copy">
            {fillSentence.split(' ').map((word, index) => (
              <span data-fill-word key={`${word}-${index}`}>{word} </span>
            ))}
          </div>
          <p className="bo-fill-note">A estrutura certa depende da operação real — e não de uma resposta pronta que serve para todo mundo.</p>
        </section>

        <section className="bo-structure-section" id="estruturas">
          <div className="bo-section-head">
            <div>
              <p className="bo-section-index">02 / Estruturas</p>
              <h2>Três caminhos.<br /><em>Consequências diferentes.</em></h2>
            </div>
            <p>
              A apostila separa conceitos que costumam aparecer misturados nas redes sociais: entidade jurídica, responsabilidade, gestão e classificação fiscal.
            </p>
          </div>

          <div className="bo-stack">
            {decisionCards.map((card, index) => (
              <article className={`bo-stack-card bo-stack-card--${index + 1}`} data-stack-card key={card.key}>
                <div className="bo-stack-number">0{index + 1}</div>
                <div className="bo-stack-body">
                  <p>{card.kicker}</p>
                  <h3>{card.title}</h3>
                  <strong>{card.text}</strong>
                  <span>{card.detail}</span>
                </div>
                <div className="bo-stack-mark" aria-hidden="true">↗</div>
              </article>
            ))}
          </div>
        </section>

        <section className="bo-llc-section">
          <div className="bo-section-head bo-section-head--inverse">
            <div>
              <p className="bo-section-index">03 / LLC</p>
              <h2>Single Member<br />ou Multi Member?</h2>
            </div>
            <p>O número de proprietários muda documentação, decisões internas e o tratamento fiscal federal padrão. Compare sem reduzir tudo a “uma é melhor”.</p>
          </div>

          <div className="bo-expand-panels" role="list" aria-label="Comparação entre tipos de LLC">
            <button
              type="button"
              className={`bo-expand-panel${activeStructure === 'single' ? ' is-active' : ''}`}
              onClick={() => setActiveStructure('single')}
              onMouseEnter={() => setActiveStructure('single')}
            >
              <span className="bo-panel-code">01</span>
              <div>
                <p>LLC</p>
                <h3>Single Member</h3>
                <span>Um proprietário. Por padrão federal, geralmente tratada como disregarded entity para income tax, salvo eleição diferente.</span>
              </div>
            </button>
            <button
              type="button"
              className={`bo-expand-panel${activeStructure === 'llc' ? ' is-active' : ''}`}
              onClick={() => setActiveStructure('llc')}
              onMouseEnter={() => setActiveStructure('llc')}
            >
              <span className="bo-panel-code">VS</span>
              <div>
                <p>Decisão</p>
                <h3>O que realmente comparar</h3>
                <span>Proprietários, gestão, responsabilidades, Operating Agreement, classificação fiscal e obrigações do estado.</span>
              </div>
            </button>
            <button
              type="button"
              className={`bo-expand-panel${activeStructure === 'multi' ? ' is-active' : ''}`}
              onClick={() => setActiveStructure('multi')}
              onMouseEnter={() => setActiveStructure('multi')}
            >
              <span className="bo-panel-code">02</span>
              <div>
                <p>LLC</p>
                <h3>Multi Member</h3>
                <span>Dois ou mais proprietários. Por padrão federal, costuma ser classificada como partnership, salvo eleição diferente.</span>
              </div>
            </button>
          </div>
          <p className="bo-legal-note">Classificações citadas são regras federais padrão e podem mudar conforme eleição, situação do proprietário e fatos específicos do negócio.</p>
        </section>

        <section className="bo-opening-section">
          <div className="bo-opening-sticky">
            <p className="bo-section-index">04 / Da decisão à operação</p>
            <h2>Abertura não é um clique.<br /><em>É uma sequência.</em></h2>
            <p>O livro transforma o processo em uma linha lógica para que documentos, impostos e manutenção não apareçam como surpresas depois.</p>
            <a href="#contato">Precisa de orientação? <span>↗</span></a>
          </div>

          <div className="bo-timeline" data-timeline>
            <div className="bo-timeline-rail"><span data-timeline-fill /></div>
            {openingSteps.map(([number, title, text]) => (
              <article data-timeline-item key={number}>
                <span className="bo-timeline-dot" />
                <small>{number}</small>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bo-content-section" id="conteudo">
          <div className="bo-section-head">
            <div>
              <p className="bo-section-index">05 / Dentro do livro</p>
              <h2>Conteúdo para consultar,<br /><em>marcar e aplicar.</em></h2>
            </div>
            <p>Além dos capítulos, a edição inclui checklists, glossário, fontes oficiais, perguntas para levar ao profissional e índice remissivo.</p>
          </div>

          <div className="bo-chapter-marquee" aria-hidden="true">
            <div>
              <span>ENTENDER</span><i>•</i><span>ESCOLHER</span><i>•</i><span>ORGANIZAR</span><i>•</i><span>MANTER</span><i>•</i>
              <span>ENTENDER</span><i>•</i><span>ESCOLHER</span><i>•</i><span>ORGANIZAR</span><i>•</i><span>MANTER</span><i>•</i>
            </div>
          </div>

          <div className="bo-chapter-grid">
            {chapters.map((chapter, index) => (
              <article className="bo-light-card" data-light-card key={chapter}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{chapter}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="bo-alert-section">
          <div className="bo-alert-word">PRECISÃO</div>
          <div className="bo-alert-copy">
            <p className="bo-section-index">06 / O que este material evita</p>
            <h2>Não confunda<br /><span className="bo-rotator"><span>LLC</span><span>tributação</span><span>proteção</span><span>LLC</span></span></h2>
            <p>
              Uma LLC não é automaticamente uma “forma de pagar menos imposto”. S Corporation não é sinônimo de “small corporation”. E formar uma empresa em um estado diferente daquele em que ela realmente opera pode criar novas obrigações.
            </p>
          </div>
          <div className="bo-alert-cards">
            <article><strong>Entidade ≠ tributação</strong><span>A forma jurídica e a classificação fiscal precisam ser analisadas separadamente.</span></article>
            <article><strong>Proteção tem limites</strong><span>Responsabilidade limitada depende de fatos, conduta, separação financeira e regras aplicáveis.</span></article>
            <article><strong>Estrangeiro exige atenção</strong><span>Proprietários estrangeiros podem ter obrigações adicionais e precisam de análise individual.</span></article>
          </div>
        </section>

        <section className="bo-author-section" id="autora">
          <div className="bo-author-photo">
            <img src="/image/autora.png" alt="Kelly Moraes, Express Solution" />
            <div className="bo-dot-grid" aria-hidden="true" />
          </div>
          <div className="bo-author-copy">
            <p className="bo-section-index">07 / Autora</p>
            <h2>Kelly Moraes</h2>
            <strong>Express Solution Tax &amp; Accounting, Inc.</strong>
            <p>
              Este guia foi criado para transformar um assunto cheio de termos técnicos em uma conversa organizada, visual e útil. O objetivo não é entregar uma estrutura pronta para todos, mas ajudar o leitor a fazer perguntas melhores e entender o caminho antes de formalizar o negócio.
            </p>
            <blockquote>“Clareza antes da abertura reduz decisões por impulso e melhora a conversa com os profissionais que vão acompanhar a empresa.”</blockquote>
            <div className="bo-author-links">
              <a href="mailto:support@express-solution.com">support@express-solution.com</a>
              <a href="tel:+18572443842">+1 (857) 244-3842</a>
              <a href="https://www.instagram.com/express_solutioninc" target="_blank" rel="noopener noreferrer">@express_solutioninc</a>
            </div>
          </div>
        </section>

        <section className="bo-contact-section" id="contato">
          <div className="bo-contact-copy">
            <p className="bo-section-index">08 / Contato</p>
            <h2>Seu negócio merece começar com <em>perguntas certas.</em></h2>
            <p>Preencha o formulário e sua mensagem será encaminhada para a equipe da Express Solution.</p>
            <div className="bo-contact-direct">
              <span>E-mail</span><a href="mailto:support@express-solution.com">support@express-solution.com</a>
              <span>Telefone</span><a href="tel:+18572443842">+1 (857) 244-3842</a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="bo-footer">
        <div>
          <img src="/image/express-solution-logo.svg" alt="Express Solution Tax & Accounting, Inc." />
          <p>© {new Date().getFullYear()} Express Solution Tax &amp; Accounting, Inc. Todos os direitos reservados.</p>
        </div>
        <p>
          Conteúdo educacional e informativo. Não substitui aconselhamento jurídico, tributário, migratório ou financeiro individualizado. Regras variam por estado e situação específica.
        </p>
      </footer>
    </div>
  )
}
