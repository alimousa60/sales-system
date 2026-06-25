/* ═══════════════════════════════════════════════════════════════
   PAGE CUSTOMIZATION ENGINE — محرك تخصيص الصفحات
   ERPNext-style page customization
   ═══════════════════════════════════════════════════════════════ */

const CUSTOMIZE_KEY = 'page_customizations';
let _custPanel = null;
let _custPageId = null;

/* ═══════════════════════════════════════════════════════════════
   PAGE REGISTRY — سجل الصفحات وعناصرها القابلة للتخصيص
   ═══════════════════════════════════════════════════════════════ */
const PAGE_REGISTRY = {
  dash: {
    name: 'الرئيسية',
    sections: [
      { id: 'cust-quick-nav', label: 'التنقل السريع', icon: 'ti ti-layout-grid', default: true },
      { id: 'cust-stat-cards', label: 'بطاقات الإحصائيات', icon: 'ti ti-chart-bar', default: true },
      { id: 'cust-insights', label: 'التنبيهات الذكية', icon: 'ti ti-lightbulb', default: true },
      { id: 'cust-charts', label: 'الرسوم البيانية', icon: 'ti ti-chart-line', default: true },
      { id: 'cust-inv-table', label: 'جدول آخر الفواتير', icon: 'ti ti-table', default: true },
      { id: 'cust-low-stock', label: 'أصناف منخفضة', icon: 'ti ti-alert-triangle', default: true },
      { id: 'cust-activity-log', label: 'آخر العمليات', icon: 'ti ti-activity', default: true },
      { id: 'cust-search', label: 'شريط البحث', icon: 'ti ti-search', default: true },
    ]
  },
  inventory: {
    name: 'الأصناف والمخزون',
    sections: [
      { id: 'cust-inv-search', label: 'شريط البحث', icon: 'ti ti-search', default: true },
      { id: 'cust-inv-filters', label: 'الفلاتر (الفئة + الحالة)', icon: 'ti ti-filter', default: true },
      { id: 'cust-inv-actions', label: 'أزرار التصدير والطباعة', icon: 'ti ti-file-spreadsheet', default: true },
      { id: 'cust-inv-table', label: 'جدول الأصناف', icon: 'ti ti-table', default: true },
      { id: 'cust-inv-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-code', label: 'الكود', default: true },
      { id: 'col-name', label: 'الصنف', default: true },
      { id: 'col-cat', label: 'الفئة', default: true },
      { id: 'col-buy', label: 'سعر الشراء', default: true },
      { id: 'col-sell', label: 'سعر البيع', default: true },
      { id: 'col-qty', label: 'الرصيد', default: true },
      { id: 'col-unit', label: 'الوحدة', default: true },
      { id: 'col-status', label: 'الحالة', default: true },
    ]
  },
  sales: {
    name: 'فواتير البيع',
    sections: [
      { id: 'cust-sal-filters', label: 'الفلاتر (الحالة + التاريخ)', icon: 'ti ti-filter', default: true },
      { id: 'cust-sal-actions', label: 'أزرار التصدير والطباعة والتسوية', icon: 'ti ti-file-spreadsheet', default: true },
      { id: 'cust-sal-table', label: 'جدول الفواتير', icon: 'ti ti-table', default: true },
      { id: 'cust-sal-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-sal-num', label: 'رقم الفاتورة', default: true },
      { id: 'col-sal-cust', label: 'الزبون', default: true },
      { id: 'col-sal-date', label: 'التاريخ', default: true },
      { id: 'col-sal-total', label: 'الإجمالي', default: true },
      { id: 'col-sal-paid', label: 'المحصَّل', default: true },
      { id: 'col-sal-rem', label: 'المتبقي', default: true },
      { id: 'col-sal-dlv', label: 'حالة التسليم', default: true },
      { id: 'col-sal-pay', label: 'حالة الدفع', default: true },
    ]
  },
  purchases: {
    name: 'فواتير الشراء',
    sections: [
      { id: 'cust-pur-filters', label: 'الفلاتر', icon: 'ti ti-filter', default: true },
      { id: 'cust-pur-actions', label: 'أزرار التصدير والطباعة', icon: 'ti ti-file-spreadsheet', default: true },
      { id: 'cust-pur-table', label: 'جدول فواتير الشراء', icon: 'ti ti-table', default: true },
      { id: 'cust-pur-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-pur-num', label: 'رقم الفاتورة', default: true },
      { id: 'col-pur-sup', label: 'المورد', default: true },
      { id: 'col-pur-date', label: 'التاريخ', default: true },
      { id: 'col-pur-total', label: 'الإجمالي', default: true },
      { id: 'col-pur-paid', label: 'المدفوع', default: true },
      { id: 'col-pur-rem', label: 'المتبقي', default: true },
      { id: 'col-pur-status', label: 'الحالة', default: true },
    ]
  },
  customers: {
    name: 'الزبائن',
    sections: [
      { id: 'cust-cust-search', label: 'شريط البحث', icon: 'ti ti-search', default: true },
      { id: 'cust-cust-table', label: 'جدول الزبائن', icon: 'ti ti-table', default: true },
      { id: 'cust-cust-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-cust-id', label: 'الرقم', default: true },
      { id: 'col-cust-name', label: 'الاسم', default: true },
      { id: 'col-cust-phone', label: 'الهاتف', default: true },
      { id: 'col-cust-bal', label: 'الرصيد', default: true },
      { id: 'col-cust-company', label: 'الشركة', default: true },
    ]
  },
  suppliers: {
    name: 'الموردون',
    sections: [
      { id: 'cust-sup-search', label: 'شريط البحث', icon: 'ti ti-search', default: true },
      { id: 'cust-sup-table', label: 'جدول الموردين', icon: 'ti ti-table', default: true },
      { id: 'cust-sup-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-sup-id', label: 'الرقم', default: true },
      { id: 'col-sup-name', label: 'الاسم', default: true },
      { id: 'col-sup-phone', label: 'الهاتف', default: true },
      { id: 'col-sup-bal', label: 'الرصيد', default: true },
      { id: 'col-sup-company', label: 'الشركة', default: true },
    ]
  },
  finance: {
    name: 'الخزينة',
    sections: [
      { id: 'cust-fin-stats', label: 'بطاقات الإحصائيات', icon: 'ti ti-chart-bar', default: true },
      { id: 'cust-fin-actions', label: 'أزرار الإضافة والتصدير', icon: 'ti ti-plus', default: true },
      { id: 'cust-fin-table', label: 'جدول الحركات', icon: 'ti ti-table', default: true },
      { id: 'cust-fin-pagination', label: 'ترقيم الصفحات', icon: 'ti ti-chevrons-right', default: true },
    ],
    columns: [
      { id: 'col-fin-date', label: 'التاريخ', default: true },
      { id: 'col-fin-type', label: 'النوع', default: true },
      { id: 'col-fin-amt', label: 'المبلغ', default: true },
      { id: 'col-fin-desc', label: 'البيان', default: true },
      { id: 'col-fin-ref', label: 'المرجع', default: true },
    ]
  },
  hrm: {
    name: 'HRM — الموظفين',
    sections: [
      { id: 'cust-hrm-tabs', label: 'تبويبات HRM', icon: 'ti ti-layout-tabs', default: true },
      { id: 'cust-hrm-stats', label: 'الإحصائيات', icon: 'ti ti-chart-bar', default: true },
      { id: 'cust-hrm-table', label: 'جدول الموظفين', icon: 'ti ti-table', default: true },
    ],
    columns: [
      { id: 'col-hrm-no', label: 'رقم الموظف', default: true },
      { id: 'col-hrm-name', label: 'الاسم', default: true },
      { id: 'col-hrm-phone', label: 'الهاتف', default: true },
      { id: 'col-hrm-dept', label: 'القسم', default: true },
      { id: 'col-hrm-pos', label: 'المنصب', default: true },
      { id: 'col-hrm-salary', label: 'الراتب', default: true },
      { id: 'col-hrm-status', label: 'الحالة', default: true },
    ]
  },
  pl: {
    name: 'الأرباح والخسائر',
    sections: [
      { id: 'cust-pl-stats', label: 'ملخص الأرباح', icon: 'ti ti-chart-bar', default: true },
      { id: 'cust-pl-charts', label: 'الرسوم البيانية', icon: 'ti ti-chart-line', default: true },
      { id: 'cust-pl-table', label: 'جدول التفاصيل', icon: 'ti ti-table', default: true },
    ]
  },
  settings: {
    name: 'الإعدادات',
    sections: [
      { id: 'cust-set-theme', label: 'وضع التطبيق', icon: 'ti ti-moon', default: true },
      { id: 'cust-set-company', label: 'بيانات المؤسسة', icon: 'ti ti-building', default: true },
      { id: 'cust-set-sync', label: 'المزامنة', icon: 'ti ti-refresh', default: true },
      { id: 'cust-set-users', label: 'حسابات المستخدمين', icon: 'ti ti-users-pin', default: true },
      { id: 'cust-set-backup', label: 'النسخ الاحتياطي', icon: 'ti ti-download', default: true },
      { id: 'cust-set-barcode', label: 'إعدادات الباركود', icon: 'ti ti-barcode', default: true },
    ]
  }
};

