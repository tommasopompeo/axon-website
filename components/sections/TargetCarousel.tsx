'use client'

import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
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
    description: 'Postura e tensioni delle lunghe ore lavorative.',
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
    image: '/intenso.png',
    alt: 'Lavoratore impegnato in un turno fisicamente intenso',
  },
]

export default function TargetCarousel() {
  return (
    <Section id="per-chi">
      <Container>
        {/* ── Intestazione ── */}
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
        </div>

        {/* ── Carosello ── */}
        <Reveal delay={0.1}>
          <div
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

                {/* Overlay scuro di base per leggibilità del testo bianco */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" aria-hidden="true" />
                {/* Scrim gradiente rinforzato in basso */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 60%)',
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

      </Container>
    </Section>
  )
}
