import type { Metadata } from 'next'

import { IndicadoresExplorer } from '@/components/indicadores/indicadores-explorer'

export const metadata: Metadata = {
  title: 'Indicadores',
  description:
    'Explore e compare a maturidade digital dos governos nos dez objetivos da ENGD.',
}

export default function IndicadoresPage() {
  return <IndicadoresExplorer />
}
