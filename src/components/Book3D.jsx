import { useState, useEffect, useRef } from 'react'

const pages = [
  { icon: '📋', title: 'Guia Completo de Impostos', subtitle: 'para Imigrantes nos EUA', color: '#1A3D6E' },
  { icon: '📘', title: 'Entenda o Sistema', subtitle: 'Por que declarar • Como o IRS funciona', color: '#1A3D6E' },
  { icon: '📗', title: 'Organize sua Vida', subtitle: 'Documentos • Checklists • Planejamento anual', color: '#1a5c3a' },
  { icon: '📙', title: 'Pague Menos', subtitle: 'Créditos • Deduções • Estratégias legais', color: '#8a6914' },
  { icon: '📕', title: 'Evite os Erros', subtitle: 'Erros comuns • Como se proteger', color: '#8b2020' },
  { icon: '📊', title: '11 Ferramentas', subtitle: 'Checklists • Quizzes • Tabelas práticas', color: '#1A3D6E' },
]

export default function Book3D() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const flipIntervalRef = useRef(null)

  const handleMouseEnter = () => {
    setIsOpen(true)
    setIsFlipping(true)
    let page = 0
    flipIntervalRef.current = setInterval(() => {
      page++
      if (page >= pages.length) page = 0
      setCurrentPage(page)
    }, 1800)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
    setIsFlipping(false)
    if (flipIntervalRef.current) {
      clearInterval(flipIntervalRef.current)
      flipIntervalRef.current = null
    }
    setTimeout(() => setCurrentPage(0), 800)
  }

  useEffect(() => {
    return () => {
      if (flipIntervalRef.current) clearInterval(flipIntervalRef.current)
    }
  }, [])

  return (
    <div
      className="hero-visual animate delay-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`book-3d-container ${isOpen ? 'book-open' : 'book-closed'}`}>
        {/* Left page */}
        <div className="book-left-page">
          {isOpen && currentPage > 0 && (
            <div className="page-content-inner" style={{ opacity: 1 }}>
              <div className="page-decoration" />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="page-icon">{pages[currentPage > 0 ? currentPage - 1 : pages.length - 1].icon}</div>
                <h4 className="page-title">{pages[currentPage > 0 ? currentPage - 1 : pages.length - 1].title}</h4>
                <p className="page-subtitle">{pages[currentPage > 0 ? currentPage - 1 : pages.length - 1].subtitle}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right page */}
        <div className="book-right-page">
          <div className="page-content-inner">
            <div className="page-decoration" />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="page-icon">{pages[currentPage].icon}</div>
              <h4 className="page-title">{pages[currentPage].title}</h4>
              <p className="page-subtitle">{pages[currentPage].subtitle}</p>
            </div>
          </div>
        </div>

        {/* Flipping page overlay */}
        {isOpen && isFlipping && (
          <div className="book-flip-page" key={currentPage}>
            <div className="page-content-inner flip-content">
              <div className="page-decoration flip-decoration" />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="page-icon">{pages[currentPage].icon}</div>
                <h4 className="page-title">{pages[currentPage].title}</h4>
                <p className="page-subtitle">{pages[currentPage].subtitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* Book spine */}
        <div className="book-3d-spine">
          <span className="spine-label">GUIA DE IMPOSTOS</span>
        </div>

        {/* Book cover (visible when closed) */}
        <div className={`book-3d-cover ${isOpen ? 'cover-hidden' : 'cover-visible'}`}>
          <div className="cover-decoration" />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div className="book-icon-3d">📋</div>
            <hr className="book-divider-3d" />
            <h3 className="cover-title">Guia Completo de<br />Impostos para<br />Imigrantes nos EUA</h3>
            <hr className="book-divider-3d" />
            <p className="cover-author">Kelly Marques</p>
            <p className="cover-role">Preparadora de Impostos</p>
            <span className="cover-badge">📅 GUIA COMPLETO</span>
            <p className="cover-footer">11 ferramentas • Checklists • Quizzes<br />Créditos • Deduções • Organização</p>
          </div>
        </div>

        {/* Book edges */}
        <div className="book-3d-top-edge" />
        <div className="book-3d-bottom-edge" />
        <div className="book-3d-right-edge" />

        {/* Shadow */}
        <div className="book-3d-shadow" />

        {/* Hover hint */}
        {!isOpen && (
          <div className="book-hover-hint">
            <span>✨ Passe o mouse para folhear</span>
          </div>
        )}
      </div>
    </div>
  )
}
