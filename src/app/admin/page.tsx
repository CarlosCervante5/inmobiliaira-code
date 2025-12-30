'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Users, 
  Building2, 
  TrendingUp, 
  MessageSquare,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Activity,
  Wrench
} from 'lucide-react'
import Link from 'next/link'

interface Stats {
  totalUsers: number
  totalBrokers: number
  totalClients: number
  totalProperties: number
  availableProperties: number
  totalLeads: number
  newLeads: number
  totalMessages: number
  totalValue: number
  totalServices: number
  totalCategories: number
  totalProviders: number
  activeProviders: number
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      name: 'Total Usuarios',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase' as const,
      href: '/admin/users'
    },
    {
      name: 'Brókers',
      value: stats?.totalBrokers || 0,
      icon: Users,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'increase' as const,
      href: '/admin/users?role=BROKER'
    },
    {
      name: 'Clientes',
      value: stats?.totalClients || 0,
      icon: Users,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'increase' as const,
      href: '/admin/users?role=CLIENT'
    },
    {
      name: 'Propiedades',
      value: stats?.totalProperties || 0,
      icon: Building2,
      color: 'bg-orange-500',
      change: '+15%',
      changeType: 'increase' as const,
      href: '/admin/properties'
    },
    {
      name: 'Propiedades Disponibles',
      value: stats?.availableProperties || 0,
      icon: Building2,
      color: 'bg-teal-500',
      change: '-3%',
      changeType: 'decrease' as const,
      href: '/admin/properties?status=AVAILABLE'
    },
    {
      name: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: TrendingUp,
      color: 'bg-pink-500',
      change: '+23%',
      changeType: 'increase' as const,
      href: '/admin/leads'
    },
    {
      name: 'Nuevos Leads',
      value: stats?.newLeads || 0,
      icon: Activity,
      color: 'bg-red-500',
      change: '+18%',
      changeType: 'increase' as const,
      href: '/admin/leads?status=NEW'
    },
    {
      name: 'Mensajes',
      value: stats?.totalMessages || 0,
      icon: MessageSquare,
      color: 'bg-indigo-500',
      change: '+7%',
      changeType: 'increase' as const,
      href: '/admin/messages'
    },
    {
      name: 'Valor Total',
      value: `$${(stats?.totalValue || 0).toLocaleString('es-MX')}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+10%',
      changeType: 'increase' as const,
      href: '/admin/properties'
    },
    {
      name: 'Servicios',
      value: stats?.totalServices || 0,
      icon: Wrench,
      color: 'bg-indigo-500',
      change: '+8%',
      changeType: 'increase' as const,
      href: '/admin/services'
    },
    {
      name: 'Categorías',
      value: stats?.totalCategories || 0,
      icon: Wrench,
      color: 'bg-teal-500',
      change: '+5%',
      changeType: 'increase' as const,
      href: '/admin/services'
    },
    {
      name: 'Personal',
      value: stats?.totalProviders || 0,
      icon: Users,
      color: 'bg-pink-500',
      change: '+12%',
      changeType: 'increase' as const,
      href: '/admin/service-providers'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="mt-2 text-gray-600">
          Bienvenido, {session?.user?.name}. Aquí puedes gestionar toda la plataforma.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="mt-2 flex items-center">
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`ml-1 text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">vs mes anterior</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/users/new"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Crear Usuario</span>
          </Link>
          <Link
            href="/admin/properties/new"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Building2 className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">Agregar Propiedad</span>
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">Ver Leads</span>
          </Link>
          <Link
            href="/admin/analytics"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Activity className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-900">Ver Estadísticas</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nuevo usuario registrado</p>
                <p className="text-xs text-gray-500">Hace 5 minutos</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Building2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nueva propiedad agregada</p>
                <p className="text-xs text-gray-500">Hace 15 minutos</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nuevo lead recibido</p>
                <p className="text-xs text-gray-500">Hace 30 minutos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

