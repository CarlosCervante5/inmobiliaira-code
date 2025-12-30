#!/usr/bin/env node

/**
 * Script para crear el usuario admin INMEDIATAMENTE
 * Uso: node scripts/create-admin-now.mjs
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('\n👑 Creando usuario administrador...\n')

  const email = 'admin@test.com'
  const password = 'Admin123456'
  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    // Verificar si existe
    const existing = await prisma.user.findUnique({
      where: { email }
    })

    if (existing) {
      console.log('⚠️  El admin ya existe. Actualizando contraseña...')
      
      await prisma.user.update({
        where: { email },
        data: { 
          password: hashedPassword,
          role: 'ADMIN',
          name: 'Administrador',
          phone: '+52 55 0000 0000'
        }
      })
      
      console.log('✅ Admin actualizado\n')
    } else {
      await prisma.user.create({
        data: {
          email,
          name: 'Administrador',
          password: hashedPassword,
          role: 'ADMIN',
          phone: '+52 55 0000 0000',
        }
      })
      
      console.log('✅ Admin creado exitosamente!\n')
    }

    // Verificar que funciona
    const testUser = await prisma.user.findUnique({
      where: { email }
    })

    if (testUser) {
      const isValid = await bcrypt.compare(password, testUser.password)
      console.log('🧪 Verificación de contraseña:', isValid ? '✅ Correcta' : '❌ Incorrecta')
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔑 CREDENCIALES DEL ADMIN:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📧 Email:    ${email}`)
    console.log(`🔒 Password: ${password}`)
    console.log(`🔗 Panel:    http://localhost:3000/admin`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('✨ ¡Listo! Ahora puedes iniciar sesión\n')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

