// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Observatório do Governo Digital | Insper × MBC',
  description:
    'Portal público de dados do governo digital. Acompanhe a transformação digital do Brasil com transparência, clareza e dados acessíveis para todos.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={cn('font-sans', inter.variable)}>
      <body className={`${inter.variable} ${fontMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
