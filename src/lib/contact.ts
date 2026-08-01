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

export function isContactSubject(value: string): value is ContactSubject {
  return (SUBJECT_OPTIONS as readonly string[]).includes(value)
}
