'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'

import {
  envVariant,
  type PlatformVariant,
  rankingEnabledForVariant,
  withVariant,
} from '@/lib/features/ranking-mode'

function variantFromPath(pathname: string): PlatformVariant {
  if (pathname === '/v2' || pathname.startsWith('/v2/')) return 'b'
  return envVariant()
}

function bareFromPath(pathname: string): string {
  if (pathname === '/v2') return '/'
  if (pathname.startsWith('/v2/')) return pathname.slice(3) || '/'
  return pathname
}

/**
 * Variante ativa no client.
 * Usa `window.location.pathname` (URL real com `/v2`) porque, após rewrite do
 * proxy, `usePathname()` pode devolver o path interno sem o prefixo.
 */
export function usePlatformVariant(): {
  variant: PlatformVariant
  rankingOn: boolean
  link: (href: string) => string
  barePath: string
} {
  const nextPathname = usePathname() ?? '/'
  const [pathname, setPathname] = React.useState(nextPathname)

  React.useEffect(() => {
    // Lê a URL real (com /v2) após navegação; nextPathname dispara o sync.
    setPathname(window.location.pathname || nextPathname)
  }, [nextPathname])

  const variant = variantFromPath(pathname)
  const rankingOn = rankingEnabledForVariant(variant)
  const barePath = bareFromPath(pathname)

  const link = React.useCallback(
    (href: string) => withVariant(href, variant),
    [variant]
  )

  return { variant, rankingOn, link, barePath }
}
