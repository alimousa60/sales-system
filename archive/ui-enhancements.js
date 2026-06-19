/**
 * نظام إدارة المواضيع (Theme Manager)
 * Version 1.0
 * 
 * يوفر:
 * - إدارة المواضيع (Dark, Light, Auto)
 * - حفظ التفضيلات في localStorage
 * - تبديل سلس بين المواضيع
 * - دعم الوضع التلقائي (System Preference)
 */

class ThemeManager {
  constructor() {
    this.currentTheme = this.loadTheme();
    this.themes = {
      'dark': {
        name: 'المظهر الداكن',
        bg: '#0b0d12',
        surface: '#10131a',
        text: '#e8edf5',
        accent: '#4f8ef7'
      },
      'light': {
        name: 'المظهر الفاتح',
        bg: '#f5f7fb',
        surface: '#ffffff',
        text: '#0f172a',
        accent: '#2563eb'
      },
      'highContrast': {
        name: 'تباين عالي',
        bg: '#000000',
        surface: '#ffffff',
        text: '#000000',
        accent: '#ffff00'
      }
    };
    
    this.init();
  }

  /**
   * تحميل الموضوع المحفوظ
   */
  loadTheme() {
    const saved = localStorage.getItem('app-theme');
    if (saved) return saved;
    
    // التحقق من تفضيل النظام
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * تهيئة نظام المواضيع
   */
  init() {
    this.applyTheme(this.currentTheme);
    this.setupSystemPreferenceListener();
    this.createThemeUI();
  }

  /**
   * تطبيق الموضوع
   */
  applyTheme(theme) {
    if (!this.themes[theme]) {
      console.error('موضوع غير معروف:', theme);
      return;
    }

    this.currentTheme = theme;
    document.body.classList.remove('dark-mode', 'light-mode', 'high-contrast');
    document.body.classList.add(theme === 'dark' ? 'dark-mode' : 
                                 theme === 'light' ? 'light-mode' : 'high-contrast');

    // حفظ التفضيل
    localStorage.setItem('app-theme', theme);

    // تحديث واجهة المستخدم
    this.updateThemeUI();
  }

  /**
   * الاستماع لتغييرات تفضيل النظام
   */
  setupSystemPreferenceListener() {
    if (!window.matchMedia) return;

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('app-theme-auto') === 'true') {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * إنشاء واجهة تبديل المواضيع
   */
  createThemeUI() {
    const existingUI = document.getElementById('theme-selector');
    if (existingUI) existingUI.remove();

    const selector = document.createElement('div');
    selector.id = 'theme-selector';
    selector.className = 'theme-selector';
    selector.innerHTML = `
      <button class="theme-btn dark-btn" title="المظهر الداكن">
        <i class="ti ti-moon"></i>
      </button>
      <button class="theme-btn light-btn" title="المظهر الفاتح">
        <i class="ti ti-sun"></i>
      </button>
      <button class="theme-btn contrast-btn" title="تباين عالي">
        <i class="ti ti-contrast"></i>
      </button>
    `;

    selector.querySelector('.dark-btn').onclick = () => this.applyTheme('dark');
    selector.querySelector('.light-btn').onclick = () => this.applyTheme('light');
    selector.querySelector('.contrast-btn').onclick = () => this.applyTheme('highContrast');

    // أضفه إلى topbar
    const topbar = document.querySelector('.topbar-actions');
    if (topbar) {
      topbar.insertBefore(selector, topbar.firstChild);
    }
  }

  /**
   * تحديث حالة أزرار المواضيع
   */
  updateThemeUI() {
    const buttons = document.querySelectorAll('.theme-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (this.currentTheme === 'dark') {
      document.querySelector('.dark-btn')?.classList.add('active');
    } else if (this.currentTheme === 'light') {
      document.querySelector('.light-btn')?.classList.add('active');
    } else {
      document.querySelector('.contrast-btn')?.classList.add('active');
    }
  }

  /**
   * الحصول على الموضوع الحالي
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * الحصول على جميع المواضيع
   */
  getThemes() {
    return Object.keys(this.themes);
  }
}

// =============================================================================

/**
 * مدير لوحة التحكم المخصصة (Dashboard Customizer)
 * 
 * يسمح بـ:
 * - إخفاء/إظهار الأدوات
 * - إعادة ترتيب الأعمدة
 * - حفظ التخصيصات
 */

class DashboardCustomizer {
  constructor() {
    this.widgets = new Map();
    this.savedLayout = this.loadLayout();
    this.init();
  }

  /**
   * تهيئة المخصص
   */
  init() {
    this.detectWidgets();
    this.createCustomizeButton();
    this.applyLayout();
  }

  /**
   * اكتشاف الأدوات الموجودة
   */
  detectWidgets() {
    document.querySelectorAll('[data-widget]').forEach(widget => {
      const name = widget.getAttribute('data-widget');
      this.widgets.set(name, {
        element: widget,
        visible: true,
        position: this.widgets.size
      });
    });
  }

  /**
   * إنشاء زر التخصيص
   */
  createCustomizeButton() {
    const btn = document.createElement('button');
    btn.className = 'btn btn-icon';
    btn.title = 'تخصيص اللوحة';
    btn.innerHTML = '<i class="ti ti-adjustments"></i>';
    btn.onclick = () => this.showCustomizeModal();

    const topbar = document.querySelector('.topbar-actions');
    if (topbar) topbar.appendChild(btn);
  }

  /**
   * عرض نافذة التخصيص
   */
  showCustomizeModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop on';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-hd">
          <h3><i class="ti ti-adjustments"></i> تخصيص لوحة التحكم</h3>
          <button onclick="this.closest('.modal-backdrop').remove()">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <div id="customize-list"></div>
        </div>
        <div class="modal-footer">
          <button class="btn" onclick="this.closest('.modal-backdrop').remove()">إلغاء</button>
          <button class="btn btn-primary" onclick="dashboardCustomizer.saveLayout()">حفظ</button>
        </div>
      </div>
    `;

    const list = modal.querySelector('#customize-list');
    this.widgets.forEach((widget, name) => {
      const item = document.createElement('div');
      item.className = 'customize-item';
      item.innerHTML = `
        <input type="checkbox" id="widget-${name}" 
               ${widget.visible ? 'checked' : ''} 
               onchange="dashboardCustomizer.toggleWidget('${name}')">
        <label for="widget-${name}">${name}</label>
      `;
      list.appendChild(item);
    });

    document.body.appendChild(modal);
  }

  /**
   * تبديل رؤية الأداة
   */
  toggleWidget(name) {
    if (this.widgets.has(name)) {
      const widget = this.widgets.get(name);
      widget.visible = !widget.visible;
      widget.element.style.display = widget.visible ? 'block' : 'none';
    }
  }

  /**
   * حفظ التخطيط
   */
  saveLayout() {
    const layout = {};
    this.widgets.forEach((widget, name) => {
      layout[name] = {
        visible: widget.visible,
        position: widget.position
      };
    });

    localStorage.setItem('dashboard-layout', JSON.stringify(layout));
    this.showToast('تم حفظ التخطيط بنجاح', 'success');
    document.querySelector('.modal-backdrop')?.remove();
  }

  /**
   * تحميل التخطيط المحفوظ
   */
  loadLayout() {
    const saved = localStorage.getItem('dashboard-layout');
    return saved ? JSON.parse(saved) : null;
  }

  /**
   * تطبيق التخطيط المحفوظ
   */
  applyLayout() {
    if (!this.savedLayout) return;

    Object.entries(this.savedLayout).forEach(([name, config]) => {
      if (this.widgets.has(name)) {
        const widget = this.widgets.get(name);
        widget.visible = config.visible;
        widget.element.style.display = config.visible ? 'block' : 'none';
      }
    });
  }

  showToast(msg, type) {
    const toast = document.querySelector('.toast') || document.createElement('div');
    toast.className = `toast on ${type}`;
    toast.innerHTML = `<i class="ti ti-check"></i> ${msg}`;
    if (!document.body.contains(toast)) document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove('on'), 3000);
  }
}

// =============================================================================

/**
 * مدير اختصارات لوحة المفاتيح
 * 
 * الاختصارات:
 * - Ctrl+N: فاتورة جديدة
 * - Ctrl+S: حفظ
 * - Ctrl+E: تصدير
 * - Ctrl+P: طباعة
 * - Ctrl+F: بحث
 * - Ctrl+L: تسجيل خروج
 */

class KeyboardShortcutManager {
  constructor() {
    this.shortcuts = {
      'ctrl-n': { fn: () => this.newInvoice(), label: 'فاتورة جديدة' },
      'ctrl-s': { fn: () => this.save(), label: 'حفظ' },
      'ctrl-e': { fn: () => this.export(), label: 'تصدير' },
      'ctrl-p': { fn: () => this.print(), label: 'طباعة' },
      'ctrl-f': { fn: () => this.search(), label: 'بحث' },
      'ctrl-l': { fn: () => this.logout(), label: 'تسجيل خروج' },
      'alt-d': { fn: () => this.goTo('dash'), label: 'لوحة التحكم' },
      'alt-i': { fn: () => this.goTo('inventory'), label: 'المخزون' },
      'alt-s': { fn: () => this.goTo('sales'), label: 'المبيعات' },
      'alt-c': { fn: () => this.goTo('customers'), label: 'الزبائن' }
    };

    this.init();
  }

  /**
   * تهيئة مدير الاختصارات
   */
  init() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.createShortcutHelp();
  }

  /**
   * معالجة الضغط على لوحة المفاتيح
   */
  handleKeydown(e) {
    const combination = this.getKeyCombination(e);

    if (this.shortcuts[combination]) {
      e.preventDefault();
      this.shortcuts[combination].fn();
    }

    // Ctrl+? لعرض المساعدة
    if (e.ctrlKey && e.key === '?') {
      e.preventDefault();
      this.showHelp();
    }
  }

  /**
   * الحصول على مزيج المفاتيح
   */
  getKeyCombination(e) {
    const parts = [];
    if (e.ctrlKey) parts.push('ctrl');
    if (e.altKey) parts.push('alt');
    if (e.shiftKey) parts.push('shift');

    const key = e.key.toLowerCase();
    if (!['control', 'alt', 'shift', 'meta'].includes(key)) {
      parts.push(key);
    }

    return parts.join('-');
  }

  /**
   * إنشاء مساعدة الاختصارات
   */
  createShortcutHelp() {
    const helpBtn = document.createElement('button');
    helpBtn.className = 'btn btn-icon';
    helpBtn.title = 'اختصارات لوحة المفاتيح (Ctrl+?)';
    helpBtn.innerHTML = '<i class="ti ti-help"></i>';
    helpBtn.onclick = () => this.showHelp();

    const topbar = document.querySelector('.topbar-actions');
    if (topbar) topbar.appendChild(helpBtn);
  }

  /**
   * عرض نافذة المساعدة
   */
  showHelp() {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop on';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-hd">
          <h3><i class="ti ti-help"></i> اختصارات لوحة المفاتيح</h3>
          <button onclick="this.closest('.modal-backdrop').remove()">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <table style="width:100%; font-size:12px;">
            <tr style="border-bottom:1px solid var(--border);">
              <th style="text-align:right; padding:8px;">الاختصار</th>
              <th style="text-align:right; padding:8px;">الوظيفة</th>
            </tr>
            ${Object.entries(this.shortcuts).map(([key, val]) => `
              <tr style="border-bottom:1px solid var(--border);">
                <td style="padding:8px;">
                  <code style="background:var(--bg-elevated); padding:4px 8px; border-radius:4px;">
                    ${key.toUpperCase()}
                  </code>
                </td>
                <td style="padding:8px;">${val.label}</td>
              </tr>
            `).join('')}
          </table>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" onclick="this.closest('.modal-backdrop').remove()">
            إغلاق
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // الدوال المرتبطة
  newInvoice() { console.log('فاتورة جديدة'); }
  save() { console.log('حفظ'); }
  export() { console.log('تصدير'); }
  print() { window.print(); }
  search() { document.querySelector('[data-search]')?.focus(); }
  logout() { if(confirm('هل تريد تسجيل الخروج؟')) location.reload(); }
  goTo(page) { 
    document.querySelectorAll('.nav-item').forEach(item => {
      if(item.getAttribute('data-page') === page) {
        item.click();
      }
    });
  }
}

// =============================================================================

/**
 * مدير إمكانية الوصول (Accessibility)
 * 
 * يضيف:
 * - دعم Screen Readers
 * - تحسين contrast النصوص
 * - دعم التنقل بلوحة المفاتيح
 */

class AccessibilityManager {
  constructor() {
    this.init();
  }

  /**
   * التهيئة
   */
  init() {
    this.addAriaLabels();
    this.improveContrast();
    this.enableKeyboardNavigation();
    this.createAccessibilityMenu();
  }

  /**
   * إضافة تسميات ARIA
   */
  addAriaLabels() {
    document.querySelectorAll('button:not([aria-label])').forEach(btn => {
      const icon = btn.querySelector('i');
      const title = btn.title || btn.innerText;
      if (title) btn.setAttribute('aria-label', title);
    });

    document.querySelectorAll('input:not([aria-label])').forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) input.setAttribute('aria-label', label.innerText);
    });
  }

  /**
   * تحسين التباين
   */
  improveContrast() {
    // سيتم تطبيقه عبر CSS و high-contrast theme
  }

  /**
   * تفعيل التنقل بالتاب
   */
  enableKeyboardNavigation() {
    document.querySelectorAll('[data-page]').forEach(item => {
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });
  }

  /**
   * إنشاء قائمة إمكانية الوصول
   */
  createAccessibilityMenu() {
    const btn = document.createElement('button');
    btn.className = 'btn btn-icon';
    btn.title = 'إمكانية الوصول';
    btn.setAttribute('aria-label', 'قائمة إمكانية الوصول');
    btn.innerHTML = '<i class="ti ti-accessibility"></i>';
    
    btn.onclick = () => {
      const menu = `
        <div class="modal-backdrop on">
          <div class="modal">
            <div class="modal-hd">
              <h3><i class="ti ti-accessibility"></i> إمكانية الوصول</h3>
              <button onclick="this.closest('.modal-backdrop').remove()">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <div style="display:grid; gap:12px;">
                <label>
                  <input type="checkbox" id="high-contrast" 
                         onchange="document.body.classList.toggle('high-contrast', this.checked)">
                  تباين عالي
                </label>
                <label>
                  <input type="checkbox" id="large-text" 
                         onchange="document.body.style.fontSize = this.checked ? '16px' : '13px'">
                  نص أكبر
                </label>
                <label>
                  <input type="checkbox" id="reduced-motion" 
                         onchange="document.body.classList.toggle('reduced-motion', this.checked)">
                  تقليل الحركة
                </label>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" onclick="this.closest('.modal-backdrop').remove()">
                إغلاق
              </button>
            </div>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', menu);
    };

    const topbar = document.querySelector('.topbar-actions');
    if (topbar) topbar.appendChild(btn);
  }
}

// =============================================================================

// تهيئة مديري الواجهة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
  window.dashboardCustomizer = new DashboardCustomizer();
  window.keyboardShortcutManager = new KeyboardShortcutManager();
  window.accessibilityManager = new AccessibilityManager();

  console.log('✅ واجهة محسّنة v2 - تم التحميل بنجاح');
});
