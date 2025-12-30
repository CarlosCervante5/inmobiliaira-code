import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  console.log('[GET /api/admin/service-providers] Iniciando request')
  
  try {
    console.log('[GET /api/admin/service-providers] Verificando sesión...')
    const session = await getServerSession(authOptions)
    console.log('[GET /api/admin/service-providers] Sesión:', session ? { userId: session.user?.id, role: session.user?.role } : 'null')
    
    if (!session || session.user?.role !== 'ADMIN') {
      console.log('[GET /api/admin/service-providers] ❌ No autorizado - sesión:', !!session, 'role:', session?.user?.role)
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    console.log('[GET /api/admin/service-providers] ✅ Sesión válida, consultando base de datos...')
    
    // Obtener proveedores sin relaciones (más simple y robusto)
    const providers = await prisma.serviceProvider.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log('[GET /api/admin/service-providers] ✅ Proveedores obtenidos:', providers.length)
    console.log('[GET /api/admin/service-providers] Primer proveedor (muestra):', providers[0] ? {
      id: providers[0].id,
      name: providers[0].name,
      email: providers[0].email,
      hasAvailability: !!providers[0].availability,
      availabilityType: typeof providers[0].availability,
      createdAt: providers[0].createdAt,
      updatedAt: providers[0].updatedAt
    } : 'No hay proveedores')

    console.log('[GET /api/admin/service-providers] Iniciando serialización JSON...')
    
    // Forzar serialización usando JSON para evitar problemas con tipos de Prisma
    // Esto convierte todos los tipos especiales de Prisma a tipos JSON estándar
    let serializedProviders
    try {
      const jsonString = JSON.stringify(providers)
      console.log('[GET /api/admin/service-providers] ✅ JSON.stringify exitoso, longitud:', jsonString.length)
      
      serializedProviders = JSON.parse(jsonString).map((provider: any) => {
        // Agregar servicios vacíos y asegurar que todos los campos estén presentes
        return {
          ...provider,
          services: []
        }
      })
      console.log('[GET /api/admin/service-providers] ✅ JSON.parse exitoso, proveedores serializados:', serializedProviders.length)
    } catch (serializeError: any) {
      console.error('[GET /api/admin/service-providers] ❌ Error en serialización JSON:', serializeError)
      console.error('[GET /api/admin/service-providers] Error message:', serializeError.message)
      console.error('[GET /api/admin/service-providers] Error stack:', serializeError.stack)
      throw serializeError
    }

    console.log('[GET /api/admin/service-providers] Preparando respuesta...')
    const response = NextResponse.json(serializedProviders)
    console.log('[GET /api/admin/service-providers] ✅ Respuesta preparada exitosamente')
    
    return response
  } catch (error: any) {
    console.error('[GET /api/admin/service-providers] ❌ ERROR GENERAL:', error)
    console.error('[GET /api/admin/service-providers] Error name:', error?.name)
    console.error('[GET /api/admin/service-providers] Error message:', error?.message)
    console.error('[GET /api/admin/service-providers] Error code:', error?.code)
    console.error('[GET /api/admin/service-providers] Error stack:', error?.stack)
    
    // Log adicional para errores de Prisma
    if (error?.code) {
      console.error('[GET /api/admin/service-providers] Prisma error code:', error.code)
    }
    
    return NextResponse.json(
      { 
        error: 'Error al obtener profesionales', 
        details: error.message,
        code: error.code,
        name: error.name,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      name,
      email,
      phone,
      address,
      bio,
      specialties,
      experience,
      rating,
      totalReviews,
      isActive,
      isVerified,
      availability,
      serviceIds,
    } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Nombre, email y teléfono son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const existingProvider = await prisma.serviceProvider.findUnique({
      where: { email }
    })

    if (existingProvider) {
      return NextResponse.json(
        { error: 'Ya existe un proveedor con este email' },
        { status: 400 }
      )
    }

    // Crear el proveedor
    const provider = await prisma.serviceProvider.create({
      data: {
        name,
        email,
        phone,
        address: address || null,
        bio: bio || null,
        specialties: specialties || [],
        experience: experience ? parseInt(experience) : null,
        rating: rating ? parseFloat(rating) : null,
        totalReviews: totalReviews ? parseInt(totalReviews) : 0,
        isActive: isActive !== undefined ? isActive : true,
        isVerified: isVerified !== undefined ? isVerified : false,
        availability: availability || null,
        services: {
          connect: serviceIds ? serviceIds.map((id: string) => ({ id })) : []
        },
      },
      include: {
        services: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    return NextResponse.json(provider, { status: 201 })
  } catch (error: any) {
    console.error('Error creating service provider:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe un proveedor con este email' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error al crear proveedor', details: error.message },
      { status: 500 }
    )
  }
}
