// document.addEventListener("DOMContentLoaded", () => {
//   const runPayrollBtn = document.getElementById("runPayrollBtn");

//   if (runPayrollBtn) {
//     runPayrollBtn.addEventListener("click", () => {
//       alert("Tombol Run Payroll diklik! Siap dihubungkan ke API Node.js.");
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let currentSlideIndex = 0;
  let autoPlayTimer = null;

  const runPayrollBtn = document.getElementById("runPayrollBtn");
  const homeBtn = document.getElementById("homeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const footer = document.querySelector("footer");
  const resetBtn = document.getElementById("resetBtn");
  const logo = document.querySelector(".logo-img");

  // --- FUNGI PENGATUR VISIBILITAS TOMBOL NAVIGASI ---
  function updateNavigationVisibility(index) {
    if (!homeBtn || !prevBtn || !nextBtn) return;

    // Halaman 1 (Index 0): Tanpa Home, Tanpa Left Arrow, Tanpa Right Arrow
    if (index === 0) {
      homeBtn.style.display = "none";
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
    // Halaman 2 (Index 1): Ada Home, Tanpa Left Arrow, Ada Right Arrow
    else if (index === 1) {
      homeBtn.style.display = "flex";
      prevBtn.style.display = "none";
      nextBtn.style.display = "block";
      footer.style.display = "none";
    }
    // Halaman Terakhir / Slide 10 (Index totalSlides - 1): Ada Home, Ada Left Arrow, Tanpa Right Arrow
    else if (index === totalSlides - 1) {
      homeBtn.style.display = "flex";
      prevBtn.style.display = "block";
      nextBtn.style.display = "none";
      footer.style.display = "none";
    }
    // else if (index === 5) {
    //   logo.style.display = "none";
    // }
    // Halaman 3 sampai 9: Ada Semua Navigasi (Home, Left Arrow, Right Arrow)
    else {
      homeBtn.style.display = "flex";
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
      footer.style.display = "none";
      logo.style.display = "block";
    }
  }

  // Switch Slide Function
  // function goToSlide(index) {
  //   slides.forEach((s) => s.classList.remove("active"));
  //   currentSlideIndex = index;
  //   slides[currentSlideIndex].classList.add("active");

  //   // Perbarui Tampilan Tombol Navigasi
  //   updateNavigationVisibility(currentSlideIndex);

  //   // Animasi Khusus Slide 2
  //   if (currentSlideIndex === 1) {
  //     animateCounter("totalPayrollText", 0, 13000000, 1500);
  //   }

  //   // Animasi Khusus Slide 3 (Contoh)
  //   if (currentSlideIndex === 2) {
  //     animatePercentage("progressText", 0, 100, 2000);
  //   }
  // }

  function slide6Helper() {
    const logo = document.querySelector(".logo-img");
    const slide6Video = document.querySelector("#slide-6 video");

    logo.style.display = "block";

    if (slide6Video) {
      // const startTime = 0.5; // Mulai dari detik 0.5
      const endTime = 12; // Berakhir pada detik 12.015 (12s + 15ms)

      slide6Video.loop = false;
      slide6Video.currentTime = 0; // Set posisi waktu awal

      // Paksa video memutar
      slide6Video.play().catch(() => {});

      // Pantau pergerakan durasi video
      slide6Video.ontimeupdate = () => {
        // Jika waktu video mencapai atau melewati endTime
        if (slide6Video.currentTime >= endTime) {
          slide6Video.ontimeupdate = null; // Hapus event listener
          slide6Video.pause(); // Hentikan video

          if (currentSlideIndex === 5) {
            goToSlide(6); // Pindah otomatis ke Slide 7 (Index 6)
            logo.style.display = "block";
            startAutoPlay();
          }
        }
      };
    }
  }

  function goToSlide(index) {
    // 1. Sembunyikan seluruh slide
    slides.forEach((s) => s.classList.remove("active"));

    // 2. Aktifkan slide saat ini
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add("active");

    if (currentSlideIndex === 0) {
      slides[currentSlideIndex].style.background =
        "linear-gradient(180deg, #BC3535 38%, #561818 100%)";
    } else {
      slides[currentSlideIndex].style.background = "#b8282b";
    }

    // 3. Update tombol navigasi
    updateNavigationVisibility(currentSlideIndex);

    // 4. Jalankan animasi Slide 4 (Index 3)
    if (currentSlideIndex === 3) {
      triggerSlide4Animation();
    }

    // 5. Penanganan Khusus Slide 6 (Index 5)
    // Penanganan Khusus Slide 6 (Index 5)
    if (currentSlideIndex === 5) {
      // Hentikan timer autoPlay reguler
      clearInterval(autoPlayTimer);

      slide6Helper();
    } else if (currentSlideIndex !== 0 && currentSlideIndex !== 5) {
      startAutoPlay();
    }
  }

  // Animasi Count-Up Angka Rupiah
  function animateCounter(elementId, start, end, duration) {
    const obj = document.getElementById(elementId);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      obj.innerHTML = "Rp" + value.toLocaleString("id-ID");
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Animasi Persentase
  function animatePercentage(elementId, start, end, duration) {
    const obj = document.getElementById(elementId);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      obj.innerHTML = value + "%";
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Auto-Play Timer
  function startAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
      if (currentSlideIndex < totalSlides - 1) {
        goToSlide(currentSlideIndex + 1);
      } else {
        clearInterval(autoPlayTimer);
      }
    }, 3000); // Otomatis berpindah setiap 3 detik
  }

  // Set tampilan navigasi awal untuk Slide 1
  updateNavigationVisibility(0);

  // Event Listeners
  if (runPayrollBtn) {
    runPayrollBtn.addEventListener("click", () => {
      goToSlide(1); // Langsung berpindah ke Slide 2
      startAutoPlay(); // Mulai auto-play
    });
  }

  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      clearInterval(autoPlayTimer);
      goToSlide(0); // Kembali ke Home (Slide 1)
      footer.style.display = "block"; // Tampilkan footer saat kembali ke Home
    });
  }

  // Tombol Reset (Slide Terakhir)
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      clearInterval(autoPlayTimer);
      goToSlide(0); // Kembali ke Slide 1
      footer.style.display = "block"; // Tampilkan footer saat kembali ke Home
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(autoPlayTimer);
      if (currentSlideIndex > 0) {
        goToSlide(currentSlideIndex - 1); // goToSlide akan otomatis memanggil slide6Helper() jika masuk ke index 5
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(autoPlayTimer);
      if (currentSlideIndex < totalSlides - 1) {
        goToSlide(currentSlideIndex + 1); // goToSlide akan otomatis memanggil slide6Helper() jika masuk ke index 5
      }
    });
  }

  // Slide 4
  // Panggil fungsi ini ketika pindah/masuk ke Slide 4
  function triggerSlide4Animation() {
    const percentText = document.getElementById("payrollPercentText");
    const circleBar = document.getElementById("payrollProgressCircle");

    if (!percentText || !circleBar) return;

    const targetPercent = 100;
    const duration = 2000; // Durasi berjalan 2 detik
    const circumference = 326.72; // Keliling r=52
    let startTimestamp = null;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Hitung persentase berjalan
      const currentPercent = Math.floor(progress * targetPercent);
      percentText.innerText = `${currentPercent}%`;

      // Hitung lingkar lingkaran berjalan
      const offset =
        circumference - ((progress * targetPercent) / 100) * circumference;
      circleBar.style.strokeDashoffset = offset;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    // Reset awal
    circleBar.style.strokeDashoffset = circumference;
    percentText.innerText = "0%";

    // Jalankan animasi
    window.requestAnimationFrame(step);
  }

  // CONTOH INTEGRASI DENGAN SLIDE SWITCHER KAMU:
  // Panggil triggerSlide4Animation() begitu slide 4 mendapatkan kelas '.active'
  if (currentSlideIndex === 3) {
    // Index 3 = Slide 4
    triggerSlide4Animation();
  }
});
