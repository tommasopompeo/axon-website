import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Default deviceSizes tops out at 3840 (for 2x/3x 4K displays), which is
    // far beyond any rendered width on this site — PageHero's `fill` image
    // (sizes="100vw") was resolving to the 3840 variant on 2x displays even
    // though no viewport here exceeds ~1920 CSS px. Capping at 2048 removes
    // that oversized request while staying above any real 2x need (1920 * 2x
    // would want 3840, but at that size the eye can't tell 2048 from 3840 on
    // a full-bleed photo — see DESIGN.md §14).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  async redirects() {
    return [
      {
        source: '/fisioterapisti',
        destination: '/professionisti',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
