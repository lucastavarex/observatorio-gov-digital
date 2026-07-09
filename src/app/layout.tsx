import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { cn } from '@/lib/utils'

import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Observatório Brasileiro de Governo Digital',
    template: '%s | Observatório Brasileiro de Governo Digital',
  },
  description:
    'Observatório Brasileiro de Governo Digital — indicadores, rankings, publicações e notícias sobre a transformação digital do setor público.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={cn(plusJakartaSans.variable)}>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <a
          href="#conteudo"
          className="fixed top-4 left-4 z-100 -translate-y-24 rounded-md bg-foreground px-4 py-2 font-medium text-background text-sm opacity-0 shadow-md transition focus:translate-y-0 focus:opacity-100"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main
          id="conteudo"
          className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col px-4 sm:px-6 lg:px-8 [&>section]:flex [&>section]:min-h-0 [&>section]:flex-1 [&>section]:flex-col [&>section]:!pb-0 [&_.dash-x]:flex-1"
        >
          {children}
        </main>
        <SiteFooter />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
