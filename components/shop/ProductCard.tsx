'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'

export interface ProductImage {
  src: string
  alt: string
}

interface ProductCardProps {
  images: ProductImage[]
  title: string
  subtitle: string
  includes: string[]
  price: string
  priceNote?: string
  href: string
  /** true sulla prima card della pagina: la sua prima immagine è l'elemento
      LCP dello Shop — priority la preloada invece del lazy di default. */
  priority?: boolean
}

// Stile frecce condiviso col resto del sito: pill brand, 44px, stato disabilitato ai bordi.
const arrowClass =
  'inline-flex size-11 items-center justify-center rounded-full text-white transition-colors ' +
  'disabled:cursor-not-allowed disabled:opacity-0 ' +
  '[background:var(--brand)] enabled:hover:[background:var(--brand-hover)]'

export default function ProductCard({
  images,
  title,
  subtitle,
  includes,
  price,
  priceNote,
  href,
  priority = false,
}: ProductCardProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(images.length > 1)
  const [index, setIndex] = useState(0)

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 1)
    setCanNext(el.scrollLeft < max - 1)
    setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateArrows()
    const ro = new ResizeObserver(updateArrows)
    ro.observe(el)
    return () => ro.disconnect()
  }, [updateArrows])

  const scrollByOne = useCallback(
    (dir: 1 | -1) => {
      const el = scrollerRef.current
      if (!el) return
      el.scrollBy({ left: dir * el.clientWidth, behavior: reduced ? 'auto' : 'smooth' })
    },
    [reduced],
  )

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      {/* ── Galleria immagini (scroll orizzontale + frecce) ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '4/3', background: '#ffffff' }}
      >
        <div
          ref={scrollerRef}
          onScroll={updateArrows}
          role="region"
          aria-label={`Immagini ${title}`}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <div key={img.src} className="relative h-full w-full flex-none snap-center">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={priority && i === 0}
                className="object-contain object-center p-[18px] md:p-5 lg:p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* Frecce — nascoste sotto md: a 375 le due pill da 44px coprono i
            bordi dell'immagine in un riquadro di soli 327px e lo scroller ha
            già snap-x snap-mandatory, quindi lo swipe è nativo e bastano i
            dot. Tornano da md (tablet e desktop, invariato). */}
        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-3 md:flex">
            <button
              type="button"
              onClick={() => scrollByOne(-1)}
              disabled={!canPrev}
              aria-label="Immagine precedente"
              className={`pointer-events-auto ${arrowClass}`}
            >
              <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByOne(1)}
              disabled={!canNext}
              aria-label="Immagine successiva"
              className={`pointer-events-auto ${arrowClass}`}
            >
              <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Indicatori (dots) — ingranditi 6→8px sotto lg, solo per
            visibilità su sfondo bianco (restano non cliccabili,
            pointer-events:none: il minimo target 24×24 non si applica).
            Da lg tornano alla dimensione desktop invariata. */}
        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
            {images.map((img, i) => (
              <span
                key={img.src}
                aria-hidden="true"
                className={`h-2 rounded-full transition-all lg:h-1.5 ${
                  i === index ? 'w-6 lg:w-[18px]' : 'w-2 lg:w-1.5'
                }`}
                style={{
                  background: i === index ? 'var(--brand)' : 'rgba(10,10,11,0.18)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Corpo ── */}
      {/* Padding 28→20px sotto md: a 375 p-7 lasciava 271px di riga utile e
          la lista "include" andava a capo su ogni voce. Da md torna a
          28px (lg:p-8 desktop invariato). Gap segue lo stesso schema. */}
      <div className="flex flex-col flex-1 gap-5 p-5 md:gap-[22px] md:p-7 lg:gap-6 lg:p-8">
        {/* Titolo + sottotitolo */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-h3" style={{ color: '#0a0a0b' }}>
            {title}
          </h3>
          {/* Testo body 16px sotto md, torna al token --fs-body (17px) da
              md — invariato rispetto al desktop attuale. Il font-size vive
              in className (non style) perché uno style inline non può mai
              essere sovrascritto da una classe responsive. */}
          <p
            className="text-[1rem] md:[font-size:var(--fs-body)]"
            style={{
              color: 'var(--text-on-white-muted)',
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Lista "include" */}
        <ul className="flex flex-col gap-2.5">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="inline-flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '999px',
                  background: 'var(--brand-soft)',
                  color: 'var(--brand)',
                }}
              >
                <Check size={13} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span
                className="text-[1rem] md:[font-size:var(--fs-body)]"
                style={{
                  color: '#0a0a0b',
                  lineHeight: 1.5,
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Prezzo + CTA — ancorati in basso */}
        <div className="flex flex-col gap-5 mt-auto pt-2">
          <div className="flex flex-col gap-1">
            {/* Prezzo fissato a 2rem/2.25rem sotto lg invece del clamp
                --fs-h2: a 375 il clamp vale già 32px (corretto) ma a 834
                sale fluidamente a ~33px — qui vogliamo un valore fisso per
                fascia. Da lg torna al token clamp, invariato. */}
            <p
              className="font-bold text-[2rem] md:text-[2.25rem] lg:[font-size:var(--fs-h2)]"
              style={{ letterSpacing: '-0.02em', color: '#0a0a0b' }}
            >
              {price}
            </p>
            {priceNote && (
              <p
                style={{
                  fontSize: 'var(--fs-caption)',
                  // --text-on-white-muted: 0.45 alpha non raggiungeva il
                  // contrasto AA 4.5:1 su bianco per testo a --fs-caption.
                  color: 'var(--text-on-white-muted)',
                }}
              >
                {priceNote}
              </p>
            )}
          </div>

          {/* Finché l'URL Shopify è il placeholder '#' (lib/links.ts), il CTA
              è un bottone disabilitato "Presto disponibile" — mai un link
              href="#". Impostare l'URL reale in lib/links.ts ripristina
              automaticamente il link "Acquista". */}
          {href === '#' ? (
            <div className="flex flex-col gap-2">
              <Button type="button" disabled variant="primary" size="lg">
                Presto disponibile
              </Button>
              <p
                style={{ fontSize: 'var(--fs-caption)', color: 'rgba(10,10,11,0.62)' }}
              >
                L&rsquo;acquisto online sarà attivo a breve. Per ordinare subito scrivi a{' '}
                <a href="mailto:info@axon-tech.it" style={{ textDecoration: 'underline' }}>
                  info@axon-tech.it
                </a>
                .
              </p>
            </div>
          ) : (
            <Button href={href} target="_blank" variant="primary" size="lg">
              Acquista
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
