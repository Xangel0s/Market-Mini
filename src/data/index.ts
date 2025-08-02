import { Product, Category, FeaturedBrand, HeroSlide } from '@/types';

// Productos de ejemplo basados en la web original
export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'CELULAR APPLE IPHONE 16 C/CHIP 2024 8GB 128GB ROSADO',
    description: 'iPhone 16 con chip A18, cámara avanzada y diseño elegante en color rosado.',
    price: 4064.00,
    images: [
      '/productos_img/cel1.webp',
      '/productos_img/cel2.webp',
      '/productos_img/cel3.webp'
    ],
    category: 'Tecnología',
    subcategory: 'Celulares',
    brand: 'APPLE',
    seller: 'CELULARES PERU SMART S.A.C.',
    specs: {
      memoria: '128GB',
      ram: '8GB',
      color: 'Rosado',
      sistemaOperativo: 'iOS',
      pantalla: '6.1 pulgadas',
      camara: '48MP',
      bateria: '3349 mAh'
    },
    featured: true,
    installments: {
      months: 24,
      monthlyPayment: 153.35,
      tcea: 32.5
    },
    stock: 10,
    tags: ['smartphone', 'apple', 'nuevo', '5g']
  },
  {
    id: '2',
    name: 'Televisor LG 55UT7300PSA UHD/4K SMART WebOS c/Magic Remote + Audifonos Bluetooth MERTEC',
    description: 'Televisor LG 55" 4K UHD Smart TV con WebOS, Magic Remote incluido y audífonos Bluetooth de regalo.',
    price: 1659.00,
    originalPrice: 2939.00,
    images: [
      '/productos_img/auriculares.webp',
      '/productos_img/metaquest.webp',
      '/productos_img/pcagamer.webp'
    ],
    category: 'Tecnología',
    subcategory: 'Televisores',
    brand: 'LG',
    seller: 'GRUPO MERPES PERU S.A.C.',
    specs: {
      tamaño: '55 pulgadas',
      resolucion: '4K UHD',
      smartTV: 'WebOS',
      conectividad: 'Wi-Fi, Bluetooth',
      puertos: 'HDMI x3, USB x2',
      sonido: 'Dolby Digital'
    },
    featured: true,
    discount: 44,
    installments: {
      months: 24,
      monthlyPayment: 62.60,
      tcea: 28.9
    },
    stock: 5,
    tags: ['televisor', 'smart tv', '4k', 'lg', 'oferta']
  },
  {
    id: '3',
    name: 'CELULAR APPLE IPHONE 14 PRO MAX ESIM 2022 6GB 128GB NEGRO (REACONDICIONADO)',
    description: 'iPhone 14 Pro Max reacondicionado en excelente estado, con todas las funcionalidades originales.',
    price: 3599.00,
    originalPrice: 4292.00,
    images: [
      '/productos_img/cel2.webp',
      '/productos_img/cel3.webp'
    ],
    category: 'Reacondicionados',
    subcategory: 'Celulares',
    brand: 'APPLE',
    seller: 'GENERAL KPCOMPUTER SERVICES SAC',
    specs: {
      memoria: '128GB',
      ram: '6GB',
      color: 'Negro',
      sistemaOperativo: 'iOS',
      pantalla: '6.7 pulgadas',
      camara: '48MP Pro',
      bateria: '4323 mAh'
    },
    featured: true,
    discount: 16,
    installments: {
      months: 12,
      monthlyPayment: 220.17,
      tcea: 35.2
    },
    stock: 3,
    tags: ['smartphone', 'apple', 'reacondicionado', 'pro max']
  },
  {
    id: '4',
    name: 'Combo XIAOMI 12 PURPURA Auriculares JBL Vibe',
    description: 'Combo especial: Xiaomi 12 en color púrpura más auriculares JBL Vibe incluidos.',
    price: 2299.00,
    originalPrice: 2874.00,
    images: [
      '/productos_img/cel1.webp',
      '/productos_img/auriculares.webp'
    ],
    category: 'Tecnología',
    subcategory: 'Celulares',
    brand: 'XIAOMI',
    seller: 'CELULARES PERU SMART S.A.C.',
    specs: {
      memoria: '256GB',
      ram: '8GB',
      color: 'Púrpura',
      sistemaOperativo: 'Android 12',
      pantalla: '6.28 pulgadas',
      camara: '50MP',
      bateria: '4500 mAh',
      incluye: 'Auriculares JBL Vibe'
    },
    featured: true,
    isCombo: true,
    discount: 20,
    installments: {
      months: 18,
      monthlyPayment: 140.64,
      tcea: 30.1
    },
    stock: 8,
    tags: ['combo', 'xiaomi', 'auriculares', 'android']
  },
  {
    id: '5',
    name: 'LAPTOP HP PAVILION 15-EG3001LA INTEL CORE I5 1235U 8GB 512GB SSD',
    description: 'Laptop HP Pavilion con procesador Intel Core i5 de 12va generación, 8GB RAM y 512GB SSD.',
    price: 2499.00,
    images: [
      '/productos_img/pcagamer.webp',
      '/productos_img/pcsillas.jpg'
    ],
    category: 'Tecnología',
    subcategory: 'Laptops',
    brand: 'HP',
    seller: 'MIPCLISTA',
    specs: {
      procesador: 'Intel Core i5-1235U',
      ram: '8GB DDR4',
      almacenamiento: '512GB SSD',
      pantalla: '15.6 pulgadas Full HD',
      graficos: 'Intel Iris Xe',
      sistemaOperativo: 'Windows 11',
      peso: '1.75 kg'
    },
    installments: {
      months: 24,
      monthlyPayment: 95.50,
      tcea: 29.8
    },
    stock: 12,
    tags: ['laptop', 'hp', 'intel i5', 'ssd']
  },
  {
    id: '6',
    name: 'SAMSUNG GALAXY A54 5G 128GB 8GB RAM VIOLETA',
    description: 'Samsung Galaxy A54 5G con cámara triple de 50MP, pantalla Super AMOLED y conectividad 5G.',
    price: 1299.00,
    images: [
      '/productos_img/cel3.webp',
      '/productos_img/cel1.webp'
    ],
    category: 'Tecnología',
    subcategory: 'Celulares',
    brand: 'SAMSUNG',
    seller: 'GRUPO MERPES PERU S.A.C.',
    specs: {
      memoria: '128GB',
      ram: '8GB',
      color: 'Violeta',
      sistemaOperativo: 'Android 13',
      pantalla: '6.4 pulgadas Super AMOLED',
      camara: '50MP triple',
      bateria: '5000 mAh',
      conectividad: '5G'
    },
    installments: {
      months: 18,
      monthlyPayment: 79.99,
      tcea: 31.2
    },
    stock: 15,
    tags: ['samsung', 'android', '5g', 'galaxy']
  }
];

