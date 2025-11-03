// Summary.jsx
// Este componente muestra un resumen de todos los datos ingresados

import React from 'react';
import '../styles/FitLife.css';

/**
 * PROPS QUE RECIBE:
 * - data: objeto con todos los datos del formulario
 */
const Summary = ({ data }) => {
  
  // ============================================
  // FUNCIONES AUXILIARES PARA FORMATEAR DATOS
  // ============================================
  
  /**
   * Formatea la fecha de YYYY-MM-DD a DD/MM/YYYY
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'No especificado';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  /**
   * Calcula la edad a partir de la fecha de nacimiento
   */
  const calculateAge = (dateString) => {
    if (!dateString) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Ajustar si aún no ha cumplido años este año
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} años`;
  };

  /**
   * Formatea el objetivo para mostrarlo más legible
   */
  const formatGoal = (goal) => {
    const goals = {
      'perder-peso': ' Perder peso y tonificar',
      'ganar-musculo': ' Ganar masa muscular',
      'resistencia': ' Mejorar resistencia',
      'mantenerse-activo': ' Mantenerse activo y saludable'
    };
    return goals[goal] || 'No especificado';
  };

  /**
   * Formatea el horario preferido
   */
  const formatSchedule = (schedule) => {
    const schedules = {
      'manana': ' Mañana (6:00 - 12:00)',
      'tarde': ' Tarde (12:00 - 18:00)',
      'noche': ' Noche (18:00 - 23:00)'
    };
    return schedules[schedule] || 'No especificado';
  };

  /**
   * Formatea los tipos de entrenamiento seleccionados
   */
  const formatTrainings = (trainings) => {
    if (!trainings || trainings.length === 0) {
      return 'Ninguno seleccionado';
    }
    
    const trainingNames = {
      'cardio': ' Cardio',
      'fuerza': ' Fuerza',
      'yoga': ' Yoga',
      'crossfit': ' CrossFit',
      'natacion': ' Natación',
      'spinning': ' Spinning'
    };
    
    return trainings.map(t => trainingNames[t] || t).join(', ');
  };

  return (
    <div className="form-section">
      {/* Título de la sección */}
      <h2 className="section-title">
         Resumen de tu Inscripción
      </h2>

      {/* Mensaje informativo */}
      <div className="message-box message-loading" style={{ marginBottom: '1.5rem' }}>
        <span>👀</span>
        <span>
          Por favor, revisa que todos tus datos sean correctos antes de enviar.
        </span>
      </div>

      {/* ============================================
          SECCIÓN: Datos Personales
          ============================================ */}
      <div className="summary-section">
        <h3 style={{ 
          color: '#667eea', 
          marginBottom: '1rem',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
          👤 Datos Personales
        </h3>

        <div className="summary-item">
          <span className="summary-label">Nombre completo:</span>
          <span className="summary-value">
            {data.nombre} {data.apellidos}
          </span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Fecha de nacimiento:</span>
          <span className="summary-value">
            {formatDate(data.fechaNacimiento)} ({calculateAge(data.fechaNacimiento)})
          </span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Género:</span>
          <span className="summary-value" style={{ textTransform: 'capitalize' }}>
            {data.genero || 'No especificado'}
          </span>
        </div>
      </div>

      {/* ============================================
          SECCIÓN: Información de Contacto
          ============================================ */}
      <div className="summary-section">
        <h3 style={{ 
          color: '#667eea', 
          marginBottom: '1rem',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
          📞 Información de Contacto
        </h3>

        <div className="summary-item">
          <span className="summary-label">Email:</span>
          <span className="summary-value">{data.email}</span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Teléfono:</span>
          <span className="summary-value">{data.telefono}</span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Dirección:</span>
          <span className="summary-value">{data.direccion}</span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Ciudad:</span>
          <span className="summary-value">
            {data.ciudad} - CP: {data.codigoPostal}
          </span>
        </div>
      </div>

      {/* ============================================
          SECCIÓN: Preferencias de Entrenamiento
          ============================================ */}
      <div className="summary-section">
        <h3 style={{ 
          color: '#667eea', 
          marginBottom: '1rem',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
           Preferencias de Entrenamiento
        </h3>

        <div className="summary-item">
          <span className="summary-label">Objetivo principal:</span>
          <span className="summary-value">{formatGoal(data.objetivo)}</span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Entrenamientos de interés:</span>
          <span className="summary-value">
            {formatTrainings(data.entrenamientos)}
          </span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Días por semana:</span>
          <span className="summary-value">{data.diasSemana || 'No especificado'}</span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Horario preferido:</span>
          <span className="summary-value">{formatSchedule(data.horario)}</span>
        </div>
      </div>

      {/* ============================================
          MENSAJE FINAL
          ============================================ */}
      <div style={{
        backgroundColor: '#f0f9ff',
        border: '2px solid #3b82f6',
        borderRadius: '10px',
        padding: '1.5rem',
        marginTop: '1.5rem',
        textAlign: 'center'
      }}>
        <p style={{ 
          fontSize: '1.1rem', 
          fontWeight: 'bold', 
          color: '#1e40af',
          margin: '0 0 0.5rem 0'
        }}>
           ¡Bienvenido a FitLife!
        </p>
        <p style={{ 
          color: '#64748b', 
          fontSize: '0.95rem',
          margin: 0
        }}>
          Tu viaje hacia una vida más saludable está a punto de comenzar.
        </p>
      </div>
    </div>
  );
};

export default Summary;


/* ============================================
   📚 EXPLICACIÓN DE CONCEPTOS CLAVE
   ============================================

   1. COMPONENTE DE SOLO LECTURA:
   ------------------------------
   Este componente NO tiene campos de entrada, solo muestra información.
   Recibe todos los datos por props y los formatea para mostrar.
   
   Es útil para:
   - Confirmar datos antes de enviar
   - Mejorar la experiencia de usuario
   - Reducir errores en el registro


   2. FUNCIONES AUXILIARES (Helper Functions):
   ------------------------------------------
   Son funciones pequeñas que hacen tareas específicas:
   - formatDate(): Cambia formato de fecha
   - calculateAge(): Calcula edad
   - formatGoal(): Traduce valores a texto legible
   
   Beneficios:
   - Código más limpio y legible
   - Reutilizable en otros componentes
   - Fácil de testear


   3. DESESTRUCTURACIÓN DE STRINGS:
   --------------------------------
   const [year, month, day] = dateString.split('-');
   
   split('-') divide "2000-05-15" en ["2000", "05", "15"]
   Luego asignamos cada parte a una variable.
   
   Es una forma elegante de extraer partes de un string.


   4. OBJETOS COMO DICCIONARIOS:
   -----------------------------
   const goals = {
     'perder-peso': ' Perder peso',
     'ganar-musculo': ' Ganar músculo'
   };
   
   Usamos objetos para "traducir" valores técnicos a texto legible.
   goals[goal] busca la clave y devuelve el valor correspondiente.


   5. OPERADOR OR (||):
   -------------------
   return goals[goal] || 'No especificado';
   
   Si goals[goal] es undefined/null/false, devuelve 'No especificado'.
   Es un valor por defecto en caso de que no exista.


   6. MÉTODO MAP EN ARRAYS:
   ------------------------
   trainings.map(t => trainingNames[t])
   
   Transforma cada elemento del array.
   Ejemplo: ['cardio', 'yoga'] → [' Cardio', ' Yoga']


   7. MÉTODO JOIN:
   --------------
   array.join(', ')
   
   Une los elementos de un array en un string.
   Ejemplo: ['Cardio', 'Yoga'].join(', ') → "Cardio, Yoga"


   8. ESTILOS INLINE:
   -----------------
   style={{ color: '#667eea', fontSize: '1.2rem' }}
   
   Se usan cuando necesitamos estilos dinámicos o muy específicos.
   Los nombres de propiedades usan camelCase (fontSize, no font-size).


   9. LÓGICA DE FECHA:
   ------------------
   Para calcular la edad, restamos años y ajustamos si:
   - El mes actual es antes del mes de nacimiento, O
   - Estamos en el mes de nacimiento pero antes del día
   
   Esto evita contar un año de más si aún no ha cumplido años.


   10. VALIDACIÓN DE DATOS:
   -----------------------
   if (!dateString) return 'No especificado';
   
   Siempre verificamos que los datos existan antes de procesarlos.
   Esto evita errores si un campo está vacío o undefined.


   11. COMUNICACIÓN PADRE-HIJO:
   ----------------------------
   El componente padre (RegistrationForm) pasa los datos como props.
   El hijo (Summary) solo los recibe y los muestra.
   
   Flujo de datos:
   Padre (tiene los datos) → Props → Hijo (muestra los datos)
   
   Esto se llama "flujo unidireccional de datos" en React.

*/