import Link from 'next/link'

const VALUES = [
  { title: 'Craftsmanship', desc: 'Every fitting is done properly by experienced installers who take pride in the finish.' },
  { title: 'Honesty', desc: 'Clear quotes, fair prices and straight advice — even when it means recommending less.' },
  { title: 'Service', desc: 'From first sample to final fit, we make choosing your floor easy and enjoyable.' },
]

export default function About() {
  return (
    <>
      <section className="c-wrap" style={{ paddingTop: 80, paddingBottom: 60 }}>
        <div className="c-eyebrow" style={{ marginBottom: 22 }}><span className="c-eyebrow-line" /> About us</div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 68px)', maxWidth: 820, marginBottom: 28 }}>
          Flooring done <span style={{ color: 'var(--accent-text)', fontStyle: 'italic' }}>the right way</span>
        </h1>
        <p style={{ fontSize: 19, color: 'var(--text-2)', maxWidth: 620, lineHeight: 1.75 }}>
          Carpets2Go is built on a simple idea: great flooring should be easy to choose, fairly priced and fitted to last. We bring the showroom to you, help you find the right range for your home, and finish the job to a standard we&apos;d be happy with ourselves.
        </p>
      </section>

      <section className="c-wrap c-section-sm">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
          {VALUES.map(v => (
            <div key={v.title} className="c-card">
              <h3 style={{ fontSize: 26, marginBottom: 12 }}>{v.title}</h3>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FIND US ── */}
      <section id="find-us" className="c-wrap c-section">
        <div className="c-eyebrow" style={{ marginBottom: 14 }}><span className="c-eyebrow-line" /> Find us</div>
        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)', maxWidth: 600, marginBottom: 40 }}>
          Visit our Bolton showroom
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)', gap: 32, alignItems: 'stretch' }} className="findus-grid">
          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, justifyContent: 'center' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Address</div>
              <div style={{ fontSize: 17, color: 'var(--text-1)', lineHeight: 1.6, fontWeight: 500 }}>
                Unit 1, Manchester Rd<br />Bolton, BL3 2ND
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Call us</div>
              <a href="tel:+441204775930" style={{ fontSize: 17, color: 'var(--text-1)', fontWeight: 500 }}>01204 775 930</a>
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Carpets2Go,+Unit+1,+Manchester+Rd,+Bolton+BL3+2ND" target="_blank" rel="noopener noreferrer" className="c-btn c-btn-primary" style={{ alignSelf: 'flex-start', marginTop: 6 }}>Get directions</a>
          </div>

          {/* Map */}
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', minHeight: 380 }}>
            <iframe
              title="Carpets2Go location"
              src="https://www.google.com/maps?q=Carpets2Go,+Unit+1,+Manchester+Rd,+Bolton+BL3+2ND&output=embed"
              width="100%" height="100%" style={{ border: 0, display: 'block', minHeight: 380 }}
              loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="c-wrap" style={{ paddingBottom: 100, paddingTop: 30 }}>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20,
          padding: 'clamp(36px, 5vw, 60px)', display: 'flex', flexWrap: 'wrap',
          gap: 30, alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ maxWidth: 480 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 12 }}>Ready to transform a room?</h2>
            <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.7 }}>Book a free, no-obligation home visit and we&apos;ll bring the samples to you.</p>
          </div>
          <Link href="/contact" className="c-btn c-btn-primary">Get in touch</Link>
        </div>
      </section>
    </>
  )
}
