'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Variant = 'cta' | 'ctaLeft' | 'footer'

export function CTAEmailForm({ variant = 'cta' }: { variant?: Variant }) {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      router.push(`/auth/signup?email=${encodeURIComponent(email.trim())}`)
    } else {
      router.push('/auth/signup')
    }
  }

  const isFooter = variant === 'footer'
  const isLeft = variant === 'ctaLeft'

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${isLeft ? 'justify-start max-w-md sm:max-w-xl' : 'justify-center max-w-md sm:max-w-xl mx-auto'} ${!isFooter && !isLeft ? 'mt-6 sm:mt-8' : ''}`}
    >
      <input
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       placeholder="Ingresa tu correo"
       className="
         flex-1 min-w-0 rounded-lg
         bg-white
         px-4 py-3.5
         text-gray-900
         placeholder:text-gray-400
         shadow-sm
         focus:outline-none
         focus:ring-2
         focus:ring-white
         focus:ring-offset-2
         focus:ring-offset-brand-dark-green
        "
        aria-label="Correo electrónico"
      />
      <button
        type="submit"
        disabled={!email.trim()}
        className={`
          rounded-lg font-semibold px-6 py-3.5 whitespace-nowrap
          transition-colors
         ${
          isFooter
            ? 'bg-brand-dark-green text-white hover:opacity-90'
            : email.trim()
             ? 'bg-black text-white hover:bg-gray-800'
             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }
       `}
      >
        Regístrate
      </button>
    </form>
  )
}
