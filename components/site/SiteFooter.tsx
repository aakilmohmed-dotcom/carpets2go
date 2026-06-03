import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="c-footer">
      <div className="c-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 40 }}>
        {/* Brand */}
        <div style={{ maxWidth: 300 }}>
          <div style={{ marginBottom: 14 }}><img src="/images/logo.png" alt="Carpets2Go" style={{ height: 42, width: 'auto', display: 'block' }} /></div>
          <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.7 }}>
            Quality carpets, laminate and flooring — supplied and fitted with care across Bolton, Wigan and Greater Manchester.
          </p>
        </div>

        {/* Explore */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>Explore</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/brochures" style={{ fontSize: 14, color: 'var(--text-2)' }}>Brochures</Link>
            <Link href="/about" style={{ fontSize: 14, color: 'var(--text-2)' }}>About</Link>
            <Link href="/contact" style={{ fontSize: 14, color: 'var(--text-2)' }}>Contact</Link>
            <a href="#find-us" style={{ fontSize: 14, color: 'var(--text-2)' }}>Find us</a>
          </div>
        </div>

        {/* Get in touch */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>Get in touch</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="tel:+441204775930" style={{ fontSize: 14, color: 'var(--text-2)' }}>01204 775 930</a>
            <a href="mailto:info@carpets2go.uk.com" style={{ fontSize: 14, color: 'var(--text-2)' }}>info@carpets2go.uk.com</a>
            <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Unit 1, Manchester Rd,<br />Bolton, BL3 2ND</span>
          </div>
        </div>

        {/* Hours + areas */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>Areas served</div>
          <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>Bolton · Wigan · Greater Manchester</div>
        </div>
      </div>

      <div className="c-wrap" style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'var(--text-3)' }}>
        <span>© {new Date().getFullYear()} Carpets2Go. All rights reserved.</span>
        <a href="https://www.google.com/search?q=Carpets2Go+Bolton" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--text-2)' }}>Read our Google reviews →</a>
      </div>
    </footer>
  )
}
