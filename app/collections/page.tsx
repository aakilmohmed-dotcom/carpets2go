import Link from 'next/link'

const RANGES = [
  { name: 'Wool Twist', tag: 'Premium', desc: 'Dense, durable and naturally luxurious underfoot. A timeless choice that wears beautifully for years.', points: ['100% natural wool', 'Stain resistant', '10-year guarantee'] },
  { name: 'Saxony Plush', tag: 'Luxury', desc: 'Deep-pile softness with a smooth, even finish. Sink-in comfort for bedrooms and lounges.', points: ['Ultra-soft pile', 'Rich colour depth', 'Cosy underfoot'] },
  { name: 'Loop & Berber', tag: 'Hard-wearing', desc: 'Tight-loop construction engineered for the busiest areas of the home.', points: ['Heavy domestic use', 'Hides footprints', 'Hall & stair ready'] },
  { name: 'Patterned', tag: 'Statement', desc: 'From subtle textures to bold geometrics — carpet that defines a space.', points: ['Wide design choice', 'Adds character', 'Hides marks well'] },
  { name: 'Vinyl & LVT', tag: 'Flooring', desc: 'Luxury vinyl tile in wood and stone effects. Waterproof, warm and effortless to maintain.', points: ['100% waterproof', 'Wood & stone effects', 'Kitchen & bathroom safe'] },
  { name: 'Stair Runners', tag: 'Bespoke', desc: 'Made-to-measure runners fitted with precision — a touch of craftsmanship on every step.', points: ['Custom widths', 'Choice of edging', 'Expert fitting'] },
]

export default function Collections() {
  return (
    <>
      <section className="c-wrap" style={{ paddingTop: 80, paddingBottom: 50 }}>
        <div className="c-eyebrow" style={{ marginBottom: 22 }}><span className="c-eyebrow-line" /> Our ranges</div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 68px)', maxWidth: 760, marginBottom: 24 }}>Collections</h1>
        <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 560, lineHeight: 1.7 }}>
          Carefully chosen carpets and flooring for every room and budget. Order free samples or book a home visit to see them in your space.
        </p>
      </section>

      <section className="c-wrap" style={{ paddingBottom: 100 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 22 }}>
          {RANGES.map(r => (
            <div key={r.name} className="c-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                height: 170, borderRadius: 12, marginBottom: 24,
                background: 'linear-gradient(135deg, var(--surface-2) 0%, var(--bg-2) 100%)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--c-serif)', fontSize: 32, color: 'var(--text-3)', fontStyle: 'italic' }}>{r.name}</span>
              </div>
              <span style={{
                alignSelf: 'flex-start', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                textTransform: 'uppercase', color: 'var(--accent-text)',
                background: 'var(--c-red-soft)', border: '1px solid var(--c-red-border)',
                borderRadius: 4, padding: '3px 9px', marginBottom: 16,
              }}>{r.tag}</span>
              <h3 style={{ fontSize: 26, marginBottom: 10 }}>{r.name}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{r.desc}</p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {r.points.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 500, color: 'var(--text-1)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, textAlign: 'center' }}>
          <p style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 20 }}>Not sure where to start? We&apos;ll bring samples to you.</p>
          <Link href="/contact" className="c-btn c-btn-primary">Book a free home visit</Link>
        </div>
      </section>
    </>
  )
}
