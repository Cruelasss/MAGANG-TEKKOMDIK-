import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_session')
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin') || 
                      request.nextUrl.pathname.startsWith('/api/admin')

  // Jika mencoba masuk ke halaman admin tanpa login, tendang ke halaman login
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Jika sudah login tapi mau ke halaman login lagi, arahkan ke dashboard
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}