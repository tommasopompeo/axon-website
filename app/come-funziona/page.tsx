import type { Metadata } from 'next'
import Image from 'next/image'
import { Container, Section, Reveal } from '@/components/ui'
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
      <Section
        id="top"
        className="relative overflow-hidden z-0 min-h-[calc(100vh-80px)] flex items-center"
      >
        {/* ── Background Image ── */}
        <Image
          src="/come_funziona_hero.png"
          alt="La tecnologia dietro AXON"
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
                La tecnologia dietro AXON
              </h1>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Video Section (CMO under-a-minute intro) ── */}
      <VideoSection />

      {/* ── Science Section (contesto scientifico su cui si basa AXON) ── */}
      <ScienceSection />

    </>
  )
}
