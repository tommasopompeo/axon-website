import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin } from 'lucide-react'
import { SOCIAL } from '@/lib/links'
import { AUT_MIN_DATE } from '@/lib/legal'

// Le 5 pagine dell'header, nello stesso ordine, + Shop.
const navColonna = [
  { label: 'Applicazioni', href: '/applicazioni' },
  { label: 'Come funziona', href: '/come-funziona' },
  { label: 'Perchè AXON', href: '/perche-axon' },
  { label: 'Professionisti', href: '/professionisti' },
  { label: 'Aziende', href: '/aziende' },
  { label: 'Shop', href: '/shop' },
]

const legaleColonna = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Cookie', href: '/cookie' },
  { label: 'Termini', href: '/termini' },
]

const hasSocial = SOCIAL.instagram !== '#' || SOCIAL.tiktok !== '#' || SOCIAL.linkedin !== '#'

export default function Footer() {
  const anno = new Date().getFullYear()

  // Testo legale — reso in due punti del markup perché a lg+ vive in fondo al
  // blocco brand (per allinearsi a "Shop"), mentre sotto lg vive in fondo al
  // footer, dopo le colonne di link. `hidden`/`lg:hidden` fa sì che una sola
  // delle due istanze sia presente nel render tree (display:none la esclude
  // anche dall'albero di accessibilità), quindi resta un solo nodo per volta
  // esposto agli screen reader.
  // Dicitura standard per la pubblicità dei dispositivi medici (art. 26
  // D.lgs. 137/2022): stessa formula ripetuta nello Shop (punto vendita) e in
  // Termini §3. AUT_MIN_DATE (lib/legal.ts) è la fonte unica della data —
  // aggiornarla lì, non nei tre punti singolarmente.
  // 14px sotto lg (era 12px: la dicitura dispositivo medico va sempre letta
  // in chiaro, mai ridotta al minimo), 13px a tablet, invariata da lg (v.
  // "Home - Mobile & Tablet.dc.html" nota 11).
  const fineStampa = (
    <p className="text-[0.875rem] md:text-[0.8125rem] lg:text-xs link-subtle lg:max-w-md">
      AXON è un dispositivo medico CE. Leggere attentamente le avvertenze e le istruzioni
      per l&apos;uso. Aut. Min. del {AUT_MIN_DATE}.
      <br />© {anno} Axon-Tech S.r.l. — Via Verdi 73, 31100 Treviso (TV). P.IVA
      IT05577370264.
    </p>
  )

  return (
    <footer
      className="bg-black"
      style={{
        background: 'var(--bg-black)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="w-full max-w-container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-x-8">
          {/* Blocco brand — logo/tagline/social in alto, fine stampa legale in
              fondo (solo lg+: il blocco si stira all'altezza del cluster di
              colonne via items-stretch + justify-between, per far cadere
              l'ultima riga della fine stampa in linea con "Shop"). */}
          <div className="lg:flex lg:flex-col lg:justify-between">
            <div className="lg:max-w-xs">
              <Link href="/" aria-label="Axon — torna alla home">
                {/* logo-nav.png al posto di logo.svg (465KB, raster embedded)
                    — stessa motivazione del Header, v. commento lì. */}
                <Image
                  src="/logo-nav.png"
                  alt="Axon"
                  width={40}
                  height={40}
                  className="h-9 w-auto mb-4"
                />
              </Link>
              <p className="text-sm leading-relaxed link-muted">
                La forza invisibile che rivoluziona il movimento.
              </p>

              {/* Social — un'icona per profilo, resa solo quando lib/links.ts
                  riporta un URL reale (non '#'): quando un profilo va live,
                  impostare l'URL lì è sufficiente, nessuna modifica qui. */}
              {hasSocial && (
                <div className="mt-5 flex gap-3">
                  {SOCIAL.instagram !== '#' && (
                    <a
                      href={SOCIAL.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Axon su Instagram"
                      className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md link-subtle"
                    >
                      <Instagram size={18} aria-hidden="true" />
                    </a>
                  )}
                  {SOCIAL.tiktok !== '#' && (
                    <a
                      href={SOCIAL.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Axon su TikTok"
                      className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md link-subtle"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
                      </svg>
                    </a>
                  )}
                  {SOCIAL.linkedin !== '#' && (
                    <a
                      href={SOCIAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Axon su LinkedIn"
                      className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md link-subtle"
                    >
                      <Linkedin size={18} aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="hidden lg:block lg:mt-8">{fineStampa}</div>
          </div>

          {/* Cluster colonne link — Azienda / Navigazione / Informazioni
              Legali. Impilate solo sotto md; da md diventano una riga flex
              compatta e allineata a destra, come nel desktop (era da lg —
              v. dc.html nota 14), così il bordo destro di "Informazioni
              Legali" combacia con quello del container (stesso limite del
              resto del sito) già a partire dal tablet. */}
          <div className="flex flex-col gap-8 md:flex-row md:flex-shrink-0 md:gap-x-12">
            {/* Azienda */}
            <div>
              <h3
                className="mb-4 text-xs uppercase tracking-widest"
                style={{ color: 'var(--text-subtle)' }}
              >
                Azienda
              </h3>
              <ul className="space-y-2">
                {/* Ragione sociale: testo semplice, non un link — non ha una destinazione. */}
                <li className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Axon-Tech S.r.l.
                </li>
                <li>
                  <Link href="/contatti" className="text-sm link-muted">
                    Contatti
                  </Link>
                </li>
                <li>
                  <a href="mailto:info@axon-tech.it" className="text-sm link-muted">
                    info@axon-tech.it
                  </a>
                </li>
              </ul>
            </div>

            {/* Navigazione */}
            <div>
              <h3
                className="mb-4 text-xs uppercase tracking-widest"
                style={{ color: 'var(--text-subtle)' }}
              >
                Navigazione
              </h3>
              <ul className="space-y-2">
                {navColonna.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm link-muted">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Informazioni Legali */}
            <div>
              <h3
                className="mb-4 text-xs uppercase tracking-widest"
                style={{ color: 'var(--text-subtle)' }}
              >
                Informazioni Legali
              </h3>
              <ul className="space-y-2">
                {legaleColonna.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm link-muted">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Fine stampa legale — sotto lg: ultimo elemento del footer, dopo le colonne. */}
        <div className="mt-10 lg:hidden">{fineStampa}</div>
      </div>
    </footer>
  )
}
