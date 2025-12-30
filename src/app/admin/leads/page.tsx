'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { TrendingUp, Search, Filter, Eye, Edit, User, Phone, Mail, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: string
  priority: string
  interestedIn: string | null
  budget: number | null
  message: string | null
  broker: {
    name: string | null
    email: string
  } | null
  createdAt: string
}

export default function AdminLeadsPage() {
  const searchParams = useSearchParams()
  const statusFilter = searchParams.get('status')
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchLeads()
  }, [statusFilter])

  const fetchLeads = async () => {
    try {
      const url = statusFilter 
        ? `/api/admin/leads?status=${statusFilter}`
        : '/api/admin/leads'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setLeads(data)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLeads = leads.filter(lead => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      lead.name.toLowerCase().includes(search) ||
      lead.email.toLowerCase().includes(search) ||
      lead.phone.toLowerCase().includes(search) ||
      lead.interestedIn?.toLowerCase().includes(search)
    )
  })

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      NEW: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Nuevo' },
      CONTACTED: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Contactado' },
      QUALIFIED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Calificado' },
      IN_NEGOTIATION: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'En Negociación' },
      WON: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Ganado' },
      LOST: { bg: 'bg-red-100', text: 'text-red-800', label: 'Perdido' },
      FOLLOW_UP: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Seguimiento' },
    }
    const badge = badges[status] || badges.NEW
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      LOW: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Baja' },
      MEDIUM: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Media' },
      HIGH: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Alta' },
      URGENT: { bg: 'bg-red-100', text: 'text-red-800', label: 'Urgente' },
    }
    const badge = badges[priority] || badges.MEDIUM
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Leads</h1>
        <p className="mt-2 text-gray-600">
          Administra todos los leads y oportunidades de negocio
        </p>
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
          <div className="flex gap-2 flex-wrap">
            <Link href="/admin/leads">
              <Button variant={!statusFilter ? 'primary' : 'outline'} size="sm">
                Todos
              </Button>
            </Link>
            <Link href="/admin/leads?status=NEW">
              <Button variant={statusFilter === 'NEW' ? 'primary' : 'outline'} size="sm">
                Nuevos
              </Button>
            </Link>
            <Link href="/admin/leads?status=QUALIFIED">
              <Button variant={statusFilter === 'QUALIFIED' ? 'primary' : 'outline'} size="sm">
                Calificados
              </Button>
            </Link>
            <Link href="/admin/leads?status=IN_NEGOTIATION">
              <Button variant={statusFilter === 'IN_NEGOTIATION' ? 'primary' : 'outline'} size="sm">
                En Negociación
              </Button>
            </Link>
            <Link href="/admin/leads?status=WON">
              <Button variant={statusFilter === 'WON' ? 'primary' : 'outline'} size="sm">
                Ganados
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interés
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Presupuesto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bróker Asignado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron leads
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-500">{lead.source}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center space-x-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>{lead.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.interestedIn || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.budget ? `$${lead.budget.toLocaleString('es-MX')}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.broker ? (
                        <div>
                          <div>{lead.broker.name || 'Sin nombre'}</div>
                          <div className="text-xs text-gray-400">{lead.broker.email}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Sin asignar</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(lead.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
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

