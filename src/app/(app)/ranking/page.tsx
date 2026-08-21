import type { Metadata } from 'next'
import { Suspense } from 'react'

import { RankingExplorer } from '@/components/ranking/ranking-explorer'

export const metadata: Metadata = {
  title: 'Ranking',
  description:
    'Ranking de Desenvolvimento Digital dos Governos — federal, estadual, capitais e municípios com 100 mil habitantes ou mais.',
}

export default function RankingPage() {
  return (
    <Suspense fallback={null}>
      <RankingExplorer />
    </Suspense>
  )
}
