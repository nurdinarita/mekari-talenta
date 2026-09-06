document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length; // 6 Slide
  let currentSlideIndex = 0;
  let autoPlayTimer = null;

  const homeBtn = document.getElementById("homeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // --- ATUR VISIBILITAS NAVIGASI ---
  function updateNavigationVisibility(index) {
    if (!homeBtn || !prevBtn || !nextBtn) return;

    if (index === 0) {
      homeBtn.style.display = "flex";
      prevBtn.style.display = "none";
      nextBtn.style.display = "block";
    } else if (index === totalSlides - 1) {
      homeBtn.style.display = "flex";
      homeBtn.setAttribute("title", "Kembali ke Beranda");
      homeBtn.innerHTML = `
        <img
          src="assets/images/home-icon.svg"
          alt="Home"
        />`;

      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      homeBtn.style.display = "flex";
      homeBtn.removeAttribute("title");
      homeBtn.innerHTML = `
        <img 
          src="assets/images/payroll-service/home.png" 
          alt="Home" 
        />`;

      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
  }

  // --- FUNGSI PINDAH SLIDE ---
  function goToSlide(index) {
    // 1. Sembunyikan semua slide
    slides.forEach((s) => s.classList.remove("active"));

    // 2. Aktifkan slide sesuai index
    currentSlideIndex = index;
    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.add("active");
    }

    // 4. Update tampilan tombol
    updateNavigationVisibility(currentSlideIndex);
  }

  // --- FUNGSI AUTOPLAY (LANGSUNG MEMUTAR SLIDE) ---
  function startAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
      if (currentSlideIndex < totalSlides - 1) {
        goToSlide(currentSlideIndex + 1);
      } else {
        clearInterval(autoPlayTimer); // Hentikan di slide terakhir (Slide 6)
      }
    }, 5000); // Perpindahan setiap 3 detik
  }

  // --- EVENT LISTENERS NAVIGASI ---
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(autoPlayTimer);
      if (currentSlideIndex > 0) {
        goToSlide(currentSlideIndex - 1);
        startAutoPlay();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(autoPlayTimer);
      if (currentSlideIndex < totalSlides - 1) {
        goToSlide(currentSlideIndex + 1);
        startAutoPlay();
      }
    });
  }

  // Navigasi Keyboard (Panah Kiri / Kanan)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && nextBtn) {
      nextBtn.click();
    } else if (e.key === "ArrowLeft" && prevBtn) {
      prevBtn.click();
    }
  });

  // LANGSUNG JALANKAN SLIDE 1 DAN AUTOPLAY SAAT HALAMAN DIBUKA
  goToSlide(0);
  startAutoPlay();
});
