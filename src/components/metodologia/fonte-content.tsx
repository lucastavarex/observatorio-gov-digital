import { ExternalLink } from 'lucide-react'

import { ObgdFonteDownloadButton } from '@/components/metodologia/obgd-fonte-download-button'
import { BackButton } from '@/components/shared/back-button'
import type { Fonte } from '@/data/fontes'
import { hasObgdExportForMetodologiaSlug } from '@/data/obgd/export-rows'

export function FonteContent({ fonte }: { fonte: Fonte }) {
  const temExportObgd = hasObgdExportForMetodologiaSlug(fonte.slug)

  return (
    <section className="pb-12">
      <div className="relative px-6 pt-20 pb-16 sm:px-10">
        <BackButton
          fallbackHref="/metodologia"
          label="Voltar para Metodologia"
          className="absolute top-12 left-6 inline-flex items-center text-muted-foreground transition-colors hover:text-primary sm:left-10"
        />

        <span className="block text-sm font-medium text-muted-foreground">
          Fonte de dados
        </span>
        <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text font-bold text-4xl text-transparent leading-tight tracking-tight sm:text-5xl">
          {fonte.name}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed">
          {fonte.descricao}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={fonte.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium text-muted-foreground text-sm transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            Acessar site do órgão
          </a>
        </div>

        {temExportObgd && (
          <div className="mt-14 rounded-lg border border-border bg-muted/30 px-5 py-5">
            <h2 className="font-bold text-foreground text-sm">
              Dados usados no Observatório
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground text-sm leading-relaxed">
              A plataforma não disponibiliza o microdado bruto completo desta
              fonte. Em vez disso, você pode baixar o{' '}
              <strong className="font-medium text-foreground">
                recorte curado
              </strong>{' '}
              — os mesmos valores normalizados (0–100) dos indicadores desta
              fonte que entram no índice (snapshot 2026), em todos os níveis
              (nacional, estadual e municípios com 100 mil habitantes ou mais).
            </p>
            <div className="mt-4">
              <ObgdFonteDownloadButton
                metodologiaSlug={fonte.slug}
                fonteNome={fonte.name}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
