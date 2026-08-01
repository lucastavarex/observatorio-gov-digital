'use client'

import { Download, Loader2 } from 'lucide-react'
import * as React from 'react'

type ObgdFonteDownloadButtonProps = {
  metodologiaSlug: string
  fonteNome: string
}

export function ObgdFonteDownloadButton({
  metodologiaSlug,
  fonteNome,
}: ObgdFonteDownloadButtonProps) {
  const [baixando, setBaixando] = React.useState(false)
  const [erro, setErro] = React.useState<string | null>(null)

  async function baixar() {
    setBaixando(true)
    setErro(null)
    try {
      const res = await fetch(
        `/api/obgd/export?metodologiaSlug=${encodeURIComponent(metodologiaSlug)}`
      )
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        throw new Error(body?.error ?? 'Não foi possível gerar o arquivo.')
      }
      const blob = await res.blob()
      const cd = res.headers.get('Content-Disposition')
      const match = cd?.match(/filename="([^"]+)"/)
      const filename = match?.[1] ?? `obgd-fonte-${metodologiaSlug}.csv`
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao baixar.')
    } finally {
      setBaixando(false)
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <button
        type="button"
        onClick={baixar}
        disabled={baixando}
        aria-label={`Baixar indicadores OBGD de ${fonteNome}`}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary disabled:opacity-50"
      >
        {baixando ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Download className="size-4" aria-hidden="true" />
        )}
        Baixar CSV do OBGD
      </button>
      {erro && (
        <p
          className="max-w-xs text-right text-xs text-destructive"
          role="alert"
        >
          {erro}
        </p>
      )}
    </div>
  )
}
