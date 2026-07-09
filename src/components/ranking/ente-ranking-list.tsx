import Link from 'next/link'

import { formatScore } from '@/data/indicators'

type EnteRankingItem = {
  slug: string
  nome: string
  indiceGeral: number
}

type EnteRankingListProps = {
  entes: EnteRankingItem[]
  basePath: string
  colunaValor?: string
}

/**
 * Lista de ranking de entes no mesmo padrão visual da página Ranking, porém com
 * cada linha navegável para a página de detalhe do ente.
 */
export function EnteRankingList({
  entes,
  basePath,
  colunaValor = 'Índice',
}: EnteRankingListProps) {
  return (
    <div>
      {/* Cabeçalho da tabela */}
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Ente</span>
        <span>{colunaValor}</span>
      </div>

      <div className="-mx-6 mt-3 border-t sm:-mx-10">
        {entes.map((ente, index) => (
          <Link
            key={ente.slug}
            href={`${basePath}/${ente.slug}`}
            className="flex items-center gap-4 border-b px-6 py-5 transition-colors hover:bg-primary/5 sm:px-10"
          >
            <span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 text-sm font-medium text-primary">
              {ente.nome}
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatScore(ente.indiceGeral)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
