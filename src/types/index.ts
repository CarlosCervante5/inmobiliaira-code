import { User, Property, PropertyType, PropertyStatus, UserRole, InquiryStatus } from '@prisma/client'

export type { User, Property, PropertyType, PropertyStatus, UserRole, InquiryStatus }

export interface PropertyWithOwner extends Property {
  owner: User
}

export interface PropertyWithFavorites extends Property {
  favorites: { userId: string }[]
}

export interface UserWithProperties extends User {
  properties: Property[]
}

export interface SearchFilters {
  type?: PropertyType
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  city?: string
  state?: string
  amenities?: string[]
}

export interface PropertyFormData {
  title: string
  description: string
  price: number
  type: PropertyType
  bedrooms: number
  bathrooms: number
  area: number
  parking?: number
  floors?: number
  age?: number
  address: string
  city: string
  state: string
  zipCode: string
  latitude?: number
  longitude?: number
  amenities: string[]
  images: string[]
}

export interface UserFormData {
  name: string
  email: string
  phone?: string
  address?: string
  birthDate?: string
  nss?: string
  license?: string
  company?: string
  bio?: string
  specialties?: string[]
  experience?: number
}

export interface CreditInquiryFormData {
  nss: string
  amount?: number
}

export interface PropertyInquiryFormData {
  propertyId: string
  message: string
  phone?: string
  email?: string
}

