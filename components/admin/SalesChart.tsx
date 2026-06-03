'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format, startOfWeek } from 'date-fns'

const NAVY = '#2D247F', BLUE = '#4EACEA'

type Gran = 'year' | 'month' | 'week'

export default function SalesChart({ invoices }: { invoices: any[] }) {
  const [gran, setGran] = useState<Gran>('month')
  const [paidOnly, setPaidOnly] = useState(true)
  const [vatView, setVatView] = useState<'20'|'0'>('20')

  const data = useMemo(() => {
    const rows = invoices.filter(i => i.issued_date && (!paidOnly || i.status === 'paid'))
    const buckets: Record<string, { key: string; label: string; vat20: number; vat0: number }> = {}

    for (const inv of rows) {
      const d = new Date(inv.issued_date)
      let key: string, label: string
      if (gran === 'year') { key = format(d, 'yyyy'); label = key }
      else if (gran === 'month') { key = format(d, 'yyyy-MM'); label = format(d, 'MMM yy') }
      else { const w = startOfWeek(d, { weekStartsOn: 1 }); key = format(w, 'yyyy-MM-dd'); label = format(w, 'dd MMM') }

      if (!buckets[key]) buckets[key] = { key, label, vat20: 0, vat0: 0 }
      const rate = inv.vat_rate ?? (inv.vat > 0 ? 20 : 0)
      const amt = Number(inv.total || 0)
      if (Number(rate) === 20) buckets[key].vat20 += amt
      else buckets[key].vat0 += amt
    }
    return Object.values(buckets).sort((a, b) => a.key.localeCompare(b.key))
      .map(b => ({ ...b, vat20: Math.round(b.vat20 * 100) / 100, vat0: Math.round(b.vat0 * 100) / 100 }))
  }, [invoices, gran, paidOnly])

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border-2)', cursor: 'pointer',
    background: active ? NAVY : 'transparent', color: active ? '#fff' : 'var(--text-2)',
    fontSize: 13, fontWeight: 600, fontFamily: 'var(--c-sans)',
  })

  return (
    <div className="c-card" style={{ padding: 24, marginBottom: 30 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <h2 style={{ fontSize: 22 }}>Sales over time</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['week','month','year'] as Gran[]).map(g => (
            <button key={g} style={tabStyle(gran === g)} onClick={() => setGran(g)}>{g[0].toUpperCase() + g.slice(1)}</button>
          ))}
          <button style={tabStyle(paidOnly)} onClick={() => setPaidOnly(p => !p)}>{paidOnly ? 'Paid only' : 'All invoices'}</button>
          <span style={{ width: 1, height: 22, background: 'var(--border-2)' }} />
          <button style={tabStyle(vatView === '20')} onClick={() => setVatView('20')}>20% VAT</button>
          <button style={tabStyle(vatView === '0')} onClick={() => setVatView('0')}>0% VAT</button>
        </div>
      </div>

      {data.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)' }}>No sales data yet.</div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: 'var(--text-3)' }} />
            <YAxis tick={{ fontSize: 12, fill: 'var(--text-3)' }} tickFormatter={(v) => `£${v}`} />
            <Tooltip formatter={(v: any) => `£${Number(v).toFixed(2)}`} contentStyle={{ borderRadius: 10, border: '1px solid var(--border)', fontFamily: 'var(--c-sans)', fontSize: 13 }} />
            <Line type="monotone" dataKey={vatView === '20' ? 'vat20' : 'vat0'} name={vatView === '20' ? '20% VAT' : '0% VAT'} stroke={vatView === '20' ? NAVY : BLUE} strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
