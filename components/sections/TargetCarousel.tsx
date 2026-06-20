'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'

type TargetCard = {
  id: string
  title: string
  description: string
  /** null = immagine non ancora fornita → render placeholder. Vedi nota su "Lavori intensivi". */
  image: string | null
  alt: string
}

const cards: TargetCard[] = [
  {
    id: 'vita-quotidiana',
    title: 'Vita quotidiana',
    description: 'Postura e tensioni delle lunghe ore da seduti.',
    image: '/ufficio.png',
    alt: 'Persona seduta alla scrivania durante una lunga giornata in ufficio',
  },
  {
    id: 'anzianita',
    title: 'Anzianità',
    description: 'Supporto a equilibrio e stabilità, per più autonomia.',
    image: '/anziano.png',
    alt: 'Persona anziana che cammina con sicurezza',
  },
  {
    id: 'sport',
    title: 'Sport',
    description: 'Equilibrio, forza e recupero, in ogni disciplina.',
    image: '/sciatore.png',
    alt: 'Sciatore in azione lungo una pista innevata',
  },
  {
    id: 'lavori-intensivi',
    title: 'Lavori intensivi',
    description: 'Meno affaticamento muscolare a fine turno.',
    // Immagine non ancora fornita: droppare /public/lavori.png e impostare image: '/lavori.png'.
    image: null,
    alt: 'Lavoratore impegnato in un turno fisicamente intenso',
  },
]

// Stile condiviso dalle frecce: pill brand, 44px (tap target), stato disabilitato ai bordi.
const arrowClass =
  'inline-flex size-11 items-center justify-center rounded-full text-white transition-colors ' +
  'disabled:cursor-not-allowed disabled:opacity-40 ' +
  '[background:var(--brand)] enabled:hover:[background:var(--brand-hover)]'

export default function TargetCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  // Abilita/disabilita le frecce ai bordi (no loop, fedele a EvoTrack).
  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 1)
    setCanNext(el.scrollLeft < max - 1)
  }, [])

  // Misura reale (cambia con il breakpoint) + stato iniziale delle frecce.
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateArrows()
    const ro = new ResizeObserver(updateArrows)
    ro.observe(el)
    return () => ro.disconnect()
  }, [updateArrows])

  // Avanza/indietreggia di una card (larghezza + gap), snap fluido salvo reduced-motion.
  const scrollByCards = useCallback(
    (dir: 1 | -1) => {
      const el = scrollerRef.current
      if (!el) return
      const firstCard = el.firstElementChild as HTMLElement | null
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0
      const step = firstCard ? firstCard.offsetWidth + gap : el.clientWidth * 0.8
      el.scrollBy({ left: dir * step, behavior: reduced ? 'auto' : 'smooth' })
    },
    [reduced],
  )

  return (
    <Section id="per-chi">
      <Container>
        {/* ── Intestazione (testo a sinistra, frecce a destra come EvoTrack) ── */}
        <div className="mb-10 flex items-end justify-between gap-6 lg:mb-12">
          <div className="flex max-w-2xl flex-col gap-4">
            <Reveal>
              <h2
                className="text-balance font-bold"
                style={{ fontSize: 'var(--fs-h2)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Per come ti muovi, ogni giorno.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p
                className="text-pretty"
                style={{ fontSize: 'var(--fs-lead)', color: 'var(--text-muted)', lineHeight: 1.6 }}
              >
                Axon lavora con te in ogni contesto, dal lavoro allo sport.
              </p>
            </Reveal>
          </div>

          {/* Frecce: solo da sm in su — su mobile ci si muove con swipe + peek */}
          <Reveal delay={0.14} className="hidden shrink-0 sm:block">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                disabled={!canPrev}
                aria-label="Mostra il contesto precedente"
                className={arrowClass}
              >
                <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                disabled={!canNext}
                aria-label="Mostra il contesto successivo"
                className={arrowClass}
              >
                <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* ── Carosello ── */}
        <Reveal delay={0.1}>
          <div
            ref={scrollerRef}
            onScroll={updateArrows}
            role="region"
            aria-label="Contesti d'uso di Axon"
            tabIndex={0}
            className="flex snap-x snap-proximity gap-4 overflow-x-auto lg:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="relative w-[80%] flex-none snap-start overflow-hidden sm:w-[56%] md:w-[40%] lg:w-[316px]"
                style={{ aspectRatio: '3 / 4', borderRadius: 'var(--radius-lg)' }}
              >
                {/* Immagine o placeholder: il FRAME (riquadro + raggio + aspect) resta identico */}
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 56vw, (max-width: 1024px) 40vw, 316px"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                    style={{ background: 'var(--surface-2)' }}
                  >
                    <ImageOff size={26} strokeWidth={1.5} style={{ color: 'var(--text-subtle)' }} aria-hidden="true" />
                    <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)' }}>
                      Immagine in arrivo
                    </span>
                  </div>
                )}

                {/* Scrim: trasparente in alto → scuro in basso, per leggibilità del testo */}
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 32%, transparent 58%)',
                  }}
                />

                {/* Overlay testo in basso a sinistra */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
                  <h3 className="font-bold text-white" style={{ fontSize: 'var(--fs-h3)', letterSpacing: '-0.01em' }}>
                    {card.title}
                  </h3>
                  <p
                    className="line-clamp-2 text-pretty"
                    style={{ fontSize: 'var(--fs-body)', color: 'rgba(255,255,255,0.88)', lineHeight: 1.45 }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── CTA ── */}
        <Reveal delay={0.1}>
          <div className="mt-8">
            <Button href="#testimonianze" variant="ghost">
              Scopri lo studio
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