// Categorías principales
export const categories: Category[] = [
  {
    id: '1',
    name: 'Tecnología',
    slug: 'tecnologia',
    image: '/images/categories/tecnologia.jpg',
    subcategories: [
      { id: '1-1', name: 'Celulares', slug: 'celulares', categoryId: '1' },
      { id: '1-2', name: 'Laptops', slug: 'laptops', categoryId: '1' },
      { id: '1-3', name: 'Tablets', slug: 'tablets', categoryId: '1' },
      { id: '1-4', name: 'Televisores', slug: 'televisores', categoryId: '1' },
      { id: '1-5', name: 'Audio', slug: 'audio', categoryId: '1' },
      { id: '1-6', name: 'Gaming', slug: 'gaming', categoryId: '1' }
    ]
  },
  {
    id: '2',
    name: 'Electrodomésticos',
    slug: 'electrodomesticos',
    image: '/images/categories/electrodomesticos.jpg',
    subcategories: [
      { id: '2-1', name: 'Refrigeradores', slug: 'refrigeradores', categoryId: '2' },
      { id: '2-2', name: 'Lavadoras', slug: 'lavadoras', categoryId: '2' },
      { id: '2-3', name: 'Microondas', slug: 'microondas', categoryId: '2' },
      { id: '2-4', name: 'Aspiradoras', slug: 'aspiradoras', categoryId: '2' }
    ]
  },
  {
    id: '3',
    name: 'Cocinas',
    slug: 'cocinas',
    image: '/images/categories/cocinas.jpg',
    subcategories: [
      { id: '3-1', name: 'Cocinas a Gas', slug: 'cocinas-gas', categoryId: '3' },
      { id: '3-2', name: 'Cocinas Eléctricas', slug: 'cocinas-electricas', categoryId: '3' },
      { id: '3-3', name: 'Hornos', slug: 'hornos', categoryId: '3' }
    ]
  },
  {
    id: '4',
    name: 'Muebles',
    slug: 'muebles',
    image: '/images/categories/muebles.jpg',
    subcategories: [
      { id: '4-1', name: 'Salas', slug: 'salas', categoryId: '4' },
      { id: '4-2', name: 'Dormitorios', slug: 'dormitorios', categoryId: '4' },
      { id: '4-3', name: 'Comedores', slug: 'comedores', categoryId: '4' }
    ]
  },
  {
    id: '5',
    name: 'Reacondicionados',
    slug: 'reacondicionados',
    image: '/images/categories/reacondicionados.jpg',
    subcategories: [
      { id: '5-1', name: 'Celulares', slug: 'celulares-reacondicionados', categoryId: '5' },
      { id: '5-2', name: 'Laptops', slug: 'laptops-reacondicionadas', categoryId: '5' },
      { id: '5-3', name: 'Tablets', slug: 'tablets-reacondicionadas', categoryId: '5' }
    ]
  }
];

