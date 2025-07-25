'use client';

import { useState } from 'react';
import { ChevronRight, Star, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CategoryCarousel from '@/components/CategoryCarousel';
import { sampleProducts as products } from '@/data';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = products.slice(0, 8);

  const slides = [
    {
      title: "Créditos Rápidos y Seguros",
      subtitle: "Obtén el financiamiento que necesitas",
      description: "Procesos ágiles, tasas competitivas y atención personalizada",
      image: "/api/placeholder/800/400",
      buttonText: "Solicitar Ahora"
    },
    {
      title: "Asesoría Financiera Especializada",
      subtitle: "Te ayudamos a encontrar la mejor opción",
      description: "Nuestros expertos te guían en cada paso del proceso",
      image: "/api/placeholder/800/400",
      buttonText: "Contactar Asesor"
    },
    {
      title: "Soluciones para Empresas",
      subtitle: "Capital de trabajo para tu negocio",
      description: "Financiamiento empresarial con condiciones flexibles",
      image: "/api/placeholder/800/400",
      buttonText: "Ver Opciones"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Procesos verificados y seguros"
    },
    {
      icon: Truck,
      title: "Proceso Rápido",
      description: "Respuesta en 24 horas"
    },
    {
      icon: HeadphonesIcon,
      title: "Atención 24/7",
      description: "Soporte especializado"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className="relative h-full bg-gradient-to-r from-primary-600 to-secondary-600">
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                  <h2 className="text-2xl mb-6 opacity-90">{slide.subtitle}</h2>
                  <p className="text-lg mb-8 opacity-80">{slide.description}</p>
                  <button className="btn-primary text-lg px-8 py-4">
                    {slide.buttonText}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              Bienvenido a Credicálidda: tecnología, electrodomésticos y más para tu hogar
            </h2>
            <h3 className="text-2xl font-semibold text-gray-800">
              Encuentra lo que buscas
            </h3>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoryCarousel />

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros productos financieros más populares
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="btn-primary">
              Ver Todos los Productos
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Necesitas Asesoría Personalizada?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nuestros expertos financieros están listos para ayudarte a encontrar 
              la mejor solución para tus necesidades
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Hablar con Asesor
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Ver Productos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Lo que Dicen Nuestros Clientes
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  &ldquo;Excelente servicio y atención personalizada. El proceso fue muy rápido 
                  y transparente. Definitivamente recomendado.&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Cliente {index}</p>
                    <p className="text-sm text-gray-500">Empresario</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
