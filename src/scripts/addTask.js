const { noTasks, tasksList } = createMainSection();

function addTask(titleInput, descriptionInput) {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title && description) {
        const taskId = Date.now(); 
        createTaskItem(taskId, title, description);
        saveTasksToLocalStorage(); 
        titleInput.value = ''; 
        descriptionInput.value = ''; 
        noTasks.style.display = 'none'; 
    } else {
        alert("Должны быть заполнены и название, и описание");
    }
}