'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealTextProps {
  text: string
  /** Classes aplicadas ao parágrafo (tipografia, largura, etc.). */
  className?: string
  /** Classes extras do wrapper (margens, etc.). */
  trackClassName?: string
}

/**
 * Texto revelado palavra a palavra via máscaras + ScrollTrigger (scrub).
 * Com `prefers-reduced-motion`, mostra o texto final sem overlays.
 */
export function ScrollRevealText({
  text,
  className = '',
  trackClassName = '',
}: ScrollRevealTextProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useLayoutEffect(() => {
    const el = paraRef.current
    if (!el) return

    if (reducedMotion) {
      el.dataset.ready = ''
      return
    }

    let split: SplitType | null = null
    let ctx: gsap.Context | null = null
    let resizeTimer: ReturnType<typeof setTimeout> | undefined

    const setup = () => {
      ctx?.revert()
      split?.revert()
      delete el.dataset.ready

      el.textContent = text
      split = new SplitType(el, { types: 'lines,words' })

      for (const word of el.querySelectorAll('.word')) {
        const mask = document.createElement('div')
        mask.className = 'line-mask'
        word.appendChild(mask)
      }

      const masks = Array.from(el.querySelectorAll<HTMLElement>('.line-mask'))

      ctx = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              // Track (não o parágrafo): no load o topo ainda não cruzou o viewport,
              // então o reveal só avança com o scroll — evita texto já revelado em /sobre.
              trigger: trackRef.current,
              start: 'top top',
              end: 'bottom 35%',
              scrub: 1,
            },
          })
          .to(masks, {
            width: '0%',
            duration: 1,
            stagger: 0.5,
          })
      }, trackRef)

      el.dataset.ready = ''
    }

    setup()

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(setup, 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      ctx?.revert()
      split?.revert()
      delete el.dataset.ready
    }
  }, [text, reducedMotion])

  return (
    <div ref={trackRef} className={`relative ${trackClassName}`}>
      <div className="pt-64">
        <p ref={paraRef} className={`split-word ${className}`}>
          {text}
        </p>
      </div>
    </div>
  )
}
