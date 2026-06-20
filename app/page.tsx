import JsonLd from '@/components/JsonLd'
import HeroSection from '@/components/home/HeroSection'
import ContestiBento from '@/components/sections/ContestiBento'
import IntroStatSection from '@/components/home/IntroStatSection'
import HowItsDoneSection from '@/components/home/HowItsDoneSection'
import TargetCarousel from '@/components/sections/TargetCarousel'
import ProductsSection from '@/components/home/ProductsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import FaqSection from '@/components/home/FaqSection'
import FinalCtaSection from '@/components/home/FinalCtaSection'

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <HeroSection />
      <ContestiBento />
      <IntroStatSection />
      <HowItsDoneSection />
      <TargetCarousel />
      <ProductsSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
