'use client'

/**
 * ResultsAccordion — blocco "titolo cliccabile + immagine che cambia".
 * ------------------------------------------------------------------------
 * Stessa lingua visiva di StickyScrollApplicazioni (barra verticale a sinistra,
 * titolo attivo bianco bold / inattivo muted, crossfade immagine a destra) ma
 * SENZA scroll-hijacking: pura interazione a click. Primo item aperto di default.
 *
 * Layout invertibile via prop `imageSide` ('right' | 'left').
 * Frame immagine identico alla pagina Applicazioni: aspect-square, max-w-[620px],
 * rounded-lg (24px), stesso bordo e ombra. Placeholder 1:1 finché non si inseriscono
 * i grafici ottimizzati.
 */

import { useState, useId } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Container, Section, Reveal } from '@/components/ui'

export interface ResultItem {
  id: string
  /** Titolo cliccabile (breve). */
  title: string
  /** Testo espandibile — 1-2 frasi, NON ridondante col grafico. */
  body: string
  /** Dato di sintesi mostrato in evidenza (es. "+28.4%"). Opzionale. */
  stat?: string
  /** Etichetta sotto la stat (es. "Scala Tinetti · p = 0.0024"). Opzionale. */
  statLabel?: string
  /** Path immagine/grafico in /public. Se assente → placeholder 1:1. */
  image?: string
  /** Alt dell'immagine. */
  imageAlt?: string
  /** Suggerimento interno al team per il placeholder (quale grafico inserire). */
  imageHint?: string
}

interface ResultsAccordionProps {
  id?: string
  title: string
  subtitle?: string
  items: ResultItem[]
  imageSide?: 'right' | 'left'
  /** true → sfondo var(--bg-elevated) per alternare le sezioni. */
  elevated?: boolean
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function ResultsAccordion({
  id,
  title,
  subtitle,
  items,
  imageSide = 'right',
  elevated = false,
}: ResultsAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduced = useReducedMotion()
  const groupId = useId()

  const handleToggle = (i: number) => {
    // Un item è sempre aperto: cliccando su un altro si passa a quello.
    // Cliccando sull'attivo, resta attivo (evita stati "tutto chiuso" con immagine vuota).
    if (i !== activeIndex) setActiveIndex(i)
  }

  // Colonna immagine (frame identico ad Applicazioni).
  const imageColumn = (
    <div className="w-full flex justify-center lg:justify-end">
      <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-[620px] aspect-square rounded-lg overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.08)] border border-white/10">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: 'easeOut' }}
            style={{ pointerEvents: i === activeIndex ? 'auto' : 'none' }}
            aria-hidden={i !== activeIndex}
          >
            {item.image ? (
              <>
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover"
                  style={{
                    transform: i === activeIndex ? 'scale(1)' : 'scale(1.04)',
                    transition: reduced ? 'none' : 'transform 1s ease',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </>
            ) : (
              // Placeholder 1:1 — sostituire con <Image src=… />
              <div
                className="w-full h-full flex items-center justify-center text-center p-8"
                style={{ background: 'var(--surface)' }}
              >
                <span
                  style={{
                    fontSize: 'var(--fs-caption)',
                    color: 'var(--text-subtle)',
                    lineHeight: 1.5,
                    maxWidth: '34ch',
                  }}
                >
                  {item.imageHint ?? 'Placeholder grafico 1:1'}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )

  // Colonna accordion (titoli cliccabili).
  const listColumn = (
    <div className="flex flex-col w-full">
      {items.map((item, i) => {
        const isActive = i === activeIndex
        const panelId = `${groupId}-panel-${i}`
        const btnId = `${groupId}-btn-${i}`
        return (
          <div key={item.id} className="relative pl-6 py-4">
            {/* Barra verticale indicatrice */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 ${
                isActive ? 'bg-white' : 'bg-white/10'
              }`}
              aria-hidden="true"
            />

            <button
              type="button"
              id={btnId}
              aria-expanded={isActive}
              aria-controls={panelId}
              onClick={() => handleToggle(i)}
              className="w-full text-left group"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <h3
                className={`transition-all duration-300 ${
                  isActive
                    ? 'font-extrabold text-white'
                    : 'font-semibold text-white/35 group-hover:text-white/60'
                }`}
                style={{
                  fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.015em',
                }}
              >
                {item.title}
              </h3>
            </button>

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pr-2 flex flex-col gap-3">
                    {item.stat && (
                      <div className="flex items-baseline gap-3">
                        <span
                          className="font-bold text-[var(--brand)]"
                          style={{
                            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1,
                          }}
                        >
                          {item.stat}
                        </span>
                        {item.statLabel && (
                          <span
                            style={{
                              fontSize: 'var(--fs-caption)',
                              color: 'var(--text-subtle)',
                              lineHeight: 1.4,
                            }}
                          >
                            {item.statLabel}
                          </span>
                        )}
                      </div>
                    )}
                    <p
                      style={{
                        fontSize: 'var(--fs-body)',
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                        maxWidth: '48ch',
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )

  return (
    <Section id={id} elevated={elevated} className="bg-black" style={{ background: elevated ? undefined : 'var(--bg-black)' }}>
      <Container>
        {/* Header sezione */}
        <div className="flex flex-col gap-4 mb-12 lg:mb-16 max-w-5xl">
          <Reveal>
            <h2
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h2>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.1}>
              <p
                style={{
                  fontSize: 'var(--fs-lead)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>

        {/* Griglia: ordine invertibile via imageSide */}
        <Reveal delay={0.06}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {imageSide === 'left' ? (
              <>
                <div className="order-1 lg:order-1">{imageColumn}</div>
                <div className="order-2 lg:order-2">{listColumn}</div>
              </>
            ) : (
              <>
                <div className="order-2 lg:order-1">{listColumn}</div>
                <div className="order-1 lg:order-2">{imageColumn}</div>
              </>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
