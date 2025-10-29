'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Calculator, User, DollarSign, Calendar, Home, Mail, Phone, CheckCircle, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface InfonavitData {
  // Sección 1: Datos del trabajador
  nombreCompleto: string
  edad: number
  salarioMensual: number
  antiguedadLaboral: number
  tipoCredito: 'tradicional' | 'cofinavit' | 'mejoravit'
  estadoCivil: 'soltero' | 'casado'
  
  // Sección 2: Estimación del ahorro
  tasaRendimiento: number
  
  // Sección 3: Cálculo del crédito
  plazoDeseado: number
  
  // Sección 4: Estimación de mensualidad
  tasaInteres: number
  
  // Sección 5: Contacto
  email: string
  telefono: string
  consentimiento: boolean
}

interface CalculatedResults {
  ahorroEstimado: number
  ahorroConRendimiento: number
  factorCredito: number
  creditoEstimado: number
  montoTotalDisponible: number
  mensualidadEstimada: number
}

export function InfonavitCalculator() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<InfonavitData>({
    nombreCompleto: '',
    edad: 25,
    salarioMensual: 15000,
    antiguedadLaboral: 5,
    tipoCredito: 'tradicional',
    estadoCivil: 'soltero',
    tasaRendimiento: 5,
    plazoDeseado: 20,
    tasaInteres: 8,
    email: '',
    telefono: '',
    consentimiento: false
  })

  const [results, setResults] = useState<CalculatedResults | null>(null)

  // Calcular resultados cuando cambien los datos relevantes
  useEffect(() => {
    const calculated = calculateResults(data)
    setResults(calculated)
  }, [data])

  const calculateResults = (formData: InfonavitData): CalculatedResults => {
    // Ahorro estimado base (5% del salario mensual)
    const ahorroBase = formData.salarioMensual * 0.05 * formData.antiguedadLaboral * 12
    
    // Ahorro con rendimiento
    const tasaDecimal = formData.tasaRendimiento / 100
    const ahorroConRendimiento = ahorroBase * Math.pow(1 + tasaDecimal, formData.antiguedadLaboral)
    
    // Factor de crédito basado en edad y tipo
    let factorCredito = 20 // Base
    if (formData.edad <= 30) factorCredito += 10
    else if (formData.edad <= 40) factorCredito += 5
    else if (formData.edad <= 50) factorCredito += 0
    else factorCredito -= 5
    
    // Ajuste por tipo de crédito
    if (formData.tipoCredito === 'cofinavit') factorCredito += 10
    else if (formData.tipoCredito === 'mejoravit') factorCredito += 15
    
    // Ajuste por estado civil
    if (formData.estadoCivil === 'casado') factorCredito += 5
    
    // Limitar factor entre 20 y 50
    factorCredito = Math.max(20, Math.min(50, factorCredito))
    
    // Crédito estimado
    const creditoEstimado = (formData.salarioMensual * factorCredito) + ahorroConRendimiento
    
    // Monto total disponible
    const montoTotalDisponible = creditoEstimado + ahorroConRendimiento
    
    // Mensualidad estimada (con interés)
    const tasaInteresMensual = formData.tasaInteres / 100 / 12
    const numeroPagos = formData.plazoDeseado * 12
    const mensualidadEstimada = (creditoEstimado * tasaInteresMensual * Math.pow(1 + tasaInteresMensual, numeroPagos)) / 
                               (Math.pow(1 + tasaInteresMensual, numeroPagos) - 1)
    
    return {
      ahorroEstimado: ahorroBase,
      ahorroConRendimiento,
      factorCredito,
      creditoEstimado,
      montoTotalDisponible,
      mensualidadEstimada
    }
  }

  const handleInputChange = (field: keyof InfonavitData, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const buscarPropiedades = () => {
    if (results) {
      // Redirigir a la búsqueda con el monto del crédito como filtro
      const params = new URLSearchParams({
        maxPrice: Math.round(results.creditoEstimado).toString(),
        minPrice: Math.round(results.creditoEstimado * 0.5).toString(), // 50% del crédito como mínimo
        type: 'HOUSE' // Buscar casas por defecto
      })
      
      router.push(`/properties?${params.toString()}`)
    }
  }

  const enviarSolicitud = () => {
    // Aquí se podría enviar la información a un servidor
    alert('¡Simulación completada! Un asesor se pondrá en contacto contigo.')
  }

  const steps = [
    { number: 1, title: 'Datos del trabajador', icon: User },
    { number: 2, title: 'Ahorro estimado', icon: DollarSign },
    { number: 3, title: 'Cálculo del crédito', icon: Calculator },
    { number: 4, title: 'Mensualidad', icon: Calendar },
    { number: 5, title: 'Resultados', icon: CheckCircle },
    { number: 6, title: 'Contacto', icon: Mail }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Home className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Calculadora INFONAVIT</h2>
        </div>
        <p className="text-gray-600">
          Simula tu crédito INFONAVIT y descubre cuánto puedes obtener para tu vivienda
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number
            
            return (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={`text-xs mt-2 text-center ${
                  isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Step 1: Datos del trabajador */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Datos del trabajador</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre completo"
                value={data.nombreCompleto}
                onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                placeholder="Juan Pérez López"
              />
              <Input
                label="Edad"
                type="number"
                value={data.edad}
                onChange={(e) => handleInputChange('edad', parseInt(e.target.value) || 0)}
                placeholder="35"
              />
              <Input
                label="Salario mensual bruto"
                type="number"
                value={data.salarioMensual}
                onChange={(e) => handleInputChange('salarioMensual', parseInt(e.target.value) || 0)}
                placeholder="15000"
              />
              <Input
                label="Antigüedad laboral (años)"
                type="number"
                value={data.antiguedadLaboral}
                onChange={(e) => handleInputChange('antiguedadLaboral', parseInt(e.target.value) || 0)}
                placeholder="8"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de crédito deseado
                </label>
                <select
                  value={data.tipoCredito}
                  onChange={(e) => handleInputChange('tipoCredito', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="tradicional">Tradicional</option>
                  <option value="cofinavit">Cofinavit</option>
                  <option value="mejoravit">Mejoravit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado civil (opcional)
                </label>
                <select
                  value={data.estadoCivil}
                  onChange={(e) => handleInputChange('estadoCivil', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="soltero">Soltero</option>
                  <option value="casado">Casado</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Ahorro estimado */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimación del ahorro en la Subcuenta de Vivienda</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tasa de rendimiento anual (%)"
                type="number"
                value={data.tasaRendimiento}
                onChange={(e) => handleInputChange('tasaRendimiento', parseFloat(e.target.value) || 0)}
                placeholder="5"
                helperText="Tasa sugerida: 5% anual"
              />
            </div>
            {results && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Ahorro calculado:</h4>
                <div className="space-y-1">
                  <p className="text-sm text-blue-700">
                    Ahorro base (5% del salario): <span className="font-medium">{formatCurrency(results.ahorroEstimado)}</span>
                  </p>
                  <p className="text-sm text-blue-700">
                    Con rendimiento ({data.tasaRendimiento}% anual): <span className="font-medium">{formatCurrency(results.ahorroConRendimiento)}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Cálculo del crédito */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cálculo del crédito estimado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plazo deseado
                </label>
                <select
                  value={data.plazoDeseado}
                  onChange={(e) => handleInputChange('plazoDeseado', parseInt(e.target.value))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value={5}>5 años</option>
                  <option value={10}>10 años</option>
                  <option value={15}>15 años</option>
                  <option value={20}>20 años</option>
                  <option value={30}>30 años</option>
                </select>
              </div>
            </div>
            {results && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Crédito estimado:</h4>
                <div className="space-y-1">
                  <p className="text-sm text-green-700">
                    Factor de crédito: <span className="font-medium">{results.factorCredito}x el salario</span>
                  </p>
                  <p className="text-sm text-green-700">
                    Crédito estimado: <span className="font-medium">{formatCurrency(results.creditoEstimado)}</span>
                  </p>
                  <p className="text-sm text-green-700">
                    Monto total disponible: <span className="font-medium">{formatCurrency(results.montoTotalDisponible)}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Mensualidad */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimación de mensualidad</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tasa de interés anual (%)"
                type="number"
                value={data.tasaInteres}
                onChange={(e) => handleInputChange('tasaInteres', parseFloat(e.target.value) || 0)}
                placeholder="8"
                helperText="Tasa aproximada según salario"
              />
            </div>
            {results && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Mensualidad estimada:</h4>
                <div className="space-y-1">
                  <p className="text-sm text-yellow-700">
                    Plazo seleccionado: <span className="font-medium">{data.plazoDeseado} años</span>
                  </p>
                  <p className="text-sm text-yellow-700">
                    Tasa de interés: <span className="font-medium">{data.tasaInteres}% anual</span>
                  </p>
                  <p className="text-lg font-bold text-yellow-900">
                    Mensualidad aproximada: {formatCurrency(results.mensualidadEstimada)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Resultados finales */}
        {currentStep === 5 && results && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados finales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">Ahorro en Subcuenta</h4>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.ahorroConRendimiento)}</p>
                <p className="text-sm text-blue-700 mt-1">Con {data.tasaRendimiento}% de rendimiento anual</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3">Crédito aproximado</h4>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(results.creditoEstimado)}</p>
                <p className="text-sm text-green-700 mt-1">Factor: {results.factorCredito}x el salario</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-3">Monto total disponible</h4>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(results.montoTotalDisponible)}</p>
                <p className="text-sm text-purple-700 mt-1">Para compra de vivienda</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-3">Mensualidad aproximada</h4>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(results.mensualidadEstimada)}</p>
                <p className="text-sm text-orange-700 mt-1">Por {data.plazoDeseado} años</p>
              </div>
            </div>
            
            {/* Botón de búsqueda de propiedades */}
            <div className="mt-8 text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  ¿Listo para buscar tu nueva casa?
                </h4>
                <p className="text-blue-700 mb-4">
                  Te mostraremos propiedades que se ajusten a tu presupuesto de {formatCurrency(results.creditoEstimado)}
                </p>
                <Button 
                  onClick={buscarPropiedades}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Buscar propiedades
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Contacto */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Correo electrónico"
                type="email"
                value={data.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="tu@email.com"
              />
              <Input
                label="Teléfono de contacto"
                type="tel"
                value={data.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                placeholder="55 1234 5678"
                helperText="10 dígitos"
              />
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consentimiento"
                checked={data.consentimiento}
                onChange={(e) => handleInputChange('consentimiento', e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="consentimiento" className="text-sm text-gray-700">
                Autorizo el uso de mis datos para fines de simulación de crédito y contacto por parte de asesores inmobiliarios.
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Anterior
        </Button>
        <div className="flex space-x-2">
          {currentStep < 6 ? (
            <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
              Siguiente
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button 
                onClick={buscarPropiedades}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar propiedades
              </Button>
              <Button 
                onClick={enviarSolicitud}
                disabled={!data.consentimiento || !data.email || !data.telefono}
                className="bg-green-600 hover:bg-green-700"
              >
                Enviar solicitud
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
