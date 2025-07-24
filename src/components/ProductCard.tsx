'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/types'
import { formatPrice } from '@/utils/whatsapp'

interface ProductCardProps {
  readonly product: Product
}

export default function ProductCard({ product }: Readonly<ProductCardProps>) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const averageRating = product.rating || 4.5
  const isInStock = product.stock > 0
  const productSlug = `${product.id}-${product.name.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.featured && (
          <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
            Destacado
          </span>
        )}
        {product.discount && (
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-110"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/producto/${productSlug}`}>
          {!imageError ? (
            <Image
              src={product.images?.[0] || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Eye className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </Link>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Link
              href={`/producto/${productSlug}`}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </Link>
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:bg-primary-600"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <div className="text-xs text-primary-600 font-semibold uppercase mb-1">
            {product.category}
          </div>
        )}

        {/* Product Name */}
        <Link href={`/producto/${productSlug}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Star
                key={`star-${product.id}-${index}`}
                className={`w-3 h-3 ${
                  index < Math.floor(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            ({averageRating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              isInStock
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}
          >
            {isInStock ? 'En Stock' : 'Agotado'}
          </span>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!isInStock}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              isInStock
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
