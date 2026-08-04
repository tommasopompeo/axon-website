import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
