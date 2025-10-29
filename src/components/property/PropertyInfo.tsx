'use client'

import { PropertyWithOwner } from '@/types'
import { 
  Ruler, 
  Calendar, 
  Building2, 
  MapPin, 
  Car, 
  Bed, 
  Bath,
  Home,
  Layers,
  Clock,
  Shield,
  Zap,
  Wifi,
  TreePine,
  Waves,
  Dumbbell,
  Car as CarIcon,
  Lock,
  Camera,
  Thermometer,
  Wind
} from 'lucide-react'

interface PropertyInfoProps {
  property: PropertyWithOwner
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  const getPropertyTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      HOUSE: 'Casa',
      APARTMENT: 'Departamento',
      LAND: 'Terreno',
      COMMERCIAL: 'Comercial',
    }
    return labels[type] || type
  }

  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, any> = {
      'Jardín privado': TreePine,
      'Terraza': Home,
      'Seguridad 24/7': Shield,
      'Gimnasio': Dumbbell,
      'Alberca': Waves,
      'Estacionamiento techado': CarIcon,
      'Rooftop': Home,
      'Concierge': Lock,
      'Lavandería': Waves,
      'Terraza compartida': Home,
      'Gimnasio': Dumbbell,
      'Piscina': Waves,
      'Seguridad': Shield,
      'Ascensor': Layers,
      'Aire acondicionado': Thermometer,
      'Calefacción': Thermometer,
      'Internet': Wifi,
      'Cámaras de seguridad': Camera,
      'Acceso directo': MapPin,
      'Servicios urbanos': Zap,
      'Zona de alta plusvalía': MapPin,
    }
    
    return iconMap[amenity] || Home
  }

  const basicInfo = [
    {
      label: 'Tipo de propiedad',
      value: getPropertyTypeLabel(property.type),
      icon: Building2,
    },
    {
      label: 'Área total',
      value: `${property.area} m²`,
      icon: Ruler,
    },
    {
      label: 'Recámaras',
      value: property.bedrooms > 0 ? property.bedrooms.toString() : 'N/A',
      icon: Bed,
    },
    {
      label: 'Baños',
      value: property.bathrooms > 0 ? property.bathrooms.toString() : 'N/A',
      icon: Bath,
    },
    {
      label: 'Estacionamientos',
      value: property.parking > 0 ? property.parking.toString() : 'N/A',
      icon: Car,
    },
    {
      label: 'Pisos',
      value: property.floors > 0 ? property.floors.toString() : 'N/A',
      icon: Layers,
    },
    {
      label: 'Antigüedad',
      value: property.age > 0 ? `${property.age} años` : 'Nueva',
      icon: Calendar,
    },
    {
      label: 'Publicado',
      value: property.publishedAt.toLocaleDateString('es-MX'),
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Información básica */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Información básica</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {basicInfo.map((info, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <info.icon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">{info.label}</p>
                <p className="font-medium text-gray-900">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ubicación */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Ubicación</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="font-medium text-gray-900">{property.address}</p>
              <p className="text-sm text-gray-600">{property.city}, {property.state} {property.zipCode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Amenidades */}
      {property.amenities && property.amenities.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Amenidades</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {property.amenities.map((amenity, index) => {
              const IconComponent = getAmenityIcon(amenity)
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <IconComponent className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-900">{amenity}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Información adicional</h4>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900">Verificación de propiedad</h5>
              <p className="text-sm text-blue-700 mt-1">
                Esta propiedad ha sido verificada por nuestro equipo. Toda la información 
                proporcionada es precisa y actualizada.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notas importantes */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Notas importantes</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">Disponibilidad</p>
              <p className="text-sm text-yellow-700">
                La disponibilidad puede cambiar. Contacta al bróker para confirmar el estado actual.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Seguridad</p>
              <p className="text-sm text-green-700">
                Todas las visitas son coordinadas con el bróker responsable de la propiedad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
