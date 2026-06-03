import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { id, ...fields } = await req.json()
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    if (fields.status === 'paid' && !fields.paid_at) fields.paid_at = new Date().toISOString()
    const supabase = createAdminClient()
    const { data, error } = await supabase.from('invoices').update(fields).eq('id', id).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
