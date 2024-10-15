function createDeleteSection(taskDiv, deleteButton) {
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

        document.querySelector('.delete-section').addEventListener('click', (event) => {
            if (!event.target.closest('.delete-window')) {
                deleteSection.style.display = 'none';
            }
        });
    });
}

function createEditSection(taskDiv, taskTitle, taskDescription) {
    const editButton = taskDiv.querySelector('.edit-button');
    
    editButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const editSection = document.querySelector('.edit-section');
        
        const currentTitle = taskTitle.textContent;
        const currentDescription = taskDescription.textContent;
    
        const editTitleInput = document.querySelector('.title-element');
        const editDescriptionInput = document.querySelector('.description-element');
    
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
}

function createShareSection(taskDiv) {
    const shareButton = taskDiv.querySelector('.share-button');
    
    shareButton.addEventListener('click', (event) => {
        const menuSection = document.querySelector('.share-section');
        menuSection.style.display = 'flex'; 

        document.querySelector('.share-section').addEventListener('click', (event) => {
            if (!event.target.closest('.menu')) {
                menuSection.style.display = 'none';
            }
        });
    });
}