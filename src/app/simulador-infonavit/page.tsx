import Link from 'next/link'
import { Calculator, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { InfonavitCalculator } from '@/components/credit/InfonavitCalculator'

export default function SimuladorInfonavitPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 sm:h-16 sm:w-16" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Simulador de Crédito INFONAVIT
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-blue-100 px-2">
              Calcula cuánto puedes obtener para tu vivienda y descubre tu capacidad de crédito
            </p>
          </div>
        </div>
      </section>

      {/* Calculadora Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <InfonavitCalculator />
          </div>

          {/* Información adicional */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ¿Qué es el crédito INFONAVIT?
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                El crédito INFONAVIT es un financiamiento que te permite adquirir, construir, 
                ampliar o mejorar tu vivienda. Este simulador te ayuda a estimar tu capacidad 
                de crédito basándose en tu salario, antigüedad laboral y otros factores.
              </p>
              <p>
                <strong>Nota:</strong> Este es un simulador informativo. Los montos y condiciones 
                reales pueden variar según la evaluación oficial de INFONAVIT.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

