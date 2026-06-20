'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const AUTOPLAY_MS = 6500

type Testimonial = {
  quote: string
  name: string
  role: string
}

// Testi esatti da knowledge/content-it.md → "TESTIMONIANZE (testi)".
// ⚠️ Esempi da validare/sostituire con quote reali autorizzate.
const testimonials: Testimonial[] = [
  {
    quote:
      'Lo consiglio ad alcuni pazienti come supporto ai percorsi che già seguono. La cosa che apprezzo è che è passivo e non invasivo: si applica al capo e non ci pensi più.',
    name: 'Giulia Ferraro',
    role: 'Fisioterapista, Treviso',
  },
  {
    quote:
      "L'ho cucito nella fascia dei pantaloncini. Non sento nulla mentre corro, ma sulle uscite lunghe ho la sensazione di gestire meglio la fatica.",
    name: 'Marco Bellandi',
    role: 'Runner amatoriale, Bologna',
  },
  {
    quote:
      'Nei contesti di terza età l’equilibrio è tutto. I primi dati raccolti in struttura sono incoraggianti, soprattutto sulla stabilità del cammino.',
    name: 'Dott.ssa Elena Rossi',
    role: 'Geriatra, Conegliano',
  },
  {
    quote:
      'Passo otto ore alla scrivania. Da quando lo tengo sulla giacca le tensioni a fine giornata mi sembrano più gestibili. Ed è invisibile, nessuno se ne accorge.',
    name: 'Sara De Luca',
    role: 'Impiegata, Milano',
  },
  {
    quote:
      'Lo abbiamo provato con alcuni ragazzi della squadra come supporto in più al recupero. Zero manutenzione, zero batterie: per noi è un vantaggio pratico enorme.',
    name: 'Luca Moretti',
    role: 'Preparatore atletico, Verona',
  },
]

const arrowClass =
  'inline-flex size-11 items-center justify-center rounded-full text-white transition-colors ' +
  '[background:var(--brand)] hover:[background:var(--brand-hover)]'

export default function TestimonialCarousel() {
  const reduced = useReducedMotion()
  const [[index, direction], setState] = useState<[number, number]>([0, 0])

  // Swipe (touch) tracking
  const touchStartX = useRef<number | null>(null)

  const paginate = useCallback((dir: number) => {
    setState(([prev]) => {
      const next = (prev + dir + testimonials.length) % testimonials.length
      return [next, dir]
    })
  }, [])

  // Autoplay — DISATTIVATO se prefers-reduced-motion.
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [reduced, paginate, index])

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 50) paginate(delta < 0 ? 1 : -1)
    touchStartX.current = null
  }

  const t = testimonials[index]

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduced ? 0 : dir > 0 ? 64 : -64 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduced ? 0 : dir > 0 ? -64 : 64 }),
  }

  return (
    <div
      className="relative overflow-hidden"
      role="region"
      aria-roledescription="carosello"
      aria-label="Testimonianze"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <div className="px-7 py-10 md:px-14 md:py-14 lg:px-20">
        <Quote
          size={40}
          strokeWidth={1.5}
          aria-hidden="true"
          style={{ color: 'var(--brand)' }}
        />

        {/* Area slide — altezza gestita dal contenuto, transizione orizzontale */}
        <div className="relative mt-6">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.blockquote
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduced ? 0.25 : 0.45, ease: EASE }}
              className="flex flex-col gap-7"
              aria-live="polite"
            >
              <p
                className="text-balance font-medium"
                style={{
                  fontSize: 'var(--fs-h3)',
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                  color: 'var(--text)',
                }}
              >
                {t.quote}
              </p>
              <footer className="flex flex-col gap-0.5">
                <cite
                  className="font-semibold not-italic"
                  style={{ fontSize: 'var(--fs-body)', color: 'var(--text)' }}
                >
                  {t.name}
                </cite>
                <span
                  style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}
                >
                  {t.role}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Controlli: indicatore n/N + frecce */}
        <div className="mt-10 flex items-center justify-between gap-6">
          <span
            aria-hidden="true"
            style={{
              fontSize: 'var(--fs-caption)',
              color: 'var(--text-subtle)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {String(index + 1).padStart(2, '0')}{' '}
            <span style={{ opacity: 0.5 }}>/ {String(testimonials.length).padStart(2, '0')}</span>
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Testimonianza precedente"
              className={arrowClass}
            >
              <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Testimonianza successiva"
              className={arrowClass}
            >
              <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
