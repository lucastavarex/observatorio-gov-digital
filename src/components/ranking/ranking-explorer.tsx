'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { DistribuicaoChart } from '@/components/charts/distribuicao-chart'
import { EnteRankingList } from '@/components/ranking/ente-ranking-list'
import {
  type NivelKey,
  niveis,
  type OrdenacaoRanking,
  objetivosComCobertura,
  rankingDoNivel,
} from '@/data/indicators'
import { objectives } from '@/data/objectives'
import { cn } from '@/lib/utils'

function primeiroObjetivoCoberto(cobertura: boolean[]): number {
  const idx = cobertura.findIndex(Boolean)
  return idx >= 0 ? idx + 1 : 1
}

export function RankingExplorer() {
  const router = useRouter()
  const [active, setActive] = React.useState<NivelKey>('estadual')
  const [objetivoNumero, setObjetivoNumero] = React.useState(1)
  const [ordenacao, setOrdenacao] = React.useState<OrdenacaoRanking>('objetivo')

  const nivel = niveis.find(n => n.key === active) ?? niveis[1]
  const cobertura = React.useMemo(() => objetivosComCobertura(nivel), [nivel])

  React.useEffect(() => {
    if (!cobertura[objetivoNumero - 1]) {
      setObjetivoNumero(primeiroObjetivoCoberto(cobertura))
    }
  }, [cobertura, objetivoNumero])

  const objetivo = objectives[objetivoNumero - 1]
  const ranking = rankingDoNivel(nivel, objetivoNumero, ordenacao)

  function selecionar(key: NivelKey) {
    const alvo = niveis.find(n => n.key === key)
    // Federal é entidade única: pula a lista e vai direto aos objetivos do ente.
    if (alvo && !alvo.isRanking && alvo.entes[0]) {
      router.push(`/ranking/${key}/${alvo.entes[0].slug}`)
      return
    }
    setActive(key)
  }

  const labelOrdenacao =
    ordenacao === 'objetivo'
      ? `Ordenado por Obj. ${String(objetivoNumero).padStart(2, '0')} — ${objetivo?.title ?? ''}`
      : 'Ordenado por Índice geral (provisório)'

  return (
    <section className="pb-12">
      <div className="dash-x px-6 pb-16 pt-28 sm:px-10">
        <span className="text-sm font-medium text-muted-foreground">
          Ranking
        </span>
        <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
          Ranking de maturidade
          <br />
          digital dos governos
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Escolha um nível de governo e um objetivo da ENGD para ordenar os
          entes pelo sub-índice correspondente. O índice geral permanece
          disponível como referência provisória.
        </p>

        {/* Filtros de nível */}
        <div className="mt-8 flex flex-wrap gap-2">
          {niveis.map(item => {
            const isActive = item.isRanking && item.key === active
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => selecionar(item.key)}
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

        {/* Objetivo + ordenação */}
        {nivel.isRanking && (
          <div className="mt-8 space-y-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Objetivo da ENGD
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {objectives.map((obj, i) => {
                  const numero = i + 1
                  const coberto = cobertura[i]
                  const isActive = numero === objetivoNumero
                  return (
                    <button
                      key={obj.slug}
                      type="button"
                      disabled={!coberto}
                      title={
                        coberto ? obj.title : 'Sem dados neste nível de governo'
                      }
                      onClick={() => setObjetivoNumero(numero)}
                      className={cn(
                        'rounded-full border px-3.5 py-2 text-sm font-medium transition-colors',
                        !coberto
                          ? 'cursor-not-allowed border-border/60 text-muted-foreground/40'
                          : isActive
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:bg-primary/5 hover:text-primary'
                      )}
                    >
                      <span className="tabular-nums">
                        {String(numero).padStart(2, '0')}
                      </span>
                      <span className="ml-1.5 hidden sm:inline">
                        {obj.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Ordenar por
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    [
                      ['objetivo', 'Objetivo selecionado'],
                      ['indice_geral', 'Índice geral'],
                    ] as const
                  ).map(([key, label]) => {
                    const isActive = ordenacao === key
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setOrdenacao(key)}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:bg-primary/5 hover:text-primary'
                        )}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{labelOrdenacao}</p>
            </div>
          </div>
        )}

        {/* Distribuição do valor pelo qual se ordena */}
        {nivel.isRanking && ranking.length >= 5 && (
          <div className="mt-12">
            <h2 className="text-sm font-bold text-foreground">
              Distribuição
              {ordenacao === 'objetivo'
                ? ` · ${objetivo?.title ?? ''}`
                : ' · Índice geral'}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Quantidade de entes por faixa de{' '}
              {ordenacao === 'objetivo'
                ? 'sub-índice do objetivo'
                : 'índice geral'}{' '}
              (0–100).
            </p>
            <div className="mt-4">
              <DistribuicaoChart
                entes={ranking.map(e => ({
                  nome: e.nome,
                  indiceGeral: e.valorPrincipal,
                }))}
              />
            </div>
          </div>
        )}

        {/* Lista de entes do nível selecionado */}
        <div className="mt-12">
          <EnteRankingList
            entes={ranking.map(e => ({
              slug: e.slug,
              nome: e.nome,
              valorPrincipal: e.valorPrincipal,
              valorSecundario:
                ordenacao === 'objetivo' ? e.indiceGeral : e.subIndice,
              posicao: e.posicao,
            }))}
            basePath={`/ranking/${nivel.key}`}
            colunaValor={
              ordenacao === 'objetivo' ? 'Sub-índice' : 'Índice geral'
            }
            colunaSecundaria={
              ordenacao === 'objetivo' ? 'Índice geral' : 'Sub-índice'
            }
          />
        </div>
      </div>
    </section>
  )
}
