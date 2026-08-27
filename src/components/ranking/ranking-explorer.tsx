'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { DistribuicaoChart } from '@/components/charts/distribuicao-chart'
import { TourTriggerButton } from '@/components/guided-tour/tour-trigger-button'
import { EnteRankingList } from '@/components/ranking/ente-ranking-list'
import { RankingVariaveisDisclaimer } from '@/components/ranking/ranking-variaveis-disclaimer'
import { FilterPill } from '@/components/shared/filter-pill'
import { type DadoMapa, MapaBrasil } from '@/components/shared/mapa-brasil'
import { ObjetivoChip } from '@/components/shared/objetivo-chip'
import { TematicaChip } from '@/components/shared/tematica-chip'
import { GLOSSARIO, oQueAvaliaObjetivo } from '@/data/help-copy'
import {
  type NivelKey,
  niveis,
  objetivosComCobertura,
  rankingDoNivel,
} from '@/data/indicators'
import { variaveisDoObjetivoNoNivel } from '@/data/obgd/variaveis-por-objetivo-nivel'
import { getObjectiveNumber, objectives } from '@/data/objectives'
import {
  objetivoSelecionavel,
  primeiroObjetivoSelecionavel,
} from '@/data/objectives-availability'
import {
  primeiraTematicaSelecionavel,
  rankingTematico,
  tematicaSelecionavel,
  tematicas,
  tematicasComCobertura,
} from '@/data/tematicas'
import { RANKING_TOUR_STEPS } from '@/data/tour-copy'
import { useGuidedTour } from '@/hooks/use-guided-tour'
import { usePlatformVariant } from '@/lib/features/use-platform-variant'
import { ufDeEnte } from '@/lib/geo/entes-geo'
import { type RankingFiltros, rankingHref } from '@/lib/ranking-url'

type Vista = 'grafico' | 'mapa'

