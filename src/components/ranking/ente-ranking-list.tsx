import Link from 'next/link'

import { BandeiraEnte } from '@/components/shared/bandeira-ente'
import { formatScore, type NivelKey } from '@/data/indicators'
import { bandeiraSrc } from '@/lib/geo/entes-geo'

type EnteRankingItem = {
  slug: string
  nome: string
  valorPrincipal: number
  valorSecundario?: number | null
  posicao?: number
}

type EnteRankingListProps = {
  entes: EnteRankingItem[]
  basePath: string
  colunaValor?: string
  colunaSecundaria?: string
  nivelKey?: NivelKey
  /** Query string sem `?` (ex. `objetivo=gestao-e-governanca`). */
  hrefQuery?: string
}

export function EnteRankingList({
  entes,
  basePath,
  colunaValor = 'Sub-índice',
  colunaSecundaria,
  nivelKey,
  hrefQuery,
}: EnteRankingListProps) {
  return (
    <div>
      <div className="flex items-center justify-between font-medium text-muted-foreground text-xs uppercase tracking-wide">
        <span>Ente</span>
        <span className="flex items-center gap-4">
          {colunaSecundaria && (
            <span className="hidden text-right whitespace-nowrap sm:inline">
              {colunaSecundaria}
            </span>
          )}
          <span className="text-right whitespace-nowrap">{colunaValor}</span>
        </span>
      </div>

      <div className="-mx-6 mt-3 border-t sm:-mx-10">
        {entes.map((ente, index) => {
          const posicao = ente.posicao ?? index + 1
          return (
            <Link
              key={ente.slug}
              href={
                hrefQuery
                  ? `${basePath}/${ente.slug}?${hrefQuery}`
                  : `${basePath}/${ente.slug}`
              }
              className="flex items-center gap-4 border-b px-6 py-5 transition-colors hover:bg-primary/5 sm:px-10"
            >
              <span className="w-8 shrink-0 text-muted-foreground text-sm tabular-nums">
                {String(posicao).padStart(2, '0')}
              </span>
              {nivelKey && (
                <BandeiraEnte
                  src={bandeiraSrc(nivelKey, ente.slug)}
                  nome={ente.nome}
                />
              )}
              <span className="flex-1 font-medium text-primary text-sm">
                {ente.nome}
              </span>
              <span className="flex items-center gap-4">
                {colunaSecundaria && (
                  <span className="hidden text-right text-muted-foreground text-sm tabular-nums sm:inline">
                    {ente.valorSecundario != null
                      ? formatScore(ente.valorSecundario)
                      : '—'}
                  </span>
                )}
                <span className="text-right font-semibold text-foreground text-sm tabular-nums">
                  {formatScore(ente.valorPrincipal)}
                </span>
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