/* ═══════════════════════════════════════════════════════════════
   LOAD / SAVE — حمّل / احفظ إعدادات الصفحة
   ═══════════════════════════════════════════════════════════════ */
function loadPageCustomization(pageId) {
  try {
    const all = JSON.parse(localStorage.getItem(CUSTOMIZE_KEY) || '{}');
    return all[pageId] || {};
  } catch (e) { return {}; }
}

function savePageCustomization(pageId, settings) {
  try {
    const all = JSON.parse(localStorage.getItem(CUSTOMIZE_KEY) || '{}');
    all[pageId] = settings;
    localStorage.setItem(CUSTOMIZE_KEY, JSON.stringify(all));
  } catch (e) {}
}

function getPageSectionsVisibility(pageId) {
  const reg = PAGE_REGISTRY[pageId];
  if (!reg) return {};
  const saved = loadPageCustomization(pageId);
  const visibility = {};
  reg.sections.forEach(s => {
    visibility[s.id] = saved[s.id] !== undefined ? saved[s.id] : s.default;
  });
  return visibility;
}

function getPageColumnsVisibility(pageId) {
  const reg = PAGE_REGISTRY[pageId];
  if (!reg || !reg.columns) return {};
  const saved = loadPageCustomization(pageId);
  const visibility = {};
  reg.columns.forEach(c => {
    visibility[c.id] = saved[c.id] !== undefined ? saved[c.id] : c.default;
  });
  return visibility;
}

