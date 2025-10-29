export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Propiedad ID: {params.id}
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 mb-4">
            Esta es una página de prueba para la ruta dinámica.
          </p>
          <p className="text-sm text-gray-500">
            ID recibido: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{params.id}</span>
          </p>
        </div>
      </div>
    </div>
  )
}