'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Users, Search, Filter, Edit, Trash2, Shield, User, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface UserData {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: string
  phone: string | null
  company: string | null
}

export default function AdminUsersPage() {
  const searchParams = useSearchParams()
  const roleFilter = searchParams.get('role')
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [roleFilter])

  const fetchUsers = async () => {
    try {
      const url = roleFilter 
        ? `/api/admin/users?role=${roleFilter}`
        : '/api/admin/users'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      user.name?.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.phone?.toLowerCase().includes(search) ||
      user.company?.toLowerCase().includes(search)
    )
  })

  const getRoleBadge = (role: string) => {
    const badges = {
      ADMIN: { bg: 'bg-red-100', text: 'text-red-800', icon: Shield, label: 'Admin' },
      BROKER: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Building2, label: 'Bróker' },
      CLIENT: { bg: 'bg-green-100', text: 'text-green-800', icon: User, label: 'Cliente' },
    }
    const badge = badges[role as keyof typeof badges] || badges.CLIENT
    const Icon = badge.icon
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="h-3 w-3" />
        <span>{badge.label}</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="mt-2 text-gray-600">
            Administra todos los usuarios de la plataforma
          </p>
        </div>
        <Link href="/admin/users/new">
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Crear Usuario
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
                placeholder="Buscar por nombre, email, teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/users">
              <Button variant={!roleFilter ? 'primary' : 'outline'} size="sm">
                Todos
              </Button>
            </Link>
            <Link href="/admin/users?role=BROKER">
              <Button variant={roleFilter === 'BROKER' ? 'primary' : 'outline'} size="sm">
                Brókers
              </Button>
            </Link>
            <Link href="/admin/users?role=CLIENT">
              <Button variant={roleFilter === 'CLIENT' ? 'primary' : 'outline'} size="sm">
                Clientes
              </Button>
            </Link>
            <Link href="/admin/users?role=ADMIN">
              <Button variant={roleFilter === 'ADMIN' ? 'primary' : 'outline'} size="sm">
                Admins
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Registro
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || 'Sin nombre'}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{user.phone || 'N/A'}</div>
                      {user.company && (
                        <div className="text-xs text-gray-400">{user.company}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('es-MX')}
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

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Brókers</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {users.filter(u => u.role === 'BROKER').length}
              </p>
            </div>
            <Building2 className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clientes</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {users.filter(u => u.role === 'CLIENT').length}
              </p>
            </div>
            <User className="h-12 w-12 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

