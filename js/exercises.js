// exercises.js - Логика страницы упражнений для RehabPro

// Основные переменные
let currentExercises = [];

// Основная функция инициализации
function initExercisesPage() {
    console.log('Инициализация страницы упражнений...');
    
    // Проверяем, загружена ли база данных
    if (typeof exercisesDatabase === 'undefined') {
        showError('База данных упражнений не загружена! Пожалуйста, обновите страницу.');
        return;
    }
    
    console.log('База данных загружена, упражнений:', exercisesDatabase.length);
    
    // Инициализация поиска
    const searchInput = document.getElementById('exercise-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            setTimeout(filterExercises, 100);
        });
    }
    
    // Инициализация фильтров
    const injuryFilter = document.getElementById('injury-type');
    const difficultyFilter = document.getElementById('difficulty');
    const resetButton = document.getElementById('reset-filters');
    
    if (injuryFilter) {
        injuryFilter.addEventListener('change', filterExercises);
    }
    
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', filterExercises);
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
    
    // Загружаем упражнения
    loadAllExercises();
    
    // Обновляем счетчик выполненных упражнений
    updateDailyCounter();
    
    // Сбрасываем счетчики, если день сменился
    checkAndResetDailyCounters();
    
    console.log('Страница упражнений инициализирована');
}

// Загрузка всех упражнений
function loadAllExercises() {
    console.log('Загрузка всех упражнений...');
    currentExercises = [...exercisesDatabase];
    displayExercises(currentExercises);
}

// Отображение упражнений
function displayExercises(exercises) {
    const container = document.getElementById('exercises-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!exercises || exercises.length === 0) {
        container.innerHTML = `
            <div class="empty-message" style="grid-column: 1/-1">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px;"></i>
                <h3>Упражнения не найдены</h3>
                <p>Попробуйте изменить параметры поиска или фильтры</p>
            </div>
        `;
        return;
    }
    
    exercises.forEach(exercise => {
        const exerciseCard = createExerciseCard(exercise);
        container.appendChild(exerciseCard);
    });
    
    updateSearchInfo(exercises.length);
    
    // Инициализируем обработчики видео после отображения карточек
    setTimeout(initVideoHandlers, 100);
}

// Создание карточки упражнения
function createExerciseCard(exercise) {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.dataset.id = exercise.id;
    card.dataset.injury = exercise.injuryType;
    card.dataset.difficulty = exercise.difficulty;
    
    const completedToday = getCompletedTodayCount(exercise.id);
    
    const difficultyText = {
        'beginner': 'Лёгкий',
        'intermediate': 'Средний',
        'advanced': 'Тяжёлый'
    };
    
    const injuryText = {
        'knee': 'Коленный сустав',
        'shoulder': 'Плечевой сустав',
        'back': 'Спина',
        'ankle': 'Голеностоп',
        'wrist': 'Запястье',
        'neck': 'Шея'
    };
    
    card.innerHTML = `
        <div class="exercise-header">
            <h3>
                ${escapeHtml(exercise.name)}
                <span class="difficulty-badge ${exercise.difficulty}">
                    ${difficultyText[exercise.difficulty] || exercise.difficulty}
                </span>
            </h3>
        </div>
        <div class="exercise-body">
            <div class="exercise-meta">
                <span><i class="fas fa-bone"></i> ${injuryText[exercise.injuryType] || exercise.injuryType}</span>
                <span><i class="fas fa-clock"></i> ${exercise.duration}</span>
            </div>
            
            <p class="exercise-description">${escapeHtml(exercise.description)}</p>
            
            <div class="exercise-video">
                <video controls preload="metadata" data-video-id="${exercise.id}">
                    <source src="videos/${exercise.videoUrl}.mp4" type="video/mp4">
                    Ваш браузер не поддерживает видео тег.
                </video>
            </div>
            
            <div class="exercise-warning">
                <h4><i class="fas fa-exclamation-triangle"></i> Предупреждение</h4>
                <p>${escapeHtml(exercise.warning)}</p>
            </div>
            
            <div class="exercise-tips">
                <p><strong><i class="fas fa-lightbulb"></i> Совет:</strong> ${escapeHtml(exercise.tips)}</p>
                <p><strong><i class="fas fa-dumbbell"></i> Мышцы:</strong> ${escapeHtml(exercise.muscleGroup)}</p>
                <p><strong><i class="fas fa-tools"></i> Оборудование:</strong> ${escapeHtml(exercise.equipment)}</p>
            </div>
            
            <div class="exercise-actions">
                <button class="btn-primary complete-btn" 
                        ${completedToday >= 3 ? 'disabled' : ''}
                        data-id="${exercise.id}">
                    <i class="fas fa-check-circle"></i> 
                    ${completedToday >= 3 ? 'Выполнено (3/3)' : `Выполнено (${completedToday}/3)`}
                </button>
                <span class="completed-count">
                    <i class="fas fa-calendar-check"></i> Выполнено сегодня: ${completedToday}/3
                </span>
            </div>
        </div>
    `;
    
    const completeBtn = card.querySelector('.complete-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', () => markExerciseAsCompleted(exercise.id, completeBtn));
    }
    
    return card;
}

