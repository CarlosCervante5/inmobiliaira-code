#!/usr/bin/env node

/**
 * Script para crear un broker de prueba INMEDIATAMENTE
 * Uso: node scripts/crear-broker-ahora.mjs
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('\n🔧 Creando broker de prueba...\n')

  const email = 'broker@test.com'
  const password = 'Test123456'
  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    // Verificar si existe
    const existing = await prisma.user.findUnique({
      where: { email }
    })

    if (existing) {
      console.log('⚠️  El broker ya existe. Actualizando contraseña...')
      
      await prisma.user.update({
        where: { email },
        data: { 
          password: hashedPassword,
          role: 'BROKER',
          name: 'Juan Pérez',
          license: '12345678',
          company: 'Inmobiliaria ABC',
          phone: '+52 55 1234 5678'
        }
      })
      
      console.log('✅ Broker actualizado\n')
    } else {
      await prisma.user.create({
        data: {
          email,
          name: 'Juan Pérez',
          password: hashedPassword,
          role: 'BROKER',
          phone: '+52 55 1234 5678',
          license: '12345678',
          company: 'Inmobiliaria ABC',
          bio: 'Especialista en propiedades de lujo',
          specialties: ['Residencial', 'Polanco', 'Condesa'],
          experience: 10,
        }
      })
      
      console.log('✅ Broker creado exitosamente!\n')
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔑 CREDENCIALES PARA LA APP:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📧 Email:    ${email}`)
    console.log(`🔒 Password: ${password}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('✨ Prueba también desde la web:')
    console.log('   https://inmobiliaira-code.vercel.app/auth/signin\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n💡 Si ves un error de DATABASE_URL:')
    console.log('   Esto es normal en desarrollo local.')
    console.log('   Mejor opción: Crear broker desde la web')
    console.log('   👉 https://inmobiliaira-code.vercel.app/auth/signup\n')
  } finally {
    await prisma.$disconnect()
  }
}

main()


