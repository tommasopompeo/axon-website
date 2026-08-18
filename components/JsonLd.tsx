// Server components — nessun bundle JS client aggiunto.
// Tre blocchi JSON-LD distinti, montati dove servono:
//   OrganizationJsonLd → app/layout.tsx (site-wide)
//   ProductsJsonLd     → app/shop/page.tsx (Product + Offer sul punto vendita)
//   FaqJsonLd          → app/page.tsx (FAQPage, generato da lib/faqs.ts)

import { faqs } from '@/lib/faqs'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Axon-Tech S.r.l.',
  url: 'https://www.axon-tech.it',
  logo: 'https://www.axon-tech.it/logo.svg',
  taxID: 'IT05577370264',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Verdi 73',
    addressLocality: 'Treviso',
    addressRegion: 'TV',
    postalCode: '31100',
    addressCountry: 'IT',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@axon-tech.it',
    contactType: 'customer service',
    availableLanguage: 'Italian',
  },
}

// Product + Offer: prezzo/valuta reali da knowledge/product.md; nessun campo
// review/rating inventato. `availability: PreOrder` finché i pulsanti Acquista
// sono disabilitati ("Presto disponibile", SHOPIFY_*_URL === '#' in
// lib/links.ts) — passare a https://schema.org/InStock quando il checkout
// Shopify va live. La natura di dispositivo medico è dichiarata in
// description e category, senza claim oltre quelli ammessi.
const products = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'AXON KIT',
    description:
      'Dispositivo medico di Classe I, passivo e non invasivo. Kit completo con 1 dispositivo Axon Ø 30 mm, ' +
      '1 Axon Shell e scatola originale. Con uso regolare aiuta a migliorare equilibrio, forza ' +
      'e resistenza alla fatica. Non richiede batterie né contatto con la pelle.',
    category: 'Dispositivo medico di Classe I',
    brand: { '@type': 'Brand', name: 'Axon' },
    manufacturer: { '@type': 'Organization', name: 'Axon-Tech S.r.l.' },
    offers: {
      '@type': 'Offer',
      price: '230.00',
      priceCurrency: 'EUR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/PreOrder',
      url: 'https://www.axon-tech.it/shop',
      seller: { '@type': 'Organization', name: 'Axon-Tech S.r.l.' },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'AXON SHELL — Kit da 5',
    description:
      '5 gusci funzionali originali AXON SHELL. Materiale tecnologico riciclabile, ' +
      'cucibili su indumenti, calzature e accessori. Compatibili con il dispositivo medico Axon.',
    category: 'Accessorio per dispositivo medico',
    brand: { '@type': 'Brand', name: 'Axon' },
    manufacturer: { '@type': 'Organization', name: 'Axon-Tech S.r.l.' },
    offers: {
      '@type': 'Offer',
      price: '30.00',
      priceCurrency: 'EUR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/PreOrder',
      url: 'https://www.axon-tech.it/shop',
      seller: { '@type': 'Organization', name: 'Axon-Tech S.r.l.' },
    },
  },
]

// FAQPage dalla stessa sorgente delle FAQ renderizzate (lib/faqs.ts):
// zero drift possibile tra markup visibile e structured data.
const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return <Script data={organization} />
}

export function ProductsJsonLd() {
  return (
    <>
      {products.map((p) => (
        <Script key={p.name} data={p} />
      ))}
    </>
  )
}

export function FaqJsonLd() {
  return <Script data={faqPage} />
}
