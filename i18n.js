const translations = {
    az: {
        appName: "IT Inventory Tracker",
        login: "Daxil ol",
        register: "Qeydiyyat",
        emailLabel: "E-poçt ünvanı",
        passwordLabel: "Şifrə",
        confirmPasswordLabel: "Şifrəni təsdiqlə",
        fullNameLabel: "Tam ad",
        submitLogin: "Daxil ol",
        submitRegister: "Hesab Yarat",
        
        // YENİ ƏLAVƏ OLUNANLAR:
        forgotPasswordLink: "Şifrəni unutmuşam",
        backToLogin: "Geri qayıt",
        sendResetLink: "Sıfırlama linkini göndər",
        
        // Xəta mesajları
        pwMismatch: "Şifrələr uyğun gəlmir!",
        registerErrorDB: "Verilənlər bazası xətası: ",
        authError: "Əməliyyata icazə verilmir.",
        emailInUse: "Bu e-poçt artıq istifadə olunur.",
        weakPassword: "Şifrə çox zəifdir.",
        registerErrorGeneral: "Qeydiyyat xətası: ",
        wrongPassword: "E-poçt və ya şifrə yanlışdır.",
        loginError: "Giriş xətası: ",
        
        // Modal və Dil
        helpModalTitle: "Layihə Haqqında",
        helpModalP1: "IT Inventory Tracker - şirkət daxilindəki kompüter və digər avadanlıqların qeydiyyatını aparmaq üçün yaradılmış veb-tətbiqdir.",
        helpModalP2: "İstifadəçilər sistemə yeni avadanlıqlar əlavə edə bilər, Adminlər isə bütün avadanlıqlara nəzarət edə bilər.",
        helpModalP3: "Bütün məlumatlar təhlükəsiz şəkildə Firebase bulud sistemində saxlanılır.",
        langAzerbaijani: "Azərbaycanca (AZ)",
        langEnglish: "English (EN)",
        langRussian: "Русский (RU)"
    },
    en: {
        appName: "IT Inventory Tracker",
        login: "Login",
        register: "Sign Up",
        emailLabel: "Email Address",
        passwordLabel: "Password",
        confirmPasswordLabel: "Confirm Password",
        fullNameLabel: "Full Name",
        submitLogin: "Login",
        submitRegister: "Create Account",

        // NEW ADDITIONS:
        forgotPasswordLink: "Forgot Password?",
        backToLogin: "Back",
        sendResetLink: "Send Reset Link",

        // Errors
        pwMismatch: "Passwords do not match!",
        registerErrorDB: "Database error: ",
        authError: "Operation not allowed.",
        emailInUse: "Email is already in use.",
        weakPassword: "Password is too weak.",
        registerErrorGeneral: "Registration error: ",
        wrongPassword: "Wrong email or password.",
        loginError: "Login error: ",

        // Modal & Lang
        helpModalTitle: "About Project",
        helpModalP1: "IT Inventory Tracker is a web application designed to track computers and other equipment within the company.",
        helpModalP2: "Users can add new equipment to the system, while Admins can control all equipment.",
        helpModalP3: "All data is securely stored in the Firebase cloud system.",
        langAzerbaijani: "Azərbaycanca (AZ)",
        langEnglish: "English (EN)",
        langRussian: "Русский (RU)"
    },
    ru: {
        appName: "IT Inventory Tracker",
        login: "Войти",
        register: "Регистрация",
        emailLabel: "Эл. адрес",
        passwordLabel: "Пароль",
        confirmPasswordLabel: "Подтвердите пароль",
        fullNameLabel: "Полное имя",
        submitLogin: "Войти",
        submitRegister: "Создать аккаунт",

        // НОВЫЕ ДОБАВЛЕНИЯ:
        forgotPasswordLink: "Забыли пароль?",
        backToLogin: "Назад",
        sendResetLink: "Отправить ссылку",

        // Ошибки
        pwMismatch: "Пароли не совпадают!",
        registerErrorDB: "Ошибка базы данных: ",
        authError: "Операция не разрешена.",
        emailInUse: "Этот эл. адрес уже используется.",
        weakPassword: "Пароль слишком слабый.",
        registerErrorGeneral: "Ошибка регистрации: ",
        wrongPassword: "Неверный email или пароль.",
        loginError: "Ошибка входа: ",

        // Modal & Lang
        helpModalTitle: "О проекте",
        helpModalP1: "IT Inventory Tracker — это веб-приложение, предназначенное для учета компьютеров и другого оборудования внутри компании.",
        helpModalP2: "Пользователи могут добавлять в систему новое оборудование, а администраторы могут контролировать все оборудование.",
        helpModalP3: "Все данные надежно хранятся в облачной системе Firebase.",
        langAzerbaijani: "Azərbaycanca (AZ)",
        langEnglish: "English (EN)",
        langRussian: "Русский (RU)"
    }
};

let currentLang = 'az';

function setLanguage(lang) {
    currentLang = lang;
    const elements = document.querySelectorAll('[data-key]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            // Input placeholder-i və ya textContent-i dəyişirik
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Dil dropdown düyməsini yenilə
    const langBtnText = document.querySelector('.lang-btn-text');
    if(langBtnText) {
        langBtnText.textContent = lang.toUpperCase();
    }
    
    // Dropdown-ı bağla
    const dropdown = document.getElementById('lang-dropdown');
    if(dropdown) dropdown.classList.remove('show');
}

// Helper function to get text inside JS
function t(key) {
    return translations[currentLang][key] || key;
}

// Səhifə açılanda dili yüklə
document.addEventListener('DOMContentLoaded', () => {
    // Dropdown açılıb bağlanması
    const langBtn = document.getElementById('lang-btn');
    const dropdown = document.getElementById('lang-dropdown');
    
    if(langBtn && dropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        window.addEventListener('click', () => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
    
    // Default dil
    setLanguage('az');
});
