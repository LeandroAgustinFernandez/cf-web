// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// "Ver más" buttons scroll to detail (only on servicios page)
document.querySelectorAll('.servicio-chip').forEach(chip => {
  const btn = chip.querySelector('.btn-ver-mas');
  const target = chip.getAttribute('data-target');
  if (btn && target) {
    btn.addEventListener('click', () => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // el.style.boxShadow = '0 0 0 3px #097AAC';
        setTimeout(() => { el.style.boxShadow = ''; }, 1500);
      }
    });
  }
});
