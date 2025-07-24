'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, Menu, User, ChevronDown } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { categories } from '@/data';
import Link from 'next/link';

const Header = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Cerrar menú de categorías al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Aquí implementarías la navegación a la página de búsqueda
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      {/* Barra superior */}
      <div className="bg-primary-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>📞 Consulta tu crédito</span>
              <span>🚚 Envío gratis por compras mayores a S/ 500</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/ayuda" className="hover:text-primary-200 transition-colors">
                Ayuda
              </Link>
              <Link href="/vende-con-nosotros" className="hover:text-primary-200 transition-colors">
                Vende con nosotros
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Credicálidda</h1>
                <p className="text-xs text-gray-500">Marketplace Oficial</p>
              </div>
            </Link>
          </div>

          {/* Buscador */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="search-container">
              <Search className="search-icon w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos, marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-md hover:bg-primary-600 transition-colors"
              >
                Buscar
              </button>
            </form>
          </div>

          {/* Acciones del header */}
          <div className="flex items-center space-x-4">
            {/* Mi cuenta */}
            <Link href="/mi-cuenta" className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors">
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Mi cuenta</span>
            </Link>

            {/* Carrito */}
            <Link href="/carrito" className="cart-icon">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cart.totalItems > 0 && (
                <span className="cart-badge">{cart.totalItems}</span>
              )}
            </Link>

            {/* Menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Navegación de categorías */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-12 space-x-8">
            {/* Menú de categorías */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                <Menu className="w-4 h-4" />
                <span>Todas las categorías</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown de categorías */}
              {isCategoriesOpen && (
                <div className="dropdown-menu w-64">
                  {categories.map((category) => (
                    <div key={category.id} className="group">
                      <Link
                        href={`/categoria/${category.slug}`}
                        className="dropdown-item flex items-center justify-between"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        <span>{category.name}</span>
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </Link>
                      
                      {/* Subcategorías (se pueden mostrar en hover) */}
                      {category.subcategories && (
                        <div className="hidden group-hover:block absolute left-full top-0 ml-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              href={`/categoria/${category.slug}/${subcategory.slug}`}
                              className="dropdown-item"
                              onClick={() => setIsCategoriesOpen(false)}
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enlaces rápidos */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/ofertas" 
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                🔥 Ofertas
              </Link>
              <Link 
                href="/combos" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                📦 Combos
              </Link>
              <Link 
                href="/novedades" 
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                ✨ Novedades
              </Link>
              <Link 
                href="/reacondicionados" 
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                ♻️ Reacondicionados
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link href="/mi-cuenta" className="block text-gray-700 hover:text-primary-600 transition-colors">
              Mi cuenta
            </Link>
            <Link href="/ofertas" className="block text-red-600 hover:text-red-700 transition-colors">
              🔥 Ofertas
            </Link>
            <Link href="/combos" className="block text-blue-600 hover:text-blue-700 transition-colors">
              📦 Combos
            </Link>
            <Link href="/novedades" className="block text-green-600 hover:text-green-700 transition-colors">
              ✨ Novedades
            </Link>
            <Link href="/reacondicionados" className="block text-purple-600 hover:text-purple-700 transition-colors">
              ♻️ Reacondicionados
            </Link>
            <div className="border-t pt-3">
              <Link href="/ayuda" className="block text-gray-600 hover:text-primary-600 transition-colors">
                Ayuda
              </Link>
              <Link href="/vende-con-nosotros" className="block text-gray-600 hover:text-primary-600 transition-colors">
                Vende con nosotros
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
