import { useEffect, useRef, useState } from 'react'

export default function Book3D() {
  const bookRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Dynamically import Spline runtime
    let app = null
    const loadSpline = async () => {
      try {
        const { Application } = await import('@splinetool/runtime')
        const canvas = document.getElementById('spline-canvas')
        if (canvas) {
          app = new Application(canvas)
          // Using a public Spline demo scene (you can replace with your own)
          // To use your own: export from app.spline.design, save .splinecode to /public/3d/
          // then change the URL below to '/3d/your-scene.splinecode'
          await app.load('https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode')
          setLoaded(true)
        }
      } catch (err) {
        console.log('Spline loading failed, using CSS 3D book fallback:', err.message)
        setLoaded(false)
      }
    }
    loadSpline()
    return () => { if (app) app.dispose() }
  }, [])

  if (!loaded) {
    return (
      <div className="hero-visual animate delay-2">
        <div className="book-3d-wrapper">
          <div className="book-3d" ref={bookRef}>
            {/* Front Cover */}
            <div className="book-cover">
              <div className="book-icon-3d">📋</div>
              <hr className="book-divider-3d" />
              <h3>Guia Completo de Impostos para Imigrantes nos EUA</h3>
              <p className="book-sub-3d">Entenda o sistema, evite erros e aumente seu reembolso</p>
              <hr className="book-divider-3d" />
              <p className="book-author-3d">Kelly Marques — Preparadora de Impostos</p>
              <span className="book-year-3d">📅 GUIA COMPLETO</span>
              <p className="book-footer-3d">
                11 ferramentas práticas • Checklists • Quizzes • Tabelas<br />
                Organização anual • Créditos e deduções
              </p>
            </div>
            {/* Spine */}
            <div className="book-spine">
              <span className="book-spine-text">GUIA DE IMPOSTOS</span>
            </div>
            {/* Back */}
            <div className="book-back" />
            {/* Edges */}
            <div className="book-top" />
            <div className="book-bottom" />
            <div className="book-pages-right" />
          </div>
          {/* Shadow */}
          <div className="book-shadow" />
          {/* Sparkles */}
          <div className="sparkle-container">
            <div className="sparkle" />
            <div className="sparkle" />
            <div className="sparkle" />
            <div className="sparkle" />
            <div className="sparkle" />
            <div className="sparkle" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="hero-visual animate delay-2">
      <canvas id="spline-canvas" style={{ width: '100%', height: '400px', borderRadius: '12px' }} />
    </div>
  )
}
