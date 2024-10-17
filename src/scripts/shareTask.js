function handleCopyButton (title, description) {
    copyText(title, description)
}

function createShareSection(taskDiv, title, description) {
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
    
    const copyButton = document.querySelector('.copy');
    if (typeof copyButton.onclick !== "function") {                              
        copyButton.onclick = () => handleCopyButton(title, description);            
    }
}

function copyText(title, description) {
    const taskTitle = title.textContent;
    const taskDescription = description.textContent;
    const taskText = `${taskTitle} ` + `${taskDescription}`;

    navigator.clipboard.writeText(taskText).then(() => {
        alert('Текст успешно скопирован');
    }).catch(err => {
        console.error('что-то пошло не так: ', err);
    });
}