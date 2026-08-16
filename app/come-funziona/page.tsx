import type { Metadata } from 'next'
import { Reveal, PageHero } from '@/components/ui'
import VideoSection from '@/components/come-funziona/VideoSection'
import ScienceSection from '@/components/come-funziona/ScienceSection'

export const metadata: Metadata = {
  title: 'Come funziona - AXON',
  description:
    'Scopri la tecnologia e le basi scientifiche dei dispositivi e dei gusci passivi AXON: meccanotrasduzione, canali Piezo, vibrazioni terapeutiche e nanomateriali.',
  alternates: { canonical: '/come-funziona' },
}

export default function ComeFunzionaPage() {
  return (
    <>
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

      {/* ── Video Section (CMO under-a-minute intro) ── */}
      <VideoSection />

      {/* ── Science Section (contesto scientifico su cui si basa AXON) ── */}
      <ScienceSection />

    </>
  )
}
