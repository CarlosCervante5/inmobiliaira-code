import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { registerSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📝 Datos recibidos para registro:', { ...body, password: '[OCULTO]' })
    
    // Validar los datos
    const validatedData = registerSchema.parse(body)
    console.log('✅ Datos validados correctamente')
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    })

    if (existingUser) {
      console.log('⚠️  Usuario ya existe:', validatedData.email)
      return NextResponse.json(
        { message: 'El usuario ya existe con este email' },
        { status: 400 }
      )
    }

    // Hash de la contraseña
    console.log('🔐 Hasheando contraseña...')
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Crear el usuario
    console.log('💾 Creando usuario en la base de datos...')
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        phone: validatedData.phone || null,
        nss: validatedData.nss || null,
        license: validatedData.license || null,
        company: validatedData.company || null,
      },
    })

    console.log('✅ Usuario creado exitosamente:', user.email)

    return NextResponse.json(
      { 
        message: 'Usuario creado exitosamente',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('❌ Error en registro:', error)
    console.error('Detalles del error:', {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      meta: error?.meta
    })
    
    // Error de Zod (validación)
    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { 
          message: 'Datos de entrada inválidos',
          errors: error.errors 
        },
        { status: 400 }
      )
    }

    // Error de Prisma - Campo no existe
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'El email ya está registrado' },
        { status: 400 }
      )
    }

    // Error de Prisma - Campo desconocido
    if (error?.code === 'P2009' || error?.message?.includes('Unknown arg')) {
      return NextResponse.json(
        { 
          message: 'Error de configuración del servidor. El schema de base de datos necesita actualizarse.',
          detail: 'Contacta al administrador o espera a que se complete el deployment.'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Error interno del servidor',
        detail: error?.message || 'Error desconocido'
      },
      { status: 500 }
    )
  }
}

