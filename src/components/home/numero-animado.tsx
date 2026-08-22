'use client'

import { useEffect, useState } from 'react'
import SlotCounter from 'react-slot-counter'

type NumeroAnimadoProps = {
  /** Valor final a exibir (ex.: "374"). */
  value: string
  className?: string
}

/**
 * Big number com animação estilo slot machine disparada ao entrar na viewport.
 * O valor final é renderizado no servidor (SSR/no-JS o veem estático); a
 * animação só ocorre no cliente e é suprimida quando o usuário pede menos
 * movimento (`prefers-reduced-motion`).
 */
export function NumeroAnimado({ value, className }: NumeroAnimadoProps) {
  const [reduzirMovimento, setReduzirMovimento] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduzirMovimento(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduzirMovimento(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  if (reduzirMovimento) {
    return <span className={className}>{value}</span>
  }

  return (
    <SlotCounter
      value={value}
      startValue={'0'.repeat(value.length)}
      startValueOnce
      containerClassName={className}
      duration={1}
      dummyCharacterCount={6}
      animateOnVisible={{ triggerOnce: true, rootMargin: '0px 0px -15% 0px' }}
    />
  )
}
