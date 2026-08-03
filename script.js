// Mobile menu toggle
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// "Ver más" buttons scroll to detail (only on servicios page)
function initServicioChips() {
  document.querySelectorAll('.servicio-chip').forEach(chip => {
    const btn = chip.querySelector('.btn-ver-mas');
    const target = chip.getAttribute('data-target');
    if (!btn || !target) return;

    btn.addEventListener('click', () => {
      const el = document.getElementById(target);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => { el.style.boxShadow = ''; }, 1500);
    });
  });
}

function init() {
  initMobileMenu();
  initServicioChips();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }
}

if (typeof globalThis !== 'undefined') {
  globalThis.CFWeb = { init, initMobileMenu, initServicioChips };
}
