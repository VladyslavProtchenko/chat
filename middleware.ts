import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    console.log('start work middleware in try catch')
    console.log('middleware start')

    const accessToken = request.cookies.get('access_token')?.value;
    console.log(accessToken,'middleware access token')
    const pathname = request.nextUrl.pathname;
    if (request.nextUrl.pathname.startsWith('/api/auth/refresh-token')) {
      return NextResponse.next()
    }
  
    if (!accessToken) {
      console.log('middleware no access token')
      const redirectUrl = new URL('/api/auth/refresh-token', request.url)
      redirectUrl.searchParams.set('origin', pathname)
      return NextResponse.redirect(redirectUrl)
    }
    return NextResponse.next();
  } catch (error) {
    console.log('Middleware error: ', error)
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known|login|registration).*)',
  ],
};
