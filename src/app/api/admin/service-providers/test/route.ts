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

    // Test 1: Verificar conexión a DB
    const dbTest = await prisma.$queryRaw`SELECT 1 as test`
    
    // Test 2: Verificar si la tabla existe
    let tableExists = false
    try {
      const tableCheck = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'ServiceProvider'
        ) as exists
      `
      tableExists = (tableCheck as any[])[0]?.exists || false
    } catch (e: any) {
      console.error('Error checking table:', e)
    }

    // Test 3: Contar registros
    let count = 0
    try {
      if (tableExists) {
        count = await prisma.serviceProvider.count()
      }
    } catch (e: any) {
      console.error('Error counting:', e)
    }

    // Test 4: Intentar obtener un registro simple
    let sampleRecord = null
    try {
      if (tableExists && count > 0) {
        sampleRecord = await prisma.serviceProvider.findFirst({
          select: {
            id: true,
            name: true,
            email: true,
          }
        })
      }
    } catch (e: any) {
      console.error('Error fetching sample:', e)
    }

    return NextResponse.json({
      dbConnected: true,
      tableExists,
      recordCount: count,
      sampleRecord,
      message: tableExists 
        ? `Tabla existe con ${count} registros`
        : 'La tabla ServiceProvider no existe. Ejecuta las migraciones.'
    })
  } catch (error: any) {
    console.error('Error en test:', error)
    return NextResponse.json(
      { 
        error: 'Error en diagnóstico',
        message: error.message,
        code: error.code,
        dbConnected: false
      },
      { status: 500 }
    )
  }
}

