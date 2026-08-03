import { beforeAll, beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

let CFWeb;

beforeAll(async () => {
  await import('../script.js');
  CFWeb = globalThis.CFWeb;
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = '';
});

function renderNav({ links = ['index.html', 'servicios.html'] } = {}) {
  document.body.innerHTML = `
    <button id="navToggle"></button>
    <nav id="navLinks">
      ${links.map(href => `<a class="nav-link" href="${href}"></a>`).join('')}
    </nav>
  `;
  return {
    toggle: document.getElementById('navToggle'),
    nav: document.getElementById('navLinks')
  };
}

function renderChip({ target = 'detalle', withButton = true, withTarget = true, withDetail = true } = {}) {
  document.body.innerHTML = `
    <div class="servicio-chip" ${withTarget ? `data-target="${target}"` : ''}>
      ${withButton ? '<button class="btn-ver-mas"></button>' : ''}
    </div>
    ${withDetail ? `<div id="${target}"></div>` : ''}
  `;
  return {
    btn: document.querySelector('.btn-ver-mas'),
    detail: document.getElementById(target)
  };
}

describe('initMobileMenu', () => {
  it('toggles the open class on the nav when the toggle is clicked', () => {
    const { toggle, nav } = renderNav();
    CFWeb.initMobileMenu();

    toggle.click();
    expect(nav.classList.contains('open')).toBe(true);

    toggle.click();
    expect(nav.classList.contains('open')).toBe(false);
  });

  it('closes the open menu when a nav link is clicked', () => {
    const { toggle, nav } = renderNav();
    CFWeb.initMobileMenu();

    toggle.click();
    expect(nav.classList.contains('open')).toBe(true);

    nav.querySelectorAll('.nav-link')[1].click();
    expect(nav.classList.contains('open')).toBe(false);
  });

  it('keeps the menu closed when a nav link is clicked on a closed menu', () => {
    const { nav } = renderNav();
    CFWeb.initMobileMenu();

    nav.querySelector('.nav-link').click();
    expect(nav.classList.contains('open')).toBe(false);
  });

  it('does nothing when the nav elements are missing', () => {
    document.body.innerHTML = '<button id="navToggle"></button>';
    expect(() => CFWeb.initMobileMenu()).not.toThrow();

    document.body.innerHTML = '<nav id="navLinks"></nav>';
    expect(() => CFWeb.initMobileMenu()).not.toThrow();
  });
});

describe('initServicioChips', () => {
  it('scrolls the targeted detail into view when "ver mas" is clicked', () => {
    const { btn, detail } = renderChip();
    const scrollIntoView = vi.fn();
    detail.scrollIntoView = scrollIntoView;
    CFWeb.initServicioChips();

    btn.click();

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
  });

  it('clears the inline box shadow of the detail after the highlight delay', () => {
    const { btn, detail } = renderChip();
    detail.scrollIntoView = vi.fn();
    detail.style.boxShadow = '0 0 0 3px #097AAC';
    CFWeb.initServicioChips();

    btn.click();
    expect(detail.style.boxShadow).toBe('0 0 0 3px #097AAC');

    vi.advanceTimersByTime(1500);
    expect(detail.style.boxShadow).toBe('');
  });

  it('ignores chips without a button or without a data-target', () => {
    renderChip({ withButton: false });
    expect(() => CFWeb.initServicioChips()).not.toThrow();

    const { btn } = renderChip({ withTarget: false });
    CFWeb.initServicioChips();
    expect(() => btn.click()).not.toThrow();
  });

  it('does nothing when the target element does not exist', () => {
    const { btn } = renderChip({ withDetail: false });
    CFWeb.initServicioChips();

    btn.click();
    expect(() => vi.advanceTimersByTime(1500)).not.toThrow();
  });
});

describe('init', () => {
  it('wires up both the mobile menu and the servicio chips', () => {
    document.body.innerHTML = `
      <button id="navToggle"></button>
      <nav id="navLinks"><a class="nav-link" href="#"></a></nav>
      <div class="servicio-chip" data-target="detalle">
        <button class="btn-ver-mas"></button>
      </div>
      <div id="detalle"></div>
    `;
    const detail = document.getElementById('detalle');
    detail.scrollIntoView = vi.fn();
    CFWeb.init();

    document.getElementById('navToggle').click();
    expect(document.getElementById('navLinks').classList.contains('open')).toBe(true);

    document.querySelector('.btn-ver-mas').click();
    expect(detail.scrollIntoView).toHaveBeenCalled();
  });

  it('does not throw when initialised against an empty document', () => {
    expect(() => CFWeb.init()).not.toThrow();
  });
});
