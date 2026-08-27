'use client'

import { Info } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { ComparativoBarChart } from '@/components/charts/comparativo-bar-chart'
import {
  ObjetivosRadar,
  type RadarSerie,
} from '@/components/charts/objetivos-radar'
import { EntendaGraficoTip } from '@/components/indicadores/entenda-grafico-panel'
import { BandeiraEnte } from '@/components/shared/bandeira-ente'
import { EnteBusca } from '@/components/shared/ente-busca'
import { FilterPill } from '@/components/shared/filter-pill'
import { FontesRecorte } from '@/components/shared/fontes-recorte'
import { HomeFaq } from '@/components/shared/home-faq'
import { InfoTip } from '@/components/shared/info-tip'
import { VariantLink } from '@/components/shared/variant-link'
import { VariavelAcoes } from '@/components/shared/variavel-acoes'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  fontesPorNomes,
  fontesTodosObjetivosAtivos,
  GLOSSARIO,
} from '@/data/help-copy'
import {
  type Ente,
  formatScore,
  mediasPorObjetivo,
  type NivelKey,
  niveis,
} from '@/data/indicators'
import { objectives } from '@/data/objectives'
import {
  filtrarValoresPorIndices,
  formatNotaObjetivosInativos,
  objetivosParaRadar,
} from '@/data/objectives-availability'
import {
  motivoTematicaDesabilitada,
  notaTematica,
  tematicaSelecionavel,
  tematicas,
  tematicasComCobertura,
  variaveisPorTematica,
} from '@/data/tematicas'
import { INDICADORES_TOUR_STEPS } from '@/data/tour-copy'
import { useGuidedTour } from '@/hooks/use-guided-tour'
import { ENTE_BUSCA_LIMIAR, entePassaBusca } from '@/lib/ente-busca'
import { usePlatformVariant } from '@/lib/features/use-platform-variant'
import { bandeiraSrc } from '@/lib/geo/entes-geo'
import {
  type IndicadoresFiltros,
  indicadoresHref,
  MAX_ENTES_COMPARATIVO,
  normalizarIndicadoresFiltros,
} from '@/lib/indicadores-url'
import { cn } from '@/lib/utils'

const CORES = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-5)',
  '#b4536a',
]
const MEDIA_COR = 'var(--chart-4)'

type TagVariavelNotas = {
  slug: string
  nome: string
  fonte: string
  fonteUrl: string
  conceptId: string
  subItens: string | null
  notas: Record<string, number | null>
}

