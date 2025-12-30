#!/usr/bin/env node

/**
 * Script para aplicar la migración de servicios directamente usando SQL
 * 
 * Uso:
 * DATABASE_URL="tu-url" node scripts/aplicar-migracion-servicios.mjs
 * 
 * Nota: Si usas Supabase con pgbouncer, usa la URL directa (puerto 5432) en lugar del pooler (6543)
 */

import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('\n🚀 Aplicando migración de servicios...\n')

  try {
    // Leer el archivo SQL de la migración
    const migrationPath = join(process.cwd(), 'prisma/migrations/20250111120000_add_services_and_providers/migration.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')

    console.log('📄 Leyendo migración SQL...')
    
    // Dividir el SQL en comandos individuales
    const commands = migrationSQL
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'))

    console.log(`📝 Ejecutando ${commands.length} comandos SQL...\n`)

    // Ejecutar cada comando
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]
      if (command) {
        try {
          // Ejecutar usando $executeRawUnsafe para comandos DDL
          await prisma.$executeRawUnsafe(command)
          console.log(`  ✅ Comando ${i + 1}/${commands.length} ejecutado`)
        } catch (error) {
          // Si el error es que ya existe, continuar
          if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
            console.log(`  ⚠️  Comando ${i + 1}/${commands.length} ya existe, omitiendo...`)
          } else {
            console.error(`  ❌ Error en comando ${i + 1}:`, error.message)
            throw error
          }
        }
      }
    }

    console.log('\n✅ Migración aplicada exitosamente!\n')
    console.log('📊 Verificando tablas creadas...\n')

    // Verificar que las tablas se crearon
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('ServiceCategory', 'Service', 'ServiceProvider', 'ServiceBooking')
      ORDER BY table_name;
    `

    console.log('Tablas creadas:')
    tables.forEach(table => {
      console.log(`  ✅ ${table.table_name}`)
    })

  } catch (error) {
    console.error('\n❌ Error aplicando migración:', error.message)
    if (error.message?.includes('pgbouncer')) {
      console.error('\n💡 SUGERENCIA:')
      console.error('   El pooler de Supabase (pgbouncer) no soporta algunas operaciones.')
      console.error('   Intenta usar la URL directa (puerto 5432) en lugar del pooler (6543):')
      console.error('   postgres://postgres.rptrmsouwsxybvznkrir:tqPlG6LZueKblPou@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require')
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

