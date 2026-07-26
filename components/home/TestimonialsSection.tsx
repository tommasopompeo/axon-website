import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import TestimonialCarousel from '@/components/home/TestimonialCarousel'

export default function TestimonialsSection() {
  return (
    <Section id="testimonianze" className="bg-white" style={{ background: '#ffffff' }}>
      <Container>
        {/* ── Header ── */}
        <div className="flex flex-col gap-5 mb-10 lg:mb-12 max-w-2xl">
          <Reveal>
            <h2
              className="font-bold text-black"
              style={{
                fontSize: 'var(--fs-h2)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#000000',
              }}
            >
              Chi lo indossa, lo racconta.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              className="text-gray-600"
              style={{
                fontSize: 'var(--fs-lead)',
                color: '#4b5563',
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
