/* ============================================================
   ΤΑΒΕΡΝΑ Ο ΓΙΑΝΝΗΣ — Main JavaScript
   ============================================================ */

/* === LANGUAGE SYSTEM === */

let currentLang = localStorage.getItem('taverna-lang') || 'el';

function setLanguage(lang) {
  currentLang = lang;

  // Update all text nodes that have data-el / data-en
  document.querySelectorAll('[data-el]').forEach(el => {
    const text = el.dataset[lang];
    if (text !== undefined) el.textContent = text;
  });

  // Update placeholder attributes on inputs / textareas
  document.querySelectorAll('[data-placeholder-el]').forEach(el => {
    const ph = lang === 'el' ? el.dataset.placeholderEl : el.dataset.placeholderEn;
    if (ph) el.setAttribute('placeholder', ph);
  });

  // Persist choice
  localStorage.setItem('taverna-lang', lang);

  // Update toggle button label (show the OTHER language)
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'el' ? 'EN' : 'ΕΛ';

  // Update <html lang>
  document.documentElement.lang = lang === 'el' ? 'el' : 'en';

  // Update page <title>
  const titleEl = document.querySelector('title[data-el]');
  if (titleEl) document.title = titleEl.dataset[lang] || document.title;
}

function toggleLanguage() {
  setLanguage(currentLang === 'el' ? 'en' : 'el');
}

/* === NAVBAR SCROLL EFFECT === */

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* === HAMBURGER / MOBILE NAV === */

function initHamburger() {
  const btn      = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('active');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close when a link is tapped
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !mobileNav.contains(e.target)) {
      btn.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* === ACTIVE NAV LINK === */

function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* === SCROLL-REVEAL ANIMATIONS === */

function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('in-view');
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* === CONTACT FORM === */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const origText = btn.textContent;

    btn.textContent = currentLang === 'el' ? '✓ Εστάλη!' : '✓ Sent!';
    btn.style.background = '#5A9A4A';
    btn.style.borderColor = '#5A9A4A';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = origText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* === INIT === */

document.addEventListener('DOMContentLoaded', () => {
  // Language (must run first so text is correct immediately)
  setLanguage(currentLang);

  // Wire up toggle button
  document.getElementById('lang-toggle')?.addEventListener('click', toggleLanguage);

  // Navbar
  initNavbarScroll();

  // Hamburger
  initHamburger();

  // Active link
  setActiveNavLink();

  // Scroll animations
  initScrollReveal();

  // Contact form
  initContactForm();
});
