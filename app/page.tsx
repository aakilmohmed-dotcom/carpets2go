import Link from 'next/link'
import BrandMarquee from '@/components/site/BrandMarquee'
import WorkGallery from '@/components/site/WorkGallery'

const COLLECTIONS = [
  { name: 'Wool Twist', tag: 'Premium', img: '/images/wool-twist.jpg', desc: 'Dense, durable and naturally luxurious underfoot. Our flagship wool range.' },
  { name: 'Saxony Plush', tag: 'Luxury', img: '/images/vinyl-hallway.jpg', desc: 'Deep-pile softness with an elegant, even finish for living spaces.' },
  { name: 'Loop & Berber', tag: 'Hard-wearing', img: '/images/loop-berber.jpg', desc: 'Tight-loop construction built to last in halls, stairs and busy rooms.' },
  { name: 'Patterned', tag: 'Statement', img: '/images/tartan-landing.jpg', desc: 'Bold and subtle patterns to anchor a room with character.' },
  { name: 'Vinyl & LVT', tag: 'Flooring', img: '/images/lvt-flooring.jpg', desc: 'Wood and stone effect flooring — waterproof, warm and timeless.' },
  { name: 'Stair Runners', tag: 'Bespoke', img: '/images/stair-runners.jpg', desc: 'Made-to-measure runners fitted with precision and care.' },
]

const REASONS = [
  { title: 'Measured & fitted', desc: 'Professional measuring and fitting by experienced installers — no guesswork.' },
  { title: 'Free home visits', desc: 'We bring samples to you so you can see colours in your own light.' },
  { title: 'Trusted quality', desc: 'Carefully selected ranges from leading UK carpet manufacturers.' },
  { title: 'Honest pricing', desc: 'Clear quotes with no hidden costs. What we quote is what you pay.' },
]

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="c-wrap" style={{ paddingTop: 96, paddingBottom: 80 }}>
        <div className="c-eyebrow" style={{ marginBottom: 26 }}>
          <span className="c-eyebrow-line" /> Carpets &amp; flooring specialists &middot; Bolton
        </div>
        <h1 style={{ fontSize: 'clamp(46px, 7vw, 88px)', maxWidth: 900, marginBottom: 30, lineHeight: 1.08 }}>
          Beautiful floors,<br />
          <span style={{ fontStyle: 'italic', color: 'var(--text-1)' }}>fitted with care</span>.
        </h1>
        <p style={{ fontSize: 19, color: 'var(--accent)', maxWidth: 540, lineHeight: 1.75, marginBottom: 42 }}>
          From plush wool twists to hard-wearing flooring, Carpets2Go brings quality and craftsmanship to every room across Bolton and Greater Manchester.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/collections" className="c-btn c-btn-primary">Explore collections</Link>
          <Link href="/brochures" className="c-btn c-btn-ghost">View brochures</Link>
        </div>

        {/* Trust strip with icon badges */}
        <div style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid var(--border)', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {[
            { big: 'Free', small: 'home visits & quotes', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7M5 10v10h14V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )},
            { big: 'Expert', small: 'measuring & fitting', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 7l4-4 14 14-4 4L3 7zM7 7l2 2M11 5l2 2M9 11l2 2M13 9l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )},
            { big: 'Bolton', small: 'Wigan & Manchester', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7"/></svg>
            )},
          ].map(item => (
            <div key={item.big} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(78,172,234,0.12)', border: '1px solid rgba(78,172,234,0.30)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
              }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: 'var(--c-serif)', fontSize: 28, color: 'var(--text-1)', lineHeight: 1 }}>{item.big}</div>
                <div style={{ fontSize: 13, color: 'var(--accent)', marginTop: 5 }}>{item.small}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED COLLECTIONS ── */}
      <section className="c-wrap c-section-sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 44 }}>
          <div>
            <div className="c-eyebrow" style={{ marginBottom: 14 }}><span className="c-eyebrow-line" /> Our ranges</div>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)' }}>Collections for every room</h2>
          </div>
          <Link href="/collections" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-text)' }}>View all →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {COLLECTIONS.map(c => (
            <div key={c.name} className="c-card" style={{ display: 'flex', flexDirection: 'column' }}>
              {c.img ? (
                <div style={{ height: 180, borderRadius: 11, marginBottom: 22, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={c.img} alt={c.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ) : (
                <div style={{
                  height: 180, borderRadius: 11, marginBottom: 22,
                  background: 'linear-gradient(135deg, var(--surface-2) 0%, var(--bg-2) 100%)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--c-serif)', fontSize: 28, color: 'var(--text-3)', fontStyle: 'italic' }}>{c.name}</span>
                </div>
              )}
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
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '54px 0' }}>
        <div className="c-wrap" style={{ textAlign: 'center', marginBottom: 30 }}>
          <div className="c-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="c-eyebrow-line" /> Brands we stock <span className="c-eyebrow-line" />
          </div>
        </div>
        <BrandMarquee />
      </section>

      {/* ── RECENT WORK GALLERY ── */}
      <section className="c-wrap c-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 44 }}>
          <div>
            <div className="c-eyebrow" style={{ marginBottom: 14 }}><span className="c-eyebrow-line" /> Our recent work</div>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)', maxWidth: 520 }}>Carpets &amp; flooring fitted across Greater Manchester</h2>
          </div>
          <p style={{ fontSize: 15, color: 'var(--text-2)', maxWidth: 300, lineHeight: 1.7 }}>
            A selection of real installations by our team. Click any image to view it larger.
          </p>
        </div>
        <WorkGallery />
      </section>

      {/* ── WHY US ── */}
      <section className="c-wrap c-section">
        <div className="c-eyebrow" style={{ marginBottom: 14 }}><span className="c-eyebrow-line" /> Why Carpets2Go</div>
        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 46px)', maxWidth: 600, marginBottom: 50 }}>
          Service worth coming back for
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, background: 'var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {REASONS.map((r, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: 34 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 9, marginBottom: 20,
                background: 'var(--c-red-soft)', border: '1px solid var(--c-red-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--c-serif)', fontSize: 18, fontWeight: 700, color: 'var(--accent-text)',
              }}>{i + 1}</div>
              <h3 style={{ fontSize: 21, marginBottom: 10 }}>{r.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BROCHURE CTA BAND ── */}
      <section className="c-wrap" style={{ paddingBottom: 100 }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--c-red-soft) 0%, transparent 100%)',
          border: '1px solid var(--c-red-border)', borderRadius: 20,
          padding: 'clamp(40px, 6vw, 72px)', textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', marginBottom: 16 }}>Browse our latest brochures</h2>
          <p style={{ fontSize: 17, color: 'var(--text-2)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Download our full range brochures to explore colours, textures and ranges at your own pace.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/brochures" className="c-btn c-btn-primary">View brochures</Link>
            <Link href="/contact" className="c-btn c-btn-ghost">Request a quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}
