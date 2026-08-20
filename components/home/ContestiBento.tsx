'use client'

import Image from 'next/image'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
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

// Le stesse 4 statistiche del bento desktop, riusate per la griglia 2×2
// sotto lg (v. sotto). Duplicate qui invece di condivise con l'RevealGroup
// desktop per non rischiare di alterarne il markup/layout asimmetrico
// (2/3 + 1/3), lasciato invariato — stesso approccio già usato per gli
// altri componenti di questa rifusione.
const stats = [
  { value: '+42%', label: 'potenza nel movimento' },
  { value: '+28%', label: 'equilibrio' },
  { value: '+30%', label: 'forza' },
  { value: '+21%', label: 'resistenza' },
]

const photos = [
  {
    src: '/corsa.jpg',
    alt: 'Persona che corre',
    caption: (
      <>
        Più <Key>resistenza alla fatica</Key> e controllo del passo.
      </>
    ),
  },
  {
    src: '/nuoto.jpg',
    alt: 'Persona che nuota',
    caption: (
      <>
        <Key>Equilibrio e stabilità</Key> posturale.
      </>
    ),
  },
  {
    src: '/palestra.jpg',
    alt: 'Persona che si allena in palestra',
    caption: (
      <>
        <Key>Forza</Key> e tono muscolare.
      </>
    ),
  },
]

export default function ContestiBento() {
  return (
    <Section id="contesti">
      <Container>

        {/* ── Header compatto — gap/margin per fascia dal prototipo (14px/28px
            sotto lg, invariati 16px/48px da lg). ── */}
        <div className="flex flex-col gap-3.5 lg:gap-4 mb-7 lg:mb-12 max-w-[75ch]">
          <Reveal>
            <h2 className="text-display text-[2.375rem] md:text-[3.5rem] lg:[font-size:clamp(3.25rem,7vw,5.2rem)]">
              Migliora il tuo benessere a 360°
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

        {/* ── Sotto lg: statistiche in griglia 2×2 + foto in carosello
            orizzontale con peek, al posto della bento impilata (v. dc.html
            nota 06: "sei card impilate" — qui 5 — "costavano ~900px di
            scroll per contenuto decorativo"). ── */}
        <div className="lg:hidden mb-4">
          <div className="grid grid-cols-2 gap-2.5">
            {stats.map((s) => (
              <Card
                key={s.label}
                variant="white"
                className="flex flex-col justify-between gap-1 p-[18px]"
                style={{ minHeight: 104 }}
              >
                <span
                  className="font-extrabold leading-none text-[1.8rem]"
                  style={{ color: 'var(--brand)', letterSpacing: '-0.03em' }}
                >
                  {s.value}
                </span>
                <span
                  className="font-semibold text-[15px] leading-[1.25]"
                  style={{ color: 'var(--text-on-white-muted)' }}
                >
                  {s.label}
                </span>
              </Card>
            ))}
          </div>
        </div>
        <div className="lg:hidden mb-4">
          <Reveal>
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mr-6 pr-6 md:-mr-12 md:pr-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {photos.map((p) => (
                <ImageOverlay
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
                  caption={p.caption}
                  className="flex-none w-[78%] md:w-[calc(50%-6px)] snap-start"
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Da lg: bento invariata ── */}
        <RevealGroup
          className="hidden lg:grid lg:gap-5 lg:grid-cols-3 lg:[grid-template-rows:280px_280px]"
          staggerDelay={0.1}
        >

          {/* CORSA — col 1, span 2 righe */}
          <RevealItem className="lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <ImageOverlay
              src="/corsa.jpg"
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
              <Card variant="white" hover className="col-span-2 flex flex-col justify-between p-4 sm:p-5 text-black">
                <span
                  className="font-extrabold leading-none"
                  style={{
                    color: 'var(--brand)',
                    fontSize: 'var(--fs-stat-bento)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  +42%
                </span>
                <span
                  className="font-semibold mt-1"
                  style={{
                    color: 'var(--text-on-white-muted)',
                    fontSize: 'clamp(0.95rem, 1.25vw, 1.125rem)',
                    lineHeight: 1.25,
                  }}
                >
                  potenza nel movimento
                </span>
              </Card>

              {/* Box 2: +28% Equilibrio (1/3 width) */}
              <Card variant="white" hover className="col-span-1 flex flex-col justify-between p-4 sm:p-5 text-black">
                <span
                  className="font-extrabold leading-none"
                  style={{
                    color: 'var(--brand)',
                    fontSize: 'var(--fs-stat-bento)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  +28%
                </span>
                <span
                  className="font-semibold mt-1"
                  style={{
                    color: 'var(--text-on-white-muted)',
                    fontSize: 'clamp(0.95rem, 1.25vw, 1.125rem)',
                    lineHeight: 1.25,
                  }}
                >
                  equilibrio
                </span>
              </Card>

              {/* Box 3: +30% Forza (1/3 width) */}
              <Card variant="white" hover className="col-span-1 flex flex-col justify-between p-4 sm:p-5 text-black">
                <span
                  className="font-extrabold leading-none"
                  style={{
                    color: 'var(--brand)',
                    fontSize: 'var(--fs-stat-bento)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  +30%
                </span>
                <span
                  className="font-semibold mt-1"
                  style={{
                    color: 'var(--text-on-white-muted)',
                    fontSize: 'clamp(0.95rem, 1.25vw, 1.125rem)',
                    lineHeight: 1.25,
                  }}
                >
                  forza
                </span>
              </Card>

              {/* Box 4: +21% Resistenza (2/3 width) */}
              <Card variant="white" hover className="col-span-2 flex flex-col justify-between p-4 sm:p-5 text-black">
                <span
                  className="font-extrabold leading-none"
                  style={{
                    color: 'var(--brand)',
                    fontSize: 'var(--fs-stat-bento)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  +21%
                </span>
                <span
                  className="font-semibold mt-1"
                  style={{
                    color: 'var(--text-on-white-muted)',
                    fontSize: 'clamp(0.95rem, 1.25vw, 1.125rem)',
                    lineHeight: 1.25,
                  }}
                >
                  resistenza
                </span>
              </Card>
            </div>
          </RevealItem>

          {/* NUOTO — col 2, riga 2 */}
          <RevealItem className="lg:col-start-2 lg:row-start-2">
            <ImageOverlay
              src="/nuoto.jpg"
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
              src="/palestra.jpg"
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
