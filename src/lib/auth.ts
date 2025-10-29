import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { prisma } from './db'
import { loginSchema } from './validations'

export const authOptions: NextAuthOptions = {
  // No usar adapter para modo demo sin base de datos
  providers: [
    // Google Provider solo si las credenciales están configuradas
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔐 Intentando autenticar:', credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Credenciales faltantes')
          return null
        }

        // Usuarios de prueba para MVP sin base de datos
        const testUsers = [
          {
            email: 'test@example.com',
            password: 'password123',
            user: {
              id: '1',
              email: 'test@example.com',
              name: 'Usuario de Prueba',
              role: 'CLIENT',
              image: null,
            }
          },
          {
            email: 'broker@example.com',
            password: 'password123',
            user: {
              id: '2',
              email: 'broker@example.com',
              name: 'Bróker de Prueba',
              role: 'BROKER',
              image: null,
            }
          }
        ]

        const testUser = testUsers.find(u => 
          u.email === credentials.email && u.password === credentials.password
        )

        if (testUser) {
          console.log('✅ Usuario autenticado:', testUser.user.name)
          return testUser.user
        }

        console.log('❌ Credenciales inválidas para:', credentials.email)
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-key-change-in-production',
}
