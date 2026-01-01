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
});
