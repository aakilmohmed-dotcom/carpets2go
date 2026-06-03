import BrandMarquee from '@/components/site/BrandMarquee'

const BROCHURES = [
  { title: 'Full Range 2025', desc: 'Our complete collection of carpets and flooring with colours, specifications and pricing guidance.', file: '/brochures/full-range-2025.pdf' },
  { title: 'Wool Collection', desc: 'Explore our premium natural wool carpets in full detail.', file: '/brochures/wool-collection.pdf' },
  { title: 'Flooring & LVT', desc: 'Wood and stone effect flooring for modern, low-maintenance living.', file: '/brochures/flooring-lvt.pdf' },
]

const COLLECTIONS = [
  { name: 'Wool Twist', tag: 'Premium', img: '/images/collection-1.jpg', desc: 'Dense, durable and naturally luxurious underfoot. Our flagship wool range.' },
  { name: 'Saxony Plush', tag: 'Luxury', img: '/images/collection-2.jpg', desc: 'Deep-pile softness with an elegant, even finish for living spaces.' },
  { name: 'Loop & Berber', tag: 'Hard-wearing', img: '/images/collection-3.jpg', desc: 'Tight-loop construction built to last in halls, stairs and busy rooms.' },
  { name: 'Patterned', tag: 'Statement', img: '/images/collection-4.jpg', desc: 'Bold and subtle patterns to anchor a room with character.' },
  { name: 'Vinyl & LVT', tag: 'Flooring', img: '/images/collection-5.jpg', desc: 'Wood and stone effect flooring — waterproof, warm and timeless.' },
  { name: 'Stair Runners', tag: 'Bespoke', img: '/images/collection-6.jpg', desc: 'Made-to-measure runners fitted with precision and care.' },
]

export default function Brochures() {
  return (
    <>
      <section className="c-wrap" style={{ paddingTop: 80, paddingBottom: 50 }}>
        <div className="c-eyebrow" style={{ marginBottom: 22 }}><span className="c-eyebrow-line" /> Download &amp; explore</div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 68px)', maxWidth: 760, marginBottom: 24 }}>Brochures</h1>
        <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 560, lineHeight: 1.7 }}>
          Browse our range brochures at your own pace. Open any brochure to view it full-screen or save it for later.
        </p>
      </section>

      <section className="c-wrap" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 22 }}>
          {BROCHURES.map(b => (
            <a key={b.title} href={b.file} target="_blank" rel="noopener noreferrer" className="c-card" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
              <div style={{
                height: 220, borderRadius: 12, marginBottom: 22, position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(150deg, var(--c-navy) 0%, #2a3d63 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--c-serif)', fontSize: 26, color: 'rgba(255,255,255,0.92)', fontStyle: 'italic', textAlign: 'center', padding: '0 24px' }}>{b.title}</span>
                <span style={{ position: 'absolute', bottom: 14, right: 14, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 4, padding: '3px 8px' }}>PDF</span>
              </div>
              <h3 style={{ fontSize: 23, marginBottom: 8 }}>{b.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 18, flex: 1 }}>{b.desc}</p>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-text)' }}>Open brochure →</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section className="c-wrap c-section-sm">
        <div style={{ marginBottom: 44 }}>
          <div className="c-eyebrow" style={{ marginBottom: 14 }}><span className="c-eyebrow-line" /> Our ranges</div>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)' }}>Collections for every room</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {COLLECTIONS.map(c => (
            <div key={c.name} className="c-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 180, borderRadius: 11, marginBottom: 22, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img src={c.img} alt={c.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <span style={{
                alignSelf: 'flex-start', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                textTransform: 'uppercase', color: 'var(--accent-text)',
                background: 'var(--c-red-soft)', border: '1px solid var(--c-red-border)',
                borderRadius: 4, padding: '3px 9px', marginBottom: 14,
              }}>{c.tag}</span>
              <h3 style={{ fontSize: 24, marginBottom: 8 }}>{c.name}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BRANDS WE STOCK ── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '54px 0', marginTop: 30 }}>
        <div className="c-wrap" style={{ textAlign: 'center', marginBottom: 30 }}>
          <div className="c-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="c-eyebrow-line" /> Brands we stock <span className="c-eyebrow-line" />
          </div>
        </div>
        <BrandMarquee />
      </section>

      <p style={{ maxWidth: 1180, margin: '40px auto 100px', padding: '0 32px', fontSize: 13, color: 'var(--text-3)', textAlign: 'center' }}>
        Brochures open in a new tab. Drop your PDF files into the public/brochures folder to publish them.
      </p>
    </>
  )
}
