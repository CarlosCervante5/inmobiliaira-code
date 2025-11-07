'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Home,
  Bed,
  Bath,
  Car,
  Ruler,
  ImagePlus,
  Save,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NewPropertyPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'Casa',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    parking: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    features: '',
    status: 'Disponible'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular guardado
    setTimeout(() => {
      setIsLoading(false)
      // Redirigir a la lista de propiedades
      router.push('/dashboard/properties')
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Agregar Nueva Propiedad
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Completa los datos de la propiedad
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Básica */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Información Básica
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título de la Propiedad *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Casa moderna en Polanco"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Tipo de Propiedad *
              </label>
              <select
                name="type"
                id="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
                <option value="Terreno">Terreno</option>
                <option value="Oficina">Oficina</option>
                <option value="Local Comercial">Local Comercial</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio (MXN) *
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="2500000"
                  className="block w-full rounded-md border border-gray-300 pl-10 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Estado *
              </label>
              <select
                name="status"
                id="status"
                required
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Disponible">Disponible</option>
                <option value="En proceso">En proceso</option>
                <option value="Vendida">Vendida</option>
              </select>
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Características
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                <Bed className="h-4 w-4 inline mr-1" />
                Recámaras *
              </label>
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                required
                min="0"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="3"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                <Bath className="h-4 w-4 inline mr-1" />
                Baños *
              </label>
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                required
                min="0"
                step="0.5"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="2"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                <Ruler className="h-4 w-4 inline mr-1" />
                Área (m²) *
              </label>
              <input
                type="number"
                name="area"
                id="area"
                required
                min="0"
                value={formData.area}
                onChange={handleChange}
                placeholder="150"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="parking" className="block text-sm font-medium text-gray-700">
                <Car className="h-4 w-4 inline mr-1" />
                Estacionamientos *
              </label>
              <input
                type="number"
                name="parking"
                id="parking"
                required
                min="0"
                value={formData.parking}
                onChange={handleChange}
                placeholder="2"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Ubicación
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Dirección *
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Av. Masaryk 123"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Ciudad *
              </label>
              <input
                type="text"
                name="city"
                id="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Ciudad de México"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                Estado *
              </label>
              <input
                type="text"
                name="state"
                id="state"
                required
                value={formData.state}
                onChange={handleChange}
                placeholder="CDMX"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                Código Postal *
              </label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                required
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="11560"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Descripción y Amenidades
          </h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción de la Propiedad *
              </label>
              <textarea
                name="description"
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe las características principales de la propiedad..."
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700">
                Amenidades (separadas por comas)
              </label>
              <input
                type="text"
                name="features"
                id="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Alberca, Gimnasio, Seguridad 24/7, Jardín"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Imágenes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ImagePlus className="h-5 w-5 mr-2" />
            Imágenes
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
            <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
              >
                <span>Subir imágenes</span>
                <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" className="sr-only" />
              </label>
              <p className="text-sm text-gray-500">o arrastra y suelta aquí</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF hasta 10MB</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar Propiedad
          </Button>
        </div>
      </form>
    </div>
  )
}

