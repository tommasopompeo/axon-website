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
    image: '/ufficio.jpg',
    alt: 'Persona seduta alla scrivania durante una lunga giornata in ufficio',
  },
  {
    id: 'anzianita',
    title: 'Anzianità',
    description: 'Supporto a equilibrio e stabilità, per più autonomia.',
    image: '/anziano.jpg',
    alt: 'Persona anziana che cammina con sicurezza',
  },
  {
    id: 'sport',
    title: 'Sport',
    description: 'Equilibrio, forza e recupero, in ogni disciplina.',
    image: '/sciatore.jpg',
    alt: 'Sciatore in azione lungo una pista innevata',
  },
  {
    id: 'lavori-intensivi',
    title: 'Lavori intensivi',
    description: 'Meno affaticamento muscolare a fine turno.',
    image: '/intenso.jpg',
    alt: 'Lavoratore impegnato in un turno fisicamente intenso',
  },
]

/* Tile — frame immagine 3:4 + overlay testo, condiviso dal carosello sotto
 * lg e dalla griglia da lg: unico contenuto, unica fonte di verità. `tileCls`
 * distingue solo dimensione/bordo tra le due modalità. */
function Tile({ card, tileCls = '' }: { card: TargetCard; tileCls?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${tileCls}`}
      style={{ aspectRatio: '3 / 4', borderRadius: 'var(--radius-lg)' }}
    >
      {/* Immagine o placeholder: il FRAME (riquadro + raggio + aspect) resta identico */}
      {card.image ? (
        <Image
          src={card.image}
          alt={card.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1023px) 78vw, 25vw"
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
        <h3 className="text-h3 text-white">
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
  )
}

export default function TargetCarousel() {
  return (
    <Section id="per-chi">
      <Container>
        {/* ── Intestazione — gap/margin per fascia dal prototipo (14px/24px
            sotto lg, invariati 16px/48px da lg). ── */}
        <div className="mb-6 flex items-end justify-between gap-6 lg:mb-12">
          <div className="flex max-w-[75ch] flex-col gap-3.5 lg:gap-4">
            <Reveal>
              <h2 className="text-balance text-display text-[2.375rem] md:text-[3.5rem] lg:[font-size:clamp(3.25rem,7vw,5.2rem)]">
                Per come ti muovi, ogni giorno
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

        {/* ── Sotto lg: carosello orizzontale con peek (v. dc.html nota 08 —
            "4 contesti d'uso in swipe": le tile impilate valevano ~1.800px
            di scroll). Titolo/descrizione già sempre visibili, quindi il
            bordo :hover della griglia desktop (rimosso qui sotto) non
            nascondeva/rivelava nulla. ── */}
        <div className="lg:hidden">
          <Reveal delay={0.1}>
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mr-6 pr-6 md:-mr-12 md:pr-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {cards.map((card) => (
                <Tile key={card.id} card={card} tileCls="flex-none w-[78%] md:w-[calc(50%-6px)] snap-start" />
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Da lg: griglia invariata (bordo :hover incluso) ── */}
        <Reveal delay={0.1} className="hidden lg:block">
          <div className="grid grid-cols-4 gap-5">
            {cards.map((card) => (
              <Tile key={card.id} card={card} tileCls="target-tile" />
            ))}
          </div>
        </Reveal>

      </Container>
    </Section>
  )
}
