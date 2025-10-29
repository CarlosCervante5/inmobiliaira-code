import { PropertyDetail } from '@/components/property/PropertyDetail'
import { PropertyWithOwner } from '@/types'

// Datos de ejemplo para el MVP
const mockProperties: PropertyWithOwner[] = [
  {
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
  },
  {
    id: '2',
    title: 'Departamento en Roma Norte',
    description: 'Departamento completamente amueblado en edificio moderno con todas las comodidades. Perfecto para profesionales jóvenes o parejas que buscan un estilo de vida urbano. El departamento cuenta con acabados modernos, iluminación natural y una excelente ubicación cerca de restaurantes, cafés y transporte público.',
    price: 1800000,
    type: 'APARTMENT' as any,
    status: 'AVAILABLE' as any,
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    parking: 1,
    floors: 1,
    age: 2,
    address: 'Calle Orizaba 456, Roma Norte',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '06700',
    latitude: 19.4194,
    longitude: -99.1556,
    amenities: ['Gimnasio', 'Rooftop', 'Concierge', 'Lavandería', 'Terraza compartida'],
    images: [
      '/images/properties/depto-roma.jpg',
      '/images/properties/casa-polanco.jpg'
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    ownerId: '2',
    owner: {
      id: '2',
      name: 'María González',
      email: 'maria@example.com',
      emailVerified: null,
      image: null,
      role: 'BROKER' as any,
      createdAt: new Date(),
      updatedAt: new Date(),
      nss: null,
      phone: '+52 55 9876 5432',
      address: 'Ciudad de México',
      birthDate: null,
      license: '87654321',
      company: 'Propiedades Premium',
      bio: 'Especialista en departamentos modernos en zonas trendy de la CDMX. Conocedora de las mejores opciones para jóvenes profesionales.',
      specialties: ['Departamentos modernos', 'Roma Norte', 'Condesa', 'Juárez'],
      experience: 7,
    } as any,
  }
]

export default function PropertyDetailPage() {
  // Por ahora mostrar la primera propiedad
  // En el futuro esto se puede hacer dinámico con useSearchParams
  const property = mockProperties[0]
  
  return <PropertyDetail property={property} />
}
