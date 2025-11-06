import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthenticatedUser } from '@/lib/auth-helpers'

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { receiverId, content, senderName, senderPhone, senderEmail } = body

    if (!receiverId || !content) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      )
    }

    // Crear el mensaje
    const message = await prisma.message.create({
      data: {
        senderId: user.id,
        receiverId,
        content: `
Nombre: ${senderName || user.name || 'No proporcionado'}
Email: ${senderEmail || user.email || 'No proporcionado'}
Teléfono: ${senderPhone || 'No proporcionado'}

Mensaje:
${content}
        `.trim(),
        isRead: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Error al crear mensaje:', error)
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Obtener mensajes recibidos o enviados por el usuario
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: user.id },
          { receiverId: user.id },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error al obtener mensajes:', error)
    return NextResponse.json(
      { error: 'Error al obtener mensajes' },
      { status: 500 }
    )
  }
}


