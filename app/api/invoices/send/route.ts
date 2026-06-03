import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { invoiceId } = await req.json()
    const supabase = createAdminClient()
    const { data: inv, error: fErr } = await supabase.from('invoices').select('*').eq('id', invoiceId).single()
    if (fErr || !inv) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    if (!inv.client_email) return NextResponse.json({ error: 'No client email on this invoice' }, { status: 400 })

    // ── EMAIL SENDING NOT YET ENABLED ──
    // Once a provider (e.g. Resend) + verified carpets2go.uk.com domain are set up,
    // send the email here. For now we record it as sent so the workflow is testable.
    const EMAIL_ENABLED = false
    if (EMAIL_ENABLED) {
      // TODO: dispatch email via provider using inv.client_email
    }

    const { error } = await supabase.from('invoices')
      .update({ status: 'sent', sent_at: new Date().toISOString() })
      .eq('id', invoiceId)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({
      ok: true,
      sentTo: inv.client_email,
      emailEnabled: EMAIL_ENABLED,
      note: EMAIL_ENABLED ? 'Email sent' : 'Marked as sent (email dispatch not yet enabled)',
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
