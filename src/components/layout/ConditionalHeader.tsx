'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'

export function ConditionalHeader() {
  const pathname = usePathname()
  
  // Ocultar header en páginas del dashboard y admin (tienen sus propios navbars)
  const isDashboardPage = pathname?.startsWith('/dashboard')
  const isAdminPage = pathname?.startsWith('/admin')
  
  if (isDashboardPage || isAdminPage) {
    return null
  }
  
  return <Header />
}
