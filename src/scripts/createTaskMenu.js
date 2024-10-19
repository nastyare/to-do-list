function createTaskMenu(taskDiv) {
    const menuDiv = document.createElement('div');
    menuDiv.classList.add('task-menu'); 

    const shareButton = document.createElement('button');
    shareButton.classList.add('share-button');

    const infoButton = document.createElement('button');
    infoButton.classList.add('info-button');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');

    menuDiv.style.display = 'none'; 

    taskDiv.addEventListener('click', (event) => {
        event.stopPropagation(); 
        taskMenu(menuDiv, taskDiv);
    });

    menuDiv.appendChild(shareButton);
    menuDiv.appendChild(infoButton);
    menuDiv.appendChild(editButton);

    return menuDiv;
}

let currentlyOpenedMenu = null;

function taskMenu(menuDiv, taskDiv) {
    if (currentlyOpenedMenu && currentlyOpenedMenu !== menuDiv) {
        currentlyOpenedMenu.style.display = 'none';
        currentlyOpenedMenu.parentElement.classList.remove('expanded');
    }

    if (menuDiv.style.display === 'none') {
        menuDiv.style.display = 'flex'; 
        taskDiv.classList.add('expanded'); 
        currentlyOpenedMenu = menuDiv; 
    } else {
        menuDiv.style.display = 'none'; 
        taskDiv.classList.remove('expanded'); 
        currentlyOpenedMenu = null; 
    }
}

document.addEventListener('click', () => {
    if (currentlyOpenedMenu) {
        currentlyOpenedMenu.style.display = 'none';
        currentlyOpenedMenu.parentElement.classList.remove('expanded');
        currentlyOpenedMenu = null;
    }
});