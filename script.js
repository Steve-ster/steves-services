document.addEventListener("DOMContentLoaded", () => {
  try {
    // Form submission handling (guarded)
    const form = document.getElementById("quoteForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = (form.name && form.name.value) ? form.name.value.trim() : '';
        const email = (form.email && form.email.value) ? form.email.value.trim() : '';
        const message = (form.message && form.message.value) ? form.message.value.trim() : '';
        const mailtoLink = `mailto:stevensservices10@gmail.com?subject=Quote Request from ${name}&body=${encodeURIComponent(message)}%0A%0AContact Email: ${email}`;
        window.location.href = mailtoLink;
      });
    }

    // Collapsible service packages (guarded)
    const serviceHeaders = document.querySelectorAll('.service-header');
    if (serviceHeaders && serviceHeaders.length) {
      serviceHeaders.forEach(header => {
        header.addEventListener('click', () => {
          const content = header.nextElementSibling;
          const arrow = header.querySelector('.arrow');
          if (content) content.classList.toggle('open');
          if (arrow) arrow.classList.toggle('open');
        });
      });
    }

    // Page navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    function showPage(pageId) {
      if (!pages) return;
      // Hide all pages
      pages.forEach(page => page.classList.remove('active'));
      
      // Show selected page
      const targetPage = document.getElementById(pageId);
      if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
      }

      // Update active nav link
      if (navLinks) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }

    // Handle nav link clicks (guarded)
    if (navLinks && navLinks.length) {
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const pageId = link.getAttribute('data-page') || (link.getAttribute('href') ? link.getAttribute('href').replace('#','') : null);
          if (pageId) {
            showPage(pageId);
            // Update URL hash (this will also trigger hashchange)
            window.location.hash = pageId;
          }
        });
      });
    }

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1) || 'home';
      showPage(hash);
    });

    // Show initial page based on URL hash
    const initialHash = window.location.hash.substring(1) || 'home';
    showPage(initialHash);

    // Carousel functionality
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (carouselContainer && slides.length && prevBtn && nextBtn && indicatorsContainer) {
      let currentIndex = 0;
      
      // Create indicators
      slides.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => showSlide(index));
        indicatorsContainer.appendChild(indicator);
      });
      
      const indicators = document.querySelectorAll('.carousel-indicator');
      
      function showSlide(index) {
        const offset = -index * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;
        
        // Update indicators
        indicators.forEach((indicator, i) => {
          indicator.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
      }
      
      function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      }
      
      function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      }
      
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
      
      // Optional: Add keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      });
    }
  } catch (err) {
    console.error('Error initializing scripts:', err);
  }
})