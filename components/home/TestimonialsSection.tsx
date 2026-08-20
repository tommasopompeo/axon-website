import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import TestimonialCarousel from '@/components/home/TestimonialCarousel'

export default function TestimonialsSection() {
  return (
    <Section id="testimonianze" background="white">
      <Container>
        {/* ── Header — gap/margin per fascia dal prototipo (14px/26px sotto
            lg, invariati 20px/48px da lg). ── */}
        <div className="flex flex-col gap-3.5 lg:gap-5 mb-[26px] lg:mb-12 max-w-[75ch]">
          <Reveal>
            <h2 className="text-display text-black text-[2.375rem] md:text-[3.5rem] lg:[font-size:clamp(3.25rem,7vw,5.2rem)]" style={{ color: '#000000' }}>
              Chi lo indossa, lo racconta
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