// Функция для экранирования HTML (безопасность)
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Получение количества выполненных упражнений за сегодня
function getCompletedTodayCount(exerciseId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        return 0;
    }
    
    const userData = JSON.parse(localStorage.getItem(`user_${user.id}_data`));
    if (!userData || !userData.completedExercises) {
        return 0;
    }
    
    const today = new Date().toDateString();
    const todayExercises = userData.completedExercises[today] || {};
    
    return todayExercises[exerciseId] || 0;
}

// Отметка упражнения как выполненного
function markExerciseAsCompleted(exerciseId, buttonElement) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        alert('Пожалуйста, войдите в аккаунт для отслеживания прогресса');
        window.location.href = 'login.html';
        return;
    }
    
    const userDataKey = `user_${user.id}_data`;
    let userData = JSON.parse(localStorage.getItem(userDataKey));
    
    if (!userData) {
        userData = {
            stats: {
                streak: 0,
                totalDays: 0,
                totalExercises: 0,
                lastActiveDate: null
            },
            workouts: [],
            completedExercises: {},
            achievements: []
        };
    }
    
    const today = new Date().toDateString();
    
    if (!userData.completedExercises) {
        userData.completedExercises = {};
    }
    if (!userData.completedExercises[today]) {
        userData.completedExercises[today] = {};
    }
    
    const currentCount = userData.completedExercises[today][exerciseId] || 0;
    
    if (currentCount >= 3) {
        alert('Вы уже выполнили это упражнение максимальное количество раз за сегодня (3 раза)');
        return;
    }
    
    // Проверяем, было ли это первое упражнение за сегодня
    const wasTodayEmpty = Object.keys(userData.completedExercises[today] || {}).length === 0;
    
    // Увеличиваем счетчик
    userData.completedExercises[today][exerciseId] = currentCount + 1;
    
    // Обновляем статистику
    userData.stats.totalExercises = (userData.stats.totalExercises || 0) + 1;
    
    // Правильный учёт дней реабилитации
    const lastActive = userData.stats.lastActiveDate;
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    if (wasTodayEmpty) {
        if (!lastActive) {
            userData.stats.totalDays = 1;
        } 
        else if (lastActive === yesterdayString) {
            userData.stats.totalDays = (userData.stats.totalDays || 0) + 1;
        }
        else if (lastActive !== today) {
            userData.stats.totalDays = (userData.stats.totalDays || 0) + 1;
        }
    }
    
    // Обновляем серию дней
    updateStreak(userData, today);
    
    // Обновляем дату последней активности
    userData.stats.lastActiveDate = today;
    
    // Сохраняем данные
    localStorage.setItem(userDataKey, JSON.stringify(userData));
    
    // Обновляем интерфейс
    updateButtonState(buttonElement, currentCount + 1);
    updateDailyCounter();
    
    showNotification('Упражнение отмечено как выполненное!');
}

