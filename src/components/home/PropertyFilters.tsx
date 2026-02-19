'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'

const HABITACIONES = [
  { value: '', label: 'Habitaciones' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4+' },
]

const TIPOS = [
  { value: '', label: 'Tipo de propiedad' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'comercial', label: 'Comercial' },
]

const DIMENSIONES = [
  { value: '', label: 'Dimensiones' },
  { value: '0-80', label: 'Hasta 80 m²' },
  { value: '80-150', label: '80 - 150 m²' },
  { value: '150-250', label: '150 - 250 m²' },
  { value: '250-500', label: '250 - 500 m²' },
  { value: '500-', label: 'Más de 500 m²' },
]

export function PropertyFilters() {
  const router = useRouter()
  const [habitaciones, setHabitaciones] = useState('')
  const [tipo, setTipo] = useState('')
  const [dimensiones, setDimensiones] = useState('')

  const handleChange = (
    setter: (v: string) => void,
    value: string,
    otherValues: { h: string; t: string; d: string }
  ) => {
    setter(value)
    const next = { ...otherValues }
    if (setter === setHabitaciones) next.h = value
    else if (setter === setTipo) next.t = value
    else next.d = value
    const params = new URLSearchParams()
    if (next.h) params.set('bedrooms', next.h)
    if (next.t) params.set('type', next.t)
    if (next.d) {
      const [min, max] = next.d.split('-')
      if (min) params.set('minArea', min)
      if (max) params.set('maxArea', max)
    }
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <select
          value={habitaciones}
          onChange={(e) => handleChange(setHabitaciones, e.target.value, { h: e.target.value, t: tipo, d: dimensiones })}
          className="appearance-none rounded-xl bg-brand-off-white border border-brand-muted/30 text-brand-grey-green text-sm font-medium pl-4 pr-10 py-2.5 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-brand-dark-green/20 cursor-pointer"
        >
          {HABITACIONES.map((opt) => (
            <option key={opt.value || 'h'} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 text-brand-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      <div className="relative">
        <select
          value={tipo}
          onChange={(e) => handleChange(setTipo, e.target.value, { h: habitaciones, t: e.target.value, d: dimensiones })}
          className="appearance-none rounded-xl bg-brand-off-white border border-brand-muted/30 text-brand-grey-green text-sm font-medium pl-4 pr-10 py-2.5 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-brand-dark-green/20 cursor-pointer"
        >
          {TIPOS.map((opt) => (
            <option key={opt.value || 't'} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 text-brand-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      <div className="relative">
        <select
          value={dimensiones}
          onChange={(e) => handleChange(setDimensiones, e.target.value, { h: habitaciones, t: tipo, d: e.target.value })}
          className="appearance-none rounded-xl bg-brand-off-white border border-brand-muted/30 text-brand-grey-green text-sm font-medium pl-4 pr-10 py-2.5 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-brand-dark-green/20 cursor-pointer"
        >
          {DIMENSIONES.map((opt) => (
            <option key={opt.value || 'd'} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 text-brand-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      <a
        href="/properties"
        className="inline-flex items-center gap-2 rounded-xl bg-brand-off-white border border-brand-muted/30 text-brand-grey-green text-sm font-medium pl-4 pr-4 py-2.5 hover:bg-brand-pastel-green/30 hover:border-brand-muted/50 transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Más filtros
      </a>
    </div>
  )
}
