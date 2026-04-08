import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { items, toggleCart } = useCart()
  const itemCount = items.length

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner">
        <a href="/" className="navbar-brand">Impostos<span>USA</span></a>
        <div className={`navbar-links ${open ? 'open' : ''}`} id="navLinks">
          <a href="#problemas" onClick={() => setOpen(false)}>Problemas</a>
          <a href="#conteudo" onClick={() => setOpen(false)}>Conteúdo</a>
          <a href="#ferramentas" onClick={() => setOpen(false)}>Ferramentas</a>
          <a href="#autora" onClick={() => setOpen(false)}>Autora</a>
          <a href="#contato" className="navbar-cta" onClick={() => setOpen(false)}>Quero o Guia</a>
        </div>
        <div className="navbar-actions">
          <button className="nav-cart-btn" onClick={toggleCart} aria-label="Abrir carrinho">
            🛒
            {itemCount > 0 && <span className="nav-cart-badge">{itemCount}</span>}
          </button>
          <button className="nav-toggle" id="navToggle" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  )
}
