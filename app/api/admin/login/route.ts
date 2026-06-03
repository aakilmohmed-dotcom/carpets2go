import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    if (password && password === process.env.ADMIN_PASSWORD) {
      const res = NextResponse.json({ ok: true })
      res.cookies.set('c2g_admin', '1', {
        httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8,
      })
      return res
    }
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
