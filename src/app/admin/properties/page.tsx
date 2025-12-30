'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Building2, Search, Edit, Trash2, Eye, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface Property {
  id: string
  title: string
  price: number
  type: string
  status: string
  city: string
  bedrooms: number
  bathrooms: number
  area: number
  owner: {
    name: string | null
    email: string
  }
  createdAt: string
}

export default function AdminPropertiesPage() {
  const searchParams = useSearchParams()
  const statusFilter = searchParams.get('status')
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProperties()
  }, [statusFilter])

  const fetchProperties = async () => {
    try {
      const url = statusFilter 
        ? `/api/admin/properties?status=${statusFilter}`
        : '/api/admin/properties'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setProperties(data)
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProperties = properties.filter(prop => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      prop.title.toLowerCase().includes(search) ||
      prop.city.toLowerCase().includes(search) ||
      prop.owner.name?.toLowerCase().includes(search) ||
      prop.owner.email.toLowerCase().includes(search)
    )
  })

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      AVAILABLE: { bg: 'bg-green-100', text: 'text-green-800', label: 'Disponible' },
      SOLD: { bg: 'bg-red-100', text: 'text-red-800', label: 'Vendida' },
      RENTED: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Rentada' },
      PENDING: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Pendiente' },
      DRAFT: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Borrador' },
    }
    const badge = badges[status] || badges.DRAFT
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Propiedades</h1>
          <p className="mt-2 text-gray-600">
            Administra todas las propiedades de la plataforma
          </p>
        </div>
        <Link href="/admin/properties/new">
          <Button>
            <Building2 className="h-4 w-4 mr-2" />
            Agregar Propiedad
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por título, ciudad, propietario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/properties">
              <Button variant={!statusFilter ? 'primary' : 'outline'} size="sm">
                Todas
              </Button>
            </Link>
            <Link href="/admin/properties?status=AVAILABLE">
              <Button variant={statusFilter === 'AVAILABLE' ? 'primary' : 'outline'} size="sm">
                Disponibles
              </Button>
            </Link>
            <Link href="/admin/properties?status=SOLD">
              <Button variant={statusFilter === 'SOLD' ? 'primary' : 'outline'} size="sm">
                Vendidas
              </Button>
            </Link>
            <Link href="/admin/properties?status=PENDING">
              <Button variant={statusFilter === 'PENDING' ? 'primary' : 'outline'} size="sm">
                Pendientes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propiedad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Características
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propietario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron propiedades
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                      <div className="text-sm text-gray-500">{property.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${property.price.toLocaleString('es-MX')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {property.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {property.bedrooms} hab. • {property.bathrooms} baños • {property.area}m²
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{property.owner.name || 'Sin nombre'}</div>
                      <div className="text-xs text-gray-400">{property.owner.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(property.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={`/properties/${property.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

