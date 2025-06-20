import { initializeApp, earnMoney, openCase } from './mein.js';

// Инициализировать приложение
initializeApp();

// Присваиваем обработчики событий элементам страницы
document.getElementById('money-button').addEventListener('click', earnMoney);
document.querySelectorAll('.case-item button').forEach(button => {
    button.addEventListener('click', openCase);
});

// Установка обработчиков для изменения хэш-тегов
window.addEventListener('hashchange', event => {
    switch (event.newURL.split('#')[1]) {
        case 'home':
            scrollToSection('#home');
            break;
        case 'shop':
            scrollToSection('#shop');
            break;
        case 'cases':
            scrollToSection('#cases');
            break;
    }
});

// Выполняем ежедневный сброс кликов при старте
resetDailyClicksIfNeeded();