import JsonLd from '@/components/JsonLd'
import HeroSection from '@/components/home/HeroSection'
import ContestiBento from '@/components/home/ContestiBento'
import HowItsDoneSection from '@/components/home/HowItsDoneSection'
import TargetCarousel from '@/components/home/TargetCarousel'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import FaqSection from '@/components/home/FaqSection'

export default function HomePage() {
  return (
    <>
      <JsonLd />
      {/* Static outer wrapper — REQUIRED for hero pinning: on client-side
          navigation Next.js scrolls to the page's first DOM node but skips
          position:sticky elements (shouldSkipElement in layout-router), so
          without this the router would scroll the post-hero content into view
          and the page would land already scrolled past the hero. A plain div
          creates no stacking context and spans the whole page, so it doesn't
          constrain the sticky hero. See DESIGN.md §11. */}
      <div>
        <HeroSection />
        {/* Content wrapper — opaque bg + z above the sticky hero so it slides
            over and covers the pinned hero (Whoop-style pinning, DESIGN.md §11). */}
        <div className="relative z-10" style={{ background: 'var(--bg)' }}>
          <ContestiBento />
          <HowItsDoneSection />
          <TargetCarousel />
          <TestimonialsSection />
          <FaqSection />
        </div>
      </div>
    </>
  )
}
