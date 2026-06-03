import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const supabase = createAdminClient()
    const { data: job } = await supabase.from('export_jobs').select('*').eq('id', id).single()
    if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    let url = null
    if (job.status === 'done' && job.file_path) {
      const { data } = await supabase.storage.from('exports').createSignedUrl(job.file_path, 60 * 60)
      url = data?.signedUrl || null
    }
    return NextResponse.json({ status: job.status, count: job.invoice_count, error: job.error, url })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
