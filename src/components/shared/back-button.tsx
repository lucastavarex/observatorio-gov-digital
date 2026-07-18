'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

  function voltar() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackHref)
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
