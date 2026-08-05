import type { Metadata } from 'next'
import { Suspense } from 'react'

import { IndicadoresExplorer } from '@/components/indicadores/indicadores-explorer'

export const metadata: Metadata = {
  title: 'Indicadores',
  description:
    'Explore e compare o desenvolvimento digital dos governos nos dez objetivos da ENGD.',
}

export default function IndicadoresPage() {
  return (
    <Suspense fallback={null}>
      <IndicadoresExplorer />
    </Suspense>
  )
}
