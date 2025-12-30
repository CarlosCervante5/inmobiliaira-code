'use client'

import Link from 'next/link'
import { 
  Sparkles, 
  Wrench, 
  Home, 
  Building2, 
  TreePine, 
  Hammer,
  Droplet,
  Zap,
  Paintbrush,
  Sofa,
  Tv,
  Lightbulb,
  Fan,
  Car,
  Scissors,
  Trash2,
  Brush,
  DoorOpen,
  Square,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

// Categorías de servicios
const serviceCategories = [
  {
    id: 'limpieza',
    name: 'Limpieza',
    icon: Sparkles,
    description: 'Servicios de limpieza profesional para tu hogar u oficina',
    color: 'bg-blue-500',
    services: [
      { name: 'Limpieza de Hogar', description: 'Limpieza regular y profunda de tu hogar' },
      { name: 'Limpieza de Mudanza', description: 'Limpieza completa al mudarte' },
      { name: 'Limpieza de Oficina', description: 'Mantenimiento de espacios comerciales' },
      { name: 'Limpieza Profunda', description: 'Limpieza exhaustiva de toda la casa' },
    ]
  },
  {
    id: 'instalacion',
    name: 'Instalación',
    icon: Wrench,
    description: 'Instalación profesional de electrodomésticos y accesorios',
    color: 'bg-green-500',
    services: [
      { name: 'Montaje de TV', description: 'Instalación y montaje de televisores' },
      { name: 'Colgar Cuadros y Estantes', description: 'Instalación de decoración y estantería' },
      { name: 'Instalación de Luminarias', description: 'Colocación de lámparas y luces' },
      { name: 'Instalación de Ventiladores', description: 'Montaje de ventiladores de techo' },
    ]
  },
  {
    id: 'handyman',
    name: 'Handyman',
    icon: Hammer,
    description: 'Reparaciones y trabajos generales del hogar',
    color: 'bg-orange-500',
    services: [
      { name: 'Ensamblaje de Muebles', description: 'Armado profesional de muebles' },
      { name: 'Reparaciones Generales', description: 'Arreglos diversos del hogar' },
      { name: 'Plomería General', description: 'Reparaciones de tuberías y grifería' },
      { name: 'Reparación de Grifos', description: 'Arreglo y cambio de llaves de agua' },
      { name: 'Reparación de Inodoros', description: 'Mantenimiento de sanitarios' },
      { name: 'Electricidad General', description: 'Reparaciones eléctricas básicas' },
      { name: 'Instalación de Contactos', description: 'Colocación de enchufes y apagadores' },
      { name: 'Ayuda con Mudanzas', description: 'Asistencia en el proceso de mudanza' },
    ]
  },
  {
    id: 'exteriores',
    name: 'Proyectos Exteriores',
    icon: TreePine,
    description: 'Mantenimiento y mejoras de espacios exteriores',
    color: 'bg-emerald-500',
    services: [
      { name: 'Cuidado de Jardín', description: 'Mantenimiento de césped y jardín' },
      { name: 'Limpieza de Canaletas', description: 'Limpieza de bajantes y desagües' },
      { name: 'Remoción de Árboles', description: 'Tala y remoción de árboles' },
      { name: 'Poda de Árboles', description: 'Recorte y mantenimiento de árboles' },
      { name: 'Instalación de Cercas', description: 'Colocación de cercas de madera' },
      { name: 'Reparación de Terrazas', description: 'Mantenimiento de porches y terrazas' },
      { name: 'Instalación de Terrazas', description: 'Construcción de decks y porches' },
      { name: 'Pintura Exterior', description: 'Pintura de fachadas y exteriores' },
      { name: 'Superficies Exteriores', description: 'Mantenimiento de superficies externas' },
    ]
  },
  {
    id: 'renovaciones',
    name: 'Renovaciones del Hogar',
    icon: Home,
    description: 'Proyectos de renovación y remodelación completa',
    color: 'bg-purple-500',
    services: [
      { name: 'Remodelación de Baño', description: 'Renovación completa de baños' },
      { name: 'Remodelación de Cocina', description: 'Renovación integral de cocinas' },
      { name: 'Remodelación de Sótano', description: 'Acondicionamiento de sótanos' },
      { name: 'Renovaciones Mayores', description: 'Proyectos de renovación extensos' },
      { name: 'Acabado de Pisos de Madera', description: 'Restauración de pisos de madera' },
      { name: 'Instalación de Techos', description: 'Colocación de techos nuevos' },
      { name: 'Reparación de Techos', description: 'Mantenimiento y reparación de techos' },
      { name: 'Instalación de Ventanas', description: 'Colocación de ventanas nuevas' },
      { name: 'Pintura Interior', description: 'Pintura de interiores' },
      { name: 'Tratamiento de Ventanas', description: 'Instalación de cortinas y persianas' },
    ]
  },
]

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
    icon: Home,
    title: 'Disponibilidad 24/7',
    description: 'Atención al cliente disponible las 24 horas del día, 7 días a la semana'
  },
]

export default function ServicesPage() {
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl"
              >
                <div className={`${category.color} p-6`}>
                  <category.icon className="h-12 w-12 text-white" />
                  <h3 className="mt-4 text-xl font-bold text-white">{category.name}</h3>
                  <p className="mt-2 text-sm text-white/90">{category.description}</p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.services.slice(0, 4).map((service, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{service.name}</p>
                          <p className="text-xs text-gray-500">{service.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {category.services.length > 4 && (
                    <p className="mt-4 text-sm text-gray-500">
                      +{category.services.length - 4} servicios más
                    </p>
                  )}
                  <Link href={`/services/${category.id}`}>
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
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Populares */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Servicios Más Populares</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Reserva instantáneamente servicios altamente calificados a precios transparentes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Limpieza de Hogar', icon: Sparkles, color: 'bg-blue-100 text-blue-600' },
              { name: 'Ensamblaje de Muebles', icon: Sofa, color: 'bg-orange-100 text-orange-600' },
              { name: 'Montaje de TV', icon: Tv, color: 'bg-purple-100 text-purple-600' },
              { name: 'Colgar Cuadros', icon: Paintbrush, color: 'bg-green-100 text-green-600' },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-white border-2 border-gray-200 p-6 transition-all hover:border-blue-500 hover:shadow-lg"
              >
                <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Reserva ahora con profesionales verificados
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Reservar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

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

