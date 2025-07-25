'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Celulares',
    image: '/images/categories/celulares.svg',
    slug: 'celulares'
  },
  {
    id: 2,
    name: 'Televisores',
    image: '/images/categories/televisores.svg',
    slug: 'televisores'
  },
  {
    id: 3,
    name: 'Tecnología',
    image: '/images/categories/tecnologia.svg',
    slug: 'tecnologia'
  },
  {
    id: 4,
    name: 'Electrodomésticos',
    image: '/images/categories/electrodomesticos.svg',
    slug: 'electrodomesticos'
  },
  {
    id: 5,
    name: 'Muebles',
    image: '/images/categories/muebles.svg',
    slug: 'muebles'
  },
  {
    id: 6,
    name: 'Motos y Scooters',
    image: '/images/categories/motos-scooters.svg',
    slug: 'motos-scooters'
  },
  {
    id: 7,
    name: 'Tablets',
    image: '/images/categories/tablets.svg',
    slug: 'tablets'
  },
  {
    id: 8,
    name: 'Gamer',
    image: '/images/categories/gamer.svg',
    slug: 'gamer'
  },
  {
    id: 9,
    name: 'Construcción y acabados',
    image: '/images/categories/construccion.svg',
    slug: 'construccion'
  }
]

export default function CategoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const itemsToShow = 6
  const maxIndex = Math.max(0, categories.length - itemsToShow)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || maxIndex === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        return nextIndex > maxIndex ? 0 : nextIndex
      })
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  // Reset auto-play timer when component mounts
  useEffect(() => {
    setIsAutoPlaying(true)
    setCurrentIndex(0)
  }, [])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? maxIndex : newIndex
    })
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      return newIndex > maxIndex ? 0 : newIndex
    })
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToIndex = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <section className="pb-16 bg-white">
      <div className="container mx-auto px-4">

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Categoría anterior"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            aria-label="Siguiente categoría"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden mx-12">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`
              }}
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <Link href={`/categoria/${category.slug}`}>
                    <div className="group cursor-pointer text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors text-sm">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => goToIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index
                    ? 'bg-primary-500'
                    : 'bg-gray-300'
                }`}
                aria-label={`Ir a posición ${index + 1} del carrusel`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
