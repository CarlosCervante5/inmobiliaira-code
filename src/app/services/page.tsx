'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Sofa,
  Tv,
  Paintbrush
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getIconFromString, getColorClass } from '@/lib/service-icons'

interface ServiceCategory {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  slug: string
  _count: {
    services: number
  }
}

interface Service {
  id: string
  name: string
  description: string
  basePrice: number | null
  priceRange: string | null
  duration: string | null
  isPopular: boolean
  category: {
    id: string
    name: string
    slug: string
    icon: string | null
    color: string | null
  }
}

const benefits = [
  {
    icon: Star,
    title: 'Profesionales Verificados',
    description: 'Todos nuestros profesionales están verificados y altamente calificados'
  },
  {
    icon: CheckCircle,
    title: 'Garantía de Satisfacción',
    description: 'Garantizamos tu satisfacción o trabajamos para hacerlo bien'
  },
  {
    icon: Sparkles,
    title: 'Precios Transparentes',
    description: 'Precios claros y sin sorpresas antes de contratar'
  },
  {
    icon: Star,
    title: 'Disponibilidad 24/7',
    description: 'Atención al cliente disponible las 24 horas del día, 7 días a la semana'
  },
]

export default function ServicesPage() {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [popularServices, setPopularServices] = useState<Service[]>([])
  const [categoryServices, setCategoryServices] = useState<Record<string, Service[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Obtener categorías
      const categoriesRes = await fetch('/api/services/categories')
      if (categoriesRes.ok) {
        const cats = await categoriesRes.json()
        setCategories(cats)

        // Obtener servicios para cada categoría
        const servicesPromises = cats.map(async (cat: ServiceCategory) => {
          const servicesRes = await fetch(`/api/services?categoryId=${cat.id}`)
          if (servicesRes.ok) {
            const services = await servicesRes.json()
            return { categoryId: cat.id, services }
          }
          return { categoryId: cat.id, services: [] }
        })

        const servicesResults = await Promise.all(servicesPromises)
        const servicesMap: Record<string, Service[]> = {}
        servicesResults.forEach(({ categoryId, services }) => {
          servicesMap[categoryId] = services
        })
        setCategoryServices(servicesMap)
      }

      // Obtener servicios populares
      const popularRes = await fetch('/api/services?popular=true')
      if (popularRes.ok) {
        const popular = await popularRes.json()
        setPopularServices(popular.slice(0, 4)) // Solo los primeros 4
      }
    } catch (error) {
      console.error('Error fetching services data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Servicios de Mantenimiento
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-blue-100 px-2">
              La forma fácil y confiable de cuidar tu hogar. Reserva servicios de profesionales altamente calificados a precios transparentes.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Ver Todos los Servicios
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Solicitar Cotización
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías de Servicios */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Nuestros Servicios</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Selecciona una categoría para ver los servicios disponibles
            </p>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay categorías disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const IconComponent = getIconFromString(category.icon)
                const colorClass = getColorClass(category.color)
                const services = categoryServices[category.id] || []
                const displayServices = services.slice(0, 4)

                return (
                  <div
                    key={category.id}
                    className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl"
                  >
                    <div className={`${colorClass} p-6`}>
                      <IconComponent className="h-12 w-12 text-white" />
                      <h3 className="mt-4 text-xl font-bold text-white">{category.name}</h3>
                      <p className="mt-2 text-sm text-white/90">
                        {category.description || 'Servicios profesionales de calidad'}
                      </p>
                    </div>
                    
                    <div className="p-6">
                      {displayServices.length > 0 ? (
                        <>
                          <ul className="space-y-3">
                            {displayServices.map((service) => (
                              <li key={service.id} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{service.name}</p>
                                  <p className="text-xs text-gray-500 line-clamp-1">{service.description}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                          {services.length > 4 && (
                            <p className="mt-4 text-sm text-gray-500">
                              +{services.length - 4} servicios más
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">No hay servicios disponibles</p>
                      )}
                      <Link href={`/services/${category.slug}`}>
                        <Button 
                          variant="outline" 
                          className="mt-6 w-full group-hover:bg-blue-50"
                        >
                          Ver Servicios
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Servicios Populares */}
      {popularServices.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Servicios Más Populares</h2>
              <p className="mt-4 text-base sm:text-lg text-gray-600">
                Reserva instantáneamente servicios altamente calificados a precios transparentes
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {popularServices.map((service) => {
                const ServiceIcon = getIconFromString(service.category.icon)
                const iconColorClass = getColorClass(service.category.color)

                return (
                  <div
                    key={service.id}
                    className="group relative overflow-hidden rounded-lg bg-white border-2 border-gray-200 p-6 transition-all hover:border-blue-500 hover:shadow-lg"
                  >
                    <div className={`${iconColorClass} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <ServiceIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {service.description}
                    </p>
                    {service.priceRange && (
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {service.priceRange}
                      </p>
                    )}
                    <Button variant="outline" size="sm" className="mt-4 w-full">
                      Reservar
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Beneficios */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">¿Por qué elegirnos?</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              ¿Listo para cuidar tu hogar?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-blue-100">
              Reserva servicios de profesionales verificados hoy mismo
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Ver Todos los Servicios
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Contactar un Profesional
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
