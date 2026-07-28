'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'

import { usePlatformVariant } from '@/lib/features/use-platform-variant'

type VariantLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

/** `Link` que preserva o prefixo `/v2` na versão B. */
export function VariantLink({ href, ...props }: VariantLinkProps) {
  const { link } = usePlatformVariant()
  return <Link href={link(href)} {...props} />
}
