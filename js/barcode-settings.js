/* ═══════════════════════════════════════════════════════════════
   BARCODE SETTINGS & RENDERING — إعدادات وعرض الباركود
   ═══════════════════════════════════════════════════════════════ */

const BARCODE_STORAGE_KEY = 'barcode_settings';

const BC_DEFAULTS = {
  show: 'item+invoice',
  type: 'CODE128',
  size: 'medium',
  text: 'yes',
  position: 'under-name',
  width: 'normal'
};

const BC_SIZES = {
  small:  { height: 25, width: 1, margin: 2 },
  medium: { height: 40, width: 1.5, margin: 4 },
  large:  { height: 60, width: 2, margin: 6 }
};

const BC_WIDTHS = {
  thin:   0.8,
  normal: 1.5,
  thick:  2.5
};

function getBarcodeSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(BARCODE_STORAGE_KEY) || '{}');
    return { ...BC_DEFAULTS, ...saved };
  } catch (e) {
    return { ...BC_DEFAULTS };
  }
}

function saveBarcodeSettings() {
  const settings = {
    show: G('bc-show')?.value || 'item+invoice',
    type: G('bc-type')?.value || 'CODE128',
    size: G('bc-size')?.value || 'medium',
    text: G('bc-text')?.value || 'yes',
    position: G('bc-position')?.value || 'under-name',
    width: G('bc-width')?.value || 'normal'
  };
  localStorage.setItem(BARCODE_STORAGE_KEY, JSON.stringify(settings));
  toast(t('barcode_settings_saved'));
}

function loadBarcodeSettingsUI() {
  const s = getBarcodeSettings();
  const fields = ['bc-show', 'bc-type', 'bc-size', 'bc-text', 'bc-position', 'bc-width'];
  const keys = ['show', 'type', 'size', 'text', 'position', 'width'];
  fields.forEach((id, i) => {
    const el = G(id);
    if (el) el.value = s[keys[i]] || BC_DEFAULTS[keys[i]];
  });
}

function previewBarcode() {
  const s = getBarcodeSettings();
  const container = G('bc-preview');
  const svg = G('bc-preview-svg');
  if (!container || !svg) return;
  container.style.display = container.style.display === 'none' ? '' : 'none';
  if (container.style.display === 'none') return;
  try {
    JsBarcode(svg, 'INV-00001', {
      format: s.type,
      width: BC_WIDTHS[s.width] || 1.5,
      height: BC_SIZES[s.size]?.height || 40,
      margin: BC_SIZES[s.size]?.margin || 4,
      displayValue: s.text === 'yes',
      font: 'monospace',
      fontSize: 12,
      textMargin: 2,
      background: 'transparent',
      lineColor: '#1e293b'
    });
  } catch (e) {
    svg.innerHTML = '<text x="10" y="20" fill="var(--red)" font-size="11">'+t('barcode_error')+'</text>';
  }
}

/* ═══════════════════════════════════════════════════════════════
   BARCODE SVG GENERATOR — مولّد SVG للباركود
   ═══════════════════════════════════════════════════════════════ */
function generateBarcodeSVG(value, opts = {}) {
  const s = getBarcodeSettings();
  const type = opts.type || s.type;
  const showText = opts.text !== undefined ? opts.text : (s.text === 'yes');
  const size = opts.size || s.size;
  const bw = opts.width || s.width;

  const sizeConfig = BC_SIZES[size] || BC_SIZES.medium;
  const barWidth = BC_WIDTHS[bw] || 1.5;

  const container = document.createElement('div');
  container.style.cssText = 'display:inline-block;line-height:0';
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  container.appendChild(svgEl);

  try {
    JsBarcode(svgEl, value || 'N/A', {
      format: type,
      width: barWidth,
      height: sizeConfig.height,
      margin: sizeConfig.margin,
      displayValue: showText,
      font: 'monospace',
      fontSize: size === 'small' ? 10 : size === 'large' ? 14 : 12,
      textMargin: 2,
      background: 'transparent',
      lineColor: opts.color || '#1e293b'
    });
    return container.innerHTML;
  } catch (e) {
    return `<svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><text x="2" y="14" fill="#94a3b8" font-size="10" font-family="monospace">${value || 'N/A'}</text></svg>`;
  }
}

