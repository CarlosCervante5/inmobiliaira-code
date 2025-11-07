'use client'

import { useState } from 'react'
import { PropertyWithOwner } from '@/types'
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Calendar, 
  Clock,
  Star,
  Building2,
  User,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PropertyContactProps {
  property: PropertyWithOwner
}

export function PropertyContact({ property }: PropertyContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    visitDate: '',
    visitTime: '',
    contactMethod: 'phone'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property.id,
          brokerId: property.ownerId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          contactMethod: formData.contactMethod,
          visitDate: formData.visitDate || null,
          visitTime: formData.visitTime || null,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al enviar la consulta')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error al enviar tu consulta. Por favor intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    { id: 'phone', label: 'Llamada telefónica', icon: Phone },
    { id: 'email', label: 'Correo electrónico', icon: Mail },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  ]

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ]

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          ¡Solicitud enviada!
        </h3>
        <p className="text-gray-600 mb-4">
          Hemos recibido tu solicitud. El bróker se pondrá en contacto contigo pronto.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>
          Enviar otra solicitud
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Información del bróker */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Información del bróker</h4>
        <div className="flex items-start space-x-4">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h5 className="font-semibold text-gray-900">{property.owner.name}</h5>
            <p className="text-sm text-gray-600">{property.owner.company}</p>
            <p className="text-sm text-gray-500 mt-1">{property.owner.bio}</p>
            
            <div className="flex items-center mt-3 space-x-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">4.8</span>
              </div>
              <span className="text-sm text-gray-500">
                {property.owner.experience} años de experiencia
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de contacto */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Solicitar información</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Información personal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="+52 55 1234 5678"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="tu@email.com"
            />
          </div>

          {/* Método de contacto preferido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de contacto preferido
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {contactMethods.map((method) => (
                <label key={method.id} className="relative">
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method.id}
                    checked={formData.contactMethod === method.id}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    formData.contactMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <method.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{method.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Solicitar visita */}
          <div className="border-t border-gray-200 pt-4">
            <h5 className="font-medium text-gray-900 mb-3">Solicitar visita (opcional)</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha preferida
                </label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora preferida
                </label>
                <select
                  name="visitTime"
                  value={formData.visitTime}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Seleccionar hora</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje adicional
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Cuéntanos más sobre lo que buscas o cualquier pregunta específica..."
            />
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Enviar solicitud
                </>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => window.open(`tel:${property.owner.phone}`)}
            >
              <Phone className="h-4 w-4 mr-2" />
              Llamar ahora
            </Button>
          </div>
        </form>
      </div>

      {/* Información de contacto directo */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-medium text-blue-900 mb-2">Contacto directo</h5>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-blue-700">
            <Phone className="h-4 w-4" />
            <span>{property.owner.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-blue-700">
            <Mail className="h-4 w-4" />
            <span>{property.owner.email}</span>
          </div>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          También puedes contactar directamente al bróker usando la información de arriba.
        </p>
      </div>
    </div>
  )
}
