# 🎓 University IT Inventory Tracker

Bu layihə, universitet daxilindəki texnoloji avadanlıqların mərkəzləşdirilmiş qaydada izlənməsi üçün hazırlanmış veb tətbiqdir. Sistem "Sorğu və Təsdiq" (Request-Approval) məntiqi ilə işləyir, yəni məlumatların doğruluğuna admin nəzarət edir.

## 🚀 İşləmə Prinsipi və Funksionallıqlar

Sistem iki fərqli rol üzərində qurulub: **İstifadəçi** və **Admin**.

### 1. İstifadəçi Paneli (User Panel) 👤
İstifadəçilər (tələbələr və ya işçilər) sistemə daxil olaraq aşağıdakıları edə bilər:
* **Yeni Avadanlıq Sorğusu:** İstifadəçi özündə olan və ya yeni gələn avadanlığı sistemə əlavə etmək üçün form doldurur və Adminə sorğu göndərir.
* **Sorğu Statusu:** Göndərdiyi sorğunun "Gözləmədə", "Təsdiqləndi" və ya "Rədd edildi" olduğunu izləyə bilir.
* **Şəxsi İnventar:** Öz adına təsdiqlənmiş avadanlıqların siyahısını görür.

### 2. Admin Paneli (Admin Panel) 🛠
Admin, sistemin idarəedicisi olaraq bütün səlahiyyətlərə sahibdir:
* **Sorğuların İdarə Edilməsi (Approval System):** İstifadəçilərdən gələn "Avadanlıq əlavə etmə" sorğularını nəzərdən keçirir. Məlumatlar düzgündürsə sorğanı **qəbul edir** (bazaya əlavə olunur), yanlışdırsa **imtina edir**.
* **Tam İnventar Nəzarəti:** Admin sorğu gözləmədən birbaşa özü də yeni avadanlıq əlavə edə bilər.
* **Redaktə və Silmə:** Bazada olan istənilən avadanlığın məlumatlarını dəyişə (edit) və ya sistemdən silə (delete) bilər.
* **Hesabatlıq:** Ümumi universitet inventarını siyahı şəklində görür.

## 💻 İstifadə Olunan Texnologiyalar

* **Front-end:** HTML5, CSS3, JavaScript (Vanilla ES6+)
* **Back-end (BaaS):** Google Firebase
* **Verilənlər Bazası:** Firebase Realtime Database / Firestore
* **Authentication:** Firebase Auth

## 📦 Quraşdırma (Installation)

Layihəni işə salmaq üçün:

1. Repozitoriyanı klonlayın:
   ```bash
   git clone [https://github.com/hesenli2007/It-Inventory-Tracker.git](https://github.com/hesenli2007/It-Inventory-Tracker.git)
