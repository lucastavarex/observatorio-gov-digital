'use client'

import { Download, Eye, Loader2, X } from 'lucide-react'
import * as React from 'react'

import type { ArquivoDados, NivelKey } from '@/data/indicators'

type VariavelAcoesProps = {
  nome: string
  fonteUrl: string
  arquivo: ArquivoDados
  /** Nível da página (federal | estadual | municipal | municipios). */
  nivelKey: NivelKey
  conceptId: string
  subItens?: string | null
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

function exportHref(
  nivelKey: NivelKey,
  conceptId: string,
  subItens?: string | null
): string {
  const params = new URLSearchParams({
    nivel: nivelKey,
    conceptId,
  })
  if (subItens) params.set('subItens', subItens)
  return `/api/obgd/export?${params.toString()}`
}

export function VariavelAcoes({
  nome,
  fonteUrl,
  arquivo,
  nivelKey,
  conceptId,
  subItens,
}: VariavelAcoesProps) {
  const [aberto, setAberto] = React.useState(false)
  const [baixando, setBaixando] = React.useState(false)
  const [erro, setErro] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  async function confirmarDownload() {
    setBaixando(true)
    setErro(null)
    const href = exportHref(nivelKey, conceptId, subItens)
    try {
      const res = await fetch(href)
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        throw new Error(body?.error ?? 'Não foi possível gerar o arquivo.')
      }
      const blob = await res.blob()
      const cd = res.headers.get('Content-Disposition')
      const match = cd?.match(/filename="([^"]+)"/)
      const filename = match?.[1] ?? arquivo.nome
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
      setAberto(false)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao baixar.')
    } finally {
      setBaixando(false)
    }
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      {/* <a
        href={fonteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver fonte original"
        className="group relative inline-flex items-center justify-center rounded-md border border-muted-foreground/30 p-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
      >
        <Eye className="size-4" aria-hidden="true" />
        <Tooltip>Ver fonte original</Tooltip>
      </a> */}

      <button
        type="button"
        onClick={() => {
          setErro(null)
          setAberto(true)
        }}
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
            onClick={() => !baixando && setAberto(false)}
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
                onClick={() => !baixando && setAberto(false)}
                aria-label="Fechar"
                disabled={baixando}
                className="-mt-1 -mr-1 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground">{nome}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Arquivo com os valores normalizados usados no Observatório
              (snapshot 2026), para todas as unidades deste nível — o mesmo
              recorte do índice, não a base bruta completa.
            </p>

            <dl className="mt-4 divide-y divide-dashed text-sm">
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">Arquivo</dt>
                <dd className="font-medium text-foreground tabular-nums">
                  {arquivo.nome}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">Formato</dt>
                <dd className="font-medium text-foreground tabular-nums">
                  CSV
                </dd>
              </div>
            </dl>

            {erro && (
              <p className="mt-3 text-xs text-destructive" role="alert">
                {erro}
              </p>
            )}

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setAberto(false)}
                disabled={baixando}
                className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarDownload}
                disabled={baixando}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {baixando ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Download className="size-4" aria-hidden="true" />
                )}
                Confirmar download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
