import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin } from 'lucide-react'
import { SOCIAL } from '@/lib/links'

const navColonna = [
  { label: 'Come funziona', href: '/#come-funziona' },
  { label: 'Testimonianze', href: '/#testimonianze' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Shop', href: '/shop' },
  { label: 'Aziende', href: '/aziende' },
  { label: 'Contatti', href: '/contatti' },
]

const prodottoColonna = [
  { label: 'AXON KIT', href: '/shop' },
  { label: 'AXON SHELL™', href: '/shop' },
  { label: 'Come si usa', href: '/#come-fatto' },
  { label: 'FAQ', href: '/#faq' },
]

const aziendalColonna = [
  { label: 'Axon-Tech S.r.l.', href: '#' },
  { label: 'Contatti', href: '/contatti' },
  { label: 'info@axon-tech.it', href: 'mailto:info@axon-tech.it' },
]

export default function Footer() {
  const anno = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        className="mx-auto py-16 md:py-20"
        style={{
          maxWidth: 'var(--container)',
          paddingLeft: 'var(--gutter)',
          paddingRight: 'var(--gutter)',
        }}
      >
        {/* Griglia principale */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Colonna brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Axon — torna alla home">
              <Image
                src="/logo.svg"
                alt="Axon"
                width={40}
                height={40}
                className="h-9 w-auto mb-4"
              />
            </Link>
            <p className="text-sm leading-relaxed link-muted">
              La forza invisibile che rivoluziona il movimento.
            </p>

            {/* Social */}
            <div className="mt-5 flex gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Axon su Instagram"
                className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md link-subtle"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
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
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Axon su LinkedIn"
                className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md link-subtle"
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigazione */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
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

          {/* Prodotto */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--text-subtle)' }}
            >
              Prodotto
            </h3>
            <ul className="space-y-2">
              {prodottoColonna.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm link-muted">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Azienda */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--text-subtle)' }}
            >
              Azienda
            </h3>
            <ul className="space-y-2">
              {aziendalColonna.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm link-muted">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Riga legale */}
        <div
          className="mt-12 pt-8 border-t flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-xs link-subtle">
            Axon è un dispositivo medico di Classe I. Leggere le istruzioni per l&apos;uso.
            <br />
            © {anno} Axon-Tech S.r.l. — Via Verdi 73, 31100 Treviso (TV). P.IVA [placeholder].
          </p>
          <div className="flex gap-5">
            {(['Privacy', 'Cookie', 'Termini'] as const).map(label => (
              <a key={label} href="#" className="text-xs link-subtle">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
