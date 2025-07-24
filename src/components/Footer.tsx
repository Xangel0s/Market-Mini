'use client';

import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MessageCircle
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    productos: [
      { name: 'Créditos Personales', href: '#' },
      { name: 'Créditos Empresariales', href: '#' },
      { name: 'Préstamos Hipotecarios', href: '#' },
      { name: 'Créditos Vehiculares', href: '#' }
    ],
    servicios: [
      { name: 'Asesoría Financiera', href: '#' },
      { name: 'Evaluación Crediticia', href: '#' },
      { name: 'Refinanciamiento', href: '#' },
      { name: 'Seguros', href: '#' }
    ],
    empresa: [
      { name: 'Nosotros', href: '#' },
      { name: 'Equipo', href: '#' },
      { name: 'Trabaja con Nosotros', href: '#' },
      { name: 'Testimonios', href: '#' }
    ],
    soporte: [
      { name: 'Centro de Ayuda', href: '#' },
      { name: 'Preguntas Frecuentes', href: '#' },
      { name: 'Políticas de Privacidad', href: '#' },
      { name: 'Términos y Condiciones', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* WhatsApp CTA Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-6 w-6" />
              <div>
                <p className="font-semibold">¿Tienes dudas? ¡Hablamos!</p>
                <p className="text-sm opacity-90">Obtén asesoría gratuita por WhatsApp</p>
              </div>
            </div>
            <button 
              onClick={() => window.open('https://wa.me/51999999999', '_blank')}
              className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-primary-400 mb-4">
                CrediCallidda
              </h3>
              <p className="text-gray-300 mb-6">
                Tu marketplace financiero de confianza. Conectamos personas y empresas 
                con las mejores opciones de financiamiento del mercado.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">Lima, Perú</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+51 999 999 999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">info@credicallidda.com</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Productos</h4>
            <ul className="space-y-2">
              {footerLinks.productos.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2">
              {footerLinks.soporte.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-4">Mantente Informado</h4>
            <p className="text-gray-300 mb-4">
              Recibe las últimas noticias y ofertas especiales
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
              />
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} CrediCallidda. Todos los derechos reservados.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
