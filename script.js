const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyMsg = document.getElementById('emptyMsg');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks()

// Add task
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();

    if (text === "") {
        Swal.fire("Please enter a task!");
        return false;
    }

    // Unique ID for Task
    // Task values
    // Task State
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();
    taskInput.value = '';
});

// Save Task
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render all tasks
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        emptyMsg.style.display = 'block';
    }
    emptyMsg.style.display = 'none';

    tasks.forEach(item => {
        const li = document.createElement('li');

        if (item.completed) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = item.text;

        const taskControls = document.createElement('div');
        taskControls.classList.add('task-controls');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = item.completed ? 'Undo' : 'Done';
        completeBtn.onclick = () => toggleComplete(item.id);

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(item.id);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(item.id);

        taskControls.append(completeBtn, editBtn, deleteBtn);
        li.append(span, taskControls);
        taskList.append(li);

    });
}


// Complete Task
function toggleComplete(id) {
    tasks = tasks.map(item => {
        if (item.id === id) {
            item.completed = !item.completed;
        }
        return item;
    });
    saveTasks();
    renderTasks()
}

// Edit Task
function editTask(id) {
    const task = tasks.find(item => item.id === id);
    const newTask = prompt('Enter a new task', task.text);
    if (newTask !== null && newTask !== '') {
        task.text = newTask;
        saveTasks();
        renderTasks();
    }
}


// Delete Task
function deleteTask(id) {
    if( confirm('Are you sure?')) {
        tasks = tasks.filter(item => item.id !== id);
        saveTasks();
        renderTasks();
    }
}