/* ═══════════════════════════════════════════════════════════════
   INVOICE BARCODE RENDERING — عرض الباركود في الفاتورة
   ═══════════════════════════════════════════════════════════════ */
function renderInvoiceBarcode(value, opts = {}) {
  if (!value) return '';
  const s = getBarcodeSettings();
  if (s.show === 'none') return '';

  const type = opts.type || s.type;
  const size = opts.size || s.size;
  const bw = opts.width || s.width;
  const showText = opts.text !== undefined ? opts.text : (s.text === 'yes');

  const sizeConfig = BC_SIZES[size] || BC_SIZES.medium;
  const barWidth = BC_WIDTHS[bw] || 1.5;

  const svgId = 'bc-' + Math.random().toString(36).slice(2, 8);

  setTimeout(() => {
    const svgEl = document.getElementById(svgId);
    if (!svgEl) return;
    try {
      JsBarcode(svgEl, value, {
        format: type,
        width: barWidth,
        height: sizeConfig.height,
        margin: sizeConfig.margin,
        displayValue: showText,
        font: 'monospace',
        fontSize: size === 'small' ? 10 : size === 'large' ? 14 : 12,
        textMargin: 2,
        background: 'transparent',
        lineColor: opts.color || '#1e293b'
      });
    } catch (e) {
      svgEl.innerHTML = `<text x="2" y="14" fill="#94a3b8" font-size="9" font-family="monospace">${value}</text>`;
    }
  }, 0);

  return `<svg id="${svgId}" style="max-width:100%"></svg>`;
}

/* ═══════════════════════════════════════════════════════════════
   PRINT LABEL — طباعة ملصق صنف
   ═══════════════════════════════════════════════════════════════ */
