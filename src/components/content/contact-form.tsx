'use client'

import * as React from 'react'
import { toast } from 'sonner'

import { sendContactMessage } from '@/app/actions/contact'
import { Input } from '@/components/custom/input'
import { SelectTrigger } from '@/components/custom/select-trigger'
import { Textarea } from '@/components/custom/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { SUBJECT_OPTIONS } from '@/lib/contact'

export function ContactForm() {
  const [submitting, setSubmitting] = React.useState(false)
  const [subject, setSubject] = React.useState('')
  const [subjectKey, setSubjectKey] = React.useState(0)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!subject) {
      toast.error('Selecione um assunto.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    setSubmitting(true)
    try {
      const result = await sendContactMessage(formData)

      if (!result.ok) {
        toast.error(result.error)
        return
      }

      form.reset()
      setSubject('')
      setSubjectKey(key => key + 1)
      toast.success('Mensagem enviada!', {
        description: 'Retornaremos o seu contato em breve.',
      })
    } catch {
      toast.error(
        'Não foi possível enviar a mensagem. Tente novamente mais tarde.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-6"
      autoComplete="on"
    >
      {/* Honeypot — leave empty; hidden from users / autofill */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor="company_url_hp">Company URL</label>
        <input
          id="company_url_hp"
          name="company_url_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-primary">
          Nome completo
        </Label>
        <Input id="name" name="name" placeholder="Seu nome" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-primary">
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
        <Label htmlFor="subject" className="text-primary">
          Assunto
        </Label>
        <Select
          key={subjectKey}
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
        <Label htmlFor="message" className="text-primary">
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

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button
          type="submit"
          disabled={submitting}
          className="h-auto rounded-full bg-primary px-8 py-4 text-primary-foreground text-sm hover:bg-primary/90"
        >
          {submitting ? 'Enviando...' : 'Enviar'}
        </Button>
        <p className="min-w-0 flex-1 basis-48 text-muted-foreground text-sm">
          ou envie um e-mail para{' '}
          <a
            href="mailto:mbc@mbc.org.br"
            className="font-semibold text-primary underline underline-offset-4 hover:opacity-70"
          >
            mbc@mbc.org.br
          </a>
        </p>
      </div>
    </form>
  )
}
