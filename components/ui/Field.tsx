'use client'

import { forwardRef, useLayoutEffect, useRef, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'

const inputBase: React.CSSProperties = {
  background: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text)',
  fontSize: 'var(--fs-body)',
  lineHeight: 1.5,
  width: '100%',
  padding: '0.625rem 0.875rem',
  colorScheme: 'dark',
}

// Altezza minima dei campi — 48px sotto lg (ideale Material 48dp), 44px
// invariato da lg. --fs-body (17px) è già oltre la soglia di 16px che fa
// zoomare iOS Safari: confermato, non toccato (v. "Aziende - Mobile &
// Tablet.dc.html" nota 06). Via className (non inputBase) perché lo style
// inline vince sempre sulle classi responsive.
const inputHeightCls = 'min-h-12 lg:min-h-11'

export function FieldGroup({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      {children}
    </div>
  )
}

export function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: ReactNode
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        fontSize: 'var(--fs-body)',
        color: 'var(--text)',
        fontWeight: 500,
        display: 'block',
      }}
    >
      {children}
      {required && (
        <span aria-hidden="true" style={{ color: 'var(--brand)', marginLeft: '0.2rem' }}>
          *
        </span>
      )}
    </label>
  )
}

export function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" style={{ fontSize: 'var(--fs-caption)', color: 'var(--brand)' }}>
      {children}
    </p>
  )
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ style, className = '', ...props }, ref) => (
    <input ref={ref} className={`${inputHeightCls} ${className}`} style={{ ...inputBase, ...style }} {...props} />
  ),
)
Input.displayName = 'Input'

// Autogrow: `field-sizing: content` dove supportato (Baseline 2026); altrove un
// fallback JS che segue il valore controllato (nessun listener manuale, quindi
// non entra in conflitto con React né col reset post-invio). Crescita limitata
// a 50vh dal max-height, oltre il quale subentra lo scroll interno.
const supportsFieldSizing =
  typeof CSS !== 'undefined' && CSS.supports('field-sizing', 'content')

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ style, value, ...props }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null)

    useLayoutEffect(() => {
      if (supportsFieldSizing) return
      const el = innerRef.current
      if (!el) return
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight + el.offsetHeight - el.clientHeight}px`
    }, [value])

    return (
      <textarea
        ref={(node) => {
          innerRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        value={value}
        style={
          {
            ...inputBase,
            minHeight: 120,
            maxHeight: '50vh',
            height: 'auto',
            overflowY: 'auto',
            resize: 'none',
            fieldSizing: 'content',
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ style, className = '', children, ...props }, ref) => (
    <select ref={ref} className={`${inputHeightCls} ${className}`} style={{ ...inputBase, ...style }} {...props}>
      {children}
    </select>
  ),
)
Select.displayName = 'Select'

export function CheckboxField({
  id,
  checked,
  onChange,
  children,
  errorId,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  children: ReactNode
  errorId?: string
}) {
  return (
    // Sotto lg: 24×24 (era 18px, sotto il minimo WCAG 2.5.8 di 24×24), gap
    // 12px, riga min 44px con padding verticale — l'intera label è l'area
    // attiva. Testo 15px invece di --fs-caption (13px): è un'informativa
    // privacy da leggere prima di acconsentire. Invariato da lg (v. "Aziende
    // - Mobile & Tablet.dc.html" note 04-05).
    <label
      htmlFor={id}
      className="flex items-start gap-3 lg:gap-2.5 py-[6px] lg:py-0 min-h-11 lg:min-h-0"
      style={{ cursor: 'pointer' }}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-describedby={errorId}
        className="w-6 h-6 lg:w-[18px] lg:h-[18px]"
        style={{
          marginTop: '0.2rem',
          flexShrink: 0,
          accentColor: 'var(--brand)',
          cursor: 'pointer',
        }}
      />
      <span
        className="text-[0.9375rem] lg:[font-size:var(--fs-caption)]"
        style={{ color: 'var(--text-muted)', lineHeight: 1.55 }}
      >
        {children}
      </span>
    </label>
  )
}
