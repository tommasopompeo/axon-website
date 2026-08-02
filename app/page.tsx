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
      <HeroSection />
      <ContestiBento />
      <HowItsDoneSection />
      <TargetCarousel />
      <TestimonialsSection />
      <FaqSection />
    </>
  )
}
