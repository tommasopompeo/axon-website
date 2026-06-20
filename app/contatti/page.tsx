import type { Metadata } from 'next'
import ContattiContent from '@/components/contatti/ContattiContent'

export const metadata: Metadata = {
  title: 'Contatti — Axon',
  description: 'Domande su Axon, ordini o assistenza? Scrivici.',
}

export default function ContattiPage() {
  return <ContattiContent />
}
