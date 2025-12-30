import Link from 'next/link'
import { Search, Home, Building2, CreditCard, Users, Shield, CheckCircle, Bed, Bath, Maximize, Wrench, Sparkles, Hammer } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { InfonavitCalculator } from '@/components/credit/InfonavitCalculator'
import Image from 'next/image'

// Propiedades destacadas para mostrar en el home
const featuredProperties = [
  {
    id: '1',
    title: 'Casa moderna en Polanco',
    description: 'Hermosa casa de 3 recámaras en una de las mejores zonas de la ciudad',
    price: 2500000,
    type: 'Casa',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    address: 'Av. Masaryk 123, Polanco',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/casa-polanco.jpg',
  },
  {
    id: '2',
    title: 'Departamento en Roma Norte',
    description: 'Departamento completamente amueblado en edificio moderno',
    price: 1800000,
    type: 'Departamento',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    address: 'Calle Orizaba 456, Roma Norte',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/depto-roma.jpg',
  },
  {
    id: '3',
    title: 'Casa en Condesa',
    description: 'Casa estilo colonial con jardín privado',
    price: 3200000,
    type: 'Casa',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    address: 'Calle Amsterdam 789, Condesa',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/casa-condesa.jpg',
  },
  {
    id: '4',
    title: 'Departamento de lujo',
    description: 'Departamento de lujo con vista panorámica',
    price: 4500000,
    type: 'Departamento',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    address: 'Av. Presidente Masaryk 567, Polanco',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/depto-lujo.jpg',
  },
  {
    id: '5',
    title: 'Casa moderna con alberca',
    description: 'Amplia casa moderna con alberca y jardín',
    price: 5800000,
    type: 'Casa',
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    address: 'Calle Bosques 234, Bosques de las Lomas',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/casa-moderna.jpg',
  },
  {
    id: '6',
    title: 'Terreno comercial',
    description: 'Terreno ideal para desarrollo comercial o residencial',
    price: 5000000,
    type: 'Terreno',
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    address: 'Av. Vasco de Quiroga 789, Santa Fe',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/terreno.jpg',
  },
]