function printItemLabel(itemId) {
  const item = DB.items.find(x => x.id === itemId);
  if (!item) { toast(t('barcode_item_not_found_msg'), 'error'); return; }
  const s = getBarcodeSettings();
  const company = currentCompany();

  const sizeConfig = BC_SIZES[s.size] || BC_SIZES.medium;
  const barWidth = BC_WIDTHS[s.width] || 1.5;

  const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>ملصق — ${item.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
  @page{size:${s.size==='large'?'80mm 50mm':'62mm 38mm'};margin:2mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Cairo',sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .label{width:100%;max-width:58mm;padding:3mm;text-align:center;border:1px dashed #ccc;border-radius:3mm;position:relative;overflow:hidden}
  .label-brand{font-size:8px;color:#64748b;font-weight:600;margin-bottom:1mm;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .label-name{font-size:${s.size==='large'?'13px':'11px'};font-weight:700;color:#1e293b;margin-bottom:1.5mm;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .label-barcode{margin:1mm 0;display:flex;justify-content:center}
  .label-barcode svg{max-width:48mm}
  .label-price{font-size:${s.size==='large'?'14px':'12px'};font-weight:700;color:#4f8ef7;margin-top:1mm}
  .label-price small{font-size:9px;color:#94a3b8;font-weight:400}
  .label-code{font-size:8px;color:#94a3b8;font-family:monospace;margin-top:0.5mm;direction:ltr}
  </style></head><body>
  <div class="label">
    ${company.name ? `<div class="label-brand">${company.name}</div>` : ''}
    <div class="label-name">${item.name}</div>
    <div class="label-barcode">
      <svg id="lbl-bc"></svg>
    </div>
    <div class="label-price">${fmt(item.sell)} <small>t('currency_sym')</small></div>
    ${item.barcode ? `<div class="label-code">${item.barcode}</div>` : `<div class="label-code">${item.code}</div>`}
  </div>
  <script>
    JsBarcode('#lbl-bc', '${item.barcode || item.code}', {
      format: '${s.type}',
      width: ${barWidth},
      height: ${sizeConfig.height * 0.7},
      margin: 2,
      displayValue: true,
      font: 'monospace',
      fontSize: ${s.size === 'large' ? 12 : 10},
      textMargin: 1,
      background: 'transparent',
      lineColor: '#1e293b'
    });
    window.onload = function(){ setTimeout(function(){ window.print(); window.close(); }, 200); };
  <\/script></body></html>`;

  const win = window.open('', '_blank', 'width=400,height=300');
  if (!win) { toast(t('barcode_print_err'), 'error'); return; }
  win.document.write(html);
  win.document.close();
}

/* ═══════════════════════════════════════════════════════════════
   PRINT MULTIPLE LABELS — طباعة عدة ملصقات
   ═══════════════════════════════════════════════════════════════ */
function printMultipleLabels(itemIds) {
  const items = itemIds.map(id => DB.items.find(x => x.id === id)).filter(Boolean);
  if (!items.length) { toast(t('barcode_no_items_msg'), 'error'); return; }
  const s = getBarcodeSettings();
  const company = currentCompany();
  const sizeConfig = BC_SIZES[s.size] || BC_SIZES.medium;
  const barWidth = BC_WIDTHS[s.width] || 1.5;

  const labelsHtml = items.map(item => `
    <div class="label">
      ${company.name ? `<div class="label-brand">${company.name}</div>` : ''}
      <div class="label-name">${item.name}</div>
      <div class="label-barcode">
        <svg class="lbl-bc" data-value="${item.barcode || item.code}"></svg>
      </div>
      <div class="label-price">${fmt(item.sell)} <small>t('currency_sym')</small></div>
      <div class="label-code">${item.barcode || item.code}</div>
    </div>
  `).join('');

  const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>ملصقات — ${items.length} أصناف</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
  @page{size:62mm 38mm;margin:2mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Cairo',sans-serif;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .labels{display:flex;flex-wrap:wrap;gap:2mm;justify-content:center;padding:2mm}
  .label{width:58mm;min-height:34mm;padding:3mm;text-align:center;border:1px dashed #ccc;border-radius:3mm;page-break-inside:avoid;margin-bottom:2mm}
  .label-brand{font-size:8px;color:#64748b;font-weight:600;margin-bottom:1mm;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .label-name{font-size:11px;font-weight:700;color:#1e293b;margin-bottom:1.5mm;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .label-barcode{margin:1mm 0;display:flex;justify-content:center}
  .label-barcode svg{max-width:48mm}
  .label-price{font-size:12px;font-weight:700;color:#4f8ef7;margin-top:1mm}
  .label-price small{font-size:9px;color:#94a3b8;font-weight:400}
  .label-code{font-size:8px;color:#94a3b8;font-family:monospace;margin-top:0.5mm;direction:ltr}
  </style></head><body>
  <div class="labels">${labelsHtml}</div>
  <script>
    document.querySelectorAll('.lbl-bc').forEach(function(svg) {
      JsBarcode(svg, svg.dataset.value || 'N/A', {
        format: '${s.type}',
        width: ${barWidth},
        height: ${sizeConfig.height * 0.7},
        margin: 2,
        displayValue: true,
        font: 'monospace',
        fontSize: 10,
        textMargin: 1,
        background: 'transparent',
        lineColor: '#1e293b'
      });
    });
    window.onload = function(){ setTimeout(function(){ window.print(); window.close(); }, 300); };
  <\/script></body></html>`;

  const win = window.open('', '_blank', 'width=800,height=600');
  if (!win) { toast(t('barcode_print_err'), 'error'); return; }
  win.document.write(html);
  win.document.close();
}

/* ═══════════════════════════════════════════════════════════════
   PRINT ALL LABELS — طباعة ملصقات جميع الأصناف
   ═══════════════════════════════════════════════════════════════ */
function printAllItemLabels() {
  const items = DB.items.filter(x => x.qty > 0);
  if (!items.length) { toast(t('barcode_no_available'), 'error'); return; }
  printMultipleLabels(items.map(x => x.id));
}
if (typeof initApp === 'function') {
  const _origInit = initApp;
  initApp = function() {
    _origInit.apply(this, arguments);
    loadBarcodeSettingsUI();
  };
} else {
  document.addEventListener('DOMContentLoaded', () => loadBarcodeSettingsUI());
}

