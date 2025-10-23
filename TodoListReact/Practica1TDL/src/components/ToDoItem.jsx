import { useState } from 'react';
import React from 'react';


// Componente ToDoItem - Representa cada tarea individual
function ToDoItem({ id, text, completed, completeToDo, deleteToDo }) {
  return (
    <div className={completed ? "todo-container completed" : "todo-container"}>
      <div
        className="todo-text"
        onClick={() => completeToDo(id)}>
        {text}
      </div>
      <button
        className="todo-delete-btn"
        onClick={() => deleteToDo(id)}>
        ✕
      </button>
    </div>
  );
}
export default ToDoItem;