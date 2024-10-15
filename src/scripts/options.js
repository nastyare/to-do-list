const addButton = document.getElementsByClassName("add-button")[0];
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const noTasksMessage = document.getElementsByClassName('no-tasks')[0];
const tasksList = document.getElementsByClassName("tasks-list")[0];


// ДОБАВЛЕНИЕ ТАСКА
function addTask() {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title && description) {
        createTaskElement(title, description);
        saveTasksToLocalStorage(); 
        titleInput.value = ''; 
        descriptionInput.value = ''; 
        noTasksMessage.style.display = 'none'; 
    } else {
        alert("Please fill out both Title and Description!");
    }
}

addButton.addEventListener('click', addTask);

let taskToDelete = null;
let currentlyOpenedMenu = null;

// СОЗДАНИЕ ТАСКА
function createTaskElement(title, description) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item'); 
    const taskTitle = document.createElement('h3');
    taskTitle.textContent = title; 
    const taskDescription = document.createElement('p');
    taskDescription.textContent = description; 
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');

    // МЕНЮ
    const menuDiv = document.createElement('div');
    menuDiv.classList.add('task-menu'); 

    const shareButton = document.createElement('button');
    shareButton.classList.add('share-button');

    const infoButton = document.createElement('button');
    infoButton.classList.add('info-button');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');

    menuDiv.appendChild(shareButton);
    menuDiv.appendChild(infoButton);
    menuDiv.appendChild(editButton);

    menuDiv.style.display = 'none'; 
    taskDiv.appendChild(menuDiv);

    taskDiv.addEventListener('click', (event) => {
        event.stopPropagation(); 
        toggleTaskMenu(menuDiv, taskDiv);
    });

    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(deleteButton);

    document.querySelector('.tasks-list').appendChild(taskDiv);
    
    
    // УДАЛЕНИЕ
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        taskToDelete = taskDiv;
    
        const deleteSection = document.querySelector('.delete-section');
        deleteSection.style.display = 'block';
    
        document.querySelector('.no').addEventListener('click', (event) => {
            deleteSection.style.display = 'none';
        });
    
        document.querySelector('.yes').addEventListener('click', () => {
            deleteTaskFromLocalStorage(taskDiv);
            tasksList.removeChild(taskDiv); 
    
            if (tasksList.children.length === 0) {
                noTasksMessage.style.display = 'block'; 
            }
    
            deleteSection.style.display = 'none'; 
        });
    });


    // ПОДЕЛИТЬСЯ 
    shareButton.addEventListener('click', (event) => {
        const menuSection = document.querySelector('.share-section');
        menuSection.style.display = 'flex'; 

        document.querySelector('.share-section').addEventListener('click', (event) => {
            if (!event.target.closest('.menu')) {
                menuSection.style.display = 'none';
            }
        });
    });


    // РЕДАКТИРОВАНИЕ
    editButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const editSection = document.querySelector('.edit-section');
        
        const currentTitle = taskTitle.textContent;
        const currentDescription = taskDescription.textContent;
    
        const editTitleInput = document.querySelector('.edit #title');
        const editDescriptionInput = document.querySelector('.edit #description');
    
        editTitleInput.value = currentTitle;
        editDescriptionInput.value = currentDescription;
    
        editSection.style.display = 'flex';
    
        const saveButton = document.querySelector('.save');
        saveButton.onclick = () => {
            taskTitle.textContent = editTitleInput.value;
            taskDescription.textContent = editDescriptionInput.value;
    
            editSection.style.display = 'none';
    
            saveTasksToLocalStorage();
        };
        const cancelButton = document.querySelector('.cancel');
        cancelButton.onclick = () => {
            editSection.style.display = 'none';
        }
    
        editSection.addEventListener('click', (event) => {
            if (!event.target.closest('.edit')) {
                editSection.style.display = 'none';
            }
        });
    });
    
    

    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(deleteButton); 

    tasksList.appendChild(taskDiv);
}

function toggleTaskMenu(menuDiv, taskDiv) {
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

document.addEventListener('click', (event) => {
    if (currentlyOpenedMenu) {
        currentlyOpenedMenu.style.display = 'none';
        currentlyOpenedMenu.parentElement.classList.remove('expanded');
        currentlyOpenedMenu = null;
    }
});

function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.task-item');

    taskItems.forEach(task => {
        const title = task.querySelector('h3').textContent;
        const description = task.querySelector('p').textContent;
        tasks.push({ title, description });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        createTaskElement(task.title, task.description);
    });

    
    if (tasks.length > 0) {
        noTasksMessage.style.display = 'none';
    } else {
        noTasksMessage.style.display = 'block';
    }
}

function deleteTaskFromLocalStorage(taskDiv) {
    const title = taskDiv.querySelector('h3').textContent;
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.filter(task => task.title !== title);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    if (updatedTasks.length === 0) {
        noTasksMessage.style.display = 'block'; 
    }
}

window.onload = loadTasksFromLocalStorage;





