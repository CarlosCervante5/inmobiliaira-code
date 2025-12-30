#!/usr/bin/env node

/**
 * Script para ejecutar el seed de producción directamente
 * 
 * Uso:
 * DATABASE_URL="tu-url" node scripts/ejecutar-seed.mjs
 * 
 * O con npm:
 * DATABASE_URL="tu-url" npm run db:seed
 * 
 * Nota: Este script ejecuta el seed-produccion.mjs que crea:
 * - Usuarios admin, brokers y clientes
 * - Propiedades de ejemplo
 * - Servicios y categorías
 * - Proveedores de servicios
 */

import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

console.log('\n🌱 Ejecutando seed de producción...\n')

// Verificar que DATABASE_URL esté configurada
if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL no está configurada')
  console.error('\n💡 Uso:')
  console.error('   DATABASE_URL="tu-url" node scripts/ejecutar-seed.mjs')
  console.error('\n   O con npm:')
  console.error('   DATABASE_URL="tu-url" npm run db:seed\n')
  process.exit(1)
}

try {
  // Generar Prisma Client primero (por si acaso)
  console.log('🔧 Generando Prisma Client...')
  try {
    execSync('npx prisma generate', {
      stdio: 'pipe',
      cwd: projectRoot,
      env: { ...process.env }
    })
    console.log('✅ Prisma Client generado\n')
  } catch (error) {
    console.log('⚠️  Advertencia al generar Prisma Client (continuando...)\n')
  }

  // Ejecutar el seed de producción
  console.log('🌱 Ejecutando seed de producción...\n')
  execSync('node prisma/seed-produccion.mjs', {
    stdio: 'inherit',
    cwd: projectRoot,
    env: { ...process.env }
  })

  console.log('\n' + '='.repeat(50))
  console.log('✅ SEED EJECUTADO EXITOSAMENTE')
  console.log('='.repeat(50))
  console.log('\n📊 Datos creados:')
  console.log('   ✅ 1 Administrador (admin@test.com / Admin123456)')
  console.log('   ✅ 2 Brokers (broker1@test.com, broker2@test.com / Test123456)')
  console.log('   ✅ 2 Clientes (cliente1@test.com, cliente2@test.com / Test123456)')
  console.log('   ✅ 3 Propiedades de ejemplo')
  console.log('   ✅ 5 Categorías de servicios')
  console.log('   ✅ 15+ Servicios de ejemplo')
  console.log('   ✅ 7 Proveedores de servicios')
  console.log('   ✅ Mensajes y leads de ejemplo')
  console.log('\n🎉 Tu base de datos está lista para usar!\n')

} catch (error) {
  console.error('\n❌ Error ejecutando seed:', error.message)
  if (error.message?.includes('DATABASE_URL')) {
    console.error('\n💡 SUGERENCIA:')
    console.error('   Asegúrate de tener DATABASE_URL configurada:')
    console.error('   DATABASE_URL="postgresql://..." node scripts/ejecutar-seed.mjs')
  } else if (error.message?.includes('schema')) {
    console.error('\n💡 SUGERENCIA:')
    console.error('   Asegúrate de que las migraciones estén aplicadas primero:')
    console.error('   DATABASE_URL="tu-url" npm run db:migrate')
    console.error('   Luego ejecuta el seed:')
    console.error('   DATABASE_URL="tu-url" npm run db:seed')
  }
  console.error('\nDetalles:', error.message)
  process.exit(1)
}

