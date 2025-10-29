'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/validations'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Building2, Eye, EyeOff, User, Briefcase } from 'lucide-react'

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role') as 'CLIENT' | 'BROKER' | null

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: role || 'CLIENT',
    },
  })

  const watchedRole = watch('role')

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/auth/signin?message=Registro exitoso')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Error al registrarse')
      }
    } catch (error) {
      setError('Error al registrarse')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          <div className="space-y-4">
            {/* Tipo de usuario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de cuenta
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative flex cursor-pointer rounded-lg p-4 focus:outline-none">
                  <input
                    {...register('role')}
                    type="radio"
                    value="CLIENT"
                    className="sr-only"
                  />
                  <div className={`flex w-full items-center justify-between rounded-lg border p-4 ${
                    watchedRole === 'CLIENT' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-300 bg-white'
                  }`}>
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Cliente</p>
                        <p className="text-xs text-gray-500">Buscar propiedades</p>
                      </div>
                    </div>
                  </div>
                </label>
                
                <label className="relative flex cursor-pointer rounded-lg p-4 focus:outline-none">
                  <input
                    {...register('role')}
                    type="radio"
                    value="BROKER"
                    className="sr-only"
                  />
                  <div className={`flex w-full items-center justify-between rounded-lg border p-4 ${
                    watchedRole === 'BROKER' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-300 bg-white'
                  }`}>
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Bróker</p>
                        <p className="text-xs text-gray-500">Gestionar propiedades</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <Input
              {...register('name')}
              type="text"
              label="Nombre completo"
              placeholder="Tu nombre completo"
              error={errors.name?.message}
            />

            <Input
              {...register('email')}
              type="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              error={errors.email?.message}
            />

            <Input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              label="Contraseña"
              placeholder="Mínimo 6 caracteres"
              error={errors.password?.message}
            />

            {watchedRole === 'CLIENT' && (
              <Input
                {...register('phone')}
                type="tel"
                label="Teléfono (opcional)"
                placeholder="+52 55 1234 5678"
                error={errors.phone?.message}
              />
            )}

            {watchedRole === 'BROKER' && (
              <>
                <Input
                  {...register('license')}
                  type="text"
                  label="Número de cédula profesional"
                  placeholder="Tu cédula profesional"
                  error={errors.license?.message}
                />
                <Input
                  {...register('company')}
                  type="text"
                  label="Empresa (opcional)"
                  placeholder="Nombre de tu empresa"
                  error={errors.company?.message}
                />
              </>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Acepto los{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                términos y condiciones
              </Link>{' '}
              y la{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                política de privacidad
              </Link>
            </label>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
            >
              Crear Cuenta
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
