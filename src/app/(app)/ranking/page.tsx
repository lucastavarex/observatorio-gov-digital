import type { Metadata } from 'next'
import { Suspense } from 'react'

import { RankingExplorer } from '@/components/ranking/ranking-explorer'

export const metadata: Metadata = {
  title: 'Ranking',
  description:
    'Ranking de maturidade digital dos governos federal, estaduais e municipais.',
}

export default function RankingPage() {
  return (
    <Suspense fallback={null}>
      <RankingExplorer />
    </Suspense>
  )
}
