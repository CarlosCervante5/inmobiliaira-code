'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Building2, MapPin, DollarSign, Home, Bed, Bath, Car, Ruler, Image as ImageIcon, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

interface User {
  id: string
  name: string | null
  email: string
  role: string
}

interface Property {
  id: string
  title: string
  description: string
  price: number
  type: string
  status: string
  bedrooms: number
  bathrooms: number
  area: number
  parking: number | null
  floors: number | null
  age: number | null
  address: string
  city: string
  state: string
  zipCode: string
  latitude: number | null
  longitude: number | null
  amenities: string[]
  images: string[]
  owner: {
    id: string
    name: string | null
    email: string
  }
}

export default function EditPropertyPage() {
  const router = useRouter()
  const params = useParams()
  const propertyId = Array.isArray(params.id) ? params.id[0] : params.id
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [property, setProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'HOUSE',
    status: 'AVAILABLE',
    bedrooms: '',
    bathrooms: '',
    area: '',
    parking: '',
    floors: '',
    age: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: '',
    longitude: '',
    amenities: '',
    mainImage: '',
    galleryImages: [] as string[],
    ownerId: '',
  })

  useEffect(() => {
    if (propertyId) {
      fetchProperty()
      fetchUsers()
    }
  }, [propertyId])

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/admin/properties/${propertyId}`)
      if (response.ok) {
        const data = await response.json()
        setProperty(data)
        // Separar imagen principal de la galería
        const images = data.images || []
        const mainImage = images.length > 0 ? images[0] : ''
        const galleryImages = images.length > 1 ? images.slice(1) : []
        
        // Llenar el formulario con los datos existentes
        setFormData({
          title: data.title || '',
          description: data.description || '',
          price: data.price?.toString() || '',
          type: data.type || 'HOUSE',
          status: data.status || 'AVAILABLE',
          bedrooms: data.bedrooms?.toString() || '',
          bathrooms: data.bathrooms?.toString() || '',
          area: data.area?.toString() || '',
          parking: data.parking?.toString() || '',
          floors: data.floors?.toString() || '',
          age: data.age?.toString() || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zipCode: data.zipCode || '',
          latitude: data.latitude?.toString() || '',
          longitude: data.longitude?.toString() || '',
          amenities: data.amenities?.join(', ') || '',
          mainImage: mainImage,
          galleryImages: galleryImages,
          ownerId: data.owner?.id || '',
        })
      } else {
        alert('Error al cargar la propiedad')
        router.push('/admin/properties')
      }
    } catch (error) {
      console.error('Error fetching property:', error)
      alert('Error al cargar la propiedad')
      router.push('/admin/properties')
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users?role=BROKER')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddGalleryImage = () => {
    const url = prompt('Ingresa la URL de la imagen:')
    if (url && url.trim()) {
      setFormData(prev => ({
        ...prev,
        galleryImages: [...prev.galleryImages, url.trim()],
      }))
    }
  }

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload: any = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        type: formData.type,
        status: formData.status,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        ownerId: formData.ownerId,
      }

      if (formData.parking) payload.parking = formData.parking
      if (formData.floors) payload.floors = formData.floors
      if (formData.age) payload.age = formData.age
      if (formData.latitude) payload.latitude = parseFloat(formData.latitude)
      if (formData.longitude) payload.longitude = parseFloat(formData.longitude)
      if (formData.amenities) {
        payload.amenities = formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
      }
      
      // Combinar imagen principal y galería
      const allImages = []
      if (formData.mainImage) {
        allImages.push(formData.mainImage)
      }
      allImages.push(...formData.galleryImages)
      payload.images = allImages.filter(Boolean)

      const response = await fetch(`/api/admin/properties/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        router.push('/admin/properties')
      } else {
        const error = await response.json()
        alert(error.error || 'Error al actualizar la propiedad')
      }
    } catch (error) {
      console.error('Error updating property:', error)
      alert('Error al actualizar la propiedad')
    } finally {
      setSaving(false)
    }
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
        <div className="flex items-center gap-4">
          <Link href="/admin/properties">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Propiedad</h1>
            <p className="mt-2 text-gray-600">
              Modifica los datos de la propiedad
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          {/* Información Básica */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Información Básica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: Casa moderna en Polanco"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe la propiedad en detalle..."
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo *
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="HOUSE">Casa</option>
                  <option value="APARTMENT">Departamento</option>
                  <option value="TOWNHOUSE">Townhouse</option>
                  <option value="LAND">Terreno</option>
                  <option value="COMMERCIAL">Comercial</option>
                  <option value="OFFICE">Oficina</option>
                  <option value="WAREHOUSE">Bodega</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="AVAILABLE">Disponible</option>
                  <option value="PENDING">Pendiente</option>
                  <option value="SOLD">Vendida</option>
                  <option value="RENTED">Rentada</option>
                  <option value="DRAFT">Borrador</option>
                </select>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (MXN) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2500000"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-2">
                  Propietario (Bróker) *
                </label>
                <select
                  id="ownerId"
                  name="ownerId"
                  required
                  value={formData.ownerId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona un bróker</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name || user.email} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Características */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Home className="h-5 w-5" />
              Características
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  <Bed className="h-4 w-4 inline mr-1" />
                  Recámaras *
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  required
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  <Bath className="h-4 w-4 inline mr-1" />
                  Baños *
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  required
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                  <Ruler className="h-4 w-4 inline mr-1" />
                  Área (m²) *
                </label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  required
                  min="0"
                  step="0.01"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="parking" className="block text-sm font-medium text-gray-700 mb-2">
                  <Car className="h-4 w-4 inline mr-1" />
                  Estacionamientos
                </label>
                <input
                  type="number"
                  id="parking"
                  name="parking"
                  min="0"
                  value={formData.parking}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="floors" className="block text-sm font-medium text-gray-700 mb-2">
                  Pisos
                </label>
                <input
                  type="number"
                  id="floors"
                  name="floors"
                  min="1"
                  value={formData.floors}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                  Antigüedad (años)
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="0"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Ubicación
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  Ciudad *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Código Postal *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
                  Latitud
                </label>
                <input
                  type="number"
                  id="latitude"
                  name="latitude"
                  step="0.000001"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
                  Longitud
                </label>
                <input
                  type="number"
                  id="longitude"
                  name="longitude"
                  step="0.000001"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Amenidades */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Amenidades</h2>
            <div>
              <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-2">
                Amenidades (separadas por comas)
              </label>
              <input
                type="text"
                id="amenities"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Ej: Jardín, Terraza, Seguridad 24/7"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Imágenes */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Imágenes de la Propiedad
            </h2>
            
            {/* Imagen Principal */}
            <div className="mb-6">
              <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700 mb-2">
                Imagen Principal *
              </label>
              <input
                type="text"
                id="mainImage"
                name="mainImage"
                value={formData.mainImage}
                onChange={handleChange}
                placeholder="URL de la imagen principal (ej: /images/prop1.jpg o https://...)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.mainImage && (
                <div className="mt-3 relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
                  <Image
                    src={formData.mainImage}
                    alt="Imagen principal"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Galería de Imágenes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Galería de Imágenes
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddGalleryImage}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar Imagen
                </Button>
              </div>
              
              {formData.galleryImages.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No hay imágenes en la galería</p>
                  <p className="text-xs text-gray-400 mt-1">Haz clic en "Agregar Imagen" para comenzar</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.galleryImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
                        <Image
                          src={imageUrl}
                          alt={`Imagen ${index + 1}`}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 truncate">{imageUrl}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Link href="/admin/properties">
              <Button type="button" variant="outline" disabled={saving}>
                Cancelar
              </Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

