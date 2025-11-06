import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - Obtener leads del broker autenticado
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const source = searchParams.get('source')

    // Filtros
    const where: any = {
      brokerId: session.user.id
    }

    if (status) where.status = status
    if (priority) where.priority = priority
    if (source) where.source = source

    const leads = await prisma.lead.findMany({
      where,
      include: {
        property: {
          select: {
            id: true,
            title: true,
            price: true,
            type: true,
            images: true,
          }
        },
        broker: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    // Estadísticas
    const stats = {
      total: leads.length,
      new: leads.filter(l => l.status === 'NEW').length,
      contacted: leads.filter(l => l.status === 'CONTACTED').length,
      qualified: leads.filter(l => l.status === 'QUALIFIED').length,
      inNegotiation: leads.filter(l => l.status === 'IN_NEGOTIATION').length,
      won: leads.filter(l => l.status === 'WON').length,
      lost: leads.filter(l => l.status === 'LOST').length,
    }

    return NextResponse.json({
      leads,
      stats
    })
  } catch (error) {
    console.error('Error al obtener leads:', error)
    return NextResponse.json(
      { error: 'Error al obtener leads' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo lead
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
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
      source,
      priority,
      propertyId,
      interestedIn,
      budget,
      message,
      brokerId
    } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Nombre, email y teléfono son requeridos' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        source: source || 'MANUAL',
        priority: priority || 'MEDIUM',
        propertyId: propertyId || null,
        interestedIn: interestedIn || null,
        budget: budget || null,
        message: message || null,
        brokerId: brokerId || session.user.id,
        status: 'NEW',
      },
      include: {
        property: true,
        broker: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error('Error al crear lead:', error)
    return NextResponse.json(
      { error: 'Error al crear lead' },
      { status: 500 }
    )
  }
}

