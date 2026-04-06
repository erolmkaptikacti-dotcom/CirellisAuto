// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button, .service-card, .review-card, .stat-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    ring.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    ring.classList.remove('hover');
  });
});

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

// ─── BOOKING FORM SUBMIT ─────────────────────────────────────────────────────
const formSubmit = document.querySelector('.form-submit');
if (formSubmit) {
  formSubmit.addEventListener('click', function () {
    this.textContent = 'Sending...';
    setTimeout(() => {
      this.textContent = 'Request Sent ✓';
    }, 1000);
  });
}
