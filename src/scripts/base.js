const addButton = document.querySelector(".add-button");
const titleInput = document.querySelector(".title");
const descriptionInput = document.querySelector(".description");
const noTasksMessage = document.querySelector('.no-tasks');
const tasksList = document.querySelector(".tasks-list");


// ДОБАВЛЕНИЕ ТАСКА
function addTask() {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title && description) {
        const taskId = Date.now(); // Генерация уникального идентификатора
        createTaskElement(taskId, title, description);
        saveTasksToLocalStorage(); 
        titleInput.value = ''; 
        descriptionInput.value = ''; 
        noTasksMessage.style.display = 'none'; 
    } else {
        alert("Должны быть заполнены и название, и описание");
    }
}
addButton.addEventListener('click', addTask);

let taskToDelete = null;
let currentlyOpenedMenu = null;

// СОЗДАНИЕ ТАСКА
function createTaskElement(id, title, description) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');   
    taskDiv.setAttribute('id', id);  

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = title; 

    const taskDescription = document.createElement('p');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');


    taskDiv.setAttribute('data-full-description', description);
    if (description.length > 80) {
        taskDescription.textContent = description.substring(0, 80) + '...';
    } else {
        taskDescription.textContent = description;
    }
    

    // Меню
    const menuDiv = document.createElement('div');
    menuDiv.classList.add('task-menu'); 

    const shareButton = document.createElement('button');
    shareButton.classList.add('share-button');

    const infoButton = document.createElement('button');
    infoButton.classList.add('info-button');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');

    
    menuDiv.style.display = 'none'; 
    
    taskDiv.addEventListener('click', (event) => {
        event.stopPropagation(); 
        taskMenu(menuDiv, taskDiv);
    });
       
    document.querySelector('.tasks-list').appendChild(taskDiv);

    menuDiv.appendChild(shareButton);
    menuDiv.appendChild(infoButton);
    menuDiv.appendChild(editButton);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(deleteButton);
    taskDiv.appendChild(menuDiv);

    createDeleteSection(taskDiv, deleteButton);
    createEditSection(taskDiv, taskTitle, taskDescription);
    createShareSection(taskDiv, taskTitle, taskDescription);
}

function taskMenu(menuDiv, taskDiv) {
    if (currentlyOpenedMenu && currentlyOpenedMenu !== menuDiv) {
        currentlyOpenedMenu.style.display = 'none';
        currentlyOpenedMenu.parentElement.classList.remove('expanded');
    }

    if (menuDiv.style.display === 'none') {
        menuDiv.style.display = 'flex'; 
        taskDiv.classList.add('expanded'); 
        currentlyOpenedMenu = menuDiv; 
    } else {
        menuDiv.style.display = 'none'; 
        taskDiv.classList.remove('expanded'); 
        currentlyOpenedMenu = null; 
    }
}

document.addEventListener('click', () => {
    if (currentlyOpenedMenu) {
        currentlyOpenedMenu.style.display = 'none';
        currentlyOpenedMenu.parentElement.classList.remove('expanded');
        currentlyOpenedMenu = null;
    }
});


// РАБОТА С LOCAL STORAGE
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

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        createTaskElement(task.id, task.title, task.description); 
    });

    if (tasks.length > 0) {
        noTasksMessage.style.display = 'none';
    } else {
        noTasksMessage.style.display = 'block';
    }
}

function deleteTaskFromLocalStorage(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const id = taskId;
    const updatedTasks = tasks.filter(task => task.id !== id); 
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    if (tasks.length === 0) {
        noTasksMessage.style.display = 'block'; 
    }
}


window.onload = loadTasksFromLocalStorage;

