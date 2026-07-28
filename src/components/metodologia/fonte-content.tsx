import { ExternalLink } from 'lucide-react'

import { BaseDownloadButton } from '@/components/metodologia/base-download-button'
import { BackButton } from '@/components/shared/back-button'
import type { Fonte } from '@/data/fontes'

export function FonteContent({ fonte }: { fonte: Fonte }) {
  return (
    <section className="pb-12">
      <div className="relative px-6 pb-16 pt-20 sm:px-10">
        <BackButton
          fallbackHref="/metodologia"
          label="Voltar para Metodologia"
          className="absolute left-6 top-12 inline-flex items-center text-muted-foreground transition-colors hover:text-primary sm:left-10"
        />

        <span className="block text-sm font-medium text-muted-foreground">
          Fonte de dados
        </span>
        <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
          {fonte.name}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {fonte.descricao}
        </p>

        <div className="mt-6">
          <a
            href={fonte.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            Acessar site do órgão
          </a>
        </div>

        <h2 className="mt-14 text-sm font-bold text-foreground">
          Bases de dados disponíveis
        </h2>

        <div className="-mx-6 mt-4 border-t sm:-mx-10">
          {fonte.bases.map(base => (
            <div
              key={base.arquivo}
              className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-5 sm:px-10"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {base.nome}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {base.descricao}
                </p>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                  {base.formato} · {base.tamanho}
                </p>
              </div>
              <BaseDownloadButton arquivo={base.arquivo} nome={base.nome} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
