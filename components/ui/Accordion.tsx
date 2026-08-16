'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { EASE, DURATION } from '@/lib/motion'

interface AccordionItemProps {
  title: ReactNode
  children: ReactNode
  isOpen: boolean
  onToggle: () => void
  icon?: ReactNode
  className?: string
}

/**
 * AccordionItem — controlled. Parent manages which item is open.
 * Plus icon rotates 45° → × when open.
 */
export function AccordionItem({
  title,
  children,
  isOpen,
  onToggle,
  icon,
  className = '',
}: AccordionItemProps) {
  const reduced = useReducedMotion()

  return (
    <div
      className={`${className}`}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span className="flex items-center gap-3">
          {icon && (
            <span
              className="shrink-0"
              style={{ color: 'var(--brand)' }}
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
          <span
            className="font-semibold"
            style={{ fontSize: 'var(--fs-h3)', color: 'var(--text)' }}
          >
            {title}
          </span>
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: reduced ? 0 : DURATION.ui, ease: EASE }}
          className="shrink-0 flex"
          style={{ color: isOpen ? 'var(--text)' : 'var(--text-muted)' }}
          aria-hidden="true"
        >
          <Plus size={18} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : DURATION.uiSlow, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="pb-5"
              style={{
                paddingLeft: icon ? 'calc(18px + 0.75rem)' : undefined,
              }}
            >
              <p
                style={{
                  fontSize: 'var(--fs-body)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                }}
              >
                {children}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
