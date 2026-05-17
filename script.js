// 110SPORTS Global JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    // Add dynamic close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-nav-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    mobileNav.prepend(closeBtn);
    
    // Add mobile menu logo
    const mobileLogo = document.createElement('div');
    mobileLogo.className = 'mobile-nav-logo';
    mobileLogo.innerHTML = '<img src="photos/logo.png" alt="110SPORTS Logo"><span>110</span>SPORTS';
    // Insert after close button
    closeBtn.after(mobileLogo);

    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll Reveal
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  // Animated Counters
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current.toLocaleString() + suffix;
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // Testimonial Auto-scroll
  const track = document.querySelector('.testimonials-track');
  if (track) {
    let scrollDir = 1;
    setInterval(() => {
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth) scrollDir = -1;
      if (track.scrollLeft <= 0) scrollDir = 1;
      track.scrollBy({ left: 374 * scrollDir, behavior: 'smooth' });
    }, 4000);
  }

  // Exit Intent Popup
  const popup = document.querySelector('.popup-overlay');
  if (popup) {
    let shown = sessionStorage.getItem('popup_shown');
    if (!shown) {
      document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !shown) {
          popup.classList.add('active');
          sessionStorage.setItem('popup_shown', '1');
          shown = true;
        }
      });
    }
    const closeBtn = popup.querySelector('.popup-close');
    if (closeBtn) closeBtn.addEventListener('click', () => popup.classList.remove('active'));
    popup.addEventListener('click', (e) => { if (e.target === popup) popup.classList.remove('active'); });
  }

  // Live Order Notification
  const notification = document.querySelector('.live-notification');
  if (notification) {
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Lucknow', 'Jaipur', 'Ahmedabad', 'Ayodhya'];
    const products = ['Gold Edition Bat', 'Cricket Jersey', 'Pro Edition Bat', 'Track Pants', 'Cricket Shoes', 'Cricket Cap', 'Custom Team Jersey'];
    function showNotification() {
      const city = cities[Math.floor(Math.random() * cities.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      notification.querySelector('p').innerHTML = `Someone from <strong>${city}</strong> just ordered <strong>${product}</strong>`;
      notification.style.display = 'flex';
      setTimeout(() => { notification.style.display = 'none'; }, 4000);
    }
    setTimeout(showNotification, 8000);
    setInterval(showNotification, 25000);
  }

  // Product Image Carousel (for product cards with multiple images)
  document.querySelectorAll('.product-carousel').forEach(carousel => {
    const imgs = carousel.querySelectorAll('img');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let current = 0;
    let autoTimer = null;

    function goTo(idx) {
      imgs[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (idx + imgs.length) % imgs.length;
      imgs[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goTo(current + 1); });
    dots.forEach((dot, i) => dot.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }));

    if (imgs.length > 1) {
      autoTimer = setInterval(() => goTo(current + 1), 4000);
      carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
      carousel.addEventListener('mouseleave', () => { autoTimer = setInterval(() => goTo(current + 1), 4000); });
    }
  });

  // Category Image Carousel (for category cards with multiple images)
  document.querySelectorAll('.category-carousel').forEach(carousel => {
    const imgs = carousel.querySelectorAll('img');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let current = 0;
    let autoTimer = null;

    function goTo(idx) {
      imgs[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (idx + imgs.length) % imgs.length;
      imgs[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goTo(current + 1); });
    dots.forEach((dot, i) => dot.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }));

    if (imgs.length > 1) {
      autoTimer = setInterval(() => goTo(current + 1), 3500);
      carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
      carousel.addEventListener('mouseleave', () => { autoTimer = setInterval(() => goTo(current + 1), 3500); });
    }
  });

  // Product Detail Gallery (for individual product pages)
  const mainImageContainer = document.querySelector('.product-gallery .main-image');
  const mainImage = document.querySelector('.product-gallery .main-image img');
  const thumbs = document.querySelectorAll('.product-gallery .thumb');
  const galleryPrev = document.querySelector('.gallery-nav-btn.prev');
  const galleryNext = document.querySelector('.gallery-nav-btn.next');
  let galleryIndex = 0;

  function galleryGoTo(idx) {
    if (!mainImage || thumbs.length === 0) return;
    galleryIndex = (idx + thumbs.length) % thumbs.length;
    thumbs.forEach(t => t.classList.remove('active'));
    thumbs[galleryIndex].classList.add('active');
    mainImage.src = thumbs[galleryIndex].querySelector('img').src;
    mainImage.alt = thumbs[galleryIndex].querySelector('img').alt;
    // Scroll the active thumb into view
    thumbs[galleryIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  if (mainImageContainer && thumbs.length > 0) {
    // Inject main image slider arrows
    const mainPrev = document.createElement('button');
    mainPrev.className = 'main-gallery-btn prev';
    mainPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    const mainNext = document.createElement('button');
    mainNext.className = 'main-gallery-btn next';
    mainNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
    mainImageContainer.appendChild(mainPrev);
    mainImageContainer.appendChild(mainNext);

    mainPrev.addEventListener('click', () => galleryGoTo(galleryIndex - 1));
    mainNext.addEventListener('click', () => galleryGoTo(galleryIndex + 1));

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => galleryGoTo(i));
    });
    if (galleryPrev) galleryPrev.addEventListener('click', () => galleryGoTo(galleryIndex - 1));
    if (galleryNext) galleryNext.addEventListener('click', () => galleryGoTo(galleryIndex + 1));
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Hero Slider
  const heroSlider = document.getElementById('heroSlider');
  const heroSliderDots = document.getElementById('heroSliderDots');
  if (heroSlider && heroSliderDots) {
    const slides = heroSlider.querySelectorAll('img');
    const dots = heroSliderDots.querySelectorAll('.dot');
    let currentSlide = 0;
    let heroTimer = null;

    function goToSlide(idx) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (idx + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    function startHeroTimer() {
      heroTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(heroTimer);
        goToSlide(i);
        startHeroTimer();
      });
    });

    startHeroTimer();
  }
});
