"use strict";

let taskForDelete = null;

function createDeleteSection(taskDiv, deleteButton) {
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        taskForDelete = taskDiv;

        const deleteSectionDiv = document.createElement('div');
        deleteSectionDiv.classList.add('delete-section', 'background');

        const deleteWindow = document.createElement('div');
        deleteWindow.classList.add('delete-window');

        const confirmQuestion = document.createElement('p');
        confirmQuestion.textContent = 'Delete this task?';

        const yesButton = document.createElement('button');
        yesButton.textContent = 'Yes';

        const noButton = document.createElement('button');
        noButton.textContent = 'No';


        deleteWindow.appendChild(confirmQuestion);
        deleteWindow.appendChild(yesButton);
        deleteWindow.appendChild(noButton);
        deleteSectionDiv.appendChild(deleteWindow);
        document.body.appendChild(deleteSectionDiv);

        deleteSectionDiv.style.display = 'block';

        yesButton.addEventListener('click', () => {
            const taskId = taskDiv.getAttribute('id'); 
            deleteTaskFromLocalStorage(taskId); 
            tasksList.removeChild(taskDiv); 
        
            if (tasksList.children.length === 0) {
                noTasks.style.display = 'block'; 
            }
        
            deleteSectionDiv.style.display = 'none'; 
        });

        noButton.addEventListener('click', () => {
            deleteSectionDiv.style.display = 'none';
        });
    
        deleteSectionDiv.addEventListener('click', (event) => {
            if (!event.target.closest('.delete-window')) {
                deleteSectionDiv.style.display = 'none';
            }
        });
    });
}