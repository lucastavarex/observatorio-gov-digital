'use client'

import Link from 'next/link'
import { InfoTip } from '@/components/shared/info-tip'
import { oQueAvaliaObjetivo } from '@/data/help-copy'
import { objectives } from '@/data/objectives'

/** Lista compacta: o que cada objetivo mede (modo objetivos). */
export function ObjetivosAvaliaList() {
  return (
    <div className="dash-t mt-8 pt-6">
      <h3 className="font-bold text-foreground text-sm">
        O que cada objetivo avalia
      </h3>
      <p className="mt-1 text-muted-foreground text-xs">
        Resumo do que está sendo medido. Toque no ícone para mais detalhe.
      </p>
      <ul className="mt-4 divide-y border-t">
        {objectives.map((obj, i) => {
          const { blurb, detalhe } = oQueAvaliaObjetivo(obj.slug)
          return (
            <li key={obj.slug} className="flex items-start gap-2 py-3 text-sm">
              <span className="w-6 shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <Link
                    href={`/objetivos/${obj.slug}`}
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {obj.title}
                  </Link>
                  <InfoTip label={`O que avalia: ${obj.title}`}>
                    <p className="mb-1 font-semibold">{obj.title}</p>
                    <p>{detalhe}</p>
                  </InfoTip>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                  {blurb}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
