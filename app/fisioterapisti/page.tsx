import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'AXON per Fisioterapisti',
  description: 'Scopri come integrare la tecnologia passiva AXON nei trattamenti e percorsi riabilitativi.',
  alternates: { canonical: '/fisioterapisti' },
}

export default function FisioterapistiPage() {
  return (
    <Section>
      <Container>
        <div className="py-20 text-center max-w-[600px] mx-auto flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontSize: 'var(--fs-h2)' }}>
            Fisioterapisti
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Questa pagina è in fase di allestimento. Sarà dedicata alle partnership con fisioterapisti e specialisti della riabilitazione.
          </p>
        </div>
      </Container>
    </Section>
  )
}
