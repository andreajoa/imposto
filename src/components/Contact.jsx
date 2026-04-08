export default function Contact() {
  return (
    <section className="contact">
      <p style={{ color: 'var(--text-light)', fontSize: '10pt', marginBottom: '6px' }}>
        📞 Entre em contato diretamente com a Kelly Moraes
      </p>
      <div className="contact-links">
        <a href="https://wa.me/18572443842" className="contact-link" target="_blank" rel="noopener">
          📱 WhatsApp: (857) 244-3842
        </a>
        <a href="mailto:expressinc1040@gmail.com" className="contact-link">
          ✉️ expressinc1040@gmail.com
        </a>
      </div>
    </section>
  )
}
