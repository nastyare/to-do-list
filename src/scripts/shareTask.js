"use strict";

function handleCopyButton(taskDiv, title) {
    const description = taskDiv.getAttribute('full-description'); 
    copyText(title, description); 
}

function createShareSection(taskDiv, title) {
    const shareSection = document.createElement('div');
    shareSection.classList.add('share-section', 'background');

    const menu = document.createElement('ul');
    menu.classList.add('menu');

    const images = [
        { src: '../../src/assets/images/sharing-images/copy.svg', alt: 'Copy', class: 'copy' },
        { src: '../../src/assets/images/sharing-images/telegram.svg', alt: 'Telegram', class: 'telegram' },
        { src: '../../src/assets/images/sharing-images/vk.svg', alt: 'VK', class: 'vk' },
        { src: '../../src/assets/images/sharing-images/whatsapp.svg', alt: 'WhatsApp', class: 'whatsapp' },
        { src: '../../src/assets/images/sharing-images/facebook.svg', alt: 'Facebook', class: 'facebook' }
    ];

    images.forEach(image => {
        const listItem = document.createElement('li');

        const img = document.createElement('img');
        img.className = image.class;
        img.src = image.src;
        img.alt = image.alt;

        listItem.appendChild(img);
        menu.appendChild(listItem);
    });

    shareSection.appendChild(menu);
    document.body.appendChild(shareSection);

    const shareButton = taskDiv.querySelector('.share-button');
    shareButton.addEventListener('click', () => {
        shareSection.style.display = 'flex';

        shareSection.addEventListener('click', (event) => {
            if (!event.target.closest('.menu')) {
                shareSection.style.display = 'none';
            }
        });
    });

    const copyButton = shareSection.querySelector('.copy');
    if (typeof copyButton.onclick !== "function") {
        copyButton.onclick = () => handleCopyButton(taskDiv, title);
    }
}

function copyText(title, description) {
    const taskTitle = title.textContent;
    const taskText = `${taskTitle} ` + `${description}`; 

    navigator.clipboard.writeText(taskText).then(() => {
        alert('Текст успешно скопирован');
    }).catch(err => {
        console.error('Что-то пошло не так: ', err);
    });
}