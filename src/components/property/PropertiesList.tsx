'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { PropertyCardHomie } from '@/components/property/PropertyCardHomie'
import { PropertyMap } from '@/components/map/PropertyMap'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search, Filter, Map, List } from 'lucide-react'
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
    images: ['/images/properties/casa-polanco.jpg'],
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
    images: ['/images/properties/depto-roma.jpg'],
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
    images: ['/images/properties/terreno.jpg'],
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

  const [selectedProperty, setSelectedProperty] = useState<PropertyWithOwner | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fijo */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto max-w-full px-4 py-4">
          {/* Breadcrumb */}
          <div className="mb-3">
            <span className="text-sm text-gray-600">
              {'> '}
              <span className="text-gray-900 font-medium">Propiedades en Ciudad de México, CDMX</span>
            </span>
          </div>

          {/* Búsqueda y filtros */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Barra de búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ingresa tu colonia, ciudad o región"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filtrar {Object.values(filters).filter(f => f).length > 0 ? `(${Object.values(filters).filter(f => f).length})` : ''}</span>
              </Button>
              <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Ordenar</option>
                <option>Precio: Menor a Mayor</option>
                <option>Precio: Mayor a Menor</option>
                <option>Más recientes</option>
                <option>Área</option>
              </select>
            </div>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Propiedad
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Todos los tipos</option>
                    <option value="HOUSE">Casa</option>
                    <option value="APARTMENT">Departamento</option>
                    <option value="LAND">Terreno</option>
                    <option value="COMMERCIAL">Comercial</option>
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Habitaciones
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={clearFilters} className="mr-2">
                  Limpiar
                </Button>
                <Button onClick={() => setShowFilters(false)}>
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal - Layout dividido */}
      <div className="flex h-[calc(100vh-200px)]">
        {/* Panel izquierdo - Lista de propiedades */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-white border-r border-gray-200">
          <div className="p-4">
            {/* Resultados */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-green-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </span>
                <span className="text-base font-medium text-gray-900">
                  Encontramos {filteredProperties.length} propiedades
                </span>
              </div>
              <span className="text-sm text-gray-600">
                1 - {Math.min(10, filteredProperties.length)} de {filteredProperties.length} resultados
              </span>
            </div>

            {/* Lista de propiedades */}
            {filteredProperties.length > 0 ? (
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <PropertyCardHomie
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onSelect={setSelectedProperty}
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
              </div>
            )}
          </div>
        </div>

        {/* Panel derecho - Mapa */}
        <div className="hidden lg:block w-1/2 relative bg-gray-200">
          <PropertyMap
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            onPropertySelect={setSelectedProperty}
          />
        </div>
      </div>
    </div>
  )
}
