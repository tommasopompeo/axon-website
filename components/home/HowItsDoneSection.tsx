'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

export default function HowItsDoneSection() {
  return (
    <Section id="come-indossare" className="bg-white" style={{ background: '#ffffff' }}>
      <Container>

        {/* ── Section Header ── */}
        <div className="flex flex-col gap-4 mb-10 lg:mb-12 max-w-[75ch]">
          <Reveal delay={0.06}>
            <h2
              className="font-bold text-black"
              style={{
                fontSize: 'clamp(3.25rem, 7.0vw, 5.2rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: '#000000',
              }}
            >
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

        {/* ── Dynamic Grid Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* ── LEFT COLUMN: Horizontal Image (Top) + Description (Bottom) ── */}
          <Reveal className="h-full" delay={0.15}>
            <div className="flex flex-col justify-between h-full gap-6">

              {/* Top: Vertical Image (Axon Shell sewn) */}
              <div className="relative w-full aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden border border-gray-200 bg-gray-100 shadow-xl group">
                <Image
                  src="/axon-shell-sewn.jpg"
                  alt="Axon Shell cucito sui vestiti"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Bottom: Shell Description */}
              <div className="p-6 lg:p-8 rounded-[var(--radius-lg)] bg-black text-white border border-gray-800 transition-all duration-300 flex flex-col justify-between gap-4 shadow-lg flex-1">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl lg:text-2xl !font-semibold text-white leading-tight">
                    Cucilo direttamente sui tuoi capi
                  </h3>
                  <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                    Fissa l&apos;Axon Shell™ a qualsiasi capo d&apos;abbigliamento — alla nuca, sul petto o sulla schiena — con pochi semplici punti di cucitura. Ti basterà poi inserire il dispositivo Axon all&apos;interno del guscio ogni volta che decidi di indossarlo.
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
              </div>

            </div>
          </Reveal>

          {/* ── RIGHT COLUMN: Description (Top) + Vertical Image (Bottom) ── */}
          <Reveal className="h-full" delay={0.25}>
            <div className="flex flex-col justify-between h-full gap-6">

              {/* Top: Band Description */}
              <div className="p-6 lg:p-8 rounded-[var(--radius-lg)] bg-black text-white border border-gray-800 transition-all duration-300 flex flex-col justify-between gap-4 shadow-lg flex-1">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl lg:text-2xl !font-semibold text-white leading-tight">
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
              </div>

              {/* Bottom: Vertical Image (Axon Band) */}
              <div className="relative w-full aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden border border-gray-200 bg-gray-100 shadow-xl group">
                <Image
                  src="/axon-watch.jpg"
                  alt="Axon Band indossato al polso"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
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



