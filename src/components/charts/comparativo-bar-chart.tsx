'use client'

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

export type BarraEnte = { nome: string; valor: number; cor: string }

export function ComparativoBarChart({ entes }: { entes: BarraEnte[] }) {
  const tickStyle = { fill: 'var(--muted-foreground)', fontSize: 11 }
  const ordenados = [...entes].sort((a, b) => b.valor - a.valor)

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={ordenados}
          margin={{ top: 24, right: 8, bottom: 4, left: -16 }}
        >
          <XAxis
            dataKey="nome"
            tick={tickStyle}
            tickLine={false}
            axisLine={{ stroke: 'var(--border)' }}
            interval={0}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tick={tickStyle}
            tickLine={false}
            axisLine={false}
          />
          <Bar dataKey="valor" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {ordenados.map(e => (
              <Cell key={e.nome} fill={e.cor} />
            ))}
            <LabelList
              dataKey="valor"
              position="top"
              className="fill-foreground"
              style={{ fontSize: 12, fontWeight: 600 }}
              formatter={v => Number(v ?? 0).toFixed(0)}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
