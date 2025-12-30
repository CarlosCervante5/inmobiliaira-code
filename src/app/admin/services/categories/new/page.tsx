'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Tag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function NewCategoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    color: '',
    slug: '',
    isActive: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
    
    // Auto-generar slug desde el nombre
    if (name === 'name' && !formData.slug) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData(prev => ({ ...prev, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/service-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/services')
      } else {
        const error = await response.json()
        alert(error.error || 'Error al crear la categoría')
      }
    } catch (error) {
      console.error('Error creating category:', error)
      alert('Error al crear la categoría')
    } finally {
      setLoading(false)
    }
  }

  const colorOptions = [
    { value: 'blue', label: 'Azul', color: 'bg-blue-500' },
    { value: 'green', label: 'Verde', color: 'bg-green-500' },
    { value: 'red', label: 'Rojo', color: 'bg-red-500' },
    { value: 'yellow', label: 'Amarillo', color: 'bg-yellow-500' },
    { value: 'purple', label: 'Morado', color: 'bg-purple-500' },
    { value: 'pink', label: 'Rosa', color: 'bg-pink-500' },
    { value: 'indigo', label: 'Índigo', color: 'bg-indigo-500' },
    { value: 'orange', label: 'Naranja', color: 'bg-orange-500' },
  ]

  const iconOptions = [
    { value: '🧹', label: 'Limpieza' },
    { value: '🔧', label: 'Reparación' },
    { value: '🏠', label: 'Hogar' },
    { value: '⚡', label: 'Eléctrico' },
    { value: '💧', label: 'Plomería' },
    { value: '🎨', label: 'Pintura' },
    { value: '🌳', label: 'Jardín' },
    { value: '🔨', label: 'Carpintería' },
    { value: '🛠️', label: 'Mantenimiento' },
    { value: '📦', label: 'Mudanza' },
  ]

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
            <h1 className="text-3xl font-bold text-gray-900">Nueva Categoría</h1>
            <p className="mt-2 text-gray-600">
              Crea una nueva categoría de servicios
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
              <Tag className="h-5 w-5" />
              Información Básica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Categoría *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: Limpieza Profesional"
                />
              </div>
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleSlugChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="limpieza-profesional"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Se genera automáticamente desde el nombre. Solo letras, números y guiones.
                </p>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe la categoría de servicios..."
                />
              </div>
            </div>
          </div>

          {/* Apariencia */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Apariencia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                  Icono (Emoji)
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="🧹"
                    maxLength={2}
                  />
                  <div className="flex flex-wrap gap-2">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, icon: icon.value }))}
                        className={`px-3 py-2 border rounded-md text-sm hover:bg-gray-50 ${
                          formData.icon === icon.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                      >
                        {icon.value} {icon.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="space-y-2">
                  <select
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sin color</option>
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                  {formData.color && (
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded ${colorOptions.find(c => c.value === formData.color)?.color || 'bg-gray-500'}`}></div>
                      <span className="text-sm text-gray-600">
                        Vista previa del color
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Estado */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Categoría Activa</span>
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Las categorías inactivas no se mostrarán en el sitio público
            </p>
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
                  Guardar Categoría
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

