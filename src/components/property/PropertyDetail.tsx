'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Ruler, 
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  Building2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PropertyWithOwner } from '@/types'
import { formatPrice } from '@/lib/utils'
import { PropertyGallery } from './PropertyGallery'
import { PropertyInfo } from './PropertyInfo'
import { PropertyContact } from './PropertyContact'
import { PropertyMap } from '@/components/map/PropertyMap'

interface PropertyDetailProps {
  property: PropertyWithOwner
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'contact' | 'map'>('info')

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const getPropertyTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      HOUSE: 'Casa',
      APARTMENT: 'Departamento',
      LAND: 'Terreno',
      COMMERCIAL: 'Comercial',
    }
    return labels[type] || type
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      AVAILABLE: 'Disponible',
      SOLD: 'Vendida',
      RENTED: 'Rentada',
      PENDING: 'En proceso',
    }
    return labels[status] || status
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800'
      case 'SOLD':
        return 'bg-blue-100 text-blue-800'
      case 'RENTED':
        return 'bg-purple-100 text-purple-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/properties">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {property.title}
                </h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.address}, {property.city}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleFavorite}
                className={`border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 ${
                  isFavorite ? 'text-red-600 border-red-300 bg-red-50 hover:bg-red-100' : ''
                }`}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Guardado' : 'Guardar'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galería de imágenes */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Información básica */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {formatPrice(property.price)}
                    </h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                      {getStatusLabel(property.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getPropertyTypeLabel(property.type)} • {property.area} m²
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms} recámaras</span>
                      </div>
                    )}
                    {property.bathrooms > 0 && (
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms} baños</span>
                      </div>
                    )}
                    {property.parking && property.parking > 0 && (
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-1" />
                        <span>{property.parking} estacionamientos</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenidades */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenidades</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Información adicional */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Área total</p>
                  <p className="text-lg font-semibold text-gray-900">{property.area} m²</p>
                </div>
                {property.age && property.age > 0 && (
                  <div>
                    <p className="text-sm text-gray-500">Antigüedad</p>
                    <p className="text-lg font-semibold text-gray-900">{property.age} años</p>
                  </div>
                )}
                {property.floors && property.floors > 0 && (
                  <div>
                    <p className="text-sm text-gray-500">Pisos</p>
                    <p className="text-lg font-semibold text-gray-900">{property.floors}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Publicado</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {property.publishedAt ? property.publishedAt.toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs de información adicional */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'info', label: 'Información', icon: Building2 },
                    { id: 'contact', label: 'Contacto', icon: MessageCircle },
                    { id: 'map', label: 'Ubicación', icon: MapPin },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'info' && <PropertyInfo property={property} />}
                {activeTab === 'contact' && <PropertyContact property={property} />}
                {activeTab === 'map' && (
                  <div className="h-96">
                    <PropertyMap
                      properties={[property]}
                      selectedProperty={property}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Información del bróker */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bróker</h3>
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{property.owner.name}</h4>
                  <p className="text-sm text-gray-600">{property.owner.company}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">4.8 (23 reseñas)</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {property.owner.experience} años de experiencia
                  </p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <Button className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Llamar: {property.owner.phone}
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar email
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Enviar mensaje
                </Button>
              </div>
            </div>

            {/* Formulario de contacto rápido */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Solicitar información</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Tu teléfono"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Mensaje (opcional)"
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <Button className="w-full">
                  Enviar solicitud
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
