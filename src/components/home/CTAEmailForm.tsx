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
        className="flex-1 min-w-0 rounded-lg border-0 px-4 py-3.5 text-brand-dark-green placeholder:text-brand-muted shadow-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-dark-green"
        aria-label="Correo electrónico"
      />
      <button
        type="submit"
        className={
          isFooter
            ? 'rounded-lg bg-brand-dark-green text-white font-semibold px-6 py-3.5 hover:opacity-90 transition-opacity whitespace-nowrap'
            : 'rounded-lg bg-white text-brand-dark-green font-semibold px-6 py-3.5 hover:bg-brand-beige transition-colors whitespace-nowrap'
        }
      >
        Regístrate
      </button>
    </form>
  )
}
