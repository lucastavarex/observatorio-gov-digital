'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  ObjetivosRadar,
  type RadarEixo,
  type RadarSerie,
} from '@/components/charts/objetivos-radar'
import { type Ente, formatScore } from '@/data/indicators'
import { objectives } from '@/data/objectives'
import { cn } from '@/lib/utils'

/** Miniaturas das feature rows da home — dados reais do nível estadual. */

const CORES = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)'] as const
const COR_MEDIA = 'var(--chart-4)'
const MAX_SELECIONADOS = 3

const RADAR_EIXOS: RadarEixo[] = objectives.map((objetivo, i) => ({
  eixo: String(i + 1).padStart(2, '0'),
  objetivo: objetivo.title,
}))

export type VariavelTeaser = {
  slug: string
  nome: string
  fonte: string
}

export function VisualPerfil({
  entes,
  medias,
}: {
  entes: Ente[]
  medias: (number | null)[]
}) {
  const [selecionados, setSelecionados] = useState<string[]>([
    entes[0]?.slug ?? '',
  ])

  const alternar = (slug: string) =>
    setSelecionados(atual => {
      if (atual.includes(slug)) return atual.filter(s => s !== slug)
      if (atual.length >= MAX_SELECIONADOS) return atual
      return [...atual, slug]
    })

  const escolhidos = selecionados
    .map(slug => entes.find(e => e.slug === slug))
    .filter((e): e is Ente => Boolean(e))
  const limiteAtingido = selecionados.length >= MAX_SELECIONADOS

  const series: RadarSerie[] = [
    ...escolhidos.map((ente, i) => ({
      nome: ente.nome,
      cor: CORES[i],
      valores: ente.objetivos.map(o => o.nota),
      fillOpacity: 0.2,
    })),
    {
      nome: 'Média do nível',
      cor: COR_MEDIA,
      valores: medias,
      fillOpacity: 0.12,
    },
  ]

  return (
    <div className="flex w-full flex-col gap-6 sm:flex-row">
      <ul className="max-h-[19rem] w-full shrink-0 space-y-0.5 overflow-y-auto pr-2 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] sm:w-48 sm:self-center [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
        {entes.map(ente => {
          const idx = selecionados.indexOf(ente.slug)
          const ativo = idx !== -1
          const bloqueado = !ativo && limiteAtingido
          return (
            <li key={ente.slug}>
              <button
                type="button"
                onClick={() => alternar(ente.slug)}
                disabled={bloqueado}
                aria-pressed={ativo}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors',
                  ativo
                    ? 'bg-primary/5 font-medium text-foreground'
                    : bloqueado
                      ? 'cursor-not-allowed text-muted-foreground/40'
                      : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                )}
              >
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full border"
                  style={
                    ativo
                      ? {
                          backgroundColor: CORES[idx],
                          borderColor: CORES[idx],
                        }
                      : undefined
                  }
                />
                <span className="truncate">{ente.nome}</span>
                <span className="ml-auto shrink-0 tabular-nums">
                  {formatScore(ente.indiceGeral)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="min-w-0 flex-1">
        <ObjetivosRadar eixos={RADAR_EIXOS} series={series} />
      </div>
    </div>
  )
}

export function VisualRanking({ entes }: { entes: Ente[] }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b pb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        <span>Ente</span>
        <span>Índice</span>
      </div>

      <ul className="mt-3 space-y-3">
        {entes.map((ente, i) => (
          <li key={ente.slug} className="flex items-center gap-4">
            <span className="w-5 shrink-0 text-[11px] tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="w-40 shrink-0 truncate text-foreground text-xs">
              {ente.nome}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary/10">
              <span
                className="block h-full rounded-full bg-primary"
                style={{
                  width: `${ente.indiceGeral}%`,
                  opacity: i === 0 ? 1 : 0.45,
                }}
              />
            </span>
            <span className="w-9 shrink-0 text-right font-medium text-foreground text-xs tabular-nums">
              {formatScore(ente.indiceGeral)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const POSICOES = [
  { left: '1%', top: '6px' },
  { left: '27%', top: '44px' },
  { left: '53%', top: '8px' },
  { left: '13%', top: '122px' },
  { left: '40%', top: '150px' },
  { left: '65%', top: '98px' },
  { left: '3%', top: '232px' },
  { left: '31%', top: '208px' },
  { left: '58%', top: '240px' },
]

export function VisualDados({ variaveis }: { variaveis: VariavelTeaser[] }) {
  const [canDrag, setCanDrag] = useState(false)

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerMq = window.matchMedia('(pointer: fine)')
    const update = () => setCanDrag(!motionMq.matches && pointerMq.matches)
    update()
    motionMq.addEventListener('change', update)
    pointerMq.addEventListener('change', update)
    return () => {
      motionMq.removeEventListener('change', update)
      pointerMq.removeEventListener('change', update)
    }
  }, [])

  return (
    <div className="relative grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:block lg:h-[21rem]">
      {variaveis.map((variavel, i) => {
        const pos = POSICOES[i % POSICOES.length]
        return (
          <motion.div
            key={variavel.slug}
            drag={canDrag}
            dragMomentum={false}
            whileDrag={canDrag ? { scale: 1.04, zIndex: 20 } : undefined}
            style={{ left: pos.left, top: pos.top }}
            className={cn(
              'flex items-start justify-between gap-3 rounded-xl border bg-card p-4 shadow-sm lg:absolute lg:w-56',
              canDrag && 'cursor-grab active:cursor-grabbing'
            )}
          >
            <span className="min-w-0">
              <span className="block font-semibold text-foreground text-xs leading-snug line-clamp-2!">
                {variavel.nome}
              </span>
              <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 font-medium text-[10px] text-primary">
                <span className="line-clamp-1!">{variavel.fonte}</span>
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
            >
              <Download className="size-3.5" />
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
