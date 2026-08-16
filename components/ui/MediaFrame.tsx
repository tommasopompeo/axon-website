import { ReactNode } from 'react'

interface MediaFrameProps {
  children: ReactNode
  className?: string
}

/**
 * MediaFrame — the glow-bordered aspect-square media frame shared by
 * StickyScrollApplicazioni, WearMethodSection, and ResultsAccordion: aspect-square,
 * max-w-[620px] at xl, 24px radius, subtle white glow shadow + hairline border.
 * Callers provide the crossfading media children (Image/motion.div stack);
 * outer positioning (justify-*, order-*) stays with each caller since it differs
 * per layout.
 */
export default function MediaFrame({ children, className = '' }: MediaFrameProps) {
  return (
    <div
      className={`relative w-full max-w-lg lg:max-w-xl xl:max-w-[620px] aspect-square rounded-lg overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.08)] border border-white/10 ${className}`}
    >
      {children}
    </div>
  )
}
