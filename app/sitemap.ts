import type { MetadataRoute } from 'next'

const BASE = 'https://www.axon-tech.it'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/applicazioni`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/come-funziona`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/perche-axon`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/professionisti`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/aziende`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contatti`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/cookie`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/termini`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
