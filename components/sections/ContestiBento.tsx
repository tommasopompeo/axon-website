'use client'

import Image from 'next/image'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'

/* Parola chiave evidenziata nelle frasi overlay */
function Key({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-semibold text-white"
      style={{
        textDecoration: 'underline',
        textDecorationColor: 'var(--brand)',
        textUnderlineOffset: '3px',
        textDecorationThickness: '1px',
      }}
    >
      {children}
    </span>
  )
}

function ImageOverlay({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string
  alt: string
  caption: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden h-full ${className}`}
      style={{ borderRadius: 'var(--radius-lg)', minHeight: '260px' }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Overlay scuro di base per leggibilità del testo bianco */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" aria-hidden="true" />
      {/* Scrim gradiente rinforzato in basso */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      {/* Overlay text */}
      <div className="absolute bottom-0 left-0 p-5 flex flex-col gap-2">
        <p
          className="font-semibold text-white leading-snug"
          style={{ fontSize: 'var(--fs-body)', maxWidth: '26ch' }}
        >
          {caption}
        </p>
      </div>
    </div>
  )
}

export default function ContestiBento() {
  return (
    <Section id="contesti">
      <Container>

        {/* ── Header compatto ── */}
        <div className="flex flex-col gap-4 mb-10 lg:mb-12 max-w-[75ch]">
          <Reveal>
            <h2
              className="font-bold"
              style={{
                fontSize: 'var(--fs-h2)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Equilibrio e stabilità posturale, benessere e autonomia tutti i giorni.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              style={{
                fontSize: 'var(--fs-lead)',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
              }}
            >
              Micro-stimolazioni vibrazionali passive che sostengono equilibrio, forza, flessibilità e recupero muscolare. Senza batterie, senza contatto con la pelle. Tu indossi i tuoi capi di sempre: Axon lavora da solo.
            </p>
          </Reveal>
        </div>

        {/* ── Bento grid ── */}
        <RevealGroup
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5 lg:grid-cols-3 lg:[grid-template-rows:280px_280px]"
          staggerDelay={0.1}
        >

          {/* CORSA — col 1, span 2 righe */}
          <RevealItem className="lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <ImageOverlay
              src="/corsa.png"
              alt="Persona che corre"
              caption={
                <>
                  Più <Key>resistenza alla fatica</Key> e controllo del passo.
                </>
              }
              className="min-h-[280px] lg:min-h-0"
            />
          </RevealItem>

          {/* BOX DATI — col 2, riga 1 (4 sub-box in griglia asimmetrica: Sopra 2/3 + 1/3, Sotto 1/3 + 2/3) */}
          <RevealItem className="lg:col-start-2 lg:row-start-1">
            <div className="grid grid-cols-3 grid-rows-2 h-full gap-2.5 sm:gap-3 min-h-[260px] lg:min-h-0">
              {/* Box 1: +42% Potenza nel movimento (2/3 width) */}
              <div
                className="col-span-2 flex flex-col justify-between p-4 sm:p-5 bg-white text-black border border-gray-100 shadow-md transition-all duration-300 hover:shadow-lg"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <span
                  className="font-extrabold leading-none"
                  style={{
                    color: 'var(--brand)',
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  +42%
                </span>
                <span
                  className="font-semibold text-gray-800 mt-1"
                  style={{
                    fontSize: 'clamp(0.95rem, 1.25vw, 1.125rem)',
                    lineHeight: 1.25,
                  }}
                >
                  potenza nel movimento
                </span>
              </div>

              {/* Box 2: +28% Equilibrio (1/3 width) */}
              <div
                className="col-span-1 flex flex-col justify-between p-4 sm:p-5 bg-white text-black border border-gray-100 shadow-md transition-all duration-300 hover:shadow-lg"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <span
                  className="font-extrabold leading-none"
                  style={{
                    color: 'var(--brand)',
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  +28%
                </span>
                <span
                  className="font-semibold text-gray-800 mt-1"
                  style={{
                    fontSize: 'clamp(0.95rem, 1.25vw, 1.125rem)',
                    lineHeight: 1.25,
                  }}
                >
                  equilibrio
                </span>
              </div>

              {/* Box 3: +30% Forza (1/3 width) */}
              <div
                className="col-span-1 flex flex-col justify-between p-4 sm:p-5 bg-white text-black border border-gray-100 shadow-md transition-all duration-300 hover:shadow-lg"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <span
                  className="font-extrabold leading-none"
                  style={{
                    color: 'var(--brand)',
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  +30%
                </span>
                <span
                  className="font-semibold text-gray-800 mt-1"
                  style={{
                    fontSize: 'clamp(0.95rem, 1.25vw, 1.125rem)',
                    lineHeight: 1.25,
                  }}
                >
                  forza
                </span>
              </div>

              {/* Box 4: +21% Resistenza (2/3 width) */}
              <div
                className="col-span-2 flex flex-col justify-between p-4 sm:p-5 bg-white text-black border border-gray-100 shadow-md transition-all duration-300 hover:shadow-lg"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <span
                  className="font-extrabold leading-none"
                  style={{
                    color: 'var(--brand)',
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  +21%
                </span>
                <span
                  className="font-semibold text-gray-800 mt-1"
                  style={{
                    fontSize: 'clamp(0.95rem, 1.25vw, 1.125rem)',
                    lineHeight: 1.25,
                  }}
                >
                  resistenza
                </span>
              </div>
            </div>
          </RevealItem>

          {/* NUOTO — col 2, riga 2 */}
          <RevealItem className="lg:col-start-2 lg:row-start-2">
            <ImageOverlay
              src="/nuoto.png"
              alt="Persona che nuota"
              caption={
                <>
                  <Key>Equilibrio e stabilità</Key> posturale.
                </>
              }
              className="min-h-[220px] lg:min-h-0"
            />
          </RevealItem>

          {/* PALESTRA — col 3, span 2 righe */}
          <RevealItem className="lg:col-start-3 lg:row-start-1 lg:row-span-2">
            <ImageOverlay
              src="/palestra.png"
              alt="Persona che si allena in palestra"
              caption={
                <>
                  <Key>Forza</Key> e tono muscolare.
                </>
              }
              className="min-h-[280px] lg:min-h-0"
            />
          </RevealItem>

        </RevealGroup>



      </Container>
    </Section>
  )
}
