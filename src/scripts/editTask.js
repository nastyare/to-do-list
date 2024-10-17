function createEditSection(taskDiv, taskTitle, taskDescription) {
    const editButton = taskDiv.querySelector('.edit-button');
    
    editButton.addEventListener('click', () => {
        const editSection = document.querySelector('.edit-section');
        
        const currentTitle = taskTitle.textContent;
        const currentDescription = taskDiv.getAttribute('data-full-description'); 
    
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
            taskDiv.setAttribute('data-full-description', newDescription); 
    
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