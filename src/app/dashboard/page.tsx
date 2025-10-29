'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { 
  Building2, 
  Heart, 
  Search, 
  Plus, 
  TrendingUp, 
  Users, 
  Eye,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function DashboardPage() {
  const { data: session } = useSession()
  const isBroker = session?.user?.role === 'BROKER'

  const stats = isBroker ? [
    {
      name: 'Propiedades Publicadas',
      value: '12',
      change: '+2 este mes',
      changeType: 'positive' as const,
      icon: Building2
    },
    {
      name: 'Vistas Totales',
      value: '1,234',
      change: '+12% vs mes anterior',
      changeType: 'positive' as const,
      icon: Eye
    },
    {
      name: 'Interesados',
      value: '45',
      change: '+8 nuevos',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      name: 'Calificación Promedio',
      value: '4.8',
      change: 'Basada en 23 reseñas',
      changeType: 'neutral' as const,
      icon: Star
    }
  ] : [
    {
      name: 'Propiedades Favoritas',
      value: '8',
      change: '+3 esta semana',
      changeType: 'positive' as const,
      icon: Heart
    },
    {
      name: 'Búsquedas Realizadas',
      value: '24',
      change: '+5 esta semana',
      changeType: 'positive' as const,
      icon: Search
    },
    {
      name: 'Propiedades Visitadas',
      value: '12',
      change: 'Última visita hace 2 días',
      changeType: 'neutral' as const,
      icon: Eye
    },
    {
      name: 'Brókers Contactados',
      value: '3',
      change: '2 respuestas pendientes',
      changeType: 'neutral' as const,
      icon: Users
    }
  ]

  const recentActivities = isBroker ? [
    {
      id: 1,
      type: 'property',
      title: 'Casa en Polanco publicada',
      description: 'Nueva propiedad agregada al catálogo',
      time: 'Hace 2 horas',
      icon: Building2
    },
    {
      id: 2,
      type: 'inquiry',
      title: 'Nueva consulta recibida',
      description: 'María González está interesada en tu propiedad',
      time: 'Hace 4 horas',
      icon: Users
    },
    {
      id: 3,
      type: 'view',
      title: 'Propiedad vista 15 veces',
      description: 'Departamento en Roma Norte tiene alta demanda',
      time: 'Hace 1 día',
      icon: Eye
    }
  ] : [
    {
      id: 1,
      type: 'favorite',
      title: 'Casa en Polanco agregada a favoritos',
      description: 'Propiedad guardada para revisar más tarde',
      time: 'Hace 1 hora',
      icon: Heart
    },
    {
      id: 2,
      type: 'search',
      title: 'Búsqueda guardada',
      description: 'Casas en Roma Norte, $1M - $2M',
      time: 'Hace 3 horas',
      icon: Search
    },
    {
      id: 3,
      type: 'contact',
      title: 'Mensaje enviado a bróker',
      description: 'Consulta sobre departamento en Condesa',
      time: 'Hace 2 días',
      icon: Users
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          ¡Hola, {session?.user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          {isBroker 
            ? 'Aquí tienes un resumen de tu actividad como bróker'
            : 'Aquí tienes un resumen de tu actividad en la plataforma'
          }
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className={`text-sm ${
                stat.changeType === 'positive' 
                  ? 'text-green-600' 
                  : 'text-gray-500'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {isBroker ? (
            <>
              <Link href="/dashboard/properties/new">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Propiedad
                </Button>
              </Link>
              <Link href="/dashboard/properties">
                <Button variant="outline" className="w-full justify-start">
                  <Building2 className="h-4 w-4 mr-2" />
                  Ver Mis Propiedades
                </Button>
              </Link>
              <Link href="/dashboard/favorites">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Ver Favoritos
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/properties">
                <Button className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Propiedades
                </Button>
              </Link>
              <Link href="/dashboard/favorites">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Ver Favoritos
                </Button>
              </Link>
              <Link href="/dashboard/profile">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Mi Perfil
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Actividad Reciente
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <activity.icon className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
