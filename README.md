# Market-mini 🛒

## Descripción
Market-mini es una plataforma de e-commerce moderna desarrollada con Next.js 15, TypeScript y Tailwind CSS. Incluye integración con WhatsApp para facilitar las ventas directas.

## 🚀 Características

### ✨ Tecnologías Principales
- **Next.js 15.4.3** - Framework React con App Router
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 3.4** - Diseño responsive y moderno
- **React 19** - Última versión de React
- **Lucide React** - Iconos modernos

### 🛍️ Funcionalidades E-commerce
- ✅ Catálogo de productos con filtros
- ✅ Páginas de categorías dinámicas
- ✅ Carrito de compras con Context API
- ✅ Sistema de búsqueda
- ✅ Cards de productos interactivas
- ✅ Lista de deseos (wishlist)
- ✅ Sistema de rating y reseñas

### 📱 Integración WhatsApp
- ✅ Botones "Comprar Ahora" con redirección automática
- ✅ Formateo automático de mensajes de productos
- ✅ Modal de contacto con validación
- ✅ Envío de datos a Google Sheets (opcional)

### 🎨 Diseño y UX
- ✅ Diseño completamente responsive
- ✅ Animaciones y transiciones suaves
- ✅ Header con navegación intuitiva
- ✅ Footer completo con enlaces útiles
- ✅ Paleta de colores personalizada
- ✅ Tipografía Inter optimizada

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/Market-mini.git

# Navegar al directorio
cd Market-mini

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### Scripts Disponibles
```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar en producción
npm start

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── categoria/[slug]/   # Páginas dinámicas de categorías
│   ├── productos/          # Página de productos
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Homepage
├── components/             # Componentes React
│   ├── Header.tsx          # Navegación principal
│   ├── Footer.tsx          # Pie de página
│   ├── ProductCard.tsx     # Card de producto
│   └── ContactModal.tsx    # Modal de contacto
├── data/                   # Datos estáticos
│   └── index.ts            # Productos y categorías
├── hooks/                  # Custom hooks
│   └── useCart.tsx         # Hook del carrito
├── types/                  # Tipos TypeScript
│   └── index.ts            # Interfaces principales
└── utils/                  # Utilidades
    └── whatsapp.ts         # Integración WhatsApp
```

## 🎯 Páginas Principales

### Homepage (`/`)
- Hero section con llamadas a la acción
- Categorías destacadas
- Productos más vendidos
- Testimonios de clientes

### Productos (`/productos`)
- Catálogo completo de productos
- Filtros por categoría
- Buscador en tiempo real
- Paginación

### Categorías (`/categoria/[slug]`)
- Productos filtrados por categoría
- Breadcrumbs de navegación
- Filtros adicionales

## 🛒 Sistema de Carrito

El carrito utiliza Context API de React para:
- Agregar/remover productos
- Actualizar cantidades
- Persistencia en localStorage
- Cálculo automático de totales

## 📱 Integración WhatsApp

### Configuración
1. Editar `src/utils/whatsapp.ts`
2. Actualizar el número de WhatsApp
3. Personalizar mensajes automáticos

### Funcionalidades
- Envío automático de detalles del producto
- Formateo de mensajes con precios
- Datos de contacto del cliente

## 🎨 Personalización

### Colores
Editar `tailwind.config.ts` para personalizar la paleta:
```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',
    600: '#2563eb',
    // ...
  }
}
```

### Tipografía
La fuente principal es Inter de Google Fonts, configurable en `globals.css`.

## 🔧 Configuración

### Imágenes
- Configurado para usar Unsplash como CDN
- Optimización automática con Next.js Image
- Fallbacks para imágenes no disponibles

### SEO
- Meta tags optimizados
- Estructura semántica HTML5
- URLs amigables

## 📦 Dependencias Principales

```json
{
  "next": "15.4.3",
  "react": "19.1.0",
  "typescript": "5",
  "tailwindcss": "3.4.0",
  "lucide-react": "^0.468.0",
  "react-hook-form": "^7.54.0",
  "react-hot-toast": "^2.4.1"
}
```

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Netlify
```bash
# Build de producción
npm run build

# Subir carpeta .next a Netlify
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Miguel** - Desarrollo Full Stack

## 🙏 Agradecimientos

- Next.js Team por el excelente framework
- Tailwind CSS por el sistema de diseño
- Lucide por los iconos
- Unsplash por las imágenes de muestra

---

⭐ ¡No olvides dar una estrella al proyecto si te ha sido útil!
