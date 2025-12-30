import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    const where = status ? { status } : {}

    const properties = await prisma.property.findMany({
      where,
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Error al obtener propiedades' },
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
      title,
      description,
      price,
      type,
      status,
      bedrooms,
      bathrooms,
      area,
      parking,
      floors,
      age,
      address,
      city,
      state,
      zipCode,
      latitude,
      longitude,
      amenities,
      images,
      ownerId,
    } = body

    if (!title || !description || !price || !type || !bedrooms || !bathrooms || !area || !address || !city || !state || !zipCode || !ownerId) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Verificar que el owner existe
    const owner = await prisma.user.findUnique({
      where: { id: ownerId }
    })

    if (!owner) {
      return NextResponse.json(
        { error: 'El propietario no existe' },
        { status: 404 }
      )
    }

    // Crear la propiedad
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        type,
        status: status || 'AVAILABLE',
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        area: parseFloat(area),
        parking: parking ? parseInt(parking) : null,
        floors: floors ? parseInt(floors) : null,
        age: age ? parseInt(age) : null,
        address,
        city,
        state,
        zipCode,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        amenities: amenities || [],
        images: images || [],
        ownerId,
        publishedAt: status === 'AVAILABLE' ? new Date() : null,
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error: any) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Error al crear propiedad', details: error.message },
      { status: 500 }
    )
  }
}

