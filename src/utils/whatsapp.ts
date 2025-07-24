import { Product, ContactForm, LeadData } from '@/types';
import { appConfig } from '@/data';

/**
 * Genera un mensaje de WhatsApp con información de productos
 */
export const generateWhatsAppMessage = (
  products: Product[],
  contactInfo: ContactForm,
  source: 'product' | 'cart'
): string => {
  const { firstName, lastName, dni, email } = contactInfo;
  
  let message = `¡Hola! Estoy interesado en obtener más información:\n\n`;
  
  // Información del cliente
  message += `👤 *Datos del cliente:*\n`;
  message += `• Nombre: ${firstName} ${lastName}\n`;
  message += `• DNI: ${dni}\n`;
  message += `• Email: ${email}\n\n`;
  
  // Información de productos
  if (products.length === 1) {
    const product = products[0];
    message += `📱 *Producto de interés:*\n`;
    message += `• ${product.name}\n`;
    message += `• Precio: S/ ${product.price.toLocaleString('es-PE', { minimumFractionDigits: 2 })}\n`;
    message += `• Cuota mensual: S/ ${product.installments.monthlyPayment.toLocaleString('es-PE', { minimumFractionDigits: 2 })} (${product.installments.months} meses)\n`;
    message += `• Marca: ${product.brand}\n`;
    message += `• Vendedor: ${product.seller}\n\n`;
  } else {
    message += `🛒 *Productos de interés (${products.length} productos):*\n\n`;
    
    products.forEach((product, index) => {
      message += `${index + 1}. ${product.name}\n`;
      message += `   • Precio: S/ ${product.price.toLocaleString('es-PE', { minimumFractionDigits: 2 })}\n`;
      message += `   • Cuota: S/ ${product.installments.monthlyPayment.toLocaleString('es-PE', { minimumFractionDigits: 2 })} (${product.installments.months} meses)\n`;
      message += `   • Marca: ${product.brand}\n\n`;
    });
    
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    message += `💰 *Total aproximado: S/ ${totalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}*\n\n`;
  }
  
  // Mensaje final
  message += `🙋‍♂️ *Solicitud:*\n`;
  message += `Me gustaría recibir asesoría personalizada sobre ${products.length === 1 ? 'este producto' : 'estos productos'}, conocer más detalles sobre las cuotas, disponibilidad y proceso de compra.\n\n`;
  message += `📊 Origen: ${source === 'product' ? 'Página de producto' : 'Carrito de compras'}\n`;
  message += `⏰ Fecha: ${new Date().toLocaleString('es-PE')}\n\n`;
  message += `¡Gracias por su atención! 😊`;
  
  return message;
};

/**
 * Genera la URL de WhatsApp con el mensaje pre-rellenado
 */
export const generateWhatsAppURL = (
  products: Product[],
  contactInfo: ContactForm,
  source: 'product' | 'cart'
): string => {
  const message = generateWhatsAppMessage(products, contactInfo, source);
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = appConfig.whatsappNumber.replace('+', '');
  
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Abre WhatsApp con el mensaje pre-rellenado
 */
export const openWhatsApp = (
  products: Product[],
  contactInfo: ContactForm,
  source: 'product' | 'cart'
): void => {
  const url = generateWhatsAppURL(products, contactInfo, source);
  window.open(url, '_blank');
};

/**
 * Valida un número de teléfono peruano
 */
export const validatePeruvianPhone = (phone: string): boolean => {
  // Formato: +51 9XX XXX XXX o 9XX XXX XXX
  const phoneRegex = /^(\+51\s?)?9\d{8}$/;
  const cleanPhone = phone.replace(/\s+/g, '');
  return phoneRegex.test(cleanPhone);
};

/**
 * Formatea un número de teléfono peruano
 */
export const formatPeruvianPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\s+/g, '').replace('+51', '');
  if (cleanPhone.length === 9 && cleanPhone.startsWith('9')) {
    return `+51 ${cleanPhone.substring(0, 3)} ${cleanPhone.substring(3, 6)} ${cleanPhone.substring(6)}`;
  }
  return phone;
};

/**
 * Prepara los datos para enviar a Google Sheets
 */
export const prepareLeadData = (
  products: Product[],
  contactInfo: ContactForm,
  source: 'product' | 'cart'
): LeadData => {
  return {
    ...contactInfo,
    products,
    timestamp: new Date(),
    source
  };
};

/**
 * Envía los datos del lead a Google Sheets
 * Esta función debería conectar con Google Sheets API o un webhook
 */
export const sendToGoogleSheets = async (leadData: LeadData): Promise<boolean> => {
  try {
    // Aquí implementarías la integración real con Google Sheets
    // Por ahora, simula el envío exitoso
    
    const dataToSend = {
      timestamp: leadData.timestamp.toISOString(),
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      dni: leadData.dni,
      email: leadData.email,
      acceptMarketing: leadData.acceptMarketing,
      source: leadData.source,
      productsCount: leadData.products.length,
      products: leadData.products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        brand: p.brand,
        category: p.category,
        seller: p.seller
      })),
      totalValue: leadData.products.reduce((sum, product) => sum + product.price, 0)
    };
    
    // Ejemplo de envío a Google Sheets usando Google Apps Script Web App
    // const response = await fetch('TU_GOOGLE_APPS_SCRIPT_URL', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(dataToSend)
    // });
    
    // return response.ok;
    
    // Por ahora, simula un envío exitoso
    console.log('Datos del lead preparados para Google Sheets:', dataToSend);
    
    // Guardar en localStorage como respaldo temporal
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    leads.push(dataToSend);
    localStorage.setItem('leads', JSON.stringify(leads));
    
    return true;
  } catch (error) {
    console.error('Error enviando datos a Google Sheets:', error);
    return false;
  }
};

/**
 * Función para configurar la integración con Google Sheets
 * Retorna el código de Google Apps Script necesario
 */
export const getGoogleAppsScriptCode = (): string => {
  return `
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Si es la primera vez, agregar encabezados
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 12).setValues([[
        'Fecha',
        'Nombre',
        'Apellido', 
        'DNI',
        'Email',
        'Acepta Marketing',
        'Origen',
        'Cantidad Productos',
        'Productos',
        'Valor Total',
        'Marcas',
        'Categorías'
      ]]);
    }
    
    // Agregar los datos
    const row = [
      new Date(data.timestamp),
      data.firstName,
      data.lastName,
      data.dni,
      data.email,
      data.acceptMarketing ? 'Sí' : 'No',
      data.source,
      data.productsCount,
      data.products.map(p => p.name).join(', '),
      data.totalValue,
      data.products.map(p => p.brand).join(', '),
      data.products.map(p => p.category).join(', ')
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
  `;
};

/**
 * Valida el formato de email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida el DNI peruano
 */
export const validateDNI = (dni: string): boolean => {
  const dniRegex = /^[0-9]{8}$/;
  return dniRegex.test(dni);
};

/**
 * Formatea el precio en formato peruano
 */
export const formatPrice = (price: number): string => {
  return `S/ ${price.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
};

/**
 * Calcula el descuento en porcentaje
 */
export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Genera un texto personalizado para el botón de WhatsApp
 */
export const getWhatsAppButtonText = (context: 'product' | 'cart', productCount?: number): string => {
  if (context === 'product') {
    return '💬 Consultar por WhatsApp';
  } else {
    return `💬 Consultar ${productCount || 0} productos por WhatsApp`;
  }
};
