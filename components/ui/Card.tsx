import { ReactNode, CSSProperties } from 'react'

type CardVariant = 'surface' | 'white'

interface CardProps {
  children: ReactNode
  /** 'surface' (default) = dark --surface card. 'white' = white card for use-case/stat grids. */
  variant?: CardVariant
  /** Adds the shadow-elevate hover used on white use-case/stat cards. */
  hover?: boolean
  className?: string
  style?: CSSProperties
}

const variantStyle: Record<CardVariant, CSSProperties> = {
  surface: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
  },
  white: {
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
  },
}

/**
 * Card — shared boxed-content surface (form panels, contact boxes, use-case tiles).
 * Consolidates the repeated `background/border/border-radius` inline-style pattern
 * that recurred identically across Professionisti/Aziende/Contatti/Home.
 */
export default function Card({
  children,
  variant = 'surface',
  hover = false,
  className = '',
  style,
}: CardProps) {
  return (
    <div
      className={`${hover ? 'shadow-md transition-shadow duration-300 hover:shadow-lg' : ''} ${className}`}
      style={{
        borderRadius: 'var(--radius-lg)',
        ...variantStyle[variant],
        ...style,
      }}
    >
      {children}
    </div>
  )
}
