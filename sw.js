/* =============================================================
   Tutors @ Zwartkop — Service Worker
   Strategy:
     • Shell assets (HTML, CSS, JS, fonts, logos) → Cache-first, update in bg
     • Images → Cache-first (long-lived, served from images-cache)
     • External (Google Maps iframe, Google Calendar) → Network only
   ============================================================= */

const SHELL_CACHE  = 'tz-shell-v4';
const IMAGES_CACHE = 'tz-images-v1';

// Assets to pre-cache on install (the "app shell")
// Extensionless URLs — server rewrites /about to about.html
const SHELL_ASSETS = [
  '/',
  '/about',
  '/academics',
  '/admissions',
  '/contact',
  '/calendar',
  '/gallery',
  '/style.css',
  '/js/main.js',
  '/js/partials.js',
  // Partial HTML files — kept as source of truth for reference
  '/partials/navbar.html',
  '/partials/footer.html',
  // Favicon
  '/favicon.svg',
  // Fonts
  '/assets/fonts/Blogh/Blogh.otf',
  '/assets/fonts/Quicksand/Quicksand-VariableFont_wght.ttf',
  // Logos used in nav + footer (all pages)
  '/assets/logos/new/new_logo.webp',
  '/assets/logos/new/new_logo2.webp',
  '/assets/logos/new/logo_new_slogans.webp',
];

/* --- Install: pre-cache the app shell --- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache => cache.addAll(SHELL_ASSETS))
  );
  // Activate immediately rather than waiting for existing tabs to close
  self.skipWaiting();
});

/* --- Activate: clean up stale caches from old versions --- */
self.addEventListener('activate', (event) => {
  const validCaches = [SHELL_CACHE, IMAGES_CACHE];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => !validCaches.includes(key))
          .map(key => caches.delete(key))
      )
    )
  );
  // Take control of all open clients immediately
  self.clients.claim();
});

/* --- Fetch: serve requests intelligently --- */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests (maps embed, calendar iframe, etc.)
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;

  // --- Images: cache-first, store on miss ---
  if (
    path.match(/\.(webp|jpeg|jpg|png|gif|svg)$/i) &&
    path.startsWith('/assets/images/')
  ) {
    event.respondWith(cacheFirstImage(request));
    return;
  }

  // --- Shell assets (HTML, CSS, JS, fonts, logos): stale-while-revalidate ---
  event.respondWith(staleWhileRevalidate(request));
});

/* =============================================================
   Strategy: Cache-first for images
   Serve from cache instantly; if not cached, fetch and store.
   ============================================================= */
async function cacheFirstImage(request) {
  const cache    = await caches.open(IMAGES_CACHE);
  const cached   = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Offline and not cached — return empty 204 so img doesn't break layout
    return new Response('', { status: 204 });
  }
}

/* =============================================================
   Strategy: Stale-while-revalidate for shell assets
   Serve from cache immediately (fast), update cache in background.
   On first visit (no cache), falls through to network.
   ============================================================= */
async function staleWhileRevalidate(request) {
  const cache  = await caches.open(SHELL_CACHE);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then(response => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || (await networkFetch) || new Response('Offline', { status: 503 });
}
