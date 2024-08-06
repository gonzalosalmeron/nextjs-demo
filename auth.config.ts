import { NextAuthConfig } from 'next-auth'

export default {
  trustHost: true,
  session: {
    strategy: 'jwt',
    maxAge: 6 * 24 * 60 * 60, // 6 days
    updateAge: 24 * 60 * 60, // 1 day
  },
  jwt: {
    maxAge: 6 * 24 * 60 * 60, // 6 days
  },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [],
} satisfies NextAuthConfig
