import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Come funziona',
  description: 'Scopri la tecnologia e il funzionamento dei dispositivi e dei gusci passivi AXON.',
  alternates: { canonical: '/come-funziona' },
}

export default function ComeFunzionaPage() {
  return (
    <Section>
      <Container>
        <div className="py-20 text-center max-w-[600px] mx-auto flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontSize: 'var(--fs-h2)' }}>
            Come funziona
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Questa pagina è in fase di allestimento. Presto potrai approfondire la scienza e la tecnologia dietro le micro-stimolazioni vibrazionali passive di AXON.
          </p>
        </div>
      </Container>
    </Section>
  )
}
