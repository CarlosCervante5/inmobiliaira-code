'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { PropertyCard } from '@/components/property/PropertyCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search, Filter, MapPin, Bed, Bath, Car, Ruler } from 'lucide-react'
import { Property, PropertyType, PropertyWithOwner } from '@/types'

// Datos de ejemplo para el MVP
const mockProperties: PropertyWithOwner[] = [
  {
    id: '1',
    title: 'Casa moderna en Polanco',
    description: 'Hermosa casa de 3 recámaras en una de las mejores zonas de la ciudad',
    price: 2500000,
    type: 'HOUSE' as PropertyType,
    status: 'AVAILABLE' as any,
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    parking: 2,
    floors: 2,
    age: 5,
    address: 'Av. Masaryk 123, Polanco',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '11560',
    latitude: 19.4326,
    longitude: -99.1332,
    amenities: ['Jardín', 'Terraza', 'Seguridad 24/7'],
    images: ['/placeholder-property.jpg'],
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    ownerId: '1',
    owner: {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      emailVerified: null,
      image: null,
      role: 'BROKER' as any,
      createdAt: new Date(),
      updatedAt: new Date(),
      nss: null,
      phone: null,
      address: null,
      birthDate: null,
      license: '12345678',
      company: 'Inmobiliaria ABC',
      bio: null,
      specialties: [],
      experience: 5,
    } as any,
  },
  {
    id: '2',
    title: 'Departamento en Roma Norte',
    description: 'Departamento completamente amueblado en edificio moderno',
    price: 1800000,
    type: 'APARTMENT' as PropertyType,
    status: 'AVAILABLE' as any,
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    parking: 1,
    floors: 1,
    age: 2,
    address: 'Calle Orizaba 456, Roma Norte',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '06700',
    latitude: 19.4194,
    longitude: -99.1556,
    amenities: ['Gimnasio', 'Rooftop', 'Concierge'],
    images: ['/placeholder-property.jpg'],
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    ownerId: '1',
    owner: {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      emailVerified: null,
      image: null,
      role: 'BROKER' as any,
      createdAt: new Date(),
      updatedAt: new Date(),
      nss: null,
      phone: null,
      address: null,
      birthDate: null,
      license: '12345678',
      company: 'Inmobiliaria ABC',
      bio: null,
      specialties: [],
      experience: 5,
    } as any,
  },
  {
    id: '3',
    title: 'Terreno comercial en Santa Fe',
    description: 'Terreno ideal para desarrollo comercial o residencial',
    price: 5000000,
    type: 'LAND' as PropertyType,
    status: 'AVAILABLE' as any,
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    parking: 0,
    floors: 0,
    age: 0,
    address: 'Av. Vasco de Quiroga 789, Santa Fe',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '01219',
    latitude: 19.3592,
    longitude: -99.2594,
    amenities: ['Acceso directo', 'Servicios urbanos'],
    images: ['/placeholder-property.jpg'],
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    ownerId: '1',
    owner: {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      emailVerified: null,
      image: null,
      role: 'BROKER' as any,
      createdAt: new Date(),
      updatedAt: new Date(),
      nss: null,
      phone: null,
      address: null,
      birthDate: null,
      license: '12345678',
      company: 'Inmobiliaria ABC',
      bio: null,
      specialties: [],
      experience: 5,
    } as any,
  },
]

export function PropertiesList() {
  const [properties, setProperties] = useState<PropertyWithOwner[]>(mockProperties)
  const [filteredProperties, setFilteredProperties] = useState<PropertyWithOwner[]>(mockProperties)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    city: '',
  })
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const searchParams = useSearchParams()

  // Aplicar filtros
  useEffect(() => {
    let filtered = properties

    // Filtro por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtro por tipo
    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type)
    }

    // Filtro por precio
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= Number(filters.maxPrice))
    }

    // Filtro por habitaciones
    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= Number(filters.bedrooms))
    }

    // Filtro por baños
    if (filters.bathrooms) {
      filtered = filtered.filter(property => property.bathrooms >= Number(filters.bathrooms))
    }

    // Filtro por ciudad
    if (filters.city) {
      filtered = filtered.filter(property => 
        property.city.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    setFilteredProperties(filtered)
  }, [properties, searchQuery, filters])

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      city: '',
    })
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 px-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Propiedades Disponibles</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Encuentra tu hogar ideal entre {filteredProperties.length} propiedades
          </p>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Barra de búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por ubicación, características..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Botón de filtros */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </Button>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <div className="mt-4 rounded-lg bg-white p-4 sm:p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Propiedad
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Todos los tipos</option>
                    <option value="HOUSE">Casa</option>
                    <option value="APARTMENT">Departamento</option>
                    <option value="TOWNHOUSE">Casa Adosada</option>
                    <option value="LAND">Terreno</option>
                    <option value="COMMERCIAL">Comercial</option>
                    <option value="OFFICE">Oficina</option>
                    <option value="WAREHOUSE">Bodega</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio Mínimo
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio Máximo
                  </label>
                  <input
                    type="number"
                    placeholder="Sin límite"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Habitaciones
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Cualquier cantidad</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Baños
                  </label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Cualquier cantidad</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar Filtros
                </Button>
                <Button onClick={() => setShowFilters(false)}>
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Resultados */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <p className="text-xs sm:text-sm text-gray-600">
              Mostrando {filteredProperties.length} de {properties.length} propiedades
            </p>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Ordenar por:</span>
              <select className="flex-1 sm:flex-none rounded-md border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-1 text-xs sm:text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="newest">Más recientes</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="area">Área</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de propiedades */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No se encontraron propiedades
            </h3>
            <p className="mt-2 text-gray-600">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <div className="mt-6">
              <Button onClick={clearFilters}>
                Limpiar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
