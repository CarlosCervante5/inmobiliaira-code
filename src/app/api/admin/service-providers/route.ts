import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Primero intentar obtener sin relaciones para ver si la tabla existe
    let providers
    try {
      providers = await prisma.serviceProvider.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
    } catch (dbError: any) {
      console.error('Error en query básica:', dbError)
      // Si falla, puede ser que la tabla no existe
      if (dbError.code === 'P2021' || dbError.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'La tabla ServiceProvider no existe. Ejecuta las migraciones primero.', details: dbError.message },
          { status: 500 }
        )
      }
      throw dbError
    }

    // Si hay proveedores, obtener sus servicios
    if (providers.length > 0) {
      try {
        const providersWithServices = await prisma.serviceProvider.findMany({
          include: {
            services: {
              select: {
                id: true,
                name: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
        providers = providersWithServices
      } catch (relationError: any) {
        console.error('Error obteniendo relaciones:', relationError)
        // Si falla la relación, continuar sin servicios
        console.log('Continuando sin relaciones de servicios')
      }
    }

    // Serializar correctamente los campos para JSON
    const serializedProviders = providers.map((provider: any) => {
      // Convertir Prisma JSON a objeto JavaScript si es necesario
      let availability = null
      if (provider.availability) {
        try {
          // Si ya es un objeto, usarlo directamente
          availability = typeof provider.availability === 'object' 
            ? provider.availability 
            : JSON.parse(provider.availability)
        } catch {
          availability = provider.availability
        }
      }

      return {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        address: provider.address || null,
        bio: provider.bio || null,
        specialties: Array.isArray(provider.specialties) ? provider.specialties : [],
        experience: provider.experience,
        rating: provider.rating,
        totalReviews: provider.totalReviews || 0,
        isActive: provider.isActive ?? true,
        isVerified: provider.isVerified ?? false,
        availability: availability,
        createdAt: provider.createdAt ? new Date(provider.createdAt).toISOString() : new Date().toISOString(),
        updatedAt: provider.updatedAt ? new Date(provider.updatedAt).toISOString() : new Date().toISOString(),
        services: Array.isArray(provider.services) ? provider.services : [],
      }
    })

    return NextResponse.json(serializedProviders)
  } catch (error: any) {
    console.error('Error fetching service providers:', error)
    console.error('Error stack:', error.stack)
    console.error('Error code:', error.code)
    return NextResponse.json(
      { 
        error: 'Error al obtener profesionales', 
        details: error.message,
        code: error.code,
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

