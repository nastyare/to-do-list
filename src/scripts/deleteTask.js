
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
            const taskId = taskDiv.getAttribute('id'); 
            deleteTaskFromLocalStorage(taskId); 
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

