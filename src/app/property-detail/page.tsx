import { PropertyDetail } from '@/components/property/PropertyDetail'
import { PropertyWithOwner } from '@/types'

// Datos de ejemplo para el MVP
const mockProperty: PropertyWithOwner = {
  id: '1',
  title: 'Casa moderna en Polanco',
  description: 'Hermosa casa de 3 recámaras en una de las mejores zonas de la ciudad. Esta propiedad cuenta con acabados de lujo, jardín privado, terraza con vista panorámica y todas las comodidades que buscas para tu familia. Ubicada en una zona residencial exclusiva con fácil acceso a servicios, escuelas y centros comerciales.',
  price: 2500000,
  type: 'HOUSE' as any,
  status: 'AVAILABLE' as any,
  bedrooms: 3,
  bathrooms: 2,
  area: 150,
  parking: 2,
  floors: 2,
  age: 5,
  address: 'Av. Masaryk 123, Polanco',
  city: 'Ciudad de México',
  state: 'CDMX',
  zipCode: '11560',
  latitude: 19.4326,
  longitude: -99.1332,
  amenities: ['Jardín privado', 'Terraza', 'Seguridad 24/7', 'Gimnasio', 'Alberca', 'Estacionamiento techado'],
  images: [
    '/images/properties/casa-polanco.jpg',
    '/images/properties/casa-moderna.jpg',
    '/images/properties/depto-lujo.jpg'
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),
  ownerId: '1',
  owner: {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    emailVerified: null,
    image: null,
    role: 'BROKER' as any,
    createdAt: new Date(),
    updatedAt: new Date(),
    nss: null,
    phone: '+52 55 1234 5678',
    address: 'Ciudad de México',
    birthDate: null,
    license: '12345678',
    company: 'Inmobiliaria ABC',
    bio: 'Especialista en propiedades de lujo en Polanco y zonas exclusivas de la CDMX. Más de 10 años de experiencia ayudando a familias a encontrar su hogar ideal.',
    specialties: ['Residencial de lujo', 'Polanco', 'Condesa', 'Roma Norte'],
    experience: 10,
  } as any,
}

export default function PropertyDetailPage() {
  return <PropertyDetail property={mockProperty} />
}
