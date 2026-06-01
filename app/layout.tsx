'use client'
import './site.css'
import { useState } from 'react'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <html lang="en">
      <head>
        <title>Carpets2Go — Carpets &amp; Flooring Specialists</title>
        <meta name="description" content="Quality carpets and flooring, measured and fitted with care. Browse our collections, download brochures and request a free quote." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Carpets2Go — Carpets & Flooring Specialists" />
        <meta property="og:description" content="Quality carpets and flooring, measured and fitted with care." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <div className="site" data-theme={theme}>
          <SiteNav theme={theme} onToggleTheme={toggle} />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