/* ═══════════════════════════════════════════════════════════════
   APPLY VISIBILITY — تطبيق الإعدادات على الصفحة
   ═══════════════════════════════════════════════════════════════ */
function applyPageCustomization(pageId) {
  const sectionVis = getPageSectionsVisibility(pageId);
  Object.entries(sectionVis).forEach(([id, visible]) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = visible ? '' : 'none';
      el.classList.toggle('cust-hidden', !visible);
    }
  });

  const colVis = getPageColumnsVisibility(pageId);
  Object.entries(colVis).forEach(([id, visible]) => {
    document.querySelectorAll(`[data-cust-col="${id}"]`).forEach(el => {
      el.style.display = visible ? '' : 'none';
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   OPEN PANEL — فتح لوحة التخصيص
   ═══════════════════════════════════════════════════════════════ */
function openCustomizePanel(pageId) {
  _custPageId = pageId;
  const reg = PAGE_REGISTRY[pageId];
  if (!reg) { toast(t('customize_not_supported'), 'info'); return; }

  const saved = loadPageCustomization(pageId);
  let panel = G('cust-panel');

  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'cust-panel';
    panel.className = 'cust-panel';
    document.body.appendChild(panel);
  }

  const sectionsHtml = reg.sections.map(s => {
    const checked = saved[s.id] !== undefined ? saved[s.id] : s.default;
    return `<div class="cust-row">
      <div class="cust-row-info">
        <i class="${s.icon}"></i>
        <span>${s.label}</span>
      </div>
      <label class="cust-toggle">
        <input type="checkbox" data-cust-section="${s.id}" ${checked ? 'checked' : ''} onchange="onCustToggle('${s.id}', this.checked)">
        <span class="cust-toggle-slider"></span>
      </label>
    </div>`;
  }).join('');

  const columnsHtml = reg.columns ? `
    <div class="cust-sect-title"><i class="ti ti-columns"></i> الأعمدة</div>
    ${reg.columns.map(c => {
      const checked = saved[c.id] !== undefined ? saved[c.id] : c.default;
      return `<div class="cust-row">
        <div class="cust-row-info">
          <i class="ti ti-table-column"></i>
          <span>${c.label}</span>
        </div>
        <label class="cust-toggle">
          <input type="checkbox" data-cust-col-toggle="${c.id}" ${checked ? 'checked' : ''} onchange="onCustColToggle('${c.id}', this.checked)">
          <span class="cust-toggle-slider"></span>
        </label>
      </div>`;
    }).join('')}
  ` : '';

  panel.innerHTML = `
    <div class="cust-backdrop" onclick="closeCustomizePanel()"></div>
    <div class="cust-drawer">
      <div class="cust-drawer-hd">
        <div class="cust-drawer-title"><i class="ti ti-settings"></i> تخصيص — ${reg.name}</div>
        <button class="btn btn-icon btn-sm" onclick="closeCustomizePanel()"><i class="ti ti-x"></i></button>
      </div>
      <div class="cust-drawer-body">
        <div class="cust-sect-title"><i class="ti ti-layout-list"></i> الأقسام</div>
        ${sectionsHtml}
        ${columnsHtml}
      </div>
      <div class="cust-drawer-footer">
        <button class="btn btn-sm btn-secondary" onclick="resetPageCustomization('${pageId}')"><i class="ti ti-rotate"></i> إعادة ضبط</button>
        <button class="btn btn-sm btn-primary" onclick="closeCustomizePanel()"><i class="ti ti-check"></i> تطبيق</button>
      </div>
    </div>`;

  requestAnimationFrame(() => {
    panel.classList.add('open');
    applyPageCustomization(pageId);
  });
}

function closeCustomizePanel() {
  const panel = G('cust-panel');
  if (panel) {
    panel.classList.remove('open');
    setTimeout(() => { if (panel) panel.innerHTML = ''; }, 300);
  }
}

function onCustToggle(sectionId, visible) {
  if (!_custPageId) return;
  const settings = loadPageCustomization(_custPageId);
  settings[sectionId] = visible;
  savePageCustomization(_custPageId, settings);
  const el = document.getElementById(sectionId);
  if (el) {
    el.style.display = visible ? '' : 'none';
    el.classList.toggle('cust-hidden', !visible);
  }
}

function onCustColToggle(colId, visible) {
  if (!_custPageId) return;
  const settings = loadPageCustomization(_custPageId);
  settings[colId] = visible;
  savePageCustomization(_custPageId, settings);
  document.querySelectorAll(`[data-cust-col="${colId}"]`).forEach(el => {
    el.style.display = visible ? '' : 'none';
  });
}

function resetPageCustomization(pageId) {
  const reg = PAGE_REGISTRY[pageId];
  if (!reg) return;
  const settings = {};
  reg.sections.forEach(s => { settings[s.id] = s.default; });
  if (reg.columns) reg.columns.forEach(c => { settings[c.id] = c.default; });
  savePageCustomization(pageId, settings);
  applyPageCustomization(pageId);
  openCustomizePanel(pageId);
  toast(t('customize_reset'));
}

/* ═══════════════════════════════════════════════════════════════
   MENU BUTTON — زر ⋮ لكل صفحة
   ═══════════════════════════════════════════════════════════════ */
function injectCustMenu(pageId) {
  const topbar = G('pg-act');
  if (!topbar) return;
  if (topbar.querySelector('.cust-menu-btn')) return;

  const reg = PAGE_REGISTRY[pageId];
  if (!reg) return;

  const btn = document.createElement('button');
  btn.className = 'btn btn-icon btn-sm cust-menu-btn';
  btn.title = 'خيارات الصفحة';
  btn.innerHTML = '<i class="ti ti-dots-vertical"></i>';
  btn.onclick = function(e) {
    e.stopPropagation();
    const existing = topbar.querySelector('.cust-dropdown');
    if (existing) { existing.remove(); return; }

    const dd = document.createElement('div');
    dd.className = 'cust-dropdown';
    dd.innerHTML = `
      <div class="cust-dd-item" onclick="this.parentElement.remove();openCustomizePanel('${pageId}')">
        <i class="ti ti-settings"></i> تخصيص الصفحة
      </div>
      <div class="cust-dd-item" onclick="this.parentElement.remove();location.reload()">
        <i class="ti ti-refresh"></i> تحديث الصفحة
      </div>
      <div class="cust-dd-item" onclick="this.parentElement.remove();window.scrollTo({top:0,behavior:'smooth'})">
        <i class="ti ti-arrow-up"></i> العلو
      </div>`;
    topbar.style.position = 'relative';
    topbar.appendChild(dd);

    const close = (ev) => { if (!dd.contains(ev.target)) { dd.remove(); document.removeEventListener('click', close); } };
    setTimeout(() => document.addEventListener('click', close), 10);
  };

  topbar.insertBefore(btn, topbar.firstChild);
}

/* ═══════════════════════════════════════════════════════════════
   HOOK INTO showPage — ربط بنظام الصفحات
   ═══════════════════════════════════════════════════════════════ */
(function() {
  const origShowPage = typeof showPage === 'function' ? showPage : null;
  if (origShowPage) {
    window.showPage = function(pg) {
      origShowPage(pg);
      setTimeout(() => {
        injectCustMenu(pg);
        applyPageCustomization(pg);
      }, 50);
    };
  }
})();
