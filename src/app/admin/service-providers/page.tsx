'use client'

import { useEffect, useState } from 'react'
import { Users, Plus, Edit, Trash2, Search, Star, CheckCircle, X, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface ServiceProvider {
  id: string
  name: string
  email: string
  phone: string
  address: string | null
  bio: string | null
  specialties: string[]
  experience: number | null
  rating: number | null
  totalReviews: number
  isActive: boolean
  isVerified: boolean
  createdAt: string
}

export default function AdminServiceProvidersPage() {
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState<string>('all')

  useEffect(() => {
    fetchProviders()
  }, [])

  const fetchProviders = async () => {
    console.log('[Client] Iniciando fetch de service-providers...')
    try {
      console.log('[Client] Haciendo fetch a /api/admin/service-providers')
      const response = await fetch('/api/admin/service-providers')
      
      console.log('[Client] Respuesta recibida:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      })
      
      if (response.ok) {
        console.log('[Client] Respuesta OK, parseando JSON...')
        const data = await response.json()
        console.log('[Client] Datos recibidos:', {
          cantidad: Array.isArray(data) ? data.length : 'no es array',
          tipo: typeof data,
          muestra: Array.isArray(data) && data.length > 0 ? data[0] : 'sin datos'
        })
        setProviders(data)
        console.log('[Client] ✅ Proveedores actualizados en estado')
      } else {
        console.error('[Client] ❌ Respuesta no OK:', response.status, response.statusText)
        const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }))
        console.error('[Client] Error data:', errorData)
        alert(`Error al cargar proveedores: ${errorData.error || response.statusText} (${response.status})`)
      }
    } catch (error: any) {
      console.error('[Client] ❌ Error en fetch:', error)
      console.error('[Client] Error name:', error?.name)
      console.error('[Client] Error message:', error?.message)
      console.error('[Client] Error stack:', error?.stack)
      alert(`Error al cargar proveedores: ${error?.message || 'Error desconocido'}`)
    } finally {
      console.log('[Client] Finalizando fetch, estableciendo loading=false')
      setLoading(false)
    }
  }

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = !searchTerm || 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.phone.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterActive === 'all' ||
      (filterActive === 'active' && provider.isActive) ||
      (filterActive === 'inactive' && !provider.isActive) ||
      (filterActive === 'verified' && provider.isVerified)
    
    return matchesSearch && matchesFilter
  })

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
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Personal</h1>
          <p className="mt-2 text-gray-600">
            Administra los profesionales que prestan servicios
          </p>
        </div>
        <Link href="/admin/service-providers/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Profesional
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Personal</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{providers.length}</p>
            </div>
            <Users className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {providers.filter(p => p.isActive).length}
              </p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verificados</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {providers.filter(p => p.isVerified).length}
              </p>
            </div>
            <Shield className="h-12 w-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Promedio Rating</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {providers.length > 0
                  ? (providers.reduce((sum, p) => sum + (p.rating || 0), 0) / providers.length).toFixed(1)
                  : '0.0'}
              </p>
            </div>
            <Star className="h-12 w-12 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email, teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="verified">Verificados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Providers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profesional
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especialidades
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experiencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
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
              {filteredProviders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron profesionales
                  </td>
                </tr>
              ) : (
                filteredProviders.map((provider) => (
                  <tr key={provider.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            {provider.name}
                            {provider.isVerified && (
                              <span title="Verificado">
                                <Shield className="h-4 w-4 text-green-500" />
                              </span>
                            )}
                          </div>
                          {provider.bio && (
                            <div className="text-xs text-gray-500 line-clamp-1">{provider.bio}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{provider.email}</div>
                      <div className="text-xs text-gray-400">{provider.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {provider.specialties.slice(0, 2).map((spec, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {spec}
                          </span>
                        ))}
                        {provider.specialties.length > 2 && (
                          <span className="text-xs text-gray-500">+{provider.specialties.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {provider.experience ? `${provider.experience} años` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-900">
                          {provider.rating?.toFixed(1) || '0.0'}
                        </span>
                        <span className="ml-1 text-xs text-gray-500">
                          ({provider.totalReviews})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {provider.isActive ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <X className="h-3 w-3 mr-1" />
                            Inactivo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
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

