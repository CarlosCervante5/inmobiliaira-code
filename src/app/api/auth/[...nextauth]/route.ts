import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// Verificar que las variables de entorno estén configuradas
if (!process.env.NEXTAUTH_SECRET) {
  console.warn('⚠️  NEXTAUTH_SECRET no está configurado. Usando valor por defecto para desarrollo.')
}

if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === 'production') {
  console.warn('⚠️  NEXTAUTH_URL no está configurado en producción.')
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