// Marcas destacadas
export const featuredBrands: FeaturedBrand[] = [
  {
    id: '1',
    name: 'Apple',
    logo: '/images/brands/apple.svg',
    slug: 'apple'
  },
  {
    id: '2',
    name: 'Samsung',
    logo: '/images/brands/samsung.svg',
    slug: 'samsung'
  },
  {
    id: '3',
    name: 'HP',
    logo: '/images/brands/hp.svg',
    slug: 'hp'
  },
  {
    id: '4',
    name: 'Xiaomi',
    logo: '/images/brands/xiaomi.svg',
    slug: 'xiaomi'
  },
  {
    id: '5',
    name: 'LG',
    logo: '/images/brands/lg.svg',
    slug: 'lg'
  },
  {
    id: '6',
    name: 'Sony',
    logo: '/images/brands/sony.svg',
    slug: 'sony'
  }
];

// Slides del hero
export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Encuentra todo en un solo lugar',
    subtitle: 'Tecnología, electrodomésticos y más para tu hogar',
    image: '/images/hero/slide-1.jpg',
    buttonText: 'Ver productos'
  },
  {
    id: '2',
    title: 'Sin trámites, cuotas más bajas',
    subtitle: 'Compra fácil y seguro con nosotros',
    image: '/images/hero/slide-2.jpg',
    buttonText: 'Simular crédito'
  },
  {
    id: '3',
    title: 'Los mejores precios del mercado',
    subtitle: 'Ofertas exclusivas para nuestros clientes',
    image: '/images/hero/slide-3.jpg',
    buttonText: 'Ver ofertas'
  }
];

// Términos más buscados
export const popularSearchTerms = [
  'Celulares',
  'iPhone',
  'Moto',
  'Laptop',
  'Lavadora',
  'Samsung',
  'TV 55',
  'Nintendo',
  'PlayStation',
  'iPad'
];

// Productos populares por categoría
export const popularProductsByCategory = {
  'Celulares': ['iPhone 16', 'Samsung Galaxy A54', 'Xiaomi 12'],
  'Televisores': ['TV LG 55"', 'Samsung QLED', 'Hyundai 70"'],
  'Laptops': ['HP Pavilion', 'Lenovo IdeaPad', 'ASUS VivoBook'],
  'Tablets': ['iPad Air', 'Samsung Tab', 'Huawei MatePad']
};

// Configuración de la aplicación
export const appConfig = {
  siteName: 'Credicálidda Marketplace',
  siteDescription: 'Encuentra tecnología, electrodomésticos y más para tu hogar con las mejores cuotas',
  whatsappNumber: '+51987654321',
  email: 'contacto@credicalidda.com.pe',
  socialMedia: {
    facebook: 'https://facebook.com/credicalidda.oficial',
    instagram: 'https://instagram.com/credicalidda'
  }
};
