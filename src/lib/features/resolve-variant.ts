import { headers } from 'next/headers'

import {
  envVariant,
  type PlatformVariant,
  withVariant,
} from '@/lib/features/ranking-mode'

/** Variante ativa no Server Component (header do proxy ou env). */
export async function resolvePlatformVariant(): Promise<PlatformVariant> {
  const h = await headers()
  if (h.get('x-obgd-variant') === 'b') return 'b'
  return envVariant()
}

/** Helper `href → href com /v2` quando a variante for B. */
export async function variantLink(): Promise<(href: string) => string> {
  const variant = await resolvePlatformVariant()
  return (href: string) => withVariant(href, variant)
}
