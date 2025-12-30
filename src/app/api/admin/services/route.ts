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

    const services = await prisma.service.findMany({
      include: {
        category: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Error al obtener servicios' },
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
    const { name, description, categoryId, basePrice, priceRange, duration, estimatedHours, isActive, isPopular } = body

    if (!name || !description || !categoryId) {
      return NextResponse.json(
        { error: 'Nombre, descripción y categoría son requeridos' },
        { status: 400 }
      )
    }

    // Verificar que la categoría existe
    const category = await prisma.serviceCategory.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      )
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        categoryId,
        basePrice: basePrice ? parseFloat(basePrice) : null,
        priceRange: priceRange || null,
        duration: duration || null,
        estimatedHours: estimatedHours ? parseFloat(estimatedHours) : null,
        isActive: isActive !== undefined ? isActive : true,
        isPopular: isPopular !== undefined ? isPopular : false,
      },
      include: {
        category: {
          select: {
            name: true,
          }
        }
      }
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error: any) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Error al crear servicio', details: error.message },
      { status: 500 }
    )
  }
}

