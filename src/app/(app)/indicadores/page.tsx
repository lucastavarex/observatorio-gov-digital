import type { Metadata } from 'next'
import { Suspense } from 'react'

import { IndicadoresExplorer } from '@/components/indicadores/indicadores-explorer'

export const metadata: Metadata = {
  title: 'Indicadores',
  description:
    'Explore e compare o desenvolvimento digital do governo federal, dos estados, das capitais e dos municípios com 100 mil habitantes ou mais nos dez objetivos da ENGD.',
}

export default function IndicadoresPage() {
  return (
    <Suspense fallback={null}>
      <IndicadoresExplorer />
    </Suspense>
  )
}
