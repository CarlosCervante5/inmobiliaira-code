'use client'

import Link from 'next/link'
import { use } from 'react'
import { ArrowLeft, CheckCircle, Star, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Datos de servicios por categoría
const categoryData: Record<string, {
  name: string
  description: string
  icon: string
  services: Array<{ name: string; description: string; price?: string; duration?: string }>
}> = {
  limpieza: {
    name: 'Limpieza',
    description: 'Servicios de limpieza profesional para tu hogar u oficina',
    icon: '✨',
    services: [
      { name: 'Limpieza de Hogar', description: 'Limpieza regular y profunda de tu hogar', price: 'Desde $500', duration: '2-4 horas' },
      { name: 'Limpieza de Mudanza', description: 'Limpieza completa al mudarte', price: 'Desde $1,200', duration: '4-6 horas' },
      { name: 'Limpieza de Oficina', description: 'Mantenimiento de espacios comerciales', price: 'Desde $800', duration: '3-5 horas' },
      { name: 'Limpieza Profunda', description: 'Limpieza exhaustiva de toda la casa', price: 'Desde $1,500', duration: '6-8 horas' },
      { name: 'Limpieza de Alfombras', description: 'Lavado profesional de alfombras', price: 'Desde $400', duration: '2-3 horas' },
      { name: 'Limpieza de Ventanas', description: 'Limpieza interior y exterior de ventanas', price: 'Desde $300', duration: '1-2 horas' },
    ]
  },
  instalacion: {
    name: 'Instalación',
    description: 'Instalación profesional de electrodomésticos y accesorios',
    icon: '🔧',
    services: [
      { name: 'Montaje de TV', description: 'Instalación y montaje de televisores', price: 'Desde $400', duration: '1-2 horas' },
      { name: 'Colgar Cuadros y Estantes', description: 'Instalación de decoración y estantería', price: 'Desde $300', duration: '1-2 horas' },
      { name: 'Instalación de Luminarias', description: 'Colocación de lámparas y luces', price: 'Desde $350', duration: '1-2 horas' },
      { name: 'Instalación de Ventiladores', description: 'Montaje de ventiladores de techo', price: 'Desde $500', duration: '2-3 horas' },
      { name: 'Instalación de Persianas', description: 'Colocación de cortinas y persianas', price: 'Desde $400', duration: '1-2 horas' },
    ]
  },
  handyman: {
    name: 'Handyman',
    description: 'Reparaciones y trabajos generales del hogar',
    icon: '🔨',
    services: [
      { name: 'Ensamblaje de Muebles', description: 'Armado profesional de muebles', price: 'Desde $350', duration: '2-4 horas' },
      { name: 'Reparaciones Generales', description: 'Arreglos diversos del hogar', price: 'Desde $400', duration: '2-3 horas' },
      { name: 'Plomería General', description: 'Reparaciones de tuberías y grifería', price: 'Desde $450', duration: '2-3 horas' },
      { name: 'Reparación de Grifos', description: 'Arreglo y cambio de llaves de agua', price: 'Desde $300', duration: '1-2 horas' },
      { name: 'Reparación de Inodoros', description: 'Mantenimiento de sanitarios', price: 'Desde $350', duration: '1-2 horas' },
      { name: 'Electricidad General', description: 'Reparaciones eléctricas básicas', price: 'Desde $500', duration: '2-3 horas' },
      { name: 'Instalación de Contactos', description: 'Colocación de enchufes y apagadores', price: 'Desde $250', duration: '1 hora' },
      { name: 'Ayuda con Mudanzas', description: 'Asistencia en el proceso de mudanza', price: 'Desde $800', duration: '4-6 horas' },
    ]
  },
  exteriores: {
    name: 'Proyectos Exteriores',
    description: 'Mantenimiento y mejoras de espacios exteriores',
    icon: '🌳',
    services: [
      { name: 'Cuidado de Jardín', description: 'Mantenimiento de césped y jardín', price: 'Desde $400', duration: '2-3 horas' },
      { name: 'Limpieza de Canaletas', description: 'Limpieza de bajantes y desagües', price: 'Desde $350', duration: '1-2 horas' },
      { name: 'Remoción de Árboles', description: 'Tala y remoción de árboles', price: 'Desde $1,500', duration: '4-6 horas' },
      { name: 'Poda de Árboles', description: 'Recorte y mantenimiento de árboles', price: 'Desde $600', duration: '2-4 horas' },
      { name: 'Instalación de Cercas', description: 'Colocación de cercas de madera', price: 'Desde $2,000', duration: '1-2 días' },
      { name: 'Reparación de Terrazas', description: 'Mantenimiento de porches y terrazas', price: 'Desde $800', duration: '4-6 horas' },
      { name: 'Instalación de Terrazas', description: 'Construcción de decks y porches', price: 'Desde $3,000', duration: '3-5 días' },
      { name: 'Pintura Exterior', description: 'Pintura de fachadas y exteriores', price: 'Desde $1,200', duration: '2-3 días' },
      { name: 'Superficies Exteriores', description: 'Mantenimiento de superficies externas', price: 'Desde $600', duration: '2-4 horas' },
    ]
  },
  renovaciones: {
    name: 'Renovaciones del Hogar',
    description: 'Proyectos de renovación y remodelación completa',
    icon: '🏠',
    services: [
      { name: 'Remodelación de Baño', description: 'Renovación completa de baños', price: 'Desde $15,000', duration: '1-2 semanas' },
      { name: 'Remodelación de Cocina', description: 'Renovación integral de cocinas', price: 'Desde $20,000', duration: '2-3 semanas' },
      { name: 'Remodelación de Sótano', description: 'Acondicionamiento de sótanos', price: 'Desde $25,000', duration: '3-4 semanas' },
      { name: 'Renovaciones Mayores', description: 'Proyectos de renovación extensos', price: 'Cotización', duration: 'Variable' },
      { name: 'Acabado de Pisos de Madera', description: 'Restauración de pisos de madera', price: 'Desde $3,000', duration: '3-5 días' },
      { name: 'Instalación de Techos', description: 'Colocación de techos nuevos', price: 'Desde $8,000', duration: '1-2 semanas' },
      { name: 'Reparación de Techos', description: 'Mantenimiento y reparación de techos', price: 'Desde $2,000', duration: '2-4 días' },
      { name: 'Instalación de Ventanas', description: 'Colocación de ventanas nuevas', price: 'Desde $5,000', duration: '3-5 días' },
      { name: 'Pintura Interior', description: 'Pintura de interiores', price: 'Desde $1,500', duration: '3-5 días' },
      { name: 'Tratamiento de Ventanas', description: 'Instalación de cortinas y persianas', price: 'Desde $2,000', duration: '1-2 días' },
    ]
  },
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params)
  const data = categoryData[category]

  if (!data) {
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
            <span className="text-4xl mr-4">{data.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
              <p className="mt-2 text-lg text-gray-600">{data.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="space-y-2 mb-4">
                {service.price && (
                  <div className="flex items-center text-sm text-gray-700">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    <span className="font-medium">{service.price}</span>
                  </div>
                )}
                {service.duration && (
                  <div className="flex items-center text-sm text-gray-700">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{service.duration}</span>
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
          ))}
        </div>
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

