'use client'

import { useState } from 'react'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Eye, 
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Datos de ejemplo para el MVP
const mockInquiries = [
  {
    id: '1',
    propertyTitle: 'Casa moderna en Polanco',
    propertyAddress: 'Av. Masaryk 123, Polanco',
    propertyPrice: 2500000,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+52 55 1234 5678',
    message: '¿Está disponible para visitar este fin de semana?',
    status: 'Nueva',
    date: '2024-01-20',
    time: '10:30 AM'
  },
  {
    id: '2',
    propertyTitle: 'Departamento en Roma Norte',
    propertyAddress: 'Calle Orizaba 456, Roma Norte',
    propertyPrice: 1800000,
    name: 'María García',
    email: 'maria.garcia@example.com',
    phone: '+52 55 8765 4321',
    message: 'Me interesa conocer más sobre el financiamiento disponible.',
    status: 'Respondida',
    date: '2024-01-19',
    time: '2:15 PM'
  },
  {
    id: '3',
    propertyTitle: 'Casa en Condesa',
    propertyAddress: 'Calle Amsterdam 789, Condesa',
    propertyPrice: 3200000,
    name: 'Carlos López',
    email: 'carlos.lopez@example.com',
    phone: '+52 55 9876 5432',
    message: '¿Acepta INFONAVIT? ¿Cuál es el precio final con escrituras?',
    status: 'En seguimiento',
    date: '2024-01-18',
    time: '4:45 PM'
  }
]

export default function InquiriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredInquiries = mockInquiries.filter(inquiry => {
    const matchesSearch = inquiry.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nueva':
        return 'bg-blue-100 text-blue-800'
      case 'Respondida':
        return 'bg-green-100 text-green-800'
      case 'En seguimiento':
        return 'bg-yellow-100 text-yellow-800'
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
            Mis Consultas
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Gestiona las consultas recibidas sobre tus propiedades
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Consultas</p>
              <p className="text-2xl font-semibold text-gray-900">{mockInquiries.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Respondidas</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockInquiries.filter(i => i.status === 'Respondida').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pendientes</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockInquiries.filter(i => i.status === 'Nueva').length}
              </p>
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
                placeholder="Buscar consultas..."
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
              <option value="Nueva">Nueva</option>
              <option value="Respondida">Respondida</option>
              <option value="En seguimiento">En seguimiento</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {inquiry.name}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700 flex items-center">
                        <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                        {inquiry.propertyTitle}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {inquiry.propertyAddress}
                      </p>
                      <p className="mt-1 text-sm font-medium text-blue-600">
                        ${inquiry.propertyPrice.toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700">
                        {inquiry.message}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {inquiry.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {inquiry.phone}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {inquiry.date} - {inquiry.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button size="sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Responder
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Propiedad
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <MessageSquare className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron consultas</h3>
            <p className="mt-1 text-sm text-gray-500">
              Intenta ajustar tus filtros de búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

