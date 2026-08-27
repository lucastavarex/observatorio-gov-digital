import type { Metadata } from 'next'

import { HomeV1Page } from '@/components/home/home-v1-page'

export const metadata: Metadata = {
  title: 'Home v1',
  description:
    'O Observatório Brasileiro de Governo Digital reúne, em um só lugar, os indicadores dispersos sobre a transformação digital do setor público brasileiro.',
}

export default function HomeV1RoutePage() {
  return <HomeV1Page />
}
