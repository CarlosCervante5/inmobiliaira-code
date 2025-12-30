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

    // Obtener proveedores sin relaciones (más simple y robusto)
    const providers = await prisma.serviceProvider.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Serializar de forma muy simple y segura
    const serializedProviders = providers.map((provider: any) => {
      try {
        // Manejar availability de forma segura
        let availability = null
        if (provider.availability) {
          if (typeof provider.availability === 'object' && provider.availability !== null) {
            availability = provider.availability
          } else if (typeof provider.availability === 'string') {
            try {
              availability = JSON.parse(provider.availability)
            } catch {
              availability = null
            }
          }
        }

        // Construir objeto de forma explícita
        const result: any = {
          id: String(provider.id || ''),
          name: String(provider.name || ''),
          email: String(provider.email || ''),
          phone: String(provider.phone || ''),
          address: provider.address ? String(provider.address) : null,
          bio: provider.bio ? String(provider.bio) : null,
          specialties: Array.isArray(provider.specialties) ? provider.specialties : [],
          experience: provider.experience !== null && provider.experience !== undefined ? Number(provider.experience) : null,
          rating: provider.rating !== null && provider.rating !== undefined ? Number(provider.rating) : null,
          totalReviews: Number(provider.totalReviews || 0),
          isActive: Boolean(provider.isActive !== undefined ? provider.isActive : true),
          isVerified: Boolean(provider.isVerified !== undefined ? provider.isVerified : false),
          availability: availability,
          services: [], // Array vacío por ahora
        }

        // Agregar fechas de forma segura
        if (provider.createdAt) {
          try {
            result.createdAt = new Date(provider.createdAt).toISOString()
          } catch {
            result.createdAt = new Date().toISOString()
          }
        } else {
          result.createdAt = new Date().toISOString()
        }

        if (provider.updatedAt) {
          try {
            result.updatedAt = new Date(provider.updatedAt).toISOString()
          } catch {
            result.updatedAt = new Date().toISOString()
          }
        } else {
          result.updatedAt = new Date().toISOString()
        }

        return result
      } catch (serializeError: any) {
        console.error(`Error serializando proveedor ${provider.id}:`, serializeError)
        // Devolver objeto mínimo si falla la serialización
        return {
          id: String(provider.id || ''),
          name: String(provider.name || ''),
          email: String(provider.email || ''),
          phone: String(provider.phone || ''),
          error: 'Error serializando datos completos'
        }
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

