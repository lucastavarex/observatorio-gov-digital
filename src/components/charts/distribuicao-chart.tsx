'use client'

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatScore } from '@/data/indicators'
import { cn } from '@/lib/utils'

type EnteValor = { nome: string; indiceGeral: number }

type DistribuicaoChartProps = {
  /** Entes do nível (nome + índice geral). */
  entes: EnteValor[]
  /** Valores a destacar (faixas que contêm entes selecionados). */
  destaques?: number[]
  /** Classe de altura do container (para casar com outros gráficos). */
  alturaClasse?: string
  /** Barras horizontais (faixas no eixo Y). Padrão: barras verticais. */
  horizontal?: boolean
  /** Nomes de entes a destacar na lista do tooltip. */
  selecionados?: string[]
}

const AZUL = 'var(--chart-1)'
const CINZA = '#cbd5e1'
const LARGURA_FAIXA = 10 // faixas de 10 em 10 pontos

type Faixa = {
  rotulo: string
  min: number
  max: number
  quantidade: number
  entes: EnteValor[]
  temDestaque: boolean
}

function montarFaixas(entes: EnteValor[], destaques?: number[]): Faixa[] {
  const faixas: Faixa[] = []
  for (let min = 0; min < 100; min += LARGURA_FAIXA) {
    const max = min + LARGURA_FAIXA
    faixas.push({
      rotulo: `${min}–${max}`,
      min,
      max,
      quantidade: 0,
      entes: [],
      temDestaque: false,
    })
  }

  const indiceDe = (v: number) =>
    Math.min(faixas.length - 1, Math.floor(v / LARGURA_FAIXA))

  for (const ente of entes) {
    const faixa = faixas[indiceDe(ente.indiceGeral)]
    faixa.quantidade += 1
    faixa.entes.push(ente)
  }
  for (const faixa of faixas) {
    faixa.entes.sort((a, b) => b.indiceGeral - a.indiceGeral)
  }
  for (const valor of destaques ?? []) {
    faixas[indiceDe(valor)].temDestaque = true
  }

  return faixas
}

type TooltipItem = { payload?: Faixa }

function DistribuicaoTooltip({
  active,
  payload,
  selecionados = [],
}: {
  active?: boolean
  payload?: TooltipItem[]
  selecionados?: string[]
}) {
  if (!active || !payload?.length) return null
  const faixa = payload[0]?.payload
  if (!faixa) return null

  return (
    <div className="w-52 rounded-lg border bg-background p-3 text-xs shadow-md">
      <p className="font-semibold text-foreground">Índice {faixa.rotulo}</p>
      {faixa.entes.length > 0 && (
        <ul className="mt-2 space-y-1">
          {faixa.entes.map(ente => {
            const selecionado = selecionados.includes(ente.nome)
            return (
              <li
                key={ente.nome}
                className={cn(
                  'flex items-center justify-between gap-4',
                  selecionado && '-mx-1.5 rounded bg-primary/10 px-1.5 py-0.5'
                )}
              >
                <span
                  className={cn(
                    selecionado
                      ? 'font-semibold text-primary'
                      : 'text-foreground'
                  )}
                >
                  {ente.nome}
                </span>
                <span
                  className={cn(
                    'font-medium tabular-nums',
                    selecionado ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {formatScore(ente.indiceGeral)}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function DistribuicaoChart({
  entes,
  destaques,
  alturaClasse = 'h-64',
  horizontal = false,
  selecionados,
}: DistribuicaoChartProps) {
  const faixas = montarFaixas(entes, destaques)

  const cells = faixas.map(faixa => (
    <Cell key={faixa.rotulo} fill={faixa.temDestaque ? AZUL : CINZA} />
  ))

  const tickStyle = { fill: 'var(--muted-foreground)', fontSize: 11 }

  return (
    <div className={`w-full ${alturaClasse}`}>
      <ResponsiveContainer width="100%" height="100%">
        {horizontal ? (
          <BarChart
            layout="vertical"
            data={faixas}
            margin={{ top: 8, right: 16, bottom: 4, left: 4 }}
          >
            <XAxis
              type="number"
              allowDecimals={false}
              tick={tickStyle}
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
            />
            <YAxis
              type="category"
              dataKey="rotulo"
              width={48}
              reversed
              tick={tickStyle}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)' }}
              content={p => (
                <DistribuicaoTooltip
                  active={p.active}
                  payload={p.payload as unknown as TooltipItem[] | undefined}
                  selecionados={selecionados}
                />
              )}
            />
            <Bar
              dataKey="quantidade"
              radius={[0, 4, 4, 0]}
              isAnimationActive={false}
            >
              {cells}
            </Bar>
          </BarChart>
        ) : (
          <BarChart
            data={faixas}
            margin={{ top: 8, right: 8, bottom: 4, left: -20 }}
          >
            <XAxis
              dataKey="rotulo"
              tick={tickStyle}
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
              interval={0}
            />
            <YAxis
              allowDecimals={false}
              tick={tickStyle}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)' }}
              content={p => (
                <DistribuicaoTooltip
                  active={p.active}
                  payload={p.payload as unknown as TooltipItem[] | undefined}
                  selecionados={selecionados}
                />
              )}
            />
            <Bar
              dataKey="quantidade"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            >
              {cells}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
