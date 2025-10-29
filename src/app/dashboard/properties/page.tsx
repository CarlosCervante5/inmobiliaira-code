'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Heart,
  MapPin,
  Bed,
  Bath,
  Car,
  Ruler
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Datos de ejemplo para el MVP
const mockProperties = [
  {
    id: '1',
    title: 'Casa moderna en Polanco',
    price: 2500000,
    type: 'Casa',
    status: 'Disponible',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    parking: 2,
    address: 'Av. Masaryk 123, Polanco',
    views: 45,
    inquiries: 8,
    publishedAt: '2024-01-15',
    image: '/placeholder-property.jpg'
  },
  {
    id: '2',
    title: 'Departamento en Roma Norte',
    price: 1800000,
    type: 'Departamento',
    status: 'En proceso',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    parking: 1,
    address: 'Calle Orizaba 456, Roma Norte',
    views: 32,
    inquiries: 5,
    publishedAt: '2024-01-10',
    image: '/placeholder-property.jpg'
  },
  {
    id: '3',
    title: 'Casa en Condesa',
    price: 3200000,
    type: 'Casa',
    status: 'Vendida',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    parking: 2,
    address: 'Calle Amsterdam 789, Condesa',
    views: 67,
    inquiries: 12,
    publishedAt: '2024-01-05',
    image: '/placeholder-property.jpg'
  }
]

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-800'
      case 'En proceso':
        return 'bg-yellow-100 text-yellow-800'
      case 'Vendida':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Mis Propiedades
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Gestiona tus propiedades publicadas
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/dashboard/properties/new">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Propiedad
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Vistas</p>
              <p className="text-2xl font-semibold text-gray-900">144</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Consultas</p>
              <p className="text-2xl font-semibold text-gray-900">25</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Bed className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Propiedades</p>
              <p className="text-2xl font-semibold text-gray-900">{mockProperties.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar propiedades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="Disponible">Disponible</option>
              <option value="En proceso">En proceso</option>
              <option value="Vendida">Vendida</option>
            </select>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="space-y-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {property.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.address}
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
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <span className="text-2xl font-bold text-gray-900">
                          ${property.price.toLocaleString()}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getStatusColor(property.status)}`}>
                          {property.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {property.views} vistas
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {property.inquiries} consultas
                    </span>
                    <span>Publicada: {property.publishedAt}</span>
                  </div>
                  <div className="mt-4 sm:mt-0 flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Search className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron propiedades</h3>
            <p className="mt-1 text-sm text-gray-500">
              Intenta ajustar tus filtros de búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
