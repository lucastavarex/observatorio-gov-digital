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
import { motivoTematicaDesabilitada } from '@/data/tematicas'
import { cn } from '@/lib/utils'

type TematicaChipProps = {
  nome: string
  nivel: NivelKey
  temCobertura: boolean
  active?: boolean
  onSelect?: () => void
  className?: string
}

export function TematicaChip({
  nome,
  nivel,
  temCobertura,
  active = false,
  onSelect,
  className,
}: TematicaChipProps) {
  const motivo = motivoTematicaDesabilitada(nivel, temCobertura)
  const desabilitado = Boolean(motivo)

  function handleClick() {
    if (desabilitado) {
      toast(motivo, {
        position: 'bottom-right',
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
      {nome}
      {desabilitado && (
        <Info className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
      )}
    </FilterPill>
  )

  if (!motivo) return chip

  return (
    <Tooltip>
      <TooltipTrigger asChild>{chip}</TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-left leading-relaxed">
        <p>{motivo}</p>
      </TooltipContent>
    </Tooltip>
  )
}
