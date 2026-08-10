import Link from 'next/link'
import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'white'
type Size = 'sm' | 'md' | 'lg'

const sizeClsBase: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

// Ghost: no horizontal padding — testo + freccia inline
const sizeClsGhost: Record<Size, string> = {
  sm: 'py-1.5 text-sm',
  md: 'py-3 text-sm',
  lg: 'py-4 text-base',
}

// Classi statiche (non interpolate) così Tailwind le rileva sempre in scansione contenuti.
const variantCls: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  white: 'btn-white',
}

type ButtonAsLink = {
  href: string
  target?: '_blank' | '_self'
  type?: never
  disabled?: never
}

type ButtonAsButton = {
  href?: never
  target?: never
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

type ButtonProps = (ButtonAsLink | ButtonAsButton) & {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  target,
  type = 'button',
  disabled,
  className = '',
}: ButtonProps) {
  const sizeClass = variant === 'ghost' ? sizeClsGhost[size] : sizeClsBase[size]
  const cls = `btn-base ${variantCls[variant]} ${sizeClass} ${className}`
  const showArrow = variant === 'ghost'

  if (href) {
    const rel = target === '_blank' ? 'noopener noreferrer' : undefined
    return (
      <Link href={href} target={target} rel={rel} className={cls}>
        {children}
        {showArrow && <ArrowRight size={16} aria-hidden="true" />}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled} className={cls}>
      {children}
      {showArrow && <ArrowRight size={16} aria-hidden="true" />}
    </button>
  )
}
