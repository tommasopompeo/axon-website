import type { Metadata } from 'next'
import ContattiContent from '@/components/contatti/ContattiContent'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Scrivi ad Axon-Tech S.r.l. per informazioni su AXON KIT, ordini, assistenza o collaborazioni B2B. Rispondiamo via email.',
  alternates: { canonical: '/contatti' },
}

export default function ContattiPage() {
  return <ContattiContent />
}
