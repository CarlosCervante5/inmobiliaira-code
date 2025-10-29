import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Bed, Bath, Car, Ruler } from 'lucide-react'
import { Property } from '@/types'
import { formatPrice } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
  showFavorite?: boolean
  isFavorite?: boolean
  onToggleFavorite?: (propertyId: string) => void
}

export function PropertyCard({
  property,
  showFavorite = true,
  isFavorite = false,
  onToggleFavorite,
}: PropertyCardProps) {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleFavorite?.(property.id)
  }

  return (
    <Link href={`/properties/${property.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
        {/* Imagen */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={property.images[0] || '/placeholder-property.jpg'}
            alt={property.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {showFavorite && (
            <button
              onClick={handleToggleFavorite}
              className="absolute right-2 top-2 rounded-full bg-white/80 p-2 shadow-sm transition-colors hover:bg-white"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>
          )}
          <div className="absolute left-2 top-2 rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">
            {property.type}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
            {property.title}
          </h3>
          
          <p className="mb-3 text-2xl font-bold text-blue-600">
            {formatPrice(property.price)}
          </p>

          {/* Ubicación */}
          <div className="mb-3 flex items-center text-sm text-gray-600">
            <MapPin className="mr-1 h-4 w-4" />
            <span className="line-clamp-1">
              {property.address}, {property.city}
            </span>
          </div>

          {/* Características */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="mr-1 h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-1 h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
              {property.parking && property.parking > 0 && (
                <div className="flex items-center">
                  <Car className="mr-1 h-4 w-4" />
                  <span>{property.parking}</span>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <Ruler className="mr-1 h-4 w-4" />
              <span>{property.area}m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
