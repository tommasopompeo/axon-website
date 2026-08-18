import type { Metadata } from 'next'
import ProfessionistiContent from '@/components/professionisti/ProfessionistiContent'

const description =
  'Lavori con pazienti o clienti come fisioterapista, medico, personal trainer o altro professionista della salute e del movimento? Scopri come integrare Axon nella tua attività.'

export const metadata: Metadata = {
  title: 'Sei un professionista?',
  description,
  alternates: { canonical: '/professionisti' },
  openGraph: { title: 'Sei un professionista?', description, url: '/professionisti' },
}

export default function ProfessionistiPage() {
  return <ProfessionistiContent />
}
