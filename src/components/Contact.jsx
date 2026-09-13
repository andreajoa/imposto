import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section className="contact" id="contato">
      <p style={{ color: 'var(--text-light)', fontSize: '10pt', marginBottom: '6px' }}>
        Entre em contato com a Express Solution
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--blue)', marginBottom: '8px' }}>
        Como podemos ajudar?
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto 18px' }}>
        Envie sua mensagem pelo formulário. Ela será encaminhada para support@express-solution.com.
      </p>
      <ContactForm variant="light" compact />
      <div className="contact-links" style={{ marginTop: '16px' }}>
        <a href="mailto:support@express-solution.com" className="contact-link">
          ✉️ support@express-solution.com
        </a>
        <a href="tel:+18572443842" className="contact-link">
          ☎ +1 (857) 244-3842
        </a>
      </div>
    </section>
  )
}
