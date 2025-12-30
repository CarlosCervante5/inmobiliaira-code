import { NextResponse } from 'next/server'
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

    // Obtener estadísticas
    const [
      totalUsers,
      totalBrokers,
      totalClients,
      totalProperties,
      availableProperties,
      totalLeads,
      newLeads,
      totalMessages,
      properties,
      totalServices,
      totalCategories,
      totalProviders,
      activeProviders
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'BROKER' } }),
      prisma.user.count({ where: { role: 'CLIENT' } }),
      prisma.property.count(),
      prisma.property.count({ where: { status: 'AVAILABLE' } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.message.count(),
      prisma.property.findMany({
        select: { price: true }
      }),
      prisma.service.count().catch(() => 0),
      prisma.serviceCategory.count().catch(() => 0),
      prisma.serviceProvider.count().catch(() => 0),
      prisma.serviceProvider.count({ where: { isActive: true } }).catch(() => 0)
    ])

    const totalValue = properties.reduce((sum, prop) => sum + prop.price, 0)

    return NextResponse.json({
      totalUsers,
      totalBrokers,
      totalClients,
      totalProperties,
      availableProperties,
      totalLeads,
      newLeads,
      totalMessages,
      totalValue,
      totalServices,
      totalCategories,
      totalProviders,
      activeProviders
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    )
  }
}

