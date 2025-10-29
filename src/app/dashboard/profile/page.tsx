'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Building2,
  Award,
  Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ProfilePage() {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '+52 55 1234 5678',
    address: 'Ciudad de México, CDMX',
    birthDate: '1990-01-01',
    bio: 'Apasionado por encontrar el hogar perfecto para cada familia.',
    company: 'Inmobiliaria ABC',
    license: '12345678',
    experience: 5,
    specialties: ['Residencial', 'Comercial', 'Lujo']
  })

  const isBroker = session?.user?.role === 'BROKER'

  const handleSave = () => {
    // Aquí se implementaría la lógica para guardar los datos
    console.log('Guardando perfil:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      phone: '+52 55 1234 5678',
      address: 'Ciudad de México, CDMX',
      birthDate: '1990-01-01',
      bio: 'Apasionado por encontrar el hogar perfecto para cada familia.',
      company: 'Inmobiliaria ABC',
      license: '12345678',
      experience: 5,
      specialties: ['Residencial', 'Comercial', 'Lujo']
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Mi Perfil
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Gestiona tu información personal y profesional
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          {isEditing ? (
            <div className="flex space-x-2">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {session?.user?.name}
              </h3>
              <p className="text-sm text-gray-500">
                {isBroker ? 'Bróker Inmobiliario' : 'Cliente'}
              </p>
              {isBroker && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Award className="h-3 w-3 mr-1" />
                    Certificado
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Información Personal
            </h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label="Nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
              />
              
              <Input
                label="Correo electrónico"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
              
              <Input
                label="Teléfono"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
              
              <Input
                label="Dirección"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
              />
              
              <Input
                label="Fecha de nacimiento"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biografía
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Cuéntanos sobre ti..."
              />
            </div>

            {isBroker && (
              <>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Información Profesional
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                      label="Empresa"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      disabled={!isEditing}
                    />
                    
                    <Input
                      label="Número de Licencia"
                      value={formData.license}
                      onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                      disabled={!isEditing}
                    />
                    
                    <Input
                      label="Años de Experiencia"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especialidades
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {isBroker ? 'Propiedades Publicadas' : 'Propiedades Favoritas'}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {isBroker ? '12' : '8'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {isBroker ? 'Transacciones Completadas' : 'Consultas Enviadas'}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {isBroker ? '45' : '12'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {isBroker ? 'Años de Experiencia' : 'Meses en la Plataforma'}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {isBroker ? formData.experience : '6'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
