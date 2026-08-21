'use client'

import Link from 'next/link'
import * as React from 'react'

import { BandeiraEnte } from '@/components/shared/bandeira-ente'
import { EnteBusca } from '@/components/shared/ente-busca'
import { InfoTip } from '@/components/shared/info-tip'
import { formatScore, type NivelKey } from '@/data/indicators'
import { ENTE_BUSCA_LIMIAR, entePassaBusca } from '@/lib/ente-busca'
import { bandeiraSrc } from '@/lib/geo/entes-geo'

type EnteRankingItem = {
  slug: string
  nome: string
  ufSigla?: string | null
  valorPrincipal: number
  valorSecundario?: number | null
  posicao?: number
}

type EnteRankingListProps = {
  entes: EnteRankingItem[]
  basePath: string
  colunaValor?: string
  colunaSecundaria?: string
  /** Texto do InfoTip ao lado do cabeçalho da coluna de valor. */
  colunaValorTip?: string
  nivelKey?: NivelKey
  /** Query string sem `?` (ex. `objetivo=gestao-e-governanca`). */
  hrefQuery?: string
}

export function EnteRankingList({
  entes,
  basePath,
  colunaValor = 'Índice',
  colunaSecundaria,
  colunaValorTip,
  nivelKey,
  hrefQuery,
}: EnteRankingListProps) {
  const [busca, setBusca] = React.useState('')
  const mostrarBusca =
    nivelKey === 'municipios' || entes.length > ENTE_BUSCA_LIMIAR
  const filtrados = mostrarBusca
    ? entes.filter(e => entePassaBusca(e, busca))
    : entes
  const mostrarUf = nivelKey === 'municipios'
  const padPosicao = Math.max(
    2,
    String(entes.reduce((m, e) => Math.max(m, e.posicao ?? 0), entes.length))
      .length
  )

  return (
    <div>
      {mostrarBusca && (
        <div className="mb-4">
          <EnteBusca value={busca} onChange={setBusca} />
          {busca.trim() && (
            <p className="mt-2 text-muted-foreground text-xs">
              {filtrados.length} de {entes.length} entes
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between font-medium text-muted-foreground text-xs uppercase tracking-wide">
        <span>Ente</span>
        <span className="flex items-center gap-4">
          {colunaSecundaria && (
            <span className="hidden text-right whitespace-nowrap sm:inline">
              {colunaSecundaria}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-right whitespace-nowrap">
            {colunaValor}
            {colunaValorTip && (
              <InfoTip label={`O que significa ${colunaValor}?`}>
                {colunaValorTip}
              </InfoTip>
            )}
          </span>
        </span>
      </div>

      <div className="-mx-6 mt-3 border-t sm:-mx-10">
        {filtrados.length === 0 && (
          <p className="px-6 py-8 text-muted-foreground text-sm sm:px-10">
            Nenhum ente encontrado para “{busca.trim()}”.
          </p>
        )}
        {filtrados.map((ente, index) => {
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
              <span className="w-10 shrink-0 text-muted-foreground text-sm tabular-nums">
                {String(posicao).padStart(padPosicao, '0')}
              </span>
              {nivelKey && (
                <BandeiraEnte
                  src={bandeiraSrc(nivelKey, ente.slug, ente.ufSigla)}
                  nome={ente.nome}
                />
              )}
              <span className="flex min-w-0 flex-1 items-baseline gap-2 font-medium text-primary text-sm">
                <span className="truncate">{ente.nome}</span>
                {mostrarUf && ente.ufSigla && (
                  <span className="shrink-0 text-muted-foreground text-xs font-normal">
                    {ente.ufSigla}
                  </span>
                )}
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
