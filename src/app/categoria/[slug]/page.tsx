'use client';

import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { sampleProducts, categories } from '@/data';
import { Product } from '@/types';

interface CategoryPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

function CategoryContent({ slug }: { readonly slug: string }) {
  const [sortBy, setSortBy] = useState('featured');

  // Decodificar el slug y encontrar la categoría
  const categoryName = decodeURIComponent(slug).replace(/-/g, ' ');
  const category = categories.find(cat => 
    cat.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  // Filtrar productos por categoría
  const categoryProducts = sampleProducts.filter((product: Product) => 
    product.category.toLowerCase() === category.name.toLowerCase()
  );

  // Ordenar productos
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">
              Inicio
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/productos" className="text-gray-500 hover:text-primary-600">
              Productos
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Header de categoría */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">{category.icon}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl opacity-90 mb-8">
              {category.description || `Descubre los mejores productos en ${category.name.toLowerCase()}`}
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>+1,000 clientes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Proceso rápido</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>100% seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8">
        {/* Botón volver y ordenamiento */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <Link
            href="/productos"
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a productos</span>
          </Link>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {sortedProducts.length} productos
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="featured">Destacados</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificados</option>
              <option value="newest">Más Recientes</option>
            </select>
          </div>
        </div>

        {/* Grid de productos */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-3xl">{category.icon}</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Próximamente productos en {category.name}
            </h3>
            <p className="text-gray-500 mb-6">
              Estamos trabajando para traerte las mejores opciones en esta categoría
            </p>
            <Link href="/productos" className="btn-primary">
              Ver otros productos
            </Link>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-gray-600 mb-6">
            Nuestros expertos financieros pueden ayudarte a encontrar la solución perfecta para tus necesidades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Contactar Asesor
            </button>
            <Link href="/productos" className="btn-secondary">
              Ver todos los productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({ params }: Readonly<CategoryPageProps>) {
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getSlug();
  }, [params]);

  if (!slug) {
    return <div>Cargando...</div>;
  }

  return <CategoryContent slug={slug} />;
}
