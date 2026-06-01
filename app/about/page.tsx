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
