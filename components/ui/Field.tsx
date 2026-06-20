'use client'

import { forwardRef, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'

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

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ style, ...props }, ref) => (
    <textarea
      ref={ref}
      style={{ ...inputBase, minHeight: 120, resize: 'vertical', ...style }}
      {...props}
    />
  ),
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
