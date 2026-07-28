import { type NextRequest, NextResponse, type ProxyConfig } from 'next/server'

import {
  envVariant,
  rankingEnabledForVariant,
  stripV2Prefix,
} from '@/lib/features/ranking-mode'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const { pathname: stripped, variant: pathVariant } = stripV2Prefix(pathname)
  const envV = envVariant()
  // `/v2` força versão B; senão respeita a env (admin/deploy).
  const variant = pathVariant === 'b' ? 'b' : envV
  const rankingOn = rankingEnabledForVariant(variant)

  // Versão B: bloquear ranking.
  if (
    !rankingOn &&
    (stripped === '/ranking' || stripped.startsWith('/ranking/'))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = pathVariant === 'b' ? '/v2' : '/'
    return NextResponse.redirect(url)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-obgd-variant', variant)

  // Rewrite `/v2/...` → `/...` mantendo a variante no header.
  if (pathVariant === 'b' && stripped !== pathname) {
    const url = request.nextUrl.clone()
    url.pathname = stripped
    return NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    })
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config: ProxyConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
