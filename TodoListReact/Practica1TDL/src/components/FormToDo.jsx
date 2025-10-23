import { useState } from 'react';
import React from 'react';

// Componente FormToDo - Formulario para añadir nuevas tareas
function FormToDo({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim()) {
      const newTask = {
        id: Date.now(), // Generamos un id único usando timestamp
        text: input.trim(),
        completed: false
      };
      onSubmit(newTask);
      setInput(''); // Limpiamos el input después de añadir
    }
  };

  return (
    <div className='form-todo'>
      <input
        className='input-todo'
        type='text'
        placeholder="Escribe una tarea"
        name="text"
        value={input}
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e);
          }
        }}
      />
      <button className='button-todo' onClick={handleSubmit}>
        Añadir tarea
      </button>
    </div>
  );
}
export default FormToDo;