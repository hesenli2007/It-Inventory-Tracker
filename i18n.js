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
        forgotPasswordLink: "Şifrəni unutmuşam",
        backToLogin: "Geri qayıt",
        sendResetLink: "Sıfırlama linkini göndər",
        pwMismatch: "Şifrələr uyğun gəlmir!",
        authError: "Əməliyyata icazə verilmir.",
        emailInUse: "Bu e-poçt artıq istifadə olunur.",
        wrongPassword: "E-poçt və ya şifrə yanlışdır.",
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
        forgotPasswordLink: "Forgot Password?",
        backToLogin: "Back",
        sendResetLink: "Send Reset Link",
        pwMismatch: "Passwords do not match!",
        authError: "Operation not allowed.",
        emailInUse: "Email is already in use.",
        wrongPassword: "Wrong email or password.",
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
        forgotPasswordLink: "Забыли пароль?",
        backToLogin: "Назад",
        sendResetLink: "Отправить ссылку",
        pwMismatch: "Пароли не совпадают!",
        authError: "Операция не разрешена.",
        emailInUse: "Этот эл. адрес уже используется.",
        wrongPassword: "Неверный email или пароль.",
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
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    const langBtnText = document.querySelector('.lang-btn-text');
    if(langBtnText) langBtnText.textContent = lang.toUpperCase();
    
    const dropdown = document.getElementById('lang-dropdown');
    if(dropdown) dropdown.classList.remove('show');
}

function t(key) {
    return translations[currentLang][key] || key;
}

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-btn');
    const dropdown = document.getElementById('lang-dropdown');
    if(langBtn && dropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        window.addEventListener('click', () => {
            if (dropdown.classList.contains('show')) dropdown.classList.remove('show');
        });
    }
    setLanguage('az');
});
