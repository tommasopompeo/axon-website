import { ReactNode } from 'react'
import Reveal from '@/components/ui/Reveal'

interface LegalSectionProps {
  title: string
  children: ReactNode
  delay?: number
}

/**
 * LegalSection — numbered heading + body block shared by Privacy/Cookie/Termini.
 * Body copy sits on --text-muted at --fs-body/1.7, matching the paragraph
 * treatment already used for long-form copy elsewhere (see ShopContent
 * "Cosa include il Kit"). Extracted here instead of repeated 3× per page.
 */
export default function LegalSection({ title, children, delay = 0 }: LegalSectionProps) {
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col gap-4">
        <h2 className="text-h2">{title}</h2>
        <div
          className="flex flex-col gap-4"
          style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)', lineHeight: 1.7 }}
        >
          {children}
        </div>
      </div>
    </Reveal>
  )
}
