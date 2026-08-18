import type { Metadata } from 'next'
import AziendeContent from '@/components/aziende/AziendeContent'

const description =
  'Integra Axon nei tuoi prodotti, calzature o percorsi aziendali. Dalla moda alla sanità, dallo sport al benessere sul lavoro.'

export const metadata: Metadata = {
  title: 'Sei un azienda?',
  description,
  alternates: { canonical: '/aziende' },
  openGraph: { title: 'Sei un azienda?', description, url: '/aziende' },
}

export default function AziendePage() {
  return <AziendeContent />
}
