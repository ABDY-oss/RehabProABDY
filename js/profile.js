// profile.js - Профиль пользователя для RehabPro

// Создаём модальное окно профиля
function createProfileModal() {
    // Проверяем, существует ли уже модальное окно
    if (document.getElementById('profile-modal')) {
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'profile-modal';
    modal.className = 'profile-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        justify-content: center;
        align-items: center;
    `;
    
    modal.innerHTML = `
        <div class="profile-content" style="
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            animation: slideDown 0.3s ease;
        ">
            <button class="close-modal" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--text-light);
                transition: color 0.3s ease;
            ">×</button>
            
            <h2 style="
                color: var(--primary-dark);
                margin-bottom: 30px;
                display: flex;
                align-items: center;
                gap: 10px;
            ">
                <i class="fas fa-user-circle"></i> Мой профиль
            </h2>
            
            <div class="profile-avatar" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 30px;
            ">
                <div style="
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, var(--primary-light), var(--primary-color));
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                ">
                    <i class="fas fa-user" style="font-size: 50px; color: white;"></i>
                </div>
                <h3 id="profile-username" style="color: var(--text-color);"></h3>
            </div>
            
            <form id="profile-form">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: var(--primary-dark);
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-envelope"></i> Email
                    </label>
                    <input type="email" id="profile-email" readonly style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid var(--border-color);
                        border-radius: 10px;
                        font-size: 14px;
                        background: #f5f5f5;
                    ">
                </div>
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: var(--primary-dark);
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-user"></i> Имя пользователя
                    </label>
                    <input type="text" id="profile-name" placeholder="Введите ваше имя" style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid var(--border-color);
                        border-radius: 10px;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    ">
                </div>
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: var(--primary-dark);
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-phone"></i> Телефон
                    </label>
                    <input type="tel" id="profile-phone" placeholder="+7 (___) ___-__-__" style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid var(--border-color);
                        border-radius: 10px;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    ">
                </div>
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: var(--primary-dark);
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-calendar"></i> Дата рождения
                    </label>
                    <input type="date" id="profile-birthdate" style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid var(--border-color);
                        border-radius: 10px;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    ">
                </div>
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: var(--primary-dark);
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-venus-mars"></i> Пол
                    </label>
                    <select id="profile-gender" style="
                        width: 100%;
                        padding: 12px;
                        border: 2px solid var(--border-color);
                        border-radius: 10px;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    ">
                        <option value="">Не указан</option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                </div>
                
                <div class="profile-stats" style="
                    background: #F9FFF9;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 30px;
                    border-left: 4px solid var(--primary-color);
                ">
                    <h4 style="
                        color: var(--primary-dark);
                        margin-bottom: 15px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <i class="fas fa-chart-line"></i> Статистика
                    </h4>
                    <div id="profile-stats-content" style="display: flex; flex-direction: column; gap: 10px;">
                        <!-- Статистика будет загружена через JS -->
                    </div>
                </div>
                
                <div class="profile-actions" style="
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                ">
                    <div style="
                        display: flex;
                        gap: 15px;
                        justify-content: flex-end;
                    ">
                        <button type="button" class="btn-secondary" onclick="closeProfileModal()" style="
                            padding: 12px 25px;
                        ">
                            <i class="fas fa-times"></i> Отмена
                        </button>
                        <button type="submit" class="btn-primary" style="
                            padding: 12px 25px;
                        ">
                            <i class="fas fa-save"></i> Сохранить
                        </button>
                    </div>
                    
                    <!-- КНОПКА ВЫХОДА ИЗ АККАУНТА -->
                    <button type="button" id="logout-button" class="btn-danger" style="
                        padding: 12px 25px;
                        background-color: #f44336;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin-top: 10px;
                        width: 100%;
                    " onmouseover="this.style.backgroundColor='#d32f2f'" 
                       onmouseout="this.style.backgroundColor='#f44336'">
                        <i class="fas fa-sign-out-alt"></i> Выйти из аккаунта
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Добавляем стили для анимации
    if (!document.getElementById('profile-styles')) {
        const style = document.createElement('style');
        style.id = 'profile-styles';
        style.textContent = `
            @keyframes slideDown {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .profile-modal .form-group input:focus,
            .profile-modal .form-group select:focus {
                outline: none;
                border-color: var(--primary-color) !important;
                box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
            }
            
            .profile-modal .close-modal:hover {
                color: var(--danger-color);
            }
            
            .btn-danger {
                background-color: #f44336;
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .btn-danger:hover {
                background-color: #d32f2f !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
            }
            
            @media (max-width: 768px) {
                .profile-content {
                    padding: 30px 20px !important;
                    width: 95% !important;
                }
                
                .profile-actions > div {
                    flex-direction: column-reverse;
                }
                
                .profile-actions button {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Обработчики
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeProfileModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProfileModal();
        }
    });
    
    const form = modal.querySelector('#profile-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfileData();
    });
    
    // Добавляем обработчик для кнопки выхода
    const logoutBtn = modal.querySelector('#logout-button');
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
}

// Функция выхода из аккаунта
function logout() {
    if (confirm('Вы действительно хотите выйти из аккаунта?')) {
        // Удаляем текущего пользователя
        localStorage.removeItem('currentUser');
        
        // Показываем уведомление
        showNotification('Вы успешно вышли из аккаунта');
        
        // Закрываем модальное окно
        closeProfileModal();
        
        // Перенаправляем на страницу входа
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }
}

// Открыть модальное окно профиля
function openProfileModal() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    const modal = document.getElementById('profile-modal');
    if (!modal) {
        createProfileModal();
    }
    
    document.getElementById('profile-modal').style.display = 'flex';
    loadProfileData();
}

// Закрыть модальное окно профиля
function closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Загрузить данные профиля
function loadProfileData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;
    
    const userDataKey = `user_${user.id}_data`;
    let userData = JSON.parse(localStorage.getItem(userDataKey));
    
    if (!userData) {
        userData = {
            stats: { streak: 0, totalDays: 0, totalExercises: 0 },
            profile: {}
        };
    }
    
    if (!userData.profile) {
        userData.profile = {};
    }
    
    // Заполняем форму
    document.getElementById('profile-email').value = user.email || '';
    document.getElementById('profile-name').value = userData.profile.name || '';
    document.getElementById('profile-phone').value = userData.profile.phone || '';
    document.getElementById('profile-birthdate').value = userData.profile.birthdate || '';
    document.getElementById('profile-gender').value = userData.profile.gender || '';
    
    document.getElementById('profile-username').textContent = 
        userData.profile.name || user.email.split('@')[0];
    
    // Загружаем статистику
    loadProfileStats(userData);
}

// Загрузить статистику в профиль
function loadProfileStats(userData) {
    const statsContent = document.getElementById('profile-stats-content');
    if (!statsContent) return;
    
    const stats = userData.stats || { streak: 0, totalDays: 0, totalExercises: 0 };
    const today = new Date().toDateString();
    const todayExercises = userData.completedExercises?.[today] || {};
    const todayCount = Object.values(todayExercises).reduce((sum, count) => sum + count, 0);
    
    statsContent.innerHTML = `
        <p style="display: flex; justify-content: space-between; align-items: center;">
            <span><i class="fas fa-fire" style="color: #FF9800;"></i> Серия:</span>
            <strong>${stats.streak || 0} дней</strong>
        </p>
        <p style="display: flex; justify-content: space-between; align-items: center;">
            <span><i class="fas fa-calendar-alt" style="color: var(--primary-color);"></i> Дней реабилитации:</span>
            <strong>${stats.totalDays || 0} дней</strong>
        </p>
        <p style="display: flex; justify-content: space-between; align-items: center;">
            <span><i class="fas fa-dumbbell" style="color: var(--primary-color);"></i> Сегодня:</span>
            <strong>${todayCount} упражнений</strong>
        </p>
        <p style="display: flex; justify-content: space-between; align-items: center;">
            <span><i class="fas fa-trophy" style="color: #FFD700;"></i> Всего упражнений:</span>
            <strong>${stats.totalExercises || 0}</strong>
        </p>
    `;
}

// Сохранить данные профиля
function saveProfileData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;
    
    const userDataKey = `user_${user.id}_data`;
    let userData = JSON.parse(localStorage.getItem(userDataKey));
    
    if (!userData) {
        userData = {
            stats: { streak: 0, totalDays: 0, totalExercises: 0 },
            completedExercises: {},
            workouts: [],
            achievements: []
        };
    }
    
    if (!userData.profile) {
        userData.profile = {};
    }
    
    // Сохраняем данные из формы
    userData.profile = {
        name: document.getElementById('profile-name').value,
        phone: document.getElementById('profile-phone').value,
        birthdate: document.getElementById('profile-birthdate').value,
        gender: document.getElementById('profile-gender').value,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(userDataKey, JSON.stringify(userData));
    
    // Обновляем кнопку входа
    updateLoginButton();
    
    showNotification('Профиль успешно обновлён!');
    closeProfileModal();
}

// Обновление кнопки входа с меню
function updateLoginButton() {
    const loginBtn = document.getElementById('login-btn');
    if (!loginBtn) return;
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (user) {
        const userDataKey = `user_${user.id}_data`;
        const userData = JSON.parse(localStorage.getItem(userDataKey));
        const username = userData?.profile?.name || user.email.split('@')[0];
        
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${username}`;
        loginBtn.href = '#';
        loginBtn.onclick = function(e) {
            e.preventDefault();
            openProfileModal();
        };
        
        // Добавляем стрелку вниз для индикации меню
        loginBtn.style.display = 'inline-flex';
        loginBtn.style.alignItems = 'center';
        loginBtn.style.gap = '8px';
        
        // Добавляем иконку настроек
        const settingsIcon = document.createElement('i');
        settingsIcon.className = 'fas fa-cog';
        settingsIcon.style.fontSize = '14px';
        settingsIcon.style.marginLeft = '5px';
        loginBtn.appendChild(settingsIcon);
    } else {
        loginBtn.innerHTML = '<i class="fas fa-user"></i> Войти';
        loginBtn.href = 'login.html';
        loginBtn.onclick = null;
    }
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
        z-index: 1100;
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаём модальное окно
    createProfileModal();
    
    // Обновляем кнопку входа
    updateLoginButton();
});

// Делаем функции доступными глобально
window.profileModal = {
    openProfileModal,
    closeProfileModal,
    updateLoginButton,
    logout
};