'use client'
import { useState } from 'react'
import { format, differenceInDays } from 'date-fns'
import SalesChart from './SalesChart'

interface LineItem { title: string; description: string; qty: number; unitPrice: number }

function genNumber() {
  return `C2G-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
}

const NAVY = '#2D247F', RED = '#CE2D20', BLUE = '#4EACEA'

function generatePDF(inv: any) {
  const items = (inv.items || []) as LineItem[]
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Invoice ${inv.invoice_number}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#111;font-size:13px;padding:48px;max-width:720px;margin:0 auto}
  .logo{font-size:22px;font-weight:700;letter-spacing:-0.02em;color:${NAVY}}
  .logo span{color:${RED}}
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px}
  .inv-number{font-size:20px;font-weight:700;margin-bottom:4px}
  .meta-row{font-size:12px;color:#666;margin-bottom:2px}
  .parties{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid #E5E3DD}
  .party-label{font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:#999;margin-bottom:6px;font-weight:600}
  .party-name{font-weight:600;font-size:14px;margin-bottom:2px}
  .party-detail{font-size:12px;color:#666}
  table{width:100%;border-collapse:collapse;margin-bottom:24px}
  th{text-align:left;padding:8px 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#999;border-bottom:1px solid #E5E3DD;font-weight:600;background:#F7F5F0}
  td{padding:11px 12px;border-bottom:1px solid #F0EDE6;font-size:13px}
  th:last-child,td:last-child{text-align:right}
  .totals{margin-left:auto;width:240px}
  .totals-row{display:flex;justify-content:space-between;padding:4px 0;font-size:13px}
  .totals-row.total{font-weight:700;font-size:15px;border-top:1px solid #E5E3DD;margin-top:6px;padding-top:10px;color:${NAVY}}
  @media print{body{padding:24px}}
</style></head><body>
<div class="header">
  <div class="logo">Carpets<span>2Go</span></div>
  <div style="text-align:right">
    <div class="inv-number">${inv.invoice_number}</div>
    <div class="meta-row">Issued: ${inv.issued_date ? format(new Date(inv.issued_date), 'dd MMM yyyy') : '—'}</div>
    <div class="meta-row">Due: ${inv.due_date ? format(new Date(inv.due_date), 'dd MMM yyyy') : 'On receipt'}</div>
  </div>
</div>
<div class="parties">
  <div>
    <div class="party-label">From</div>
    <div class="party-name">Carpets2Go</div>
    <div class="party-detail">Unit 1, Manchester Rd, Bolton, BL3 2ND</div>
    <div class="party-detail">01204 775 930 · info@carpets2go.uk.com</div>
  </div>
  <div>
    <div class="party-label">To</div>
    <div class="party-name">${inv.client_name || '—'}</div>
    ${inv.client_email ? `<div class="party-detail">${inv.client_email}</div>` : ''}
  </div>
</div>
<table>
  <thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Total</th></tr></thead>
  <tbody>
    ${items.map(item => `<tr>
      <td><strong>${item.title || item.description || 'Item'}</strong>${item.description && item.title ? `<br><span style="color:#888;font-size:11px">${item.description}</span>` : ''}</td>
      <td>${item.qty}</td>
      <td>£${Number(item.unitPrice).toFixed(2)}</td>
      <td>£${(item.qty * item.unitPrice).toFixed(2)}</td>
    </tr>`).join('')}
  </tbody>
</table>
<div class="totals">
  <div class="totals-row"><span>Subtotal</span><span>£${Number(inv.subtotal||0).toFixed(2)}</span></div>
  <div class="totals-row"><span>VAT (20%)</span><span>£${Number(inv.vat||0).toFixed(2)}</span></div>
  <div class="totals-row total"><span>Total due</span><span>£${Number(inv.total||0).toFixed(2)}</span></div>
</div>
${inv.notes ? `<div style="margin-top:40px;padding-top:24px;border-top:1px solid #E5E3DD;font-size:12px;color:#666;line-height:1.6"><strong>Notes</strong><br>${inv.notes}</div>` : ''}
</body></html>`
  const w = window.open('', '_blank')
  if (w) { w.document.write(html); w.document.close() }
}

const STATUS_COLORS: Record<string, string> = { draft: '#999', sent: BLUE, paid: '#15803D', overdue: RED }

function getDueDate(days: number) {
  if (days === 0) return ''
  return new Date(Date.now() + days * 86400000).toISOString().slice(0, 10)
}
const DUE_PRESETS = [
  { label: 'On receipt', days: 0 }, { label: 'Net 7', days: 7 },
  { label: 'Net 14', days: 14 }, { label: 'Net 30', days: 30 }, { label: 'Custom', days: -1 },
]

