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

function createTaskElement(title, description) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item'); 

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = description;

    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDescription);

    tasksList.appendChild(taskDiv);
}
