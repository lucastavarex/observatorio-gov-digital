'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const SUBJECT_OPTIONS = [
  'Dúvida geral',
  'Indicadores e dados',
  'Imprensa',
  'Parcerias',
  'Outro assunto',
] as const

export function ContactForm() {
  const [submitting, setSubmitting] = React.useState(false)
  const [subject, setSubject] = React.useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!subject) {
      toast.error('Selecione um assunto.')
      return
    }

    const form = event.currentTarget
    setSubmitting(true)

    // Placeholder: integrar com o backend/serviço de e-mail futuramente.
    setTimeout(() => {
      setSubmitting(false)
      form.reset()
      setSubject('')
      toast.success('Mensagem enviada!', {
        description: 'Retornaremos o seu contato em breve.',
      })
    }, 600)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-foreground">
          Nome completo
        </Label>
        <Input id="name" name="name" placeholder="Seu nome" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-foreground">
          E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="voce@exemplo.com"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="subject" className="text-foreground">
          Assunto
        </Label>
        <Select
          value={subject || undefined}
          onValueChange={setSubject}
          required
        >
          <SelectTrigger id="subject">
            <SelectValue placeholder="Selecionar assunto" />
          </SelectTrigger>
          <SelectContent position="popper">
            {SUBJECT_OPTIONS.map(option => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="subject" value={subject} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-foreground">
          Sua mensagem
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Descreva a sua solicitação..."
          required
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="h-auto rounded-full bg-foreground px-8 py-4 text-background text-sm hover:bg-foreground/90"
      >
        {submitting ? 'Enviando...' : 'Enviar mensagem'}
      </Button>
    </form>
  )
}
