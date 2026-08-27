'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import type { VariavelDoRecorte } from '@/data/obgd/variaveis-por-objetivo-nivel'

type Props = {
  blurb: string
  variaveis: VariavelDoRecorte[]
  objetivoTitulo: string
  nivelLabel: string
}

export function RankingVariaveisDisclaimer({
  blurb,
  variaveis,
  objetivoTitulo,
  nivelLabel,
}: Props) {
  const n = variaveis.length
  const rotulo =
    n === 1 ? '1 variável' : `${n.toLocaleString('pt-BR')} variáveis`

  return (
    <div
      className="mt-4 max-w-2xl rounded-lg bg-muted/50 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
      data-tour="ranking-variaveis"
    >
      <p>
        <span className="font-medium text-foreground">
          Este objetivo avalia:{' '}
        </span>
        {blurb}
        {n > 0 ? (
          <>
            {' '}
            Neste nível, este índice usa {rotulo}.{' '}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="cursor-pointer font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/90"
                >
                  Ver quais são
                </button>
              </DialogTrigger>
              <DialogContent
                className="flex max-h-[min(85vh,36rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg"
                onOpenAutoFocus={e => e.preventDefault()}
              >
                <DialogHeader className="gap-2 px-6 pt-6 pb-4 text-left">
                  <DialogTitle>Variáveis · {objetivoTitulo}</DialogTitle>
                  <DialogDescription>
                    Indicadores que compõem o índice deste objetivo no nível{' '}
                    {nivelLabel}.
                  </DialogDescription>
                </DialogHeader>
                <Separator />
                <ul className="min-h-0 flex-1 list-none overflow-y-auto px-6 py-2">
                  {variaveis.map(v => (
                    <li
                      key={v.id}
                      className="border-b border-border/60 py-3 last:border-b-0"
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
              </DialogContent>
            </Dialog>
          </>
        ) : null}
      </p>
    </div>
  )
}
