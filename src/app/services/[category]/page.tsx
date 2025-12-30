'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { use } from 'react'
import { ArrowLeft, CheckCircle, Star, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ServiceCategory {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  slug: string
}

interface Service {
  id: string
  name: string
  description: string
  basePrice: number | null
  priceRange: string | null
  duration: string | null
  estimatedHours: number | null
  category: {
    id: string
    name: string
    slug: string
    icon: string | null
    color: string | null
  }
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = use(params)
  const [category, setCategory] = useState<ServiceCategory | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategoryData()
  }, [categorySlug])

  const fetchCategoryData = async () => {
    try {
      // Obtener categoría por slug
      const categoryRes = await fetch(`/api/services/categories`)
      if (categoryRes.ok) {
        const categories = await categoryRes.json()
        const foundCategory = categories.find((cat: ServiceCategory) => cat.slug === categorySlug)
        setCategory(foundCategory || null)

        if (foundCategory) {
          // Obtener servicios de esta categoría
          const servicesRes = await fetch(`/api/services?categorySlug=${categorySlug}`)
          if (servicesRes.ok) {
            const servicesData = await servicesRes.json()
            setServices(servicesData)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching category data:', error)
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

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
          <Link href="/services">
            <Button>Volver a Servicios</Button>
          </Link>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number | null, priceRange: string | null) => {
    if (priceRange) return priceRange
    if (price) return `Desde $${price.toLocaleString('es-MX')}`
    return 'Cotización'
  }

  const formatDuration = (duration: string | null, estimatedHours: number | null) => {
    if (duration) return duration
    if (estimatedHours) {
      if (estimatedHours < 1) return `${Math.round(estimatedHours * 60)} minutos`
      if (estimatedHours < 24) return `${Math.round(estimatedHours)} horas`
      const days = Math.round(estimatedHours / 24)
      return `${days} día${days > 1 ? 's' : ''}`
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/services" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Servicios
          </Link>
          <div className="flex items-center">
            {category.icon && (
              <span className="text-4xl mr-4">{category.icon}</span>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="mt-2 text-lg text-gray-600">
                {category.description || 'Servicios profesionales de calidad'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay servicios disponibles en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const price = formatPrice(service.basePrice, service.priceRange)
              const duration = formatDuration(service.duration, service.estimatedHours)

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {price && (
                      <div className="flex items-center text-sm text-gray-700">
                        <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                        <span className="font-medium">{price}</span>
                      </div>
                    )}
                    {duration && (
                      <div className="flex items-center text-sm text-gray-700">
                        <Clock className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{duration}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">4.8 (120+ reseñas)</span>
                  </div>

                  <Button className="w-full" size="sm">
                    Reservar Ahora
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 border-t border-blue-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas algo más específico?</h2>
            <p className="text-gray-600 mb-6">
              Contáctanos para obtener una cotización personalizada
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Solicitar Cotización Personalizada
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
