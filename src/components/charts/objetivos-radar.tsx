'use client'

import { Info } from 'lucide-react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip as UiTooltip,
} from '@/components/ui/tooltip'
import { oQueAvaliaObjetivo } from '@/data/help-copy'
import { cn } from '@/lib/utils'

export type RadarEixo = { eixo: string; objetivo: string; slug?: string }

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

type EixoMeta = { objetivo: string; slug?: string }

const LINE_HEIGHT = 12
const FO_WIDTH = 118
const INFO_SIZE = 12

// Tick do eixo: número + nome do objetivo, quebrado em linhas.
// Com slug: foreignObject + Tooltip (rótulo e ícone i).
function renderAngleTick(
  props: AngleTickProps,
  eixoMap: Map<string, EixoMeta>
) {
  const x = Number(props.x ?? 0)
  const y = Number(props.y ?? 0)
  const textAnchor = (props.textAnchor as SvgAnchor) ?? 'middle'
  const eixo = props.payload?.value ?? ''
  const meta = eixoMap.get(eixo)
  const nome = meta?.objetivo ?? ''
  const slug = meta?.slug
  const linhas = wrap(`${eixo} ${nome}`.trim(), 16)
  // Ancoragem vertical: cresce para cima quando o rótulo está acima do centro.
  const above = textAnchor === 'middle' && y < 0
  const dyInicial = above ? -(linhas.length - 1) * LINE_HEIGHT : 0

  if (!slug) {
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
            <tspan key={linha} x={x} dy={LINE_HEIGHT}>
              {linha}
            </tspan>
          )
        })}
      </text>
    )
  }

  const { detalhe } = oQueAvaliaObjetivo(slug)
  const foHeight = linhas.length * LINE_HEIGHT + 4
  const foX =
    textAnchor === 'start'
      ? x
      : textAnchor === 'end'
        ? x - FO_WIDTH
        : x - FO_WIDTH / 2
  // Alinha o topo do foreignObject à primeira linha do rótulo SVG.
  const foY = above ? y - (linhas.length - 1) * LINE_HEIGHT - 8 : y - 8

  const justify =
    textAnchor === 'start'
      ? 'justify-start'
      : textAnchor === 'end'
        ? 'justify-end'
        : 'justify-center'
  const textAlign =
    textAnchor === 'start'
      ? 'text-left'
      : textAnchor === 'end'
        ? 'text-right'
        : 'text-center'

  return (
    <g>
      <foreignObject
        x={foX}
        y={foY}
        width={FO_WIDTH}
        height={foHeight + 2}
        style={{ overflow: 'visible' }}
      >
        <div className="h-full w-full">
          <UiTooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`O que avalia: ${nome}`}
                className={cn(
                  'flex w-full items-start gap-0.5 rounded-sm px-0.5 py-px',
                  'text-[10px] leading-3 text-muted-foreground',
                  'transition-colors hover:text-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  justify,
                  textAlign
                )}
              >
                <span className="min-w-0">
                  {linhas.map((linha, i) => {
                    if (i === 0) {
                      const [numero, ...resto] = linha.split(' ')
                      return (
                        <span key={linha} className="block">
                          <span className="font-semibold text-foreground">
                            {numero}
                          </span>
                          {resto.length > 0 && <> {resto.join(' ')}</>}
                        </span>
                      )
                    }
                    return (
                      <span key={linha} className="block">
                        {linha}
                      </span>
                    )
                  })}
                </span>
                <Info
                  className="mt-px size-3 shrink-0 opacity-70"
                  aria-hidden="true"
                  style={{ width: INFO_SIZE, height: INFO_SIZE }}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-xs text-left text-xs leading-relaxed sm:max-w-sm"
            >
              <p className="mb-1 font-semibold">{nome}</p>
              <p>{detalhe}</p>
            </TooltipContent>
          </UiTooltip>
        </div>
      </foreignObject>
    </g>
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
  const eixoMap = new Map(
    eixos.map(e => [e.eixo, { objetivo: e.objetivo, slug: e.slug }])
  )
  const temAjuda = eixos.some(e => Boolean(e.slug))
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
    <div className="h-[22rem] w-full sm:h-[25rem]">
      <ResponsiveContainer width="100%" height="100%">
        {/* Margens laterais reservam espaço para os rótulos dos eixos, que
            saem na horizontal e eram cortados pela borda do container. */}
        <RadarChart
          data={data}
          outerRadius="80%"
          margin={{
            top: 12,
            right: temAjuda ? 88 : 76,
            bottom: 12,
            left: temAjuda ? 88 : 76,
          }}
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
