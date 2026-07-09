'use client'

import { Check, Copy } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'

type CopyButtonProps = {
  value: string
  /** Rótulo acessível e mensagem do toast (ex.: "E-mail"). */
  label: string
}

export function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current)
    },
    []
  )

  async function copyToClipboard(text: string) {
    // Caminho preferencial: Clipboard API (requer contexto seguro).
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch {
      // cai no fallback abaixo
    }
    // Fallback: textarea temporária + execCommand (contextos restritos).
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(textarea)
      return ok
    } catch {
      return false
    }
  }

  async function handleCopy() {
    const ok = await copyToClipboard(value)
    if (!ok) {
      toast.error('Não foi possível copiar.')
      return
    }
    setCopied(true)
    toast(`${label} copiado`, {
      icon: (
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
          <Check aria-hidden="true" className="size-3" strokeWidth={3} />
        </span>
      ),
      position: 'bottom-center',
      style: {
        width: 'fit-content',
        borderRadius: '9999px',
        left: 0,
        right: 0,
        margin: '0 auto',
      },
    })
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copiar ${label.toLowerCase()}`}
      className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
    </button>
  )
}
