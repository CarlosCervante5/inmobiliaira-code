import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña requeridos' },
        { status: 400 }
      )
    }

    // Verificar que Prisma esté disponible
    if (!prisma) {
      return NextResponse.json(
        { 
          error: 'Base de datos no configurada',
          details: 'DATABASE_URL no está configurado'
        },
        { status: 500 }
      )
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { 
          error: 'Usuario no encontrado',
          email,
          suggestion: 'Verifica que el usuario exista en la base de datos'
        },
        { status: 404 }
      )
    }

    // Verificar contraseña
    if (!user.password) {
      return NextResponse.json(
        { 
          error: 'Usuario sin contraseña',
          email,
          suggestion: 'Este usuario fue creado con OAuth. Usa otro método de login.'
        },
        { status: 400 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { 
          error: 'Contraseña incorrecta',
          email,
          suggestion: 'Verifica que estés usando la contraseña correcta'
        },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: 'Credenciales válidas'
    })
  } catch (error: any) {
    console.error('Error en test-login:', error)
    return NextResponse.json(
      { 
        error: 'Error al verificar credenciales',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Verificar conexión a la base de datos
    if (!prisma) {
      return NextResponse.json({
        database: 'not_configured',
        message: 'DATABASE_URL no está configurado'
      })
    }

    // Contar usuarios
    const userCount = await prisma.user.count()
    const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } })
    const brokerCount = await prisma.user.count({ where: { role: 'BROKER' } })
    const clientCount = await prisma.user.count({ where: { role: 'CLIENT' } })

    // Listar usuarios de prueba
    const testUsers = await prisma.user.findMany({
      where: {
        email: {
          in: ['admin@test.com', 'broker1@test.com', 'broker2@test.com', 'cliente1@test.com', 'cliente2@test.com']
        }
      },
      select: {
        email: true,
        name: true,
        role: true,
        password: true, // Solo para verificar si existe
      }
    })

    return NextResponse.json({
      database: 'connected',
      stats: {
        totalUsers: userCount,
        admins: adminCount,
        brokers: brokerCount,
        clients: clientCount,
      },
      testUsers: testUsers.map(u => ({
        email: u.email,
        name: u.name,
        role: u.role,
        hasPassword: !!u.password,
        // No retornar la contraseña, solo indicar si existe
      })),
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      database: 'error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}

