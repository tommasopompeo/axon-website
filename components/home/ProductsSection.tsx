'use client'

import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import ProductCard from '@/components/home/ProductCard'
import { SHOPIFY_KIT_URL, SHOPIFY_SHELL_URL } from '@/lib/links'

const products = [
  {
    images: [
      { src: '/kit-1.png', alt: 'Axon Kit — confezione e dispositivo Axon' },
      { src: '/kit-2.png', alt: "Axon Kit — dispositivo Axon e Axon Shell™" },
    ],
    title: 'AXON KIT',
    subtitle: 'Dispositivo medico · Ø 30 mm',
    includes: ['1 dispositivo Axon', '1 Axon Shell™', 'Scatola originale'],
    price: '€ 230,00',
    priceNote: 'IVA e spedizione incluse',
    href: SHOPIFY_KIT_URL,
  },
  {
    images: [
      { src: '/shell-1.png', alt: 'Axon Shell™ — gusci funzionali originali' },
      { src: '/shell-2.png', alt: 'Axon Shell™ — guscio cucibile su capo' },
    ],
    title: 'AXON SHELL™ — Kit da 5',
    subtitle: 'Gusci funzionali originali · cucibili · riciclabili',
    includes: ['5 gusci AXON SHELL™'],
    price: '€ 30,00',
    priceNote: 'IVA e spedizione incluse',
    href: SHOPIFY_SHELL_URL,
  },
]

export default function ProductsSection() {
  return (
    <Section id="prodotti">
      <Container>

        {/* ── Header ── */}
        <div className="flex flex-col gap-5 mb-12 lg:mb-16">
          <Reveal>
            <h2
              className="font-bold"
              style={{
                fontSize: 'var(--fs-h2)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Inizia con il Kit. Estendi con i gusci.
            </h2>
          </Reveal>
        </div>

        {/* ── Griglia prodotti ── */}
        <RevealGroup
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
          staggerDelay={0.1}
        >
          {products.map((p) => (
            <RevealItem key={p.title}>
              <ProductCard {...p} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ── Nota fascia ── */}
        <Reveal delay={0.16}>
          <p
            className="mt-8 text-center mx-auto"
            style={{
              fontSize: 'var(--fs-caption)',
              color: 'var(--text-subtle)',
              lineHeight: 1.55,
              maxWidth: '52ch',
            }}
          >
            Solo l&apos;Axon Shell™ originale garantisce le condizioni per cui
            Axon è stato progettato.
          </p>
        </Reveal>

      </Container>
    </Section>
  )
}
