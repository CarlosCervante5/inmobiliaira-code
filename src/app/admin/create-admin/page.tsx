'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Shield, CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function CreateAdminPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCheck = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch('/api/admin/check-db')
      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Error al verificar')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAdmin = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch('/api/admin/check-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: 'create-admin-2024',
          force: true,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Error al crear admin')
      } else {
        setResult(data)
      }
    } catch (err: any) {
      setError(err.message || 'Error al crear admin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Diagnóstico y Creación de Admin
            </h1>
          </div>

          <p className="text-gray-600 mb-6">
            Esta página te permite verificar el estado de la base de datos y crear/actualizar
            el usuario administrador en producción.
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleCheck}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verificando...
                </>
              ) : (
                '🔍 Verificar Estado de la Base de Datos'
              )}
            </Button>

            <Button
              onClick={handleCreateAdmin}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creando...
                </>
              ) : (
                '👑 Crear/Actualizar Admin'
              )}
            </Button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900">Error</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900">
                      {result.success ? '✅ Operación Exitosa' : '⚠️ Verificación Completada'}
                    </h3>
                    {result.message && (
                      <p className="text-green-700 mt-1">{result.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {result.checks && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Estado de Configuración:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">DATABASE_URL:</span>
                      <span className={result.checks.databaseUrl ? 'text-green-600' : 'text-red-600'}>
                        {result.checks.databaseUrl ? '✅ Configurado' : '❌ No configurado'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">NEXTAUTH_SECRET:</span>
                      <span className={result.checks.nextAuthSecret ? 'text-green-600' : 'text-red-600'}>
                        {result.checks.nextAuthSecret ? '✅ Configurado' : '❌ No configurado'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Conexión a BD:</span>
                      <span className={result.checks.dbConnection ? 'text-green-600' : 'text-red-600'}>
                        {result.checks.dbConnection ? '✅ Conectado' : '❌ Sin conexión'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Admin existe:</span>
                      <span className={result.checks.adminExists ? 'text-green-600' : 'text-red-600'}>
                        {result.checks.adminExists ? '✅ Existe' : '❌ No existe'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {result.credentials && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">🔑 Credenciales del Admin:</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Email:</strong> {result.credentials.email}</p>
                    <p><strong>Password:</strong> {result.credentials.password}</p>
                  </div>
                </div>
              )}

              {result.admin && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Información del Admin:</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Email:</strong> {result.admin.email}</p>
                    <p><strong>Nombre:</strong> {result.admin.name}</p>
                    <p><strong>Rol:</strong> {result.admin.role}</p>
                    <p><strong>Tiene contraseña:</strong> {result.admin.hasPassword ? '✅ Sí' : '❌ No'}</p>
                  </div>
                </div>
              )}

              {result.recommendations && result.recommendations.length > 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Recomendaciones:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                    {result.recommendations.map((rec: string, idx: number) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">📝 Instrucciones:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Haz clic en "Verificar Estado" para ver qué está configurado</li>
              <li>Si el admin no existe o necesitas resetear la contraseña, haz clic en "Crear/Actualizar Admin"</li>
              <li>Usa las credenciales mostradas para iniciar sesión en <code className="bg-gray-200 px-1 rounded">/admin</code></li>
              <li>Si hay recomendaciones, sigue los pasos indicados</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

