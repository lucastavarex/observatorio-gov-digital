'use client'

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
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
  /** Texto exibido num badge no canto superior direito do gráfico. */
  badge?: string
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
  badge,
  selecionados,
}: DistribuicaoChartProps) {
  const faixas = montarFaixas(entes, destaques)
  // Só a faixa do ente carrega o texto do badge (usado pelo LabelList).
  const dados = faixas.map(faixa => ({
    ...faixa,
    badgeText: faixa.temDestaque && badge ? badge : '',
  }))

  const cells = faixas.map(faixa => (
    <Cell key={faixa.rotulo} fill={faixa.temDestaque ? AZUL : CINZA} />
  ))

  const tickStyle = { fill: 'var(--muted-foreground)', fontSize: 11 }

  // Badge branco com o nome do ente, desenhado dentro da barra destacada.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderBadge = (props: any) => {
    const texto = props?.value ? String(props.value) : ''
    const vb = props?.viewBox as
      | { x?: number; y?: number; width?: number; height?: number }
      | undefined
    if (!texto || !vb) return null

    const x = Number(vb.x ?? 0)
    const y = Number(vb.y ?? 0)
    const largura = Number(vb.width ?? 0)
    const altura = Number(vb.height ?? 0)

    const alturaBadge = Math.min(24, altura - 6)
    const larguraBadge = texto.length * 6.4 + 20
    // Encostado à direita, dentro da barra (recuo de 8px); nunca antes do início.
    const bx = Math.max(x + 6, x + largura - larguraBadge - 8)
    const by = y + (altura - alturaBadge) / 2

    return (
      <g>
        <rect
          x={bx}
          y={by}
          width={larguraBadge}
          height={alturaBadge}
          rx={alturaBadge / 2}
          fill="#ffffff"
          stroke="rgba(71, 117, 202, 0.25)"
        />
        <text
          x={bx + larguraBadge / 2}
          y={by + alturaBadge / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill={AZUL}
          fontSize={11}
          fontWeight={600}
        >
          {texto}
        </text>
      </g>
    )
  }

  return (
    <div className={`w-full ${alturaClasse}`}>
      <ResponsiveContainer width="100%" height="100%">
        {horizontal ? (
          <BarChart
            layout="vertical"
            data={dados}
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
              <LabelList dataKey="badgeText" content={renderBadge} />
            </Bar>
          </BarChart>
        ) : (
          <BarChart
            data={dados}
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
