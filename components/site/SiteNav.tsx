'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/collections', label: 'Collections' },
  { href: '/brochures',   label: 'Brochures'   },
  { href: '/about',       label: 'About'       },
  { href: '/contact',     label: 'Contact'     },
]

export default function SiteNav({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="c-nav">
        <Link href="/" className="c-nav-logo">
          <span style={{ color: 'var(--text-1)' }}>Carpets</span><span style={{ color: 'var(--action)' }}>2Go</span>
        </Link>

        <div className="c-nav-links">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`c-nav-link${path === l.href ? ' active' : ''}`}
            >{l.label}</Link>
          ))}
        </div>

        <button onClick={onToggleTheme} aria-label="Toggle theme" className="c-theme-btn">
          {theme === 'dark' ? (
            <>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 1v1M8 14v1M1 8H0M15 8h1M2.93 2.93l.7.7M12.37 12.37l.7.7M2.93 13.07l.7-.7M12.37 3.63l.7-.7M8 5a3 3 0 100 6 3 3 0 000-6z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              Light
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M13.5 10.5A6 6 0 015.5 2.5a6 6 0 108 8z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Dark
            </>
          )}
        </button>

        <Link href="/contact" className="c-nav-cta desktop-only">Request a quote</Link>

        <button className="c-hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          )}
        </button>
      </nav>

      <div className={`c-mobile-menu${open ? ' open' : ''}`}>
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} className="c-mobile-link" onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
        <Link href="/contact" className="c-nav-cta" style={{ marginTop: 14, justifyContent: 'center' }} onClick={() => setOpen(false)}>Request a quote</Link>
      </div>
    </>
  )
}
