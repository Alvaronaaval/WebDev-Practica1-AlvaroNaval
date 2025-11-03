// PersonalInfo.jsx
// Este componente maneja los datos personales del usuario

import React from 'react';
import '../styles/FitLife.css';

/**
 * PROPS QUE RECIBE:
 * - register: función de React Hook Form para registrar campos
 * - errors: objeto con los errores de validación
 */
const PersonalInfo = ({ register, errors }) => {
  
  return (
    <div className="form-section">
      {/* Título de la sección */}
      <h2 className="section-title">
        Datos Personales
      </h2>

      {/* Grid de dos columnas para Nombre y Apellidos */}
      <div className="form-row">
        
        {/* Campo: Nombre */}
        <div className="form-group">
          <label className="form-label required">
            Nombre
          </label>
          <input
            type="text"
            className={`form-input ${errors.nombre ? 'error' : ''}`}
            placeholder="Ej: Juan"
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres'
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                message: 'Solo se permiten letras'
              }
            })}
          />
          {/* Mostrar error si existe */}
          {errors.nombre && (
            <span className="error-message">
              ⚠️ {errors.nombre.message}
            </span>
          )}
        </div>

        {/* Campo: Apellidos */}
        <div className="form-group">
          <label className="form-label required">
            Apellidos
          </label>
          <input
            type="text"
            className={`form-input ${errors.apellidos ? 'error' : ''}`}
            placeholder="Ej: García López"
            {...register('apellidos', {
              required: 'Los apellidos son obligatorios',
              minLength: {
                value: 2,
                message: 'Los apellidos deben tener al menos 2 caracteres'
              }
            })}
          />
          {errors.apellidos && (
            <span className="error-message">
              ⚠️ {errors.apellidos.message}
            </span>
          )}
        </div>
      </div>

      {/* Grid para Fecha de Nacimiento y Género */}
      <div className="form-row">
        
        {/* Campo: Fecha de Nacimiento */}
        <div className="form-group">
          <label className="form-label required">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            className={`form-input ${errors.fechaNacimiento ? 'error' : ''}`}
            {...register('fechaNacimiento', {
              required: 'La fecha de nacimiento es obligatoria',
              validate: {
                // Validación personalizada: debe ser mayor de 16 años
                mayorEdad: (value) => {
                  const hoy = new Date();
                  const fechaNac = new Date(value);
                  const edad = hoy.getFullYear() - fechaNac.getFullYear();
                  return edad >= 16 || 'Debes ser mayor de 16 años';
                }
              }
            })}
          />
          {errors.fechaNacimiento && (
            <span className="error-message">
              ⚠️ {errors.fechaNacimiento.message}
            </span>
          )}
        </div>

        {/* Campo: Género */}
        <div className="form-group">
          <label className="form-label required">
            Género
          </label>
          <select
            className={`form-select ${errors.genero ? 'error' : ''}`}
            {...register('genero', {
              required: 'Por favor selecciona tu género'
            })}
          >
            <option value="">Selecciona...</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
            <option value="no-especificar">Prefiero no especificar</option>
          </select>
          {errors.genero && (
            <span className="error-message">
              ⚠️ {errors.genero.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;


/* ============================================
   📚 EXPLICACIÓN DE CONCEPTOS CLAVE
   ============================================

   1. PROPS (Propiedades):
   ----------------------
   Son datos que recibe el componente desde su padre.
   En este caso:
   - register: función para registrar campos en el formulario
   - errors: objeto con errores de validación
   
   Se usan así: <PersonalInfo register={register} errors={errors} />


   2. {...register('nombre', validaciones)}:
   ----------------------------------------
   El operador spread (...) expande todas las propiedades que 
   register devuelve (onChange, onBlur, ref, name).
   
   Es equivalente a escribir:
   onChange={register('nombre').onChange}
   onBlur={register('nombre').onBlur}
   ref={register('nombre').ref}
   name="nombre"


   3. VALIDACIONES:
   ---------------
   - required: Campo obligatorio
   - minLength: Longitud mínima
   - pattern: Expresión regular (solo letras en este caso)
   - validate: Función personalizada (verificar edad)


   4. CONDICIONALES EN CLASSNAME:
   -----------------------------
   className={`form-input ${errors.nombre ? 'error' : ''}`}
   
   Si hay error en 'nombre', añade la clase 'error'.
   Esto hace que el campo se ponga rojo.


   5. RENDERIZADO CONDICIONAL:
   --------------------------
   {errors.nombre && <span>...</span>}
   
   Solo muestra el mensaje de error si existe errors.nombre.
   El operador && funciona como un "si existe, entonces muestra".

*/