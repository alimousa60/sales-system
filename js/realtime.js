/* ═══════════════════════════════════════════════
   REAL-TIME SYNC (WebSocket + Auto-refresh)
═══════════════════════════════════════════════ */
let _ws = null;
let _wsReconnectTimer = null;
let _wsConnected = false;

function connectRealtime() {
  if (_ws && (_ws.readyState === WebSocket.OPEN || _ws.readyState === WebSocket.CONNECTING)) return;
  try {
    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = `${proto}//${window.location.host}`;
    _ws = new WebSocket(url);

    _ws.onopen = () => {
      _wsConnected = true;
      console.log('[Realtime] WebSocket connected');
      if (_wsReconnectTimer) { clearTimeout(_wsReconnectTimer); _wsReconnectTimer = null; }
      const el = G('realtime-status');
      if (el) { el.style.display = 'inline-block'; el.title = 'متصل بالتحديث الفوري'; }
    };

    _ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        handleRealtimeMessage(msg);
      } catch (e) { console.warn('[Realtime] parse error', e); }
    };

    _ws.onclose = () => {
      _wsConnected = false;
      console.log('[Realtime] disconnected, reconnecting in 5s...');
      const el = G('realtime-status');
      if (el) { el.style.display = 'inline-block'; el.title = 'غير متصل'; }
      _wsReconnectTimer = setTimeout(connectRealtime, 5000);
    };

    _ws.onerror = (err) => {
      console.warn('[Realtime] error', err);
    };
  } catch (e) {
    console.warn('[Realtime] connect failed', e);
    _wsReconnectTimer = setTimeout(connectRealtime, 5000);
  }
}

function broadcastChange(section, data) {
  if (!currentUser) return;
  authenticatedFetch('/api/v1/sync/broadcast', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'data-change', section, data })
  }).catch(() => {});
}

function handleRealtimeMessage(msg) {
  if (!msg || !msg.section) return;
  // Ignore own messages
  if (msg.userId && currentUser && msg.userId === currentUser.id) return;

  console.log('[Realtime] received:', msg.section, msg.type);

  switch (msg.section) {
    case 'items':
      renderItems(); updateStats();
      break;
    case 'customers':
      renderCusts(); updateStats();
      break;
    case 'suppliers':
      renderSups();
      break;
    case 'sales':
      renderSales(); updateStats(); renderFin();
      break;
    case 'purchases':
      renderPurs(); updateStats(); renderFin();
      break;
    case 'payments':
      renderSales(); updateStats(); renderFin();
      break;
    case 'returns':
      renderRets(); renderItems(); updateStats();
      break;
    case 'settlements':
      renderSales(); renderSettleLog(); updateStats();
      break;
    case 'users':
      renderUsers();
      break;
    case 'company':
      renderCompany();
      break;
    case 'hrm':
      renderHRM();
      break;
    case 'all':
      refreshCurrentPage();
      break;
    default:
      refreshCurrentPage();
  }

  toast('تم تحديث البيانات من خادم آخر', 'sync', {
    title: 'تحديث فوري',
    icon: 'ti-refresh',
    sound: false,
    duration: 2500
  });
}

// refreshCurrentPage() is defined in inventory.js (canonical version)
// Auto-connect on login
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(connectRealtime, 1000);
});

// Page visibility change: reconnect if needed
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && !_wsConnected) {
    setTimeout(connectRealtime, 500);
  }
});
