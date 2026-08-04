import type { Metadata } from 'next'
import Image from 'next/image'
import { Container, Section, Reveal } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Perché AXON - AXON',
  description: 'I risultati dello studio pilota e i benefici dei dispositivi e gusci passivi AXON per il benessere quotidiano, lo sport e la riabilitazione.',
  alternates: { canonical: '/perche-axon' },
}

export default function PercheAxonPage() {
  return (
    <>
      {/* ── Hero Section ── */}
      <Section
        id="top"
        className="relative overflow-hidden z-0 min-h-[calc(100vh-80px)] flex items-center"
      >
        {/* ── Background Image ── */}
        <Image
          src="/hero_perche_axon.png"
          alt="I risultati parlano chiaro"
          fill
          priority
          className="object-cover -z-10"
        />
        {/* Dark overlay to ensure readability */}
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
                I risultati parlano chiaro
              </h1>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
