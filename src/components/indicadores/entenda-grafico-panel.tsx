'use client'

import { Info } from 'lucide-react'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type EntendaGraficoTipProps = {
  modo: 'objetivos' | 'tematicas'
  tagNome?: string
  tagDescricao?: string
}

export function EntendaGraficoTip({
  modo,
  tagNome,
  tagDescricao,
}: EntendaGraficoTipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Entenda este gráfico
          <Info className="size-3.5 shrink-0" aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="max-w-sm space-y-2 p-3 text-left text-xs leading-relaxed sm:max-w-md"
      >
        {modo === 'objetivos' ? (
          <>
            <p>
              O radar mostra o perfil do ente nos{' '}
              <strong className="font-medium">dez objetivos da ENGD</strong>.
              Cada eixo é um <strong className="font-medium">índice</strong>{' '}
              (média dos indicadores daquele objetivo, de 0 a 100).
            </p>
            <p>
              A série <strong className="font-medium">Média do nível</strong> é
              a referência dos demais entes do mesmo nível (estados ou
              municípios) que têm dado — não é uma média entre objetivos.
            </p>
          </>
        ) : (
          <>
            <p>
              O gráfico compara o{' '}
              <strong className="font-medium">
                score da categoria temática
              </strong>{' '}
              {tagNome ? (
                <>
                  “{tagNome}” — a média dos indicadores ativos dessa tag no
                  ente.
                </>
              ) : (
                <>selecionada entre os entes escolhidos.</>
              )}
            </p>
            {tagDescricao && <p>{tagDescricao}</p>}
          </>
        )}
        <p>
          Para o cálculo completo,{' '}
          <Link
            href="/metodologia"
            className="font-medium underline underline-offset-2"
          >
            veja a metodologia
          </Link>
          . Detalhes de cada indicador aparecem ao abrir as variáveis do ente.
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
