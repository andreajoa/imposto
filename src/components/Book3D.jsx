export default function Book3D() {
  return (
    <div className="hero-visual animate delay-2">
      <div className="book-3d-wrapper">
        {/* 3D Book Body */}
        <div className="book-3d">
          {/* Front Cover */}
          <div className="book-cover">
            <div className="cover-inner-shadow" />
            <div className="cover-watermark" />
            <div className="cover-spine-line" />
            <div className="cover-content">
              <div className="cover-icon">📋</div>
              <hr className="cover-divider" />
              <h3>Guia Completo de Impostos para Imigrantes nos EUA</h3>
              <p className="cover-sub">Entenda o sistema, evite erros e aumente seu reembolso</p>
              <hr className="cover-divider" />
              <p className="cover-author">Kelly Marques</p>
              <p className="cover-role">Preparadora de Impostos</p>
              <span className="cover-badge">📅 GUIA COMPLETO</span>
              <p className="cover-footer">11 ferramentas • Checklists • Quizzes • Tabelas<br />Organização anual • Créditos e deduções</p>
            </div>
          </div>

          {/* Spine (lateral) */}
          <div className="book-spine">
            <span className="spine-text">GUIA DE IMPOSTOS</span>
          </div>

          {/* Back Cover */}
          <div className="book-back" />

          {/* Page block (visible edges) */}
          <div className="book-page-block" />

          {/* Edges */}
          <div className="book-edge-top" />
          <div className="book-edge-bottom" />
          <div className="book-edge-right" />
        </div>

        {/* Glow effect on hover */}
        <div className="book-glow" />

        {/* Shadow */}
        <div className="book-shadow" />

        {/* Gold sparkles */}
        <div className="sparkles">
          <i /><i /><i /><i /><i /><i /><i /><i />
        </div>
      </div>
    </div>
  )
}
