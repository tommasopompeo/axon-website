import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { OrganizationJsonLd } from '@/components/JsonLd'

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
})

const defaultTitle = 'Axon - Etichetta per il benessere del corpo'
const defaultDescription =
  "Axon è un'etichetta innovativa che migliora il benessere del corpo in qualunque contesto e attività, dallo sport, al lavoro e la quotidianità. Può essere applicata in qualsiasi indumento e non sta a contatto con la pelle."

export const metadata: Metadata = {
  metadataBase: new URL('https://www.axon-tech.it'),
  title: {
    default: defaultTitle,
    template: '%s | Axon',
  },
  description: defaultDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Axon',
    locale: 'it_IT',
    url: 'https://www.axon-tech.it',
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={urbanist.variable}>
      <body className={urbanist.className}>
        {/* Skip link — primo elemento focalizzabile della pagina (WCAG 2.4.1);
            visibile solo al focus da tastiera, stile .skip-link in globals.css. */}
        <a href="#contenuto-principale" className="skip-link">
          Salta al contenuto principale
        </a>
        <OrganizationJsonLd />
        <Header />
        <main id="contenuto-principale">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
