// auth.js - Авторизация и регистрация для RehabPro (БЕЗ ДЕМО-АККАУНТА)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth.js загружен, инициализация авторизации...');
    
    if (document.getElementById('login-form') || document.getElementById('register-form')) {
        console.log('Страница авторизации обнаружена');
        initAuth();
    } else {
        console.log('Страница авторизации не обнаружена, проверяем авторизацию на других страницах');
        checkAuth();
    }
});

function initAuth() {
    console.log('Инициализация форм авторизации...');
    
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginTab && registerTab) {
        loginTab.addEventListener('click', () => switchTab('login'));
        registerTab.addEventListener('click', () => switchTab('register'));
    }

    const loginSubmit = document.getElementById('login-submit');
    const registerSubmit = document.getElementById('register-submit');

    if (loginSubmit) {
        loginSubmit.addEventListener('click', handleLogin);
        
        document.getElementById('login-email')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleLogin();
        });
        
        document.getElementById('login-password')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleLogin();
        });
    }

    if (registerSubmit) {
        registerSubmit.addEventListener('click', handleRegister);
        
        document.getElementById('register-email')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleRegister();
        });
        
        document.getElementById('register-password')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleRegister();
        });
        
        document.getElementById('register-confirm')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleRegister();
        });
    }

    checkAuth();
}

function switchTab(tab) {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        if (loginError) loginError.style.display = 'none';
        if (registerError) registerError.style.display = 'none';
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        if (loginError) loginError.style.display = 'none';
        if (registerError) registerError.style.display = 'none';
    }
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorElement = document.getElementById('login-error');
    const loginButton = document.getElementById('login-submit');

    if (!email || !password) {
        showError(errorElement, 'Пожалуйста, заполните все поля');
        return;
    }

    if (!validateEmail(email)) {
        showError(errorElement, 'Пожалуйста, введите корректный email');
        return;
    }

    if (loginButton) {
        loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
        loginButton.disabled = true;
    }

    let users;
    try {
        const usersData = localStorage.getItem('users');
        if (usersData) {
            users = JSON.parse(usersData);
            if (!Array.isArray(users)) {
                if (typeof users === 'object' && users !== null) {
                    users = Object.values(users);
                } else {
                    users = [];
                }
            }
        } else {
            users = [];
        }
    } catch (error) {
        console.error('Ошибка при чтении пользователей из localStorage:', error);
        users = [];
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const userData = {
            email: user.email,
            id: user.id,
            createdAt: user.createdAt
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));

        initUserData(user.id);

        showSuccess('Вход выполнен успешно! Перенаправление...');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showError(errorElement, 'Неверный email или пароль');
        
        if (loginButton) {
            loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Войти';
            loginButton.disabled = false;
        }
    }
}

function handleRegister() {
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-confirm').value.trim();
    const errorElement = document.getElementById('register-error');
    const registerButton = document.getElementById('register-submit');

    if (!email || !password || !confirmPassword) {
        showError(errorElement, 'Пожалуйста, заполните все поля');
        return;
    }

    if (!validateEmail(email)) {
        showError(errorElement, 'Пожалуйста, введите корректный email');
        return;
    }

    if (password.length < 6) {
        showError(errorElement, 'Пароль должен содержать не менее 6 символов');
        return;
    }

    if (password !== confirmPassword) {
        showError(errorElement, 'Пароли не совпадают');
        return;
    }

    if (registerButton) {
        registerButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Регистрация...';
        registerButton.disabled = true;
    }

    let users;
    try {
        const usersData = localStorage.getItem('users');
        if (usersData) {
            users = JSON.parse(usersData);
            if (!Array.isArray(users)) {
                if (typeof users === 'object' && users !== null) {
                    users = Object.values(users);
                } else {
                    users = [];
                }
            }
        } else {
            users = [];
        }
    } catch (error) {
        console.error('Ошибка при чтении пользователей из localStorage:', error);
        users = [];
    }

    if (users.some(user => user.email === email)) {
        showError(errorElement, 'Этот email уже зарегистрирован');
        
        if (registerButton) {
            registerButton.innerHTML = '<i class="fas fa-user-plus"></i> Зарегистрироваться';
            registerButton.disabled = false;
        }
        return;
    }

    const newUser = {
        id: Date.now(),
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    initUserData(newUser.id);

    const userData = {
        email: newUser.email,
        id: newUser.id,
        createdAt: newUser.createdAt
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));

    showSuccess('Регистрация успешна! Создаем ваш профиль...');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(element, message) {
    console.error('Ошибка:', message);
    
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(message) {
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser && window.location.pathname.includes('login.html')) {
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 100);
    }
    
    // Вызываем updateLoginButton из profile.js, если он доступен
    if (typeof window.profileModal !== 'undefined' && window.profileModal.updateLoginButton) {
        window.profileModal.updateLoginButton();
    }
    
    return currentUser;
}

