const addButton = document.getElementsByClassName("add-button")[0];
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const noTasksMessage = document.getElementsByClassName('no-tasks')[0];
const tasksList = document.getElementsByClassName("tasks-list")[0];

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
let currentTask = null;

function createTaskElement(title, description) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item'); 

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = description;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('close-button');


    // УДАЛЕНИЕ
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); 
        taskToDelete = taskDiv;
        document.querySelector('.delete-section').style.display = 'block';
        deleteTaskFromLocalStorage(taskDiv);
    });


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

    taskDiv.addEventListener('click', () => {
        if (currentlyOpenedMenu && currentlyOpenedMenu !== menuDiv) {
            currentlyOpenedMenu.style.display = 'none'; 
        }
        menuDiv.style.display = menuDiv.style.display === 'none' ? 'block' : 'none';
        currentlyOpenedMenu = menuDiv.style.display === 'block' ? menuDiv : null;
    });


    // ПОДЕЛИТЬСЯ 
    shareButton.addEventListener('click', (event) => {
        const menuSection = document.querySelector('.menu-section');
        menuSection.style.display = 'flex'; 

        document.querySelector('.menu-section').addEventListener('click', (event) => {
            if (!event.target.closest('.menu')) {
                menuSection.style.display = 'none';
            }
        });
    });

    editButton.addEventListener('click', (event) => {
        const editSection = document.querySelector('.edit-section');
        const titleInput = document.getElementsByName(taskTitle);
        const descriptionInput = document.getElementsByName(taskDescription);
        titleInput.value = taskTitle.textContent;
        descriptionInput.value = taskDescription.textContent; 

        editSection.style.display = 'flex';


        const saveButton = document.querySelector('.confirm');
        saveButton.onclick = () => {
            taskTitle.textContent = titleInput.value;
            taskDescription.textContent = descriptionInput.value;
            editSection.style.display = 'none'; 
        };

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



document.querySelector('.delete-section').addEventListener('click', (event) => {
    if (event.target.classList.contains('confirm')) {
        if (taskToDelete) {
            tasksList.removeChild(taskToDelete); 
            taskToDelete = null;
        }
        document.querySelector('.delete-section').style.display = 'none'; 
    } else if (event.target.classList.contains('cancel')) {
        taskToDelete = null; 
        document.querySelector('.delete-section').style.display = 'none'; 
    }
});



