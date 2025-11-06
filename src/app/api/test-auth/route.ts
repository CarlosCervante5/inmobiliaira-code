import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    // Verificar conexión a BD
    const userCount = await prisma.user.count()
    
    // Buscar broker de prueba
    const broker = await prisma.user.findUnique({
      where: { email: 'broker1@test.com' }
    })

    return NextResponse.json({
      status: 'OK',
      database: {
        connected: true,
        totalUsers: userCount,
        brokerExists: !!broker,
        brokerHasPassword: !!broker?.password,
      },
      environment: {
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        nextAuthUrl: process.env.NEXTAUTH_URL,
      },
      broker: broker ? {
        email: broker.email,
        name: broker.name,
        role: broker.role,
      } : null
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'ERROR',
      message: error.message,
      code: error.code
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({
        error: 'Usuario no encontrado'
      }, { status: 404 })
    }

    if (!user.password) {
      return NextResponse.json({
        error: 'Usuario sin contraseña configurada'
      }, { status: 400 })
    }

    const isValid = await bcrypt.compare(password, user.password)

    return NextResponse.json({
      passwordValid: isValid,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}

