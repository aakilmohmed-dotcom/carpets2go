import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase'
import AdminLogin from '@/components/admin/AdminLogin'
import InvoiceHub from '@/components/admin/InvoiceHub'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const authed = cookies().get('c2g_admin')?.value === '1'
  if (!authed) return <AdminLogin />

  const supabase = createAdminClient()
  const { data: invoices } = await supabase
    .from('invoices').select('*').order('created_at', { ascending: false })

  return <InvoiceHub initialInvoices={invoices || []} />
}
