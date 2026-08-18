'use client'

// Error boundary di route (App Router): deve essere un Client Component.
// Stesso scaffold visivo di app/not-found.tsx (Section nera, H1 display, CTA).

import { useEffect } from 'react'
import { Container, Section, Reveal, Button } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Nessun servizio di error-reporting configurato: log in console per il debug.
    console.error(error)
  }, [error])

  return (
    <Section id="errore" background="black" className="min-h-[60vh] flex items-center">
      <Container>
        <div className="flex flex-col gap-5 max-w-3xl">
          <Reveal trigger="mount">
            <h1 className="text-display">Qualcosa è andato storto</h1>
          </Reveal>
          <Reveal trigger="mount" delay={0.1}>
            <p className="text-lead" style={{ color: 'var(--text-muted)' }}>
              Si è verificato un errore imprevisto. Riprova, oppure torna alla home.
            </p>
          </Reveal>
          <Reveal trigger="mount" delay={0.18} className="mt-2">
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="primary" size="lg" onClick={reset}>
                Riprova
              </Button>
              <Button href="/" variant="secondary" size="lg">
                Torna alla home
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
