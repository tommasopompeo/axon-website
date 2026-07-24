import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Perchè AXON',
  description: 'I benefici dei dispositivi AXON per il benessere quotidiano, lo sport e il lavoro.',
  alternates: { canonical: '/perche-axon' },
}

export default function PercheAxonPage() {
  return (
    <Section>
      <Container>
        <div className="py-20 text-center max-w-[600px] mx-auto flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontSize: 'var(--fs-h2)' }}>
            Perchè AXON
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Questa pagina è in fase di allestimento. Qui troverai tutti i benefici legati al miglioramento di equilibrio, stabilità e recupero muscolare.
          </p>
        </div>
      </Container>
    </Section>
  )
}
