'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, Bed, Bath, Maximize } from 'lucide-react'

type FeaturedProperty = {
  id: string
  title: string
  description: string
  price: number
  type: string
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  city: string
  state: string
  image: string
  openHouse?: boolean
}

export function FeaturedPropertyCard({ property }: { property: FeaturedProperty }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl border border-brand-muted/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="rounded-md bg-brand-dark-green px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {property.openHouse ? 'Open house' : property.type}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // TODO: agregar a favoritos
          }}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-grey-green shadow-sm hover:bg-white hover:text-brand-dark-green transition-colors"
          aria-label="Agregar a favoritos"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xl sm:text-2xl font-bold text-brand-dark-green">
          ${property.price.toLocaleString('es-MX')}
        </p>
        <p className="mt-1.5 text-sm text-brand-grey-green truncate">
          {property.address}, {property.city}
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-brand-grey-green">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-brand-muted" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-brand-muted" />
              {property.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4 text-brand-muted" />
            {property.area}
          </span>
        </div>
      </div>
    </Link>
  )
}
