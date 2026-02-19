import Link from 'next/link'
import { Home, Building2, Bed, Bath, Maximize, Wrench, Sparkles, Hammer, ArrowRight, MapPin, Store, TreePine, Globe, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { HeroSearch } from '@/components/home/HeroSearch'
import { PropertyFilters } from '@/components/home/PropertyFilters'
import { FeaturedPropertyCard } from '@/components/home/FeaturedPropertyCard'
import { CTAEmailForm } from '@/components/home/CTAEmailForm'

// Propiedades destacadas para mostrar en el home
const featuredProperties = [
  {
    id: '1',
    title: 'Casa moderna en Polanco',
    description: 'Hermosa casa de 3 recámaras en una de las mejores zonas de la ciudad',
    price: 2500000,
    type: 'Casa',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    address: 'Av. Masaryk 123, Polanco',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/casa-polanco.jpg',
  },
  {
    id: '2',
    title: 'Departamento en Roma Norte',
    description: 'Departamento completamente amueblado en edificio moderno',
    price: 1800000,
    type: 'Departamento',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    address: 'Calle Orizaba 456, Roma Norte',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/depto-roma.jpg',
  },
  {
    id: '3',
    title: 'Casa en Condesa',
    description: 'Casa estilo colonial con jardín privado',
    price: 3200000,
    type: 'Casa',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    address: 'Calle Amsterdam 789, Condesa',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/casa-condesa.jpg',
  },
  {
    id: '4',
    title: 'Departamento de lujo',
    description: 'Departamento de lujo con vista panorámica',
    price: 4500000,
    type: 'Departamento',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    address: 'Av. Presidente Masaryk 567, Polanco',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/depto-lujo.jpg',
    openHouse: true,
  },
  {
    id: '5',
    title: 'Casa moderna con alberca',
    description: 'Amplia casa moderna con alberca y jardín',
    price: 5800000,
    type: 'Casa',
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    address: 'Calle Bosques 234, Bosques de las Lomas',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/casa-moderna.jpg',
  },
  {
    id: '6',
    title: 'Terreno comercial',
    description: 'Terreno ideal para desarrollo comercial o residencial',
    price: 5000000,
    type: 'Terreno',
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    address: 'Av. Vasco de Quiroga 789, Santa Fe',
    city: 'Ciudad de México',
    state: 'CDMX',
    image: '/images/properties/terreno.jpg',
  },
]

export default function HomePage() {
  const propertyTypes = [
    { name: 'Casas', count: '1,234', icon: Home },
    { name: 'Departamentos', count: '1,234', icon: Building2 },
    { name: 'Terrenos', count: '1,234', icon: MapPin },
    { name: 'Comerciales', count: '1,234', icon: Store },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero: fondo verde, título, subtítulo y barra de búsqueda */}
      <section className="bg-brand-dark-green py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8 sm:mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Encuentra una casa que se adapte a tu estilo de vida
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/95">
              Filtra, compara y agenda tu visita en minutos.
            </p>
          </div>
          <div className="mt-10">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Propiedades disponibles */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark-green">Propiedades disponibles</h2>
              <p className="mt-2 text-base sm:text-lg text-brand-grey-green">
                Explora nuestras opciones actualizadas y encuentra la ideal para ti.
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-brand-grey-green font-medium hover:text-brand-dark-green transition-colors self-start sm:self-auto"
            >
              Ver más
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mb-8">
            <PropertyFilters />
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProperties.slice(0, 4).map((property) => (
              <FeaturedPropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>


      {/* Explora por tipo de propiedad */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center px-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark-green">Explora por tipo de propiedad</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-brand-grey-green">
              Encuentra el tipo de propiedad que mejor se adapte a tus necesidades
            </p>
          </div>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {propertyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/properties?type=${type.name.toLowerCase()}`}
                className="group flex items-center gap-4 rounded-xl border border-brand-muted/40 bg-white p-6 transition-all hover:shadow-md hover:border-brand-muted/60"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center text-brand-dark-green">
                  <type.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-brand-dark-green group-hover:text-brand-grey-green">
                    {type.name}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-brand-muted uppercase tracking-wide">
                    {type.count} disponibles
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios de Mantenimiento */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 px-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark-green">Servicios de Mantenimiento</h2>
              <p className="mt-2 text-base sm:text-lg text-brand-grey-green">
                La forma fácil y confiable de cuidar tu hogar.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-brand-dark-green font-medium hover:text-brand-grey-green transition-colors self-start sm:self-auto"
            >
              Ver más
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Handyman',
                icon: Hammer,
                description: 'Soluciones rápidas y eficientes para reparaciones menores en el hogar. Desde ajustes y cambios básicos hasta mantenimiento general.',
                href: '/services/handyman',
              },
              {
                name: 'Instalación',
                icon: Wrench,
                description: 'Instalamos equipos, accesorios y sistemas con precisión y seguridad. Garantizamos funcionamiento correcto desde el primer día.',
                href: '/services/instalacion',
              },
              {
                name: 'Limpieza',
                icon: Sparkles,
                description: 'Servicios de limpieza profunda y mantenimiento para mantener tus espacios impecables, saludables y listos para usarse.',
                href: '/services/limpieza',
              },
              {
                name: 'Proyectos exteriores',
                icon: TreePine,
                description: 'Mejoramos y transformamos áreas exteriores como jardines, patios y fachadas para renovar la imagen de tu propiedad.',
                href: '/services/proyectos-exteriores',
              },
              {
                name: 'Renovaciones del hogar',
                icon: Home,
                description: 'Remodelaciones y mejoras que modernizan tus espacios, aumentando confort, funcionalidad y valor de tu hogar.',
                href: '/services/renovaciones',
              },
            ].map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="group flex flex-col p-6 transition-opacity hover:opacity-90"
              >
                <div className="flex h-12 w-12 items-center justify-center text-brand-dark-green">
                  <service.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-dark-green group-hover:text-brand-grey-green">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-brand-grey-green leading-relaxed">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark-green group-hover:underline">
                  Ver más
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Explora Zonas - layout asimétrico: 1 grande izquierda, 4 derecha */}
      <section className="bg-[#f8f8f8] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark-green mb-8">
            Explora Zonas
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 grid-rows-[auto_auto] lg:grid-rows-2">
            <Link
              href="/properties?zone=downtown-core"
              className="group relative overflow-hidden rounded-2xl shadow-md lg:row-span-2 min-h-[240px] lg:min-h-[420px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80"
                alt="Downtown Core"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Downtown Core</h3>
                <p className="mt-1 text-sm text-white/90">120 active listings</p>
              </div>
            </Link>
            {[
              { name: 'Suburban Green', listings: 85, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80' },
              { name: 'Waterfront', listings: 42, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
              { name: 'Historic District', listings: 19, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
              { name: 'Metro Area', listings: 63, image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80' },
            ].map((zone) => (
              <Link
                key={zone.name}
                href={`/properties?zone=${encodeURIComponent(zone.name.toLowerCase().replace(/\s+/g, '-'))}`}
                className="group relative aspect-[2/1] sm:aspect-[16/10] overflow-hidden rounded-2xl shadow-md"
              >
                <Image
                  src={zone.image}
                  alt={zone.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{zone.name}</h3>
                  <p className="mt-0.5 text-sm text-white/90">{zone.listings} active listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - texto e input alineados a la izquierda, bloque verde con bordes redondeados */}
      <section className="bg-brand-dark-green py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              ¿Listo para encontrar tu hogar ideal?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90">
              Únete a miles de personas que ya encontraron su hogar con nosotros.
            </p>
            <div className="mt-6 sm:mt-8">
              <CTAEmailForm variant="ctaLeft" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer - fondo claro, texto oscuro según diseño */}
      <footer className="bg-[#f8f8f8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Email + Registrate */}
          <div className="py-8 border-b border-gray-200">
            <CTAEmailForm variant="footer" />
          </div>

          <div className="py-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Logo + tagline - icono en cuadrado beige según diseño */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-beige flex-shrink-0 overflow-hidden p-1.5">
                  <Image
                    src="/logo-habik.png"
                    alt="HABIK"
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="text-xl font-bold text-gray-800">HABIK</span>
              </Link>
              <p className="mt-3 text-sm text-gray-600">
                La plataforma inmobiliaria más completa de México.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Enlaces</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li><Link href="/properties" className="hover:text-brand-dark-green transition-colors">Propiedades</Link></li>
                <li><Link href="/services" className="hover:text-brand-dark-green transition-colors">Servicios de Mantenimiento</Link></li>
                <li><Link href="/about" className="hover:text-brand-dark-green transition-colors">Acerca de</Link></li>
                <li><Link href="/contact" className="hover:text-brand-dark-green transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Para Brókers</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-brand-dark-green transition-colors">About Us</Link></li>
                <li><Link href="/agents" className="hover:text-brand-dark-green transition-colors">Our Agents</Link></li>
                <li><Link href="/careers" className="hover:text-brand-dark-green transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-brand-dark-green transition-colors">Press Room</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Soporte</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li><Link href="/help" className="hover:text-brand-dark-green transition-colors">Ayuda</Link></li>
                <li><Link href="/privacy" className="hover:text-brand-dark-green transition-colors">Privacidad</Link></li>
                <li><Link href="/terms" className="hover:text-brand-dark-green transition-colors">Términos</Link></li>
              </ul>
            </div>
          </div>

          <div className="py-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Habik. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-5">
              <a href="/" className="text-gray-500 hover:text-brand-dark-green transition-colors" aria-label="Sitio web">
                <Globe className="h-5 w-5" />
              </a>
              <a href="mailto:contacto@habik.com" className="text-gray-500 hover:text-brand-dark-green transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:+525512345678" className="text-gray-500 hover:text-brand-dark-green transition-colors" aria-label="Teléfono">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}