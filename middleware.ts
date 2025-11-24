import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get user from cookie/header (in production, you'd validate JWT)
  // For now, we'll let the client-side auth handle it
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/super-admin/:path*',
    '/profil/:path*',
    '/riwayat/:path*',
    '/checkout/:path*',
  ],
}
