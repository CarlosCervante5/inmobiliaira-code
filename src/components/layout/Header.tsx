'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Search, User, LogOut, Home, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const navigation = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Propiedades', href: '/properties', icon: Building2 },
  ]

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
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Búsqueda */}
          <div className="hidden md:flex md:flex-1 md:justify-center md:px-8">
            <div className="w-full max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar propiedades..."
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Usuario */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {status === 'loading' ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            ) : session ? (
              <div className="hidden sm:block relative group">
                <button className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">{session.user?.name}</span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => signOut()}
                    className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="text-xs sm:text-sm bg-blue-600 text-white hover:bg-blue-700">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}

            {/* Menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="space-y-1 px-3 pb-4 pt-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Búsqueda móvil */}
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar propiedades..."
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {session ? (
                <div className="border-t border-gray-200 pt-3 mt-2">
                  <div className="px-3 py-2 mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Mi Cuenta</p>
                  </div>
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="flex w-full items-center space-x-2 rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-3 mt-2">
                  <Link 
                    href="/auth/signin" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

