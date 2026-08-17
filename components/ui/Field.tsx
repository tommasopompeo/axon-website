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
  minHeight: 44,
  padding: '0.625rem 0.875rem',
  colorScheme: 'dark',
}

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
  ({ style, ...props }, ref) => (
    <input ref={ref} style={{ ...inputBase, ...style }} {...props} />
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
  ({ style, children, ...props }, ref) => (
    <select ref={ref} style={{ ...inputBase, ...style }} {...props}>
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
    <label
      htmlFor={id}
      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', cursor: 'pointer' }}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-describedby={errorId}
        style={{
          marginTop: '0.2rem',
          width: 18,
          height: 18,
          flexShrink: 0,
          accentColor: 'var(--brand)',
          cursor: 'pointer',
        }}
      />
      <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)', lineHeight: 1.55 }}>
        {children}
      </span>
    </label>
  )
}
