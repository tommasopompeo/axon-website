'use client'

import { ReactNode } from 'react'
import { motion, useReducedMotion, Variants } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** 'scroll' (default) = whileInView; 'mount' = animate on mount (use for above-the-fold) */
  trigger?: 'scroll' | 'mount'
}

interface RevealGroupProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

export const revealItemReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

/**
 * Reveal — fade+slide animation.
 * trigger='scroll' (default): fires when element enters the viewport.
 * trigger='mount': fires on component mount — use for above-the-fold content (hero).
 * Respects prefers-reduced-motion: no y-translate when active.
 */
export default function Reveal({ children, className = '', delay = 0, trigger = 'scroll' }: RevealProps) {
  const reduced = useReducedMotion()
  const yOffset = reduced ? 0 : 24
  const transition = { duration: 0.6, ease: EASE, delay }

  if (trigger === 'mount') {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: yOffset }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

/**
 * RevealGroup — staggered container. Direct children must use RevealItem.
 */
export function RevealGroup({ children, className = '', staggerDelay = 0.08 }: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      custom={staggerDelay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * RevealItem — must be a direct child of RevealGroup.
 */
export function RevealItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  const variants = reduced ? revealItemReducedVariants : revealItemVariants

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
