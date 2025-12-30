'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validations'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Building2, Eye, EyeOff } from 'lucide-react'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [creatingAdmin, setCreatingAdmin] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        console.error('Error de autenticación:', result.error)
        // Mostrar mensaje más específico según el error
        if (result.error === 'CredentialsSignin') {
          setError('Credenciales inválidas. Verifica tu email y contraseña.')
        } else {
          setError(`Error: ${result.error}`)
        }
      } else if (result?.ok) {
        // Esperar un momento para que la sesión se establezca
        await new Promise(resolve => setTimeout(resolve, 100))
        const session = await getSession()
        if (session?.user?.role === 'ADMIN') {
          router.push('/admin')
        } else if (session?.user?.role === 'BROKER') {
          router.push('/dashboard/properties')
        } else {
          router.push('/dashboard')
        }
      } else {
        setError('Error desconocido al iniciar sesión')
      }
    } catch (error) {
      console.error('Error en onSubmit:', error)
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  const handleCreateAdmin = async () => {
    setCreatingAdmin(true)
    setError('')
    try {
      const response = await fetch('/api/admin/create-admin', {
        method: 'POST',
      })
      const data = await response.json()
      if (data.success) {
        setError('✅ Admin creado exitosamente. Ahora puedes iniciar sesión.')
      } else {
        setError(`Error: ${data.error || 'No se pudo crear el admin'}`)
      }
    } catch (error) {
      setError('Error al crear admin')
    } finally {
      setCreatingAdmin(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 sm:py-12 px-3 sm:px-4 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <div className="flex justify-center">
            <Building2 className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600" />
          </div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 px-2">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-gray-600 px-2">
            ¿No tienes cuenta?{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className={`rounded-md p-4 ${
              error.startsWith('✅') ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className={`text-sm ${
                error.startsWith('✅') ? 'text-green-700' : 'text-red-700'
              }`}>{error}</div>
            </div>
          )}

          {/* Botón para crear admin en desarrollo */}
          {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
            <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
              <p className="text-sm text-blue-800 mb-2">
                ¿No tienes usuario admin? Créalo ahora:
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCreateAdmin}
                loading={creatingAdmin}
                className="w-full"
              >
                Crear Usuario Admin
              </Button>
            </div>
          )}
          
          <div className="space-y-4">
            <Input
              {...register('email')}
              type="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              error={errors.email?.message}
            />
            
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                label="Contraseña"
                placeholder="Tu contraseña"
                error={errors.password?.message}
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full !bg-blue-600 !text-white hover:!bg-blue-700"
              loading={isLoading}
            >
              Iniciar Sesión
            </Button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">O continúa con</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleGoogleSignIn}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuar con Google
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
