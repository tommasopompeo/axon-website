import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  id?: string
  elevated?: boolean
  className?: string
}

export default function Section({ children, id, elevated = false, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        background: elevated ? 'var(--bg-elevated)' : undefined,
        paddingTop: 'var(--section-y)',
        paddingBottom: 'var(--section-y)',
      }}
    >
      {children}
    </section>
  )
}
