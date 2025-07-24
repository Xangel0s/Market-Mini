'use client';

import React, { useState } from 'react';
import { X, User, Mail, CreditCard, Check, MessageCircle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Product, ContactForm } from '@/types';
import { 
  openWhatsApp, 
  sendToGoogleSheets, 
  prepareLeadData,
  validateDNI,
  validateEmail,
  formatPrice 
} from '@/utils/whatsapp';
import toast from 'react-hot-toast';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  source: 'product' | 'cart';
}

const ContactModal: React.FC<ContactModalProps> = ({ 
  isOpen, 
  onClose, 
  products, 
  source 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    try {
      // Validaciones adicionales
      if (!validateDNI(data.dni)) {
        toast.error('Por favor, ingresa un DNI válido de 8 dígitos');
        setIsSubmitting(false);
        return;
      }

      if (!validateEmail(data.email)) {
        toast.error('Por favor, ingresa un email válido');
        setIsSubmitting(false);
        return;
      }

      // Preparar datos del lead
      const leadData = prepareLeadData(products, data, source);

      // Enviar datos a Google Sheets
      const sheetSuccess = await sendToGoogleSheets(leadData);
      
      if (sheetSuccess) {
        toast.success('Datos guardados correctamente');
      } else {
        toast.error('Error al guardar datos, pero continuaremos con WhatsApp');
      }

      // Abrir WhatsApp
      openWhatsApp(products, data, source);

      // Mostrar paso de éxito
      setStep('success');
      
      // Cerrar modal después de un tiempo
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (error) {
      console.error('Error en el envío:', error);
      toast.error('Ocurrió un error. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    reset();
    onClose();
  };

  if (!isOpen) return null;

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {step === 'form' ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Solicitar Asesoría por WhatsApp
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {products.length === 1 
                    ? 'Completa tus datos para recibir asesoría sobre este producto'
                    : `Completa tus datos para recibir asesoría sobre ${products.length} productos`
                  }
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Resumen de productos */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                {products.length === 1 ? 'Producto seleccionado:' : 'Productos seleccionados:'}
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {products.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {index + 1}. {product.name}
                      </p>
                      <p className="text-gray-500">
                        {product.brand} • {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {products.length > 1 && (
                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total aproximado:</span>
                    <span className="text-primary-600">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    {...register('firstName', { 
                      required: 'El nombre es requerido',
                      minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                    })}
                    className="input-field pl-10"
                    placeholder="Tu nombre"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>

              {/* Apellido */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    {...register('lastName', { 
                      required: 'El apellido es requerido',
                      minLength: { value: 2, message: 'El apellido debe tener al menos 2 caracteres' }
                    })}
                    className="input-field pl-10"
                    placeholder="Tu apellido"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>

              {/* DNI */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DNI *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    {...register('dni', { 
                      required: 'El DNI es requerido',
                      pattern: {
                        value: /^[0-9]{8}$/,
                        message: 'El DNI debe tener 8 dígitos'
                      }
                    })}
                    className="input-field pl-10"
                    placeholder="12345678"
                    maxLength={8}
                  />
                </div>
                {errors.dni && (
                  <p className="text-red-500 text-xs mt-1">{errors.dni.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'El correo es requerido',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Ingresa un correo válido'
                      }
                    })}
                    className="input-field pl-10"
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Checkbox de marketing */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('acceptMarketing')}
                  className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  id="acceptMarketing"
                />
                <label htmlFor="acceptMarketing" className="text-sm text-gray-600">
                  Acepto recibir información promocional y ofertas especiales por email o WhatsApp
                </label>
              </div>

              {/* Información adicional */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">¿Qué sucede después?</p>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li>• Tus datos se guardarán de forma segura</li>
                      <li>• Se abrirá WhatsApp con tu consulta pre-redactada</li>
                      <li>• Recibirás asesoría personalizada de inmediato</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 btn-outline"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      <span>Continuar a WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Paso de éxito */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              ¡Perfecto!
            </h2>
            <p className="text-gray-600 mb-4">
              Tus datos han sido guardados y WhatsApp se está abriendo con tu consulta.
            </p>
            <p className="text-sm text-gray-500">
              Si WhatsApp no se abrió automáticamente, puedes cerrar esta ventana e intentar nuevamente.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 btn-primary"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
