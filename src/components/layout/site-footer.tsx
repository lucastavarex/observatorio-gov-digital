import Image from 'next/image'
import Link from 'next/link'

type FooterItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const footerNav: FooterItem[] = [
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
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="flex flex-col text-sm font-semibold leading-tight tracking-tight">
              <span>Observatório Brasileiro</span>
              <span>de Governo Digital</span>
            </p>
            <Image
              src="/logos/mgi.png"
              alt="Ministério da Gestão e da Inovação em Serviços Públicos — Governo Federal"
              width={365}
              height={135}
              className="mt-6 h-16 w-auto object-contain"
            />
          </div>

          <nav className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-start md:gap-x-8 md:gap-y-8">
            {footerNav.map(item => (
              <div key={item.href}>
                {item.children ? (
                  <span className="text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
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
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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

        <p className="mt-16 border-t pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Observatório Brasileiro de Governo
          Digital. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
