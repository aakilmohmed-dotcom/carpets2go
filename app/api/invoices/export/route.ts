import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { tasks } from '@trigger.dev/sdk/v3'
import type { exportInvoices } from '@/src/trigger/exportInvoices'

export async function POST(req: Request) {
  try {
    const { ids } = await req.json()
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No invoices selected' }, { status: 400 })
    }
    const supabase = createAdminClient()
    const { data: job, error } = await supabase
      .from('export_jobs')
      .insert({ status: 'processing', invoice_ids: ids })
      .select().single()
    if (error || !job) return NextResponse.json({ error: error?.message || 'Could not create job' }, { status: 400 })

    await tasks.trigger<typeof exportInvoices>('export-invoices', { jobId: job.id })

    return NextResponse.json({ jobId: job.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
