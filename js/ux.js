/* ═══════════════════════════════════════════════
   UX IMPROVEMENTS — تحسينات تجربة المستخدم
═══════════════════════════════════════════════ */

/* 1. BUTTON LOADING STATES */
function setBtnLoading(btn, loading) {
  if (!btn) return;
  if (loading) {
    btn.classList.add('loading');
    btn.setAttribute('aria-busy', 'true');
    btn._origHTML = btn.innerHTML;
    const text = btn.textContent.trim();
    btn.innerHTML = `<i class="ti ti-loader-2"></i> <span class="btn-text">${text}</span>`;
  } else {
    btn.classList.remove('loading');
    btn.removeAttribute('aria-busy');
    if (btn._origHTML) btn.innerHTML = btn._origHTML;
  }
}
function withBtnLoading(fn) {
  return async function(...args) {
    const btn = this || args[0];
    const btnEl = btn?.tagName ? btn : btn?.target?.closest?.('.btn');
    if (btnEl) setBtnLoading(btnEl, true);
    try {
      const result = await fn.apply(this, args);
      return result;
    } finally {
      if (btnEl) setBtnLoading(btnEl, false);
    }
  };
}

/* 2. CUSTOM CONFIRMATION DIALOG */
function confirmAction(opts) {
  return new Promise(resolve => {
    const { title = 'تأكيد', message = 'هل أنت متأكد؟', confirmText = 'تأكيد', cancelText = 'إلغاء', type = 'danger', icon = 'ti-alert-triangle' } = opts;
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="confirm-dialog">
        <div class="confirm-hd">
          <div class="confirm-icon ${type}"><i class="ti ${icon}"></i></div>
          <div class="confirm-title">${title}</div>
        </div>
        <div class="confirm-body">${message}</div>
        <div class="confirm-footer">
          <button class="btn" id="confirm-cancel">${cancelText}</button>
          <button class="btn btn-${type === 'danger' ? 'danger' : type === 'warning' ? '' : 'primary'}" id="confirm-ok">${confirmText}</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.style.opacity = '1');
    const okBtn = overlay.querySelector('#confirm-ok');
    const cancelBtn = overlay.querySelector('#confirm-cancel');
    const close = (val) => { overlay.remove(); resolve(val); };
    okBtn.onclick = () => close(true);
    cancelBtn.onclick = () => close(false);
    overlay.onclick = (e) => { if (e.target === overlay) close(false); };
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') { close(false); document.removeEventListener('keydown', handler); }
      if (e.key === 'Enter') { close(true); document.removeEventListener('keydown', handler); }
    });
    okBtn.focus();
  });
}
function confirmDanger(msg, title) {
  return confirmAction({ title: title || 'تأكيد الحذف', message: msg, confirmText: 'حذف', type: 'danger', icon: 'ti-trash' });
}
function confirmWarning(msg, title) {
  return confirmAction({ title: title || 'تنبيه', message: msg, confirmText: 'موافق', type: 'warning', icon: 'ti-alert-triangle' });
}
function confirmInfo(msg, title) {
  return confirmAction({ title: title || 'معلومات', message: msg, confirmText: 'موافق', type: 'info', icon: 'ti-info-circle' });
}

/* 3. INLINE FORM VALIDATION */
function validateField(input, rules = {}) {
  const fg = input?.closest('.fg');
  if (!fg) return true;
  const msgEl = fg.querySelector('.field-msg');
  const val = input.value?.trim();
  let error = '';
  if (rules.required && !val) error = rules.requiredMsg || 'هذا الحقل مطلوب';
  else if (rules.minLength && val && val.length < rules.minLength) error = `الحد الأدنى ${rules.minLength} أحرف`;
  else if (rules.min !== undefined && val && parseFloat(val) < rules.min) error = `القيمة الدنيا ${rules.min}`;
  else if (rules.max !== undefined && val && parseFloat(val) > rules.max) error = `القيمة القصوى ${rules.max}`;
  else if (rules.pattern && val && !rules.pattern.test(val)) error = rules.patternMsg || 'صيغة غير صحيحة';
  else if (rules.custom) error = rules.custom(val);
  if (error) {
    fg.classList.add('field-error');
    fg.classList.remove('field-success');
    if (msgEl) { msgEl.innerHTML = `<i class="ti ti-alert-circle"></i> ${error}`; msgEl.style.display = 'flex'; }
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    return false;
  } else {
    fg.classList.remove('field-error');
    if (val) fg.classList.add('field-success');
    else fg.classList.remove('field-success');
    if (msgEl) { msgEl.style.display = 'none'; }
    return true;
  }
}
function clearValidation(form) {
  form?.querySelectorAll('.fg').forEach(fg => {
    fg.classList.remove('field-error', 'field-success');
    const msg = fg.querySelector('.field-msg');
    if (msg) msg.style.display = 'none';
  });
}
function validateForm(form, rulesMap) {
  let valid = true;
  for (const [selector, rules] of Object.entries(rulesMap)) {
    const input = form.querySelector(selector);
    if (input && !validateField(input, rules)) valid = false;
  }
  return valid;
}

