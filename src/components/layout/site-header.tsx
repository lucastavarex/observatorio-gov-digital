'use client'

import { MotionConfig, motion } from 'framer-motion'
import {
  BarChart3,
  ChevronDown,
  type LucideIcon,
  Menu,
  Target,
  Trophy,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NavChild = {
  label: string
  href: string
  description: string
  icon: LucideIcon
}

type NavItem = {
  label: string
  href: string
  align?: 'left' | 'right'
  children?: NavChild[]
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Indicadores',
    href: '/indicadores',
    children: [
      {
        label: 'Indicadores',
        href: '/indicadores',
        description: 'Métricas de governo digital',
        icon: BarChart3,
      },
      {
        label: 'Ranking',
        href: '/ranking',
        description: 'Compare o desempenho dos órgãos',
        icon: Trophy,
      },
      {
        label: 'Objetivos',
        href: '/objetivos',
        description: 'Metas e diretrizes do programa',
        icon: Target,
      },
    ],
  },
  { label: 'Metodologia', href: '/metodologia' },
  { label: 'Publicações', href: '/publicacoes' },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  // href do menu suspenso aberto no desktop (null = todos fechados)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const navRef = React.useRef<HTMLElement>(null)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  // Fecha o menu com Esc ou ao clicar fora da navegação (teclado + mouse)
  React.useEffect(() => {
    if (!openMenu) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenMenu(null)
    }
    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [openMenu])

  return (
    <MotionConfig reducedMotion="user">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo à esquerda */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight sm:text-base">
                Observatório Brasileiro
              </span>
              <span className="-mt-0.5 text-sm font-semibold tracking-tight sm:text-base">
                de Governo Digital
              </span>
            </span>
          </Link>

          {/* Menu à direita (desktop) */}
          <nav ref={navRef} className="hidden items-center gap-1 md:flex">
            {navItems.map(item => {
              if (item.children) {
                const active = item.children.some(c => isActive(c.href))
                const isOpen = openMenu === item.href
                return (
                  <div
                    key={item.href}
                    role="group"
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.href)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() => setOpenMenu(isOpen ? null : item.href)}
                      className={cn(
                        'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        active
                          ? 'text-primary'
                          : isOpen
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          'size-4 transition-transform',
                          isOpen && 'rotate-180'
                        )}
                      />
                    </button>
                    {/* Painel: renderizado quando aberto, com links tabuláveis */}
                    {isOpen && (
                      <>
                        <div
                          className={cn(
                            'absolute top-full z-50 pt-2',
                            item.align === 'right' ? 'right-0' : 'left-0'
                          )}
                        >
                          <div className="w-max min-w-64 max-w-sm rounded-lg border bg-background p-2 shadow-md">
                            {item.children.map(child => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpenMenu(null)}
                                className={cn(
                                  'flex gap-3 rounded-md px-3 py-2.5 transition-colors',
                                  isActive(child.href)
                                    ? 'bg-accent'
                                    : 'hover:bg-accent'
                                )}
                              >
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                                  <child.icon
                                    aria-hidden="true"
                                    className="size-4 text-muted-foreground"
                                  />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold text-foreground">
                                    {child.label}
                                  </span>
                                  <span className="mt-0.5 block text-xs text-muted-foreground">
                                    {child.description}
                                  </span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                        {/* Seta apontando para o botão do gatilho (centralizada nele) */}
                        <div className="absolute left-1/2 top-full z-50 mt-0.5 size-3 -translate-x-1/2 rotate-45 border-l border-t border-border bg-background" />
                      </>
                    )}
                  </div>
                )
              }

              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Ações mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(v => !v)}
            >
              <Menu aria-hidden="true" className="size-5" />
            </Button>
          </div>
        </div>

        {/* Navegação mobile */}
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
              {navItems.map(item => {
                if (item.children) {
                  return (
                    <div key={item.href} className="flex flex-col gap-1">
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                            isActive(child.href)
                              ? 'bg-accent text-primary'
                              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )
                }

                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-accent text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </motion.nav>
        )}
      </header>
    </MotionConfig>
  )
}
