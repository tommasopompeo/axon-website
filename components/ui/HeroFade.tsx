'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * HeroFade — the scroll-linked black overlay that darkens the pinned PageHero
 * (Whoop-style hero pinning, see DESIGN.md §11). Split into its own client
 * component so PageHero can stay a server component (media/priority/children
 * render on the server); only this ~20-line overlay ships JS.
 *
 * Opacity is driven by Framer Motion's `useScroll` → `useTransform` (which we
 * already depend on): opacity 0 → 0.85 across the first viewport-height of page
 * scroll. Opacity-only, so it stays on the compositor, and it's a MotionValue —
 * it writes to the DOM directly, never triggering a React re-render (no setState
 * in a scroll handler).
 *
 * Why not CSS scroll-driven animation (the lighter, JS-free option)? The site's
 * root scroller has `overflow-x: clip` (app/globals.css, to kill horizontal
 * overflow from decorative glows), which stops `animation-timeline: scroll(root)`
 * from tracking in Chromium even though `CSS.supports` reports it — so the CSS
 * path silently never fades here. Framer reads `window.scrollY` directly and is
 * immune to that. `pointer-events: none` (in .hero-fade) keeps the hero CTA/text
 * clickable until the content wrapper physically covers them.
 *
 * prefers-reduced-motion: render a static overlay pinned at opacity 0 — no
 * scroll-linked fade. The content wrapper still covers the hero via plain
 * layout, consistent with how .reveal-mount degrades motion.
 */
export default function HeroFade() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  // Functional useTransform: re-runs whenever a MotionValue read inside via
  // .get() changes (here, scrollY). Maps the first viewport-height of scroll to
  // opacity 0 → 0.85. innerHeight is read live so it stays correct after resize.
  const opacity = useTransform(() => {
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800
    return Math.min(scrollY.get() / vh, 1) * 0.85
  })

  // Nascosto sotto md: la hero lì non è pinnata (v. PageHero), quindi non
  // c'è nulla che "scivola sopra" da oscurare — l'overlay resterebbe
  // semplicemente inerte mentre la hero scorre via in normal flow.
  if (reduced) {
    return <div className="hero-fade hidden md:block" aria-hidden="true" />
  }

  return <motion.div className="hero-fade hidden md:block" aria-hidden="true" style={{ opacity }} />
}
