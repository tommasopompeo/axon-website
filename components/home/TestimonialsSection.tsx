import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import TestimonialCarousel from '@/components/home/TestimonialCarousel'

export default function TestimonialsSection() {
  return (
    <Section id="testimonianze" background="white">
      <Container>
        {/* ── Header ── */}
        <div className="flex flex-col gap-5 mb-10 lg:mb-12 max-w-[75ch]">
          <Reveal>
            <h2 className="text-display text-black" style={{ color: '#000000' }}>
              Chi lo indossa, lo racconta.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              style={{
                fontSize: 'var(--fs-lead)',
                color: 'var(--text-on-white-muted)',
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
