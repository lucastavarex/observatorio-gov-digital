import { type NextRequest, NextResponse, type ProxyConfig } from 'next/server'

export function proxy(_request: NextRequest) {
  return NextResponse.next()
}

export const config: ProxyConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
