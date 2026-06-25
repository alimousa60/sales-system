const CACHE_NAME = 'sales-system-v5';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/sales-system.html',
  '/styles.css',
  '/manifest.json',
  '/js/i18n.js',
  '/js/db.js',
  '/js/ui.js',
  '/js/inventory.js',
  '/js/sales.js',
  '/js/purchases.js',
  '/js/reports.js',
  '/js/reports-erp.js',
  '/js/charts.js',
  '/js/hrm.js',
  '/js/excel-export.js',
  '/js/main.js',
  '/js/realtime.js',
  '/js/notify.js',
  '/js/barcode-settings.js',
  '/js/customize-page.js'
];

const CDN_ASSETS = [
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js',
  'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([...STATIC_ASSETS, ...CDN_ASSETS]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok && (request.url.includes('/auth/login') || request.url.includes('/companies'))) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then(cached => {
          if (cached) return cached;
          return new Response(JSON.stringify({ error: 'offline' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        }))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        event.waitUntil(
          fetch(request).then(response => {
            if (response.ok) {
              caches.open(CACHE_NAME).then(cache => cache.put(request, response));
            }
          }).catch(() => {})
        );
        return cached;
      }
      return fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('', { status: 408 });
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
