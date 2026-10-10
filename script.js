document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. ANIMASI KETIK (TYPEWRITER EFFECT)
     ========================================== */
  const typedElement = document.querySelector('.typed');
  
  if (typedElement) {
    // Mengambil kata-kata dari atribut data-typed-items di HTML
    let typedItems = typedElement.getAttribute('data-typed-items').split(',');
    let itemIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = typedItems[itemIndex].trim();

      if (isDeleting) {
        // Mencegah karakter terhapus sampai minus
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100; // Kecepatan menghapus vs mengetik

      // Jika kata sudah selesai diketik
      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000; // Tahan selama 2 detik
        isDeleting = true;
      } 
      // Jika kata selesai dihapus
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        itemIndex = (itemIndex + 1) % typedItems.length; // Lanjut ke kata berikutnya
        speed = 500; // Jeda sebelum mulai mengetik lagi
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  /* ==========================================
     2. SOROT MENU NAVIGASI SAAT SCROLL
     ========================================== */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function activeMenuOnScroll() {
    let scrollPosition = window.scrollY + 200; // Offset posisi scroll

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', activeMenuOnScroll);

  /* ==========================================
     3. TOGGLE SIDEBAR UNTUK LAYAR MOBILE
     ========================================== */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-active');
      mobileNavToggle.classList.toggle('fa-bars');
      mobileNavToggle.classList.toggle('fa-xmark'); // Ubah ikon ke 'X' saat terbuka
    });
  }

  /* Tutup menu mobile ketika salah satu link diklik */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        document.body.classList.remove('mobile-nav-active');
        mobileNavToggle.classList.add('fa-bars');
        mobileNavToggle.classList.remove('fa-xmark');
      }
    });
  });

});