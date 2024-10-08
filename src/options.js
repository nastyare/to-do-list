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
        titleInput.value = ''; 
        descriptionInput.value = ''; 
        noTasksMessage.style.display = 'none'; 
    } else {
        alert("Please fill out both Title and Description!");
    }
}

addButton.addEventListener('click', addTask);


let taskToDelete = null;

function createTaskElement(title, description) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item'); 

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = description;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('close-button'); 

    deleteButton.addEventListener('click', () => {
        taskToDelete = taskDiv;
        document.querySelector('.delete-section').style.display = 'block'; 
    });

    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(deleteButton); 

    tasksList.appendChild(taskDiv);
}

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

