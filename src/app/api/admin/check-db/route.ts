import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

/**
 * Endpoint de diagnóstico para verificar la conexión a la base de datos
 * y la existencia del usuario admin en producción
 */
export async function GET() {
  try {
    const checks = {
      databaseUrl: !!process.env.DATABASE_URL,
      nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL || 'No configurado',
      prismaAvailable: !!prisma,
      environment: process.env.NODE_ENV,
    }

    // Intentar conectar a la base de datos
    let dbConnection = false
    let adminExists = false
    let adminEmail = 'admin@test.com'
    let adminDetails = null

    if (prisma) {
      try {
        // Verificar conexión
        await prisma.$connect()
        dbConnection = true

        // Verificar si existe el admin
        const admin = await prisma.user.findUnique({
          where: { email: adminEmail },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            password: true, // Necesitamos verificar si tiene contraseña
          }
        })

        if (admin) {
          adminExists = true
          // No exponer el hash completo, solo indicar si existe
          const { password: _, ...adminWithoutPassword } = admin
          adminDetails = {
            ...adminWithoutPassword,
            hasPassword: !!admin.password,
          }
        }
      } catch (dbError: any) {
        return NextResponse.json({
          success: false,
          checks,
          error: 'Error de conexión a la base de datos',
          details: dbError.message,
          suggestion: 'Verifica que DATABASE_URL esté configurado correctamente en Vercel'
        }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      checks: {
        ...checks,
        dbConnection,
        adminExists,
      },
      admin: adminDetails,
      recommendations: [
        !checks.databaseUrl && 'Configurar DATABASE_URL en Vercel',
        !checks.nextAuthSecret && 'Configurar NEXTAUTH_SECRET en Vercel',
        !dbConnection && 'Verificar que DATABASE_URL sea correcto',
        !adminExists && 'Ejecutar el seeder o crear el admin manualmente',
      ].filter(Boolean),
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 })
  }
}

/**
 * Endpoint para crear/actualizar el admin en producción
 * Requiere un token de seguridad simple para evitar abusos
 */
export async function POST(request: Request) {
  try {
    const { token, force } = await request.json().catch(() => ({}))
    
    // Token simple de seguridad (en producción debería ser más robusto)
    const expectedToken = process.env.ADMIN_CREATE_TOKEN || 'create-admin-2024'
    
    if (token !== expectedToken) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    if (!prisma) {
      return NextResponse.json(
        { error: 'Base de datos no configurada' },
        { status: 500 }
      )
    }

    const email = 'admin@test.com'
    const password = 'Admin123456'
    const hashedPassword = await bcrypt.hash(password, 12)

    // Verificar si existe
    const existing = await prisma.user.findUnique({
      where: { email }
    })

    let user
    if (existing) {
      if (!force) {
        return NextResponse.json({
          success: true,
          message: 'Admin ya existe. Usa force: true para actualizar.',
          user: {
            email: existing.email,
            name: existing.name,
            role: existing.role,
          }
        })
      }
      
      // Actualizar si existe y force es true
      user = await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          role: 'ADMIN',
          name: 'Administrador',
          phone: '+52 55 0000 0000'
        }
      })
    } else {
      // Crear si no existe
      user = await prisma.user.create({
        data: {
          email,
          name: 'Administrador',
          password: hashedPassword,
          role: 'ADMIN',
          phone: '+52 55 0000 0000',
        }
      })
    }

    // Verificar que la contraseña funciona
    const isValid = await bcrypt.compare(password, user.password!)

    return NextResponse.json({
      success: true,
      message: existing ? 'Admin actualizado' : 'Admin creado',
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
      credentials: {
        email,
        password,
      },
      passwordVerified: isValid,
    })
  } catch (error: any) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      { 
        error: 'Error al crear admin',
        details: error.message
      },
      { status: 500 }
    )
  }
}

