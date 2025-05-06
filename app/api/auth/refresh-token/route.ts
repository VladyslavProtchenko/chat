import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const redirectTo = url.searchParams.get('origin') || '/'
  const cookieStore = await cookies()
  cookieStore.toString()
  const refreshToken = cookieStore.get('refresh_token')?.value
  console.log('api route refresh token', refreshToken)
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { cookie: cookieStore.toString() },
    })
    
    if (!res.ok) throw new Error('Refresh failed')

    const { accessToken } = await res.json()
    console.log('response get access tokens', accessToken)
    const response = NextResponse.redirect(new URL(redirectTo, req.url))

    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 15 * 60 * 1000,
      path: '/',
    })

    return response
  } catch (e) {
    console.log('error refresh access token: ', e)
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
