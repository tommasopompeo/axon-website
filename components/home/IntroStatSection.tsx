'use client'

import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

export default function IntroStatSection() {
  return (
    <Section id="come-funziona" elevated>
      <Container>
        <div className="flex flex-col gap-12 lg:gap-16">

          {/* ── Header ── */}
          <div className="flex flex-col gap-5 max-w-[52ch]">
            <Reveal>
              <h2
                className="font-bold"
                style={{
                  fontSize: 'var(--fs-h2)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Silenzioso. Passivo. Continuo.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p
                style={{
                  fontSize: 'var(--fs-lead)',
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                }}
              >
                Axon non emette energia e non rilascia sostanze. Una componente nanostrutturata
                trasforma i tuoi micro-movimenti quotidiani in micro-vibrazioni impercettibili che
                aiutano il corpo a ricalibrare il proprio equilibrio neuro-muscolare. Tu indossi i
                tuoi capi di sempre: Axon lavora da solo.
              </p>
            </Reveal>
          </div>

        </div>
      </Container>
    </Section>
  )
}
