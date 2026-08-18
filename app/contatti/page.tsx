import type { Metadata } from 'next'
import ContattiContent from '@/components/contatti/ContattiContent'

const description =
  'Scrivi ad Axon-Tech S.r.l. per informazioni su AXON KIT, ordini, assistenza o collaborazioni B2B. Rispondiamo via email.'

export const metadata: Metadata = {
  title: 'Contatti',
  description,
  alternates: { canonical: '/contatti' },
  openGraph: { title: 'Contatti', description, url: '/contatti' },
}

export default function ContattiPage() {
  return <ContattiContent />
}
