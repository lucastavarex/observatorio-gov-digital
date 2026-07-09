'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { DistribuicaoChart } from '@/components/charts/distribuicao-chart'
import {
  ObjetivosRadar,
  type RadarSerie,
} from '@/components/charts/objetivos-radar'
import {
  type Ente,
  formatScore,
  mediasPorObjetivo,
  type NivelKey,
  niveis,
} from '@/data/indicators'
import { objectives } from '@/data/objectives'
import { cn } from '@/lib/utils'

// Cores das séries (até 3 entes comparados).
const CORES = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)']
const MEDIA_COR = 'var(--chart-4)'
const MAX_ENTES = 3
const ANOS = [2026, 2025, 2024, 2023, 2022]

export function IndicadoresExplorer() {
  const [nivelKey, setNivelKey] = React.useState<NivelKey | null>(null)
  const [enteSlugs, setEnteSlugs] = React.useState<string[]>([])
  const [objetivoSlug, setObjetivoSlug] = React.useState<string | null>(null)
  const [ano, setAno] = React.useState(ANOS[0])
  const [anoAberto, setAnoAberto] = React.useState(false)

  const nivel = niveis.find(n => n.key === nivelKey) ?? null
  const medias = nivel ? mediasPorObjetivo(nivel) : []

  function selecionarNivel(key: NivelKey) {
    const alvo = niveis.find(n => n.key === key)
    setNivelKey(key)
    setObjetivoSlug(null)
    // Federal é entidade única: já seleciona o ente automaticamente.
    setEnteSlugs(
      alvo && !alvo.isRanking && alvo.entes[0] ? [alvo.entes[0].slug] : []
    )
  }

  function alternarEnte(slug: string) {
    setEnteSlugs(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug)
      if (prev.length >= MAX_ENTES) return prev
      return [...prev, slug]
    })
  }

  const entesSelecionados: Ente[] = nivel
    ? enteSlugs
        .map(s => nivel.entes.find(e => e.slug === s))
        .filter((e): e is Ente => Boolean(e))
    : []

  const objIndex = objetivoSlug
    ? objectives.findIndex(o => o.slug === objetivoSlug)
    : -1
  const objetivoCoberto = objIndex >= 0 && medias[objIndex] !== null
  const objetivoTitulo = objIndex >= 0 ? objectives[objIndex].title : ''

  const completo = Boolean(
    nivel && entesSelecionados.length >= 1 && objetivoCoberto
  )

  const radarEixos = objectives.map((o, i) => ({
    eixo: String(i + 1).padStart(2, '0'),
    objetivo: o.title,
  }))
  const mostrarMedia = Boolean(nivel && nivel.entes.length > 1)
  const radarSeries: RadarSerie[] = [
    ...entesSelecionados.map((e, idx) => ({
      nome: e.nome,
      cor: CORES[idx],
      valores: e.objetivos.map(o => o.nota),
      fillOpacity: entesSelecionados.length > 1 ? 0.14 : 0.24,
    })),
    ...(mostrarMedia
      ? [
          {
            nome: 'Média do nível',
            cor: MEDIA_COR,
            valores: medias,
            fillOpacity: 0.1,
          },
        ]
      : []),
  ]

  const entesObjetivo =
    nivel && objIndex >= 0
      ? nivel.entes.map(e => ({
          nome: e.nome,
          indiceGeral: e.objetivos[objIndex]?.nota ?? 0,
        }))
      : []
  const destaques = entesSelecionados.map(e => e.objetivos[objIndex]?.nota ?? 0)

  return (
    <section className="pb-12">
      <div className="dash-x px-6 pb-16 pt-28 sm:px-10">
        <span className="text-sm font-medium text-muted-foreground">
          Indicadores
        </span>
        <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
          Explorar indicadores
        </h1>

        {/* Filtros de nível — largura total, linha pontilhada até a borda direita */}
        <div className="dash-b -mx-6 mt-10 px-6 pb-4 sm:-mx-10 sm:px-10">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Nível de governo
          </span>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {niveis.map(item => {
                const isActive = item.key === nivelKey
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => selecionarNivel(item.key)}
                    className={cn(
                      'rounded-full border px-5 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:bg-primary/5 hover:text-primary'
                    )}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>

            {/* Filtro por ano */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAnoAberto(v => !v)}
                aria-expanded={anoAberto}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
              >
                {ano}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-4 transition-transform',
                    anoAberto && 'rotate-180'
                  )}
                />
              </button>
              {anoAberto && (
                <>
                  <button
                    type="button"
                    aria-label="Fechar seletor de ano"
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setAnoAberto(false)}
                  />
                  <div className="absolute right-0 z-20 mt-1 w-28 rounded-lg border bg-background p-1 shadow-md">
                    {ANOS.map(a => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => {
                          setAno(a)
                          setAnoAberto(false)
                        }}
                        className={cn(
                          'block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors',
                          a === ano
                            ? 'bg-primary/10 font-medium text-primary'
                            : 'text-foreground hover:bg-primary/5 hover:text-primary'
                        )}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Colunas: controles à esquerda, gráficos à direita */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Coluna esquerda: entes e objetivos */}
          <div className="grid grid-cols-2">
            {/* Entes */}
            <div className="flex flex-col pr-4">
              <div className="flex items-baseline justify-between gap-2 px-3 pb-2">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Ente
                </span>
                {nivel?.isRanking && (
                  <span className="text-[10px] text-muted-foreground">
                    {enteSlugs.length}/{MAX_ENTES}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-1">
                {!nivel && (
                  <li className="px-3 py-2 text-sm text-muted-foreground">
                    Selecione um nível.
                  </li>
                )}
                {nivel?.entes.map(e => {
                  const idx = enteSlugs.indexOf(e.slug)
                  const isActive = idx >= 0
                  const bloqueado = !isActive && enteSlugs.length >= MAX_ENTES
                  return (
                    <li key={e.slug}>
                      <button
                        type="button"
                        disabled={bloqueado}
                        onClick={() => alternarEnte(e.slug)}
                        className={cn(
                          'flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
                          isActive
                            ? 'bg-primary/10 font-medium text-primary'
                            : bloqueado
                              ? 'cursor-not-allowed text-muted-foreground/40'
                              : 'text-foreground hover:bg-primary/5 hover:text-primary'
                        )}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="size-2 shrink-0 rounded-full"
                              style={{ backgroundColor: CORES[idx] }}
                            />
                          )}
                          <span className="truncate">{e.nome}</span>
                        </span>
                        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                          {formatScore(e.indiceGeral)}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Objetivos */}
            <div className="dash-x flex flex-col px-4">
              <div className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Objetivo
              </div>
              <ul className="flex flex-col gap-1">
                {!nivel && (
                  <li className="px-3 py-2 text-sm text-muted-foreground">
                    Selecione um nível.
                  </li>
                )}
                {nivel &&
                  objectives.map((obj, i) => {
                    const coberto = medias[i] !== null
                    const isActive = obj.slug === objetivoSlug
                    return (
                      <li key={obj.slug}>
                        <button
                          type="button"
                          disabled={!coberto}
                          onClick={() => setObjetivoSlug(obj.slug)}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
                            !coberto
                              ? 'cursor-not-allowed text-muted-foreground/50'
                              : isActive
                                ? 'bg-primary/10 font-medium text-primary'
                                : 'text-foreground hover:bg-primary/5 hover:text-primary'
                          )}
                        >
                          <span className="shrink-0 tabular-nums text-muted-foreground">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="truncate">{obj.title}</span>
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>

          {/* Coluna direita: gráficos */}
          <div>
            {completo ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-sm font-bold text-foreground">
                    Perfil por objetivo
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Comparação dos entes selecionados nos dez objetivos da ENGD.
                  </p>

                  {/* Legenda do radar */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {entesSelecionados.map((e, idx) => (
                      <span
                        key={e.slug}
                        className="inline-flex items-center gap-1.5"
                      >
                        <span
                          aria-hidden="true"
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: CORES[idx] }}
                        />
                        {e.nome}
                      </span>
                    ))}
                    {mostrarMedia && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: MEDIA_COR }}
                        />
                        Média do nível
                      </span>
                    )}
                  </div>

                  <div className="mt-2">
                    <ObjetivosRadar eixos={radarEixos} series={radarSeries} />
                  </div>
                </div>

                {nivel!.isRanking && nivel!.entes.length >= 5 && (
                  <div>
                    <h2 className="text-sm font-bold text-foreground">
                      Distribuição · {objetivoTitulo}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Nota dos {nivel!.entes.length} entes no objetivo, com
                      destaque para os selecionados.
                    </p>
                    <div className="mt-4">
                      <DistribuicaoChart
                        entes={entesObjetivo}
                        destaques={destaques}
                        selecionados={entesSelecionados.map(e => e.nome)}
                        horizontal
                        alturaClasse="h-[24rem]"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full min-h-64 items-center justify-center rounded-xl border border-dashed p-8 text-center">
                <p className="max-w-xs text-sm text-muted-foreground">
                  Selecione <span className="font-medium">nível</span>,{' '}
                  <span className="font-medium">ente(s)</span> e{' '}
                  <span className="font-medium">objetivo</span>
                  <br />
                  para visualizar os gráficos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
