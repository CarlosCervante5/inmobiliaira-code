import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Limpiar datos existentes (opcional - comenta si no quieres eliminar)
  // await prisma.message.deleteMany()
  // await prisma.propertyInquiry.deleteMany()
  // await prisma.creditInquiry.deleteMany()
  // await prisma.favorite.deleteMany()
  // await prisma.property.deleteMany()
  // await prisma.user.deleteMany()

  // Crear usuarios de prueba
  console.log('👥 Creando usuarios de prueba...')

  // Broker 1
  const broker1 = await prisma.user.upsert({
    where: { email: 'broker1@test.com' },
    update: {},
    create: {
      email: 'broker1@test.com',
      name: 'Juan Pérez',
      role: 'BROKER',
      phone: '+52 55 1234 5678',
      license: '12345678',
      company: 'Inmobiliaria ABC',
      bio: 'Especialista en propiedades de lujo en Polanco y zonas exclusivas de la CDMX. Más de 10 años de experiencia.',
      specialties: ['Residencial de lujo', 'Polanco', 'Condesa', 'Roma Norte'],
      experience: 10,
    },
  })

  // Broker 2
  const broker2 = await prisma.user.upsert({
    where: { email: 'broker2@test.com' },
    update: {},
    create: {
      email: 'broker2@test.com',
      name: 'María González',
      role: 'BROKER',
      phone: '+52 55 9876 5432',
      license: '87654321',
      company: 'Propiedades Premium',
      bio: 'Especialista en departamentos modernos en zonas trendy de la CDMX.',
      specialties: ['Departamentos modernos', 'Roma Norte', 'Condesa', 'Juárez'],
      experience: 7,
    },
  })

  // Cliente 1
  const client1 = await prisma.user.upsert({
    where: { email: 'cliente1@test.com' },
    update: {},
    create: {
      email: 'cliente1@test.com',
      name: 'Carlos Ramírez',
      role: 'CLIENT',
      phone: '+52 55 5555 1111',
      nss: '12345678901',
    },
  })

  // Cliente 2
  const client2 = await prisma.user.upsert({
    where: { email: 'cliente2@test.com' },
    update: {},
    create: {
      email: 'cliente2@test.com',
      name: 'Ana López',
      role: 'CLIENT',
      phone: '+52 55 5555 2222',
      nss: '98765432109',
    },
  })

  console.log('✅ Usuarios creados:')
  console.log('   - Broker 1:', broker1.email)
  console.log('   - Broker 2:', broker2.email)
  console.log('   - Cliente 1:', client1.email)
  console.log('   - Cliente 2:', client2.email)

  // Crear propiedades de ejemplo
  console.log('\n🏠 Creando propiedades...')

  const property1 = await prisma.property.create({
    data: {
      title: 'Casa moderna en Polanco',
      description: 'Hermosa casa de 3 recámaras en una de las mejores zonas de la ciudad',
      price: 2500000,
      type: 'HOUSE',
      status: 'AVAILABLE',
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      parking: 2,
      floors: 2,
      age: 5,
      address: 'Av. Masaryk 123, Polanco',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '11560',
      latitude: 19.4326,
      longitude: -99.1332,
      amenities: ['Jardín', 'Terraza', 'Seguridad 24/7'],
      images: ['/images/properties/casa-polanco.jpg'],
      ownerId: broker1.id,
      publishedAt: new Date(),
    },
  })

  const property2 = await prisma.property.create({
    data: {
      title: 'Departamento en Roma Norte',
      description: 'Departamento completamente amueblado en edificio moderno',
      price: 1800000,
      type: 'APARTMENT',
      status: 'AVAILABLE',
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      parking: 1,
      floors: 1,
      age: 2,
      address: 'Calle Orizaba 456, Roma Norte',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '06700',
      latitude: 19.4194,
      longitude: -99.1556,
      amenities: ['Gimnasio', 'Rooftop', 'Concierge'],
      images: ['/images/properties/depto-roma.jpg'],
      ownerId: broker2.id,
      publishedAt: new Date(),
    },
  })

  console.log('✅ Propiedades creadas')

  // Crear mensajes de ejemplo
  console.log('\n💬 Creando mensajes de ejemplo...')

  await prisma.message.create({
    data: {
      senderId: client1.id,
      receiverId: broker1.id,
      content: 'Hola, me interesa la casa en Polanco. ¿Está disponible para visitarla?',
      isRead: false,
    },
  })

  await prisma.message.create({
    data: {
      senderId: broker1.id,
      receiverId: client1.id,
      content: '¡Hola Carlos! Sí, está disponible. ¿Qué día te vendría bien para la visita?',
      isRead: true,
    },
  })

  await prisma.message.create({
    data: {
      senderId: client2.id,
      receiverId: broker2.id,
      content: 'Buenos días, ¿el departamento en Roma Norte acepta mascotas?',
      isRead: false,
    },
  })

  console.log('✅ Mensajes creados')

  console.log('\n✅ Seed completado exitosamente!')
  console.log('\n📝 Usuarios de prueba creados:')
  console.log('\n🔑 CREDENCIALES DE BROKERS (para la app móvil):')
  console.log('   Email: broker1@test.com')
  console.log('   Password: (Necesitas configurar NextAuth)')
  console.log('')
  console.log('   Email: broker2@test.com')
  console.log('   Password: (Necesitas configurar NextAuth)')
  console.log('\n⚠️  NOTA: NextAuth no usa contraseñas directas en el modelo User.')
  console.log('   Para hacer login, necesitas configurar un proveedor de credenciales')
  console.log('   o usar OAuth (Google, GitHub, etc.)')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })


