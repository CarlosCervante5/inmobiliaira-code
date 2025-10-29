'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { PropertyWithOwner } from '@/types'

interface PropertyMapProps {
  properties: PropertyWithOwner[]
  selectedProperty?: PropertyWithOwner | null
  onPropertySelect?: (property: PropertyWithOwner) => void
}

export function PropertyMap({ properties, selectedProperty, onPropertySelect }: PropertyMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Cargando mapa...</div>
      </div>
    )
  }

  // Importar dinámicamente el mapa solo en el cliente
  const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Cargando mapa...</div>
      </div>
    )
  })

  return (
    <MapComponent
      properties={properties}
      selectedProperty={selectedProperty}
      onPropertySelect={onPropertySelect}
    />
  )
}