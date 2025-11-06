import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - Obtener un lead específico
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = await params

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        property: true,
        broker: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
          }
        }
      }
    })

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que el lead pertenezca al broker
    if (lead.brokerId !== session.user.id) {
      return NextResponse.json(
        { error: 'No autorizado para ver este lead' },
        { status: 403 }
      )
    }

    return NextResponse.json(lead)
  } catch (error) {
    console.error('Error al obtener lead:', error)
    return NextResponse.json(
      { error: 'Error al obtener lead' },
      { status: 500 }
    )
  }
}

// PATCH - Actualizar un lead
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()

    // Verificar que el lead existe y pertenece al broker
    const existingLead = await prisma.lead.findUnique({
      where: { id }
    })

    if (!existingLead) {
      return NextResponse.json(
        { error: 'Lead no encontrado' },
        { status: 404 }
      )
    }

    if (existingLead.brokerId !== session.user.id) {
      return NextResponse.json(
        { error: 'No autorizado para actualizar este lead' },
        { status: 403 }
      )
    }

    // Actualizar el lead
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
        // Si se marca como WON, guardar fecha de conversión
        ...(body.status === 'WON' && !existingLead.convertedAt && {
          convertedAt: new Date()
        })
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

    return NextResponse.json(lead)
  } catch (error) {
    console.error('Error al actualizar lead:', error)
    return NextResponse.json(
      { error: 'Error al actualizar lead' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar un lead
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Verificar que el lead existe y pertenece al broker
    const existingLead = await prisma.lead.findUnique({
      where: { id }
    })

    if (!existingLead) {
      return NextResponse.json(
        { error: 'Lead no encontrado' },
        { status: 404 }
      )
    }

    if (existingLead.brokerId !== session.user.id) {
      return NextResponse.json(
        { error: 'No autorizado para eliminar este lead' },
        { status: 403 }
      )
    }

    await prisma.lead.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Lead eliminado exitosamente' })
  } catch (error) {
    console.error('Error al eliminar lead:', error)
    return NextResponse.json(
      { error: 'Error al eliminar lead' },
      { status: 500 }
    )
  }
}

