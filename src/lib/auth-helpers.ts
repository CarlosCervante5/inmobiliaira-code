import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

/**
 * Obtiene el usuario autenticado desde:
 * 1. Sesión de NextAuth (cookies) para web
 * 2. Token Bearer para app móvil
 */
export async function getAuthenticatedUser(request: Request) {
  // Intentar obtener sesión de NextAuth primero (para web)
  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    return {
      id: session.user.id,
      email: session.user.email || '',
      name: session.user.name || '',
    }
  }

  // Si no hay sesión, intentar con token Bearer (para móvil)
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7) // Remover "Bearer "
  
  try {
    // El token es base64(userId:timestamp)
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [userId, timestamp] = decoded.split(':')
    
    if (!userId) {
      return null
    }

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    })

    if (!user) {
      return null
    }

    // Token válido
    return user
  } catch (error) {
    console.error('Error al decodificar token:', error)
    return null
  }
}

