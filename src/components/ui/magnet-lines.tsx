'use client'

import { motion } from 'framer-motion'
import {
  type CSSProperties,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

interface MagnetLinesProps {
  rows?: number
  columns?: number
  containerSize?: string
  lineColor?: string
  lineWidth?: string
  lineHeight?: string
  baseAngle?: number
  className?: string
  style?: CSSProperties
}

export function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = 0,
  className = '',
  style = {},
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerMq = window.matchMedia('(pointer: fine)')
    const update = () => setInteractive(!motionMq.matches && pointerMq.matches)
    update()
    motionMq.addEventListener('change', update)
    pointerMq.addEventListener('change', update)
    return () => {
      motionMq.removeEventListener('change', update)
      pointerMq.removeEventListener('change', update)
    }
  }, [])

  const total = rows * columns
  const spans = Array.from({ length: total }, (_, i) => i)

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {spans.map(i => (
        <Line
          key={i}
          containerRef={containerRef}
          lineColor={lineColor}
          lineWidth={lineWidth}
          lineHeight={lineHeight}
          baseAngle={baseAngle}
          interactive={interactive}
        />
      ))}
    </div>
  )
}

function Line({
  containerRef,
  lineColor,
  lineWidth,
  lineHeight,
  baseAngle,
  interactive,
}: {
  containerRef: RefObject<HTMLDivElement | null>
  lineColor: string
  lineWidth: string
  lineHeight: string
  baseAngle: number
  interactive: boolean
}) {
  const lineRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState(baseAngle)

  useEffect(() => {
    if (!interactive) {
      setRotate(baseAngle)
      return
    }

    const updateRotation = (e: MouseEvent) => {
      if (!lineRef.current || !containerRef.current) return

      const rect = lineRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const angle =
        (Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180) / Math.PI

      setRotate(angle + baseAngle)
    }

    window.addEventListener('mousemove', updateRotation)
    return () => window.removeEventListener('mousemove', updateRotation)
  }, [baseAngle, containerRef, interactive])

  return (
    <motion.div
      ref={lineRef}
      animate={{ rotate }}
      transition={
        interactive
          ? { type: 'spring', damping: 20, stiffness: 300 }
          : { duration: 0 }
      }
      style={{
        width: lineWidth,
        height: lineHeight,
        backgroundColor: lineColor,
      }}
    />
  )
}