// Обновление серии дней
function updateStreak(userData, today) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    const lastActive = userData.stats.lastActiveDate;
    
    if (!lastActive) {
        userData.stats.streak = 1;
    } else if (lastActive === yesterdayString) {
        userData.stats.streak = (userData.stats.streak || 0) + 1;
    } else if (lastActive !== today) {
        userData.stats.streak = 1;
    }
}

// Обновление состояния кнопки
function updateButtonState(button, newCount) {
    if (newCount >= 3) {
        button.innerHTML = '<i class="fas fa-check-circle"></i> Выполнено (3/3)';
        button.disabled = true;
        button.classList.add('completed-max');
    } else {
        button.innerHTML = `<i class="fas fa-check-circle"></i> Выполнено (${newCount}/3)`;
    }
    
    const card = button.closest('.exercise-card');
    if (card) {
        const completedCount = card.querySelector('.completed-count');
        if (completedCount) {
            completedCount.innerHTML = `<i class="fas fa-calendar-check"></i> Выполнено сегодня: ${newCount}/3`;
        }
    }
    
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 300);
}

// Фильтрация упражнений
function filterExercises() {
    const searchTerm = document.getElementById('exercise-search').value.toLowerCase();
    const injuryFilter = document.getElementById('injury-type').value;
    const difficultyFilter = document.getElementById('difficulty').value;
    
    if (!exercisesDatabase) return;
    
    const filtered = exercisesDatabase.filter(exercise => {
        const matchesSearch = !searchTerm || 
            exercise.name.toLowerCase().includes(searchTerm) ||
            exercise.description.toLowerCase().includes(searchTerm);
        
        const matchesInjury = injuryFilter === 'all' || exercise.injuryType === injuryFilter;
        const matchesDifficulty = difficultyFilter === 'all' || exercise.difficulty === difficultyFilter;
        
        return matchesSearch && matchesInjury && matchesDifficulty;
    });
    
    currentExercises = filtered;
    displayExercises(filtered);
}

// Сброс фильтров
function resetFilters() {
    document.getElementById('exercise-search').value = '';
    document.getElementById('injury-type').value = 'all';
    document.getElementById('difficulty').value = 'all';
    
    loadAllExercises();
}

// Обновление информации о поиске
function updateSearchInfo(count) {
    const searchInfo = document.getElementById('search-info');
    if (!searchInfo) return;
    
    if (count === exercisesDatabase.length) {
        searchInfo.textContent = `Все упражнения (${count})`;
    } else {
        searchInfo.textContent = `Найдено упражнений: ${count} из ${exercisesDatabase.length}`;
    }
}

// Обновление дневного счетчика
function updateDailyCounter() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let todayCount = 0;
    
    if (user) {
        const userData = JSON.parse(localStorage.getItem(`user_${user.id}_data`));
        const today = new Date().toDateString();
        const todayExercises = userData?.completedExercises?.[today] || {};
        
        todayCount = Object.values(todayExercises).reduce((sum, count) => sum + count, 0);
    }
    
    const counterElement = document.getElementById('today-counter');
    const progressFill = document.getElementById('progress-fill');
    
    if (counterElement) {
        counterElement.textContent = todayCount;
        
        counterElement.style.transform = 'scale(1.2)';
        counterElement.style.color = 'var(--primary-dark)';
        setTimeout(() => {
            counterElement.style.transform = 'scale(1)';
            counterElement.style.color = '';
        }, 300);
    }
    
    if (progressFill) {
        const progress = (todayCount / 3) * 100;
        progressFill.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            progressFill.style.background = 'linear-gradient(90deg, var(--success-color), #2E7D32)';
        } else if (progress >= 66) {
            progressFill.style.background = 'linear-gradient(90deg, var(--warning-color), #FF9800)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, var(--primary-light), var(--primary-color))';
        }
    }
}