export default function InvoiceHub({ initialInvoices }: { initialInvoices: any[] }) {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [view, setView] = useState<'invoices' | 'sales'>('invoices')
  const [viewInv, setViewInv] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [sending, setSending] = useState<string | null>(null)

  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [items, setItems] = useState<LineItem[]>([{ title: '', description: '', qty: 1, unitPrice: 0 }])
  const [dueDays, setDueDays] = useState(14)
  const [customDue, setCustomDue] = useState('')
  const [notes, setNotes] = useState('')
  const [vatPct, setVatPct] = useState(20)

  // Filters + selection for accountant export
  const [filterVat, setFilterVat] = useState<'all'|'0'|'20'>('all')
  const [filterMonth, setFilterMonth] = useState('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // VAT-inclusive: entered prices already include VAT
  const total = items.reduce((s, i) => s + (i.qty || 1) * (i.unitPrice || 0), 0)
  const vatAmt = total * (vatPct / (100 + vatPct))
  const subtotal = total - vatAmt
  const dueDate = dueDays === -1 ? customDue : getDueDate(dueDays)

  const addItem = () => setItems(p => [...p, { title: '', description: '', qty: 1, unitPrice: 0 }])
  const updItem = (i: number, k: keyof LineItem, v: any) => setItems(p => p.map((it, idx) => idx === i ? { ...it, [k]: v } : it))
  const delItem = (i: number) => setItems(p => p.filter((_, idx) => idx !== i))
  const resetForm = () => { setClientName(''); setClientEmail(''); setItems([{ title: '', description: '', qty: 1, unitPrice: 0 }]); setDueDays(14); setCustomDue(''); setNotes(''); setVatPct(20) }

  const openEdit = (inv: any) => {
    setEditingId(inv.id)
    setClientName(inv.client_name || '')
    setClientEmail(inv.client_email || '')
    setItems((inv.items && inv.items.length ? inv.items : [{ title: '', description: '', qty: 1, unitPrice: 0 }]))
    setVatPct(inv.vat_rate ?? (inv.vat > 0 ? 20 : 0))
    setNotes(inv.notes || '')
    setDueDays(14); setCustomDue(inv.due_date || '')
    setCreating(true)
  }

  const saveInvoice = async () => {
    if (!clientName.trim()) { alert('Enter a client name'); return }
    if (items.every(i => !i.title && !i.unitPrice)) { alert('Add at least one line item'); return }
    setSaving(true)
    if (editingId) {
      const fields = { id: editingId, client_name: clientName, client_email: clientEmail, items, subtotal, vat: vatAmt, vat_rate: vatPct, total, due_date: dueDate || null, notes: notes || null }
      const res = await fetch('/api/invoices/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) })
      const data = await res.json()
      if (!res.ok) { alert('Failed: ' + (data.error || 'Unknown')); setSaving(false); return }
      setInvoices(p => p.map(i => i.id === editingId ? { ...i, ...data } : i))
      setSaving(false); setCreating(false); setEditingId(null); resetForm()
    } else {
      const body = {
        invoice_number: genNumber(), client_name: clientName, client_email: clientEmail,
        items, subtotal, vat: vatAmt, vat_rate: vatPct, total, due_date: dueDate || null, notes: notes || null,
        status: 'draft', issued_date: new Date().toISOString().slice(0, 10),
      }
      const res = await fetch('/api/invoices/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) { alert('Failed: ' + (data.error || 'Unknown')); setSaving(false); return }
      setInvoices(p => [data, ...p]); setSaving(false); setCreating(false); resetForm()
    }
  }

  const sendInvoice = async (inv: any) => {
    if (sending) return
    if (!inv.client_email) { alert('This invoice has no client email. Add one when creating it.'); return }
    setSending(inv.id)
    const res = await fetch('/api/invoices/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: inv.id }) })
    const data = await res.json()
    if (res.ok) {
      setInvoices(p => p.map(i => i.id === inv.id ? { ...i, status: 'sent' } : i))
      alert(data.emailEnabled ? `Sent to ${data.sentTo}` : `Marked as sent to ${data.sentTo}.\\n(Email dispatch isn't enabled yet — set up the email provider to actually send.)`)
    } else alert(data.error || 'Failed')
    setSending(null)
  }

  const markPaid = async (inv: any) => {
    await fetch('/api/invoices/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: inv.id, status: 'paid' }) })
    setInvoices(p => p.map(i => i.id === inv.id ? { ...i, status: 'paid', paid_at: new Date().toISOString() } : i))
  }

  const markUnpaid = async (inv: any) => {
    await fetch('/api/invoices/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: inv.id, status: 'sent', paid_at: null }) })
    setInvoices(p => p.map(i => i.id === inv.id ? { ...i, status: 'sent', paid_at: null } : i))
  }

  const deleteInvoice = async (inv: any) => {
    if (inv.status === 'paid') { alert('Paid invoices cannot be deleted.'); return }
    if (!confirm(`Delete ${inv.invoice_number}?`)) return
    const res = await fetch(`/api/invoices/delete?id=${inv.id}`, { method: 'DELETE' })
    if (res.ok) setInvoices(p => p.filter(i => i.id !== inv.id)); else alert('Failed to delete')
  }

  const logout = async () => { document.cookie = 'c2g_admin=; Max-Age=0; path=/'; window.location.reload() }

  // Build month options from invoices
  const monthOptions = Array.from(new Set(invoices
    .filter(i => i.issued_date)
    .map(i => format(new Date(i.issued_date), 'yyyy-MM'))))
    .sort().reverse()

  const filtered = invoices.filter(inv => {
    if (filterVat !== 'all' && String(inv.vat_rate ?? (inv.vat > 0 ? 20 : 0)) !== filterVat) return false
    if (filterMonth !== 'all') {
      if (!inv.issued_date) return false
      if (format(new Date(inv.issued_date), 'yyyy-MM') !== filterMonth) return false
    }
    return true
  })

  const toggleSelect = (id: string) => setSelected(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })
  const allFilteredSelected = filtered.length > 0 && filtered.every(i => selected.has(i.id))
  const toggleSelectAll = () => setSelected(prev => {
    if (allFilteredSelected) { const n = new Set(prev); filtered.forEach(i => n.delete(i.id)); return n }
    const n = new Set(prev); filtered.forEach(i => n.add(i.id)); return n
  })

  const exportCSV = () => {
    const rows = filtered.filter(i => selected.has(i.id))
    if (rows.length === 0) { alert('Select at least one invoice to export.'); return }
    const headers = ['Invoice','Issued','Client','Email','Net','VAT rate','VAT amount','Total','Status']
    const esc = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const lines = rows.map(i => [
      i.invoice_number,
      i.issued_date ? format(new Date(i.issued_date), 'dd/MM/yyyy') : '',
      i.client_name, i.client_email || '',
      Number(i.subtotal||0).toFixed(2),
      `${i.vat_rate ?? (i.vat > 0 ? 20 : 0)}%`,
      Number(i.vat||0).toFixed(2),
      Number(i.total||0).toFixed(2),
      i.status,
    ].map(esc).join(','))
    const csv = [headers.map(esc).join(','), ...lines].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `carpets2go-invoices-${filterMonth !== 'all' ? filterMonth : 'all'}${filterVat !== 'all' ? '-vat'+filterVat : ''}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (i.total || 0), 0)
  const totalOut = invoices.filter(i => i.status === 'sent').reduce((s, i) => s + (i.total || 0), 0)

  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-2)', background: 'var(--bg-2)', color: 'var(--text-1)', fontSize: 14, fontFamily: 'var(--c-sans)', outline: 'none' }

  return (
    <>
    {/* Admin nav bar */}
    <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="c-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 32px', gap: 16, flexWrap: 'wrap' }}>
        <img src="/images/logo.png" alt="Carpets2Go" style={{ height: 34, width: 'auto', display: 'block' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {(['invoices','sales'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--c-sans)', fontSize: 14, fontWeight: 600,
              background: view === v ? NAVY : 'transparent',
              color: view === v ? '#fff' : 'var(--text-2)',
            }}>{v === 'invoices' ? 'Invoices' : 'Sales'}</button>
          ))}
        </div>
        <button onClick={logout} className="c-btn c-btn-ghost" style={{ fontSize: 13 }}>Log out</button>
      </div>
    </div>

    <section className="c-wrap" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 30 }}>
        <h1 style={{ fontSize: 'clamp(30px,4vw,44px)' }}>{view === 'sales' ? 'Sales' : 'Invoices'}</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          {view === 'invoices' && <button onClick={() => setCreating(true)} className="c-btn c-btn-cta">+ New invoice</button>}
        </div>
      </div>

      {/* ── SALES VIEW ── */}
      {view === 'sales' && (
        <SalesChart invoices={invoices} />
      )}

      {/* ── INVOICES VIEW ── */}
      {view === 'invoices' && (<>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14, marginBottom: 30 }}>
        {[
          { l: 'Total invoices', v: invoices.length, c: 'var(--text-1)' },
          { l: 'Collected', v: `£${totalPaid.toFixed(2)}`, c: '#15803D' },
          { l: 'Outstanding', v: `£${totalOut.toFixed(2)}`, c: BLUE },
        ].map(s => (
          <div key={s.l} className="c-card" style={{ padding: 20 }}>
            <div style={{ fontFamily: 'var(--c-serif)', fontSize: 28, color: s.c, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Filters + export */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
        <select value={filterVat} onChange={e => setFilterVat(e.target.value as any)} style={{ ...inputStyle, width: 'auto' }}>
          <option value="all">All VAT rates</option>
          <option value="0">0% VAT</option>
          <option value="20">20% VAT</option>
        </select>
        <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
          <option value="all">All months</option>
          {monthOptions.map(m => <option key={m} value={m}>{format(new Date(m + '-01'), 'MMMM yyyy')}</option>)}
        </select>
        <span style={{ fontSize: 13, color: 'var(--text-3)' }}>{filtered.length} invoice{filtered.length !== 1 ? 's' : ''} · {selected.size} selected</span>
        <button onClick={exportCSV} className="c-btn c-btn-ghost" style={{ marginLeft: 'auto' }}>Download CSV for accountant</button>
      </div>

      {/* Table */}
      <div className="c-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}><input type="checkbox" checked={allFilteredSelected} onChange={toggleSelectAll} /></th>
                {['Invoice', 'Client', 'Due', 'Amount', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-3)', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => {
                const overdue = inv.status !== 'paid' && inv.due_date && differenceInDays(new Date(), new Date(inv.due_date)) > 0
                const st = overdue ? 'overdue' : inv.status
                return (
                  <tr key={inv.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px' }}><input type="checkbox" checked={selected.has(inv.id)} onChange={() => toggleSelect(inv.id)} /></td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, fontWeight: 600 }}>{inv.invoice_number}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 500 }}>{inv.client_name}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: overdue ? RED : 'var(--text-2)' }}>{inv.due_date ? format(new Date(inv.due_date), 'dd MMM yyyy') : 'On receipt'}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: 700 }}>£{Number(inv.total || 0).toFixed(2)}</td>
                    <td style={{ padding: '12px 16px' }}><span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: STATUS_COLORS[st] }}>{st}</span></td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <button onClick={() => setViewInv(inv)} className="c-btn c-btn-ghost" style={{ fontSize: 11, padding: '6px 10px', minHeight: 0 }}>View</button>
                        <button onClick={() => generatePDF(inv)} className="c-btn c-btn-ghost" style={{ fontSize: 11, padding: '6px 10px', minHeight: 0 }}>PDF</button>
                        {inv.status === 'draft' && <button onClick={() => openEdit(inv)} className="c-btn c-btn-ghost" style={{ fontSize: 11, padding: '6px 10px', minHeight: 0 }}>Edit</button>}
                        {inv.status === 'draft' && <button onClick={() => sendInvoice(inv)} disabled={sending === inv.id} className="c-btn c-btn-cta" style={{ fontSize: 11, padding: '6px 10px', minHeight: 0 }}>{sending === inv.id ? '…' : 'Send'}</button>}
                        {inv.status === 'sent' && <button onClick={() => sendInvoice(inv)} disabled={sending === inv.id} className="c-btn c-btn-cta" style={{ fontSize: 11, padding: '6px 10px', minHeight: 0 }}>{sending === inv.id ? '…' : 'Resend'}</button>}
                        {inv.status !== 'paid' && <button onClick={() => markPaid(inv)} className="c-btn c-btn-ghost" style={{ fontSize: 11, padding: '6px 10px', minHeight: 0 }}>Mark paid</button>}
                        {inv.status === 'paid' && <button onClick={() => markUnpaid(inv)} className="c-btn c-btn-ghost" style={{ fontSize: 11, padding: '6px 10px', minHeight: 0 }}>Mark unpaid</button>}
                        {inv.status !== 'paid' && <button onClick={() => deleteInvoice(inv)} className="c-btn c-btn-ghost" style={{ fontSize: 11, padding: '6px 10px', minHeight: 0, color: RED }}>Delete</button>}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)' }}>No invoices match the current filter.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create modal */}
      {creating && (
        <div onClick={() => setCreating(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(13,10,31,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 24, overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', borderRadius: 16, width: '100%', maxWidth: 720, marginTop: 30, padding: 28 }}>
            <h2 style={{ fontSize: 24, marginBottom: 20 }}>{editingId ? 'Edit invoice' : 'New invoice'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
              <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Client name *</label><input style={inputStyle} value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Mr & Mrs Smith" /></div>
              <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Client email</label><input style={inputStyle} value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="customer@email.com" /></div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', display: 'block', marginBottom: 8 }}>Line items <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(prices include VAT)</span></label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 110px 28px', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-3)' }}>Description</span>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-3)', textAlign: 'center' }}>Qty</span>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-3)', textAlign: 'right' }}>Cost (inc. VAT)</span>
                <span />
              </div>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 110px 28px', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                  <input style={inputStyle} placeholder="Description" value={item.title} onChange={e => updItem(i, 'title', e.target.value)} />
                  <input style={{ ...inputStyle, textAlign: 'center' }} type="number" min="1" value={item.qty} onChange={e => updItem(i, 'qty', parseInt(e.target.value) || 1)} />
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--text-3)', pointerEvents: 'none' }}>£</span>
                    <input style={{ ...inputStyle, textAlign: 'right', paddingLeft: 22 }} type="number" placeholder="0.00" value={item.unitPrice || ''} onChange={e => updItem(i, 'unitPrice', parseFloat(e.target.value) || 0)} />
                  </div>
                  <button onClick={() => delItem(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', fontSize: 18 }}>×</button>
                </div>
              ))}
              <button onClick={addItem} className="c-btn c-btn-ghost" style={{ fontSize: 13, marginTop: 4 }}>+ Add line item</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Payment terms</label>
                <select style={inputStyle} value={dueDays} onChange={e => setDueDays(Number(e.target.value))}>{DUE_PRESETS.map(p => <option key={p.days} value={p.days}>{p.label}</option>)}</select>
                {dueDays === -1 && <input type="date" style={{ ...inputStyle, marginTop: 6 }} value={customDue} onChange={e => setCustomDue(e.target.value)} />}
              </div>
              <div><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>VAT rate</label>
                <select style={inputStyle} value={vatPct} onChange={e => setVatPct(Number(e.target.value))}>
                  <option value={0}>0% (no VAT)</option>
                  <option value={20}>20%</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 18 }}><label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Notes</label><textarea style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Thank you for your business…" /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Total: <span style={{ fontFamily: 'monospace', color: NAVY }}>£{total.toFixed(2)}</span> <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 400 }}>including {vatPct}% VAT (£{vatAmt.toFixed(2)})</span></div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => { setCreating(false); setEditingId(null); resetForm() }} className="c-btn c-btn-ghost">Cancel</button>
                <button onClick={saveInvoice} disabled={saving} className="c-btn c-btn-cta">{saving ? 'Saving…' : 'Save invoice'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View modal */}
      {viewInv && (
        <div onClick={() => setViewInv(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(13,10,31,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 24, overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', borderRadius: 16, width: '100%', maxWidth: 640, marginTop: 30, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div><h2 style={{ fontSize: 22 }}>{viewInv.invoice_number}</h2><p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 2 }}>{viewInv.client_name}{viewInv.client_email ? ` · ${viewInv.client_email}` : ''}</p></div>
              <button onClick={() => generatePDF(viewInv)} className="c-btn c-btn-ghost" style={{ fontSize: 13 }}>Download PDF</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 16 }}>
              <thead><tr style={{ textAlign: 'left', color: 'var(--text-3)' }}><th style={{ padding: 8 }}>Item</th><th style={{ padding: 8 }}>Qty</th><th style={{ padding: 8, textAlign: 'right' }}>Total</th></tr></thead>
              <tbody>{(viewInv.items || []).map((it: any, i: number) => (<tr key={i} style={{ borderTop: '1px solid var(--border)' }}><td style={{ padding: 8 }}>{it.title || it.description}</td><td style={{ padding: 8 }}>{it.qty}</td><td style={{ padding: 8, textAlign: 'right', fontFamily: 'monospace' }}>£{(Number(it.unitPrice || 0) * Number(it.qty || 1)).toFixed(2)}</td></tr>))}</tbody>
            </table>
            <div style={{ textAlign: 'right', fontSize: 16, fontWeight: 700 }}>Total: <span style={{ fontFamily: 'monospace', color: NAVY }}>£{Number(viewInv.total || 0).toFixed(2)}</span></div>
            {viewInv.notes && <div style={{ marginTop: 16, padding: 14, background: 'var(--surface-2)', borderRadius: 10, fontSize: 13, color: 'var(--text-2)' }}>{viewInv.notes}</div>}
          </div>
        </div>
      )}
    </>)}
    </section>
    </>
  )
}