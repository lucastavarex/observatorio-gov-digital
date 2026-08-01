'use client'

import Link from 'next/link'
import { InfoTip } from '@/components/shared/info-tip'
import { type FonteResumo, GLOSSARIO } from '@/data/help-copy'

type FontesRecorteProps = {
  fontes: FonteResumo[]
  titulo?: string
}

/** Chips com as bases que alimentam o recorte atual. */
export function FontesRecorte({
  fontes,
  titulo = 'Fontes usadas neste recorte',
}: FontesRecorteProps) {
  if (fontes.length === 0) return null

  return (
    <div className="dash-t mt-8 pt-6">
      <div className="flex items-center gap-1.5">
        <h3 className="font-bold text-foreground text-sm">{titulo}</h3>
        <InfoTip label="O que é uma fonte de dados?">{GLOSSARIO.fonte}</InfoTip>
      </div>
      <p className="mt-1 text-muted-foreground text-xs">
        Resumo das bases que alimentam estas notas. O detalhe por indicador
        aparece ao abrir as variáveis do ente.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {fontes.map(f => (
          <li key={f.id}>
            <Link
              href={f.href}
              className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              title={f.instituicao}
            >
              {f.nome}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
