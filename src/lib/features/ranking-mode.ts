/**
 * Versão A (com ranking) vs B (sem ranking).
 * - Prefixo de rota `/v2` → versão B (testes com o cliente).
 * - `NEXT_PUBLIC_RANKING_MODE=off|farol` → versão B no deploy.
 */

export type PlatformVariant = 'a' | 'b'

export function parseRankingModeEnv(raw: string | undefined): PlatformVariant {
  const v = (raw ?? 'on').trim().toLowerCase()
  if (v === 'off' || v === 'farol') return 'b'
  return 'a'
}

export function rankingEnabledForVariant(variant: PlatformVariant): boolean {
  return variant === 'a'
}

export function stripV2Prefix(pathname: string): {
  pathname: string
  variant: PlatformVariant
} {
  if (pathname === '/v2' || pathname.startsWith('/v2/')) {
    const rest = pathname === '/v2' ? '/' : pathname.slice(3) || '/'
    return { pathname: rest.startsWith('/') ? rest : `/${rest}`, variant: 'b' }
  }
  return { pathname, variant: 'a' }
}

/** Prefixa href com `/v2` quando a variante ativa é B. */
export function withVariant(href: string, variant: PlatformVariant): string {
  if (variant !== 'b') return href
  if (href.startsWith('/v2')) return href
  if (href === '/') return '/v2'
  if (href.startsWith('/')) return `/v2${href}`
  return href
}

export function envVariant(): PlatformVariant {
  return parseRankingModeEnv(process.env.NEXT_PUBLIC_RANKING_MODE)
}
