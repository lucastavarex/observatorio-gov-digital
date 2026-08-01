import { z } from 'zod'

export const SUBJECT_OPTIONS = [
  'Dúvida geral',
  'Indicadores e dados',
  'Imprensa',
  'Parcerias',
  'Outro assunto',
] as const

export type ContactSubject = (typeof SUBJECT_OPTIONS)[number]

export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  message: 5000,
} as const

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Informe o seu nome.')
    .max(CONTACT_LIMITS.name, 'O nome informado é muito longo.'),
  email: z
    .string()
    .trim()
    .min(1, 'Informe um e-mail.')
    .max(CONTACT_LIMITS.email, 'Informe um e-mail válido.')
    .email('Informe um e-mail válido.'),
  subject: z.enum(SUBJECT_OPTIONS, {
    error: 'Selecione um assunto.',
  }),
  message: z
    .string()
    .trim()
    .min(1, 'Escreva a sua mensagem.')
    .max(CONTACT_LIMITS.message, 'A mensagem é muito longa.'),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

function formString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value : ''
}

export function parseContactFormData(formData: FormData) {
  return contactFormSchema.safeParse({
    name: formString(formData, 'name'),
    email: formString(formData, 'email'),
    subject: formString(formData, 'subject'),
    message: formString(formData, 'message'),
  })
}
