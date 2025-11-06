#!/usr/bin/env node

/**
 * Seed para crear usuarios de prueba en PRODUCCIÓN
 * 
 * Uso:
 * DATABASE_URL="tu-url-de-vercel" node prisma/seed-produccion.mjs
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('\n🌱 Iniciando seed de base de datos de PRODUCCIÓN...\n')

  // ====================
  // CREAR BROKERS
  // ====================
  console.log('👨‍💼 Creando brokers...')

  const broker1Password = await bcrypt.hash('Test123456', 12)
  const broker1 = await prisma.user.upsert({
    where: { email: 'broker1@test.com' },
    update: {
      password: broker1Password,
      name: 'Juan Pérez',
      role: 'BROKER',
    },
    create: {
      email: 'broker1@test.com',
      name: 'Juan Pérez',
      password: broker1Password,
      role: 'BROKER',
      phone: '+52 55 1234 5678',
      license: '12345678',
      company: 'Inmobiliaria ABC',
      bio: 'Especialista en propiedades de lujo en Polanco y zonas exclusivas de la CDMX. Más de 10 años de experiencia ayudando a familias a encontrar su hogar ideal.',
      specialties: ['Residencial de lujo', 'Polanco', 'Condesa', 'Roma Norte'],
      experience: 10,
    },
  })
  console.log('  ✅ Broker 1 creado:', broker1.email)

  const broker2Password = await bcrypt.hash('Test123456', 12)
  const broker2 = await prisma.user.upsert({
    where: { email: 'broker2@test.com' },
    update: {
      password: broker2Password,
      name: 'María González',
      role: 'BROKER',
    },
    create: {
      email: 'broker2@test.com',
      name: 'María González',
      password: broker2Password,
      role: 'BROKER',
      phone: '+52 55 9876 5432',
      license: '87654321',
      company: 'Propiedades Premium',
      bio: 'Especialista en departamentos modernos en zonas trendy de la CDMX. Conocedora de las mejores opciones para jóvenes profesionales.',
      specialties: ['Departamentos modernos', 'Roma Norte', 'Condesa', 'Juárez'],
      experience: 7,
    },
  })
  console.log('  ✅ Broker 2 creado:', broker2.email)

  // ====================
  // CREAR CLIENTES
  // ====================
  console.log('\n👥 Creando clientes...')

  const cliente1Password = await bcrypt.hash('Test123456', 12)
  const cliente1 = await prisma.user.upsert({
    where: { email: 'cliente1@test.com' },
    update: {
      password: cliente1Password,
    },
    create: {
      email: 'cliente1@test.com',
      name: 'Carlos Ramírez',
      password: cliente1Password,
      role: 'CLIENT',
      phone: '+52 55 5555 1111',
      nss: '12345678901',
    },
  })
  console.log('  ✅ Cliente 1 creado:', cliente1.email)

  const cliente2Password = await bcrypt.hash('Test123456', 12)
  const cliente2 = await prisma.user.upsert({
    where: { email: 'cliente2@test.com' },
    update: {
      password: cliente2Password,
    },
    create: {
      email: 'cliente2@test.com',
      name: 'Ana López',
      password: cliente2Password,
      role: 'CLIENT',
      phone: '+52 55 5555 2222',
      nss: '98765432109',
    },
  })
  console.log('  ✅ Cliente 2 creado:', cliente2.email)

  // ====================
  // CREAR PROPIEDADES
  // ====================
  console.log('\n🏠 Creando propiedades de ejemplo...')

  const property1 = await prisma.property.upsert({
    where: { id: 'prop-polanco-1' },
    update: {},
    create: {
      id: 'prop-polanco-1',
      title: 'Casa moderna en Polanco',
      description: 'Hermosa casa de 3 recámaras en una de las mejores zonas de la ciudad. Esta propiedad cuenta con acabados de lujo, jardín privado, terraza con vista panorámica y todas las comodidades que buscas para tu familia.',
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
      amenities: ['Jardín privado', 'Terraza', 'Seguridad 24/7', 'Gimnasio'],
      images: ['/images/properties/casa-polanco.jpg'],
      ownerId: broker1.id,
      publishedAt: new Date(),
    },
  })
  console.log('  ✅ Propiedad 1 creada:', property1.title)

  const property2 = await prisma.property.upsert({
    where: { id: 'prop-roma-1' },
    update: {},
    create: {
      id: 'prop-roma-1',
      title: 'Departamento en Roma Norte',
      description: 'Departamento completamente amueblado en edificio moderno con todas las comodidades. Perfecto para profesionales jóvenes o parejas que buscan un estilo de vida urbano.',
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
      amenities: ['Gimnasio', 'Rooftop', 'Concierge', 'Lavandería'],
      images: ['/images/properties/depto-roma.jpg'],
      ownerId: broker2.id,
      publishedAt: new Date(),
    },
  })
  console.log('  ✅ Propiedad 2 creada:', property2.title)

  const property3 = await prisma.property.upsert({
    where: { id: 'prop-terreno-1' },
    update: {},
    create: {
      id: 'prop-terreno-1',
      title: 'Terreno comercial en Santa Fe',
      description: 'Excelente terreno comercial en una de las zonas de mayor crecimiento de la ciudad. Ideal para desarrollo de oficinas, retail o proyectos mixtos.',
      price: 5000000,
      type: 'LAND',
      status: 'AVAILABLE',
      bedrooms: 0,
      bathrooms: 0,
      area: 500,
      parking: 0,
      floors: 0,
      age: 0,
      address: 'Av. Vasco de Quiroga 789, Santa Fe',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '01219',
      latitude: 19.3592,
      longitude: -99.2594,
      amenities: ['Acceso directo', 'Servicios urbanos', 'Zona de alta plusvalía'],
      images: ['/images/properties/terreno.jpg'],
      ownerId: broker1.id,
      publishedAt: new Date(),
    },
  })
  console.log('  ✅ Propiedad 3 creada:', property3.title)

  // ====================
  // CREAR MENSAJES DE EJEMPLO
  // ====================
  console.log('\n💬 Creando mensajes de ejemplo...')

  await prisma.message.create({
    data: {
      senderId: cliente1.id,
      receiverId: broker1.id,
      content: 'Hola, me interesa la casa en Polanco. ¿Está disponible para visitarla este fin de semana?',
      isRead: false,
    },
  }).catch(() => console.log('  ℹ️  Mensaje ya existe o error al crear'))

  await prisma.message.create({
    data: {
      senderId: broker1.id,
      receiverId: cliente1.id,
      content: '¡Hola Carlos! Sí, está disponible. ¿Qué día te vendría bien? Tengo disponibilidad sábado y domingo.',
      isRead: true,
    },
  }).catch(() => console.log('  ℹ️  Mensaje ya existe o error al crear'))

  await prisma.message.create({
    data: {
      senderId: cliente2.id,
      receiverId: broker2.id,
      content: 'Buenos días, ¿el departamento en Roma Norte acepta mascotas? Tengo un perro pequeño.',
      isRead: false,
    },
  }).catch(() => console.log('  ℹ️  Mensaje ya existe o error al crear'))

  await prisma.message.create({
    data: {
      senderId: broker2.id,
      receiverId: cliente2.id,
      content: 'Hola Ana! Sí, se aceptan mascotas pequeñas. ¿Te gustaría agendar una visita?',
      isRead: true,
    },
  }).catch(() => console.log('  ℹ️  Mensaje ya existe o error al crear'))

  console.log('  ✅ Mensajes de ejemplo creados')

  // ====================
  // RESUMEN
  // ====================
  console.log('\n' + '='.repeat(50))
  console.log('✅ SEED COMPLETADO EXITOSAMENTE')
  console.log('='.repeat(50))
  
  console.log('\n🔑 CREDENCIALES DE BROKERS:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('\n👨‍💼 Broker 1:')
  console.log('   📧 Email:    broker1@test.com')
  console.log('   🔒 Password: Test123456')
  console.log('   🏢 Compañía: Inmobiliaria ABC')
  
  console.log('\n👩‍💼 Broker 2:')
  console.log('   📧 Email:    broker2@test.com')
  console.log('   🔒 Password: Test123456')
  console.log('   🏢 Compañía: Propiedades Premium')
  
  console.log('\n👥 CREDENCIALES DE CLIENTES:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('\n   📧 cliente1@test.com - Password: Test123456')
  console.log('   📧 cliente2@test.com - Password: Test123456')
  
  console.log('\n📊 DATOS CREADOS:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('   ✅ 2 Brokers')
  console.log('   ✅ 2 Clientes')
  console.log('   ✅ 3 Propiedades')
  console.log('   ✅ 4 Mensajes de ejemplo')
  
  console.log('\n📱 USA EN LA APP MÓVIL:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('   Email: broker1@test.com o broker2@test.com')
  console.log('   Password: Test123456')
  console.log('\n')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('✨ Seed completado y desconectado de la base de datos\n')
  })
  .catch(async (e) => {
    console.error('\n❌ Error en seed:', e.message)
    console.error('\nDetalles:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

