import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createTestBroker() {
  console.log('👤 Creando broker de prueba...\n')

  try {
    // Verificar si el broker ya existe
    const existing = await prisma.user.findUnique({
      where: { email: 'broker1@test.com' }
    })

    if (existing) {
      console.log('⚠️  El broker broker1@test.com ya existe')
      console.log('   Actualizando contraseña...\n')
      
      const hashedPassword = await bcrypt.hash('Test123456', 12)
      
      await prisma.user.update({
        where: { email: 'broker1@test.com' },
        data: { password: hashedPassword }
      })
      
      console.log('✅ Contraseña actualizada\n')
    } else {
      const hashedPassword = await bcrypt.hash('Test123456', 12)
      
      const broker = await prisma.user.create({
        data: {
          email: 'broker1@test.com',
          name: 'Juan Pérez',
          password: hashedPassword,
          role: 'BROKER',
          phone: '+52 55 1234 5678',
          license: '12345678',
          company: 'Inmobiliaria ABC',
          bio: 'Especialista en propiedades de lujo en Polanco',
          specialties: ['Residencial de lujo', 'Polanco', 'Condesa'],
          experience: 10,
        }
      })
      
      console.log('✅ Broker creado exitosamente!\n')
    }

    console.log('🔑 CREDENCIALES PARA LA APP:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 Email:    broker1@test.com')
    console.log('🔒 Password: Test123456')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('✨ ¡Listo! Usa estas credenciales en la app Broker Chat\n')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestBroker()

