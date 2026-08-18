import type { Metadata } from 'next'
import { Container, Section, Reveal, Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Pagina non trovata',
  description: 'La pagina che cerchi non esiste o è stata spostata.',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <Section id="not-found" background="black" className="min-h-[60vh] flex items-center">
      <Container>
        <div className="flex flex-col gap-5 max-w-3xl">
          <Reveal trigger="mount">
            <p
              className="font-bold"
              style={{ fontSize: 'var(--fs-h3)', color: 'var(--brand)' }}
            >
              404
            </p>
          </Reveal>
          <Reveal trigger="mount" delay={0.08}>
            <h1 className="text-display">Pagina non trovata</h1>
          </Reveal>
          <Reveal trigger="mount" delay={0.16}>
            <p className="text-lead" style={{ color: 'var(--text-muted)' }}>
              La pagina che cerchi non esiste o è stata spostata.
            </p>
          </Reveal>
          <Reveal trigger="mount" delay={0.22} className="mt-2">
            <div className="flex flex-wrap gap-3">
              <Button href="/" variant="primary" size="lg">
                Torna alla home
              </Button>
              <Button href="/shop" variant="secondary" size="lg">
                Vai allo Shop
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
