import type { Metadata } from 'next'
import ShopContent from '@/components/shop/ShopContent'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Acquista AXON KIT e AXON SHELL. Dispositivo medico di Classe I. Spedizione inclusa in Italia. Garanzia 2 anni.',
  alternates: { canonical: '/shop' },
}

export default function ShopPage() {
  return <ShopContent />
}
