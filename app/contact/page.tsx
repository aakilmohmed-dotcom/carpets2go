'use client'
import { useState } from 'react'

const EMAIL = 'info@carpets2go.uk.com'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const send = () => {
    const subject = encodeURIComponent(`Quote request from ${name || 'website'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  const field: React.CSSProperties = {
    width: '100%', padding: '13px 15px', borderRadius: 9,
    border: '1px solid var(--border-2)', background: 'var(--bg-2)',
    color: 'var(--text-1)', fontSize: 15, fontFamily: 'var(--c-sans)', outline: 'none',
  }
  const label: React.CSSProperties = {
    display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8,
  }

  return (
    <section className="c-wrap" style={{ paddingTop: 80, paddingBottom: 100 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'start' }}>
        <div>
          <div className="c-eyebrow" style={{ marginBottom: 22 }}><span className="c-eyebrow-line" /> Get in touch</div>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 60px)', marginBottom: 24 }}>Request a quote</h1>
          <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 36 }}>
            Tell us a little about your project and we&apos;ll get back to you with advice, samples and a free quote.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href={`mailto:${EMAIL}`} style={{ fontSize: 15, color: 'var(--text-1)', fontWeight: 500 }}>{EMAIL}</a>
            <a href="tel:+441204775930" style={{ fontSize: 15, color: 'var(--text-1)', fontWeight: 500 }}>01204 775 930</a>
          </div>
        </div>

        <div className="c-card" style={{ padding: 'clamp(26px, 4vw, 38px)' }}>
          <div style={{ marginBottom: 18 }}>
            <label style={label}>Name</label>
            <input style={field} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={label}>Email</label>
            <input style={field} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={label}>How can we help?</label>
            <textarea style={{ ...field, minHeight: 130, resize: 'vertical' }} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us about the rooms, sizes or ranges you're interested in..." />
          </div>
          <button onClick={send} className="c-btn c-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send enquiry</button>
          <p style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center', marginTop: 14 }}>Opens in your email app — no data is stored.</p>
        </div>
      </div>
    </section>
  )
}
