// === SİZİN FIREBASE KONFİQURASİYANIZ ===
const firebaseConfig = {
    apiKey: "AIzaSyAI2rM3vttKrDI9C4vDD41_hcXurLvQ6gw",
    authDomain: "it-inventory-tracker-61d2c.firebaseapp.com",
    projectId: "it-inventory-tracker-61d2c",
    storageBucket: "it-inventory-tracker-61d2c.firebasestorage.app",
    messagingSenderId: "557225811726",
    appId: "1:557225811726:web:f85c3ca033997d2f95c15f",
    measurementId: "G-9SM2Y2QGC3"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.error("Firebase başlatma xətası:", e);
}

const auth = firebase.auth();
const db = firebase.firestore(); 

// === TAB KEÇİD SİSTEMİ ===
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

// === MODAL PƏNCƏRƏ MƏNTİQİ ===
const helpModal = document.getElementById("help-modal");
if(helpModal) {
    document.getElementById("help-btn").onclick = () => { helpModal.style.display = "block"; }
    document.getElementById("help-modal-close").onclick = () => { helpModal.style.display = "none"; }
    window.addEventListener('click', (event) => {
        if (event.target == helpModal) {
            helpModal.style.display = "none";
        }
    });
}

// === QEYDİYYAT FUNKSİYASI (SERVERSİZ - LİNK İLƏ) ===
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;

    if (password !== passwordConfirm) {
        alert(t("pwMismatch")); return;
    }

    // 1. İstifadəçi yaradılır
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            let userRole = "user"; 
            if (email.toLowerCase() === 'admin@karabakh.edu.az') {
                userRole = "admin";
            }

            // 2. Databazaya yazılır
            db.collection("users").doc(user.uid).set({
                name: name,
                email: user.email,
                role: userRole
            })
            .then(() => {
                // 3. Təsdiq linki göndərilir
                user.sendEmailVerification().then(function() {
                    // Link göndərildi
                    alert(`Təbrik edirik, ${name}!\nHesabınız yaradıldı.\n\nZəhmət olmasa ${email} ünvanına göndərilən TƏSDİQ LİNKİNƏ daxil olun, sonra giriş edin.`);
                    
                    // Sistemdən çıxış veririk ki, təsdiqləmədən girə bilməsin
                    auth.signOut();
                    
                    registerForm.reset(); 
                    document.querySelector('.tab-link[data-tab="login"]').click();

                }).catch(function(error) {
                    alert("Link göndərilərkən xəta oldu: " + error.message);
                });
            })
            .catch((dbError) => {
                 alert(t("registerErrorDB") + dbError.message);
            });
        })
        .catch((error) => {
            console.error("Qeydiyyat xətası: ", error.code, error.message);
            if (error.code === 'auth/operation-not-allowed') {
                alert(t("authError"));
            } else if (error.code === 'auth/email-already-in-use') {
                alert(t("emailInUse"));
            } else if (error.code === 'auth/weak-password') {
                alert(t("weakPassword"));
            } else {
                alert(t("registerErrorGeneral") + error.message);
            }
        });
});

// === DAXİL OLMA FUNKSİYASI (EMAIL VERIFICATION YOXLAMASI İLƏ) ===
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // 1. Yoxlayırıq: Mail təsdiqlənibmi?
            if (!user.emailVerified) {
                alert("Zəhmət olmasa əvvəlcə e-poçt ünvanınıza gələn təsdiq linkinə daxil olun!");
                auth.signOut(); // Sistemə buraxmırıq
                return;
            }

            // 2. Təsdiqlənibsə, rolu yoxla
            const userDocRef = db.collection("users").doc(user.uid);
            
            userDocRef.get().then((doc) => {
                if (doc.exists && doc.data().role === 'admin') {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "dashboard.html";
                }
            }).catch((error) => {
                console.error("Database rol yoxlama xətası: ", error);
                window.location.href = "dashboard.html";
            });
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                alert(t("wrongPassword"));
            } else {
                alert(t("loginError") + error.message);
            }
        });
});