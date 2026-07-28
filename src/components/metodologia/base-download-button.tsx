'use client'

import { Download } from 'lucide-react'

export function BaseDownloadButton({
  arquivo,
  nome,
}: {
  arquivo: string
  nome: string
}) {
  function baixar() {
    // Mock: gera um CSV de exemplo com o nome da base definido.
    const conteudo = `# ${nome}\n# Base de exemplo do Observatório Brasileiro de Governo Digital\n`
    const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = arquivo
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      type="button"
      onClick={baixar}
      aria-label={`Baixar ${nome}`}
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
    >
      <Download className="size-4" aria-hidden="true" />
      Baixar
    </button>
  )
}
