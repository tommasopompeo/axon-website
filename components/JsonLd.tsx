// Server component — nessun bundle JS client aggiunto.
// Inietta due script JSON-LD nella home: Organization + due Product.

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

const products = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'AXON KIT',
    description:
      'Dispositivo medico di Classe I. Kit completo con 1 dispositivo Axon Ø 30 mm, ' +
      '1 Axon Shell e scatola originale. Aiuta a migliorare equilibrio, forza ' +
      'e resistenza alla fatica con uso regolare. Non richiede batterie né contatto con la pelle.',
    brand: { '@type': 'Brand', name: 'Axon' },
    manufacturer: { '@type': 'Organization', name: 'Axon-Tech S.r.l.' },
    offers: {
      '@type': 'Offer',
      price: '230.00',
      priceCurrency: 'EUR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
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
      'cucibili su indumenti, calzature e accessori. Compatibili con il dispositivo Axon.',
    brand: { '@type': 'Brand', name: 'Axon' },
    manufacturer: { '@type': 'Organization', name: 'Axon-Tech S.r.l.' },
    offers: {
      '@type': 'Offer',
      price: '30.00',
      priceCurrency: 'EUR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: 'https://www.axon-tech.it/shop',
      seller: { '@type': 'Organization', name: 'Axon-Tech S.r.l.' },
    },
  },
]

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      {products.map((p) => (
        <script
          key={p.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }}
        />
      ))}
    </>
  )
}
