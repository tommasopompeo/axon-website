import type { Metadata } from 'next'
import ShopContent from '@/components/shop/ShopContent'
import { ProductsJsonLd } from '@/components/JsonLd'

const description =
  'Acquista AXON KIT e AXON SHELL. Dispositivo medico di Classe I. Spedizione inclusa in Italia. Garanzia 2 anni.'

export const metadata: Metadata = {
  title: 'Shop',
  description,
  alternates: { canonical: '/shop' },
  openGraph: { title: 'Shop', description, url: '/shop' },
}

export default function ShopPage() {
  return (
    <>
      <ProductsJsonLd />
      <ShopContent />
    </>
  )
}
