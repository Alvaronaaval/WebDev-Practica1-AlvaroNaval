import React, { useState } from 'react';
import FormToDo from './components/FormToDo';
import ToDoItem from './components/ToDoItem';
import Logo from './components/logo';
import './App.css';

// Componente principal App

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const updatedTasks = [task, ...tasks];
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const completeTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="app-container">
      <div className="todo-app-wrapper">
        <Logo />
        <h1 className="app-title">Mis Tareas</h1>
        
        <FormToDo onSubmit={addTask} />
        
        <div className='list-todo-container'>
          {tasks.length === 0 ? (
            <p className="empty-message">¡No hay tareas!</p>
          ) : (
            tasks.map((task) =>
              <ToDoItem
                key={task.id}
                id={task.id}
                text={task.text}
                completed={task.completed}
                deleteToDo={deleteTask}
                completeToDo={completeTask}
              />
            )
          )}
        </div>
        
        {tasks.length > 0 && (
          <div className="task-counter">
            <span className="counter-text">
              Total: {tasks.length} | Completadas: {tasks.filter(t => t.completed).length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
