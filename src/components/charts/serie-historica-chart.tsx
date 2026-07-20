'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatScore, type SerieHistoricaPonto } from '@/data/indicators'

type SerieHistoricaChartProps = {
  pontos: SerieHistoricaPonto[]
  /** Nome da variável (tooltip). */
  nome?: string
  alturaClasse?: string
}

const AZUL = 'var(--chart-1)'

type TooltipItem = {
  payload?: SerieHistoricaPonto
}

function SerieTooltip({
  active,
  payload,
  nome,
}: {
  active?: boolean
  payload?: TooltipItem[]
  nome?: string
}) {
  if (!active || !payload?.length) return null
  const ponto = payload[0]?.payload
  if (!ponto) return null

  return (
    <div className="rounded-lg border bg-background p-3 text-xs shadow-md">
      {nome && (
        <p className="mb-1 max-w-56 truncate font-medium text-muted-foreground">
          {nome}
        </p>
      )}
      <p className="font-semibold text-foreground">{ponto.ano}</p>
      <p className="mt-1 tabular-nums text-foreground">
        Nota{' '}
        <span className="font-semibold text-primary">
          {formatScore(ponto.valor)}
        </span>
      </p>
    </div>
  )
}

export function SerieHistoricaChart({
  pontos,
  nome,
  alturaClasse = 'h-64',
}: SerieHistoricaChartProps) {
  const tickStyle = { fill: 'var(--muted-foreground)', fontSize: 11 }

  return (
    <div className={`w-full ${alturaClasse}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={pontos}
          margin={{ top: 8, right: 16, bottom: 4, left: 0 }}
        >
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="ano"
            type="number"
            domain={['dataMin', 'dataMax']}
            tick={tickStyle}
            tickLine={false}
            axisLine={{ stroke: 'var(--border)' }}
            tickFormatter={v => String(v)}
            allowDecimals={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={tickStyle}
            tickLine={false}
            axisLine={false}
            width={36}
          />
          <Tooltip
            content={p => (
              <SerieTooltip
                active={p.active}
                payload={p.payload as unknown as TooltipItem[] | undefined}
                nome={nome}
              />
            )}
          />
          <Line
            type="monotone"
            dataKey="valor"
            stroke={AZUL}
            strokeWidth={2}
            dot={{ r: 4, fill: AZUL, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: AZUL }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
