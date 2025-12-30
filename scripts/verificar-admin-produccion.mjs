#!/usr/bin/env node

/**
 * Script para verificar el admin en producción
 * Uso: DATABASE_URL="..." node scripts/verificar-admin-produccion.mjs
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL no está configurado')
  console.log('\n💡 Usa: DATABASE_URL="..." node scripts/verificar-admin-produccion.mjs\n')
  process.exit(1)
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
})

async function main() {
  console.log('\n🔍 Verificando admin en producción...\n')
  console.log('📍 DATABASE_URL:', DATABASE_URL.replace(/:[^:@]+@/, ':****@')) // Ocultar password
  console.log('')

  try {
    const email = 'admin@test.com'
    const password = 'Admin123456'

    // Verificar conexión
    await prisma.$connect()
    console.log('✅ Conexión a la base de datos exitosa\n')

    // Buscar admin
    const admin = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
      },
    })

    if (!admin) {
      console.log('❌ Admin NO existe en la base de datos')
      console.log('\n💡 Ejecuta: DATABASE_URL="..." node scripts/create-admin-now.mjs\n')
      process.exit(1)
    }

    console.log('✅ Admin encontrado:')
    console.log(`   📧 Email: ${admin.email}`)
    console.log(`   👤 Nombre: ${admin.name}`)
    console.log(`   🔑 Rol: ${admin.role}`)
    console.log(`   🔒 Tiene contraseña: ${admin.password ? '✅ Sí' : '❌ No'}\n`)

    if (admin.password) {
      // Verificar contraseña
      const isValid = await bcrypt.compare(password, admin.password)
      console.log(`🧪 Verificación de contraseña "${password}": ${isValid ? '✅ Correcta' : '❌ Incorrecta'}\n`)

      if (!isValid) {
        console.log('⚠️  La contraseña no coincide. Actualizando...\n')
        const hashedPassword = await bcrypt.hash(password, 12)
        await prisma.user.update({
          where: { email },
          data: { password: hashedPassword },
        })
        console.log('✅ Contraseña actualizada\n')
      }
    } else {
      console.log('⚠️  El admin no tiene contraseña. Creando...\n')
      const hashedPassword = await bcrypt.hash(password, 12)
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      })
      console.log('✅ Contraseña creada\n')
    }

    // Verificación final
    const finalAdmin = await prisma.user.findUnique({
      where: { email },
      select: { password: true },
    })

    if (finalAdmin?.password) {
      const finalCheck = await bcrypt.compare(password, finalAdmin.password)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('🔑 CREDENCIALES FINALES:')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log(`📧 Email:    ${email}`)
      console.log(`🔒 Password: ${password}`)
      console.log(`✅ Verificación: ${finalCheck ? 'CORRECTA' : 'FALLIDA'}`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.code === 'P1001') {
      console.error('\n💡 Error de conexión. Verifica que:')
      console.error('   1. DATABASE_URL sea correcto')
      console.error('   2. La base de datos esté accesible')
      console.error('   3. No uses el pooler (puerto 6543) para este script\n')
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

