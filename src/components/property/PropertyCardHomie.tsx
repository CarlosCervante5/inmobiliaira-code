'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, MapPin, Bed, Bath, Car, Ruler, Heart } from 'lucide-react'
import { PropertyWithOwner } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

interface PropertyCardHomieProps {
  property: PropertyWithOwner
  isFavorite?: boolean
  onToggleFavorite?: (propertyId: string) => void
  onSelect?: (property: PropertyWithOwner) => void
}

export function PropertyCardHomie({
  property,
  isFavorite = false,
  onToggleFavorite,
  onSelect,
}: PropertyCardHomieProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = property.images || ['/placeholder-property.jpg']

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleFavorite?.(property.id)
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handleCardClick = () => {
    onSelect?.(property)
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

  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
      onClick={handleCardClick}
    >
      {/* Imagen */}
      <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
        <Image
          src={images[currentImageIndex]}
          alt={property.title}
          fill
          className="object-cover"
        />
        
        {/* Etiqueta Exclusivo */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-600 text-xs font-medium text-white">
            Exclusivo
          </span>
        </div>

        {/* Botón de favorito */}
        <button
          onClick={handleToggleFavorite}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm transition-colors hover:bg-white"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Botón de siguiente imagen si hay más */}
        {images.length > 1 && (
          <button
            onClick={handleNextImage}
            className="absolute right-3 bottom-3 rounded-full bg-white/90 p-2 shadow-sm transition-colors hover:bg-white"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Precio */}
        <div className="mb-3">
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(property.price)}
          </p>
        </div>

        {/* Título */}
        <Link href={`/properties/${property.id}`}>
          <h3 className="mb-2 text-base font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
        </Link>

        {/* Ubicación */}
        <div className="mb-3 flex items-center text-sm text-gray-600">
          <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">
            {property.address}, {property.city}
          </span>
        </div>

        {/* Características */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="mr-1 h-4 w-4" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Recámara' : 'Recámaras'}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center">
              <Bath className="mr-1 h-4 w-4" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Baño' : 'Baños'}</span>
            </div>
          )}
          {property.area > 0 && (
            <div className="flex items-center">
              <Ruler className="mr-1 h-4 w-4" />
              <span>{property.area} mt²</span>
            </div>
          )}
        </div>

        {/* Amenidades adicionales */}
        {property.parking && property.parking > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-700">
              Estacionamiento
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
