document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. ANIMASI KETIK (TYPEWRITER EFFECT)
     ========================================== */
  const typedElement = document.querySelector('.typed');
  
  if (typedElement) {
    let typedItems = typedElement.getAttribute('data-typed-items').split(',');
    let itemIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = typedItems[itemIndex].trim();

      if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        itemIndex = (itemIndex + 1) % typedItems.length;
        speed = 500;
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
    let scrollPosition = window.scrollY + 200;

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
     3. TOGGLE SIDEBAR & UBAH WARNA IKON SAAT SCROLL
     ========================================== */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const heroSection = document.querySelector('#hero');

  function handleToggleColorOnScroll() {
    if (mobileNavToggle && heroSection) {
      if (window.scrollY >= heroSection.offsetHeight - 50) {
        mobileNavToggle.classList.add('scrolled');
      } else {
        mobileNavToggle.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleToggleColorOnScroll);
  handleToggleColorOnScroll();

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function () {
      document.body.classList.toggle('mobile-nav-active');
      this.classList.toggle('fa-bars');
      this.classList.toggle('fa-xmark');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        document.body.classList.remove('mobile-nav-active');
        if (mobileNavToggle) {
          mobileNavToggle.classList.add('fa-bars');
          mobileNavToggle.classList.remove('fa-xmark');
        }
      }
    });
  });

});