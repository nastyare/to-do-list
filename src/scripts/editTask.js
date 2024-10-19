function createEditSection(taskDiv, taskTitle, taskDescription) {
    const editSectionDiv = document.createElement('div');
    editSectionDiv.classList.add('edit-section', 'background');

    const editSection = document.createElement('div');
    editSection.classList.add('edit');

    const editElements = document.createElement('div');
    editElements.classList.add('edit-elements');

    const titleElement = document.createElement('input');
    titleElement.classList.add('title-element', 'edit-element');
    const descriptionElement = document.createElement('textarea');
    descriptionElement.classList.add('description-element', 'edit-element');

    editElements.appendChild(titleElement);
    editElements.appendChild(descriptionElement);

    const buttonElements = document.createElement('div');
    buttonElements.classList.add('buttons');

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel');
    cancelButton.textContent = 'Cancel';
    const saveButton = document.createElement('button');
    saveButton.classList.add('save');
    saveButton.textContent = 'Save';

    buttonElements.appendChild(cancelButton);
    buttonElements.appendChild(saveButton);

    editSection.appendChild(editElements);
    editSection.appendChild(buttonElements);
    editSectionDiv.appendChild(editSection);

    document.body.appendChild(editSectionDiv);

    const editButton = taskDiv.querySelector('.edit-button');
    
    editButton.addEventListener('click', () => {
        const editSection = document.querySelector('.edit-section');
        
        const currentTitle = taskTitle.textContent;
        const currentDescription = taskDiv.getAttribute('full-description'); 
    
        const editTitleInput = document.querySelector('.title-element');
        const editDescriptionInput = document.querySelector('.description-element');
    
        editTitleInput.value = currentTitle;
        editDescriptionInput.value = currentDescription; 
    
        editSection.style.display = 'block';
    
        const saveButton = document.querySelector('.save');
        saveButton.onclick = () => {
            taskTitle.textContent = editTitleInput.value;

            const newDescription = editDescriptionInput.value;
            taskDescription.textContent = newDescription.length > 80 ? newDescription.substring(0, 80) + '...' : newDescription;
            taskDiv.setAttribute('full-description', newDescription); 
    
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
}