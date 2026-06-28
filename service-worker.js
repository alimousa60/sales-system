const CACHE_NAME = 'sales-system-v7';
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
  '/js/invoice-settings.js',
  '/js/realtime.js',
  '/js/notify.js',
  '/js/barcode-settings.js',
  '/js/barcode-scanner.js',
  '/js/expenses.js',
  '/js/customize-page.js',
  '/js/ux.js'
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

/* ═══ OFFLINE MUTATION QUEUE ═══ */
const QUEUE_DB = 'offline-sync-queue';
const QUEUE_STORE = 'mutations';

function openQueueDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(QUEUE_DB, 1);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(QUEUE_STORE)) {
        db.createObjectStore(QUEUE_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function queueMutation(request, body) {
  try {
    const db = await openQueueDB();
    const tx = db.transaction(QUEUE_STORE, 'readwrite');
    tx.objectStore(QUEUE_STORE).add({
      url: request.url,
      method: request.method,
      body: body,
      headers: { 'Authorization': request.headers.get('Authorization') },
      timestamp: Date.now()
    });
  } catch (e) {}
}

async function replayQueue() {
  try {
    const db = await openQueueDB();
    const tx = db.transaction(QUEUE_STORE, 'readwrite');
    const store = tx.objectStore(QUEUE_STORE);
    const all = await new Promise((res, rej) => {
      const req = store.getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
    for (const item of all) {
      try {
        await fetch(item.url, {
          method: item.method,
          headers: { 'Content-Type': 'application/json', ...item.headers },
          body: item.body
        });
        store.delete(item.id);
      } catch (e) { break; }
    }
  } catch (e) {}
}

/* ═══ FETCH HANDLER ═══ */
self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') {
    if (request.url.includes('/api/')) {
      event.respondWith(
        fetch(request.clone()).catch(async () => {
          const body = await request.clone().text().catch(() => null);
          await queueMutation(request, body);
          return new Response(JSON.stringify({ queued: true, message: 'offline_queued' }), {
            status: 202,
            headers: { 'Content-Type': 'application/json' }
          });
        })
      );
      return;
    }
    return;
  }

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

/* ═══ MESSAGE HANDLER ═══ */
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  if (event.data === 'replay-queue') {
    replayQueue();
  }
  if (event.data?.type === 'online') {
    replayQueue();
  }
});

/* ═══ ONLINE DETECTION ═══ */
self.addEventListener('online', () => {
  replayQueue();
  self.clients.matchAll().then(clients => {
    clients.forEach(c => c.postMessage({ type: 'synced' }));
  });
});
