'use client'

import { Download, Eye, X } from 'lucide-react'
import * as React from 'react'

import type { ArquivoDados } from '@/data/indicators'

type VariavelAcoesProps = {
  nome: string
  fonteUrl: string
  arquivo: ArquivoDados
}

function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100"
    >
      {children}
    </span>
  )
}

export function VariavelAcoes({ nome, fonteUrl, arquivo }: VariavelAcoesProps) {
  const [aberto, setAberto] = React.useState(false)

  React.useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  function confirmarDownload() {
    // Mock: gera um CSV de exemplo com o nome do arquivo definido.
    const conteudo = `# ${nome}\n# Arquivo de exemplo do Observatório Brasileiro de Governo Digital\n`
    const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = arquivo.nome
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    setAberto(false)
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      <a
        href={fonteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver fonte original"
        className="group relative inline-flex items-center justify-center rounded-md border border-muted-foreground/30 p-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
      >
        <Eye className="size-4" aria-hidden="true" />
        <Tooltip>Ver fonte original</Tooltip>
      </a>

      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-label="Baixar dados"
        className="group relative inline-flex items-center justify-center rounded-md border border-muted-foreground/30 p-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
      >
        <Download className="size-4" aria-hidden="true" />
        <Tooltip>Baixar dados</Tooltip>
      </button>

      {aberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <button
            type="button"
            aria-label="Fechar diálogo"
            className="absolute inset-0 cursor-default"
            onClick={() => setAberto(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Baixar dados"
            className="relative z-10 w-full max-w-sm rounded-xl border bg-background p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base font-semibold text-foreground">
                Baixar dados
              </h3>
              <button
                type="button"
                onClick={() => setAberto(false)}
                aria-label="Fechar"
                className="-mr-1 -mt-1 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground">{nome}</p>

            <dl className="mt-4 divide-y divide-dashed text-sm">
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">Arquivo</dt>
                <dd className="font-medium tabular-nums text-foreground">
                  {arquivo.nome}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">Tamanho</dt>
                <dd className="font-medium tabular-nums text-foreground">
                  {arquivo.tamanho}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">Tabelas / bases</dt>
                <dd className="font-medium tabular-nums text-foreground">
                  {arquivo.tabelas}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setAberto(false)}
                className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarDownload}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Download className="size-4" aria-hidden="true" />
                Confirmar download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
