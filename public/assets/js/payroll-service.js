document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 1;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  // Tombol Next masing-masing slide
  const slide1NextBtn = document.getElementById("slide1NextBtn");
  const slide2NextBtn = document.getElementById("slide2NextBtn");
  const slide3NextBtn = document.getElementById("slide3NextBtn");
  const slide4NextBtn = document.getElementById("slide4NextBtn");
  const slide5NextBtn = document.getElementById("slide5NextBtn");

  function showSlide(slideIndex) {
    // Sembunyikan semua slide
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Tampilkan slide sesuai index
    const targetSlide = document.getElementById(`slide-${slideIndex}`);
    if (targetSlide) {
      targetSlide.classList.add("active");
    }
  }

  // Fungsi untuk maju ke slide berikutnya
  function nextSlide() {
    if (currentSlide < totalSlides) {
      currentSlide++;
    } else {
      currentSlide = 1; // Loop kembali ke slide 1 jika sudah slide terakhir
    }
    showSlide(currentSlide);
  }

  // Event listener tombol Next Slide 1
  if (slide1NextBtn) {
    slide1NextBtn.addEventListener("click", () => {
      nextSlide();
    });
  }

  // Event listener tombol Next Slide 2
  if (slide2NextBtn) {
    slide2NextBtn.addEventListener("click", () => {
      nextSlide();
    });
  }

  // Event listener tombol Next Slide 3
  if (slide3NextBtn) {
    slide3NextBtn.addEventListener("click", () => {
      nextSlide();
    });
  }

  // Event listener tombol Next Slide 4
  if (slide4NextBtn) {
    slide4NextBtn.addEventListener("click", () => {
      nextSlide();
    });
  }

  // Event listener tombol Next Slide 5
  if (slide5NextBtn) {
    slide5NextBtn.addEventListener("click", () => {
      nextSlide();
    });
  }

  // Navigasi menggunakan keyboard (Hanya Panah Kanan)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
});
