'use client'

import type * as React from 'react'
import { Fragment, useEffect, useRef } from 'react'

/*
  Texto cujas letras engrossam conforme a proximidade do cursor, animando o eixo
  `wght` da fonte variável do site (Plus Jakarta Sans, 200–800). Adaptado do
  Dynamic Weight do Originkit: aqui sem Framer — o laço usa `requestAnimationFrame`
  e escreve `fontVariationSettings` direto no DOM, porque reagir por estado a 60fps
  com dezenas de letras não se sustenta.
*/

// Alcance (px) da proximidade com força 100.
const ALCANCE_MAX = 800

type PesoVariavelProps = {
  texto: string
  /** Peso em repouso. */
  de?: number
  /** Peso com o cursor sobre a letra. */
  para?: number
  /** 1–100: o quanto o efeito se espalha ao redor do cursor. */
  forca?: number
  /** Constante de tempo da suavização, em segundos. */
  duracao?: number
  className?: string
  as?: 'h1' | 'h2' | 'p' | 'span'
}

export function PesoVariavel({
  texto,
  de = 400,
  para = 800,
  forca = 25,
  duracao = 0.3,
  className,
  as: Tag = 'span',
}: PesoVariavelProps) {
  const containerRef = useRef<HTMLElement>(null)
  const letrasRef = useRef<Array<HTMLSpanElement | null>>([])
  const fatoresRef = useRef<number[]>([])
  const mouseRef = useRef({ x: -99999, y: -99999 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const alcance = Math.max(
      1,
      (Math.min(Math.max(forca, 1), 100) / 100) * ALCANCE_MAX
    )
    const repouso = `'wght' ${de}`

    const mover = (x: number, y: number) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      mouseRef.current = { x: x - rect.left, y: y - rect.top }
    }
    const onMouse = (e: MouseEvent) => mover(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) =>
      e.touches.length && mover(e.touches[0].clientX, e.touches[0].clientY)

    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch)

    let frame = 0
    let anterior = 0

    const quadro = (agora: number) => {
      frame = requestAnimationFrame(quadro)
      const container = containerRef.current
      if (!container) return

      const caixa = container.getBoundingClientRect()
      const { x: mx, y: my } = mouseRef.current

      // Delta do quadro em segundos, limitado para uma aba parada não saltar.
      const dt = Math.min(
        0.1,
        Math.max(0, (agora - (anterior || agora)) / 1000)
      )
      anterior = agora
      // Duração → taxa de suavização exponencial (entra e sai no mesmo ritmo).
      const a = 1 - Math.exp(-dt / Math.max(0.016, duracao))

      for (let i = 0; i < letrasRef.current.length; i++) {
        const letra = letrasRef.current[i]
        if (!letra) continue
        const r = letra.getBoundingClientRect()
        const dx = mx - (r.left + r.width / 2 - caixa.left)
        const dy = my - (r.top + r.height / 2 - caixa.top)
        const dist = Math.sqrt(dx * dx + dy * dy)

        const alvo = Math.min(Math.max(1 - dist / alcance, 0), 1)
        const f =
          (fatoresRef.current[i] ?? 0) +
          (alvo - (fatoresRef.current[i] ?? 0)) * a
        fatoresRef.current[i] = f

        if (f < 0.001) {
          if (letra.style.fontVariationSettings !== repouso) {
            letra.style.fontVariationSettings = repouso
          }
          continue
        }
        letra.style.fontVariationSettings = `'wght' ${Math.round(de + (para - de) * f)}`
      }
    }

    frame = requestAnimationFrame(quadro)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [de, para, forca, duracao])

  // Quebra por palavras (para nenhuma quebrar no meio) e depois por letra: cada
  // letra precisa de uma caixa própria para medir a distância até o cursor.
  const palavras = texto.split(' ')
  letrasRef.current = []
  let indice = 0

  return (
    <Tag
      ref={containerRef as React.Ref<never>}
      className={className}
      style={{ fontVariationSettings: `'wght' ${de}` }}
    >
      {/* Só este nó carrega o texto para leitores de tela. */}
      <span className="sr-only">{texto}</span>
      {palavras.map((palavra, wi) => (
        <Fragment key={wi}>
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {palavra.split('').map((letra, li) => {
              const idx = indice++
              return (
                <span
                  key={li}
                  ref={el => {
                    letrasRef.current[idx] = el
                  }}
                  className="inline-block"
                  style={{ fontVariationSettings: `'wght' ${de}` }}
                >
                  {letra}
                </span>
              )
            })}
          </span>
          {wi < palavras.length - 1 && (
            <span aria-hidden="true" className="inline-block">
              &nbsp;
            </span>
          )}
        </Fragment>
      ))}
    </Tag>
  )
}
