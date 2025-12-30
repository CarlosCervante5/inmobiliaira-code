'use client'

import { BarChart3 } from 'lucide-react'

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Estadísticas y Análisis</h1>
        <p className="mt-2 text-gray-600">
          Visualiza métricas y análisis de la plataforma
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Página de estadísticas en desarrollo</p>
      </div>
    </div>
  )
}

