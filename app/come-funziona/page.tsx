import type { Metadata } from 'next'
import { Reveal, PageHero } from '@/components/ui'
import VideoSection from '@/components/come-funziona/VideoSection'
import ScienceSection from '@/components/come-funziona/ScienceSection'

const description =
  'Scopri la tecnologia e le basi scientifiche dei dispositivi e dei gusci passivi AXON: meccanotrasduzione, canali Piezo, vibrazioni terapeutiche e nanomateriali.'

export const metadata: Metadata = {
  // Solo il nome pagina: il template '%s | Axon' del layout aggiunge il brand.
  title: 'Come funziona',
  description,
  alternates: { canonical: '/come-funziona' },
  openGraph: { title: 'Come funziona', description, url: '/come-funziona' },
}

export default function ComeFunzionaPage() {
  return (
    <>
      {/* Static outer wrapper — REQUIRED for hero pinning: Next.js's router
          skips position:sticky elements when scrolling on navigation, so the
          page's first DOM node must be a plain static element or the router
          scrolls past the hero. See app/page.tsx + DESIGN.md §11. */}
      <div>
        {/* ── Hero Section ── */}
        <PageHero
          media={{ type: 'image', src: '/come_funziona_hero.jpg', alt: 'La tecnologia dietro AXON' }}
          overlayOpacity={0.3}
        >
          <Reveal trigger="mount" delay={0.1}>
            <h1 className="text-display text-white">
              La tecnologia dietro AXON
            </h1>
          </Reveal>
        </PageHero>

        {/* Content wrapper — opaque bg + z above the sticky hero so it slides
            over and covers the pinned hero (Whoop-style pinning, DESIGN.md §11). */}
        <div className="relative z-10" style={{ background: 'var(--bg)' }}>
          {/* ── Video Section (CMO under-a-minute intro) ── */}
          <VideoSection />

          {/* ── Science Section (contesto scientifico su cui si basa AXON) ── */}
          <ScienceSection />
        </div>
      </div>
    </>
  )
}
