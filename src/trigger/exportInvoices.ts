import { task } from '@trigger.dev/sdk/v3'
import { createClient } from '@supabase/supabase-js'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const NAVY = rgb(45/255, 36/255, 127/255)
const RED = rgb(206/255, 45/255, 32/255)
const GREY = rgb(110/255, 110/255, 110/255)
const BLACK = rgb(0, 0, 0)

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
}
function fmtDate(d: string | null) {
  if (!d) return 'On receipt'
  try { return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return '-' }
}
function safe(s: any) { return String(s ?? '').replace(/[^\x00-\x7F]/g, '') }

export const exportInvoices = task({
  id: 'export-invoices',
  maxDuration: 3600,
  run: async (payload: { jobId: string }) => {
    const supabase = admin()
    const { data: job } = await supabase.from('export_jobs').select('*').eq('id', payload.jobId).single()
    if (!job) throw new Error('Job not found')

    const ids: string[] = job.invoice_ids || []
    const { data: invoices, error } = await supabase.from('invoices').select('*').in('id', ids).order('issued_date', { ascending: true })
    if (error) throw new Error(error.message)

    const pdf = await PDFDocument.create()
    const font = await pdf.embedFont(StandardFonts.Helvetica)
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold)

    for (const inv of (invoices || [])) {
      const page = pdf.addPage([595, 842])
      const M = 48
      let y = 842 - M
      page.drawText('Carpets', { x: M, y: y - 14, size: 20, font: bold, color: NAVY })
      page.drawText('2Go', { x: M + bold.widthOfTextAtSize('Carpets', 20), y: y - 14, size: 20, font: bold, color: RED })
      const num = safe(inv.invoice_number)
      page.drawText(num, { x: 595 - M - bold.widthOfTextAtSize(num, 14), y: y - 12, size: 14, font: bold, color: BLACK })
      page.drawText(`Issued: ${fmtDate(inv.issued_date)}`, { x: 360, y: y - 28, size: 9, font, color: GREY })
      page.drawText(`Due: ${fmtDate(inv.due_date)}`, { x: 360, y: y - 40, size: 9, font, color: GREY })

      y -= 76
      page.drawText('FROM', { x: M, y, size: 8, font, color: GREY })
      page.drawText('TO', { x: 300, y, size: 8, font, color: GREY })
      page.drawText('Carpets2Go', { x: M, y: y - 15, size: 11, font: bold, color: BLACK })
      page.drawText(safe(inv.client_name) || '-', { x: 300, y: y - 15, size: 11, font: bold, color: BLACK })
      page.drawText('Unit 1, Manchester Rd, Bolton, BL3 2ND', { x: M, y: y - 29, size: 9, font, color: GREY })
      page.drawText('01204 775 930  info@carpets2go.uk.com', { x: M, y: y - 41, size: 9, font, color: GREY })
      if (inv.client_email) page.drawText(safe(inv.client_email), { x: 300, y: y - 29, size: 9, font, color: GREY })

      y -= 72
      page.drawLine({ start: { x: M, y }, end: { x: 595 - M, y }, thickness: 1, color: rgb(0.9, 0.89, 0.87) })
      y -= 20
      page.drawText('DESCRIPTION', { x: M, y, size: 8, font, color: GREY })
      page.drawText('QTY', { x: 380, y, size: 8, font, color: GREY })
      page.drawText('UNIT', { x: 440, y, size: 8, font, color: GREY })
      page.drawText('TOTAL', { x: 595 - M - 30, y, size: 8, font, color: GREY })
      y -= 16

      for (const it of (inv.items || [])) {
        const desc = safe(it.title || it.description || 'Item')
        page.drawText(desc.slice(0, 50), { x: M, y, size: 10, font, color: BLACK })
        page.drawText(String(it.qty ?? ''), { x: 380, y, size: 10, font, color: BLACK })
        page.drawText(`GBP ${Number(it.unitPrice || 0).toFixed(2)}`, { x: 440, y, size: 10, font, color: BLACK })
        page.drawText(`GBP ${(Number(it.unitPrice || 0) * Number(it.qty || 1)).toFixed(2)}`, { x: 595 - M - 60, y, size: 10, font, color: BLACK })
        y -= 16
      }

      y -= 14
      const vatRate = inv.vat_rate ?? (inv.vat > 0 ? 20 : 0)
      page.drawText('Subtotal', { x: 380, y, size: 10, font, color: GREY })
      page.drawText(`GBP ${Number(inv.subtotal || 0).toFixed(2)}`, { x: 595 - M - 60, y, size: 10, font, color: BLACK }); y -= 15
      page.drawText(`VAT (${vatRate}%)`, { x: 380, y, size: 10, font, color: GREY })
      page.drawText(`GBP ${Number(inv.vat || 0).toFixed(2)}`, { x: 595 - M - 60, y, size: 10, font, color: BLACK }); y -= 17
      page.drawText('Total due', { x: 380, y, size: 12, font: bold, color: NAVY })
      page.drawText(`GBP ${Number(inv.total || 0).toFixed(2)}`, { x: 595 - M - 60, y, size: 12, font: bold, color: NAVY })

      if (inv.notes) { y -= 30; page.drawText('Notes: ' + safe(inv.notes).slice(0, 90), { x: M, y, size: 9, font, color: GREY }) }
    }

    const bytes = await pdf.save()
    const path = `${payload.jobId}.pdf`
    const { error: upErr } = await supabase.storage.from('exports').upload(path, Buffer.from(bytes), { contentType: 'application/pdf', upsert: true })
    if (upErr) throw new Error('Upload failed: ' + upErr.message)

    await supabase.from('export_jobs').update({
      status: 'done', file_path: path, invoice_count: (invoices || []).length, completed_at: new Date().toISOString(),
    }).eq('id', payload.jobId)

    return { ok: true, count: (invoices || []).length }
  },
})
