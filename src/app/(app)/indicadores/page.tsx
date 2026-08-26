import type { Metadata } from 'next'

import { IndicadoresExplorer } from '@/components/indicadores/indicadores-explorer'
import { parseIndicadoresSearchParams } from '@/lib/indicadores-url'
import {
  fromNextSearchParams,
  type NextSearchParams,
} from '@/lib/search-params'

export const metadata: Metadata = {
  title: 'Indicadores',
  description:
    'Explore e compare o desenvolvimento digital do governo federal, dos estados e dos municípios com 100 mil habitantes ou mais nos dez objetivos da ENGD.',
}

export default async function IndicadoresPage({
  searchParams,
}: {
  searchParams: Promise<NextSearchParams>
}) {
  const sp = await searchParams
  const filtros = parseIndicadoresSearchParams(fromNextSearchParams(sp))

  return <IndicadoresExplorer filtros={filtros} />
}