/* 4. FOCUS TRAPPING IN MODALS */
const _focusTrapStack = [];
function trapFocus(modalBackdrop) {
  const focusable = modalBackdrop.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  modalBackdrop.addEventListener('keydown', handler);
  first.focus();
  _focusTrapStack.push({ el: modalBackdrop, handler, prevFocus: document.activeElement });
}
function releaseFocus() {
  const trap = _focusTrapStack.pop();
  if (trap) {
    trap.el.removeEventListener('keydown', trap.handler);
    if (trap.prevFocus?.focus) trap.prevFocus.focus();
  }
}

/* 5. UNDO/REDO SYSTEM */
const _undoStack = [];
const _redoStack = [];
function pushUndo(action) {
  _undoStack.push(action);
  if (_undoStack.length > 50) _undoStack.shift();
  _redoStack.length = 0;
}
function undo() {
  if (!_undoStack.length) return;
  const action = _undoStack.pop();
  if (action.undo) action.undo();
  _redoStack.push(action);
  showUndoToast('تم التراجع');
}
function redo() {
  if (!_redoStack.length) return;
  const action = _redoStack.pop();
  if (action.redo) action.redo();
  _undoStack.push(action);
  showUndoToast('تم الإعادة');
}
function showUndoToast(msg) {
  document.querySelectorAll('.undo-toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'undo-toast';
  toast.innerHTML = `<i class="ti ti-check" style="color:var(--green);font-size:16px"></i> <span class="undo-toast-msg">${msg}</span> <span class="btn-close-undo" onclick="this.closest('.undo-toast').remove()"><i class="ti ti-x"></i></span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
function showUndoableToast(msg, undoAction) {
  document.querySelectorAll('.undo-toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'undo-toast';
  toast.innerHTML = `<i class="ti ti-check" style="color:var(--green);font-size:16px"></i> <span class="undo-toast-msg">${msg}</span> <span class="btn-undo">تراجع</span> <span class="btn-close-undo" onclick="this.closest('.undo-toast').remove()"><i class="ti ti-x"></i></span>`;
  document.body.appendChild(toast);
  toast.querySelector('.btn-undo').onclick = () => { if (undoAction) undoAction(); toast.remove(); };
  setTimeout(() => toast.remove(), 5000);
}

/* 6. DRAG-AND-DROP FOR TABLE ROWS */
function enableDragSort(container, handleSelector, onReorder) {
  const handles = container.querySelectorAll(handleSelector);
  handles.forEach(h => {
    h.setAttribute('draggable', 'true');
    h.addEventListener('dragstart', e => {
      const row = h.closest('tr');
      row.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');
    });
    h.addEventListener('dragend', () => {
      container.querySelectorAll('tr').forEach(r => r.classList.remove('dragging', 'drag-over'));
    });
  });
  container.addEventListener('dragover', e => {
    const row = e.target.closest('tr');
    if (!row || row.classList.contains('dragging')) return;
    e.preventDefault();
    container.querySelectorAll('tr').forEach(r => r.classList.remove('drag-over'));
    row.classList.add('drag-over');
  });
  container.addEventListener('drop', e => {
    e.preventDefault();
    const target = e.target.closest('tr');
    const dragging = container.querySelector('.dragging');
    if (!target || !dragging || target === dragging) return;
    const rows = [...container.querySelectorAll('tr:not(.dragging)')];
    const targetIdx = rows.indexOf(target);
    const draggingIdx = rows.indexOf(dragging);
    if (draggingIdx < targetIdx) target.after(dragging);
    else target.before(dragging);
    if (onReorder) onReorder([...container.querySelectorAll('tr')]);
  });
}

/* 7. KEYBOARD NAVIGATION FOR TABLES */
function enableTableNav(tableEl, opts = {}) {
  if (!tableEl) return;
  const { onSelect, onEdit, className = 'row-focused' } = opts;
  let focusedIdx = -1;
  const getRows = () => [...tableEl.querySelectorAll('tbody tr')];
  tableEl.addEventListener('keydown', e => {
    const rows = getRows();
    if (!rows.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); focusedIdx = Math.min(focusedIdx + 1, rows.length - 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusedIdx = Math.max(focusedIdx - 1, 0); }
    else if (e.key === 'Enter' && focusedIdx >= 0) { if (onSelect) onSelect(rows[focusedIdx], focusedIdx); return; }
    else if (e.key === 'F2' && focusedIdx >= 0) { if (onEdit) onEdit(rows[focusedIdx], focusedIdx); return; }
    else return;
    rows.forEach(r => r.classList.remove(className));
    if (focusedIdx >= 0) {
      rows[focusedIdx].classList.add(className);
      rows[focusedIdx].scrollIntoView({ block: 'nearest' });
    }
  });
  tableEl.setAttribute('tabindex', '0');
  tableEl.style.outline = 'none';
}

/* 8. PROGRESS BAR */
function showProgress(container, percent, label) {
  let bar = container.querySelector('.progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.innerHTML = '<div class="progress-bar-fill"></div><div class="progress-label"></div>';
    container.appendChild(bar);
  }
  const fill = bar.querySelector('.progress-bar-fill');
  const lbl = bar.querySelector('.progress-label');
  fill.style.width = Math.min(100, Math.max(0, percent)) + '%';
  if (label) lbl.textContent = label;
  bar.style.display = 'block';
  if (percent >= 100) fill.classList.add('success');
}
function hideProgress(container) {
  const bar = container.querySelector('.progress-bar');
  if (bar) bar.style.display = 'none';
}

/* 9. EMPTY STATE GENERATOR */
function emptyState(icon, title, desc, btnText, btnAction) {
  let html = `<div class="empty-state">
    <div class="empty-state-icon blue"><i class="ti ti-${icon}"></i></div>
    <div class="empty-state-title">${title}</div>
    <div class="empty-state-desc">${desc}</div>`;
  if (btnText && btnAction) {
    html += `<button class="btn btn-primary btn-sm" onclick="${btnAction}"><i class="ti ti-plus"></i> ${btnText}</button>`;
  }
  html += '</div>';
  return html;
}

/* 10. ENHANCED OPENMODAL/CLOSEMODAL with focus trap */
const _origOpenModal = typeof openModal === 'function' ? openModal : null;
const _origCloseModal = typeof closeModal === 'function' ? closeModal : null;

function enhancedOpenModal(id) {
  if (_origOpenModal) _origOpenModal(id);
  const backdrop = document.getElementById(id);
  if (backdrop) trapFocus(backdrop);
}
function enhancedCloseModal(id) {
  releaseFocus();
  if (_origCloseModal) _origCloseModal(id);
}

/* Override if originals exist */
if (typeof window !== 'undefined') {
  window.openModal = enhancedOpenModal;
  window.closeModal = enhancedCloseModal;
}

/* 11. GLOBAL KEYBOARD SHORTCUTS */
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'z' && !e.target.matches('input,textarea,select')) { e.preventDefault(); undo(); }
  if (e.ctrlKey && e.key === 'y' && !e.target.matches('input,textarea,select')) { e.preventDefault(); redo(); }
});

/* 12. GLOBAL EXPORTS */
if (typeof window !== 'undefined') {
  Object.assign(window, {
    setBtnLoading, withBtnLoading,
    confirmAction, confirmDanger, confirmWarning, confirmInfo,
    validateField, clearValidation, validateForm,
    pushUndo, undo, redo, showUndoableToast,
    enableDragSort, enableTableNav,
    showProgress, hideProgress, emptyState
  });
}

/* 13. AUTO-CONVERT title TO data-tooltip */
function initTooltips(){
  document.querySelectorAll('[title]').forEach(el=>{
    if(!el.hasAttribute('data-tooltip')){
      el.setAttribute('data-tooltip', el.getAttribute('title'));
    }
  });
}
/* Run on load and after AJAX content updates */
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', initTooltips);
}else{initTooltips()}

/* 14. ENHANCE EMPTY ROWS WITH CTA */
(function patchEmptyRow(){
  const _origEmptyRow = typeof emptyRow === 'function' ? emptyRow : null;
  if(_origEmptyRow){
    window.emptyRow = function(cols, msg){
      if(!msg) return _origEmptyRow(cols, '');
      return `<tr><td colspan="${cols}"><div class="empty-state" style="padding:24px 10px">
        <div class="empty-state-icon blue"><i class="ti ti-inbox"></i></div>
        <div class="empty-state-title">${msg}</div>
      </div></td></tr>`;
    };
  }
})();

/* 15. MONITOR FOR DYNAMIC CONTENT */
const _origShowPage = window.showPage;
if(_origShowPage){
  window.showPage = function(pg){
    _origShowPage(pg);
    setTimeout(initTooltips, 100);
  };
}
