import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const categorySlug = searchParams.get('categorySlug')
    const popular = searchParams.get('popular') === 'true'

    const where: any = {
      isActive: true
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
        isActive: true
      }
    }

    if (popular) {
      where.isPopular = true
    }

    const services = await prisma.service.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        basePrice: true,
        priceRange: true,
        duration: true,
        estimatedHours: true,
        isPopular: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
            color: true
          }
        },
        createdAt: true
      },
      orderBy: [
        { isPopular: 'desc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json(services)
  } catch (error: any) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Error al obtener servicios', details: error.message },
      { status: 500 }
    )
  }
}

