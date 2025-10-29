'use client'

import { useState } from 'react'
import { 
  Heart, 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Ruler,
  Eye,
  MessageCircle,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Datos de ejemplo para el MVP
const mockFavorites = [
  {
    id: '1',
    title: 'Casa moderna en Polanco',
    price: 2500000,
    type: 'Casa',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    parking: 2,
    address: 'Av. Masaryk 123, Polanco',
    city: 'Ciudad de México',
    state: 'CDMX',
    addedAt: '2024-01-15',
    image: '/placeholder-property.jpg',
    broker: {
      name: 'Juan Pérez',
      company: 'Inmobiliaria ABC',
      phone: '+52 55 1234 5678'
    }
  },
  {
    id: '2',
    title: 'Departamento en Roma Norte',
    price: 1800000,
    type: 'Departamento',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    parking: 1,
    address: 'Calle Orizaba 456, Roma Norte',
    city: 'Ciudad de México',
    state: 'CDMX',
    addedAt: '2024-01-10',
    image: '/placeholder-property.jpg',
    broker: {
      name: 'María González',
      company: 'Propiedades Premium',
      phone: '+52 55 9876 5432'
    }
  },
  {
    id: '3',
    title: 'Casa en Condesa',
    price: 3200000,
    type: 'Casa',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    parking: 2,
    address: 'Calle Amsterdam 789, Condesa',
    city: 'Ciudad de México',
    state: 'CDMX',
    addedAt: '2024-01-05',
    image: '/placeholder-property.jpg',
    broker: {
      name: 'Carlos López',
      company: 'Real Estate Solutions',
      phone: '+52 55 5555 1234'
    }
  }
]

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(mockFavorites)

  const filteredFavorites = favorites.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const removeFavorite = (propertyId: string) => {
    setFavorites(favorites.filter(property => property.id !== propertyId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Mis Favoritos
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Propiedades que has guardado para revisar más tarde
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Favoritos</p>
              <p className="text-2xl font-semibold text-gray-900">{favorites.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Vistas Recientes</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Consultas Enviadas</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en favoritos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Favorites List */}
      <div className="space-y-4">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {property.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.address}, {property.city}, {property.state}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            {property.bedrooms} recámaras
                          </span>
                          <span className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            {property.bathrooms} baños
                          </span>
                          <span className="flex items-center">
                            <Ruler className="h-4 w-4 mr-1" />
                            {property.area} m²
                          </span>
                          <span className="flex items-center">
                            <Car className="h-4 w-4 mr-1" />
                            {property.parking} estacionamientos
                          </span>
                        </div>
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm font-medium text-gray-900">Bróker:</p>
                          <p className="text-sm text-gray-600">{property.broker.name}</p>
                          <p className="text-sm text-gray-500">{property.broker.company}</p>
                          <p className="text-sm text-gray-500">{property.broker.phone}</p>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <span className="text-2xl font-bold text-gray-900">
                          ${property.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 mt-1">
                          Agregado: {property.addedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-red-500" />
                      En favoritos desde {property.addedAt}
                    </span>
                  </div>
                  <div className="mt-4 sm:mt-0 flex space-x-2">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalles
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Contactar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => removeFavorite(property.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Quitar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Heart className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {searchQuery ? 'No se encontraron favoritos' : 'No tienes favoritos aún'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery 
                ? 'Intenta ajustar tu búsqueda.'
                : 'Explora propiedades y agrega las que te gusten a tus favoritos.'
              }
            </p>
            {!searchQuery && (
              <div className="mt-6">
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Propiedades
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
