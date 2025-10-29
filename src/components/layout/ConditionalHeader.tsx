'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'

export function ConditionalHeader() {
  const pathname = usePathname()
  
  // Ocultar header en páginas del dashboard
  const isDashboardPage = pathname?.startsWith('/dashboard')
  
  if (isDashboardPage) {
    return null
  }
  
  return <Header />
}
