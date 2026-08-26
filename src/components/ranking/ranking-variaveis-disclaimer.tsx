'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { VariavelDoRecorte } from '@/data/obgd/variaveis-por-objetivo-nivel'

type Props = {
  variaveis: VariavelDoRecorte[]
}

export function RankingVariaveisDisclaimer({ variaveis }: Props) {
  const n = variaveis.length
  if (n === 0) return null

  const rotulo =
    n === 1 ? '1 variável' : `${n.toLocaleString('pt-BR')} variáveis`
  const listaKey = variaveis.map(v => v.id).join('|')

  return (
    <div className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
      <p>Neste nível, este índice usa {rotulo}.</p>
      <Accordion
        key={listaKey}
        type="single"
        collapsible
        className="mt-1 w-full"
      >
        <AccordionItem value="variaveis" className="border-0">
          <AccordionTrigger className="w-fit items-center justify-start gap-1.5 py-1.5 text-primary hover:text-primary/90 hover:no-underline [&>svg]:translate-y-0 [&>svg]:text-primary">
            Ver quais são
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <ul className="max-h-64 list-none overflow-y-auto rounded-md border border-border bg-muted/30 px-3 py-1">
              {variaveis.map(v => (
                <li
                  key={v.id}
                  className="border-b border-border/60 py-2 last:border-b-0"
                >
                  <span className="block text-sm font-medium text-foreground">
                    {v.nome}
                  </span>
                  <span className="mt-0.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Fonte: {v.fonte}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
