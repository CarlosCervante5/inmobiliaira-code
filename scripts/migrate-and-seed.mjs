#!/usr/bin/env node

/**
 * Script para ejecutar migraciones y seed automáticamente
 * 
 * Uso:
 * DATABASE_URL="tu-url" node scripts/migrate-and-seed.mjs
 * 
 * O con npm:
 * DATABASE_URL="tu-url" npm run db:migrate-and-seed
 */

import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

console.log('\n🚀 Iniciando migraciones y seed...\n')

try {
  // Paso 1: Aplicar migraciones
  console.log('📦 Paso 1: Aplicando migraciones...')
  try {
    execSync('npx prisma migrate deploy', {
      stdio: 'inherit',
      cwd: projectRoot,
      env: { ...process.env }
    })
    console.log('✅ Migraciones aplicadas exitosamente\n')
  } catch (error) {
    console.log('⚠️  Error al aplicar migraciones con migrate deploy, intentando con db push...')
    try {
      execSync('npx prisma db push --accept-data-loss', {
        stdio: 'inherit',
        cwd: projectRoot,
        env: { ...process.env }
      })
      console.log('✅ Schema sincronizado con db push\n')
    } catch (pushError) {
      console.error('❌ Error al sincronizar schema:', pushError.message)
      throw pushError
    }
  }

  // Paso 2: Generar Prisma Client
  console.log('🔧 Paso 2: Generando Prisma Client...')
  execSync('npx prisma generate', {
    stdio: 'inherit',
    cwd: projectRoot,
    env: { ...process.env }
  })
  console.log('✅ Prisma Client generado\n')

  // Paso 3: Ejecutar seed
  console.log('🌱 Paso 3: Ejecutando seed de producción...')
  execSync('node prisma/seed-produccion.mjs', {
    stdio: 'inherit',
    cwd: projectRoot,
    env: { ...process.env }
  })
  console.log('✅ Seed ejecutado exitosamente\n')

  console.log('='.repeat(50))
  console.log('✅ PROCESO COMPLETADO EXITOSAMENTE')
  console.log('='.repeat(50))
  console.log('\n📊 Resumen:')
  console.log('   ✅ Migraciones aplicadas')
  console.log('   ✅ Prisma Client generado')
  console.log('   ✅ Seed de producción ejecutado')
  console.log('\n🎉 Tu base de datos está lista para usar!\n')

} catch (error) {
  console.error('\n❌ Error durante el proceso:', error.message)
  console.error('\nDetalles:', error)
  process.exit(1)
}

