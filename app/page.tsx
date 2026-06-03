import Link from 'next/link'
import ReviewsCarousel from '@/components/site/ReviewsCarousel'
import BrandMarquee from '@/components/site/BrandMarquee'
import WorkGallery from '@/components/site/WorkGallery'

const COLLECTIONS = [
  { name: 'Wool Twist', tag: 'Premium', img: '/images/collection-1.jpg', desc: 'Dense, durable and naturally luxurious underfoot. Our flagship wool range.' },
  { name: 'Saxony Plush', tag: 'Luxury', img: '/images/collection-2.jpg', desc: 'Deep-pile softness with an elegant, even finish for living spaces.' },
  { name: 'Loop & Berber', tag: 'Hard-wearing', img: '/images/collection-3.jpg', desc: 'Tight-loop construction built to last in halls, stairs and busy rooms.' },
  { name: 'Patterned', tag: 'Statement', img: '/images/collection-4.jpg', desc: 'Bold and subtle patterns to anchor a room with character.' },
  { name: 'Vinyl & LVT', tag: 'Flooring', img: '/images/collection-5.jpg', desc: 'Wood and stone effect flooring — waterproof, warm and timeless.' },
  { name: 'Stair Runners', tag: 'Bespoke', img: '/images/collection-6.jpg', desc: 'Made-to-measure runners fitted with precision and care.' },
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
      <section className="c-wrap" style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div className="c-eyebrow" style={{ marginBottom: 22 }}>
          <span className="c-eyebrow-line" /> Carpets &amp; flooring specialists &middot; Bolton
        </div>
        <h1 style={{ fontSize: 'clamp(44px, 7vw, 86px)', maxWidth: 920, marginBottom: 26, lineHeight: 1.06 }}>
          Beautiful floors,<br />
          <span style={{ fontStyle: 'italic', color: 'var(--text-1)' }}>fitted with care</span>.
        </h1>
        <p style={{ fontSize: 'clamp(17px, 2.2vw, 21px)', color: 'var(--accent)', maxWidth: 560, lineHeight: 1.7, marginBottom: 36 }}>
          Quality carpets, laminate and flooring supplied and fitted across Bolton, Wigan &amp; Greater Manchester. Free home visits, honest advice and expert fitting.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
          <a href="/contact" className="c-btn c-btn-cta">Book a free measure</a>
          <a href="tel:+441204775930" className="c-btn c-btn-ghost">Call 01204 775 930</a>
        </div>

        {/* Hero trust line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--action)', fontSize: 18, letterSpacing: '0.08em' }}>★★★★★</span>
          <span style={{ fontSize: 14, color: 'var(--text-2)', fontWeight: 500 }}>
            Rated by local customers &middot; 10+ years &middot; Family-run &middot; Free home visits
          </span>
        </div>
      </section>

      {/* ── TRUST BAND ── */}
      <section style={{ background: 'var(--surface-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="c-wrap" style={{ padding: '28px 32px', display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'space-between', alignItems: 'center' }}>
          {[
            { top: '★★★★★', bot: 'Rated by local customers' },
            { top: '10+ years', bot: 'Serving Bolton & beyond' },
            { top: 'Free', bot: 'Home visits & measuring' },
            { top: 'Expert', bot: 'Supply & fitting' },
          ].map((t, i) => (
            <div key={i} style={{ flex: '1 1 180px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--c-serif)', fontSize: 24, color: i === 0 ? 'var(--action)' : 'var(--text-1)', lineHeight: 1, letterSpacing: i===0 ? '0.05em' : '0' }}>{t.top}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 7 }}>{t.bot}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="c-wrap c-section-sm">
        <div className="c-eyebrow" style={{ marginBottom: 14 }}><span className="c-eyebrow-line" /> How it works</div>
        <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', maxWidth: 560, marginBottom: 48 }}>Three simple steps to your new floor</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
          {[
            { n: '1', t: 'Book a free home visit', d: 'Call us or request a quote. We come to you with samples — no charge, no obligation.' },
            { n: '2', t: 'Choose your flooring', d: 'Get honest advice and see colours in your own light. We measure up precisely.' },
            { n: '3', t: 'Expert fitting completed', d: 'Our experienced fitters install your new floor neatly, on time and to a high standard.' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'var(--c-red-soft)', border: '1px solid var(--c-red-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--c-serif)', fontSize: 24, fontWeight: 700, color: 'var(--accent)',
              }}>{s.n}</div>
              <h3 style={{ fontSize: 22, margin: 0 }}>{s.t}</h3>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>{s.d}</p>
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

      {/* ── REVIEWS ── */}
      <section style={{ background: 'var(--surface-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="c-wrap c-section">
          <div className="c-eyebrow" style={{ justifyContent: 'center', marginBottom: 16, display: 'flex' }}>
            <span className="c-eyebrow-line" /> What our customers say <span className="c-eyebrow-line" />
          </div>
          <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', textAlign: 'center', marginBottom: 48 }}>Trusted by homeowners across Bolton</h2>
          <ReviewsCarousel />
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
