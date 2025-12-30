'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface ServiceCategory {
  id: string
  name: string
  slug: string
}

export default function NewServicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    basePrice: '',
    priceRange: '',
    duration: '',
    estimatedHours: '',
    isActive: true,
    isPopular: false,
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/service-categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.filter((cat: ServiceCategory) => cat.slug))
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          basePrice: formData.basePrice ? parseFloat(formData.basePrice) : null,
          estimatedHours: formData.estimatedHours ? parseFloat(formData.estimatedHours) : null,
        }),
      })

      if (response.ok) {
        router.push('/admin/services')
      } else {
        const error = await response.json()
        alert(error.error || 'Error al crear el servicio')
      }
    } catch (error) {
      console.error('Error creating service:', error)
      alert('Error al crear el servicio')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/services">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nuevo Servicio</h1>
            <p className="mt-2 text-gray-600">
              Crea un nuevo servicio de mantenimiento
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Servicio *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Limpieza de Hogar"
            />
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div>
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
              placeholder="Describe el servicio en detalle..."
            />
          </div>

          {/* Precio Base y Rango de Precio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 mb-2">
                Precio Base (MXN)
              </label>
              <input
                type="number"
                id="basePrice"
                name="basePrice"
                step="0.01"
                min="0"
                value={formData.basePrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="500.00"
              />
            </div>
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">
                Rango de Precio
              </label>
              <input
                type="text"
                id="priceRange"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Desde $500"
              />
            </div>
          </div>

          {/* Duración y Horas Estimadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duración
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="2-4 horas"
              />
            </div>
            <div>
              <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-700 mb-2">
                Horas Estimadas
              </label>
              <input
                type="number"
                id="estimatedHours"
                name="estimatedHours"
                step="0.5"
                min="0"
                value={formData.estimatedHours}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="3"
              />
            </div>
          </div>

          {/* Opciones */}
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Servicio Activo</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Servicio Popular</span>
            </label>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Link href="/admin/services">
              <Button type="button" variant="outline" disabled={loading}>
                Cancelar
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Servicio
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

