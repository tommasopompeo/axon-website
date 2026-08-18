import type { Metadata } from 'next'
import { Reveal, PageHero } from '@/components/ui'
import StickyScrollApplicazioni from '@/components/applicazioni/StickyScrollApplicazioni'
import AxonFeaturesSection from '@/components/applicazioni/AxonFeaturesSection'
import WearMethodSection from '@/components/applicazioni/WearMethodSection'

const description =
  'Scopri tutti gli ambiti di applicazione dei dispositivi e gusci passivi AXON in ogni occasione.'

export const metadata: Metadata = {
  // Solo il nome pagina: il template '%s | Axon' del layout aggiunge il brand.
  title: 'Applicazioni',
  description,
  alternates: { canonical: '/applicazioni' },
  openGraph: { title: 'Applicazioni', description, url: '/applicazioni' },
}

export default function ApplicazioniPage() {
  return (
    <>
      {/* Static outer wrapper — REQUIRED for hero pinning: Next.js's router
          skips position:sticky elements when scrolling on navigation, so the
          page's first DOM node must be a plain static element or the router
          scrolls past the hero. See app/page.tsx + DESIGN.md §11. */}
      <div>
        {/* ── Hero Section ── */}
        <PageHero
          media={{ type: 'image', src: '/hero_applicazioni.jpg', alt: 'Indossa AXON in ogni occasione' }}
          overlayOpacity={0.3}
        >
          <Reveal trigger="mount" delay={0.1}>
            <h1 className="text-display text-white">
              Indossa AXON in ogni occasione
            </h1>
          </Reveal>
        </PageHero>

        {/* Content wrapper — opaque bg + z above the sticky hero so it slides
            over and covers the pinned hero (Whoop-style pinning, DESIGN.md §11).
            position:relative here does not disturb the nested sticky scroll
            section below (sticky is scoped to the viewport, not this wrapper). */}
        <div className="relative z-10" style={{ background: 'var(--bg)' }}>
          {/* ── Applicazioni Sticky Scroll Section ── */}
          <StickyScrollApplicazioni />

          {/* ── AXON Features Section ── */}
          <AxonFeaturesSection />

          {/* ── Wear Method Section ── */}
          <WearMethodSection />
        </div>
      </div>
    </>
  )
}

