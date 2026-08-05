import { ArrowLeft } from 'lucide-react'
import type { DrilldownBasePath } from '@/components/drilldown/ente-detail'
import { FontesRecorte } from '@/components/shared/fontes-recorte'
import { InfoTip } from '@/components/shared/info-tip'
import { VariantLink } from '@/components/shared/variant-link'
import { VariavelAcoes } from '@/components/shared/variavel-acoes'
import {
  fontesDoObjetivo,
  fontesPorNomes,
  GLOSSARIO,
  oQueAvaliaObjetivo,
} from '@/data/help-copy'
import {
  type Ente,
  formatScore,
  type Nivel,
  type ObjetivoScore,
} from '@/data/indicators'

type ObjetivoVariaveisProps = {
  nivel: Nivel
  ente: Ente
  objetivo: Omit<ObjetivoScore, 'nota'> & { nota: number }
  basePath: DrilldownBasePath
  showRankingUi: boolean
}

export function ObjetivoVariaveis({
  nivel,
  ente,
  objetivo,
  basePath,
  showRankingUi,
}: ObjetivoVariaveisProps) {
  const { blurb, detalhe } = oQueAvaliaObjetivo(objetivo.objetivoSlug)
  const fontesCatalogo = fontesDoObjetivo(objetivo.numero)
  const fontesDasVariaveis = fontesPorNomes(
    objetivo.variaveis.map(v => v.fonte)
  )
  const fontes =
    fontesDasVariaveis.length > 0 ? fontesDasVariaveis : fontesCatalogo

  return (
    <section className="pb-12">
      <div className="relative px-6 pb-16 pt-20 sm:px-10">
        <VariantLink
          href={`${basePath}/${nivel.key}/${ente.slug}`}
          aria-label={`Voltar para ${ente.nome}`}
          className="absolute left-6 top-12 inline-flex items-center text-muted-foreground transition-colors hover:text-primary sm:left-10"
        >
          <ArrowLeft className="size-5" />
        </VariantLink>

        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <span className="block text-sm font-medium text-muted-foreground">
              {ente.nome} · Objetivo {String(objetivo.numero).padStart(2, '0')}
              {showRankingUi && objetivo.posicaoNoObjetivo != null && (
                <> · {objetivo.posicaoNoObjetivo}º no ranking</>
              )}
            </span>
            <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
              {objetivo.titulo}
            </h1>
          </div>
          <div className="flex flex-row-reverse items-end justify-start gap-2.5 text-right sm:block sm:gap-0">
            <span className="inline-flex items-center justify-end gap-1 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:pb-0">
              Índice do objetivo
              <InfoTip label="O que é o índice?">{GLOSSARIO.subIndice}</InfoTip>
            </span>
            <span className="block bg-linear-to-br from-primary to-primary-glow bg-clip-text text-7xl font-bold leading-tight tracking-tight tabular-nums text-transparent sm:text-8xl">
              {formatScore(objetivo.nota)}
            </span>
          </div>
        </div>

        <div className="mt-6 max-w-2xl rounded-lg border border-border bg-muted/30 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            O que está sendo avaliado
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">{blurb}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {detalhe}
          </p>
        </div>

        <FontesRecorte fontes={fontes} titulo="Fontes deste objetivo" />

        <div className="mt-12 flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <span>Variável / indicador</span>
          <span>Nota (0–100)</span>
        </div>

        <div className="-mx-6 mt-3 border-t sm:-mx-10">
          {objetivo.variaveis.length === 0 ? (
            <p className="px-6 py-8 text-sm text-muted-foreground sm:px-10">
              Não há indicadores detalhados disponíveis para este objetivo neste
              ente.
            </p>
          ) : (
            objetivo.variaveis.map(variavel => (
              <div
                key={variavel.slug}
                className="flex items-center gap-4 border-b px-6 py-6 sm:px-10"
              >
                <div className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {variavel.nome}
                  </span>
                  <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Fonte: {variavel.fonte} · {variavel.anoFonte}
                  </span>
                </div>
                <VariavelAcoes
                  nome={variavel.nome}
                  fonteUrl={variavel.fonteUrl}
                  arquivo={variavel.arquivo}
                  nivelKey={nivel.key}
                  conceptId={variavel.conceptId}
                  subItens={variavel.subItens}
                />
                <span className="ml-auto shrink-0 text-sm font-semibold tabular-nums text-foreground">
                  {formatScore(variavel.nota)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
