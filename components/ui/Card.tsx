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
  // 'surface' base background/border live in the .card-surface CSS class
  // (globals.css) instead of inline style, so its :hover can override them —
  // an inline style value beats any stylesheet rule for the same property.
  surface: {},
  white: {
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
  },
}

const variantClassName: Record<CardVariant, string> = {
  surface: 'card-surface',
  white: '',
}

/**
 * Card — shared boxed-content surface (form panels, contact boxes, use-case tiles).
 * Consolidates the repeated `background/border/border-radius` inline-style pattern
 * that recurred identically across Professionisti/Aziende/Contatti/Home.
 * 'surface' cards get a hover state (border → --border-strong, bg → --surface-2,
 * no lift — see DESIGN.md §11); 'white' cards keep their own shadow-only hover
 * via the `hover` prop.
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
      className={`${variantClassName[variant]} ${hover ? 'shadow-md transition-shadow duration-300 hover:shadow-lg' : ''} ${className}`}
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
