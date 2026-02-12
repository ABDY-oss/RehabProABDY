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

// Расчет калорий (обновленная версия с выпадающими списками)
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
        showError('Пожалуйста, введите корректные данные');
        return;
    }
    
    // Анимация кнопки
    const calculateBtn = document.getElementById('calculate-calories');
    if (calculateBtn) {
        calculateBtn.classList.add('calculating');
        calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Расчет...';
        calculateBtn.disabled = true;
    }
    
    // Рассчитываем базовый метаболизм (BMR)
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Рассчитываем суточную норму калорий
    const dailyCalories = Math.round(bmr * activity);
    
    // Рассчитываем калории с учетом цели
    const goalCalories = Math.round(dailyCalories * goal);
    
    // Рассчитываем БЖУ в зависимости от цели
    let proteinPercent, fatPercent, carbPercent;
    let goalName = activitySelect.options[activitySelect.selectedIndex].text;
    let activityName = goalSelect.options[goalSelect.selectedIndex].text;
    
    if (goal === 0.7) { // Быстрое похудение
        proteinPercent = 0.40; // 40%
        fatPercent = 0.30;     // 30%
        carbPercent = 0.30;    // 30%
        goalName = 'Быстрое похудение (-30%)';
    } else if (goal === 0.8) { // Похудение
        proteinPercent = 0.35; // 35%
        fatPercent = 0.30;     // 30%
        carbPercent = 0.35;    // 35%
        goalName = 'Похудение (-20%)';
    } else if (goal === 1) { // Поддержание
        proteinPercent = 0.30; // 30%
        fatPercent = 0.30;     // 30%
        carbPercent = 0.40;    // 40%
        goalName = 'Поддержание веса';
    } else { // Набор массы
        proteinPercent = 0.25; // 25%
        fatPercent = 0.30;     // 30%
        carbPercent = 0.45;    // 45%
        goalName = goal === 1.1 ? 'Набор массы (+10%)' : 'Быстрый набор массы (+20%)';
    }
    
    // Рассчитываем граммы
    const proteinGrams = Math.round((goalCalories * proteinPercent) / 4);
    const fatGrams = Math.round((goalCalories * fatPercent) / 9);
    const carbGrams = Math.round((goalCalories * carbPercent) / 4);
    
    // Рассчитываем калории из БЖУ
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbCalories = carbGrams * 4;
    
    // Готовим HTML результат
    const resultHtml = `
        <div class="results-container">
            <h3 class="results-title"><i class="fas fa-chart-line"></i> Результаты расчета</h3>
            
            <div class="results-grid">
                <div class="result-card">
                    <div class="result-label">Базовый метаболизм</div>
                    <div class="result-value">${Math.round(bmr)}</div>
                    <div class="result-unit">ккал/день</div>
                </div>
                
                <div class="result-card">
                    <div class="result-label">С учетом активности</div>
                    <div class="result-value">${dailyCalories}</div>
                    <div class="result-unit">ккал/день</div>
                </div>
                
                <div class="result-card">
                    <div class="result-label">Рекомендуемое потребление</div>
                    <div class="result-value">${goalCalories}</div>
                    <div class="result-unit">ккал/день</div>
                </div>
            </div>
            
            <div class="macronutrients-container">
                <h3 class="macronutrients-title"><i class="fas fa-balance-scale"></i> Рекомендации по БЖУ</h3>
                
                <div class="macronutrients-grid">
                    <div class="macronutrient-card">
                        <div class="macronutrient-amount">${proteinGrams}г</div>
                        <div class="macronutrient-name">Белок</div>
                        <div class="macronutrient-calories">${proteinCalories} ккал</div>
                    </div>
                    
                    <div class="macronutrient-card">
                        <div class="macronutrient-amount">${fatGrams}г</div>
                        <div class="macronutrient-name">Жиры</div>
                        <div class="macronutrient-calories">${fatCalories} ккал</div>
                    </div>
                    
                    <div class="macronutrient-card">
                        <div class="macronutrient-amount">${carbGrams}г</div>
                        <div class="macronutrient-name">Углеводы</div>
                        <div class="macronutrient-calories">${carbCalories} ккал</div>
                    </div>
                </div>
            </div>
            
            <div class="recommendations-container">
                <h3 class="recommendations-title"><i class="fas fa-lightbulb"></i> Практические рекомендации</h3>
                
                <div class="recommendations-list">
                    <div class="recommendation-item">
                        <p>Разделите дневную норму на 4-5 приемов пищи каждые 3-4 часа</p>
                    </div>
                    <div class="recommendation-item">
                        <p>Пейте 2-3 литра воды в день для поддержания метаболизма</p>
                    </div>
                    <div class="recommendation-item">
                        <p>Употребляйте сложные углеводы (гречка, овсянка, бурый рис)</p>
                    </div>
                    <div class="recommendation-item">
                        <p>Включите в рацион овощи и зелень для получения клетчатки</p>
                    </div>
                    <div class="recommendation-item">
                        <p>Записывайте свой прогресс в дневник питания</p>
                    </div>
                    <div class="recommendation-item">
                        <p>Консультируйтесь с диетологом при изменении рациона</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Показываем результат с небольшой задержкой для анимации
    setTimeout(() => {
        document.getElementById('results-section').innerHTML = resultHtml;
        
        // Прокручиваем к результатам
        document.getElementById('results-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Восстанавливаем кнопку
        if (calculateBtn) {
            calculateBtn.classList.remove('calculating');
            calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Рассчитать калории';
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
            date: new Date().toISOString()
        });
        
        // Показываем уведомление об успехе
        showSuccess('Расчет выполнен успешно!');
        
    }, 800);
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