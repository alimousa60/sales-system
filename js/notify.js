/* ═══════════════════════════════════════════════
   NOTIFICATION SYSTEM — Professional & Interactive
═══════════════════════════════════════════════ */

const _notifyContainer = (() => {
  let el = document.getElementById('notify-container');
  if (!el) {
    el = document.createElement('div');
    el.id = 'notify-container';
    document.body.appendChild(el);
  }
  return el;
})();

let _notifyId = 0;
const _notifyQueue = [];
const MAX_VISIBLE = 5;

const NOTIFY_ICONS = {
  success: 'ti-check',
  error: 'ti-x',
  warning: 'ti-alert-triangle',
  info: 'ti-info-circle',
  confirm: 'ti-help-circle',
  sync: 'ti-refresh',
  delete: 'ti-trash',
  edit: 'ti-pencil',
  add: 'ti-plus',
  cash: 'ti-cash',
  printer: 'ti-printer'
};

const NOTIFY_SOUNDS = {
  success: 'data:audio/wav;base64,UklGRl9vT19teleVBmZm10teleIBAAEARBYAACIWAAABAAgATElTdBoBAAAAFA==',
  error: 'data:audio/wav;base64,UklGRl9vT19teleVBmZm10teleIBAAEARBYAACIWAAABAAgATElTdBoBAAAAFA==',
};

function _playNotifSound(type) {
  try {
    if (type === 'error') {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 300;
      gain.gain.value = 0.1;
      osc.start();
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'success') {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 520;
      gain.gain.value = 0.06;
      osc.start();
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {}
}

function toast(msg, type = 'success', opts = {}) {
  const {
    title = null,
    duration = type === 'error' ? 6000 : 3500,
    actions = [],
    sound = true,
    closable = true,
    progress = true,
    icon = null,
    onClick = null,
    sticky = false
  } = opts;

  const id = ++_notifyId;

  const el = document.createElement('div');
  el.className = `n-item n-${type}`;
  el.dataset.notifyId = id;

  const iconClass = icon || NOTIFY_ICONS[type] || 'ti-info-circle';

  let actionsHtml = '';
  if (actions.length > 0) {
    actionsHtml = `<div class="n-actions">${actions.map((a, i) =>
      `<button class="n-btn ${a.primary ? 'n-btn-primary' : ''} ${a.danger ? 'n-btn-danger' : ''}" data-action="${i}">${a.label}</button>`
    ).join('')}</div>`;
  }

  el.innerHTML = `
    <div class="n-icon-wrap n-icon-${type}">
      <i class="ti ${iconClass}"></i>
    </div>
    <div class="n-content">
      ${title ? `<div class="n-title">${title}</div>` : ''}
      <div class="n-msg">${msg}</div>
      ${actionsHtml}
    </div>
    ${closable ? '<button class="n-close"><i class="ti ti-x"></i></button>' : ''}
    ${progress && !sticky ? '<div class="n-progress"><div class="n-progress-bar" style="animation-duration:' + duration + 'ms"></div></div>' : ''}
  `;

  // Insert at top
  _notifyContainer.prepend(el);

  // Animate in
  requestAnimationFrame(() => el.classList.add('n-show'));

  // Sound
  if (sound) _playNotifSound(type);

  // Close button
  if (closable) {
    el.querySelector('.n-close').addEventListener('click', (e) => {
      e.stopPropagation();
      _dismissNotify(el);
    });
  }

  // Click handler
  if (onClick) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => { onClick(el); _dismissNotify(el); });
  }

  // Action buttons
  el.querySelectorAll('.n-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.action);
      if (actions[idx] && actions[idx].onClick) {
        actions[idx].onClick(el);
      }
      if (actions[idx]?.dismiss !== false) _dismissNotify(el);
    });
  });

  // Auto-dismiss
  let timer;
  if (!sticky) {
    timer = setTimeout(() => _dismissNotify(el), duration);

    // Pause on hover
    el.addEventListener('mouseenter', () => {
      clearTimeout(timer);
      const bar = el.querySelector('.n-progress-bar');
      if (bar) bar.style.animationPlayState = 'paused';
    });

    el.addEventListener('mouseleave', () => {
      const bar = el.querySelector('.n-progress-bar');
      if (bar) bar.style.animationPlayState = 'running';
      timer = setTimeout(() => _dismissNotify(el), 2000);
    });
  }

  // Manage visibility count
  _manageVisible();

  return id;
}

function _dismissNotify(el) {
  if (!el || el._dismissing) return;
  el._dismissing = true;
  el.classList.remove('n-show');
  el.classList.add('n-hide');
  setTimeout(() => el.remove(), 400);
  _manageVisible();
}

function _manageVisible() {
  const items = _notifyContainer.querySelectorAll('.n-item.n-show');
  items.forEach((item, i) => {
    if (i >= MAX_VISIBLE) {
      item.classList.add('n-overflow');
    } else {
      item.classList.remove('n-overflow');
    }
  });
}

function notifySuccess(msg, opts = {}) {
  return toast(msg, 'success', opts);
}

function notifyError(msg, opts = {}) {
  return toast(msg, 'error', opts);
}

function notifyWarning(msg, opts = {}) {
  return toast(msg, 'warning', opts);
}

function notifyInfo(msg, opts = {}) {
  return toast(msg, 'info', opts);
}

function notifySync(msg, opts = {}) {
  return toast(msg, 'sync', { icon: 'ti-refresh', ...opts });
}

function notifyCash(msg, opts = {}) {
  return toast(msg, 'cash', { icon: 'ti-cash', ...opts });
}

function notifyConfirm(msg, opts = {}) {
  return toast(msg, 'confirm', { sticky: true, ...opts });
}

function clearAllNotifications() {
  _notifyContainer.querySelectorAll('.n-item').forEach(el => _dismissNotify(el));
}

function notify(msg, type = 'success', opts = {}) {
  if(typeof type==='object'){opts=type;type='success'}
  return toast(msg, type, opts);
}
