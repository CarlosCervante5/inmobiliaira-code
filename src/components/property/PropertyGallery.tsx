'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  if (images.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <p className="text-gray-500">No hay imágenes disponibles</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Imagen principal */}
        <div className="relative aspect-video bg-gray-200">
          <Image
            src={images[currentIndex]}
            alt={`${title} - Imagen ${currentIndex + 1}`}
            fill
            className="object-cover cursor-pointer"
            onClick={openFullscreen}
          />
          
          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Contador de imágenes */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Botón de pantalla completa */}
          <button
            onClick={openFullscreen}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>

        {/* Miniaturas */}
        {images.length > 1 && (
          <div className="p-4">
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                    index === currentIndex
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${title} - Miniatura ${index + 1}`}
                    width={80}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de pantalla completa */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Imagen en pantalla completa */}
            <div className="relative max-w-7xl max-h-full mx-4">
              <Image
                src={images[currentIndex]}
                alt={`${title} - Imagen ${currentIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Botón de cerrar */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Controles de navegación */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Contador */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
