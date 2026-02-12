// tracker.js - Логика страницы трекера для RehabPro

// Основная функция инициализации
function initTrackerPage() {
    console.log('Инициализация страницы трекера...');
    
    // Загружаем статистику
    loadStatistics();
    
    // Инициализируем дневник тренировок
    initWorkoutDiary();
    
    // Инициализируем график прогресса
    initProgressChart();
    
    // Загружаем достижения
    loadAchievements();
    
    console.log('Страница трекера инициализирована');
}

// Загрузка статистики
function loadStatistics() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        updateStatElements(0, 0, 0, 0);
        return;
    }
    
    const userDataKey = `user_${user.id}_data`;
    const userData = JSON.parse(localStorage.getItem(userDataKey));
    
    if (!userData || !userData.stats) {
        updateStatElements(0, 0, 0, 0);
        return;
    }
    
    const today = new Date().toDateString();
    const todayExercises = userData.completedExercises?.[today] || {};
    const todayCount = Object.values(todayExercises).reduce((sum, count) => sum + count, 0);
    
    updateStatElements(
        userData.stats.streak || 0,
        userData.stats.totalDays || 0,
        todayCount,
        userData.stats.totalExercises || 0
    );
}

// Обновление элементов статистики с правильным склонением
function updateStatElements(streak, totalDays, todayExercises, totalExercises) {
    const streakElement = document.getElementById('streak');
    const totalDaysElement = document.getElementById('total-days');
    const todayExercisesElement = document.getElementById('today-exercises');
    const totalExercisesElement = document.getElementById('total-exercises');
    
    // Функция для правильного склонения слова "упражнение"
    function getExerciseWord(count) {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return 'упражнений';
        }
        
        if (lastDigit === 1) {
            return 'упражнение';
        }
        
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'упражнения';
        }
        
        return 'упражнений';
    }
    
    // Функция для правильного склонения слова "день"
    function getDayWord(count) {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return 'дней';
        }
        
        if (lastDigit === 1) {
            return 'день';
        }
        
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'дня';
        }
        
        return 'дней';
    }
    
    // Обновляем элементы с компактным отображением
    if (streakElement) {
        streakElement.textContent = `${streak} ${getDayWord(streak)}`;
    }
    
    if (totalDaysElement) {
        totalDaysElement.textContent = `${totalDays} ${getDayWord(totalDays)}`;
    }
    
    if (todayExercisesElement) {
        todayExercisesElement.textContent = `${todayExercises} ${getExerciseWord(todayExercises)}`;
    }
    
    if (totalExercisesElement) {
        totalExercisesElement.textContent = `${totalExercises} ${getExerciseWord(totalExercises)}`;
    }
}

// Инициализация дневника тренировок
function initWorkoutDiary() {
    const addButton = document.getElementById('add-workout');
    if (addButton) {
        addButton.addEventListener('click', addWorkout);
    }
    
    // Загружаем историю тренировок
    loadWorkoutHistory();
}

// Добавление тренировки
function addWorkout() {
    const date = document.getElementById('workout-date').value;
    const time = document.getElementById('workout-time').value;
    const type = document.getElementById('workout-type').value.trim();
    const description = document.getElementById('workout-description').value.trim();
    
    // Валидация
    if (!date || !time || !type) {
        alert('Пожалуйста, заполните обязательные поля: дата, время и тип тренировки');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        alert('Пожалуйста, войдите в аккаунт для сохранения тренировок');
        return;
    }
    
    // Создаем объект тренировки
    const workout = {
        id: Date.now(),
        date: date,
        time: time,
        type: type,
        description: description,
        createdAt: new Date().toISOString(),
        datetime: `${date}T${time}`
    };
    
    // Сохраняем тренировку
    saveWorkout(user.id, workout);
    
    // Очищаем форму
    document.getElementById('workout-type').value = '';
    document.getElementById('workout-description').value = '';
    
    // Обновляем список тренировок
    loadWorkoutHistory();
    
    // Обновляем статистику
    loadStatistics();
    
    // Показываем уведомление
    showNotification('Тренировка добавлена в дневник!');
}

// Сохранение тренировки
function saveWorkout(userId, workout) {
    const userDataKey = `user_${userId}_data`;
    let userData = JSON.parse(localStorage.getItem(userDataKey)) || {
        stats: {},
        workouts: [],
        completedExercises: {},
        achievements: []
    };
    
    // Инициализируем массив тренировок, если его нет
    if (!userData.workouts) {
        userData.workouts = [];
    }
    
    // Добавляем тренировку
    userData.workouts.push(workout);
    
    // Сортируем по дате (новые сверху)
    userData.workouts.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    
    // Сохраняем
    localStorage.setItem(userDataKey, JSON.stringify(userData));
}

