/* =============================================================
   Tutors @ Zwartkop — Main JavaScript
   ============================================================= */

/* =============================================================
   Bootstrap
   Partials (nav + footer) are now injected synchronously by
   js/partials.js — a blocking script loaded in every page
   immediately after the navbar placeholder div. By the time
   DOMContentLoaded fires here, the nav is already in the DOM.
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initHeroAnimation();
  registerServiceWorker();

  if (document.querySelector('.gallery-grid')) {
    initGallery();
  }
});

/* =============================================================
   Navigation
   ============================================================= */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');

  if (!navbar) return; // partial may not have loaded yet (file://)

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      }
    });
  }

  // Highlight the current page's nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* =============================================================
   Hero background zoom on load
   ============================================================= */
function initHeroAnimation() {
  const hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(() => hero.classList.add('loaded'));
}

/* =============================================================
   Scroll-triggered Fade-up Animations
   ============================================================= */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* =============================================================
   View Transition API — smooth cross-page navigation
   Gracefully degrades in Firefox / older Safari (instant navigation)
   ============================================================= */
(function initViewTransitions() {
  if (!document.startViewTransition) return;

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');

    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel') ||
      anchor.hasAttribute('target') ||
      anchor.hasAttribute('download')
    ) return;

    if (!href.endsWith('.html') && href !== '' && href !== '/') return;

    e.preventDefault();
    document.startViewTransition(() => {
      window.location.href = href;
    });
  });
})();

/* =============================================================
   Gallery — Filtering + Lightbox
   ============================================================= */
function initGallery() {
  initGalleryFilter();
  initLightbox();
}

function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items      = document.querySelectorAll('.gallery-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      items.forEach(item => {
        item.classList.toggle('hidden', category !== 'all' && item.dataset.category !== category);
      });
    });
  });
}

/* =============================================================
   Lightbox
   ============================================================= */
function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn    = document.getElementById('lightbox-close');
  const prevBtn     = document.getElementById('lightbox-prev');
  const nextBtn     = document.getElementById('lightbox-next');
  const caption     = document.getElementById('lightbox-caption');
  const counter     = document.getElementById('lightbox-counter');

  if (!lightbox) return;

  let currentItems = [];
  let currentIndex = 0;

  const getVisibleItems = () =>
    Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));

  function openLightbox(index) {
    currentItems = getVisibleItems();
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function showImage(index) {
    const item  = currentItems[index];
    const img   = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (caption) caption.textContent = item.dataset.label || item.dataset.category || '';
    if (counter) counter.textContent = `${index + 1} / ${currentItems.length}`;
  }

  const prev = () => { currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length; showImage(currentIndex); };
  const next = () => { currentIndex = (currentIndex + 1) % currentItems.length; showImage(currentIndex); };

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = getVisibleItems().indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn)  prevBtn.addEventListener('click', prev);
  if (nextBtn)  nextBtn.addEventListener('click', next);

  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });
}

/* =============================================================
   Service Worker Registration
   ============================================================= */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
