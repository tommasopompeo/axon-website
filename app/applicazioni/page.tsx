import type { Metadata } from 'next'
import Image from 'next/image'
import { Container, Section, Reveal } from '@/components/ui'
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
      <Section
        id="top"
        className="relative overflow-hidden z-0 min-h-[calc(100vh-80px)] flex items-center"
      >
        {/* ── Background Image ── */}
        <Image
          src="/hero_applicazioni.png"
          alt="Indossa AXON in ogni occasione"
          fill
          priority
          className="object-cover -z-10"
        />
        {/* Dark overlay to ensure white title readability */}
        <div className="absolute inset-0 bg-black/30 -z-10" aria-hidden="true" />

        <Container className="relative z-10">
          <div className="max-w-4xl flex flex-col gap-6 lg:gap-8 pt-12 lg:pt-20">
            {/* ── Title ── */}
            <Reveal trigger="mount" delay={0.1}>
              <h1
                className="font-bold text-white"
                style={{
                  fontSize: 'clamp(3.25rem, 7.0vw, 5.2rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.02em',
                }}
              >
                Indossa AXON in ogni occasione
              </h1>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Applicazioni Sticky Scroll Section ── */}
      <StickyScrollApplicazioni />

      {/* ── AXON Features Section ── */}
      <AxonFeaturesSection />

      {/* ── Wear Method Section ── */}
      <WearMethodSection />
    </>
  )
}

