import Link from 'next/link'
import CarpetVideoHero from '@/components/site/CarpetVideoHero'
import ReviewsCarousel from '@/components/site/ReviewsCarousel'


const REASONS = [
  { title: 'Measured & fitted', desc: 'Professional measuring and fitting by experienced installers — no guesswork.' },
  { title: 'Free home visits', desc: 'We bring samples to you so you can see colours in your own light.' },
  { title: 'Trusted quality', desc: 'Carefully selected ranges from leading UK carpet manufacturers.' },
  { title: 'Honest pricing', desc: 'Clear quotes with no hidden costs. What we quote is what you pay.' },
]

export default function Home() {
  return (
    <>
      {/* ── HERO (split: text + scroll video) ── */}
      <CarpetVideoHero />

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
            { n: '1', t: 'Book a free home visit', d: 'Call us or request a quote. We come to you with samples — no charge, no obligation.', href: '/contact' },
            { n: '2', t: 'Choose your flooring', d: 'Get honest advice and see colours in your own light. We measure up precisely.', href: '/brochures' },
            { n: '3', t: 'Expert fitting completed', d: 'Our experienced fitters install your new floor neatly, on time and to a high standard.', href: null },
          ].map(s => {
            const inner = (
              <>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'var(--c-red-soft)', border: '1px solid var(--c-red-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--c-serif)', fontSize: 24, fontWeight: 700, color: 'var(--accent)',
              }}>{s.n}</div>
              <h3 style={{ fontSize: 22, margin: 0 }}>{s.t}</h3>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>{s.d}</p>
              </>
            )
            return s.href ? (
              <Link key={s.n} href={s.href} className="c-step-card" style={{ display: 'flex', flexDirection: 'column', gap: 14, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>{inner}</Link>
            ) : (
              <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{inner}</div>
            )
          })}
        </div>
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
