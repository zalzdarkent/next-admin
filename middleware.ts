import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth/jwt'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const publicRoutes = ['/auth/login', '/auth/register', '/api/auth/login', '/api/auth/register']
  
  const protectedRoutes = ['/dashboard']

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const payload = verifyToken(token)
    if (!payload) {
      const response = NextResponse.redirect(new URL('/auth/login', request.url))
      response.cookies.set('token', '', { maxAge: 0 })
      return response
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user-id', payload.userId.toString())
    requestHeaders.set('user-email', payload.email)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    })
  }

  if (isPublicRoute && pathname !== '/') {
    const token = request.cookies.get('token')?.value
    
    if (token) {
      const payload = verifyToken(token)
      if (payload) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes yang tidak perlu middleware khusus)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
