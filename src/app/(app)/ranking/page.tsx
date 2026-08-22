import type { Metadata } from 'next'

import { RankingExplorer } from '@/components/ranking/ranking-explorer'
import { parseRankingSearchParams } from '@/lib/ranking-url'
import {
  fromNextSearchParams,
  type NextSearchParams,
} from '@/lib/search-params'

export const metadata: Metadata = {
  title: 'Ranking',
  description:
    'Ranking de Desenvolvimento Digital dos Governos — federal, estadual, capitais e municípios com 100 mil habitantes ou mais.',
}

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<NextSearchParams>
}) {
  const sp = await searchParams
  const filtros = parseRankingSearchParams(fromNextSearchParams(sp))

  return <RankingExplorer filtros={filtros} />
}
