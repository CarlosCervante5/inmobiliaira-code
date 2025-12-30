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

    const providers = await prisma.serviceProvider.findMany({
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

    // Serializar correctamente el campo availability (JSON)
    const serializedProviders = providers.map(provider => ({
      ...provider,
      availability: provider.availability || null,
    }))

    return NextResponse.json(serializedProviders)
  } catch (error: any) {
    console.error('Error fetching service providers:', error)
    return NextResponse.json(
      { error: 'Error al obtener profesionales', details: error.message },
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

