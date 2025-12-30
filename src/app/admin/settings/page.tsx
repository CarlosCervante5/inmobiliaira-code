'use client'

import { Settings } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="mt-2 text-gray-600">
          Configura las opciones de la plataforma
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Página de configuración en desarrollo</p>
      </div>
    </div>
  )
}

