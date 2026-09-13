const MAX = {
  name: 90,
  email: 160,
  phone: 40,
  subject: 120,
  message: 3000,
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

function clean(value, max) {
  return String(value || '').trim().slice(0, max)
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) {
    console.error('Contact form missing RESEND_API_KEY or RESEND_FROM')
    return json({ error: 'O formulário está temporariamente indisponível. Use support@express-solution.com.' }, 503)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Dados inválidos.' }, 400)
  }

  // Honeypot: bots tend to fill this hidden field. Return success without sending.
  if (clean(body.companyWebsite, 200)) return json({ ok: true })

  const name = clean(body.name, MAX.name)
  const email = clean(body.email, MAX.email).toLowerCase()
  const phone = clean(body.phone, MAX.phone)
  const subject = clean(body.subject, MAX.subject) || 'Novo contato pelo site'
  const message = clean(body.message, MAX.message)

  if (name.length < 2 || !isEmail(email) || message.length < 10) {
    return json({ error: 'Preencha nome, e-mail válido e uma mensagem com pelo menos 10 caracteres.' }, 400)
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone || 'Não informado'),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replaceAll('\n', '<br />'),
  }

  const recipient = env.CONTACT_TO || 'support@express-solution.com'
  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: [recipient],
      reply_to: email,
      subject: `[Express Solution] ${subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#2d2d2d">
          <div style="background:#2d2d2d;color:#f4efe7;padding:24px 28px;border-radius:14px 14px 0 0">
            <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#ded3c6">Express Solution Tax &amp; Accounting, Inc.</div>
            <h1 style="font-size:24px;margin:8px 0 0">Novo contato pelo site</h1>
          </div>
          <div style="background:#f4efe7;padding:28px;border-radius:0 0 14px 14px">
            <p><strong>Nome:</strong> ${safe.name}</p>
            <p><strong>E-mail:</strong> ${safe.email}</p>
            <p><strong>Telefone:</strong> ${safe.phone}</p>
            <p><strong>Assunto:</strong> ${safe.subject}</p>
            <hr style="border:0;border-top:1px solid #ded3c6;margin:22px 0" />
            <p style="line-height:1.7">${safe.message}</p>
          </div>
        </div>
      `,
      text: `Novo contato pelo site\n\nNome: ${name}\nE-mail: ${email}\nTelefone: ${phone || 'Não informado'}\nAssunto: ${subject}\n\n${message}`,
    }),
  })

  const resendPayload = await resendResponse.json().catch(() => ({}))
  if (!resendResponse.ok) {
    console.error('Resend contact error', resendResponse.status, resendPayload)
    return json({ error: 'Não foi possível enviar agora. Escreva para support@express-solution.com.' }, 502)
  }

  return json({ ok: true, id: resendPayload.id || null })
}

export function onRequestOptions() {
  return new Response(null, { status: 204 })
}
