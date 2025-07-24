// Interfaces para los productos
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  seller: string;
  specs: ProductSpecs;
  featured?: boolean;
  isCombo?: boolean;
  discount?: number;
  installments: InstallmentInfo;
  stock: number;
  tags?: string[];
  rating?: number;
}

export interface ProductSpecs {
  [key: string]: string | number | boolean;
}

export interface InstallmentInfo {
  months: number;
  monthlyPayment: number;
  tcea?: number;
}

// Interfaces para las categorías
export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  icon?: string;
  description?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

// Interfaces para el carrito
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  totalItems: number;
}

// Interfaces para los filtros
export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  seller?: string;
  priceRange?: [number, number];
  search?: string;
  featured?: boolean;
  isCombo?: boolean;
  tags?: string[];
  specs?: { [key: string]: string | number | boolean };
}

// Interfaces para formularios
export interface ContactForm {
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  acceptMarketing: boolean;
}

export interface LeadData extends ContactForm {
  products: Product[];
  timestamp: Date;
  source: 'product' | 'cart';
}

// Interfaces para WhatsApp
export interface WhatsAppMessage {
  phoneNumber: string;
  message: string;
}

// Interfaces para marcas destacadas
export interface FeaturedBrand {
  id: string;
  name: string;
  logo: string;
  slug: string;
}

// Interfaces para sliders
export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  buttonText?: string;
}

// Interfaces para estadísticas y métricas
export interface ProductStats {
  views: number;
  clicks: number;
  conversions: number;
}

// Interfaces para SEO
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

// Tipos de eventos para analytics
export type AnalyticsEvent = 
  | { type: 'product_view'; productId: string; productName: string }
  | { type: 'add_to_cart'; productId: string; productName: string }
  | { type: 'remove_from_cart'; productId: string; productName: string }
  | { type: 'whatsapp_click'; source: 'product' | 'cart'; productIds: string[] }
  | { type: 'search'; query: string; results: number }
  | { type: 'filter_applied'; filters: ProductFilters }
  | { type: 'category_click'; categoryId: string; categoryName: string };

// Interfaces para respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Interfaces para paginación
export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: PaginationData;
}

// Interfaces para configuración de la aplicación
export interface AppConfig {
  siteName: string;
  siteDescription: string;
  whatsappNumber: string;
  email: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

// Tipos para el estado de la aplicación
export interface AppState {
  cart: Cart;
  filters: ProductFilters;
  searchQuery: string;
  selectedCategory?: string;
  isLoading: boolean;
}
