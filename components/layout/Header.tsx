'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui'

const navLinks = [
  { label: 'Applicazioni', href: '/applicazioni' },
  { label: 'Come funziona', href: '/come-funziona' },
  { label: 'Perchè AXON', href: '/perche-axon' },
  { label: 'Professionisti', href: '/professionisti' },
  { label: 'Aziende', href: '/aziende' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!menuOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'var(--header-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'var(--border)',
      }}
    >
      <div
        className="w-full max-w-container mx-auto px-6 md:px-12 lg:px-16 flex h-16 items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" aria-label="Axon — torna alla home" className="flex-shrink-0">
          {/* logo-nav.png (144px, 6.5KB) al posto di logo.svg: l'SVG incorpora
              raster base64 e pesa 465KB — caricato con priority su ogni pagina
              contendeva banda all'elemento LCP (misurato con Lighthouse).
              logo.svg resta in /public per JSON-LD/branding. */}
          <Image
            src="/logo-nav.png"
            alt="Axon"
            width={48}
            height={48}
            priority
            className="h-auto w-auto max-h-10 md:max-h-12"
          />
        </Link>

        {/* Nav desktop */}
        <nav
          aria-label="Navigazione principale"
          className="hidden md:flex items-center gap-10 lg:gap-12"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              className="nav-link nav-link--desktop text-base font-medium"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop — below Button's 44px btn-base min-height by design (38px); see DESIGN.md §5 */}
        <Button
          href="/shop"
          size="custom"
          className="hidden md:inline-flex px-5 py-2 text-sm font-medium min-h-[38px]"
        >
          Acquista AXON
        </Button>

        {/* Hamburger mobile */}
        <button
          className="md:hidden inline-flex items-center justify-center min-h-11 min-w-11 -mr-2 rounded-md"
          style={{ color: 'var(--text)' }}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile — righe 56px (era ~48px via solo padding) e ingresso
          con transizione invece di comparire di colpo, più lo spazio di
          sicurezza in fondo per l'home indicator iOS (v. dc.html nota 05:
          "Header non ricostruito" — restano stessi link/CTA, tocca solo
          altezza righe/animazione/safe-area). */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t mobile-menu-panel"
          style={{
            background: 'var(--bg-elevated)',
            borderColor: 'var(--border)',
          }}
        >
          <nav
            aria-label="Menu mobile"
            className="flex flex-col px-6"
            style={{
              paddingTop: '0.5rem',
              paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
            }}
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className="nav-link nav-link--mobile flex items-center min-h-14 text-base font-medium border-b last:border-0"
                style={{ borderColor: 'var(--border)' }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Button
              href="/shop"
              size="custom"
              className="mt-4 px-5 py-3 text-base font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Acquista AXON
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
