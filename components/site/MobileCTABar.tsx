'use client'

export default function MobileCTABar() {
  return (
    <div className="mobile-cta-bar">
      <a href="tel:+441204775930" className="mobile-cta-btn mobile-cta-call">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Call us
      </a>
      <a href="/contact" className="mobile-cta-btn mobile-cta-quote">
        Free quote
      </a>
    </div>
  )
}
