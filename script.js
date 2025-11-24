// === FIREBASE CONFIG ===
const firebaseConfig = {
    apiKey: "AIzaSyAI2rM3vttKrDI9C4vDD41_hcXurLvQ6gw",
    authDomain: "it-inventory-tracker-61d2c.firebaseapp.com",
    projectId: "it-inventory-tracker-61d2c",
    storageBucket: "it-inventory-tracker-61d2c.firebasestorage.app",
    messagingSenderId: "557225811726",
    appId: "1:557225811726:web:f85c3ca033997d2f95c15f",
    measurementId: "G-9SM2Y2QGC3"
};

try { firebase.initializeApp(firebaseConfig); } catch (e) { console.error(e); }
const auth = firebase.auth();
const db = firebase.firestore(); 

// === TABLAR ===
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');
tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        const tabId = link.getAttribute('data-tab');
        tabLinks.forEach(item => item.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        link.classList.add('active');
        document.getElementById(tabId + '-form').classList.add('active');
    });
});

// === ŞİFRƏ GÖSTƏR/GİZLƏ ===
const passwordToggles = document.querySelectorAll('.toggle-password');
passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        toggle.classList.toggle('fa-eye-slash');
        toggle.classList.toggle('fa-eye');
    });
});

// === MODAL ===
const helpModal = document.getElementById("help-modal");
if(helpModal) {
    document.getElementById("help-btn").onclick = () => { helpModal.style.display = "block"; }
    document.getElementById("help-modal-close").onclick = () => { helpModal.style.display = "none"; }
    window.addEventListener('click', (event) => { if (event.target == helpModal) helpModal.style.display = "none"; });
}

// === QEYDİYYAT ===
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;

    if (password !== passwordConfirm) { alert(typeof t === 'function' ? t("pwMismatch") : "Şifrələr uyğun deyil"); return; }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            let userRole = (email.toLowerCase() === 'admin@karabakh.edu.az') ? "admin" : "user";
            
            db.collection("users").doc(user.uid).set({ name: name, email: user.email, role: userRole })
            .then(() => {
                user.sendEmailVerification().then(() => {
                    alert(`Hesab yaradıldı! ${email} ünvanına gedən TƏSDİQ linkinə daxil olun.`);
                    auth.signOut();
                    registerForm.reset();
                    document.querySelector('.tab-link[data-tab="login"]').click();
                });
            });
        })
        .catch((error) => { alert("Xəta: " + error.message); });
});

// =======================================================
// === 100% İŞLƏK SIFIRLAMA SİSTEMİ (İKİ AYRI DÜYMƏ) ===
// =======================================================

const loginForm = document.getElementById('login-form');
const forgotLink = document.getElementById('forgot-link');
const loginBtn = document.getElementById('login-btn'); 
const resetBtn = document.getElementById('reset-btn'); 
const passwordGroup = document.getElementById('password-group');

let isResetMode = false;

// 1. REJİMİ DƏYİŞƏN KOD (Şifrəni unutmuşam vs Geri qayıt)
if(forgotLink && loginBtn && resetBtn) {
    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        isResetMode = !isResetMode;

        if (isResetMode) {
            // --- SIFIRLAMA REJİMİ ---
            // Şifrə və Giriş düyməsini GİZLƏT
            if(passwordGroup) passwordGroup.style.display = 'none';
            loginBtn.style.display = 'none';
            
            // Sıfırlama düyməsini GÖSTƏR
            resetBtn.style.display = 'block';
            
            // Mətni dəyiş
            forgotLink.setAttribute('data-key', 'backToLogin');
            forgotLink.textContent = typeof t === 'function' ? t('backToLogin') : "Geri qayıt";
        } else {
            // --- GİRİŞ REJİMİ ---
            if(passwordGroup) passwordGroup.style.display = 'block';
            loginBtn.style.display = 'block';
            resetBtn.style.display = 'none';
            
            forgotLink.setAttribute('data-key', 'forgotPasswordLink');
            forgotLink.textContent = typeof t === 'function' ? t('forgotPasswordLink') : "Şifrəni unutmuşam";
        }
    });
}

// 2. SIFIRLAMA DÜYMƏSİNİN FUNKSİYASI
resetBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    const email = document.getElementById('login-email').value;

    if (!email) {
        alert("Zəhmət olmasa e-poçt ünvanını yazın!");
        return;
    }

    // Yalnız bu kod işləyir - LİNK GÖNDƏRİR
    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert("Sıfırlama linki göndərildi! Spam qovluğunu yoxlayın.");
            forgotLink.click(); // Avtomatik Geri qayıt
        })
        .catch((error) => {
            if(error.code === 'auth/user-not-found') alert("Bu e-poçt sistemdə yoxdur.");
            else alert("Xəta: " + error.message);
        });
});

// 3. DAXİL OL DÜYMƏSİNİN FUNKSİYASI
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Sığorta üçün: Əgər sıfırlama rejimindəyiksə, giriş etmə
    if(isResetMode) return;

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (!user.emailVerified) {
                alert("Zəhmət olmasa mailinizi təsdiqləyin!");
                auth.signOut();
                return;
            }
            const userDocRef = db.collection("users").doc(user.uid);
            userDocRef.get().then((doc) => {
                window.location.href = (doc.exists && doc.data().role === 'admin') ? "admin.html" : "dashboard.html";
            });
        })
        .catch((error) => {
             alert(typeof t === 'function' ? t("wrongPassword") : "Giriş xətası");
        });
});
