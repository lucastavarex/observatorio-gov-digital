'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { DistribuicaoChart } from '@/components/charts/distribuicao-chart'
import { EnteRankingList } from '@/components/ranking/ente-ranking-list'
import { type NivelKey, niveis } from '@/data/indicators'
import { cn } from '@/lib/utils'

export function RankingExplorer() {
  const router = useRouter()
  const [active, setActive] = React.useState<NivelKey>('estadual')

  const nivel = niveis.find(n => n.key === active) ?? niveis[1]

  function selecionar(key: NivelKey) {
    const alvo = niveis.find(n => n.key === key)
    // Federal é entidade única: pula a lista e vai direto aos objetivos do ente.
    if (alvo && !alvo.isRanking && alvo.entes[0]) {
      router.push(`/ranking/${key}/${alvo.entes[0].slug}`)
      return
    }
    setActive(key)
  }

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
          Escolha um nível de governo e explore o desempenho de cada ente nos
          dez objetivos da Estratégia Nacional de Governo Digital, chegando até
          as variáveis que compõem cada nota.
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

        {/* Distribuição do índice geral entre os entes do nível */}
        {nivel.isRanking && nivel.entes.length >= 5 && (
          <div className="mt-12">
            <h2 className="text-sm font-bold text-foreground">
              Distribuição do índice
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Quantidade de entes por faixa de índice geral (0–100).
            </p>
            <div className="mt-4">
              <DistribuicaoChart
                entes={nivel.entes.map(e => ({
                  nome: e.nome,
                  indiceGeral: e.indiceGeral,
                }))}
              />
            </div>
          </div>
        )}

        {/* Lista de entes do nível selecionado */}
        <div className="mt-12">
          <EnteRankingList
            entes={nivel.entes}
            basePath={`/ranking/${nivel.key}`}
          />
        </div>
      </div>
    </section>
  )
}
