'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, ChevronDown } from 'lucide-react'

const PRICE_RANGES = [
  { value: '', label: 'Cualquier precio' },
  { value: '0-1000000', label: 'Hasta $1M' },
  { value: '1000000-3000000', label: '$1M - $3M' },
  { value: '3000000-5000000', label: '$3M - $5M' },
  { value: '5000000-10000000', label: '$5M - $10M' },
  { value: '10000000-', label: 'Más de $10M' },
]

const PROPERTY_TYPES = [
  { value: '', label: 'Cualquier tipo' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'comercial', label: 'Comercial' },
]

export function HeroSearch() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [propertyType, setPropertyType] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location.trim()) params.set('q', location.trim())
    if (priceRange) {
      const [min, max] = priceRange.split('-')
      if (min) params.set('minPrice', min)
      if (max) params.set('maxPrice', max)
    }
    if (propertyType) params.set('type', propertyType)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-100 rounded-3xl shadow-md p-2 sm:p-3 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center">
        {/* Ubicación */}
        <div className="flex-1 flex items-center gap-2 min-w-0 rounded-xl sm:rounded-l-xl border border-gray-200 bg-gray-50/50 sm:bg-transparent sm:border-r-0 sm:rounded-r-none pl-3 py-2.5 sm:py-3">
          <MapPin className="h-5 w-5 text-brand-muted flex-shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Buscar por ciudad, colonia, dirección..."
            className="w-full bg-transparent text-brand-grey-green placeholder:text-brand-muted text-sm sm:text-base border-0 focus:ring-0 focus:outline-none"
          />
        </div>

        {/* Rango de precio */}
        <div className="relative flex items-center rounded-xl sm:rounded-none border border-gray-200 bg-gray-50/50 sm:bg-transparent border-t-0 sm:border-t sm:border-l-0 sm:border-r-0 px-3 py-2.5 sm:py-3 min-w-[140px] sm:min-w-[160px]">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full appearance-none bg-transparent text-brand-grey-green text-sm sm:text-base pr-8 border-0 focus:ring-0 focus:outline-none cursor-pointer"
          >
            {PRICE_RANGES.map((opt) => (
              <option key={opt.value || 'any'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="h-4 w-4 text-brand-muted absolute right-3 pointer-events-none" />
        </div>

        {/* Tipo de propiedad */}
        <div className="relative flex items-center rounded-xl sm:rounded-none border border-gray-200 bg-gray-50/50 sm:bg-transparent border-t-0 sm:border-t sm:border-l-0 sm:border-r-0 px-3 py-2.5 sm:py-3 min-w-[140px] sm:min-w-[160px]">
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full appearance-none bg-transparent text-brand-grey-green text-sm sm:text-base pr-8 border-0 focus:ring-0 focus:outline-none cursor-pointer"
          >
            {PROPERTY_TYPES.map((opt) => (
              <option key={opt.value || 'any'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="h-4 w-4 text-brand-muted absolute right-3 pointer-events-none" />
        </div>

        {/* Botón Buscar */}
        <button
          type="submit"
          className="w-full sm:w-auto rounded-xl sm:rounded-r-xl bg-brand-dark-green text-white font-medium px-6 py-3 text-sm sm:text-base hover:opacity-90 transition-opacity"
        >
          Buscar
        </button>
      </div>
    </form>
  )
}
