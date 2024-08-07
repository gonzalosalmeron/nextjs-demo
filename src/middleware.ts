import authConfig from '../auth.config'
import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

const apiAuthPrefixUrls = ['/auth/signin', '/auth/signup']
const protectedUrl = '/dashboard'

export default auth((req) => {
  const { nextUrl, auth } = req
  const isLoggedIn = !!auth

  const isAuthUrl = apiAuthPrefixUrls.includes(nextUrl.pathname)
  if (nextUrl.pathname === '/')
    return NextResponse.redirect(new URL(protectedUrl, nextUrl))
  if (isAuthUrl && isLoggedIn)
    return NextResponse.redirect(new URL(protectedUrl, nextUrl))
  if (nextUrl.pathname.includes(protectedUrl) && !isLoggedIn)
    return NextResponse.redirect(new URL('/auth/signin', nextUrl))

  return NextResponse.next()
})

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.png|.avif).*)'],
}
