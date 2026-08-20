'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'

/* ─────────────────────────────────────────────────────────────────────────
 * WearMobileCarousel — sotto md: una sola cornice immagine resta in alto e
 * i due box testo scorrono sotto con peek (84%); passando al secondo box
 * l'immagine sfuma sull'Axon Band. Da md: griglia 2 colonne invariata (v.
 * sotto) — a 834 il layout desktop già funziona, quindi il carosello serve
 * solo sotto 768 (v. "Home - Mobile & Tablet.dc.html" nota 13).
 * ──────────────────────────────────────────────────────────────────────── */
function WearMobileCarousel() {
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    if (!track || !first) return
    const step = first.offsetWidth + 12 // gap-3
    const idx = Math.min(1, Math.round(track.scrollLeft / step))
    setActive(idx)
  }, [])

  return (
    <div className="md:hidden flex flex-col gap-4">
      {/* Cornice immagine — le due foto sono sovrapposte (fill) e sfumano
          in opacità in base alla card di testo più visibile. */}
      <div className="relative w-full aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden border border-[rgba(0,0,0,0.06)] bg-white shadow-xl">
        <Image
          src="/axon-shell-sewn.jpg"
          alt="Axon Shell cucito sui vestiti"
          fill
          className="object-cover object-center"
          style={{ opacity: active === 0 ? 1 : 0, transition: 'opacity 0.45s var(--ease)' }}
          sizes="100vw"
        />
        <Image
          src="/axon-watch.jpg"
          alt="Axon Band indossato al polso"
          fill
          loading="lazy"
          className="object-cover object-center"
          style={{ opacity: active === 1 ? 1 : 0, transition: 'opacity 0.45s var(--ease)' }}
          sizes="100vw"
        />
      </div>

      {/* Carosello testi — bleed solo a destra (il primo box resta allineato
          al padding del Container), peek all'84%. */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mr-6 pr-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <Card variant="surface" className="flex-none w-[84%] snap-start flex flex-col gap-2.5 p-[18px]" style={{ borderRadius: 20 }}>
          <h3 className="text-[18px] font-normal leading-[1.25] text-white">
            Cucilo direttamente sui tuoi capi
          </h3>
          <p className="text-[14px] leading-[1.6] text-zinc-300">
            Fissa l&apos;Axon Shell a qualsiasi capo d&apos;abbigliamento — alla nuca, sul petto o sulla schiena — con pochi semplici punti di cucitura. Ti basterà poi inserire il dispositivo Axon all&apos;interno del guscio ogni volta che decidi di indossarlo.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 min-h-11 text-[14px] font-semibold text-[var(--brand)]"
          >
            <span>Vedi nello shop</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Card>
        <Card variant="surface" className="flex-none w-[84%] snap-start flex flex-col gap-2.5 p-[18px]" style={{ borderRadius: 20 }}>
          <h3 className="text-[18px] font-normal leading-[1.25] text-white">
            Axon Band: indossalo al polso
          </h3>
          <p className="text-[14px] leading-[1.6] text-zinc-300">
            Preferisci la praticità di un accessorio quotidiano? Puoi indossare Axon comodamente al polso grazie all&apos;esclusivo cinturino Axon Band, ideato per accompagnarti in ogni attività e disponibile all&apos;acquisto direttamente sul nostro shop.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 min-h-11 text-[14px] font-semibold text-[var(--brand)]"
          >
            <span>Vedi nello shop</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Card>
      </div>
    </div>
  )
}

export default function HowItsDoneSection() {
  return (
    <Section id="come-indossare" background="white">
      <Container>

        {/* ── Section Header — gap/margin per fascia dal prototipo (14px/28px
            sotto lg, invariati 16px/48px da lg). ── */}
        <div className="flex flex-col gap-3.5 lg:gap-4 mb-7 lg:mb-12 max-w-[75ch]">
          <Reveal delay={0.06}>
            <h2 className="text-display text-black text-[2.375rem] md:text-[3.5rem] lg:[font-size:clamp(3.25rem,7vw,5.2rem)]" style={{ color: '#000000' }}>
              Indossa Axon come preferisci
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p
              style={{
                fontSize: 'var(--fs-lead)',
                lineHeight: 1.6,
                color: 'var(--text-on-white-muted)',
              }}
            >
              Progettato per adattarsi perfettamente al tuo stile di vita. Scegli la soluzione più comoda per te ed esprimi il massimo del tuo benessere in ogni momento.
            </p>
          </Reveal>
        </div>

        {/* ── Sotto md: immagine + carosello testi (v. dc.html nota 13) ── */}
        <WearMobileCarousel />

        {/* ── Da md: griglia invariata. Solo lo zoom on hover è disattivato
            sotto lg (group-hover → lg:group-hover): su touch non esiste,
            era puramente decorativo (v. dc.html nota 07). ── */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* ── LEFT COLUMN: Horizontal Image (Top) + Description (Bottom) ── */}
          <Reveal className="h-full" delay={0.15}>
            <div className="flex flex-col justify-between h-full gap-6">

              {/* Top: Vertical Image (Axon Shell sewn) */}
              <div className="relative w-full aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden border border-[rgba(0,0,0,0.06)] bg-white shadow-xl group">
                <Image
                  src="/axon-shell-sewn.jpg"
                  alt="Axon Shell cucito sui vestiti"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out lg:group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Bottom: Shell Description */}
              <Card variant="surface" className="p-6 lg:p-8 text-white flex flex-col justify-between gap-4 shadow-lg flex-1">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl lg:text-2xl text-white leading-tight">
                    Cucilo direttamente sui tuoi capi
                  </h3>
                  <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                    Fissa l&apos;Axon Shell a qualsiasi capo d&apos;abbigliamento — alla nuca, sul petto o sulla schiena — con pochi semplici punti di cucitura. Ti basterà poi inserire il dispositivo Axon all&apos;interno del guscio ogni volta che decidi di indossarlo.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] hover:opacity-80 transition-opacity group/link"
                  >
                    <span>Vedi nello shop</span>
                    <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </Card>

            </div>
          </Reveal>

          {/* ── RIGHT COLUMN: Description (Top) + Vertical Image (Bottom) ── */}
          <Reveal className="h-full" delay={0.25}>
            <div className="flex flex-col justify-between h-full gap-6">

              {/* Top: Band Description */}
              <Card variant="surface" className="p-6 lg:p-8 text-white flex flex-col justify-between gap-4 shadow-lg flex-1">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl lg:text-2xl text-white leading-tight">
                    Axon Band: indossalo al polso
                  </h3>
                  <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                    Preferisci la praticità di un accessorio quotidiano? Puoi indossare Axon comodamente al polso grazie all&apos;esclusivo cinturino Axon Band, ideato per accompagnarti in ogni attività e disponibile all&apos;acquisto direttamente sul nostro shop.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] hover:opacity-80 transition-opacity group/link"
                  >
                    <span>Vedi nello shop</span>
                    <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </Card>

              {/* Bottom: Vertical Image (Axon Band) */}
              <div className="relative w-full aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden border border-[rgba(0,0,0,0.06)] bg-white shadow-xl group">
                <Image
                  src="/axon-watch.jpg"
                  alt="Axon Band indossato al polso"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out lg:group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

            </div>
          </Reveal>

        </div>

      </Container>
    </Section>
  )
}
