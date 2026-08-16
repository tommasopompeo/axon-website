import type { Metadata } from 'next'
import { Reveal, PageHero } from '@/components/ui'
import StickyScrollApplicazioni from '@/components/applicazioni/StickyScrollApplicazioni'
import AxonFeaturesSection from '@/components/applicazioni/AxonFeaturesSection'
import WearMethodSection from '@/components/applicazioni/WearMethodSection'

export const metadata: Metadata = {
  title: 'Applicazioni - AXON',
  description: 'Scopri tutti gli ambiti di applicazione dei dispositivi e gusci passivi AXON in ogni occasione.',
  alternates: { canonical: '/applicazioni' },
}

export default function ApplicazioniPage() {
  return (
    <>
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

      {/* ── Applicazioni Sticky Scroll Section ── */}
      <StickyScrollApplicazioni />

      {/* ── AXON Features Section ── */}
      <AxonFeaturesSection />

      {/* ── Wear Method Section ── */}
      <WearMethodSection />
    </>
  )
}

