'use client'

import { MotionConfig, motion, useReducedMotion } from 'framer-motion'

const PILARES = [
  'Dados de diferentes fontes',
  'Indicadores estruturados',
  'Comparação entre diferentes realidades',
  'Evidências para decisões',
] as const

export function HomePorqueExiste() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="px-6 py-20 sm:px-10">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-24">
        <div className="max-w-xl">
          <span className="font-medium text-muted-foreground text-sm">
            Por que o observatório existe?
          </span>
          <h2 className="mt-3 font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
            Transformar exige medir
          </h2>
          <p className="mt-4 text-foreground text-base leading-relaxed">
            O Brasil vem avançando na digitalização dos serviços públicos. Mas
            compreender como essa transformação ocorre em diferentes governos
            exige informações estruturadas, comparáveis e baseadas em
            evidências.
          </p>
          <p className="mt-3 text-foreground text-base leading-relaxed">
            O Observatório reúne essas informações em uma visão integrada,
            permitindo identificar avanços, diferenças, gargalos e
            oportunidades.
          </p>
        </div>

        <MotionConfig reducedMotion="user">
          <div className="dash-t">
            <ol className="dash-l relative m-0 list-none p-0">
              {PILARES.map((titulo, i) => (
                <motion.li
                  key={titulo}
                  className="dash-b flex gap-4 py-5 pr-2 pl-6 sm:gap-5 sm:py-6 sm:pl-8"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.35,
                    margin: '0px 0px -40px 0px',
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.35,
                    delay: prefersReducedMotion ? 0 : i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 font-medium text-muted-foreground text-sm tabular-nums tracking-tight"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold text-foreground text-base leading-snug">
                    {titulo}
                  </h3>
                </motion.li>
              ))}
            </ol>
          </div>
        </MotionConfig>
      </div>
    </div>
  )
}
