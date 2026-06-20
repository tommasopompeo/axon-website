import { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  accent?: boolean
  className?: string
}

export default function Eyebrow({ children, accent = false, className = '' }: EyebrowProps) {
  return (
    <p
      className={`inline-flex items-center rounded-pill border px-3 py-1 font-semibold uppercase tracking-[0.10em] ${className}`}
      style={{
        fontSize: 'var(--fs-eyebrow)',
        color: accent ? 'var(--brand)' : 'var(--text-subtle)',
        borderColor: accent ? 'rgba(219,24,27,0.30)' : 'var(--border)',
        background: accent ? 'var(--brand-soft)' : 'transparent',
      }}
    >
      {children}
    </p>
  )
}
