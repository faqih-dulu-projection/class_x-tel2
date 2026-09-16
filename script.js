/* ==========================================
   1. FUNGSI TAB JADWAL PELAJARAN (TEORI & PRAKTIK)
   ========================================== */
function openSchedule(evt, scheduleName) {
    let i, tabcontent, tablinks;

    // Sembunyikan semua isi tab jadwal
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
    const targetTab = document.getElementById(scheduleName);
    if (targetTab) {
        targetTab.classList.add("active");
    }
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}


/* ==========================================
   2. MENU HAMBURGER NAVIGASI HP
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Tutup menu otomatis jika salah satu link navigasi di-klik
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }
});


/* ==========================================
   3. EFEK NAVBAR SHADOW SAAT DI-SCROLL
   ========================================== */
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.scrollY > 40) {
            navbar.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.5)";
            navbar.style.background = "rgba(11, 15, 25, 0.95)";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.background = "rgba(11, 15, 25, 0.85)";
        }
    }
});


/* ==========================================
   4. FITUR POPUP / LIGHTBOX FOTO FULLSCREEN (SMOOTH ANIMATION)
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const captionText = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".modal-close");

    const clickableImages = document.querySelectorAll(".student-img-box img, .teacher-img img, .schedule-img");

    // Fungsi Buka Modal
    clickableImages.forEach(img => {
        img.addEventListener("click", function () {
            if (!modal || !modalImg) return;

            modalImg.src = this.src;

            // Atur caption
            let caption = this.alt || "Foto Kelas X TEL 2";
            const studentCard = this.closest('.student-card');
            if (studentCard) {
                const nameEl = studentCard.querySelector('h4');
                const noEl = studentCard.querySelector('.student-no');
                caption = `${noEl ? noEl.textContent : ''} — ${nameEl ? nameEl.textContent : ''}`;
            }

            const teacherCard = this.closest('.teacher-card');
            if (teacherCard) {
                const teacherName = teacherCard.querySelector('h3');
                if (teacherName) caption = `Wali Kelas — ${teacherName.textContent}`;
            }

            if (this.classList.contains('schedule-img')) {
                caption = `Jadwal Pelajaran — ${this.alt}`;
            }

            if (captionText) captionText.textContent = caption;

            // Tambahkan class show untuk memicu animasi CSS
            modal.classList.add("show");
        });
    });

    // Fungsi Tutup Modal
    function closeModal() {
        if (modal) {
            modal.classList.remove("show");
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Tutup dengan tombol ESC di keyboard
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal && modal.classList.contains("show")) {
            closeModal();
        }
    });
});

/* ==========================================
   5. FITUR INTERAKTIF HARAPAN (KLIK LOGO)
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById("logoWish");

    if (logo) {
        logo.addEventListener("click", function (e) {
            e.preventDefault(); // Mencegah reload atau lompat halaman
            
            // Menggunakan setTimeout tipis agar browser siap menerima input
            setTimeout(() => {
                const harapan = prompt("✨ Apa harapan kamu untuk kelas X TEL 2 ke depannya?");
                
                if (harapan && harapan.trim() !== "") {
                    alert(`Terima kasih! Harapan kamu:\n"${harapan.trim()}"\n\nSemoga X TEL 2 makin solid dan sukses! 🚀`);
                } else if (harapan !== null) {
                    alert("Harapan tidak boleh kosong yaa! 😉");
                }
            }, 100);
        });
    }
});

/* ==========================================
   6. FITUR SEARCH & PROTEKSI SANDI ("tel 2 jaya")
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {
    const unlockBtn = document.getElementById("unlockBtn");
    const lockStatus = document.getElementById("lockStatus");
    const studentsGrid = document.getElementById("studentsGrid");
    const searchInput = document.getElementById("searchInput");
    const studentCards = document.querySelectorAll(".student-card");
    const noResult = document.getElementById("noResult");

    let isUnlocked = false;

    // A. Logika Buka Akses Sandi
    if (unlockBtn) {
        unlockBtn.addEventListener("click", function () {
            if (isUnlocked) {
                alert("Akses profil sudah terbuka!");
                return;
            }

            const password = prompt("🔑 Masukkan Kata Sandi untuk Akses Profil Siswa:");

            if (password === "tel 2 jaya") {
                isUnlocked = true;
                studentsGrid.classList.remove("locked");
                lockStatus.innerHTML = '<i class="fa-solid fa-lock-open"></i> Akses Profil Terbuka';
                lockStatus.classList.add("unlocked");
                unlockBtn.style.display = "none";
                alert("Sandi benar! Akses profil berhasil dibuka. ✨");
            } else if (password !== null) {
                alert("Sandi salah! Akses ditolak. ❌");
            }
        });
    }

    // B. Logika Live Search Siswa
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const query = this.value.toLowerCase().trim();
            let matches = 0;

            studentCards.forEach(card => {
                // Ambil nama dari atribut data-name atau teks h4
                const name = card.getAttribute("data-name") || card.querySelector("h4").textContent.toLowerCase();

                if (name.includes(query)) {
                    card.style.display = "block";
                    matches++;
                } else {
                    card.style.display = "none";
                }
            });

            // Tampilkan pesan jika nama tidak cocok
            if (noResult) {
                noResult.style.display = (matches === 0) ? "block" : "none";
            }
        });
    }
});
