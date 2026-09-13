import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  companyWebsite: '',
}

export default function ContactForm({ variant = 'dark', compact = false }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (status.state === 'sending') return

    setStatus({ state: 'sending', message: 'Enviando sua mensagem…' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload.error || 'Não foi possível enviar agora. Tente novamente em instantes.')
      }

      setForm(initialForm)
      setStatus({
        state: 'success',
        message: 'Mensagem enviada. A Express Solution recebeu seu contato e poderá responder pelo e-mail informado.',
      })
    } catch (error) {
      setStatus({
        state: 'error',
        message: error.message || 'Não foi possível enviar agora. Tente novamente em instantes.',
      })
    }
  }

  return (
    <form className={`es-contact-form es-contact-form--${variant}${compact ? ' es-contact-form--compact' : ''}`} onSubmit={submit}>
      <div className="es-form-grid">
        <label>
          <span>Nome</span>
          <input
            name="name"
            value={form.name}
            onChange={update}
            autoComplete="name"
            maxLength={90}
            required
            placeholder="Seu nome"
          />
        </label>

        <label>
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            autoComplete="email"
            maxLength={160}
            required
            placeholder="voce@email.com"
          />
        </label>

        <label>
          <span>Telefone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={update}
            autoComplete="tel"
            maxLength={40}
            placeholder="Seu telefone"
          />
        </label>

        <label>
          <span>Assunto</span>
          <input
            name="subject"
            value={form.subject}
            onChange={update}
            maxLength={120}
            placeholder="Como podemos ajudar?"
          />
        </label>
      </div>

      <label className="es-form-message">
        <span>Mensagem</span>
        <textarea
          name="message"
          value={form.message}
          onChange={update}
          maxLength={3000}
          minLength={10}
          required
          rows={compact ? 4 : 6}
          placeholder="Conte brevemente o que você precisa."
        />
      </label>

      <label className="es-form-honeypot" aria-hidden="true">
        <span>Website</span>
        <input
          name="companyWebsite"
          value={form.companyWebsite}
          onChange={update}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <div className="es-form-actions">
        <button type="submit" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
          <span aria-hidden="true">↗</span>
        </button>
        <p>
          Ou escreva para <a href="mailto:support@express-solution.com">support@express-solution.com</a>
        </p>
      </div>

      <p
        className={`es-form-status${status.state !== 'idle' ? ` is-${status.state}` : ''}`}
        role="status"
        aria-live="polite"
      >
        {status.message}
      </p>
    </form>
  )
}
