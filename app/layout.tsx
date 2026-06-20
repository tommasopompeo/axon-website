import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
    <html lang="it">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
