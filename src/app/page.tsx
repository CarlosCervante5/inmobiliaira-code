import Link from 'next/link'
import { Search, Home, Building2, CreditCard, Users, Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Encuentra tu hogar ideal
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              La plataforma inmobiliaria más completa de México. Busca propiedades, 
              consulta tu crédito INFONAVIT y conecta con brókers profesionales.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/properties">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Search className="mr-2 h-5 w-5" />
                  Buscar Propiedades
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Registrarse Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative -mt-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ubicación
                </label>
                <input
                  type="text"
                  placeholder="Ciudad, colonia..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Propiedad
                </label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Todos los tipos</option>
                  <option>Casa</option>
                  <option>Departamento</option>
                  <option>Terreno</option>
                  <option>Comercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rango de Precio
                </label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Cualquier precio</option>
                  <option>Hasta $500,000</option>
                  <option>$500,000 - $1,000,000</option>
                  <option>$1,000,000 - $2,000,000</option>
                  <option>Más de $2,000,000</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Explora por tipo de propiedad</h2>
            <p className="mt-4 text-lg text-gray-600">
              Encuentra el tipo de propiedad que mejor se adapte a tus necesidades
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">¿Por qué elegirnos?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Ofrecemos las mejores herramientas para tu búsqueda inmobiliaria
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              ¿Listo para encontrar tu hogar ideal?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Únete a miles de personas que ya encontraron su hogar con nosotros
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Comenzar Ahora
                </Button>
              </Link>
              <Link href="/properties">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Ver Propiedades
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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