// Загрузка истории тренировок
function loadWorkoutHistory() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const workoutList = document.getElementById('workout-list');
    
    if (!workoutList) return;
    
    if (!user) {
        workoutList.innerHTML = `
            <p class="empty-message">
                <i class="fas fa-user-lock"></i>
                Войдите в аккаунт, чтобы видеть историю тренировок
            </p>
        `;
        return;
    }
    
    const userDataKey = `user_${user.id}_data`;
    const userData = JSON.parse(localStorage.getItem(userDataKey));
    
    if (!userData || !userData.workouts || userData.workouts.length === 0) {
        workoutList.innerHTML = `
            <p class="empty-message">
                <i class="fas fa-book"></i>
                Нет записей о тренировках. Добавьте первую!
            </p>
        `;
        return;
    }
    
    // Отображаем последние 10 тренировок
    const recentWorkouts = userData.workouts.slice(0, 10);
    
    workoutList.innerHTML = recentWorkouts.map(workout => `
        <div class="workout-item">
            <div class="workout-header">
                <div class="workout-date">
                    <i class="fas fa-calendar"></i>
                    ${formatDate(workout.date)} в ${workout.time}
                </div>
                <div class="workout-type">${workout.type}</div>
            </div>
            ${workout.description ? `<div class="workout-description">${workout.description}</div>` : ''}
        </div>
    `).join('');
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Инициализация графика прогресса
function initProgressChart() {
    const ctx = document.getElementById('progressChart');
    
    if (!ctx) return;
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        // Показываем пустой график, если пользователь не авторизован
        showEmptyChart(ctx);
        return;
    }
    
    // Получаем данные для графика
    const chartData = getChartData(user.id);
    
    // Создаем график
    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Упражнений: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Количество упражнений'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Дни'
                    }
                }
            }
        }
    });
}

// Получение данных для графика
function getChartData(userId) {
    const userDataKey = `user_${userId}_data`;
    const userData = JSON.parse(localStorage.getItem(userDataKey));
    
    if (!userData || !userData.completedExercises) {
        return getEmptyChartData();
    }
    
    // Получаем данные за последние 7 дней
    const dates = [];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toDateString();
        
        // Форматируем дату для отображения
        const label = date.toLocaleDateString('ru-RU', { weekday: 'short' });
        dates.push(label);
        
        // Считаем упражнения за этот день
        const dayExercises = userData.completedExercises[dateString] || {};
        const dayCount = Object.values(dayExercises).reduce((sum, count) => sum + count, 0);
        data.push(dayCount);
    }
    
    return {
        labels: dates,
        datasets: [{
            label: 'Упражнений выполнено',
            data: data,
            backgroundColor: '#4CAF50',
            borderColor: '#388E3C',
            borderWidth: 1,
            borderRadius: 5
        }]
    };
}

// Пустые данные для графика
function getEmptyChartData() {
    const dates = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString('ru-RU', { weekday: 'short' }));
    }
    
    return {
        labels: dates,
        datasets: [{
            label: 'Упражнений выполнено',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: '#E0E0E0',
            borderColor: '#BDBDBD',
            borderWidth: 1
        }]
    };
}

// Отображение пустого графика
function showEmptyChart(ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: getEmptyChartData(),
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Загрузка достижений
function loadAchievements() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        // Если пользователь не авторизован, все достижения заблокированы
        return;
    }
    
    const userDataKey = `user_${user.id}_data`;
    const userData = JSON.parse(localStorage.getItem(userDataKey));
    
    if (!userData) {
        return;
    }
    
    // Проверяем достижения
    const achievements = checkAchievements(userData);
    
    // Обновляем отображение
    updateAchievementsDisplay(achievements);
}

// Проверка достижений
function checkAchievements(userData) {
    const achievements = {
        'first-day': false,
        'three-days': false,
        'week-streak': false,
        'month-streak': false
    };
    
    // Первый день - если есть хотя бы одно упражнение
    if (userData.stats.totalExercises > 0) {
        achievements['first-day'] = true;
    }
    
    // 3 дня подряд
    if (userData.stats.streak >= 3) {
        achievements['three-days'] = true;
    }
    
    // Неделя подряд
    if (userData.stats.streak >= 7) {
        achievements['week-streak'] = true;
    }
    
    // Месяц занятий (не обязательно подряд)
    if (userData.stats.totalDays >= 30) {
        achievements['month-streak'] = true;
    }
    
    return achievements;
}

// Обновление отображения достижений
function updateAchievementsDisplay(achievements) {
    Object.keys(achievements).forEach(achievementId => {
        const element = document.getElementById(achievementId);
        if (element) {
            if (achievements[achievementId]) {
                element.classList.add('unlocked');
            }
        }
    });
}

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, запуск инициализации трекера...');
    
    // Проверяем, находимся ли мы на странице трекера
    if (document.getElementById('add-workout')) {
        initTrackerPage();
    }
});

// Функция для принудительного обновления статистики

function refreshStatistics() {
    console.log('Обновление статистики...');
    loadStatistics();
    loadAchievements();
    
    // Пересоздаём график
    const canvas = document.getElementById('progressChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        // Уничтожаем старый график, если есть
        if (window.existingChart) {
            window.existingChart.destroy();
        }
        initProgressChart();
    }
}

// Делаем функции доступными глобально
window.rehabProTracker = {
    initTrackerPage,
    loadStatistics,
    addWorkout,
    loadWorkoutHistory,
    refreshStatistics
};