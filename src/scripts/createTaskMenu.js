"use strict";

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

let openedMenu = null;

function taskMenu(menuDiv, taskDiv) {
    if (openedMenu && openedMenu !== menuDiv) {
        openedMenu.style.display = 'none';
        openedMenu.parentElement.classList.remove('expanded');
    }

    if (menuDiv.style.display === 'none') {
        menuDiv.style.display = 'flex'; 
        taskDiv.classList.add('expanded'); 
        openedMenu = menuDiv; 
    } else {
        menuDiv.style.display = 'none'; 
        taskDiv.classList.remove('expanded'); 
        openedMenu = null; 
    }
}

document.addEventListener('click', () => {
    if (openedMenu) {
        openedMenu.style.display = 'none';
        openedMenu.parentElement.classList.remove('expanded');
        openedMenu = null;
    }
});