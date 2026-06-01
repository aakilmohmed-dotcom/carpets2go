import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="c-footer">
      <div className="c-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
        <div style={{ maxWidth: 300 }}>
          <div className="c-nav-logo" style={{ fontSize: 24, marginBottom: 12 }}>
            <span style={{ color: 'var(--text-1)' }}>Carpets</span><span style={{ color: 'var(--action)' }}>2Go</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.7 }}>
            Quality carpets and flooring, delivered with care. Browse our collections and request a free quote.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>Explore</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href="/collections" style={{ fontSize: 14, color: 'var(--text-2)' }}>Collections</Link>
              <Link href="/brochures" style={{ fontSize: 14, color: 'var(--text-2)' }}>Brochures</Link>
              <Link href="/about" style={{ fontSize: 14, color: 'var(--text-2)' }}>About</Link>
              <Link href="/contact" style={{ fontSize: 14, color: 'var(--text-2)' }}>Contact</Link>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>Get in touch</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="tel:+441204775930" style={{ fontSize: 14, color: 'var(--text-2)' }}>01204 775 930</a>
              <a href="mailto:info@carpets2go.uk.com" style={{ fontSize: 14, color: 'var(--text-2)' }}>info@carpets2go.uk.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="c-wrap" style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text-3)' }}>
        © {new Date().getFullYear()} Carpets2Go. All rights reserved.
      </div>
    </footer>
  )
}
