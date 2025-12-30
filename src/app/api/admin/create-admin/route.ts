import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    // Verificar que Prisma esté disponible
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
      // Actualizar si existe
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
      adminPanel: '/admin'
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

