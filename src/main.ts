import './style.css'

// Simple Scroll Animation Observer
const observerOptions = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Fade in hero text on load
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  if (hero) {
    hero.style.opacity = '1';
    hero.classList.add('visible');
  }

  // --- Expiry Notice Handling (お知らせの自動非表示) ---
  const expiryElements = document.querySelectorAll<HTMLElement>('[data-expiry-date]');
  const now = new Date();
  expiryElements.forEach(el => {
    const expiryStr = el.getAttribute('data-expiry-date');
    if (expiryStr) {
      const expiryDate = new Date(expiryStr);
      if (now >= expiryDate) {
        el.style.display = 'none';
      }
    }
  });

  // --- Directions Slideshow ---
  const slideshowEl = document.getElementById('directions-slideshow');
  if (!slideshowEl) return;

  const slides = slideshowEl.querySelectorAll<HTMLElement>('.slide');
  const indicators = slideshowEl.querySelectorAll<HTMLElement>('.slide-indicator');
  const counterCurrent = document.getElementById('slide-current');
  const prevBtn = slideshowEl.querySelector<HTMLButtonElement>('.slide-btn.prev');
  const nextBtn = slideshowEl.querySelector<HTMLButtonElement>('.slide-btn.next');
  let current = 0;

  function goTo(index: number) {
    slides[current].classList.remove('active');
    indicators[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    indicators[current].classList.add('active');
    if (counterCurrent) counterCurrent.textContent = String(current + 1);
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  indicators.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.dataset.index);
      if (!isNaN(idx)) goTo(idx);
    });
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const viewport = slideshowEl.querySelector('.slideshow-viewport');

  viewport?.addEventListener('touchstart', (e) => {
    touchStartX = (e as TouchEvent).changedTouches[0].screenX;
  }, { passive: true });

  viewport?.addEventListener('touchend', (e) => {
    touchEndX = (e as TouchEvent).changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
    }
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
});
