'use client'

import {
  BarChart3,
  BookOpen,
  CalendarDays,
  FileText,
  type LucideIcon,
  Video,
} from 'lucide-react'
import * as React from 'react'

import { publicationCategories, publications } from '@/data/publications'
import { cn } from '@/lib/utils'

const categoryMeta: Record<string, { icon: LucideIcon; label: string }> = {
  Artigos: { icon: FileText, label: 'Artigo' },
  Livros: { icon: BookOpen, label: 'Livro' },
  Eventos: { icon: CalendarDays, label: 'Evento' },
  Vídeos: { icon: Video, label: 'Vídeo' },
  Relatórios: { icon: BarChart3, label: 'Relatório' },
}

export function PublicationsList() {
  const [active, setActive] = React.useState('Todas')

  const filtered =
    active === 'Todas'
      ? publications
      : publications.filter(p => p.category === active)

  return (
    <>
      <div className="flex flex-wrap gap-2 px-6 pb-16 sm:px-10">
        {publicationCategories.map(category => {
          const isActive = category === active
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:bg-primary/5 hover:text-primary'
              )}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div className="dash-t grid grid-cols-1 md:grid-cols-2">
        {filtered.map((publication, i) => {
          const meta = categoryMeta[publication.category]
          const Icon = meta?.icon ?? FileText

          return (
            <a
              key={publication.title}
              href={publication.href}
              className={cn(
                'group flex flex-col p-6 transition-colors dash-b hover:bg-primary/5 sm:p-8',
                i % 2 === 0 && 'md:dash-br'
              )}
            >
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full">
                    <Icon aria-hidden="true" className="size-3.5" />
                  </span>
                  <span className="font-medium">
                    {meta?.label ?? publication.category}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  {publication.date}
                </span>
              </div>

              <div className="mt-6">
                <h2 className="font-semibold text-xl tracking-tight">
                  {publication.title}
                </h2>
                <p className="mt-3 text-muted-foreground text-sm">
                  {publication.excerpt}
                </p>
              </div>
            </a>
          )
        })}
      </div>
    </>
  )
}
