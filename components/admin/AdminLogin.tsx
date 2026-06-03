'use client'
import { useState } from 'react'

export default function AdminLogin() {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true); setErr('')
    const res = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) { window.location.reload() }
    else { const d = await res.json(); setErr(d.error || 'Incorrect password'); setLoading(false) }
  }

  return (
    <section className="c-wrap" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 380, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 36 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Admin</h1>
        <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 24 }}>Enter the password to manage invoices.</p>
        <input
          type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Password" autoFocus
          style={{ width: '100%', padding: '13px 15px', borderRadius: 9, border: '1px solid var(--border-2)', background: 'var(--bg-2)', color: 'var(--text-1)', fontSize: 15, fontFamily: 'var(--c-sans)', outline: 'none', marginBottom: 14 }}
        />
        {err && <div style={{ color: 'var(--action)', fontSize: 13, marginBottom: 14 }}>{err}</div>}
        <button onClick={submit} disabled={loading} className="c-btn c-btn-cta" style={{ width: '100%', justifyContent: 'center' }}>
          {loading ? 'Checking…' : 'Sign in'}
        </button>
      </div>
    </section>
  )
}
