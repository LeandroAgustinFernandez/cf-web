// Runs an initialization step in isolation so a failure in one feature
// does not prevent the remaining features from being set up.
function initFeature(name, init) {
  try {
    init();
  } catch (error) {
    console.error(`[cf-web] No se pudo inicializar "${name}":`, error);
  }
}

// Mobile menu toggle
initFeature('menú móvil', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navToggle || !navLinks) {
    console.warn('[cf-web] Falta #navToggle o #navLinks: el menú móvil queda deshabilitado.');
    return;
  }

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
});

// "Ver más" buttons scroll to detail (only on servicios page)
initFeature('botones "Ver más"', () => {
  document.querySelectorAll('.servicio-chip').forEach(chip => {
    const btn = chip.querySelector('.btn-ver-mas');
    const target = chip.getAttribute('data-target');

    if (!btn || !target) {
      console.warn('[cf-web] Chip de servicio sin botón .btn-ver-mas o sin data-target:', chip);
      return;
    }

    btn.addEventListener('click', () => {
      const el = document.getElementById(target);
      if (!el) {
        console.warn(`[cf-web] No existe el detalle con id "${target}" referenciado por data-target.`);
        return;
      }

      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => { el.style.boxShadow = ''; }, 1500);
    });
  });
});
