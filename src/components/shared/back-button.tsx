'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { usePlatformVariant } from '@/lib/features/use-platform-variant'

interface BackButtonProps {
  /** Destino quando não há histórico (acesso direto por URL). */
  fallbackHref: string
  label?: string
  className?: string
}

export function BackButton({
  fallbackHref,
  label = 'Voltar',
  className,
}: BackButtonProps) {
  const router = useRouter()
  const { link } = usePlatformVariant()

  function voltar() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(link(fallbackHref))
    }
  }

  return (
    <button
      type="button"
      onClick={voltar}
      aria-label={label}
      className={className}
    >
      <ArrowLeft className="size-5" />
    </button>
  )
}