export default function HomePage() {
  const features = [
    {
      icon: Search,
      title: 'Búsqueda Avanzada',
      description: 'Encuentra propiedades con filtros específicos de ubicación, precio y características.'
    },
    {
      icon: CreditCard,
      title: 'Consulta de Crédito',
      description: 'Verifica tu elegibilidad para crédito INFONAVIT directamente en la plataforma.'
    },
    {
      icon: Users,
      title: 'Brókers Profesionales',
      description: 'Conecta con brókers certificados que te ayudarán a encontrar tu hogar ideal.'
    },
    {
      icon: Shield,
      title: 'Información Segura',
      description: 'Tus datos están protegidos con las mejores prácticas de seguridad.'
    }
  ]

  const propertyTypes = [
    { name: 'Casas', count: '1,234', icon: Home },
    { name: 'Departamentos', count: '856', icon: Building2 },
    { name: 'Terrenos', count: '342', icon: Building2 },
    { name: 'Comerciales', count: '189', icon: Building2 },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section con Calculadora INFONAVIT */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8 sm:mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Calcula tu crédito INFONAVIT
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-blue-100 px-2">
              Descubre cuánto puedes obtener para tu vivienda y encuentra tu hogar ideal
            </p>
          </div>
          
          {/* Calculadora integrada en el hero */}
          <div className="mt-8">
            <InfonavitCalculator />
          </div>
        </div>
      </section>

      {/* Propiedades Destacadas */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Propiedades Disponibles</h2>
              <p className="mt-2 text-base sm:text-lg text-gray-600">
                Descubre las mejores opciones para tu nuevo hogar
              </p>
            </div>
            <Link href="/properties">
              <Button variant="outline">
                Ver todas
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    {property.type}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {property.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {property.description}
                  </p>
                  
                  <div className="mt-3 flex items-center text-xs text-gray-500">
                    <span className="truncate">{property.address}</span>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span>{property.bedrooms}</span>
                        </div>
                      )}
                      {property.bathrooms > 0 && (
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span>{property.bathrooms}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Maximize className="h-4 w-4" />
                        <span>{property.area}m²</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-blue-600">
                      ${property.price.toLocaleString('es-MX')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="text-center px-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Busca tu propiedad ideal</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
              Utiliza nuestros filtros para encontrar exactamente lo que necesitas
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 sm:p-6 shadow-lg">
            <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Ubicación
                </label>
                <input
                  type="text"
                  placeholder="Ciudad, colonia..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Tipo de Propiedad
                </label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Todos los tipos</option>
                  <option>Casa</option>
                  <option>Departamento</option>
                  <option>Terreno</option>
                  <option>Comercial</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Rango de Precio
                </label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Cualquier precio</option>
                  <option>Hasta $500,000</option>
                  <option>$500,000 - $1,000,000</option>
                  <option>$1,000,000 - $2,000,000</option>
                  <option>Más de $2,000,000</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full text-sm sm:text-base">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center px-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Explora por tipo de propiedad</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
              Encuentra el tipo de propiedad que mejor se adapte a tus necesidades
            </p>
          </div>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {propertyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/properties?type=${type.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <type.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                      {type.name}
                    </h3>
                    <p className="text-sm text-gray-500">{type.count} disponibles</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios de Mantenimiento */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Servicios de Mantenimiento</h2>
              <p className="mt-2 text-base sm:text-lg text-gray-600">
                La forma fácil y confiable de cuidar tu hogar
              </p>
            </div>
            <Link href="/services">
              <Button variant="outline">
                Ver todos
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Limpieza', icon: Sparkles, description: 'Limpieza profesional', color: 'bg-blue-100 text-blue-600', href: '/services/limpieza' },
              { name: 'Instalación', icon: Wrench, description: 'Montaje e instalación', color: 'bg-green-100 text-green-600', href: '/services/instalacion' },
              { name: 'Handyman', icon: Hammer, description: 'Reparaciones generales', color: 'bg-orange-100 text-orange-600', href: '/services/handyman' },
              { name: 'Renovaciones', icon: Home, description: 'Remodelación completa', color: 'bg-purple-100 text-purple-600', href: '/services/renovaciones' },
            ].map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group relative overflow-hidden rounded-lg bg-white border-2 border-gray-200 p-6 transition-all hover:border-blue-500 hover:shadow-lg"
              >
                <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-700">
                  Ver servicios
                  <span className="ml-2">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center px-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">¿Por qué elegirnos?</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
              Ofrecemos las mejores herramientas para tu búsqueda inmobiliaria
            </p>
          </div>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center px-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              ¿Listo para encontrar tu hogar ideal?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-blue-100">
              Únete a miles de personas que ya encontraron su hogar con nosotros
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-x-6 px-4">
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                  <span className="text-sm sm:text-base">Comenzar Ahora</span>
                </Button>
              </Link>
              <Link href="/properties" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600">
                  <span className="text-sm sm:text-base">Ver Propiedades</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Catálogo Inmobiliario</h3>
              <p className="mt-2 text-sm text-gray-400">
                La plataforma inmobiliaria más completa de México.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Enlaces</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                <li><Link href="/properties" className="hover:text-white">Propiedades</Link></li>
                <li><Link href="/services" className="hover:text-white">Servicios de Mantenimiento</Link></li>
                <li><Link href="/about" className="hover:text-white">Acerca de</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Para Brókers</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                <li><Link href="/auth/signup?role=broker" className="hover:text-white">Registrarse</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Panel de Control</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Soporte</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-white">Ayuda</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacidad</Link></li>
                <li><Link href="/terms" className="hover:text-white">Términos</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Catálogo Inmobiliario. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}