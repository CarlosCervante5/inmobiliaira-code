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

        try {
          // Verificar que Prisma esté disponible
          if (!prisma) {
            console.error('❌ Prisma no está inicializado. Verifica DATABASE_URL')
            throw new Error('Base de datos no configurada')
          }

          // Buscar usuario en la base de datos
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            console.log('❌ Usuario no encontrado:', credentials.email)
            return null
          }

          // Si el usuario no tiene password (OAuth users), denegar
          if (!user.password) {
            console.log('❌ Usuario sin contraseña (OAuth):', credentials.email)
            return null
          }

          // Verificar la contraseña
          console.log('🔍 Comparando contraseñas...')
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isValidPassword) {
            console.log('❌ Contraseña incorrecta para:', credentials.email)
            console.log('   Password recibida:', credentials.password.substring(0, 3) + '...')
            console.log('   Hash en DB:', user.password.substring(0, 20) + '...')
            return null
          }

          console.log('✅ Contraseña válida')

          console.log('✅ Usuario autenticado:', user.name, 'Rol:', user.role)
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          }
        } catch (error: any) {
          console.error('❌ Error en autenticación:', error)
          // En producción también mostrar detalles críticos
          console.error('Error type:', error?.constructor?.name)
          console.error('Error message:', error?.message)
          
          // Si es un error de conexión a la base de datos, loguear más detalles
          if (error?.code === 'P1001' || error?.message?.includes('DATABASE_URL')) {
            console.error('⚠️ Error de conexión a la base de datos')
            console.error('DATABASE_URL configurado:', !!process.env.DATABASE_URL)
          }
          
          // En desarrollo, mostrar más detalles del error
          if (process.env.NODE_ENV === 'development') {
            console.error('Detalles completos del error:', error)
            console.error('Stack trace:', error?.stack)
          }
          return null
        }
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
  secret: process.env.NEXTAUTH_SECRET || (() => {
    if (process.env.NODE_ENV === 'production') {
      console.error('⚠️ NEXTAUTH_SECRET no está configurado en producción. Esto causará errores de autenticación.')
    }
    return 'development-secret-key-change-in-production'
  })(),
}
