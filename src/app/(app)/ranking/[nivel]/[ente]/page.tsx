import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DistribuicaoChart } from '@/components/charts/distribuicao-chart'
import {
  ObjetivosRadar,
  type RadarSerie,
} from '@/components/charts/objetivos-radar'
import {
  formatScore,
  getEnte,
  getNivel,
  mediasPorObjetivo,
  niveis,
} from '@/data/indicators'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return niveis.flatMap(nivel =>
    nivel.entes.map(ente => ({ nivel: nivel.key, ente: ente.slug }))
  )
}

export default async function EntePage({
  params,
}: {
  params: Promise<{ nivel: string; ente: string }>
}) {
  const { nivel: nivelKey, ente: enteSlug } = await params
  const nivel = getNivel(nivelKey)
  const ente = getEnte(nivelKey, enteSlug)

  if (!nivel || !ente) {
    notFound()
  }

  const medias = mediasPorObjetivo(nivel)
  const radarEixos = ente.objetivos.map(objetivo => ({
    eixo: String(objetivo.numero).padStart(2, '0'),
    objetivo: objetivo.titulo,
  }))
  const radarSeries: RadarSerie[] = [
    {
      nome: ente.nome,
      cor: 'var(--chart-1)',
      valores: ente.objetivos.map(o => o.nota),
      fillOpacity: 0.28,
    },
    ...(nivel.entes.length > 1
      ? [
          {
            nome: 'Média do nível',
            cor: 'var(--chart-4)',
            valores: medias,
            fillOpacity: 0.12,
          },
        ]
      : []),
  ]
  const semDados = ente.objetivos.filter(o => o.nota === null)
  const mostrarDistribuicao = nivel.isRanking && nivel.entes.length >= 5

  return (
    <section className="pb-12">
      <div className="dash-x relative px-6 pb-16 pt-20 sm:px-10">
        <Link
          href="/ranking"
          aria-label="Voltar para Ranking"
          className="absolute left-6 top-12 inline-flex items-center text-muted-foreground transition-colors hover:text-primary sm:left-10"
        >
          <ArrowLeft className="size-5" />
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <span className="block text-sm font-medium text-muted-foreground">
              {nivel.label}
            </span>
            <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
              {ente.nome}
            </h1>
          </div>
          <div className="flex flex-row-reverse items-end justify-start gap-2.5 text-right sm:block sm:gap-0">
            <span className="block pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:pb-0">
              Índice Geral
            </span>
            <span className="block bg-linear-to-br from-primary to-primary-glow bg-clip-text text-7xl font-bold leading-tight tracking-tight tabular-nums text-transparent sm:text-8xl">
              {formatScore(ente.indiceGeral)}
            </span>
          </div>
        </div>

        {/* Gráficos */}
        <div
          className={cn(
            'mt-14 grid gap-10',
            mostrarDistribuicao && 'lg:grid-cols-2'
          )}
        >
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Perfil por objetivo
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {nivel.entes.length > 1
                ? `Nota do ente em cada objetivo, comparada à média do nível ${nivel.label.toLowerCase()}.`
                : 'Nota do ente em cada um dos dez objetivos da ENGD.'}
            </p>
            {/* Legenda do radar */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-primary" />
                {ente.nome}
              </span>
              {nivel.entes.length > 1 && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-chart-4" />
                  Média do nível
                </span>
              )}
            </div>

            <div className="mt-4">
              <ObjetivosRadar eixos={radarEixos} series={radarSeries} />
            </div>

            {semDados.length > 0 && (
              <p className="mx-auto mt-4 flex w-fit rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                Objetivos sem dados neste nível:{' '}
                {semDados
                  .map(o => String(o.numero).padStart(2, '0'))
                  .join(', ')}
              </p>
            )}
          </div>

          {mostrarDistribuicao && (
            <div>
              <h2 className="text-sm font-bold text-foreground">
                Posição no nível
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Distribuição do índice geral entre os {nivel.entes.length}{' '}
                entes, com destaque para {ente.nome}.
              </p>
              <div className="mt-4">
                <DistribuicaoChart
                  entes={nivel.entes.map(e => ({
                    nome: e.nome,
                    indiceGeral: e.indiceGeral,
                  }))}
                  destaques={[ente.indiceGeral]}
                  selecionados={[ente.nome]}
                  alturaClasse="h-[26rem] sm:h-[30rem]"
                  horizontal
                  badge={ente.nome}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cabeçalho da lista */}
        <div className="mt-14 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <span>Objetivo da ENGD</span>
          <span>Nota (0–100)</span>
        </div>

        <div className="-mx-6 mt-3 border-t sm:-mx-10">
          {ente.objetivos.map(objetivo => {
            const semCobertura = objetivo.nota === null
            const conteudo = (
              <>
                <span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">
                  {String(objetivo.numero).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'flex-1 text-sm font-medium',
                    semCobertura ? 'text-muted-foreground' : 'text-primary'
                  )}
                >
                  {objetivo.titulo}
                </span>
                {semCobertura ? (
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Sem dados
                  </span>
                ) : (
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    {objetivo.nota}
                  </span>
                )}
              </>
            )

            if (semCobertura) {
              return (
                <div
                  key={objetivo.objetivoSlug}
                  className="flex items-center gap-4 border-b px-6 py-5 opacity-60 sm:px-10"
                >
                  {conteudo}
                </div>
              )
            }

            return (
              <Link
                key={objetivo.objetivoSlug}
                href={`/ranking/${nivel.key}/${ente.slug}/${objetivo.objetivoSlug}`}
                className="flex items-center gap-4 border-b px-6 py-5 transition-colors hover:bg-primary/5 sm:px-10"
              >
                {conteudo}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