function initUserData(userId) {
    const userDataKey = `user_${userId}_data`;
    let userData = JSON.parse(localStorage.getItem(userDataKey));
    
    if (!userData) {
        const initialData = {
            stats: {
                streak: 0,
                totalDays: 0,
                totalExercises: 0,
                lastActiveDate: null
            },
            workouts: [],
            completedExercises: {},
            achievements: [],
            nutrition: {
                calorieCalculations: []
            },
            profile: {
                name: '',
                phone: '',
                birthdate: '',
                gender: '',
                createdAt: new Date().toISOString()
            }
        };
        
        localStorage.setItem(userDataKey, JSON.stringify(initialData));
    } else {
        // Добавляем раздел profile, если его нет
        if (!userData.profile) {
            userData.profile = {
                name: '',
                phone: '',
                birthdate: '',
                gender: ''
            };
            localStorage.setItem(userDataKey, JSON.stringify(userData));
        }
    }
}

function fixLocalStorageData() {
    try {
        const usersData = localStorage.getItem('users');
        if (usersData) {
            const parsed = JSON.parse(usersData);
            if (!Array.isArray(parsed)) {
                localStorage.removeItem('users');
                localStorage.setItem('users', JSON.stringify([]));
            }
        }
    } catch (error) {
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify([]));
    }
    
    try {
        const currentUserData = localStorage.getItem('currentUser');
        if (currentUserData) {
            JSON.parse(currentUserData);
        }
    } catch (error) {
        localStorage.removeItem('currentUser');
    }
}

function debugUsers() {
    let users;
    try {
        const usersData = localStorage.getItem('users');
        users = usersData ? JSON.parse(usersData) : [];
        if (!Array.isArray(users)) {
            users = [];
        }
    } catch (error) {
        users = [];
    }
    
    console.log('=== ДЕБАГ ПОЛЬЗОВАТЕЛЕЙ ===');
    console.log('Всего пользователей:', users.length);
    users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.email} (ID: ${user.id})`);
    });
    console.log('=========================');
}

function addAuthStyles() {
    if (!document.getElementById('auth-styles')) {
        const style = document.createElement('style');
        style.id = 'auth-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .error-message {
                background: #ffebee;
                color: #c62828;
                padding: 10px;
                border-radius: 5px;
                margin-top: 10px;
                border-left: 4px solid #f44336;
                display: none;
            }
            
            .success-message {
                background: #e8f5e9;
                color: #2e7d32;
                padding: 10px;
                border-radius: 5px;
                margin-top: 10px;
                border-left: 4px solid #4caf50;
                display: none;
            }
            
            .auth-card .btn-primary:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            .fa-spinner {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

addAuthStyles();
fixLocalStorageData();

window.rehabProAuth = {
    initAuth,
    handleLogin,
    handleRegister,
    checkAuth,
    debugUsers,
    validateEmail,
    fixLocalStorageData
};

console.log('Auth.js успешно загружен и готов к работе!');