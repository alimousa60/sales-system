const CACHE_NAME = 'sales-system-v2';
const STATIC_ASSETS = [
  '/',
  '/sales-system.html',
  '/styles.css',
  '/js/db.js',
  '/js/ui.js',
  '/js/inventory.js',
  '/js/sales.js',
  '/js/purchases.js',
  '/js/reports.js',
  '/js/charts.js',
  '/js/hrm.js',
  '/js/excel-export.js',
  '/js/main.js',
  '/js/realtime.js',
  '/js/notify.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
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
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match(event.request))
    );
  }
});
