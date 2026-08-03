// Utilidades compartidas
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const onClick = (el, handler) => el && el.addEventListener('click', handler);

// Menú mobile: abre/cierra y se cierra al navegar
const initNavToggle = () => {
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');
  if (!navToggle || !navLinks) return;

  onClick(navToggle, () => navLinks.classList.toggle('open'));
  $$('.nav-link', navLinks).forEach(link => {
    onClick(link, () => navLinks.classList.remove('open'));
  });
};

// Botones "Ver más": desplazan hasta el detalle del servicio (solo en servicios)
const initServiceChips = () => {
  $$('.servicio-chip').forEach(chip => {
    const target = $(`#${chip.dataset.target}`);
    if (!target) return;
    onClick($('.btn-ver-mas', chip), () => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
};

initNavToggle();
initServiceChips();
