// RegistrationForm.jsx
// Componente principal que coordina todo el formulario multi-paso

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import TrainingPreferences from './TrainingPreferences';
import Summary from './Summary';
import '../styles/FitLife.css';

const RegistrationForm = () => {
  
  // REACT HOOK FORM - Inicialización
  const { 
    register,           // Función para registrar campos
    handleSubmit,       // Función para manejar envío
    formState: { errors }, // Objeto con errores
    watch,              // Función para observar valores
    trigger,            // Función para validar manualmente
    getValues           // Función para obtener todos los valores
  } = useForm({
    mode: 'onBlur'     // Valida cuando el usuario sale del campo
  });

  // ESTADO LOCAL
  const [currentStep, setCurrentStep] = useState(1); // Paso actual (1-4)
  const [loading, setLoading] = useState(false);     // Estado de carga
  const [submitStatus, setSubmitStatus] = useState(null); // Éxito/error

  // Total de pasos del formulario
  const totalSteps = 4;

  // FUNCIÓN: Validar paso actual
  /**
   * Valida los campos del paso actual antes de avanzar
   * Retorna true si todo está bien, false si hay errores
   */
  const validateCurrentStep = async () => {
    let fieldsToValidate = [];

    // Definimos qué campos validar según el paso
    switch (currentStep) {
      case 1: // Datos Personales
        fieldsToValidate = ['nombre', 'apellidos', 'fechaNacimiento', 'genero'];
        break;
      case 2: // Información de Contacto
        fieldsToValidate = ['email', 'telefono', 'direccion', 'ciudad', 'codigoPostal'];
        break;
      case 3: // Preferencias de Entrenamiento
        fieldsToValidate = ['objetivo', 'diasSemana', 'horario'];
        break;
      default:
        return true;
    }

    // trigger() valida los campos especificados
    const result = await trigger(fieldsToValidate);
    return result;
  };

  // FUNCIÓN: Avanzar al siguiente paso
  const handleNext = async () => {
    // Primero validamos el paso actual
    const isValid = await validateCurrentStep();
    
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Scroll suave hacia arriba
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // FUNCIÓN: Volver al paso anterior
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // FUNCIÓN: Enviar formulario al servidor
  /**
   * Esta función se ejecuta cuando el usuario confirma el envío
   * Hace una petición HTTP POST con todos los datos
   */
  const onSubmit = async (data) => {
    setLoading(true);
    setSubmitStatus(null);

    try {
      // Simula petición HTTP a la API
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Estructuramos los datos para la API
          nombre: data.nombre,
          apellidos: data.apellidos,
          fechaNacimiento: data.fechaNacimiento,
          genero: data.genero,
          email: data.email,
          telefono: data.telefono,
          direccion: {
            calle: data.direccion,
            ciudad: data.ciudad,
            codigoPostal: data.codigoPostal
          },
          preferencias: {
            objetivo: data.objetivo,
            entrenamientos: data.entrenamientos || [],
            diasSemana: data.diasSemana,
            horario: data.horario
          },
          fechaRegistro: new Date().toISOString()
        })
      });

      // Verificamos si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      // Obtenemos la respuesta del servidor
      const responseData = await response.json();
      console.log('✅ Respuesta del servidor:', responseData);

      // Mostramos mensaje de éxito
      setSubmitStatus({
        type: 'success',
        message: '¡Registro completado exitosamente! Bienvenido a FitLife 🎉'
      });

      // Podríamos redirigir al usuario después de 3 segundos
      // setTimeout(() => {
      //   window.location.href = '/dashboard';
      // }, 3000);

    } catch (error) {
      console.error('Error:', error);
      
      // Mostramos mensaje de error
      setSubmitStatus({
        type: 'error',
        message: `Error al procesar tu registro: ${error.message}`
      });
    } finally {
      // Siempre desactivamos el loading al finalizar
      setLoading(false);
    }
  };

  
  // RENDERIZADO DEL COMPONENTE
 
  return (
    <div className="fitlife-container">
      <div className="fitlife-card">
        
        {/*
            HEADER DEL FORMULARIO
          */}
        <div className="fitlife-header">
          <h1>FitLife Registration</h1>
          <p>Tu viaje hacia una vida saludable comienza aquí</p>
        </div>

        {/* INDICADOR DE PASOS */}
          
        <div style={{ padding: '2rem 2rem 0 2rem' }}>
          <div className="steps-indicator">
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                className={`step ${
                  step === currentStep 
                    ? 'active' 
                    : step < currentStep 
                    ? 'completed' 
                    : ''
                }`}
              >
                {step < currentStep ? '✓' : step}
              </div>
            ))}
          </div>
          
          {/* Texto del paso actual */}
          <p style={{ 
            textAlign: 'center', 
            color: '#667eea', 
            fontWeight: 'bold',
            marginTop: '1rem'
          }}>
            Paso {currentStep} de {totalSteps}
          </p>
        </div>

        {/* ============================================
            CONTENIDO DEL FORMULARIO
            ============================================ */}
        <div className="fitlife-content">
          
          {/* Mostrar mensaje de éxito/error */}
          {submitStatus && (
            <div className={`message-box ${
              submitStatus.type === 'success' 
                ? 'message-success' 
                : 'message-error'
            }`}>
              <span>{submitStatus.type === 'success' ? '✅' : '❌'}</span>
              <span>{submitStatus.message}</span>
            </div>
          )}

          {/* ============================================
              RENDERIZADO CONDICIONAL DE PASOS
              Mostramos el componente según el paso actual
              ============================================ */}
          
          {/* Paso 1: Datos Personales */}
          {currentStep === 1 && (
            <PersonalInfo 
              register={register} 
              errors={errors} 
            />
          )}

          {/* Paso 2: Información de Contacto */}
          {currentStep === 2 && (
            <ContactInfo 
              register={register} 
              errors={errors} 
            />
          )}

          {/* Paso 3: Preferencias de Entrenamiento */}
          {currentStep === 3 && (
            <TrainingPreferences 
              register={register} 
              errors={errors}
              watch={watch}
            />
          )}

          {/* Paso 4: Resumen */}
          {currentStep === 4 && (
            <Summary data={getValues()} />
          )}

          {/* ============================================
              BOTONES DE NAVEGACIÓN
              ============================================ */}
          <div className="button-group">
            
            {/* Botón: Anterior (no se muestra en el primer paso) */}
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="btn btn-secondary"
                disabled={loading}
              >
                ← Anterior
              </button>
            )}

            {/* Botón: Siguiente (se muestra hasta el paso 3) */}
            {currentStep < totalSteps && (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
                style={{ marginLeft: 'auto' }}
              >
                Siguiente →
              </button>
            )}

            {/* Botón: Enviar (solo en el último paso) */}
            {currentStep === totalSteps && (
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="btn btn-primary"
                disabled={loading}
                style={{ marginLeft: 'auto' }}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                     Confirmar Registro
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;


/* ============================================
   📚 EXPLICACIÓN DE CONCEPTOS CLAVE
   ============================================

   1. FORMULARIO MULTI-PASO:
   -------------------------
   Un formulario largo se divide en varios pasos para:
   - Mejorar la experiencia de usuario (no abruma)
   - Facilitar el llenado (paso por paso)
   - Reducir errores (valida por secciones)
   
   Usamos una variable 'currentStep' para saber qué paso mostrar.


   2. VALIDACIÓN POR PASOS:
   ------------------------
   const validateCurrentStep = async () => { ... }
   
   Antes de avanzar, validamos solo los campos del paso actual.
   Esto da feedback inmediato sin validar todo el formulario.
   
   trigger(campos) valida los campos especificados sin enviar.


   3. COMUNICACIÓN PADRE-HIJOS:
   ---------------------------
   Flujo de datos:
   
   RegistrationForm (padre)
      ├─ register, errors → PersonalInfo (hijo)
      ├─ register, errors → ContactInfo (hijo)
      ├─ register, errors, watch → TrainingPreferences (hijo)
      └─ data → Summary (hijo)
   
   El padre tiene toda la lógica y pasa lo necesario a cada hijo.


   4. GETVALUES():
   --------------
   const data = getValues();
   
   Obtiene todos los valores actuales del formulario.
   Útil para pasar datos completos al componente Summary.


   5. TRIGGER():
   ------------
   await trigger(['nombre', 'email']);
   
   Valida campos específicos sin enviar el formulario.
   Devuelve true si todo es válido, false si hay errores.
   
   Es async, por eso usamos await.


   6. PETICIÓN HTTP POST:
   ---------------------
   await fetch(url, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(datos)
   })
   
   - method: tipo de petición (POST para crear)
   - headers: indica que enviamos JSON
   - body: datos convertidos a texto JSON
   
   JSON.stringify() convierte un objeto JS a string JSON.


   7. TRY-CATCH-FINALLY:
   --------------------
   try {
     // Código que puede fallar
   } catch (error) {
     // Qué hacer si falla
   } finally {
     // Código que SIEMPRE se ejecuta
   }
   
   finally se usa para limpiar (ej: desactivar loading).


   8. RESPUESTA HTTP:
   -----------------
   const response = await fetch(...);
   
   response.ok → true si código es 200-299
   response.json() → convierte respuesta a objeto JS
   
   Siempre verificamos response.ok antes de procesar.


   9. ESTADOS DE LOADING:
   ----------------------
   const [loading, setLoading] = useState(false);
   
   - Antes de la petición: setLoading(true)
   - Después (éxito o error): setLoading(false)
   
   Desactiva botones y muestra spinner mientras carga.


   10. RENDERIZADO CONDICIONAL:
   ---------------------------
   {currentStep === 1 && <PersonalInfo />}
   
   Solo muestra el componente si currentStep es 1.
   Así mostramos diferentes pasos en el mismo espacio.


   11. DISABLED EN BOTONES:
   ------------------------
   <button disabled={loading}>
   
   Desactiva el botón mientras se envía el formulario.
   Evita envíos duplicados (doble clic).


   12. HANDLESUBMIT:
   ----------------
   handleSubmit(onSubmit)
   
   Es una función que envuelve nuestra función onSubmit.
   Primero valida todo, y solo si es válido, ejecuta onSubmit.
   
   Siempre se usa así: onClick={handleSubmit(onSubmit)}


   13. WINDOW.SCROLLTO:
   -------------------
   window.scrollTo({ top: 0, behavior: 'smooth' })
   
   Hace scroll al inicio de la página suavemente.
   Mejora UX al cambiar de paso (usuario ve el inicio).


   14. VENTAJAS DE ESTA ARQUITECTURA:
   ----------------------------------
   ✅ Componentes separados y reutilizables
   ✅ Código organizado y fácil de mantener
   ✅ Validación por pasos (mejor UX)
   ✅ Fácil agregar/quitar pasos
   ✅ Manejo robusto de errores
   ✅ Feedback visual constante al usuario

*/