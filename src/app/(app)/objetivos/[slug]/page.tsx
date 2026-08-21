import { notFound } from 'next/navigation'

import { BackButton } from '@/components/shared/back-button'
import { InfoTip } from '@/components/shared/info-tip'
import { VariantLink } from '@/components/shared/variant-link'
import { formatScore } from '@/data/indicators'
import { indicadoresDoObjetivo } from '@/data/obgd/objetivo-indicadores'
import { getObjective, getObjectiveNumber, objectives } from '@/data/objectives'
import { isObjetivo3, OBJETIVO_3_MOTIVO } from '@/data/objectives-availability'
import { rankingHref } from '@/lib/ranking-url'

export function generateStaticParams() {
  return objectives.map(objective => ({ slug: objective.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const objective = getObjective(slug)
  return { title: objective ? objective.title : 'Objetivo' }
}

export default async function ObjetivoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const objective = getObjective(slug)

  if (!objective) {
    notFound()
  }

  const number = getObjectiveNumber(slug)
  const indicadores = indicadoresDoObjetivo(number)
  const obj3 = isObjetivo3(slug)
  const rankingUrl = rankingHref({
    nivel: 'estadual',
    por: 'objetivos',
    objetivo: slug,
    tema: '',
  })

  return (
    <section className="pb-12">
      <div className="relative px-6 pb-16 pt-28 sm:px-10">
        <BackButton
          fallbackHref="/objetivos"
          label="Voltar para Objetivos"
          className="absolute top-12 left-6 inline-flex items-center text-muted-foreground transition-colors hover:text-primary sm:left-10"
        />
        <span className="block text-sm font-medium text-muted-foreground">
          Objetivo {String(number).padStart(2, '0')}
        </span>
        <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
          {objective.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {objective.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <VariantLink
            href={`/indicadores?por=objetivos`}
            className="text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Comparar entes neste objetivo
          </VariantLink>
          {!obj3 && (
            <VariantLink
              href={rankingUrl}
              className="text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              Ver ranking estadual
            </VariantLink>
          )}
        </div>

        <div className="-mx-6 mt-16 border-t sm:-mx-10">
          {objective.recommendations.map(recommendation => (
            <div
              key={recommendation.label}
              className="grid gap-2 border-b px-6 py-8 sm:px-10 lg:grid-cols-3 lg:gap-16"
            >
              <h3 className="text-sm font-medium tracking-tight text-primary">
                {recommendation.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-2">
                {recommendation.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-sm font-bold tracking-tight text-foreground">
            Indicadores que compõem este objetivo
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Variáveis ativas usadas no índice. A nota à direita é o valor
            nacional normalizado (0–100), quando há observação para o Brasil.
            {obj3 ? (
              <span className="ml-1 inline-flex align-text-bottom">
                <InfoTip label="Por que este objetivo está desabilitado?">
                  {OBJETIVO_3_MOTIVO}
                </InfoTip>
              </span>
            ) : null}
          </p>

          <div className="mt-6 flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>Variável / indicador</span>
            <span>Nota nacional (0–100)</span>
          </div>
          <div className="-mx-6 mt-3 border-t sm:-mx-10">
            {indicadores.length === 0 ? (
              <p className="px-6 py-8 text-sm text-muted-foreground sm:px-10">
                Não há indicadores ativos catalogados para este objetivo.
              </p>
            ) : (
              indicadores.map(item => (
                <div
                  key={item.chave}
                  className="flex items-center gap-4 border-b px-6 py-6 sm:px-10"
                >
                  <div className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      {item.nome}
                    </span>
                    <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {item.fonte}
                    </span>
                  </div>
                  <span className="ml-auto shrink-0 text-sm font-semibold tabular-nums text-foreground">
                    {item.notaNacional == null
                      ? '—'
                      : formatScore(item.notaNacional)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
