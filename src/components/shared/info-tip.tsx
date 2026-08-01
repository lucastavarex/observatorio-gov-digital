'use client'

import { Info } from 'lucide-react'
import type * as React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type InfoTipProps = {
  label: string
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  /** Classes do conteúdo do tooltip (largura máxima etc.). */
  contentClassName?: string
}

/**
 * Ícone Info com tooltip — glossário no ponto de uso.
 * O botão tem aria-label; o conteúdo fica em TooltipContent.
 */
export function InfoTip({
  label,
  children,
  side = 'top',
  className,
  contentClassName,
}: InfoTipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={cn(
            'inline-flex size-5 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            className
          )}
        >
          <Info className="size-3.5" aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className={cn(
          'max-w-xs text-left text-xs leading-relaxed sm:max-w-sm',
          contentClassName
        )}
      >
        {children}
      </TooltipContent>
    </Tooltip>
  )
}
