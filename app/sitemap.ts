import { MetadataRoute } from 'next'
export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://carpets2go.co.uk'
  const routes = ['', '/collections', '/brochures', '/about', '/contact']
  return routes.map(r => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: r === '' ? 1 : 0.8,
  }))
}
