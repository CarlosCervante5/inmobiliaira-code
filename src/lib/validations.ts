import { z } from 'zod'
import { PropertyType, UserRole } from '@prisma/client'

// Validaciones para propiedades
export const propertySchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100, 'El título es muy largo'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  type: z.nativeEnum(PropertyType),
  bedrooms: z.number().min(0, 'El número de habitaciones debe ser mayor o igual a 0'),
  bathrooms: z.number().min(0, 'El número de baños debe ser mayor o igual a 0'),
  area: z.number().min(1, 'El área debe ser mayor a 0'),
  parking: z.number().min(0).optional(),
  floors: z.number().min(1).optional(),
  age: z.number().min(0).optional(),
  address: z.string().min(1, 'La dirección es requerida'),
  city: z.string().min(1, 'La ciudad es requerida'),
  state: z.string().min(1, 'El estado es requerido'),
  zipCode: z.string().min(5, 'El código postal debe tener al menos 5 caracteres'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string()).min(1, 'Debe subir al menos una imagen'),
})

// Validaciones para usuarios
export const userSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('El email no es válido'),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthDate: z.string().optional(),
  nss: z.string().optional(),
  license: z.string().optional(),
  company: z.string().optional(),
  bio: z.string().optional(),
  specialties: z.array(z.string()).default([]),
  experience: z.number().min(0).optional(),
})

// Validaciones para registro
export const registerSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('El email no es válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.nativeEnum(UserRole),
  phone: z.string().optional(),
  nss: z.string().optional(),
  license: z.string().optional(),
  company: z.string().optional(),
})

// Validaciones para login
export const loginSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

// Validaciones para consulta de crédito
export const creditInquirySchema = z.object({
  nss: z.string().min(11, 'El NSS debe tener 11 dígitos').max(11, 'El NSS debe tener 11 dígitos'),
  amount: z.number().min(0).optional(),
})

// Validaciones para consulta de propiedad
export const propertyInquirySchema = z.object({
  propertyId: z.string().min(1, 'El ID de la propiedad es requerido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})

// Validaciones para búsqueda
export const searchSchema = z.object({
  query: z.string().optional(),
  type: z.nativeEnum(PropertyType).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  amenities: z.array(z.string()).optional(),
})

// Validaciones para mensajes
export const messageSchema = z.object({
  receiverId: z.string().min(1, 'El destinatario es requerido'),
  content: z.string().min(1, 'El mensaje no puede estar vacío'),
})

