import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const resolvedParams = params instanceof Promise ? await params : params
    const property = await prisma.property.findUnique({
      where: { id: resolvedParams.id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    if (!property) {
      return NextResponse.json(
        { error: 'Propiedad no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(property)
  } catch (error) {
    console.error('Error fetching property:', error)
    return NextResponse.json(
      { error: 'Error al obtener propiedad' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const resolvedParams = params instanceof Promise ? await params : params
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

    // Verificar que la propiedad existe
    const existingProperty = await prisma.property.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Propiedad no encontrada' },
        { status: 404 }
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

    // Actualizar la propiedad
    const property = await prisma.property.update({
      where: { id: resolvedParams.id },
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
        publishedAt: status === 'AVAILABLE' && !existingProperty.publishedAt ? new Date() : existingProperty.publishedAt,
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

    return NextResponse.json(property)
  } catch (error: any) {
    console.error('Error updating property:', error)
    return NextResponse.json(
      { error: 'Error al actualizar propiedad', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const resolvedParams = params instanceof Promise ? await params : params
    // Verificar que la propiedad existe
    const property = await prisma.property.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!property) {
      return NextResponse.json(
        { error: 'Propiedad no encontrada' },
        { status: 404 }
      )
    }

    // Eliminar la propiedad
    await prisma.property.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ message: 'Propiedad eliminada exitosamente' })
  } catch (error: any) {
    console.error('Error deleting property:', error)
    return NextResponse.json(
      { error: 'Error al eliminar propiedad', details: error.message },
      { status: 500 }
    )
  }
}

