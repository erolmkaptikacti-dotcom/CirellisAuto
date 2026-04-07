// ─── MOBILE MENU ─────────────────────────────────────────────────────────────
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open', !isOpen);
  hamburger.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ─── NAV SCROLL EFFECT ───────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── REVEAL ON SCROLL ────────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ─── SMOOTH ANCHOR SCROLL ────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
