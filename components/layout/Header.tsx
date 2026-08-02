'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Applicazioni', href: '/applicazioni' },
  { label: 'Come funziona', href: '/come-funziona' },
  { label: 'Perchè AXON', href: '/perche-axon' },
  { label: 'Fisioterapisti', href: '/fisioterapisti' },
  { label: 'Aziende', href: '/aziende' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

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
        className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex h-16 items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" aria-label="Axon — torna alla home" className="flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="Axon"
            width={144}
            height={48}
            priority
            className="h-10 md:h-12 w-auto"
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
              className="text-base font-medium transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <Link
          href="/shop"
          className="hidden md:inline-flex bg-brand text-white font-medium px-5 py-2 rounded-full hover:bg-brand-hover transition-colors text-sm items-center justify-center min-h-[38px]"
        >
          Acquista AXON
        </Link>

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

      {/* Menu mobile */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t"
          style={{
            background: 'var(--bg-elevated)',
            borderColor: 'var(--border)',
          }}
        >
          <nav
            aria-label="Menu mobile"
            className="flex flex-col"
            style={{
              paddingLeft: 'var(--gutter)',
              paddingRight: 'var(--gutter)',
              paddingTop: '1rem',
              paddingBottom: '1.5rem',
            }}
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="py-3 text-base font-medium border-b last:border-0 transition-colors"
                style={{
                  color: 'var(--text-muted)',
                  borderColor: 'var(--border)',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-full text-base font-medium text-white bg-brand hover:bg-brand-hover transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Acquista AXON
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
