// nutrition.js - Логика страницы питания для RehabPro

// Логика страницы питания
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nutrition.js загружен, инициализация...');
    
    if (document.getElementById('calculate-calories')) {
        initNutritionPage();
    }
});

// Инициализация страницы питания
function initNutritionPage() {
    console.log('Инициализация страницы питания...');
    
    // Инициализируем калькулятор калорий
    const calculateBtn = document.getElementById('calculate-calories');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCalories);
    }
    
    console.log('Страница питания инициализирована');
}

// calculateCalories() - Исправленная версия с адаптивным выводом результатов

function calculateCalories() {
    console.log('Расчет калорий...');
    
    // Получаем данные из формы
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    // Получаем активность из выпадающего списка
    const activitySelect = document.getElementById('activity-level');
    const activity = parseFloat(activitySelect ? activitySelect.value : 1.55);
    
    // Получаем цель из выпадающего списка
    const goalSelect = document.getElementById('goal-select');
    const goal = parseFloat(goalSelect ? goalSelect.value : 0.8);
    
    // Валидация
    if (!weight || !height || !age || weight <= 0 || height <= 0 || age <= 0) {
        showError('Пожалуйста, введите корректные данные (возраст, вес, рост)');
        return;
    }
    
    // Анимация кнопки
    const calculateBtn = document.getElementById('calculate-calories');
    const originalBtnText = calculateBtn ? calculateBtn.innerHTML : '';
    
    if (calculateBtn) {
        calculateBtn.classList.add('calculating');
        calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Расчет...';
        calculateBtn.disabled = true;
    }
    
    // Рассчитываем базовый метаболизм (BMR) по формуле Миффлина-Сан Жеора
    let bmr;
    if (gender === 'male') {
        // Для мужчин: 10 × вес + 6.25 × рост - 5 × возраст + 5
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        // Для женщин: 10 × вес + 6.25 × рост - 5 × возраст - 161
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Рассчитываем суточную норму калорий с учетом активности
    const dailyCalories = Math.round(bmr * activity);
    
    // Рассчитываем калории с учетом цели
    const goalCalories = Math.round(dailyCalories * goal);
    
    // Получаем названия для отображения
    let activityName = '';
    let goalName = '';
    
    if (activitySelect) {
        const selectedOption = activitySelect.options[activitySelect.selectedIndex];
        activityName = selectedOption ? selectedOption.text : 'Умеренная активность';
    }
    
    if (goalSelect) {
        const selectedOption = goalSelect.options[goalSelect.selectedIndex];
        goalName = selectedOption ? selectedOption.text : 'Поддержание веса';
    }
    
    // Определяем процентное соотношение БЖУ в зависимости от цели
    let proteinPercent, fatPercent, carbPercent;
    
    if (goal === 0.7) { // Быстрое похудение (-30%)
        proteinPercent = 0.40; // 40% белка
        fatPercent = 0.25;     // 25% жиров
        carbPercent = 0.35;    // 35% углеводов
    } else if (goal === 0.8) { // Похудение (-20%)
        proteinPercent = 0.35; // 35% белка
        fatPercent = 0.25;     // 25% жиров
        carbPercent = 0.40;    // 40% углеводов
    } else if (goal === 1) { // Поддержание веса
        proteinPercent = 0.30; // 30% белка
        fatPercent = 0.25;     // 25% жиров
        carbPercent = 0.45;    // 45% углеводов
    } else if (goal === 1.1) { // Набор массы (+10%)
        proteinPercent = 0.25; // 25% белка
        fatPercent = 0.25;     // 25% жиров
        carbPercent = 0.50;    // 50% углеводов
    } else { // Быстрый набор массы (+20%)
        proteinPercent = 0.25; // 25% белка
        fatPercent = 0.20;     // 20% жиров
        carbPercent = 0.55;    // 55% углеводов
    }
    
    // Рассчитываем граммы БЖУ (1г белка = 4 ккал, 1г жиров = 9 ккал, 1г углеводов = 4 ккал)
    const proteinGrams = Math.round((goalCalories * proteinPercent) / 4);
    const fatGrams = Math.round((goalCalories * fatPercent) / 9);
    const carbGrams = Math.round((goalCalories * carbPercent) / 4);
    
    // Рассчитываем калории из БЖУ
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbCalories = carbGrams * 4;
    
    // Функция для форматирования чисел с пробелами для тысяч
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
    // Создаем HTML для результатов с адаптивной версткой
    const resultHtml = `
        <div class="results-container">
            <h3 class="results-title">
                <i class="fas fa-chart-line"></i> 
                Результаты расчета
            </h3>
            
            <div class="results-grid">
                <div class="result-card">
                    <div class="result-label">Базовый метаболизм (BMR)</div>
                    <div class="result-value">${formatNumber(Math.round(bmr))}</div>
                    <div class="result-unit">ккал/день</div>
                    <small style="color: var(--text-light); font-size: 12px; display: block; margin-top: 8px;">
                        <i class="fas fa-info-circle"></i> Энергия для жизни в покое
                    </small>
                </div>
                
                <div class="result-card">
                    <div class="result-label">С учетом активности</div>
                    <div class="result-value">${formatNumber(dailyCalories)}</div>
                    <div class="result-unit">ккал/день</div>
                    <small style="color: var(--text-light); font-size: 12px; display: block; margin-top: 8px;">
                        <i class="fas fa-running"></i> ${escapeHtml(activityName)}
                    </small>
                </div>
                
                <div class="result-card">
                    <div class="result-label">Рекомендуемое потребление</div>
                    <div class="result-value">${formatNumber(goalCalories)}</div>
                    <div class="result-unit">ккал/день</div>
                    <small style="color: var(--text-light); font-size: 12px; display: block; margin-top: 8px;">
                        <i class="fas fa-bullseye"></i> ${escapeHtml(goalName)}
                    </small>
                </div>
            </div>
            
            <div class="macronutrients-container">
                <h3 class="macronutrients-title">
                    <i class="fas fa-balance-scale"></i> 
                    Рекомендации по БЖУ
                </h3>
                
                <div class="macronutrients-grid">
                    <div class="macronutrient-card">
                        <div class="macronutrient-amount">${proteinGrams} г</div>
                        <div class="macronutrient-name">
                            <i class="fas fa-drumstick-bite"></i> Белок
                        </div>
                        <div class="macronutrient-calories">${proteinCalories} ккал (${Math.round(proteinPercent * 100)}%)</div>
                    </div>
                    
                    <div class="macronutrient-card">
                        <div class="macronutrient-amount">${fatGrams} г</div>
                        <div class="macronutrient-name">
                            <i class="fas fa-oil-can"></i> Жиры
                        </div>
                        <div class="macronutrient-calories">${fatCalories} ккал (${Math.round(fatPercent * 100)}%)</div>
                    </div>
                    
                    <div class="macronutrient-card">
                        <div class="macronutrient-amount">${carbGrams} г</div>
                        <div class="macronutrient-name">
                            <i class="fas fa-bread-slice"></i> Углеводы
                        </div>
                        <div class="macronutrient-calories">${carbCalories} ккал (${Math.round(carbPercent * 100)}%)</div>
                    </div>
                </div>
            </div>
            
            <div class="recommendations-container">
                <h3 class="recommendations-title">
                    <i class="fas fa-lightbulb"></i> 
                    Практические рекомендации
                </h3>
                
                <div class="recommendations-list">
                    <div class="recommendation-item">
                        <p><i class="fas fa-utensils" style="color: var(--primary-color); margin-right: 8px;"></i> 
                        Разделите дневную норму на <strong>4-5 приемов пищи</strong> каждые 3-4 часа</p>
                    </div>
                    <div class="recommendation-item">
                        <p><i class="fas fa-tint" style="color: #2196F3; margin-right: 8px;"></i> 
                        Пейте <strong>2-3 литра воды</strong> в день для поддержания метаболизма</p>
                    </div>
                    <div class="recommendation-item">
                        <p><i class="fas fa-bread-slice" style="color: #FF9800; margin-right: 8px;"></i> 
                        Употребляйте <strong>сложные углеводы</strong> (гречка, овсянка, бурый рис, киноа)</p>
                    </div>
                    <div class="recommendation-item">
                        <p><i class="fas fa-carrot" style="color: var(--primary-color); margin-right: 8px;"></i> 
                        Включите в рацион <strong>овощи и зелень</strong> для получения клетчатки и витаминов</p>
                    </div>
                    <div class="recommendation-item">
                        <p><i class="fas fa-fish" style="color: #2196F3; margin-right: 8px;"></i> 
                        Добавьте <strong>омега-3 жирные кислоты</strong> (рыба, орехи, льняное масло)</p>
                    </div>
                    <div class="recommendation-item">
                        <p><i class="fas fa-apple-alt" style="color: #4CAF50; margin-right: 8px;"></i> 
                        Ешьте <strong>фрукты и ягоды</strong> как источник антиоксидантов и витаминов</p>
                    </div>
                    <div class="recommendation-item">
                        <p><i class="fas fa-bed" style="color: #9C27B0; margin-right: 8px;"></i> 
                        Спите <strong>7-9 часов</strong> для полноценного восстановления организма</p>
                    </div>
                    <div class="recommendation-item">
                        <p><i class="fas fa-chart-line" style="color: var(--warning-color); margin-right: 8px;"></i> 
                        Ведите <strong>дневник питания</strong> для отслеживания прогресса</p>
                    </div>
                    <div class="recommendation-item">
                        <p><i class="fas fa-clock" style="color: #9C27B0; margin-right: 8px;"></i> 
                        Последний прием пищи должен быть <strong>за 2-3 часа до сна</strong> для качественного восстановления и нормального синтеза гормона роста</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Получаем элемент для результатов
    const resultsSection = document.getElementById('results-section');
    if (!resultsSection) {
        console.error('Элемент results-section не найден');
        if (calculateBtn) {
            calculateBtn.classList.remove('calculating');
            calculateBtn.innerHTML = originalBtnText;
            calculateBtn.disabled = false;
        }
        return;
    }
    
    // Показываем результат с анимацией
    setTimeout(() => {
        resultsSection.innerHTML = resultHtml;
        
        // Плавная прокрутка к результатам
        resultsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Восстанавливаем кнопку
        if (calculateBtn) {
            calculateBtn.classList.remove('calculating');
            calculateBtn.innerHTML = originalBtnText;
            calculateBtn.disabled = false;
        }
        
        // Сохраняем расчет в историю
        saveCalorieCalculation({
            gender: gender === 'male' ? 'Мужской' : 'Женский',
            age,
            weight,
            height,
            activity: activityName,
            goal: goalName,
            bmr: Math.round(bmr),
            dailyCalories,
            goalCalories,
            proteinGrams,
            fatGrams,
            carbGrams,
            proteinPercent: Math.round(proteinPercent * 100),
            fatPercent: Math.round(fatPercent * 100),
            carbPercent: Math.round(carbPercent * 100),
            date: new Date().toISOString()
        });
        
        // Показываем уведомление об успехе
        showSuccess('Расчет выполнен успешно!');
        
    }, 300);
}

// Вспомогательная функция для экранирования HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Сохранение расчета в историю
function saveCalorieCalculation(data) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user) {
        const userDataKey = `user_${user.id}_data`;
        let userData = JSON.parse(localStorage.getItem(userDataKey)) || {
            stats: {},
            workouts: [],
            completedExercises: {},
            achievements: [],
            nutrition: {
                calorieCalculations: []
            }
        };
        
        // Инициализируем раздел питания, если его нет
        if (!userData.nutrition) {
            userData.nutrition = {
                calorieCalculations: []
            };
        }
        
        // Добавляем новый расчет
        userData.nutrition.calorieCalculations.push(data);
        
        // Сохраняем только последние 10 расчетов
        if (userData.nutrition.calorieCalculations.length > 10) {
            userData.nutrition.calorieCalculations = userData.nutrition.calorieCalculations.slice(-10);
        }
        
        localStorage.setItem(userDataKey, JSON.stringify(userData));
        
        console.log('Расчет сохранен в историю пользователя');
    } else {
        console.log('Пользователь не авторизован, расчет не сохранен');
    }
}

// Показать ошибку
function showError(message) {
    // Удаляем старое уведомление
    const oldNotification = document.querySelector('.notification.error');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--danger-color);
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
    
    // Удаляем через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Показать успешное сообщение
function showSuccess(message) {
    // Удаляем старое уведомление
    const oldNotification = document.querySelector('.notification.success');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = 'notification success';
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
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Делаем функции доступными глобально для отладки
window.rehabProNutrition = {
    initNutritionPage,
    calculateCalories,
    saveCalorieCalculation
};
