/* ==========================================
   1. JAM, TANGGAL & STATUS KELAS REALTIME
   ========================================== */
function updateRealtimeInfo() {
    const now = new Date();

    // A. Update Jam di Navbar (Format: HH:MM:SS)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const clockNav = document.getElementById('nav-time');
    if (clockNav) {
        clockNav.textContent = timeString;
    }

    // B. Update Tanggal di Banner Hero
    const optionsDate = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('id-ID', optionsDate);

    const dateBanner = document.getElementById('rt-date');
    if (dateBanner) {
        dateBanner.textContent = dateString;
    }

    // C. Logika Status Kelas Otomatis Berdasarkan Waktu
    const statusBanner = document.getElementById('rt-status');
    if (statusBanner) {
        const day = now.getDay(); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
        const currentHour = now.getHours();
        const currentMin = now.getMinutes();
        const totalMinutes = currentHour * 60 + currentMin;

        // Sabtu (6) & Minggu (0)
        if (day === 0 || day === 6) {
            statusBanner.textContent = "Libur Akhir Pekan 🏖️";
            statusBanner.style.color = "#94a3b8";
        } 
        // Senin - Jumat (Jam Sekolah: 07:00 - 14:00 / 420 - 840 menit)
        else if (totalMinutes >= 420 && totalMinutes <= 840) {
            // Jam Istirahat (Contoh: 10:00 - 10:15 / 600 - 615 menit)
            if (totalMinutes >= 600 && totalMinutes < 615) {
                statusBanner.textContent = "Jam Istirahat 🍱";
                statusBanner.style.color = "#f59e0b"; // Warna Kuning/Emas
            } else {
                statusBanner.textContent = "Kegiatan Belajar Mengajar 📚";
                statusBanner.style.color = "#38bdf8"; // Warna Biru
            }
        } 
        // Di luar jam sekolah
        else {
            statusBanner.textContent = "Di Luar Jam Sekolah 🌙";
            statusBanner.style.color = "#94a3b8";
        }
    }
}

// Jalankan fungsi setiap 1 detik (1000 ms)
setInterval(updateRealtimeInfo, 1000);
updateRealtimeInfo(); // Panggil langsung saat pertama kali reload


/* ==========================================
   2. FUNGSI TAB JADWAL PELAJARAN
   ========================================== */
function openDay(evt, dayName) {
    let i, tabcontent, tablinks;

    // Sembunyikan semua isi tab
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // Matikan status active pada semua tombol tab
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Tampilkan tab yang dipilih & aktifkan tombolnya
    const targetTab = document.getElementById(dayName);
    if (targetTab) {
        targetTab.classList.add("active");
    }
    evt.currentTarget.classList.add("active");
}


/* ==========================================
   3. SET TAB JADWAL OTOMATIS SESUAI HARI INI
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {
    const today = new Date().getDay(); // 1 = Senin, ..., 5 = Jumat
    const daysMap = {
        1: 'senin',
        2: 'selasa',
        3: 'rabu',
        4: 'kamis',
        5: 'jumat'
    };

    // Jika hari ini Senin-Jumat, buka tab hari tersebut. Jika Sabtu/Minggu, default ke Senin.
    const activeDay = daysMap[today] || 'senin';
    const autoActiveBtn = document.querySelector(`.tab-btn[onclick*="${activeDay}"]`);

    if (autoActiveBtn) {
        autoActiveBtn.click();
    }
});


/* ==========================================
   4. MENU HAMBURGER NAVIGASI HP
   ========================================== */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Tutup menu otomatis jika salah satu link di-klik
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}


/* ==========================================
   5. EFEK NAVBAR SHADOW SAAT DI-SCROLL
   ========================================== */
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    } else {
        navbar.style.boxShadow = "none";
    }
});
/* ==========================================
   6. FITUR POPUP / LIGHTBOX FOTO FULLSCREEN
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const captionText = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".modal-close");

    // Ambil semua foto (Foto Kelas, Foto Guru, Foto Murid)
    const allImages = document.querySelectorAll(".photo-card img, .teacher-img img, .student-img-box img");

    allImages.forEach(img => {
        img.addEventListener("click", function () {
            modal.classList.add("show");
            modalImg.src = this.src;

            // Ambil nama/keterangan dari teks terdekat jika ada
            let caption = this.alt;
            
            // Jika foto murid, ambil nama muridnya
            const studentDetails = this.closest('.student-card');
            if (studentDetails) {
                const studentName = studentDetails.querySelector('h4').textContent;
                const studentNo = studentDetails.querySelector('.student-no').textContent;
                caption = `${studentNo} — ${studentName}`;
            }

            // Jika foto kelas, ambil caption foto
            const photoCaption = this.closest('.photo-card');
            if (photoCaption && photoCaption.querySelector('.photo-caption h3')) {
                caption = photoCaption.querySelector('.photo-caption h3').textContent;
            }

            captionText.textContent = caption;
        });
    });

    // Fungsi Tutup Modal jika tombol X diklik
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            modal.classList.remove("show");
        });
    }

    // Fungsi Tutup Modal jika area di luar gambar diklik
    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });
    }
});
