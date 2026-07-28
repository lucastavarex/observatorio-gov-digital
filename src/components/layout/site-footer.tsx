'use client'

import Link from 'next/link'

import { usePlatformVariant } from '@/lib/features/use-platform-variant'

type FooterItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const footerNavBase: FooterItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Indicadores',
    href: '/indicadores',
    children: [
      { label: 'Indicadores', href: '/indicadores' },
      { label: 'Ranking', href: '/ranking' },
      { label: 'Objetivos', href: '/objetivos' },
    ],
  },
  { label: 'Publicações', href: '/publicacoes' },
  { label: 'Notícias', href: '/noticias' },
  {
    label: 'Sobre',
    href: '/sobre',
    children: [
      { label: 'Equipe', href: '/sobre' },
      { label: 'Metodologia', href: '/metodologia' },
    ],
  },
  { label: 'Contato', href: '/contato' },
]

export function SiteFooter() {
  const { rankingOn, link } = usePlatformVariant()

  const footerNav = footerNavBase.map(item => {
    if (!item.children) return { ...item, href: link(item.href) }
    const children = item.children
      .filter(c => rankingOn || c.href !== '/ranking')
      .map(c => ({ ...c, href: link(c.href) }))
    return { ...item, href: link(item.href), children }
  })

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="flex flex-col font-semibold text-sm leading-tight tracking-tight">
              <span>Observatório Brasileiro</span>
              <span>de Governo Digital</span>
            </p>
          </div>

          <nav className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-start md:gap-x-8 md:gap-y-8">
            {footerNav.map(item => (
              <div key={item.href}>
                {item.children ? (
                  <span className="font-semibold text-foreground text-sm">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="font-semibold text-foreground text-sm transition-colors hover:text-muted-foreground"
                  >
                    {item.label}
                  </Link>
                )}

                {item.children && (
                  <ul className="mt-2 space-y-2">
                    {item.children.map(child => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-16 border-t pt-6 text-muted-foreground text-xs">
          © {new Date().getFullYear()} Observatório Brasileiro de Governo
          Digital. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
