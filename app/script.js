// Основной функционал приложения остаётся прежним

// Вспомогательные переменные
let balance = parseInt(localStorage.getItem('balance')) || 0;
let remainingClicks = parseInt(localStorage.getItem('remaining-clicks')) || 10;

// Отображаем начальное значение баланса и оставшихся кликов
updateBalanceDisplay(balance);
updateRemainingClicks(remainingClicks);

// Параметр WebApp для обработки команд Telegram
if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // Проверяем, была ли вызвана команда "/start"
    if (tg.startParams.startsWith('start=')) {
        // Извлекаем start-параметры (необязательно)
        console.log('Start params:', tg.startParams);

        // Переходим на домашнюю секцию приложения
        location.hash = '#home';
    }
}

// Зарабатываем деньги
function earnMoney() {
    if (remainingClicks > 0) {
        balance++;
        remainingClicks--;
        updateBalanceDisplay(balance);
        updateRemainingClicks(remainingClicks);
        saveState(); // Сохраняем состояние в LocalStorage
    } else {
        alert('Сегодня лимит исчерпан!');
    }
}

// Механизм открытия кейса
function openCase() {
    const items = ['предмет низкого уровня', 'средний предмет', 'редкий предмет'];
    const probabilities = [0.7, 0.25, 0.05]; // Вероятности выпадения предметов
    const chosenIndex = weightedRandom(probabilities);
    const selectedItem = items[chosenIndex];
    alert(`Вы открыли кейс и нашли: ${selectedItem}`);
}

// Генерация взвешенной случайности
function weightedRandom(weights) {
    let sumWeights = weights.reduce((sum, weight) => sum + weight, 0);
    let randomValue = Math.random() * sumWeights;
    let cumulativeWeight = 0;
    for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i];
        if (randomValue <= cumulativeWeight) {
            return i;
        }
    }
    return weights.length - 1;
}

// Обновляем дисплей остатка кликов
function updateRemainingClicks(count) {
    document.getElementById('remaining-clicks').textContent = count.toString();
}

// Обновляем баланс пользователя
function updateBalanceDisplay(amount) {
    document.getElementById('current-balance').textContent = amount.toString();
}

// Сохраняем состояние пользователя
function saveState() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('remaining-clicks', remainingClicks);
}

// Ежедневный сброс кликов
window.onload = resetDailyClicksIfNeeded;

function resetDailyClicksIfNeeded() {
    const lastResetDateStr = localStorage.getItem('last-reset-date');
    const today = new Date().toLocaleDateString();
    if (!lastResetDateStr || lastResetDateStr !== today) {
        remainingClicks = 10;
        localStorage.setItem('remaining-clicks', remainingClicks);
        localStorage.setItem('last-reset-date', today);
    }
}

// Обработчик навигации по секции
window.addEventListener('hashchange', () => {
    const hash = location.hash.slice(1); // Удаляем символ "#"
    if (hash === 'home') {
        scrollToSection('#home');
    } else if (hash === 'shop') {
        scrollToSection('#shop');
    } else if (hash === 'cases') {
        scrollToSection('#cases');
    }
});

// Функция плавного скролла к разделу
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
