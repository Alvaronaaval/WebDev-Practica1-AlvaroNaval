// TrainingPreferences.jsx
// Este componente maneja las preferencias de entrenamiento

import React, { useState } from 'react';
import '../styles/FitLife.css';

/**
 * PROPS QUE RECIBE:
 * - register: función de React Hook Form
 * - errors: objeto con errores
 * - watch: función para observar valores de campos (de React Hook Form)
 */
const TrainingPreferences = ({ register, errors, watch }) => {
  
  // ============================================
  // ESTADO LOCAL para checkboxes seleccionados
  // ============================================
  // useState nos permite guardar qué entrenamientos ha seleccionado
  const [selectedTrainings, setSelectedTrainings] = useState([]);
  
  // Observamos el valor del objetivo seleccionado
  // watch('objetivo') nos da el valor actual de ese campo
  const selectedGoal = watch('objetivo');

  // ============================================
  // LISTA DE ENTRENAMIENTOS DISPONIBLES
  // ============================================
  const trainingTypes = [
    { id: 'cardio', name: 'Cardio', description: 'Mejora tu resistencia' },
    { id: 'fuerza', name: 'Fuerza', description: 'Aumenta tu masa muscular' },
    { id: 'yoga', name: 'Yoga', description: 'Flexibilidad y relajación' },
    { id: 'crossfit', name: 'CrossFit', description: 'Entrenamiento intensivo' },
    { id: 'natacion', name: 'Natación', description: 'Ejercicio completo' },
    { id: 'spinning', name: 'Spinning', description: 'Ciclismo indoor' }
  ];

  // ============================================
  // FUNCIÓN: Manejar selección de entrenamientos
  // ============================================
  /**
   * Esta función se ejecuta cuando el usuario hace clic en un entrenamiento.
   * Añade o quita el entrenamiento del array de seleccionados.
   */
  const handleTrainingToggle = (trainingId) => {
    // Creamos una copia del array actual
    let updatedTrainings = [...selectedTrainings];
    
    // Verificamos si el entrenamiento ya está seleccionado
    if (updatedTrainings.includes(trainingId)) {
      // Si está, lo quitamos (filter crea un nuevo array sin ese elemento)
      updatedTrainings = updatedTrainings.filter(id => id !== trainingId);
    } else {
      // Si no está, lo añadimos
      updatedTrainings.push(trainingId);
    }
    
    // Actualizamos el estado con el nuevo array
    setSelectedTrainings(updatedTrainings);
  };

  return (
    <div className="form-section">
      {/* Título de la sección */}
      <h2 className="section-title">
         Preferencias de Entrenamiento
      </h2>

      {/* ============================================
          SECCIÓN: Objetivo Principal
          ============================================ */}
      <div className="form-group">
        <label className="form-label required">
          ¿Cuál es tu objetivo principal?
        </label>
        
        <div className="goal-options">
          {/* Opción: Perder Peso */}
          <label 
            className={`goal-option ${selectedGoal === 'perder-peso' ? 'selected' : ''}`}
          >
            <input
              type="radio"
              value="perder-peso"
              {...register('objetivo', {
                required: 'Debes seleccionar un objetivo'
              })}
            />
            <span className="goal-option-label">
               Perder peso y tonificar
            </span>
          </label>

          {/* Opción: Ganar Masa Muscular */}
          <label 
            className={`goal-option ${selectedGoal === 'ganar-musculo' ? 'selected' : ''}`}
          >
            <input
              type="radio"
              value="ganar-musculo"
              {...register('objetivo')}
            />
            <span className="goal-option-label">
               Ganar masa muscular
            </span>
          </label>

          {/* Opción: Mejorar Resistencia */}
          <label 
            className={`goal-option ${selectedGoal === 'resistencia' ? 'selected' : ''}`}
          >
            <input
              type="radio"
              value="resistencia"
              {...register('objetivo')}
            />
            <span className="goal-option-label">
              Mejorar resistencia
            </span>
          </label>

          {/* Opción: Mantenerse Activo */}
          <label 
            className={`goal-option ${selectedGoal === 'mantenerse-activo' ? 'selected' : ''}`}
          >
            <input
              type="radio"
              value="mantenerse-activo"
              {...register('objetivo')}
            />
            <span className="goal-option-label">
              Mantenerse activo y saludable
            </span>
          </label>
        </div>

        {/* Mostrar error si no selecciona objetivo */}
        {errors.objetivo && (
          <span className="error-message">
             {errors.objetivo.message}
          </span>
        )}
      </div>

      {/* ============================================
          RENDERIZADO CONDICIONAL
          Solo muestra esta sección si hay un objetivo seleccionado
          ============================================ */}
      {selectedGoal && (
        <>
          {/* Mensaje personalizado según el objetivo */}
          <div className="message-box" style={{
            backgroundColor: '#e8f5e9',
            border: '2px solid #4caf50',
            color: '#2e7d32',
            marginBottom: '1.5rem'
          }}>
            <span>💡</span>
            <span>
              {selectedGoal === 'perder-peso' && 'Te recomendamos combinar cardio con entrenamiento de fuerza'}
              {selectedGoal === 'ganar-musculo' && 'Te recomendamos enfocarte en entrenamiento de fuerza'}
              {selectedGoal === 'resistencia' && 'Te recomendamos actividades de cardio y natación'}
              {selectedGoal === 'mantenerse-activo' && 'Te recomendamos una rutina variada y equilibrada'}
            </span>
          </div>

          {/* ============================================
              SECCIÓN: Tipos de Entrenamiento
              ============================================ */}
          <div className="form-group">
            <label className="form-label">
              ¿Qué tipos de entrenamiento te interesan? (Selecciona uno o varios)
            </label>

            <div className="training-options">
              {/* Iteramos sobre el array de entrenamientos */}
              {trainingTypes.map(training => (
                <div
                  key={training.id}
                  className={`training-option ${
                    selectedTrainings.includes(training.id) ? 'selected' : ''
                  }`}
                  onClick={() => handleTrainingToggle(training.id)}
                >
                  <input
                    type="checkbox"
                    value={training.id}
                    checked={selectedTrainings.includes(training.id)}
                    {...register('entrenamientos')}
                    onChange={() => {}} // Evita warning de React
                  />
                  <div className="training-option-label">
                    <div style={{ fontWeight: 'bold' }}>{training.name}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                      {training.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mostrar cuántos ha seleccionado */}
            {selectedTrainings.length > 0 && (
              <div style={{ 
                marginTop: '1rem', 
                color: '#667eea', 
                fontWeight: 'bold' 
              }}>
                ✓ Has seleccionado {selectedTrainings.length} tipo(s) de entrenamiento
              </div>
            )}
          </div>
        </>
      )}

      {/* ============================================
          SECCIÓN: Disponibilidad
          ============================================ */}
      <div className="form-row">
        {/* Campo: Días por semana */}
        <div className="form-group">
          <label className="form-label required">
             ¿Cuántos días a la semana entrenarás?
          </label>
          <select
            className={`form-select ${errors.diasSemana ? 'error' : ''}`}
            {...register('diasSemana', {
              required: 'Debes seleccionar los días por semana'
            })}
          >
            <option value="">Selecciona...</option>
            <option value="1-2">1-2 días</option>
            <option value="3-4">3-4 días</option>
            <option value="5-6">5-6 días</option>
            <option value="7">Todos los días</option>
          </select>
          {errors.diasSemana && (
            <span className="error-message">
              ⚠️ {errors.diasSemana.message}
            </span>
          )}
        </div>

        {/* Campo: Horario preferido */}
        <div className="form-group">
          <label className="form-label required">
             Horario preferido
          </label>
          <select
            className={`form-select ${errors.horario ? 'error' : ''}`}
            {...register('horario', {
              required: 'Debes seleccionar un horario'
            })}
          >
            <option value="">Selecciona...</option>
            <option value="manana"> Mañana (6:00 - 12:00)</option>
            <option value="tarde"> Tarde (12:00 - 18:00)</option>
            <option value="noche"> Noche (18:00 - 23:00)</option>
          </select>
          {errors.horario && (
            <span className="error-message">
              ⚠️ {errors.horario.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingPreferences;


/* ============================================
   📚 EXPLICACIÓN DE CONCEPTOS CLAVE
   ============================================

   1. ESTADO LOCAL (useState):
   ---------------------------
   const [selectedTrainings, setSelectedTrainings] = useState([]);
   
   - selectedTrainings: variable que guarda los entrenamientos seleccionados
   - setSelectedTrainings: función para actualizar esa variable
   - useState([]): valor inicial es un array vacío
   
   Cada vez que llamamos a setSelectedTrainings, React re-renderiza
   el componente con el nuevo valor.


   2. WATCH (de React Hook Form):
   ------------------------------
   const selectedGoal = watch('objetivo');
   
   watch() nos permite "observar" el valor actual de un campo.
   Es útil para mostrar/ocultar secciones según otros campos.
   
   Ejemplo: Solo mostramos los entrenamientos si hay un objetivo seleccionado.


   3. RENDERIZADO CONDICIONAL:
   ---------------------------
   {selectedGoal && <div>...</div>}
   
   Si selectedGoal tiene valor, muestra el div.
   Si es null/undefined/false, no muestra nada.
   
   Es como decir: "Si hay objetivo seleccionado, entonces muestra esto"


   4. MANEJO DE ARRAYS EN ESTADO:
   ------------------------------
   let updatedTrainings = [...selectedTrainings];
   
   [...array] crea una COPIA del array.
   Es importante NO modificar directamente el estado en React.
   
   Incorrecto: selectedTrainings.push(item)
   Correcto: setSelectedTrainings([...selectedTrainings, item])


   5. MÉTODO FILTER:
   -----------------
   updatedTrainings.filter(id => id !== trainingId)
   
   filter() crea un nuevo array con los elementos que cumplen la condición.
   En este caso, todos EXCEPTO el trainingId que queremos quitar.
   
   Ejemplo:
   [1, 2, 3, 4].filter(num => num !== 3)  // Resultado: [1, 2, 4]


   6. MÉTODO MAP:
   --------------
   trainingTypes.map(training => <div>...</div>)
   
   map() recorre un array y transforma cada elemento.
   Aquí convertimos cada objeto training en un componente visual.
   
   Es la forma estándar en React de mostrar listas.


   7. MÉTODO INCLUDES:
   -------------------
   selectedTrainings.includes(training.id)
   
   Verifica si un valor existe en el array.
   Devuelve true o false.
   
   Ejemplo:
   ['cardio', 'yoga'].includes('cardio')  // true
   ['cardio', 'yoga'].includes('fuerza')  // false


   8. CLASES CSS DINÁMICAS:
   ------------------------
   className={`goal-option ${selectedGoal === 'perder-peso' ? 'selected' : ''}`}
   
   Usa template literals (` `) para combinar clases fijas y dinámicas.
   Si selectedGoal es 'perder-peso', añade la clase 'selected'.
   Esto hace que la opción se vea destacada.


   9. PROP KEY EN LISTAS:
   ----------------------
   {trainingTypes.map(training => (
     <div key={training.id}>...</div>
   ))}
   
   React necesita 'key' única para cada elemento de una lista.
   Ayuda a React a identificar qué elementos cambiaron.
   
   Debe ser un valor único y estable (como un ID).


   10. VENTAJAS DE COMPONENTES SEPARADOS:
   --------------------------------------
   - Código más organizado y legible
   - Fácil de testear cada componente por separado
   - Reutilizable en otros formularios
   - Más fácil de mantener y actualizar
   - Mejor rendimiento (React solo re-renderiza lo necesario)

*/