'use server'

import { Resend } from 'resend'

import { parseContactFormData } from '@/lib/contact'

export type ContactActionResult = { ok: true } | { ok: false; error: string }

function getString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
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

  const parsed = parseContactFormData(formData)
  if (!parsed.success) {
    return {
      ok: false,
      error:
        parsed.error.issues[0]?.message ?? 'Verifique os campos do formulário.',
    }
  }

  const { name, email, subject, message } = parsed.data

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
