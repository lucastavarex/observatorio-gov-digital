'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { formatScore } from '@/data/indicators'
import { estadosMapa, MAPA_VIEWBOX } from '@/lib/geo/brasil-mapa'
import { cn } from '@/lib/utils'

export type DadoMapa = {
  uf: string
  nome: string
  valor: number
  href?: string
}

const COR_MIN = [219, 232, 250] // #dbe8fa
const COR_MAX = [31, 79, 134] // #1f4f86
const SEM_DADO = '#eef2f7'

function interpolarCor(t: number): string {
  const c = COR_MIN.map((min, i) => Math.round(min + (COR_MAX[i] - min) * t))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

export function MapaBrasil({
  dados,
  valorLabel = 'Índice',
}: {
  dados: DadoMapa[]
  valorLabel?: string
}) {
  const router = useRouter()
  const porUf = React.useMemo(() => new Map(dados.map(d => [d.uf, d])), [dados])
  const min = 0
  const max = 100
  const corDe = (v: number) => interpolarCor(Math.min(1, Math.max(0, v / 100)))

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [hover, setHover] = React.useState<{
    x: number
    y: number
    nome: string
    valor: number
  } | null>(null)

  function aoMover(e: React.MouseEvent, dado?: DadoMapa) {
    if (!dado) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setHover({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      nome: dado.nome,
      valor: dado.valor,
    })
  }

  function navegar(href?: string) {
    if (href) router.push(href)
  }

  return (
    <div ref={containerRef} className="relative">
      <svg
        viewBox={MAPA_VIEWBOX}
        role="group"
        aria-label="Mapa do Brasil colorido por índice de cada ente"
        className="mx-auto block h-auto w-full max-w-md"
      >
        {estadosMapa.map(estado => {
          const dado = porUf.get(estado.uf)
          const clicavel = Boolean(dado?.href)
          return (
            // biome-ignore lint/a11y/noStaticElementInteractions: mapa SVG interativo (hover + navegação)
            <path
              key={estado.uf}
              d={estado.d}
              fill={dado ? corDe(dado.valor) : SEM_DADO}
              stroke="#ffffff"
              strokeWidth={0.8}
              className={cn(
                'outline-none transition-opacity hover:opacity-80',
                clicavel && 'cursor-pointer'
              )}
              role={clicavel ? 'link' : 'img'}
              tabIndex={clicavel ? 0 : undefined}
              aria-label={
                dado
                  ? `${dado.nome}, ${valorLabel} ${formatScore(dado.valor)}`
                  : estado.uf
              }
              onMouseEnter={e => aoMover(e, dado)}
              onMouseMove={e => aoMover(e, dado)}
              onMouseLeave={() => setHover(null)}
              onClick={clicavel ? () => navegar(dado?.href) : undefined}
              onKeyDown={
                clicavel
                  ? e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        navegar(dado?.href)
                      }
                    }
                  : undefined
              }
            />
          )
        })}
      </svg>

      {hover && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-md"
          style={{ left: hover.x, top: hover.y - 8 }}
        >
          <p className="font-semibold text-foreground">{hover.nome}</p>
          <p className="text-muted-foreground">
            {valorLabel}{' '}
            <span className="font-semibold tabular-nums text-primary">
              {formatScore(hover.valor)}
            </span>
          </p>
        </div>
      )}

      <div className="mx-auto mt-4 flex max-w-xs items-center gap-3">
        <span className="text-xs tabular-nums text-muted-foreground">
          {formatScore(min)}
        </span>
        <span
          aria-hidden="true"
          className="h-2 flex-1 rounded-full"
          style={{
            background: `linear-gradient(to right, ${interpolarCor(0)}, ${interpolarCor(1)})`,
          }}
        />
        <span className="text-xs tabular-nums text-muted-foreground">
          {formatScore(max)}
        </span>
      </div>
    </div>
  )
}
