import type { Metadata } from 'next'
import AziendeContent from '@/components/aziende/AziendeContent'

export const metadata: Metadata = {
  title: 'Axon per le aziende',
  description: 'Integra Axon nei tuoi prodotti e percorsi. Moda, sport, sanità, benessere.',
}

export default function AziendePage() {
  return <AziendeContent />
}
