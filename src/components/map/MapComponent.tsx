'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { PropertyWithOwner } from '@/types'
import { formatPrice } from '@/lib/utils'

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapComponentProps {
  properties: PropertyWithOwner[]
  selectedProperty?: PropertyWithOwner | null
  onPropertySelect?: (property: PropertyWithOwner) => void
}

function MapCenter({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [map, center])
  return null
}

export default function MapComponent({ properties, selectedProperty, onPropertySelect }: MapComponentProps) {
  // Centro del mapa (Ciudad de México)
  const center: [number, number] = selectedProperty
    ? [selectedProperty.latitude || 19.4326, selectedProperty.longitude || -99.1332]
    : [19.4326, -99.1332]

  // Agrupar propiedades por ubicación para clusters
  const propertyGroups = new Map<string, PropertyWithOwner[]>()
  properties.forEach(prop => {
    const lat = prop.latitude || 19.4326
    const lng = prop.longitude || -99.1332
    const key = `${lat.toFixed(3)},${lng.toFixed(3)}`
    if (!propertyGroups.has(key)) {
      propertyGroups.set(key, [])
    }
    propertyGroups.get(key)!.push(prop)
  })

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {selectedProperty && <MapCenter center={center} />}
        
        {Array.from(propertyGroups.entries()).map(([key, props]) => {
          const [latStr, lngStr] = key.split(',')
          const lat = parseFloat(latStr)
          const lng = parseFloat(lngStr)
          const isCluster = props.length > 1
          
          if (isCluster) {
            // Mostrar cluster
            const avgPrice = props.reduce((sum, p) => sum + p.price, 0) / props.length
            return (
              <Marker
                key={key}
                position={[lat, lng]}
                icon={L.divIcon({
                  className: 'custom-marker-cluster',
                  html: `<div class="cluster-marker">${props.length}</div>`,
                  iconSize: [40, 40],
                })}
              >
                <Popup>
                  <div className="p-2">
                    <p className="font-semibold">{props.length} propiedades</p>
                    <p className="text-sm text-gray-600">Precio promedio: {formatPrice(avgPrice)}</p>
                  </div>
                </Popup>
              </Marker>
            )
          } else {
            // Mostrar propiedad individual
            const prop = props[0]
            return (
              <Marker
                key={prop.id}
                position={[prop.latitude || 19.4326, prop.longitude || -99.1332]}
                icon={L.divIcon({
                  className: 'custom-marker',
                  html: `<div class="price-marker">${formatPrice(prop.price)}</div>`,
                  iconSize: [120, 40],
                })}
                eventHandlers={{
                  click: () => onPropertySelect?.(prop),
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-semibold text-sm mb-1">{prop.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{prop.address}</p>
                    <p className="text-lg font-bold text-blue-600">{formatPrice(prop.price)}</p>
                    {prop.bedrooms && (
                      <p className="text-xs text-gray-500 mt-1">
                        {prop.bedrooms} recámaras • {prop.area} m²
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            )
          }
        })}
      </MapContainer>
      
      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .price-marker {
          background: #2563eb;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          white-space: nowrap;
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .price-marker:hover {
          transform: scale(1.1);
        }
        
        .cluster-marker {
          background: #10b981;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          border: 3px solid white;
          cursor: pointer;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px !important;
        }
      `}</style>
    </div>
  )
}
