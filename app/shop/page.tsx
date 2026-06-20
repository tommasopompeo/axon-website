import type { Metadata } from 'next'
import ShopContent from '@/components/shop/ShopContent'

export const metadata: Metadata = {
  title: 'Shop — Axon',
  description: 'Acquista AXON KIT e AXON SHELL™. Spedizione inclusa in Italia.',
}

export default function ShopPage() {
  return <ShopContent />
}
