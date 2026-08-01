'use server'

import { Resend } from 'resend'

import { CONTACT_LIMITS, isContactSubject } from '@/lib/contact'

export type ContactActionResult = { ok: true } | { ok: false; error: string }

function getString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export async function sendContactMessage(
  formData: FormData
): Promise<ContactActionResult> {
  // Honeypot: bots that fill hidden fields are silently ignored.
  // Use an uncommon name so browser autofill does not trip it.
  if (getString(formData, 'company_url_hp')) {
    return { ok: true }
  }

  const name = getString(formData, 'name')
  const email = getString(formData, 'email')
  const subject = getString(formData, 'subject')
  const message = getString(formData, 'message')

  if (!name || !email || !subject || !message) {
    return { ok: false, error: 'Preencha todos os campos obrigatórios.' }
  }

  if (name.length > CONTACT_LIMITS.name) {
    return { ok: false, error: 'O nome informado é muito longo.' }
  }

  if (email.length > CONTACT_LIMITS.email || !isValidEmail(email)) {
    return { ok: false, error: 'Informe um e-mail válido.' }
  }

  if (!isContactSubject(subject)) {
    return { ok: false, error: 'Selecione um assunto válido.' }
  }

  if (message.length > CONTACT_LIMITS.message) {
    return { ok: false, error: 'A mensagem é muito longa.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !from || !to) {
    console.error('Contact form misconfigured: missing Resend env vars.')
    return {
      ok: false,
      error: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.',
    }
  }

  const resend = new Resend(apiKey)
  const textBody = [
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Assunto: ${subject}`,
    '',
    message,
  ].join('\n')

  const htmlBody = `
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Assunto:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
  `

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[Contato OBGD] ${subject} — ${name}`,
      text: textBody,
      html: htmlBody,
    })

    if (error) {
      console.error('Resend error:', error)
      return {
        ok: false,
        error:
          'Não foi possível enviar a mensagem. Tente novamente mais tarde.',
      }
    }

    return { ok: true }
  } catch (error) {
    console.error('Contact form send failed:', error)
    return {
      ok: false,
      error: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.',
    }
  }
}
