/**
 * Motion system — single source of truth for JS-side (Framer Motion) easing
 * and durations. Mirrors design/tokens.css (`--ease`, `--dur`) so CSS
 * animations/transitions and Framer Motion transitions stay identical.
 * Do not re-declare EASE or hardcode these durations locally — import from here.
 */

/** House ease — matches design/tokens.css `--ease`. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Durations (seconds). `ui`/`uiSlow` cover interactive state changes
 *  (accordions, crossfades, toggles); `reveal` is the scroll/mount entrance,
 *  matches design/tokens.css `--dur`; `revealReduced` is the opacity-only
 *  fade used by RevealItem's prefers-reduced-motion variant (no y-translate,
 *  shorter than `reveal` since there's no distance left to cover). */
export const DURATION = {
  ui: 0.2,
  uiSlow: 0.35,
  reveal: 0.6,
  revealReduced: 0.4,
} as const
