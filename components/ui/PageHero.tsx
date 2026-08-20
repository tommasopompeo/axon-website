import Image from 'next/image'
import { preload } from 'react-dom'
import { ReactNode } from 'react'
import Container from './Container'
import Section from './Section'
import HeroFade from './HeroFade'

type PageHeroMedia =
  | { type: 'video'; src: string; poster?: string }
  | { type: 'image'; src: string; alt: string }
  /** No full-bleed background media at all — the Section's own `background`
   *  (see `background` prop below) shows through instead. Used by Home, whose
   *  hero background is a flat white, not a full-viewport video (see `decor`). */
  | { type: 'none' }

type PageHeroBackground = 'default' | 'elevated' | 'black' | 'white'

interface PageHeroProps {
  id?: string
  media: PageHeroMedia
  /** Darkening layer over the media, 0–1. Omit/0 = no overlay (e.g. home's bright video). */
  overlayOpacity?: number
  /** 'light' = white text on dark/overlaid media (default) · 'dark' = black text on bright media (home). */
  tone?: 'light' | 'dark'
  /** Forwarded to the underlying `Section` — only relevant when `media.type === 'none'`,
   *  where there's no image/video to supply the visual backdrop. Default 'default'
   *  (transparent) matches every existing video/image hero, unaffected by this prop. */
  background?: PageHeroBackground
  /** Eyebrow/title/subtitle stack — rendered inside the shared max-w-4xl gap-6 column. */
  children: ReactNode
  /** Optional decorative element rendered in-flow as a sibling column next to the
   *  text (flex row from `lg`, e.g. Home's rotating AXON disc). Laid out with
   *  `flex`/`justify-between` — never absolutely positioned — so the text column
   *  simply narrows/wraps to make room instead of ever overlapping it, at any
   *  viewport width. Visibility/sizing at each breakpoint is the caller's own
   *  className on this node (e.g. `hidden lg:flex`). */
  decor?: ReactNode
  /** Optional CTA rendered as a sibling of the text column (matches home hero's below-fold button). */
  cta?: ReactNode
}

/**
 * PageHero — the full-viewport hero scaffold shared by Home, Applicazioni,
 * Come Funziona and Perché AXON: Section(min-h 100vh-header, flex-centered) →
 * background media (video, image, or none — always -z-10 when present) →
 * optional dark overlay → Container → flex row of max-w-4xl text column +
 * optional `decor` sibling. Consolidates 4 near-identical copies.
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
  background = 'default',
  children,
  decor,
  cta,
}: PageHeroProps) {
  // Quando la hero è un video con poster, quel poster è l'elemento LCP della
  // pagina, ma Chrome lo scarica a priorità bassa (non esiste fetchpriority
  // sul `poster` HTML). Il preload high lo mette in cima alla coda, come già
  // avviene per le hero immagine via <Image priority>. Nessuna delle 4 hero
  // attuali passa più di qui (Home è passata a `media.type:'none'` il
  // 2026-08-18, le altre 3 sono sempre state `media.type:'image'`) — il ramo
  // resta per una futura hero video con poster. Vedi DESIGN.md §15.
  if (media.type === 'video' && media.poster) {
    preload(media.poster, { as: 'image', fetchPriority: 'high' })
  }

  return (
    <Section
      id={id}
      background={background}
      // Pin (position:sticky) solo da md: sotto 768 la hero scorre in
      // normal flow — niente Whoop-style pinning su schermi stretti, dove il
      // contenuto che scivola sopra una hero fissa costa più altezza di
      // scroll di quanta ne guadagni in effetto (v. dc.html Applicazioni e
      // Perché AXON, entrambi con --heroPos: static sotto 768 / sticky da
      // 834). `relative` resta sempre presente (anche sotto md, dove sticky
      // non c'è) perché è il containing block dei figli `fill`/`absolute`
      // (Image, overlay, HeroFade) — altrimenti si posizionerebbero rispetto
      // al primo antenato posizionato più in alto nell'albero.
      className="relative md:sticky md:top-[var(--header-h)] z-0 overflow-hidden min-h-[calc(100vh-var(--header-h))] flex items-center"
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
      ) : media.type === 'image' ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
      ) : null}

      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 -z-10"
          style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
          aria-hidden="true"
        />
      )}

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">
          <div
            className="max-w-4xl flex flex-col gap-6 lg:gap-8 pt-12 lg:pt-20"
            style={{ color: tone === 'dark' ? '#0a0a0b' : '#ffffff' }}
          >
            {children}
          </div>
          {decor}
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
