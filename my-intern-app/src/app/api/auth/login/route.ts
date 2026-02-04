import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // 1. Verifikasi email & password ke Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ message: "Login Gagal: " + error.message }, { status: 401 })
    }

    // 2. Jika sukses, buat respon dan simpan session di Cookie (Agar Middleware bisa baca)
    const response = NextResponse.json({ message: "Login Berhasil" })
    
    // Simpan token di cookie selama 1 hari
    response.cookies.set('admin_session', data.session.access_token, {
      httpOnly: true, // Aman dari hacker browser
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 jam
      path: '/',
    })

    return response

  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 })
  }
}