// Проверка и сброс дневных счетчиков
function checkAndResetDailyCounters() {
    const lastReset = localStorage.getItem('lastResetDate');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
        resetDailyCounters();
        localStorage.setItem('lastResetDate', today);
    }
}

// Сброс дневных счетчиков
function resetDailyCounters() {
    const today = new Date().toDateString();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    users.forEach(user => {
        const userDataKey = `user_${user.id}_data`;
        const userData = JSON.parse(localStorage.getItem(userDataKey));
        
        if (userData && userData.completedExercises) {
            Object.keys(userData.completedExercises).forEach(date => {
                if (date !== today) {
                    delete userData.completedExercises[date];
                }
            });
            
            localStorage.setItem(userDataKey, JSON.stringify(userData));
        }
    });
    
    updateDailyCounter();
    
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('completed-max');
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Выполнено (0/3)';
        
        const card = btn.closest('.exercise-card');
        if (card) {
            const completedCount = card.querySelector('.completed-count');
            if (completedCount) {
                completedCount.innerHTML = '<i class="fas fa-calendar-check"></i> Выполнено сегодня: 0/3';
            }
        }
    });
}

// Функция для обработки ошибок видео
function handleVideoError(videoElement) {
    videoElement.onerror = function() {
        const container = videoElement.closest('.exercise-video');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'video-placeholder';
            errorDiv.innerHTML = `
                <i class="fas fa-video-slash" style="font-size: 32px; margin-bottom: 10px;"></i>
                <p>Видео недоступно</p>
                <small>Пожалуйста, проверьте подключение к интернету</small>
            `;
            errorDiv.style.cssText = `
                background: #f5f5f5;
                border-radius: 12px;
                padding: 40px 20px;
                text-align: center;
                color: var(--text-light);
            `;
            videoElement.style.display = 'none';
            container.appendChild(errorDiv);
        }
    };
}

// Инициализация обработчиков видео
function initVideoHandlers() {
    document.querySelectorAll('.exercise-video video').forEach(video => {
        handleVideoError(video);
    });
}

// Показать уведомление
function showNotification(message) {
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
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
            notification.remove();
        }, 300);
    }, 3000);
}

// Показать ошибку
function showError(message) {
    const container = document.getElementById('exercises-container');
    if (container) {
        container.innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #f44336; margin-bottom: 20px;"></i>
                <h3>Ошибка загрузки</h3>
                <p>${message}</p>
                <button onclick="window.location.reload()" class="btn-primary" style="margin-top: 20px;">
                    <i class="fas fa-redo"></i> Обновить страницу
                </button>
            </div>
        `;
    }
}

// Добавление CSS стилей
function addCustomStyles() {
    if (!document.getElementById('exercises-custom-styles')) {
        const style = document.createElement('style');
        style.id = 'exercises-custom-styles';
        style.textContent = `
            .video-placeholder {
                background: #f5f5f5;
                border-radius: 12px;
                padding: 40px 20px;
                text-align: center;
                color: var(--text-light);
            }
            
            .video-placeholder i {
                font-size: 32px;
                margin-bottom: 10px;
                color: var(--text-light);
            }
            
            .video-placeholder p {
                margin-bottom: 5px;
            }
            
            .video-placeholder small {
                font-size: 12px;
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, запуск инициализации упражнений...');
    addCustomStyles();
    
    setTimeout(() => {
        initExercisesPage();
    }, 100);
});

// Делаем функции доступными глобально
window.rehabProExercises = {
    initExercisesPage,
    loadAllExercises,
    filterExercises,
    resetFilters,
    updateDailyCounter,
    markExerciseAsCompleted
};
