function createDeleteSection(taskDiv, deleteButton) {
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        taskToDelete = taskDiv;
    
        const deleteSection = document.querySelector('.delete-section');
        deleteSection.style.display = 'block';
    
        document.querySelector('.no').addEventListener('click', () => {
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



function createShareSection(taskDiv) {
    const shareButton = taskDiv.querySelector('.share-button');
    
    shareButton.addEventListener('click', () => {
        const menuSection = document.querySelector('.share-section');
        menuSection.style.display = 'flex'; 

        document.querySelector('.share-section').addEventListener('click', (event) => {
            if (!event.target.closest('.menu')) {
                menuSection.style.display = 'none';
            }
        });
    });

    const copyButton = document.querySelector('.share-section .menu li img[src*="copy.svg"]');
    copyButton.addEventListener('click', () => {
        const taskTitle = taskDiv.querySelector('h3').textContent;
        const taskDescription = taskDiv.querySelector('p').textContent;
        const taskText = `${taskTitle}\n ${taskDescription}`;

        navigator.clipboard.writeText(taskText).then(() => {
            alert('Текст успешно скопирован');
        }).catch(err => {
            console.error('что-то пошло не так: ', err);
        });
    });
}