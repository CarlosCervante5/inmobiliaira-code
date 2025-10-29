interface PropertyDetailPageProps {
  params: Promise<{ id: string }> | { id: string }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  console.log('='.repeat(50))
  console.log('🔍 [PropertyDetailPage] Componente renderizado')
  console.log('📦 [PropertyDetailPage] Params recibidos (raw):', params)
  console.log('🔢 [PropertyDetailPage] Tipo de params:', typeof params)
  console.log('❓ [PropertyDetailPage] Es Promise?:', params instanceof Promise)
  console.log('📋 [PropertyDetailPage] Params stringified:', JSON.stringify(params, null, 2))
  
  // Manejar params síncrono y asíncrono
  const resolvedParams = params instanceof Promise ? await params : params
  
  console.log('✅ [PropertyDetailPage] Params resueltos:', resolvedParams)
  console.log('🆔 [PropertyDetailPage] ID extraído:', resolvedParams?.id)
  console.log('🔢 [PropertyDetailPage] Tipo de params.id:', typeof resolvedParams?.id)
  console.log('📋 [PropertyDetailPage] Keys de params:', Object.keys(resolvedParams || {}))

  const propertyId = resolvedParams?.id

  if (!propertyId) {
    console.error('❌ [PropertyDetailPage] ERROR: No se recibió el ID')
    console.error('❌ [PropertyDetailPage] Params completos:', JSON.stringify(resolvedParams, null, 2))
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-900 mb-4">Error: No se recibió el ID</h1>
            <p className="text-red-700 mb-2">Params recibidos:</p>
            <pre className="bg-red-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(resolvedParams, null, 2)}
            </pre>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Información de debug:</strong>
              </p>
              <ul className="text-xs text-yellow-700 mt-2 space-y-1">
                <li>Tipo de params: {typeof params}</li>
                <li>Es Promise: {params instanceof Promise ? 'Sí' : 'No'}</li>
                <li>Keys: {Object.keys(resolvedParams || {}).join(', ') || 'Ninguna'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  console.log('✅ [PropertyDetailPage] ID válido:', propertyId)
  console.log('🎯 [PropertyDetailPage] Renderizando página con ID:', propertyId)
  console.log('='.repeat(50))

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Propiedad ID: {propertyId}
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 mb-4">
            Esta es una página de prueba para la ruta dinámica.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              ID recibido: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{propertyId}</span>
            </p>
            <p className="text-sm text-gray-500">
              Tipo: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{typeof propertyId}</span>
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-xs font-mono text-gray-600">
              Revisa la consola del servidor para más información de debug
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}