export function RankingExplorer({
  filtros: filtrosServidor,
}: {
  filtros: RankingFiltros
}) {
  const router = useRouter()
  const { link } = usePlatformVariant()
  const { startTour } = useGuidedTour({
    id: 'ranking',
    steps: RANKING_TOUR_STEPS,
    readySelector: '[data-tour="ranking-nivel"]',
  })
  const [filtros, setFiltros] = React.useState(filtrosServidor)
  const filtrosKey = rankingHref(filtrosServidor)
  const [prevFiltrosKey, setPrevFiltrosKey] = React.useState(filtrosKey)
  if (filtrosKey !== prevFiltrosKey) {
    setPrevFiltrosKey(filtrosKey)
    setFiltros(filtrosServidor)
  }
  const [vista, setVista] = React.useState<Vista>('grafico')

  const active = filtros.nivel
  const modo = filtros.por
  const objetivoNumero = getObjectiveNumber(filtros.objetivo) || 1
  const tagSlug = filtros.tema

  const nivel = niveis.find(n => n.key === active) ?? niveis[1]
  const cobertura = React.useMemo(() => objetivosComCobertura(nivel), [nivel])
  const coberturaTemas = React.useMemo(
    () => tematicasComCobertura(nivel),
    [nivel]
  )

  const atualizar = React.useCallback(
    (patch: Partial<RankingFiltros>) => {
      const next: RankingFiltros = { ...filtros, ...patch }
      const nivelAlvo = niveis.find(n => n.key === next.nivel) ?? niveis[1]
      const cob = objetivosComCobertura(nivelAlvo)
      const num = getObjectiveNumber(next.objetivo)
      if (!num || !objetivoSelecionavel(num - 1, cob)) {
        const primeiro = primeiroObjetivoSelecionavel(cob)
        next.objetivo = objectives[primeiro - 1].slug
      }
      const cobTemas = tematicasComCobertura(nivelAlvo)
      if (!tematicaSelecionavel(next.tema, cobTemas)) {
        next.tema = primeiraTematicaSelecionavel(cobTemas)
      }
      setFiltros(next)
      router.replace(link(rankingHref(next)), { scroll: false })
    },
    [filtros, link, router]
  )

  React.useEffect(() => {
    if (!objetivoSelecionavel(objetivoNumero - 1, cobertura)) {
      const primeiro = primeiroObjetivoSelecionavel(cobertura)
      atualizar({ objetivo: objectives[primeiro - 1].slug })
      return
    }
    if (
      modo === 'tematicas' &&
      !tematicaSelecionavel(tagSlug, coberturaTemas)
    ) {
      atualizar({ tema: primeiraTematicaSelecionavel(coberturaTemas) })
    }
  }, [cobertura, coberturaTemas, objetivoNumero, tagSlug, modo, atualizar])

  const objetivo = objectives[objetivoNumero - 1]
  const tematica = tematicas.find(t => t.slug === tagSlug) ?? tematicas[0]

  const variaveisRecorte = React.useMemo(
    () =>
      modo === 'objetivos'
        ? variaveisDoObjetivoNoNivel(active, objetivoNumero)
        : [],
    [modo, active, objetivoNumero]
  )

  const rankingObjetivo = rankingDoNivel(nivel, objetivoNumero, 'objetivo')
  const rankingTema = rankingTematico(nivel.entes, tagSlug)

  const lista =
    modo === 'objetivos'
      ? rankingObjetivo.map(e => ({
          slug: e.slug,
          nome: e.nome,
          ufSigla: e.ufSigla,
          valorPrincipal: e.valorPrincipal,
          posicao: e.posicao,
        }))
      : rankingTema.map(e => ({
          slug: e.slug,
          nome: e.nome,
          ufSigla: e.ufSigla,
          valorPrincipal: e.valor,
          posicao: e.posicao,
        }))

  const rotuloSelecao =
    modo === 'objetivos' ? (objetivo?.title ?? '') : tematica.nome

  const objetivoQuery =
    modo === 'objetivos' && objetivo ? `objetivo=${objetivo.slug}` : undefined

  const mapaDados: DadoMapa[] = React.useMemo(() => {
    if (active !== 'estadual') return []
    const dados: DadoMapa[] = []
    for (const e of lista) {
      const uf = ufDeEnte('estadual', e.nome)
      if (uf) {
        const path = `/ranking/${active}/${e.slug}`
        const href = objetivoQuery ? `${path}?${objetivoQuery}` : path
        dados.push({
          uf,
          nome: e.nome,
          valor: e.valorPrincipal,
          href: link(href),
        })
      }
    }
    return dados
  }, [active, link, lista, objetivoQuery])

  const podeMapa = active === 'estadual' && mapaDados.length >= 5

  function selecionar(key: NivelKey) {
    const alvo = niveis.find(n => n.key === key)
    if (alvo && !alvo.isRanking && alvo.entes[0]) {
      router.push(link(`/ranking/${key}/${alvo.entes[0].slug}`))
      return
    }
    if (key === 'estadual' || key === 'municipios') {
      atualizar({ nivel: key })
      if (key !== 'estadual') setVista('grafico')
    }
  }

  return (
    <section className="pb-12">
      <div className="px-6 pt-28 pb-16 sm:px-10">
        <div data-tour="ranking-intro">
          <span className="text-sm font-medium text-muted-foreground">
            Ranking
          </span>
          <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text font-bold text-4xl text-transparent leading-tight tracking-tight sm:text-5xl">
            Ranking de Desenvolvimento
            <br />
            Digital dos Governos
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Escolha um nível de governo e um objetivo da ENGD (ou uma categoria
            temática) para ordenar os entes pelo índice correspondente. Não há
            média geral entre objetivos.
          </p>
          <TourTriggerButton onClick={() => startTour()} />
        </div>

        <div className="dash-y -mx-6 mt-8 grid gap-8 px-6 pt-8 pb-8 sm:-mx-10 sm:px-10 lg:grid-cols-2 lg:gap-0">
          <div data-tour="ranking-nivel">
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Nível de governo
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {niveis.map(item => {
                const isActive = item.isRanking && item.key === active
                return (
                  <FilterPill
                    key={item.key}
                    active={isActive}
                    onClick={() => selecionar(item.key)}
                    className="px-5 py-2.5"
                  >
                    {item.label}
                  </FilterPill>
                )
              })}
            </div>
            {active === 'municipios' && (
              <p className="mt-3 text-muted-foreground text-xs leading-relaxed">
                Municípios com 100 mil habitantes ou mais.
              </p>
            )}
          </div>

          {nivel.isRanking && (
            <div className="lg:dash-l lg:pl-8" data-tour="ranking-modo">
              <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                Ordenar por
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                <FilterPill
                  active={modo === 'objetivos'}
                  onClick={() => atualizar({ por: 'objetivos' })}
                >
                  Objetivos da ENGD
                </FilterPill>
                <FilterPill
                  active={modo === 'tematicas'}
                  onClick={() => atualizar({ por: 'tematicas' })}
                >
                  Categorias temáticas
                </FilterPill>
              </div>
            </div>
          )}
        </div>

        {nivel.isRanking && (
          <div
            className="-mx-6 mt-0 px-6 py-6 sm:-mx-10 sm:px-10"
            data-tour="ranking-selecao"
          >
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              {modo === 'objetivos' ? 'Objetivo da ENGD' : 'Categoria temática'}
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {modo === 'objetivos'
                ? objectives.map((obj, i) => (
                    <ObjetivoChip
                      key={obj.slug}
                      numero={i + 1}
                      slug={obj.slug}
                      title={obj.title}
                      nivel={nivel.key}
                      cobertoPelosDados={cobertura[i]}
                      active={i + 1 === objetivoNumero}
                      onSelect={() => atualizar({ objetivo: obj.slug })}
                    />
                  ))
                : tematicas.map((tag, i) => (
                    <TematicaChip
                      key={tag.slug}
                      nome={tag.nome}
                      nivel={nivel.key}
                      temCobertura={Boolean(coberturaTemas[i])}
                      active={tag.slug === tagSlug}
                      onSelect={() => atualizar({ tema: tag.slug })}
                    />
                  ))}
            </div>
            {modo === 'objetivos' && objetivo && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Este objetivo avalia:{' '}
                </span>
                {oQueAvaliaObjetivo(objetivo.slug).blurb}
              </p>
            )}
            {modo === 'objetivos' &&
              variaveisRecorte.length > 0 &&
              objetivo && (
                <RankingVariaveisDisclaimer
                  variaveis={variaveisRecorte}
                  objetivoTitulo={objetivo.title}
                  nivelLabel={nivel.label}
                />
              )}
            {modo === 'tematicas' && tematica.descricao && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {tematica.descricao}
              </p>
            )}
          </div>
        )}

        {nivel.isRanking && lista.length >= 5 && (
          <div
            className="dash-t -mx-6 mt-12 px-6 pt-10 sm:-mx-10 sm:px-10"
            data-tour="ranking-distribuicao"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-foreground text-sm">
                  {vista === 'mapa' && podeMapa ? 'Mapa' : 'Distribuição'} ·{' '}
                  {rotuloSelecao}
                </h2>
                <p className="mt-1 text-muted-foreground text-sm">
                  {modo === 'tematicas'
                    ? vista === 'mapa' && podeMapa
                      ? 'Score da tag de cada ente no mapa do Brasil (0–100).'
                      : 'Quantidade de entes por faixa de score da tag (0–100).'
                    : vista === 'mapa' && podeMapa
                      ? 'Índice de cada ente no mapa do Brasil (0–100).'
                      : 'Quantidade de entes por faixa de índice (0–100).'}
                </p>
              </div>
              {podeMapa && (
                <div className="flex shrink-0 gap-2">
                  {(
                    [
                      ['grafico', 'Gráfico'],
                      ['mapa', 'Mapa'],
                    ] as const
                  ).map(([key, label]) => (
                    <FilterPill
                      key={key}
                      active={vista === key}
                      onClick={() => setVista(key)}
                      className="px-4 py-1.5"
                    >
                      {label}
                    </FilterPill>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4">
              {vista === 'mapa' && podeMapa ? (
                <MapaBrasil dados={mapaDados} />
              ) : (
                <DistribuicaoChart
                  entes={lista.map(e => ({
                    nome: e.nome,
                    indiceGeral: e.valorPrincipal,
                  }))}
                />
              )}
            </div>
          </div>
        )}

        <div className="mt-12" data-tour="ranking-lista">
          <EnteRankingList
            key={nivel.key}
            entes={lista}
            basePath={link(`/ranking/${nivel.key}`)}
            colunaValor={modo === 'tematicas' ? 'Score da tag' : 'Índice'}
            colunaValorTip={
              modo === 'tematicas' ? GLOSSARIO.scoreTag : GLOSSARIO.subIndice
            }
            nivelKey={nivel.key}
            hrefQuery={objetivoQuery}
          />
        </div>
      </div>
    </section>
  )
}
