import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the protocol and host from the request
  const protocol = request.headers.get("x-forwarded-proto") || "http"
  const host = request.headers.get("host") || "localhost:3000"
  
  // Set NEXTAUTH_URL if it's not already set
  if (!process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = `${protocol}://${host}`
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

