import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'

export default function FinalCtaSection() {
  return (
    <Section id="cta">
      <Container>
        <div className="relative isolate overflow-hidden text-center">
          {/* Glow rosso di sfondo — radial-gradient sfocato, con parsimonia */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 'min(900px, 120%)',
              height: 'min(900px, 120%)',
              background:
                'radial-gradient(ellipse 50% 50% at 50% 50%, var(--brand-glow), transparent 70%)',
            }}
          />

          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 py-10 lg:py-16">
            <Reveal>
              <h2
                className="text-balance font-bold"
                style={{
                  fontSize: 'var(--fs-display)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                }}
              >
                Porta Axon nella tua giornata.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p
                className="text-pretty"
                style={{
                  fontSize: 'var(--fs-lead)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}
              >
                Un dispositivo medico passivo, discreto, che lavora con te. Inizia oggi.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
                <Button href="/shop" variant="primary" size="lg">
                  Acquista il Kit
                </Button>
                <Button href="/aziende" variant="secondary" size="lg">
                  Sei un’azienda?
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
