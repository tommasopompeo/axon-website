import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import TestimonialCarousel from '@/components/home/TestimonialCarousel'

export default function TestimonialsSection() {
  return (
    <Section id="testimonianze" elevated>
      <Container>
        {/* ── Header ── */}
        <div className="flex flex-col gap-5 mb-12 lg:mb-16 max-w-2xl">
          <Reveal>
            <h2
              className="font-bold"
              style={{
                fontSize: 'var(--fs-h2)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Chi lo indossa, lo racconta.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              style={{
                fontSize: 'var(--fs-lead)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}
            >
              Esperienze reali con Axon, nella vita di tutti i giorni.
            </p>
          </Reveal>
        </div>

        {/* ── Carosello ── */}
        <Reveal delay={0.1}>
          <TestimonialCarousel />
        </Reveal>
      </Container>
    </Section>
  )
}
