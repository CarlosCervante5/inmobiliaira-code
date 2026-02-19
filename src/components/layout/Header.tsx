'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, User, LogOut, Building2, Wrench, Calculator } from 'lucide-react'

const NAV_LINKS = [
  { name: 'Propiedades', href: '/properties' },
  { name: 'Servicios', href: '/services' },
  { name: 'Simulador INFONAVIT', href: '/simulador-infonavit' },
]

const NAV_LINKS_WITH_ICONS = [
  { name: 'Propiedades', href: '/properties', icon: Building2 },
  { name: 'Servicios', href: '/services', icon: Wrench },
  { name: 'Simulador INFONAVIT', href: '/simulador-infonavit', icon: Calculator },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const userNavigation = [
    { name: 'Mi Perfil', href: '/dashboard/profile' },
    { name: 'Mis Favoritos', href: '/dashboard/favorites' },
    { name: 'Mis Consultas', href: '/dashboard/inquiries' },
  ]

  if (session?.user?.role === 'BROKER') {
    userNavigation.push(
      { name: 'Mis Propiedades', href: '/dashboard/properties' },
      { name: 'Agregar Propiedad', href: '/dashboard/properties/new' }
    )
  }

  return (
    <header className="bg-white border-b border-brand-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          {/* Navegación izquierda */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-brand-grey-green text-[15px] font-normal hover:text-brand-dark-green transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logo centrado */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
            aria-label="HABIK - Inicio"
          >
            <Image
              src="/habiklogo.png"
              alt="HABIK"
              width={120}
              height={40}
              className="h-25 w-auto object-contain"
              priority
            />
          </Link>

          {/* Acciones derecha: Iniciar sesión / Registrarse o menú usuario */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            {status === 'loading' ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-brand-muted/50" />
            ) : session ? (
              <div className="hidden sm:block relative group">
                <button className="flex items-center gap-2 text-brand-grey-green text-[15px] font-normal hover:text-brand-dark-green py-2 px-3 rounded-md hover:bg-brand-pastel-green/40 transition-colors">
                  <User className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">{session.user?.name}</span>
                </button>
                <div className="absolute right-0 mt-1 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-brand-muted/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-brand-muted/20">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-brand-grey-green hover:bg-brand-pastel-green/30"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => signOut()}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-brand-grey-green hover:bg-brand-pastel-green/30"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="text-brand-grey-green text-[15px] font-normal hover:text-brand-dark-green transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full bg-brand-dark-green text-white text-[15px] font-normal px-5 py-2.5 hover:opacity-90 transition-opacity"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-brand-grey-green hover:bg-brand-pastel-green/40"
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay móvil */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden
        />
      )}

      {/* Menú móvil */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-xl border-r border-brand-muted/40 transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-brand-muted/40">
            <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Image
                src="/logo-habik.png"
                alt="HABIK"
                width={100}
                height={34}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-brand-grey-green hover:bg-brand-pastel-green/40"
              aria-label="Cerrar menú"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            {NAV_LINKS_WITH_ICONS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-brand-grey-green font-normal hover:bg-brand-pastel-green/40"
              >
                <item.icon className="h-5 w-5 text-brand-dark-green" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-brand-muted/40 space-y-2">
            {session ? (
              <>
                {userNavigation.slice(0, 3).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sm text-brand-grey-green hover:text-brand-dark-green"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    signOut()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center gap-2 py-2 text-sm text-brand-grey-green hover:text-brand-dark-green"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-brand-grey-green font-normal hover:text-brand-dark-green"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-full bg-brand-dark-green text-white text-center py-2.5 px-4 hover:opacity-90"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
