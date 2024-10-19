function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.task-item');

    taskItems.forEach(task => {
        const id = task.getAttribute('id');
        const title = task.querySelector('h3').textContent;
        const description = task.querySelector('p').textContent;
        tasks.push({ id, title, description }); 
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const id = taskId;
    const updatedTasks = tasks.filter(task => task.id !== id); 
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    if (tasks.length === 0) {
        noTasks.style.display = 'block'; 
    }
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        createTaskItem(task.id, task.title, task.description); 
    });

    if (tasks.length > 0) {
        noTasks.style.display = 'none';
    } else {
        noTasks.style.display = 'block';
    }
}

window.onload = loadTasksFromLocalStorage;


