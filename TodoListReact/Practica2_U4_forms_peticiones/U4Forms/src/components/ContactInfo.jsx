// ContactInfo.jsx
// Este componente maneja los datos de contacto del usuario

import React from 'react';
import '../styles/FitLife.css';

/**
 * PROPS QUE RECIBE:
 * - register: función de React Hook Form para registrar campos
 * - errors: objeto con los errores de validación
 */
const ContactInfo = ({ register, errors }) => {
  
  return (
    <div className="form-section">
      {/* Título de la sección */}
      <h2 className="section-title">
         Información de Contacto
      </h2>

      {/* Campo: Email */}
      <div className="form-group">
        <label className="form-label required">
           Correo Electrónico
        </label>
        <input
          type="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          placeholder="ejemplo@correo.com"
          {...register('email', {
            required: 'El email es obligatorio',
            pattern: {
              // Expresión regular para validar formato de email
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'El formato del email no es válido'
            }
          })}
        />
        {errors.email && (
          <span className="error-message">
            ⚠️ {errors.email.message}
          </span>
        )}
      </div>

      {/* Campo: Teléfono */}
      <div className="form-group">
        <label className="form-label required">
          📱 Teléfono
        </label>
        <input
          type="tel"
          className={`form-input ${errors.telefono ? 'error' : ''}`}
          placeholder="612345678"
          {...register('telefono', {
            required: 'El teléfono es obligatorio',
            pattern: {
              // Acepta números de 9 dígitos (teléfonos españoles)
              value: /^[0-9]{9}$/,
              message: 'El teléfono debe tener 9 dígitos'
            }
          })}
        />
        {errors.telefono && (
          <span className="error-message">
            ⚠️ {errors.telefono.message}
          </span>
        )}
        <small style={{ color: '#666', fontSize: '0.85rem' }}>
          Formato: 9 dígitos sin espacios
        </small>
      </div>

      {/* Campo: Dirección */}
      <div className="form-group">
        <label className="form-label required">
           Dirección
        </label>
        <input
          type="text"
          className={`form-input ${errors.direccion ? 'error' : ''}`}
          placeholder="Calle Principal, 123"
          {...register('direccion', {
            required: 'La dirección es obligatoria',
            minLength: {
              value: 5,
              message: 'La dirección debe tener al menos 5 caracteres'
            }
          })}
        />
        {errors.direccion && (
          <span className="error-message">
            ⚠️ {errors.direccion.message}
          </span>
        )}
      </div>

      {/* Grid para Ciudad y Código Postal */}
      <div className="form-row">
        
        {/* Campo: Ciudad */}
        <div className="form-group">
          <label className="form-label required">
             Ciudad
          </label>
          <input
            type="text"
            className={`form-input ${errors.ciudad ? 'error' : ''}`}
            placeholder="Madrid"
            {...register('ciudad', {
              required: 'La ciudad es obligatoria',
              minLength: {
                value: 2,
                message: 'La ciudad debe tener al menos 2 caracteres'
              }
            })}
          />
          {errors.ciudad && (
            <span className="error-message">
              ⚠️ {errors.ciudad.message}
            </span>
          )}
        </div>

        {/* Campo: Código Postal */}
        <div className="form-group">
          <label className="form-label required">
             Código Postal
          </label>
          <input
            type="text"
            className={`form-input ${errors.codigoPostal ? 'error' : ''}`}
            placeholder="28001"
            {...register('codigoPostal', {
              required: 'El código postal es obligatorio',
              pattern: {
                // Código postal español: 5 dígitos
                value: /^[0-9]{5}$/,
                message: 'El código postal debe tener 5 dígitos'
              }
            })}
          />
          {errors.codigoPostal && (
            <span className="error-message">
              ⚠️ {errors.codigoPostal.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;


/* ============================================
   📚 EXPLICACIÓN DE CONCEPTOS CLAVE
   ============================================

   1. VALIDACIÓN CON EXPRESIONES REGULARES (pattern):
   --------------------------------------------------
   Las expresiones regulares son patrones para validar texto.
   
   Ejemplo Email:
   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
   
   Desglose:
   - ^ = inicio
   - [A-Z0-9._%+-]+ = letras, números y símbolos antes del @
   - @ = símbolo arroba
   - [A-Z0-9.-]+ = dominio
   - \. = punto literal
   - [A-Z]{2,} = al menos 2 letras (com, es, org)
   - $ = fin
   - i = sin distinguir mayúsculas/minúsculas
   
   Ejemplo Teléfono:
   /^[0-9]{9}$/ = exactamente 9 dígitos


   2. TIPOS DE INPUT HTML:
   -----------------------
   - type="email": Muestra teclado de email en móviles
   - type="tel": Muestra teclado numérico en móviles
   - type="text": Teclado normal
   
   Aunque parecen iguales en desktop, mejoran la UX en móviles.


   3. MENSAJES DE AYUDA:
   ---------------------
   <small>Formato: 9 dígitos sin espacios</small>
   
   Ayudan al usuario a entender qué formato necesita.
   Es una buena práctica UX.


   4. VALIDACIÓN MÚLTIPLE:
   -----------------------
   Un campo puede tener varias validaciones:
   - required: obligatorio
   - pattern: formato específico
   - minLength: longitud mínima
   
   Se evalúan en orden y se muestra el primer error.


   5. COMPONENTES REUTILIZABLES:
   -----------------------------
   Este componente puede usarse en múltiples formularios
   simplemente pasándole las props necesarias.
   
   Ventajas:
   - Código organizado
   - Fácil de mantener
   - Reutilizable en otros proyectos

*/