export function IndicadoresExplorer({
  filtros: filtrosServidor,
}: {
  filtros: IndicadoresFiltros
}) {
  const router = useRouter()
  const { link } = usePlatformVariant()
  const { startTour } = useGuidedTour({
    id: 'indicadores',
    steps: INDICADORES_TOUR_STEPS,
    readySelector: '[data-tour="indicadores-nivel"]',
  })
  const [filtros, setFiltros] = React.useState(filtrosServidor)
  const filtrosKey = indicadoresHref(filtrosServidor)
  const [prevFiltrosKey, setPrevFiltrosKey] = React.useState(filtrosKey)
  if (filtrosKey !== prevFiltrosKey) {
    setPrevFiltrosKey(filtrosKey)
    setFiltros(filtrosServidor)
  }

  const nivelKey = filtros.nivel
  const enteSlugs = filtros.entes
  const modo = filtros.por
  const tagSlug = filtros.tema

  const nivel = niveis.find(n => n.key === nivelKey) ?? null
  const medias = nivel ? mediasPorObjetivo(nivel) : []
  const coberturaTemas = React.useMemo(
    () => (nivel ? tematicasComCobertura(nivel) : []),
    [nivel]
  )

  const atualizar = React.useCallback(
    (patch: Partial<IndicadoresFiltros>) => {
      const next = normalizarIndicadoresFiltros({ ...filtros, ...patch })
      if (next.por === 'tematicas' && next.tema && next.nivel) {
        const nivelAlvo = niveis.find(n => n.key === next.nivel)
        if (nivelAlvo) {
          const cob = tematicasComCobertura(nivelAlvo)
          if (!tematicaSelecionavel(next.tema, cob)) {
            next.tema = null
          }
        }
      }
      setFiltros(next)
      router.replace(link(indicadoresHref(next)), { scroll: false })
    },
    [filtros, link, router]
  )

  React.useEffect(() => {
    if (
      modo !== 'tematicas' ||
      !tagSlug ||
      !nivel ||
      tematicaSelecionavel(tagSlug, coberturaTemas)
    ) {
      return
    }
    atualizar({ tema: null })
  }, [modo, tagSlug, nivel, coberturaTemas, atualizar])

  function selecionarNivel(key: NivelKey) {
    setBuscaEnte('')
    const alvo = niveis.find(n => n.key === key)
    atualizar({
      nivel: key,
      tema: null,
      entes:
        alvo && !alvo.isRanking && alvo.entes[0] ? [alvo.entes[0].slug] : [],
    })
  }

  function selecionarTematica(slug: string, temCobertura: boolean) {
    if (!nivelKey) return
    const motivo = motivoTematicaDesabilitada(nivelKey, temCobertura)
    if (motivo) {
      toast(motivo, {
        position: 'bottom-right',
      })
      return
    }
    atualizar({ tema: slug })
  }

  function alternarEnte(slug: string) {
    if (enteSlugs.includes(slug)) {
      atualizar({ entes: enteSlugs.filter(s => s !== slug) })
      return
    }
    if (enteSlugs.length >= MAX_ENTES_COMPARATIVO) {
      toast('Limite de 5 entes atingido', {
        description: 'Desselecione um para selecionar outro.',
        position: 'bottom-right',
      })
      return
    }
    atualizar({ entes: [...enteSlugs, slug] })
  }

  const entesSelecionados: Ente[] = nivel
    ? enteSlugs
        .map(s => nivel.entes.find(e => e.slug === s))
        .filter((e): e is Ente => Boolean(e))
    : []

  const porObjetivos = modo === 'objetivos'
  const tematica = tagSlug
    ? (tematicas.find(t => t.slug === tagSlug) ?? null)
    : null

  const selecaoAtiva = porObjetivos ? true : Boolean(tematica)
  const rotuloSelecao = porObjetivos
    ? 'Perfil por objetivo'
    : (tematica?.nome ?? '')

  const valorEnte = (e: Ente): number | null => {
    if (!porObjetivos && tematica) return notaTematica(e, tematica.slug)
    return null
  }

  const completo = Boolean(
    nivel && entesSelecionados.length >= 1 && selecaoAtiva
  )

  const radarFonte =
    nivel?.entes[0]?.objetivos ??
    objectives.map((o, i) => ({
      numero: i + 1,
      titulo: o.title,
      nota: null as number | null,
    }))
  const { ativos, inativos, indicesAtivos } = objetivosParaRadar(radarFonte)
  const radarEixos = ativos.map(o => ({
    eixo: String(o.numero).padStart(2, '0'),
    objetivo: o.titulo,
    slug: objectives[o.numero - 1]?.slug,
  }))
  const notaInativos = formatNotaObjetivosInativos(inativos)
  const mostrarMedia = Boolean(nivel && nivel.entes.length > 1)
  const radarSeries: RadarSerie[] = [
    ...entesSelecionados.map((e, idx) => ({
      nome: e.nome,
      cor: CORES[idx],
      valores: filtrarValoresPorIndices(
        e.objetivos.map(o => o.nota),
        indicesAtivos
      ),
      fillOpacity: entesSelecionados.length > 1 ? 0.14 : 0.24,
    })),
    ...(mostrarMedia
      ? [
          {
            nome: 'Média do nível',
            cor: MEDIA_COR,
            valores: filtrarValoresPorIndices(medias, indicesAtivos),
            fillOpacity: 0.1,
          },
        ]
      : []),
  ]

  const barrasTematicas =
    tematica &&
    entesSelecionados
      .map((e, idx) => {
        const valor = notaTematica(e, tematica.slug)
        return valor == null ? null : { nome: e.nome, valor, cor: CORES[idx] }
      })
      .filter(
        (x): x is { nome: string; valor: number; cor: string } => x !== null
      )

  const varsTag = tematica ? (variaveisPorTematica[tematica.slug] ?? []) : []
  const [varsTagNotas, setVarsTagNotas] = React.useState<
    TagVariavelNotas[] | null
  >(null)
  const [varsTagLoading, setVarsTagLoading] = React.useState(false)
  const [buscaEnte, setBuscaEnte] = React.useState('')
  const listaEntesRef = React.useRef<HTMLUListElement>(null)
  const [listaTemMaisAbaixo, setListaTemMaisAbaixo] = React.useState(false)

  const entesKey = enteSlugs.join(',')
  React.useEffect(() => {
    if (porObjetivos || !tematica || !nivelKey || enteSlugs.length === 0) {
      setVarsTagNotas(null)
      setVarsTagLoading(false)
      return
    }
    const ac = new AbortController()
    setVarsTagLoading(true)
    const params = new URLSearchParams({
      nivel: nivelKey,
      tema: tematica.slug,
      entes: entesKey,
    })
    fetch(`/api/obgd/tag-variaveis?${params}`, { signal: ac.signal })
      .then(async res => {
        const data = (await res.json()) as { variaveis?: TagVariavelNotas[] }
        if (!ac.signal.aborted) {
          setVarsTagNotas(Array.isArray(data.variaveis) ? data.variaveis : [])
        }
      })
      .catch(() => {
        if (!ac.signal.aborted) setVarsTagNotas([])
      })
      .finally(() => {
        if (!ac.signal.aborted) setVarsTagLoading(false)
      })
    return () => ac.abort()
  }, [porObjetivos, tematica, nivelKey, entesKey, enteSlugs.length])

  const mostrarBuscaEntes =
    Boolean(nivel?.isRanking) &&
    (nivelKey === 'municipios' ||
      (nivel?.entes.length ?? 0) > ENTE_BUSCA_LIMIAR)
  const entesVisiveis = nivel
    ? nivel.entes.filter(
        e =>
          enteSlugs.includes(e.slug) ||
          !mostrarBuscaEntes ||
          entePassaBusca(e, buscaEnte)
      )
    : []

  const atualizarFadeLista = React.useCallback(() => {
    const el = listaEntesRef.current
    if (!el) {
      setListaTemMaisAbaixo(false)
      return
    }
    setListaTemMaisAbaixo(el.scrollHeight - el.scrollTop - el.clientHeight > 1)
  }, [])

  React.useEffect(() => {
    if (!mostrarBuscaEntes) {
      setListaTemMaisAbaixo(false)
      return
    }
    const el = listaEntesRef.current
    if (!el) return
    atualizarFadeLista()
    if (entesVisiveis.length === 0) return
    el.addEventListener('scroll', atualizarFadeLista, { passive: true })
    const observer = new ResizeObserver(atualizarFadeLista)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', atualizarFadeLista)
      observer.disconnect()
    }
  }, [mostrarBuscaEntes, atualizarFadeLista, entesVisiveis.length])

  const fontesRecorte = React.useMemo(() => {
    if (!completo) return []
    if (porObjetivos) return fontesTodosObjetivosAtivos()
    const nomes = tematica
      ? (variaveisPorTematica[tematica.slug] ?? []).map(v => v.fonte)
      : []
    return fontesPorNomes(nomes)
  }, [completo, porObjetivos, tematica])

  return (
    <section className="pb-12">
      <div className="px-6 pt-28 pb-16 sm:px-10">
        <div data-tour="indicadores-intro">
          <span className="text-sm font-medium text-muted-foreground">
            Indicadores
          </span>
          <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text font-bold text-4xl text-transparent leading-tight tracking-tight sm:text-5xl">
            Explorar indicadores
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Compare o governo federal, os estados e os municípios com 100 mil
            habitantes ou mais nos objetivos da ENGD ou em categorias temáticas.
            As notas vêm de indicadores de fontes públicas — sem precisar de uma
            média geral entre objetivos.{' '}
            <button
              type="button"
              onClick={() => startTour()}
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Como funciona
            </button>
          </p>
        </div>

        <div className="dash-y -mx-6 mt-10 grid gap-8 px-6 pt-8 pb-8 sm:-mx-10 sm:px-10 lg:grid-cols-2 lg:gap-0">
          <div data-tour="indicadores-nivel">
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Nível de governo
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {niveis.map(item => (
                <FilterPill
                  key={item.key}
                  active={item.key === nivelKey}
                  onClick={() => selecionarNivel(item.key)}
                  className="px-5 py-2.5"
                >
                  {item.label}
                </FilterPill>
              ))}
            </div>
            {nivelKey === 'municipios' && (
              <p className="mt-3 text-muted-foreground text-xs leading-relaxed">
                Municípios com 100 mil habitantes ou mais.
              </p>
            )}
          </div>

          <div className="lg:dash-l lg:pl-8" data-tour="indicadores-modo">
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Ordenar por
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              <FilterPill
                active={porObjetivos}
                onClick={() => atualizar({ por: 'objetivos', tema: null })}
              >
                Objetivos da ENGD
              </FilterPill>
              <FilterPill
                active={!porObjetivos}
                onClick={() => atualizar({ por: 'tematicas' })}
              >
                Categorias temáticas
              </FilterPill>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div
            className={cn('grid', porObjetivos ? 'grid-cols-1' : 'grid-cols-2')}
          >
            <div
              className={cn('flex flex-col', !porObjetivos && 'pr-4')}
              data-tour="indicadores-entes"
            >
              <div className="flex items-baseline justify-between gap-2 px-3 pb-2">
                <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                  Ente
                </span>
                {nivel?.isRanking && (
                  <span className="text-[10px] text-muted-foreground">
                    {enteSlugs.length}/{MAX_ENTES_COMPARATIVO}
                  </span>
                )}
              </div>
              {mostrarBuscaEntes && (
                <div className="mb-2 px-1">
                  <EnteBusca value={buscaEnte} onChange={setBuscaEnte} />
                </div>
              )}
              <div className={cn(mostrarBuscaEntes && 'relative')}>
                <ul
                  ref={listaEntesRef}
                  className={
                    mostrarBuscaEntes
                      ? 'flex max-h-[36rem] flex-col gap-1 overflow-y-auto'
                      : 'flex flex-col gap-1'
                  }
                >
                  {!nivel && (
                    <li className="px-3 py-2 text-muted-foreground text-sm">
                      Selecione um nível.
                    </li>
                  )}
                  {nivel && entesVisiveis.length === 0 && (
                    <li className="px-3 py-2 text-muted-foreground text-sm">
                      Nenhum ente encontrado.
                    </li>
                  )}
                  {entesVisiveis.map(e => {
                    const idx = enteSlugs.indexOf(e.slug)
                    const isActive = idx >= 0
                    const bloqueado =
                      !isActive && enteSlugs.length >= MAX_ENTES_COMPARATIVO
                    const valor = selecaoAtiva ? valorEnte(e) : null
                    return (
                      <li key={e.slug}>
                        <button
                          type="button"
                          aria-disabled={bloqueado}
                          onClick={() => alternarEnte(e.slug)}
                          className={cn(
                            'flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-[13px] transition-colors',
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
                            <BandeiraEnte
                              src={bandeiraSrc(e.nivel, e.slug, e.ufSigla)}
                              nome={e.nome}
                            />
                            <span className="truncate">{e.nome}</span>
                            {e.nivel === 'municipios' && e.ufSigla && (
                              <span className="shrink-0 text-[10px] text-muted-foreground">
                                {e.ufSigla}
                              </span>
                            )}
                          </span>
                          {valor != null && (
                            <span className="shrink-0 text-muted-foreground text-xs tabular-nums">
                              {formatScore(valor)}
                            </span>
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
                {mostrarBuscaEntes && (
                  <div
                    aria-hidden
                    className={cn(
                      'pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent transition-opacity',
                      listaTemMaisAbaixo ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                )}
              </div>
            </div>

            {!porObjetivos && (
              <div className="dash-x flex flex-col px-4">
                <div className="px-3 pb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                  Categoria
                </div>
                <ul className="flex flex-col gap-1">
                  {!nivel && (
                    <li className="px-3 py-2 text-muted-foreground text-sm">
                      Selecione um nível.
                    </li>
                  )}
                  {nivel &&
                    tematicas.map((tag, i) => {
                      const isActive = tag.slug === tagSlug
                      const temCobertura = Boolean(coberturaTemas[i])
                      const motivo = motivoTematicaDesabilitada(
                        nivel.key,
                        temCobertura
                      )
                      const desabilitado = Boolean(motivo)

                      const button = (
                        <button
                          type="button"
                          onClick={() =>
                            selecionarTematica(tag.slug, temCobertura)
                          }
                          aria-disabled={desabilitado}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[13px] transition-colors',
                            desabilitado &&
                              'cursor-not-allowed opacity-60 hover:bg-transparent hover:text-foreground',
                            !desabilitado &&
                              (isActive
                                ? 'bg-primary/10 font-medium text-primary'
                                : 'text-foreground hover:bg-primary/5 hover:text-primary')
                          )}
                        >
                          <span className="truncate">{tag.nome}</span>
                          {desabilitado && (
                            <Info
                              className="ml-auto size-3.5 shrink-0 opacity-70"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      )

                      return (
                        <li key={tag.slug}>
                          {motivo ? (
                            <Tooltip>
                              <TooltipTrigger asChild>{button}</TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="max-w-xs text-left leading-relaxed"
                              >
                                <p>{motivo}</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            button
                          )}
                        </li>
                      )
                    })}
                </ul>
              </div>
            )}
          </div>

          <div data-tour="indicadores-resultado">
            {completo ? (
              <div className="space-y-8">
                {porObjetivos ? (
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-bold text-foreground text-sm">
                        Perfil por objetivo
                      </h2>
                      <InfoTip label="O que é o índice?">
                        {GLOSSARIO.subIndice}
                      </InfoTip>
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm">
                      Comparação dos entes selecionados nos objetivos da ENGD
                      com cobertura de dados. Cada eixo é um índice (0–100).{' '}
                      <EntendaGraficoTip modo="objetivos" />
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-xs">
                      {entesSelecionados.map((e, idx) => (
                        <VariantLink
                          key={e.slug}
                          href={`/indicadores/${nivelKey}/${e.slug}`}
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                        >
                          <span
                            aria-hidden="true"
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: CORES[idx] }}
                          />
                          {e.nome}
                        </VariantLink>
                      ))}
                      {mostrarMedia && (
                        <span className="inline-flex items-center gap-1">
                          <span
                            aria-hidden="true"
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: MEDIA_COR }}
                          />
                          Média do nível
                          <InfoTip label="O que é a média do nível?">
                            {GLOSSARIO.mediaDoNivel}
                          </InfoTip>
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <ObjetivosRadar eixos={radarEixos} series={radarSeries} />
                    </div>
                    {notaInativos && (
                      <p className="mx-auto mt-4 max-w-md text-center text-xs text-muted-foreground">
                        {notaInativos}
                      </p>
                    )}
                    <div className="mt-6 flex flex-col gap-2">
                      {entesSelecionados.map(e => (
                        <VariantLink
                          key={e.slug}
                          href={`/indicadores/${nivelKey}/${e.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                        >
                          Ver variáveis e detalhes de {e.nome}
                        </VariantLink>
                      ))}
                    </div>
                    <FontesRecorte fontes={fontesRecorte} />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-bold text-foreground text-sm">
                        Comparativo · {rotuloSelecao}
                      </h2>
                      <InfoTip label="O que é o score da tag?">
                        {GLOSSARIO.scoreTag}
                      </InfoTip>
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm">
                      {tematica?.descricao ??
                        'Score da tag (média dos indicadores ativos) dos entes selecionados.'}{' '}
                      <EntendaGraficoTip
                        modo="tematicas"
                        tagNome={tematica?.nome}
                        tagDescricao={tematica?.descricao}
                      />
                    </p>
                    {barrasTematicas && (
                      <div className="mt-4">
                        <ComparativoBarChart entes={barrasTematicas} />
                      </div>
                    )}
                    {(varsTag.length > 0 || varsTagLoading || varsTagNotas) && (
                      <div className="dash-t mt-8 pt-6">
                        <h3 className="font-bold text-foreground text-sm">
                          Variáveis atreladas à tag
                        </h3>
                        <p className="mt-1 text-muted-foreground text-xs">
                          Indicadores ativos associados a esta tag, com a nota
                          (0–100) de cada ente selecionado.
                        </p>
                        {varsTagLoading && (
                          <p className="mt-4 text-muted-foreground text-xs">
                            Carregando valores…
                          </p>
                        )}
                        {!varsTagLoading &&
                          varsTagNotas &&
                          varsTagNotas.length > 0 && (
                            <ul className="mt-4 border-t">
                              {varsTagNotas.map(v => (
                                <li
                                  key={v.slug}
                                  className="flex items-center justify-between gap-3 border-b py-3 last:border-b-0"
                                >
                                  <span className="min-w-0">
                                    <span className="block text-foreground text-xs font-medium">
                                      {v.nome}
                                    </span>
                                    <span className="mt-0.5 block text-[10px] text-muted-foreground uppercase tracking-wide">
                                      {v.fonte}
                                    </span>
                                    <span className="mt-2 flex flex-wrap gap-1.5">
                                      {entesSelecionados.map((e, idx) => {
                                        const nota = v.notas[e.slug]
                                        return (
                                          <span
                                            key={e.slug}
                                            className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs tabular-nums text-foreground"
                                            title={e.nome}
                                          >
                                            {entesSelecionados.length > 1 && (
                                              <span
                                                aria-hidden="true"
                                                className="size-1.5 shrink-0 rounded-full"
                                                style={{
                                                  backgroundColor: CORES[idx],
                                                }}
                                              />
                                            )}
                                            {nota == null
                                              ? '—'
                                              : formatScore(nota)}
                                          </span>
                                        )
                                      })}
                                    </span>
                                  </span>
                                  {nivelKey ? (
                                    <VariavelAcoes
                                      nome={v.nome}
                                      fonteUrl={v.fonteUrl}
                                      arquivo={{
                                        nome: `obgd-${v.slug}.csv`,
                                        tamanho: 'CSV',
                                        tabelas: 1,
                                      }}
                                      nivelKey={nivelKey}
                                      conceptId={v.conceptId}
                                      subItens={v.subItens}
                                    />
                                  ) : null}
                                </li>
                              ))}
                            </ul>
                          )}
                        {!varsTagLoading &&
                          (!varsTagNotas || varsTagNotas.length === 0) &&
                          varsTag.length > 0 && (
                            <ul className="mt-4 border-t">
                              {varsTag.map(v => (
                                <li
                                  key={v.slug}
                                  className="flex items-center justify-between gap-3 border-b py-3 last:border-b-0"
                                >
                                  <span className="min-w-0">
                                    <span className="block text-foreground text-xs font-medium">
                                      {v.nome}
                                    </span>
                                    <span className="mt-0.5 block text-[10px] text-muted-foreground uppercase tracking-wide">
                                      {v.fonte}
                                    </span>
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                    )}
                    <FontesRecorte fontes={fontesRecorte} />
                  </div>
                )}
              </div>
            ) : (
              <div className="relative flex h-full min-h-64 items-center justify-center rounded-xl p-8 text-center">
                {/* Borda tracejada no mesmo padrão das linhas laterais da
                    página (traço 9px / vão 9px, cor --border). */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    rx="13.5"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="1"
                    strokeDasharray="9 9"
                    style={{
                      width: 'calc(100% - 1px)',
                      height: 'calc(100% - 1px)',
                    }}
                  />
                </svg>
                <p className="max-w-xs text-muted-foreground text-sm">
                  Selecione <span className="font-medium">nível</span> e{' '}
                  <span className="font-medium">ente(s)</span>
                  {!porObjetivos && (
                    <>
                      {' '}
                      e <span className="font-medium">categoria</span>
                    </>
                  )}
                  <br />
                  para visualizar os gráficos.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="dash-t mt-16 pt-10" data-tour="indicadores-ajuda">
          <h2 className="font-bold text-foreground text-lg tracking-tight">
            Perguntas frequentes
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Respostas rápidas sobre o que medimos, de onde vêm os dados e como
            comparar entes.{' '}
            <Link
              href="/metodologia"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Metodologia completa
            </Link>
          </p>
          <HomeFaq />
        </div>
      </div>
    </section>
  )
}
