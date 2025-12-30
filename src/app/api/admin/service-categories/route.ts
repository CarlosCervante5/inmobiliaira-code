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

    const categories = await prisma.serviceCategory.findMany({
      include: {
        services: {
          select: {
            id: true,
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching service categories:', error)
    return NextResponse.json(
      { error: 'Error al obtener categorías' },
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
    const { name, description, icon, color, slug, isActive } = body

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Nombre y slug son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si el slug ya existe
    const existing = await prisma.serviceCategory.findUnique({
      where: { slug }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Ya existe una categoría con este slug' },
        { status: 400 }
      )
    }

    const category = await prisma.serviceCategory.create({
      data: {
        name,
        description: description || null,
        icon: icon || null,
        color: color || null,
        slug,
        isActive: isActive !== undefined ? isActive : true,
      },
      include: {
        services: {
          select: {
            id: true,
          }
        }
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('Error creating service category:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe una categoría con este slug' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error al crear categoría', details: error.message },
      { status: 500 }
    )
  }
}

