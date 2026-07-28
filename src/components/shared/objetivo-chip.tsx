'use client'

import { Info } from 'lucide-react'
import { toast } from 'sonner'
import { FilterPill } from '@/components/shared/filter-pill'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { NivelKey } from '@/data/indicators'
import {
  getNotaPrecaria,
  isObjetivo3,
  motivoObjetivoDesabilitado,
} from '@/data/objectives-availability'
import { cn } from '@/lib/utils'

type ObjetivoChipProps = {
  numero: number
  slug: string
  title: string
  nivel: NivelKey
  /** Cobertura pelos dados (ignora política do Obj. 3). */
  cobertoPelosDados: boolean
  active?: boolean
  onSelect?: () => void
  className?: string
}

export function ObjetivoChip({
  numero,
  slug,
  title,
  nivel,
  cobertoPelosDados,
  active = false,
  onSelect,
  className,
}: ObjetivoChipProps) {
  const motivo = motivoObjetivoDesabilitado(slug, nivel, cobertoPelosDados)
  const desabilitado = Boolean(motivo)
  const precario = getNotaPrecaria(slug)
  const mostrarInfo = desabilitado || Boolean(precario)

  function handleClick() {
    if (desabilitado) {
      toast(motivo, {
        position: 'bottom-center',
        style: {
          width: 'fit-content',
          maxWidth: '90vw',
          borderRadius: '9999px',
        },
      })
      return
    }
    onSelect?.()
  }

  const chip = (
    <FilterPill
      active={active && !desabilitado}
      disabled={false}
      onClick={handleClick}
      aria-disabled={desabilitado}
      className={cn(
        'group relative',
        desabilitado && 'cursor-not-allowed opacity-60',
        className
      )}
    >
      <span className="tabular-nums opacity-70">
        {String(numero).padStart(2, '0')}
      </span>
      {title}
      {mostrarInfo && (
        <Info className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
      )}
    </FilterPill>
  )

  if (!motivo && !precario) return chip

  const tooltipText =
    motivo ??
    (precario
      ? `${precario.motivoResumo} Consulte a nota técnica na metodologia.`
      : '')

  return (
    <Tooltip>
      <TooltipTrigger asChild>{chip}</TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-left leading-relaxed">
        {isObjetivo3(slug) && (
          <p className="mb-1 font-semibold">Objetivo desabilitado</p>
        )}
        {!motivo && precario && (
          <p className="mb-1 font-semibold">
            Nota técnica — cobertura precária
          </p>
        )}
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  )
}
