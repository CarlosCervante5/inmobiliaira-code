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
  // CREAR ADMIN
  // ====================
  console.log('👑 Creando administrador...')

  const adminPassword = await bcrypt.hash('Admin123456', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {
      password: adminPassword,
      name: 'Administrador',
      role: 'ADMIN',
    },
    create: {
      email: 'admin@test.com',
      name: 'Administrador',
      password: adminPassword,
      role: 'ADMIN',
      phone: '+52 55 0000 0000',
    },
  })
  console.log('  ✅ Admin creado:', admin.email)

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
  // CREAR LEADS DE EJEMPLO
  // ====================
  console.log('\n📊 Creando leads de ejemplo...')

  await prisma.lead.create({
    data: {
      name: 'Roberto Sánchez',
      email: 'roberto@example.com',
      phone: '+52 55 6666 1111',
      source: 'WEB_FORM',
      status: 'NEW',
      priority: 'HIGH',
      propertyId: property1.id,
      interestedIn: 'Casa',
      budget: 3000000,
      message: 'Me interesa la casa en Polanco. ¿Podríamos agendar una visita?',
      brokerId: broker1.id,
    },
  }).catch(() => console.log('  ℹ️  Lead ya existe'))

  await prisma.lead.create({
    data: {
      name: 'Laura Mendoza',
      email: 'laura@example.com',
      phone: '+52 55 6666 2222',
      source: 'INFONAVIT_CALC',
      status: 'QUALIFIED',
      priority: 'MEDIUM',
      interestedIn: 'Departamento',
      budget: 1500000,
      message: 'Calculé mi crédito Infonavit y puedo obtener hasta 1.5M. Busco departamento en Roma Norte.',
      brokerId: broker2.id,
    },
  }).catch(() => console.log('  ℹ️  Lead ya existe'))

  await prisma.lead.create({
    data: {
      name: 'Pedro Gutiérrez',
      email: 'pedro@example.com',
      phone: '+52 55 6666 3333',
      source: 'CHAT',
      status: 'IN_NEGOTIATION',
      priority: 'URGENT',
      propertyId: property2.id,
      budget: 1800000,
      message: 'Estoy muy interesado en el departamento. ¿Podemos negociar el precio?',
      brokerId: broker2.id,
      lastContactDate: new Date(),
    },
  }).catch(() => console.log('  ℹ️  Lead ya existe'))

  await prisma.lead.create({
    data: {
      name: 'Sofía Torres',
      email: 'sofia@example.com',
      phone: '+52 55 6666 4444',
      source: 'PROPERTY_VIEW',
      status: 'CONTACTED',
      priority: 'LOW',
      interestedIn: 'Terreno',
      budget: 6000000,
      message: 'Vi el terreno en Santa Fe. Me gustaría más información.',
      brokerId: broker1.id,
    },
  }).catch(() => console.log('  ℹ️  Lead ya existe'))

  await prisma.lead.create({
    data: {
      name: 'Miguel Ángel Rojas',
      email: 'miguel@example.com',
      phone: '+52 55 6666 5555',
      source: 'MANUAL',
      status: 'FOLLOW_UP',
      priority: 'MEDIUM',
      interestedIn: 'Casa',
      budget: 4000000,
      message: 'Cliente referido por Ana López. Busca casa familiar.',
      brokerId: broker1.id,
      nextFollowUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // En 2 días
    },
  }).catch(() => console.log('  ℹ️  Lead ya existe'))

  console.log('  ✅ Leads de ejemplo creados')

  // ====================
  // CREAR CATEGORÍAS DE SERVICIOS
  // ====================
  console.log('\n🔧 Creando categorías de servicios...')

  const categoriaLimpieza = await prisma.serviceCategory.upsert({
    where: { slug: 'limpieza' },
    update: {},
    create: {
      name: 'Limpieza',
      description: 'Servicios de limpieza profesional para tu hogar u oficina',
      icon: '✨',
      color: 'blue',
      slug: 'limpieza',
      isActive: true,
    },
  }).catch(() => null)
  if (categoriaLimpieza) console.log('  ✅ Categoría Limpieza creada')

  const categoriaInstalacion = await prisma.serviceCategory.upsert({
    where: { slug: 'instalacion' },
    update: {},
    create: {
      name: 'Instalación',
      description: 'Instalación profesional de electrodomésticos y accesorios',
      icon: '🔧',
      color: 'green',
      slug: 'instalacion',
      isActive: true,
    },
  }).catch(() => null)
  if (categoriaInstalacion) console.log('  ✅ Categoría Instalación creada')

  const categoriaHandyman = await prisma.serviceCategory.upsert({
    where: { slug: 'handyman' },
    update: {},
    create: {
      name: 'Handyman',
      description: 'Reparaciones y trabajos generales del hogar',
      icon: '🔨',
      color: 'orange',
      slug: 'handyman',
      isActive: true,
    },
  }).catch(() => null)
  if (categoriaHandyman) console.log('  ✅ Categoría Handyman creada')

  const categoriaExteriores = await prisma.serviceCategory.upsert({
    where: { slug: 'exteriores' },
    update: {},
    create: {
      name: 'Proyectos Exteriores',
      description: 'Mantenimiento y mejoras de espacios exteriores',
      icon: '🌳',
      color: 'emerald',
      slug: 'exteriores',
      isActive: true,
    },
  }).catch(() => null)
  if (categoriaExteriores) console.log('  ✅ Categoría Exteriores creada')

  const categoriaRenovaciones = await prisma.serviceCategory.upsert({
    where: { slug: 'renovaciones' },
    update: {},
    create: {
      name: 'Renovaciones del Hogar',
      description: 'Proyectos de renovación y remodelación completa',
      icon: '🏠',
      color: 'purple',
      slug: 'renovaciones',
      isActive: true,
    },
  }).catch(() => null)
  if (categoriaRenovaciones) console.log('  ✅ Categoría Renovaciones creada')

  // ====================
  // CREAR SERVICIOS
  // ====================
  console.log('\n🛠️  Creando servicios de ejemplo...')

  let servicioLimpiezaHogar = null
  let servicioLimpiezaMudanza = null
  let servicioMontajeTV = null
  let servicioEnsamblajeMuebles = null

  if (categoriaLimpieza) {
    servicioLimpiezaHogar = await prisma.service.upsert({
      where: { id: 'serv-limpieza-hogar' },
      update: {},
      create: {
        id: 'serv-limpieza-hogar',
        name: 'Limpieza de Hogar',
        description: 'Limpieza regular y profunda de tu hogar',
        categoryId: categoriaLimpieza.id,
        basePrice: 500,
        priceRange: 'Desde $500',
        duration: '2-4 horas',
        estimatedHours: 3,
        isActive: true,
        isPopular: true,
      },
    }).catch(() => null)

    servicioLimpiezaMudanza = await prisma.service.upsert({
      where: { id: 'serv-limpieza-mudanza' },
      update: {},
      create: {
        id: 'serv-limpieza-mudanza',
        name: 'Limpieza de Mudanza',
        description: 'Limpieza completa al mudarte',
        categoryId: categoriaLimpieza.id,
        basePrice: 1200,
        priceRange: 'Desde $1,200',
        duration: '4-6 horas',
        estimatedHours: 5,
        isActive: true,
      },
    }).catch(() => null)
  }

  if (categoriaInstalacion) {
    servicioMontajeTV = await prisma.service.upsert({
      where: { id: 'serv-montaje-tv' },
      update: {},
      create: {
        id: 'serv-montaje-tv',
        name: 'Montaje de TV',
        description: 'Instalación y montaje de televisores',
        categoryId: categoriaInstalacion.id,
        basePrice: 400,
        priceRange: 'Desde $400',
        duration: '1-2 horas',
        estimatedHours: 1.5,
        isActive: true,
        isPopular: true,
      },
    }).catch(() => null)
  }

  if (categoriaHandyman) {
    servicioEnsamblajeMuebles = await prisma.service.upsert({
      where: { id: 'serv-ensamblaje-muebles' },
      update: {},
      create: {
        id: 'serv-ensamblaje-muebles',
        name: 'Ensamblaje de Muebles',
        description: 'Armado profesional de muebles',
        categoryId: categoriaHandyman.id,
        basePrice: 350,
        priceRange: 'Desde $350',
        duration: '2-4 horas',
        estimatedHours: 3,
        isActive: true,
        isPopular: true,
      },
    }).catch(() => null)
  }

  console.log('  ✅ Servicios de ejemplo creados')

  // ====================
  // CREAR PROVEEDORES DE SERVICIOS
  // ====================
  console.log('\n👷 Creando proveedores de servicios...')

  const provider1 = await prisma.serviceProvider.upsert({
    where: { email: 'proveedor1@test.com' },
    update: {
      services: {
        set: servicioLimpiezaHogar && servicioLimpiezaMudanza 
          ? [{ id: servicioLimpiezaHogar.id }, { id: servicioLimpiezaMudanza.id }]
          : []
      }
    },
    create: {
      name: 'Juan Martínez',
      email: 'proveedor1@test.com',
      phone: '+52 55 1111 2222',
      address: 'Ciudad de México, CDMX',
      bio: 'Profesional con más de 8 años de experiencia en limpieza y mantenimiento del hogar. Especializado en limpieza profunda y organización.',
      specialties: ['Limpieza de Hogar', 'Limpieza Profunda', 'Organización'],
      experience: 8,
      rating: 4.8,
      totalReviews: 45,
      isActive: true,
      isVerified: true,
      services: {
        connect: servicioLimpiezaHogar && servicioLimpiezaMudanza 
          ? [{ id: servicioLimpiezaHogar.id }, { id: servicioLimpiezaMudanza.id }]
          : []
      },
    },
  }).catch(() => null)
  if (provider1) console.log('  ✅ Proveedor 1 creado:', provider1.email)

  const provider2 = await prisma.serviceProvider.upsert({
    where: { email: 'proveedor2@test.com' },
    update: {
      services: {
        set: servicioMontajeTV ? [{ id: servicioMontajeTV.id }] : []
      }
    },
    create: {
      name: 'María Rodríguez',
      email: 'proveedor2@test.com',
      phone: '+52 55 3333 4444',
      address: 'Ciudad de México, CDMX',
      bio: 'Técnica especializada en instalaciones eléctricas y montaje de electrodomésticos. Certificada y con amplia experiencia.',
      specialties: ['Montaje de TV', 'Instalación Eléctrica', 'Instalación de Luminarias'],
      experience: 6,
      rating: 4.9,
      totalReviews: 32,
      isActive: true,
      isVerified: true,
      services: {
        connect: servicioMontajeTV ? [{ id: servicioMontajeTV.id }] : []
      },
    },
  }).catch(() => null)
  if (provider2) console.log('  ✅ Proveedor 2 creado:', provider2.email)

  const provider3 = await prisma.serviceProvider.upsert({
    where: { email: 'proveedor3@test.com' },
    update: {
      services: {
        set: servicioEnsamblajeMuebles ? [{ id: servicioEnsamblajeMuebles.id }] : []
      }
    },
    create: {
      name: 'Carlos Sánchez',
      email: 'proveedor3@test.com',
      phone: '+52 55 5555 6666',
      address: 'Ciudad de México, CDMX',
      bio: 'Handyman profesional con experiencia en reparaciones generales, plomería y ensamblaje de muebles.',
      specialties: ['Ensamblaje de Muebles', 'Reparaciones Generales', 'Plomería'],
      experience: 10,
      rating: 4.7,
      totalReviews: 58,
      isActive: true,
      isVerified: true,
      services: {
        connect: servicioEnsamblajeMuebles ? [{ id: servicioEnsamblajeMuebles.id }] : []
      },
    },
  }).catch(() => null)
  if (provider3) console.log('  ✅ Proveedor 3 creado:', provider3.email)

  // ====================
  // RESUMEN
  // ====================
  console.log('\n' + '='.repeat(50))
  console.log('✅ SEED COMPLETADO EXITOSAMENTE')
  console.log('='.repeat(50))
  
  console.log('\n🔑 CREDENCIALES DE ADMIN:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('\n👑 Administrador:')
  console.log('   📧 Email:    admin@test.com')
  console.log('   🔒 Password: Admin123456')
  console.log('   🔗 Panel:    /admin')
  
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
  console.log('   ✅ 1 Administrador')
  console.log('   ✅ 2 Brokers')
  console.log('   ✅ 2 Clientes')
  console.log('   ✅ 3 Propiedades')
  console.log('   ✅ 4 Mensajes de ejemplo')
  console.log('   ✅ 5 Leads de ejemplo')
  console.log('   ✅ 5 Categorías de servicios')
  console.log('   ✅ Servicios de ejemplo')
  console.log('   ✅ 3 Proveedores de servicios')
  
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

