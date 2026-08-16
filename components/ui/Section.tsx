import { ReactNode, CSSProperties } from 'react'

type SectionBackground = 'default' | 'elevated' | 'black' | 'white'

interface SectionProps {
  children: ReactNode
  id?: string
  /** default = transparent, inherits page --bg · elevated = --bg-elevated ·
   *  black = --bg-black · white = #ffffff. Replaces the old ad-hoc
   *  className="bg-black" style={{background:'var(--bg-black)'}} pattern. */
  background?: SectionBackground
  className?: string
  style?: CSSProperties
}

const backgroundValue: Record<SectionBackground, string | undefined> = {
  default: undefined,
  elevated: 'var(--bg-elevated)',
  black: 'var(--bg-black)',
  white: '#ffffff',
}

export default function Section({ children, id, background = 'default', className = '', style }: SectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        background: backgroundValue[background],
        paddingTop: 'var(--section-y)',
        paddingBottom: 'var(--section-y)',
        ...style,
      }}
    >
      {children}
    </section>
  )
}
