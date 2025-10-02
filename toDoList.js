// Get elements from the DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const downloadBtn = document.getElementById('download-btn');

// Add event listener for form submission
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload
    
    const taskText = taskInput.value.trim();
    
    // Check if input is not empty
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create the task
    addTask(taskText);
    
    // Clear input field
    taskInput.value = '';
    taskInput.focus();
});

// Function to add a task
function addTask(taskText) {
    // Create list item
    const li = document.createElement('li');
    li.className = 'task-item';
    
    // Create task text span
    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = 'task-text';
    
    // Create cross-out button
    const crossBtn = document.createElement('button');
    crossBtn.textContent = 'Cross-out';
    crossBtn.className = 'cross-btn';
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    
    // Add click event to cross-out button
    crossBtn.addEventListener('click', function() {
        span.classList.toggle('crossed-out');
    });
    
    // Add click event to delete button
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });
    
    // Append elements to list item
    li.appendChild(span);
    li.appendChild(crossBtn);
    li.appendChild(deleteBtn);
    
    // Append list item to task list
    taskList.appendChild(li);
}

// Function to download tasks from API
async function downloadTasks() {
    try {
        // Show loading message
        downloadBtn.textContent = 'Cargando...';
        downloadBtn.disabled = true;
        
        // Fetch tasks from API
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todos = await response.json();
        
        // Get first 10 tasks and extract only titles using map
        const firstTenTitles = todos.slice(0, 10).map(todo => todo.title);
        
        // Clear current list
        taskList.innerHTML = '';
        
        // Add each task to the list
        firstTenTitles.forEach(title => {
            addTask(title);
        });
        
        // Reset button
        downloadBtn.textContent = 'Descargar';
        downloadBtn.disabled = false;
        
    } catch (error) {
        console.error('Error al descargar tareas:', error);
        alert('Error al descargar las tareas. Por favor, intenta de nuevo.');
        downloadBtn.textContent = 'Descargar';
        downloadBtn.disabled = false;
    }
}

// Add event listener for download button
downloadBtn.addEventListener('click', downloadTasks);