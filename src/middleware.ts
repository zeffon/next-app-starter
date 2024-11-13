import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { extractToken } from '@/utils/cookies-util'

const isUserAuthenticated = (request: NextRequest) => {
  const cookies = request.headers.get('Cookie')
  if (cookies) {
    const token = extractToken(cookies)
    if (token) {
      return true
    }
  }

  return false
}

export function middleware(request: NextRequest) {
  const isAuth = isUserAuthenticated(request)
  const url = request.nextUrl
  const whitelist = ['/login', '/register']
  if (isAuth && whitelist.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if (!isAuth && !whitelist.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
