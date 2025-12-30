'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, User, LogOut, Home, Building2, Wrench, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const navigation = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Propiedades', href: '/properties', icon: Building2 },
    { name: 'Servicios', href: '/services', icon: Wrench },
    { name: 'Simulador INFONAVIT', href: '/simulador-infonavit', icon: Calculator },
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

        {/* Overlay para móvil */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Sidebar móvil */}
        <div className={`md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header del sidebar */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Catálogo</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navegación */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Usuario y acciones */}
            <div className="p-4 border-t border-gray-200">
              {session ? (
                <>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session.user?.name || 'Usuario'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link 
                    href="/auth/signin" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full rounded-md px-3 py-2 text-sm font-medium text-center text-gray-700 hover:bg-gray-100"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full rounded-md px-3 py-2 text-sm font-medium text-center bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

