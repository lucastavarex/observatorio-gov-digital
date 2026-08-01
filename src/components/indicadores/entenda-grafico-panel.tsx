'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { HELP_PANEL_STORAGE_KEY } from '@/data/help-copy'
import { cn } from '@/lib/utils'

type EntendaGraficoPanelProps = {
  modo: 'objetivos' | 'tematicas'
  tagNome?: string
  tagDescricao?: string
}

export function EntendaGraficoPanel({
  modo,
  tagNome,
  tagDescricao,
}: EntendaGraficoPanelProps) {
  const [aberto, setAberto] = React.useState(true)

  React.useEffect(() => {
    try {
      if (sessionStorage.getItem(HELP_PANEL_STORAGE_KEY) === '1') {
        setAberto(false)
      }
    } catch {
      /* ignore */
    }
  }, [])

  function toggle() {
    const next = !aberto
    setAberto(next)
    try {
      if (!next) sessionStorage.setItem(HELP_PANEL_STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mt-6 rounded-lg border border-border bg-muted/30">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={aberto}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-foreground">
          Entenda este gráfico
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-4 shrink-0 text-muted-foreground transition-transform',
            aberto && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200',
          aberto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            {modo === 'objetivos' ? (
              <>
                <p>
                  O radar mostra o perfil do ente nos{' '}
                  <strong className="font-medium text-foreground">
                    dez objetivos da ENGD
                  </strong>
                  . Cada eixo é um{' '}
                  <strong className="font-medium text-foreground">
                    sub-índice
                  </strong>{' '}
                  (média dos indicadores daquele objetivo, de 0 a 100).
                </p>
                <p>
                  A série{' '}
                  <strong className="font-medium text-foreground">
                    Média do nível
                  </strong>{' '}
                  é a referência dos demais entes do mesmo nível (estados ou
                  capitais) que têm dado — não é uma média entre objetivos.
                </p>
              </>
            ) : (
              <>
                <p>
                  O gráfico compara o{' '}
                  <strong className="font-medium text-foreground">
                    score da categoria temática
                  </strong>{' '}
                  {tagNome ? (
                    <>
                      <span className="text-foreground">“{tagNome}”</span> — a
                      média dos indicadores ativos dessa tag no ente.
                    </>
                  ) : (
                    <>selecionada entre os entes escolhidos.</>
                  )}
                </p>
                {tagDescricao && (
                  <p className="text-foreground/90">{tagDescricao}</p>
                )}
              </>
            )}
            <p>
              <Link
                href="/metodologia"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Como calculamos
              </Link>
              {' · '}
              detalhes por indicador ao abrir as variáveis do ente.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
