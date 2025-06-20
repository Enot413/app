// Mein.js — вспомогательная библиотека с логикой приложения

export function initializeApp() {
    // Инициализация состояния приложения
    const balance = parseInt(localStorage.getItem('balance')) || 0;
    const remainingClicks = parseInt(localStorage.getItem('remaining-clicks')) || 10;

    updateBalanceDisplay(balance);
    updateRemainingClicks(remainingClicks);

    // Проверка параметров Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        if (tg.startParams.startsWith('start=')) {
            console.log('Start params:', tg.startParams);
            location.hash = '#home'; // Переход на главную секцию
        }
    }
}

// Зарабатывание денег
export function earnMoney() {
    if (remainingClicks > 0) {
        incrementBalance();
        decrementRemainingClicks();
        saveState();
    } else {
        alert('Сегодня лимит исчерпан!');
    }
}

// Обновление дисплея остатков кликов
export function updateRemainingClicks(count) {
    document.getElementById('remaining-clicks').textContent = count.toString();
}

// Обновление баланса пользователя
export function updateBalanceDisplay(amount) {
    document.getElementById('current-balance').textContent = amount.toString();
}

// Открытие кейса
export function openCase() {
    const items = ['Предмет низкого уровня', 'Средний предмет', 'Редкий предмет'];
    const probabilities = [0.7, 0.25, 0.05]; // Вероятности выпадения предметов
    const chosenIndex = weightedRandom(probabilities);
    const selectedItem = items[chosenIndex];
    alert(`Вы открыли кейс и нашли: ${selectedItem}`);
}

// Генерация взвешенного рандома
export function weightedRandom(weights) {
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

// Изменение текущего баланса
export function incrementBalance() {
    const currentBalance = parseInt(document.getElementById('current-balance').textContent) || 0;
    const updatedBalance = currentBalance + 1;
    updateBalanceDisplay(updatedBalance);
}

// Уменьшение числа кликов
export function decrementRemainingClicks() {
    const currentClicks = parseInt(document.getElementById('remaining-clicks').textContent) || 0;
    const updatedClicks = currentClicks - 1;
    updateRemainingClicks(updatedClicks);
}

// Сохранение состояния
export function saveState() {
    const balance = parseInt(document.getElementById('current-balance').textContent) || 0;
    const remainingClicks = parseInt(document.getElementById('remaining-clicks').textContent) || 0;
    localStorage.setItem('balance', balance);
    localStorage.setItem('remaining-clicks', remainingClicks);
}

// Ежедневный сброс кликов
export function resetDailyClicksIfNeeded() {
    const lastResetDateStr = localStorage.getItem('last-reset-date');
    const today = new Date().toLocaleDateString();
    if (!lastResetDateStr || lastResetDateStr !== today) {
        updateRemainingClicks(10);
        localStorage.setItem('remaining-clicks', 10);
        localStorage.setItem('last-reset-date', today);
    }
}

// Навигация по секциям
export function navigateTo(sectionHash) {
    location.hash = '#' + sectionHash;
}

// Плавный скроллинг
export function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Экспорт всех необходимых методов
export {initializeApp, earnMoney, openCase};