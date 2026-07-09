'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import { faqItems } from '@/data/faq'
import { cn } from '@/lib/utils'

export function HomeFaq() {
  const [aberto, setAberto] = React.useState<number | null>(0)

  return (
    <div className="mt-8 divide-y border-y">
      {faqItems.map((item, i) => {
        const isOpen = aberto === i
        return (
          <div key={item.pergunta}>
            <button
              type="button"
              onClick={() => setAberto(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-medium text-base text-foreground">
                {item.pergunta}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  'size-5 shrink-0 text-muted-foreground transition-transform',
                  isOpen && 'rotate-180 text-primary'
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-200',
                isOpen
                  ? 'grid-rows-[1fr] pb-5 opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <p className="overflow-hidden text-muted-foreground text-sm leading-relaxed">
                {item.resposta}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
