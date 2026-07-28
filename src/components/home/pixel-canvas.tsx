'use client'

import { type CSSProperties, useEffect, useRef } from 'react'

/*
  Grade de pixels que cresce (com atraso por posição, criando uma varredura) e
  fica cintilando. Adaptado do Pixel Card do React Bits / Originkit: aqui roda
  sozinho ao montar, sem as APIs do Framer (`RenderTarget`, hover) — é o pano de
  fundo da tela de carregamento.
*/

class Pixel {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  color: string
  speed: number
  size: number
  minSize: number
  maxSizeInteger: number
  maxSize: number
  delay: number
  counter: number
  counterStep: number
  isIdle: boolean
  isReverse: boolean
  isShimmer: boolean
  growStart: number | null

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
    maxPx: number
  ) {
    this.ctx = context
    this.x = x
    this.y = y
    this.color = color
    this.speed = (Math.random() * 0.8 + 0.1) * speed
    this.size = 0
    // Faixa original de 0,5–2px reescalada pelo tamanho de pixel escolhido.
    const factor = maxPx / 2
    this.minSize = 0.5 * factor
    this.maxSizeInteger = maxPx
    this.maxSize = Math.random() * (maxPx - this.minSize) + this.minSize
    this.delay = delay
    this.counter = 0
    this.counterStep = Math.random() * 4 + (canvas.width + canvas.height) * 0.01
    this.isIdle = false
    this.isReverse = false
    this.isShimmer = false
    this.growStart = null
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    )
  }

  // O crescimento segue a duração/easing informados; o `delay` por pixel
  // escalona o início e preserva a ordem da varredura.
  appear(now: number, durationMs: number, easeFn: (t: number) => number) {
    this.isIdle = false
    if (this.counter <= this.delay) {
      this.counter += this.counterStep
      return
    }
    if (!this.isShimmer) {
      if (this.growStart === null) this.growStart = now
      const p =
        durationMs > 0 ? Math.min(1, (now - this.growStart) / durationMs) : 1
      this.size = easeFn(p) * this.maxSize
      if (p >= 1) this.isShimmer = true
    }
    if (this.isShimmer) this.shimmer()
    this.draw()
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true
    } else if (this.size <= this.minSize) {
      this.isReverse = false
    }
    this.size += this.isReverse ? -this.speed : this.speed
  }
}

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const fx = (t: number) => ((ax * t + bx) * t + cx) * t
  const dfx = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  return (x: number) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < 8; i++) {
      const e = fx(t) - x
      const d = dfx(t)
      if (Math.abs(e) < 1e-5 || d === 0) break
      t -= e / d
    }
    return ((ay * t + by) * t + cy) * t
  }
}

const easeOut = cubicBezier(0, 0, 0.58, 1)

type AppearFrom = 'middle' | 'top' | 'bottom' | 'left' | 'right'

type PixelCanvasProps = {
  colors?: string[]
  gap?: number
  pixelSize?: number
  /** 0–100; convertido para o passo de cintilação por quadro. */
  speed?: number
  appearFrom?: AppearFrom
  /** Duração do crescimento de cada pixel, em segundos. */
  duration?: number
  className?: string
  style?: CSSProperties
}

export function PixelCanvas({
  colors = ['#377EC1', '#89aef0', '#c7dbf7'],
  gap = 6,
  pixelSize = 2,
  speed = 80,
  appearFrom = 'middle',
  duration = 0.8,
  className,
  style,
}: PixelCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const frameRef = useRef<number | null>(null)
  const timePreviousRef = useRef(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const durationMs = duration * 1000
    // 100 = 0,2px por quadro; sem movimento quando o sistema pede redução.
    const passo = reducedMotion ? 0 : Math.min(speed, 100) * 0.002

    const initPixels = () => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      const width = Math.floor(canvas.clientWidth || container.clientWidth)
      const height = Math.floor(canvas.clientHeight || container.clientHeight)
      const ctx = canvas.getContext('2d')
      if (!ctx || !width || !height) return

      canvas.width = width
      canvas.height = height

      const step = Math.max(1, Math.floor(gap))
      const pxs: Pixel[] = []
      let idx = 0
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          const cor = colors[idx % colors.length]
          idx++

          let delay: number
          if (reducedMotion) {
            delay = 0
          } else if (appearFrom === 'top') {
            delay = y
          } else if (appearFrom === 'bottom') {
            delay = height - y
          } else if (appearFrom === 'left') {
            delay = x
          } else if (appearFrom === 'right') {
            delay = width - x
          } else {
            const dx = x - width / 2
            const dy = y - height / 2
            delay = Math.sqrt(dx * dx + dy * dy)
          }

          pxs.push(
            new Pixel(
              canvas,
              ctx,
              x,
              y,
              cor,
              passo,
              delay,
              Math.max(0.1, pixelSize)
            )
          )
        }
      }
      pixelsRef.current = pxs
    }

    const animar = () => {
      frameRef.current = requestAnimationFrame(animar)

      const agora = performance.now()
      const decorrido = agora - timePreviousRef.current
      const intervalo = 1000 / 60
      if (decorrido < intervalo) return
      timePreviousRef.current = agora - (decorrido % intervalo)

      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const pixel of pixelsRef.current) {
        pixel.appear(agora, durationMs, easeOut)
      }
    }

    initPixels()
    timePreviousRef.current = performance.now()
    frameRef.current = requestAnimationFrame(animar)

    const observer = new ResizeObserver(() => initPixels())
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [gap, pixelSize, speed, appearFrom, duration, colors])

  return (
    <div ref={containerRef} className={className} style={style} aria-hidden>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
