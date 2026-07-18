'use client'

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

export type RadarEixo = { eixo: string; objetivo: string }

export type RadarSerie = {
  nome: string
  cor: string
  valores: (number | null)[]
  fillOpacity?: number
}

type ObjetivosRadarProps = {
  eixos: RadarEixo[]
  series: RadarSerie[]
}

// Quebra o rótulo em linhas de no máximo `max` caracteres, por palavra.
function wrap(text: string, max = 16): string[] {
  const linhas: string[] = []
  let atual = ''
  for (const palavra of text.split(' ')) {
    if (atual && `${atual} ${palavra}`.length > max) {
      linhas.push(atual)
      atual = palavra
    } else {
      atual = atual ? `${atual} ${palavra}` : palavra
    }
  }
  if (atual) linhas.push(atual)
  return linhas
}

type SvgAnchor = 'start' | 'middle' | 'end'

type AngleTickProps = {
  x?: number | string
  y?: number | string
  textAnchor?: string
  payload?: { value?: string }
}

// Tick do eixo: número + nome do objetivo, quebrado em linhas.
function renderAngleTick(props: AngleTickProps, eixoMap: Map<string, string>) {
  const x = Number(props.x ?? 0)
  const y = Number(props.y ?? 0)
  const textAnchor = (props.textAnchor as SvgAnchor) ?? 'middle'
  const eixo = props.payload?.value ?? ''
  const nome = eixoMap.get(eixo) ?? ''
  const linhas = wrap(`${eixo} ${nome}`.trim(), 16)
  // Ancoragem vertical: cresce para cima quando o rótulo está acima do centro.
  const dyInicial =
    textAnchor === 'middle' && y < 0 ? -(linhas.length - 1) * 12 : 0

  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill="var(--muted-foreground)"
      fontSize={10}
    >
      {linhas.map((linha, i) => {
        if (i === 0) {
          const [numero, ...resto] = linha.split(' ')
          return (
            <tspan key={linha} x={x} dy={dyInicial}>
              <tspan fill="var(--foreground)" fontWeight={600}>
                {numero}
              </tspan>
              {resto.length > 0 && <tspan> {resto.join(' ')}</tspan>}
            </tspan>
          )
        }
        return (
          <tspan key={linha} x={x} dy={12}>
            {linha}
          </tspan>
        )
      })}
    </text>
  )
}

type TooltipPayloadItem = {
  color?: string
  name?: string
  value?: number | null
  payload?: { objetivo?: string }
}

function RadarTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: TooltipPayloadItem[]
}) {
  if (!active || !payload?.length) return null
  const objetivo = payload[0]?.payload?.objetivo ?? ''

  return (
    <div className="rounded-lg border bg-background p-3 text-xs shadow-md">
      <p className="mb-1 font-semibold text-foreground">{objetivo}</p>
      {payload.map(item => (
        <p key={item.name} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block size-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-muted-foreground">{item.name}:</span>
          <span className="font-medium tabular-nums text-foreground">
            {item.value ?? 'sem dados'}
          </span>
        </p>
      ))}
    </div>
  )
}

export function ObjetivosRadar({ eixos, series }: ObjetivosRadarProps) {
  const eixoMap = new Map(eixos.map(e => [e.eixo, e.objetivo]))
  const data = eixos.map((e, i) => {
    const ponto: Record<string, string | number | null> = {
      eixo: e.eixo,
      objetivo: e.objetivo,
    }
    series.forEach((s, si) => {
      ponto[`s${si}`] = s.valores[i] ?? null
    })
    return ponto
  })

  return (
    <div className="h-[26rem] w-full sm:h-[30rem]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          outerRadius="76%"
          margin={{ top: 8, right: 12, bottom: 8, left: 12 }}
        >
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis
            dataKey="eixo"
            tick={props => renderAngleTick(props, eixoMap)}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
            tickCount={5}
            axisLine={false}
          />
          {series.map((s, si) => (
            <Radar
              key={s.nome}
              name={s.nome}
              dataKey={`s${si}`}
              stroke={s.cor}
              fill={s.cor}
              fillOpacity={s.fillOpacity ?? 0.18}
              connectNulls={false}
              isAnimationActive={false}
            />
          ))}
          <Tooltip content={<RadarTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
