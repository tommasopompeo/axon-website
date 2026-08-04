import type { Metadata } from 'next'
import ProfessionistiContent from '@/components/professionisti/ProfessionistiContent'

export const metadata: Metadata = {
  title: 'Sei un professionista?',
  description:
    'Lavori con pazienti o clienti come fisioterapista, medico, personal trainer o altro professionista della salute e del movimento? Scopri come integrare Axon nella tua attività.',
  alternates: { canonical: '/professionisti' },
}

export default function ProfessionistiPage() {
  return <ProfessionistiContent />
}
