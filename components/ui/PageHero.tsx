import Image from 'next/image'
import { preload } from 'react-dom'
import { ReactNode } from 'react'
import Container from './Container'
import Section from './Section'
import HeroFade from './HeroFade'

type PageHeroMedia =
  | { type: 'video'; src: string; poster?: string }
  | { type: 'image'; src: string; alt: string }

interface PageHeroProps {
  id?: string
  media: PageHeroMedia
  /** Darkening layer over the media, 0–1. Omit/0 = no overlay (e.g. home's bright video). */
  overlayOpacity?: number
  /** 'light' = white text on dark/overlaid media (default) · 'dark' = black text on bright media (home). */
  tone?: 'light' | 'dark'
  /** Eyebrow/title/subtitle stack — rendered inside the shared max-w-4xl gap-6 column. */
  children: ReactNode
  /** Optional CTA rendered as a sibling of the text column (matches home hero's below-fold button). */
  cta?: ReactNode
}

/**
 * PageHero — the full-viewport hero scaffold shared by Home, Applicazioni,
 * Come Funziona and Perché AXON: Section(min-h 100vh-header, flex-centered) →
 * background media (video or image, always -z-10) → optional dark overlay →
 * Container → max-w-4xl text column. Consolidates 4 near-identical copies.
 *
 * Whoop-style hero pinning (see DESIGN.md §11): the hero is `position: sticky`
 * (top var(--header-h), z-0) so it stays put while each page's content wrapper
 * (position relative + z-index above 0, opaque background — set per page) slides
 * over it on native scroll. The `<HeroFade>` overlay darkens the pinned hero
 * 0 → 0.85 across the first viewport of scroll (opacity-only, MotionValue —
 * no per-frame React state; see HeroFade.tsx). No spacer divs: the sticky
 * element keeps its own height in layout, so CLS stays 0.
 */
export default function PageHero({
  id = 'top',
  media,
  overlayOpacity = 0,
  tone = 'light',
  children,
  cta,
}: PageHeroProps) {
  // Il poster del video hero è l'elemento LCP della pagina, ma Chrome scarica
  // l'attributo `poster` a priorità bassa (non esiste fetchpriority sul
  // poster). Il preload high lo mette in cima alla coda, come già avviene per
  // le hero immagine via <Image priority>. Misurato su build di produzione
  // (Lighthouse mobile): LCP home 8.7s → vedi report per il valore post-fix.
  if (media.type === 'video' && media.poster) {
    preload(media.poster, { as: 'image', fetchPriority: 'high' })
  }

  return (
    <Section
      id={id}
      className="sticky top-[var(--header-h)] z-0 overflow-hidden min-h-[calc(100vh-var(--header-h))] flex items-center"
    >
      {media.type === 'video' ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={media.poster}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src={media.src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
      )}

      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 -z-10"
          style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
          aria-hidden="true"
        />
      )}

      <Container className="relative z-10">
        <div
          className="max-w-4xl flex flex-col gap-6 lg:gap-8 pt-12 lg:pt-20"
          style={{ color: tone === 'dark' ? '#0a0a0b' : '#ffffff' }}
        >
          {children}
        </div>
        {cta}
      </Container>

      {/* Scroll-linked fade to black — sits above the hero content (z-20) but
          pointer-events:none so the CTA/text stay interactive until the page
          content wrapper physically covers them (see HeroFade.tsx). */}
      <HeroFade />
    </Section>
  )
}
