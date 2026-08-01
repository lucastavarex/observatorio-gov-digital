'use client'

import { Download, Info } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  ObjetivosRadar,
  type RadarSerie,
} from '@/components/charts/objetivos-radar'
import { type DadoMapa, MapaBrasil } from '@/components/shared/mapa-brasil'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { type Ente, formatScore } from '@/data/indicators'
import { objectives } from '@/data/objectives'
import {
  filtrarValoresPorIndices,
  formatNotaObjetivosInativos,
  isObjetivo3,
  OBJETIVO_3_MOTIVO,
  objetivosParaRadar,
} from '@/data/objectives-availability'
import { ufDeEnte } from '@/lib/geo/entes-geo'
import { cn } from '@/lib/utils'

/** Miniaturas das feature rows da home — dados reais do nível estadual. */

const CORES = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-5)',
  '#b4536a',
] as const
const COR_MEDIA = 'var(--chart-4)'
const MAX_SELECIONADOS = 5

export type VariavelTeaser = {
  slug: string
  nome: string
  fonte: string
}

function primeiroObjetivoComNota(entes: Ente[]): string {
  const obj = objectives.find(
    (o, i) =>
      !isObjetivo3(o.slug) && entes.some(e => e.objetivos[i]?.nota != null)
  )
  return obj?.slug ?? objectives[0].slug
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

  const alternar = (slug: string) => {
    if (selecionados.includes(slug)) {
      setSelecionados(atual => atual.filter(s => s !== slug))
      return
    }
    if (selecionados.length >= MAX_SELECIONADOS) {
      toast('Limite de 5 entes atingido', {
        description: 'Desselecione um para selecionar outro.',
        position: 'bottom-right',
      })
      return
    }
    setSelecionados(atual => [...atual, slug])
  }

  const escolhidos = selecionados
    .map(slug => entes.find(e => e.slug === slug))
    .filter((e): e is Ente => Boolean(e))
  const limiteAtingido = selecionados.length >= MAX_SELECIONADOS

  const radarFonte =
    entes[0]?.objetivos ??
    objectives.map((o, i) => ({
      numero: i + 1,
      titulo: o.title,
      nota: null as number | null,
    }))
  const { ativos, inativos, indicesAtivos } = objetivosParaRadar(radarFonte)
  const radarEixos = ativos.map(o => ({
    eixo: String(o.numero).padStart(2, '0'),
    objetivo: o.titulo,
  }))
  const notaInativos = formatNotaObjetivosInativos(inativos)

  const series: RadarSerie[] = [
    ...escolhidos.map((ente, i) => ({
      nome: ente.nome,
      cor: CORES[i],
      valores: filtrarValoresPorIndices(
        ente.objetivos.map(o => o.nota),
        indicesAtivos
      ),
      fillOpacity: 0.2,
    })),
    {
      nome: 'Média do nível',
      cor: COR_MEDIA,
      valores: filtrarValoresPorIndices(medias, indicesAtivos),
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
          const notaDestaque = ente.objetivos.find(
            o => o.nota != null && !isObjetivo3(o.numero)
          )?.nota
          return (
            <li key={ente.slug}>
              <button
                type="button"
                onClick={() => alternar(ente.slug)}
                aria-pressed={ativo}
                aria-disabled={bloqueado}
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
                {notaDestaque != null && (
                  <span className="ml-auto shrink-0 tabular-nums">
                    {formatScore(notaDestaque)}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="min-w-0 flex-1">
        <ObjetivosRadar eixos={radarEixos} series={series} />
        {notaInativos && (
          <p className="mx-auto mt-3 max-w-sm text-center text-[11px] leading-snug text-muted-foreground">
            {notaInativos}
          </p>
        )}
      </div>
    </div>
  )
}

export function VisualMapa({ entes }: { entes: Ente[] }) {
  const [objetivoSlug, setObjetivoSlug] = useState(() =>
    primeiroObjetivoComNota(entes)
  )

  const notaDe = (ente: Ente) =>
    ente.objetivos.find(o => o.objetivoSlug === objetivoSlug)?.nota ?? null

  const dados: DadoMapa[] = entes.flatMap(ente => {
    const uf = ufDeEnte('estadual', ente.nome)
    const nota = notaDe(ente)
    if (!uf || nota === null) return []
    return [
      {
        uf,
        nome: ente.nome,
        valor: nota,
        href: `/ranking/estadual/${ente.slug}`,
      },
    ]
  })

  return (
    <div className="flex w-full flex-col gap-6 sm:flex-row">
      <div className="w-full shrink-0 sm:w-max sm:self-center">
        <ul className="space-y-0.5">
          {objectives.map((objetivo, i) => {
            const desabilitado = isObjetivo3(objetivo.slug)
            const ativo = objetivo.slug === objetivoSlug
            const botao = (
              <button
                type="button"
                disabled={desabilitado}
                onClick={() => setObjetivoSlug(objetivo.slug)}
                aria-pressed={ativo}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md py-1.5 pr-2 pl-1 text-left text-xs leading-snug whitespace-nowrap transition-colors',
                  desabilitado
                    ? 'cursor-not-allowed text-muted-foreground/40'
                    : ativo
                      ? 'bg-primary/5 font-medium text-foreground'
                      : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                )}
              >
                <span className="w-5 shrink-0 text-[11px] text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{objetivo.title}</span>
                {desabilitado && (
                  <Info
                    className="size-3 shrink-0 opacity-70"
                    aria-hidden="true"
                  />
                )}
              </button>
            )

            return (
              <li key={objetivo.slug}>
                {desabilitado ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="block w-full">{botao}</span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-xs text-left leading-relaxed"
                    >
                      <p className="mb-1 font-semibold">
                        Objetivo desabilitado
                      </p>
                      <p>{OBJETIVO_3_MOTIVO}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  botao
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="min-w-0 flex-1">
        <MapaBrasil dados={dados} />
      </div>
    </div>
  )
}

export function VisualDados({ variaveis }: { variaveis: VariavelTeaser[] }) {
  return (
    <ul className="w-full border-t">
      {variaveis.slice(0, 5).map(variavel => (
        <li
          key={variavel.slug}
          className="flex items-center justify-between gap-3 border-b py-3"
        >
          <span className="min-w-0">
            <span className="block font-semibold text-foreground text-xs leading-snug">
              {variavel.nome}
            </span>
            <span className="mt-1 inline-block font-medium text-[10px] text-muted-foreground/70">
              {variavel.fonte}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
          >
            <Download className="size-3.5" />
          </span>
        </li>
      ))}
    </ul>
  )
}
