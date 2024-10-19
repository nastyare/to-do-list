function createTaskItem(id, title, description) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');   
    taskDiv.setAttribute('id', id);  

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = title; 

    const taskDescription = document.createElement('p');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');


    taskDiv.setAttribute('full-description', description);
    if (description.length > 80) {
        taskDescription.textContent = description.substring(0, 80) + '...';
    } else {
        taskDescription.textContent = description;
    }
    
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(deleteButton);

    // Меню таска
    const menuDiv = createTaskMenu(taskDiv);   
    document.querySelector('.tasks-list').appendChild(taskDiv);
    taskDiv.appendChild(menuDiv);

    createDeleteSection(taskDiv, deleteButton);
    createEditSection(taskDiv, taskTitle, taskDescription);
    createShareSection(taskDiv, taskTitle);
}