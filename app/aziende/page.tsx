import type { Metadata } from 'next'
import AziendeContent from '@/components/aziende/AziendeContent'

export const metadata: Metadata = {
  title: 'Sei un azienda?',
  description:
    'Integra Axon nei tuoi prodotti, calzature o percorsi aziendali. Dalla moda alla sanità, dallo sport al benessere sul lavoro.',
  alternates: { canonical: '/aziende' },
}

export default function AziendePage() {
  return <AziendeContent />
}
