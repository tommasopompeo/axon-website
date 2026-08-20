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
 *
 * Sotto lg: "Deck grafici (confermato)" dal prototipo Perché AXON — il
 * layout a 2 colonne (immagine sopra, lista sotto, scollegate) diventa un
 * deck di card che riuniscono stat/titolo/grafico/testo, swipe con snap
 * orizzontale, sempre aperte (niente click/accordion). Con un solo item
 * (sezione Mobilità) il deck non ha senso — resta una card statica unica,
 * stessa larghezza deckW, senza scroller.
 */

import { useState, useId } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container, Section, Reveal, MediaFrame } from '@/components/ui'
import { EASE, DURATION } from '@/lib/motion'

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
  /** Variante WebP a 750px per il deck sotto lg (v. DeckCard) — i grafici
   *  master sono PNG 1600×1600 da 335–658KB, tenuti tali per il testo
   *  sottile e riusati identici dal crossfade desktop (che può mostrarli
   *  fino a 620px CSS su schermi retina, oltre i 750px di questa variante).
   *  Ricompressi qui, non ridimensionati sul desktop, per non rischiare di
   *  smussare quel percorso. Fallback a `image` se assente. */
  imageMobile?: string
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
  /** Testo del suggerimento di scroll sotto il deck (es. "4 parametri —
   *  scorri"). Mostrato solo se passato e items.length > 1 — nel prototipo
   *  compare solo sulla prima sezione (Equilibrio, 4 item), non ripetuto
   *  su quelle successive: l'affordance è già imparata. */
  deckHint?: string
}

// Card del deck sotto lg — stat, titolo, grafico 1:1, testo, sempre aperti.
// className controlla la larghezza: flex-basis nel deck scrollabile,
// width fisso nella card statica a singolo item (v. sotto).
function DeckCard({
  item,
  priority = false,
  className = '',
}: {
  item: ResultItem
  priority?: boolean
  className?: string
}) {
  return (
    <article className={`flex flex-col gap-3.5 ${className}`}>
      {item.stat && (
        <div className="flex flex-col gap-1">
          <span
            className="font-bold text-[var(--brand)] text-[2.25rem] md:text-[2.5rem]"
            style={{ letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            {item.stat}
          </span>
          {item.statLabel && (
            <span
              className="text-[0.875rem] md:[font-size:var(--fs-caption)]"
              style={{ color: 'var(--text-subtle)' }}
            >
              {item.statLabel}
            </span>
          )}
        </div>
      )}
      <h3
        className="text-[1.5rem] md:text-[1.75rem] font-normal leading-[1.15] text-white"
        style={{ letterSpacing: '-0.015em' }}
      >
        {item.title}
      </h3>
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/10">
        {item.image ? (
          <Image
            src={item.imageMobile ?? item.image}
            alt={item.imageAlt ?? item.title}
            fill
            loading={priority ? 'eager' : 'lazy'}
            sizes="(min-width: 768px) 50vw, 84vw"
            className="object-cover"
          />
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
      </div>
      <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        {item.body}
      </p>
    </article>
  )
}

export default function ResultsAccordion({
  id,
  title,
  subtitle,
  items,
  imageSide = 'right',
  deckHint,
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
      <MediaFrame>
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
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
      </MediaFrame>
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
              {/* white/40 e non /35: contrasto 3:1 minimo AA per testo large
                  (v. stesso fix in StickyScrollApplicazioni). */}
              <h3
                className={`transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/40 group-hover:text-white/60'
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
                  transition={{ duration: reduced ? 0 : DURATION.uiSlow, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pr-2 flex flex-col gap-3">
                    {item.stat && (
                      <div className="flex items-baseline gap-3">
                        <span
                          className="font-bold text-[var(--brand)]"
                          style={{
                            fontSize: 'var(--fs-stat-results)',
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
    <Section id={id} background="black">
      <Container>
        {/* Header sezione — condiviso da entrambe le direzioni. Sotto lg
            font-size fisso per fascia invece del clamp(2.25rem,4.5vw,3.25rem)
            (a 375 il clamp vale 36px, il deck vuole 30px), margine 48→28px. */}
        <div className="flex flex-col gap-4 mb-7 lg:mb-16 max-w-5xl">
          <Reveal>
            <h2
              className="text-white text-[1.875rem] md:text-[2.5rem] lg:[font-size:clamp(2.25rem,4.5vw,3.25rem)]"
              style={{
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

        {/* ── Sotto lg: deck di card (stat+titolo+grafico+testo insieme) ── */}
        <div className="lg:hidden">
          {items.length > 1 ? (
            <>
              <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 md:-mx-12 md:px-12 [scroll-padding-left:1.5rem] md:[scroll-padding-left:3rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((item, i) => (
                  <DeckCard
                    key={item.id}
                    item={item}
                    priority={i === 0}
                    className="flex-[0_0_84%] md:flex-[0_0_calc(50%-7px)] snap-start"
                  />
                ))}
              </div>
              {deckHint && (
                <p
                  className="mt-4 flex items-center gap-2"
                  style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-subtle)' }}
                >
                  {deckHint} <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </p>
              )}
            </>
          ) : (
            // Un solo item: l'accordion/deck non avrebbe senso (finta
            // affordance) — resta una card statica, sempre aperta.
            <DeckCard item={items[0]} priority className="w-[84%] md:w-[calc(50%-7px)] max-w-full" />
          )}
        </div>

        {/* ── Da lg: comportamento invariato (crossfade + click) ── */}
        <Reveal delay={0.06} className="hidden lg:block">
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
