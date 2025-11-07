import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Endpoint PÚBLICO para consultas de invitados (sin autenticación)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      propertyId, 
      brokerId, 
      name, 
      email, 
      phone, 
      message,
      contactMethod,
      visitDate,
      visitTime 
    } = body

    // Validar datos requeridos
    if (!name || !email || (!phone && !email)) {
      return NextResponse.json(
        { error: 'Nombre y al menos un método de contacto (email o teléfono) son requeridos' },
        { status: 400 }
      )
    }

    if (!brokerId) {
      return NextResponse.json(
        { error: 'Se requiere el ID del bróker' },
        { status: 400 }
      )
    }

    // Construir mensaje completo
    let fullMessage = `
🆕 NUEVA CONSULTA DE CLIENTE

👤 Cliente:
Nombre: ${name}
Email: ${email}
Teléfono: ${phone || 'No proporcionado'}
Método de contacto preferido: ${contactMethod || 'No especificado'}
`.trim()

    if (visitDate || visitTime) {
      fullMessage += `\n\n📅 Solicitud de visita:`
      if (visitDate) fullMessage += `\nFecha: ${visitDate}`
      if (visitTime) fullMessage += `\nHora: ${visitTime}`
    }

    if (propertyId) {
      fullMessage += `\n\n🏠 Propiedad de interés: ${propertyId}`
    }

    if (message && message.trim()) {
      fullMessage += `\n\n💬 Mensaje:\n${message.trim()}`
    }

    // Crear Lead en la base de datos
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || '',
        source: 'WEB_FORM',
        status: 'NEW',
        priority: 'MEDIUM',
        propertyId: propertyId || null,
        brokerId,
        message: fullMessage,
        interestedIn: propertyId ? 'Propiedad específica' : 'Información general',
      },
    })

    // Crear mensaje para el bróker
    await prisma.message.create({
      data: {
        senderId: brokerId, // Usar el broker como sender temporal para que aparezca en su bandeja
        receiverId: brokerId,
        content: fullMessage,
        isRead: false,
      },
    })

    console.log('✅ Consulta pública recibida:', { name, email, phone, propertyId, brokerId })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Consulta enviada exitosamente',
        leadId: lead.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('❌ Error al procesar consulta pública:', error)
    return NextResponse.json(
      { error: 'Error al enviar la consulta. Por favor intenta nuevamente.' },
      { status: 500 }
    )
  }
}

// OPTIONS para CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

