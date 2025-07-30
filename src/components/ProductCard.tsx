'use client'


"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Eye } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";
import { formatPrice } from "@/utils/whatsapp";

interface ProductCardProps {
  readonly product: Product;
}

export default function ProductCard({ product }: Readonly<ProductCardProps>) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const averageRating = product.rating || 4.5;
  const isInStock = product.stock > 0;
  const productSlug = `${product.id}-${product.name.toLowerCase().replace(/\s+/g, "-")}`;

  // Card completo clickeable
  return (
    <Link
      href={`/producto/${productSlug}`}
      className="group block bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-200 border border-gray-100 overflow-hidden min-w-[180px] max-w-[210px] w-full mx-auto relative"
      tabIndex={0}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.featured && (
          <span className="px-1.5 py-0.5 bg-green-500 text-white text-[10px] font-semibold rounded-full">
            Destacado
          </span>
        )}
        {product.discount && (
          <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-semibold rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute top-2 right-2 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-110"
        tabIndex={-1}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden min-h-[120px] max-h-[140px] bg-white flex items-center justify-center">
        {!imageError ? (
          <Image
            src={product.images?.[0] || "/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-contain w-full h-full"
            onError={() => setImageError(true)}
            sizes="(max-width: 210px) 100vw, 210px"
            priority={true}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <Eye className="w-14 h-14 text-gray-400" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2 pb-3">
        {/* Category */}
        {product.category && (
          <div className="text-[10px] text-primary-600 font-semibold uppercase mb-0.5">
            {product.category}
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-xs font-medium text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors mb-1">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-[10px] text-gray-600 line-clamp-2 mb-1">
            {product.description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Star
                key={`star-${product.id}-${index}`}
                className={`w-3 h-3 ${
                  index < Math.floor(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-600">
            ({averageRating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <span className="text-base font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Stock Status y Agregar */}
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              isInStock
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {isInStock ? "En Stock" : "Agotado"}
          </span>
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              if (isInStock) addToCart(product);
            }}
            disabled={!isInStock}
            className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors ${
              isInStock
                ? "bg-primary-500 text-white hover:bg-primary-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            tabIndex={-1}
          >
            Agregar
          </button>
        </div>
      </div>
    </Link>
  );
}

