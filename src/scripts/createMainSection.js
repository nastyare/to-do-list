function createMainSection() {
    const mainSection = document.createElement('div');
    mainSection.classList.add('main-section');

    const baseForm = document.createElement('div');
    baseForm.classList.add('base-form');

    const inputSection = document.createElement('div');
    inputSection.classList.add('input-section');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.classList.add('title', 'input-element');
    titleInput.placeholder = 'Title...';

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.classList.add('description', 'input-element');
    descriptionInput.placeholder = 'About...';

    inputSection.appendChild(titleInput);
    inputSection.appendChild(descriptionInput);

    const addButton = document.createElement('button');
    addButton.classList.add('add-button');

    baseForm.appendChild(inputSection);
    baseForm.appendChild(addButton);

    const noTasks = document.createElement('div');
    noTasks.classList.add('no-tasks');
    const noTasksText = document.createElement('p');
    noTasksText.textContent = 'No Tasks';
    noTasks.appendChild(noTasksText);

    const tasksList = document.createElement('ul');
    tasksList.classList.add('tasks-list');

    mainSection.appendChild(baseForm);
    mainSection.appendChild(noTasks);
    mainSection.appendChild(tasksList);

    document.body.appendChild(mainSection);

    addButton.addEventListener('click', () => 
        addTask(titleInput, descriptionInput)
    );

    return { noTasks, tasksList };
}
