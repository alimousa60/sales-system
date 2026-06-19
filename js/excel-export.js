/* EXCEL EXPORT */

function _downloadExcel(workbook, filename) {
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename + ".xlsx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function _exportTable(headers, rows, sheetName, filename) {
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws["!cols"] = headers.map(() => ({ wch: 18 }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  _downloadExcel(wb, filename);
}

function exportItems() {
  const h = ["الكود","الباركود","الصنف","الفئة","سعر الشراء","سعر البيع","الرصيد","حد إعادة الطلب","الوحدة","الحالة"];
  const rows = DB.items.map(x => {
    const st = x.qty === 0 ? "نفدت" : x.qty <= x.reorder ? "منخفض" : "جيد";
    return [x.code, x.barcode||"", x.name, x.cat, x.buy, x.sell, x.qty, x.reorder, x.unit, st];
  });
  if (!rows.length) { toast("لا توجد أصناف للتصدير", "info"); return; }
  _exportTable(h, rows, "الأصناف", "items-export");
  toast("تم تصدير الأصناف بنجاح");
}

function exportSales() {
  const h = ["رقم الفاتورة","الزبون","التاريخ","الإجمالي","المحصَّل","المتبقي","حالة التسليم","حالة الدفع"];
  const rows = DB.invs.map(inv => {
    const paid = invPaid(inv);
    const rem = invRemaining(inv);
    const dlv = inv.dlvStatus === "delivered" ? "مسلَّمة" : "غير مسلَّمة";
    const pay = paid <= 0 ? "غير مسدَّدة" : paid >= inv.total - 0.001 ? "مسددة كاملاً" : "جزئي";
    return [inv.num, inv.custName, inv.date, inv.total, paid, rem, dlv, pay];
  });
  if (!rows.length) { toast("لا توجد فواتير للتصدير", "info"); return; }
  _exportTable(h, rows, "فواتير البيع", "sales-export");
  toast("تم تصدير فواتير البيع بنجاح");
}

function exportPurchases() {
  const h = ["رقم الفاتورة","المورد","التاريخ","الإجمالي","المدفوع","المتبقي","حالة الدفع"];
  const rows = DB.purs.map(p => {
    const paid = purPaid(p);
    const rem = purRemaining(p);
    const status = paid <= 0 ? "غير مدفوعة" : paid >= p.total - 0.001 ? "مدفوعة" : "جزئي";
    return [p.num, p.supName, p.date, p.total, paid, rem, status];
  });
  if (!rows.length) { toast("لا توجد فواتير شراء للتصدير", "info"); return; }
  _exportTable(h, rows, "فواتير الشراء", "purchases-export");
  toast("تم تصدير فواتير الشراء بنجاح");
}

function exportCustomers() {
  const h = ["الاسم","الهاتف","العنوان","الرصيد الافتتاحي","إجمالي المبيعات","الذمة المدينة"];
  const rows = DB.custs.map(c => {
    const recv = custReceivable(c);
    const totalSales = DB.invs.filter(i => i.custId === c.id).reduce((s, i) => s + i.total, 0) + (parseFloat(c.openBal) || 0);
    return [c.name, c.phone||"", c.addr||"", c.openBal||0, totalSales, recv];
  });
  if (!rows.length) { toast("لا يوجد زبائن للتصدير", "info"); return; }
  _exportTable(h, rows, "الزبائن", "customers-export");
  toast("تم تصدير الزبائن بنجاح");
}

function exportSuppliers() {
  const h = ["الاسم","الهاتف","العنوان","إجمالي المشتريات","المدفوع","الذمة الدائنة"];
  const rows = DB.sups.map(s => {
    const totalPur = DB.purs.filter(p => p.supId === s.id).reduce((sum, p) => sum + p.total, 0);
    const paid = DB.supPayments.filter(p => p.supId === s.id).reduce((sum, p) => sum + p.amount, 0);
    return [s.name, s.phone||"", s.addr||"", totalPur, paid, totalPur - paid];
  });
  if (!rows.length) { toast("لا يوجد موردون للتصدير", "info"); return; }
  _exportTable(h, rows, "الموردون", "suppliers-export");
  toast("تم تصدير الموردون بنجاح");
}

function exportPayments() {
  const h = ["رقم الدفعة","الزبون","رقم الفاتورة","المبلغ","طريقة الدفع","التاريخ","ملاحظات"];
  const rows = DB.payments.map(p => {
    const mode = p.mode === "cash" ? "نقدي" : p.mode === "check" ? "صك" : p.mode === "transfer" ? "تحويل" : p.mode;
    return [p.id, p.custName||"", p.invNum||"", p.amount, mode, p.date, p.notes||""];
  });
  if (!rows.length) { toast("لا توجد دفعات للتصدير", "info"); return; }
  _exportTable(h, rows, "المحصَّلات", "payments-export");
  toast("تم تصدير المحصَّلات بنجاح");
}

function exportSupplierPayments() {
  const h = ["رقم الدفعة","المورد","فاتورة الشراء","المبلغ","طريقة الدفع","التاريخ","ملاحظات"];
  const rows = DB.supPayments.map(p => {
    const mode = p.mode === "cash" ? "نقدي" : p.mode === "check" ? "صك" : p.mode === "transfer" ? "تحويل" : p.mode;
    return [p.id, p.supName||"", p.purNum||"", p.amount, mode, p.date, p.notes||""];
  });
  if (!rows.length) { toast("لا توجد دفعات موردين للتصدير", "info"); return; }
  _exportTable(h, rows, "دفعات الموردين", "supplier-payments-export");
  toast("تم تصدير دفعات الموردين بنجاح");
}

function exportReturns() {
  const h = ["رقم المرتجع","رقم الفاتورة","الزبون","المبلغ","السبب","فحص الجودة","التاريخ"];
  const rows = DB.rets.map(r => {
    const qc = r.qcStatus === "passed" ? "مقبول" : r.qcStatus === "failed" ? "مرفوض" : "قيد المراجعة";
    return [r.num, r.invNum, r.custName, r.amt, r.reason||"", qc, r.date];
  });
  if (!rows.length) { toast("لا توجد مرتجعات للتصدير", "info"); return; }
  _exportTable(h, rows, "المرتجعات", "returns-export");
  toast("تم تصدير المرتجعات بنجاح");
}

function exportUsers() {
  const h = ["الاسم","اسم الحساب","الصلاحية","الحالة"];
  const rows = DB.users.map(u => {
    const role = u.role === "admin" ? "مشرف" : u.role === "sales" ? "مبيعات" : u.role === "inventory" ? "مخازن" : u.role;
    const status = u.status || (u.isActive === false ? "غير نشط" : "نشط");
    return [u.name, u.username, role, status];
  });
  if (!rows.length) { toast("لا يوجد مستخدمون للتصدير", "info"); return; }
  _exportTable(h, rows, "المستخدمون", "users-export");
  toast("تم تصدير المستخدمين بنجاح");
}

/* ═══════════════════════════════════════════════════════════════
   GENERIC PDF / PRINT HELPER — PROFESSIONAL TEMPLATE
   ═══════════════════════════════════════════════════════════════ */
function _printGenericPDF(title, headers, rows, opts) {
  opts = opts || {};
  const company = currentCompany();
  const now = new Date();
  const dateStr = now.toLocaleDateString('ar-LY');
  const timeStr = now.toLocaleTimeString('ar-LY', {hour:'2-digit',minute:'2-digit'});
  const colStyles = opts.colStyles || {};
  const colCount = headers.length;

  // Summary cards
  const summaryHtml = opts.summary ? opts.summary.map(s =>
    `<div class="summary-card ${s.color||''}"><div class="sc-label">${s.label}</div><div class="sc-value">${s.value}</div></div>`
  ).join('') : '';

  // Table header
  const thead = '<tr>' + headers.map((h, i) =>
    `<th style="${colStyles[i] || ''}">${h}</th>`
  ).join('') + '</tr>';

  // Table body with alternating rows
  const tbody = rows.map((r, ri) => {
    const cells = r.map((c, ci) => {
      let style = colStyles[ci] || '';
      // Auto-detect numeric columns and align left
      if (typeof c === 'number' || (typeof c === 'string' && /^[\d,.\-+]+/.test(c))) {
        style += 'direction:ltr;text-align:right;font-family:monospace;';
      }
      return `<td style="${style}">${c}</td>`;
    }).join('');
    return `<tr class="${ri % 2 === 1 ? 'alt' : ''}">${cells}</tr>`;
  }).join('');

  // Table footer
  const total = opts.footer ? `<tfoot><tr>${opts.footer.map((c, i) =>
    `<td style="font-weight:700;${colStyles[i] || ''}">${c}</td>`
  ).join('')}</tr></tfoot>` : '';

  const landscape = opts.landscape ? 'A4 landscape' : 'A4 portrait';

  const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
  @page{size:${landscape};margin:14mm 16mm 18mm 16mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Cairo',Helvetica,Arial,sans-serif;direction:rtl;color:#1e293b;padding:0;font-size:${opts.fontSize||'11'}px;line-height:1.5;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}

  .rpt{position:relative;padding:20px 24px 60px}

  /* Top accent bar */
  .rpt-accent{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(135deg,#4f8ef7 0%,#6c5ce7 50%,#a855f7 100%);border-radius:0 0 4px 4px}

  /* Side accent strip */
  .rpt-side{position:absolute;top:0;right:0;width:4px;height:100%;background:linear-gradient(180deg,#4f8ef7,#6c5ce7,#a855f7);border-radius:0 0 4px 4px;opacity:.3}

  /* Header area */
  .rpt-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;padding-top:12px;gap:20px}
  .rpt-company{flex:1}
  .rpt-company-name{font-size:22px;font-weight:800;color:#4f8ef7;margin-bottom:3px;letter-spacing:-0.3px}
  .rpt-company-sub{font-size:11px;color:#64748b;line-height:1.6}
  .rpt-company-sub span{display:inline-block;margin-left:12px}
  .rpt-title-box{text-align:left;min-width:220px}
  .rpt-report-title{font-size:26px;font-weight:800;color:#1e293b;margin-bottom:4px;position:relative}
  .rpt-report-title::after{content:'';display:block;width:60px;height:3px;background:linear-gradient(90deg,#4f8ef7,#6c5ce7);border-radius:2px;margin-top:6px;margin-left:auto}
  .rpt-report-meta{font-size:10px;color:#94a3b8;line-height:1.8;margin-top:8px}
  .rpt-report-meta strong{color:#475569;font-weight:600}

  /* Count badge */
  .rpt-count{display:inline-flex;align-items:center;gap:5px;background:linear-gradient(135deg,#eff6ff,#dbeafe);color:#4f8ef7;padding:4px 14px;border-radius:20px;font-size:10px;font-weight:700;margin-top:6px;border:1px solid #bfdbfe}
  .rpt-count i{font-size:12px}

  /* Summary cards */
  .rpt-summary{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap}
  .summary-card{flex:1;min-width:120px;padding:10px 14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;text-align:center}
  .summary-card.green{border-color:#bbf7d0;background:#f0fdf4}
  .summary-card.red{border-color:#fecaca;background:#fef2f2}
  .summary-card.blue{border-color:#bfdbfe;background:#eff6ff}
  .summary-card.purple{border-color:#e9d5ff;background:#faf5ff}
  .summary-card.amber{border-color:#fde68a;background:#fffbeb}
  .sc-label{font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:2px}
  .sc-value{font-size:16px;font-weight:800;color:#1e293b}
  .summary-card.green .sc-value{color:#16a34a}
  .summary-card.red .sc-value{color:#dc2626}
  .summary-card.blue .sc-value{color:#4f8ef7}
  .summary-card.purple .sc-value{color:#9333ea}
  .summary-card.amber .sc-value{color:#d97706}

  /* Info row */
  .rpt-info{display:flex;gap:16px;margin-bottom:14px;padding:10px 14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:11px;color:#64748b;flex-wrap:wrap}
  .rpt-info span{display:flex;align-items:center;gap:4px}
  .rpt-info strong{color:#1e293b}

  /* Table */
  table{width:100%;border-collapse:collapse;margin:0;font-size:${opts.fontSize||'11'}px}
  thead th{background:linear-gradient(135deg,#4f8ef7,#5b9cf7);color:#fff;padding:10px 8px;font-weight:600;text-align:right;font-size:${opts.fontSize||'11'}px;white-space:nowrap;position:sticky;top:0}
  thead th:first-child{border-radius:0 8px 0 0}
  thead th:last-child{border-radius:8px 0 0 0}
  tbody td{padding:8px;border-bottom:1px solid #f1f5f9;vertical-align:middle}
  tbody tr.alt{background:#f8fafc}
  tbody tr:hover{background:#eff6ff}
  tbody tr:last-child td{border-bottom:2px solid #e2e8f0}
  tfoot td{padding:10px 8px;border-top:3px solid #4f8ef7;background:linear-gradient(135deg,#eff6ff,#f0f4ff);font-size:12px;font-weight:700;color:#1e293b}

  /* Footer */
  .rpt-footer{margin-top:20px;padding-top:12px;border-top:2px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;font-size:9px;color:#94a3b8}
  .rpt-footer-brand{font-weight:700;color:#4f8ef7;font-size:11px}
  .rpt-footer-page{font-family:monospace;direction:ltr}

  /* Watermark */
  .rpt-watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:60px;font-weight:900;color:rgba(79,142,247,0.03);pointer-events:none;z-index:0;white-space:nowrap;letter-spacing:8px}

  /* Stamp area */
  .rpt-stamps{display:flex;gap:24px;margin-top:16px;justify-content:flex-start}
  .rpt-stamp{width:130px;height:55px;border:1.5px dashed #cbd5e1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#94a3b8;flex-direction:column;gap:2px;background:#fafbfc}
  .rpt-stamp i{font-size:14px;opacity:.4}

  /* Signature line */
  .rpt-signature{display:flex;justify-content:space-between;margin-top:20px;padding:0 20px}
  .sig-line{text-align:center;width:160px}
  .sig-line .line{border-top:1px solid #94a3b8;margin-top:40px;padding-top:4px;font-size:9px;color:#94a3b8}

  /* Print styles */
  @media print{
    body{padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .rpt{padding:0 4mm 10mm}
    .rpt-watermark{display:none}
    .rpt-accent{height:4px}
    table{page-break-inside:auto}
    tr{page-break-inside:avoid;page-break-after:auto}
    thead{display:table-header-group}
    tfoot{display:table-footer-group}
  }
  </style></head><body>
  <div class="rpt">
    <div class="rpt-accent"></div>
    <div class="rpt-side"></div>
    <div class="rpt-watermark">${title}</div>

    <div class="rpt-header">
      <div class="rpt-company">
        ${company.logo?'<div style="margin-bottom:6px">'+companyLogoHtml(company,45)+'</div>':''}
        <div class="rpt-company-name">${company.name}</div>
        <div class="rpt-company-sub">
          ${company.address ? '<span><i class="ti ti-map-pin" style="font-size:10px"></i> '+company.address+'</span>' : ''}
          ${company.phone ? '<span><i class="ti ti-phone" style="font-size:10px"></i> '+company.phone+'</span>' : ''}
          ${company.email ? '<span><i class="ti ti-mail" style="font-size:10px"></i> '+company.email+'</span>' : ''}
          ${company.taxNo ? '<span><i class="ti ti-id" style="font-size:10px"></i> ض.ق: '+company.taxNo+'</span>' : ''}
        </div>
      </div>
      <div class="rpt-title-box">
        <div class="rpt-report-title">${title}</div>
        <div class="rpt-report-meta">
          <div>تاريخ التقرير: <strong>${dateStr}</strong></div>
          <div>الوقت: <strong>${timeStr}</strong></div>
          ${opts.subtitle ? '<div>'+opts.subtitle+'</div>' : ''}
        </div>
        <div class="rpt-count"><i class="ti ti-database"></i> ${rows.length} سجل</div>
      </div>
    </div>

    ${summaryHtml ? '<div class="rpt-summary">' + summaryHtml + '</div>' : ''}

    <div class="rpt-info">
      <span>الشركة: <strong>${company.name}</strong></span>
      <span>التاريخ: <strong>${dateStr}</strong></span>
      <span>الوقت: <strong>${timeStr}</strong></span>
      ${opts.infoItems ? opts.infoItems.map(i => `<span>${i.label}: <strong>${i.value}</strong></span>`).join('') : ''}
    </div>

    <table><thead>${thead}</thead><tbody>${tbody}</tbody>${total}</table>

    <div class="rpt-stamps">
      <div class="rpt-stamp"><i class="ti ti-stamp"></i>ختم المؤسسة</div>
      <div class="rpt-stamp"><i class="ti ti-signature"></i>توقيع المسؤول</div>
    </div>

    <div class="rpt-footer">
      <span class="rpt-footer-brand">${company.name}</span>
      <span>تاريخ الطباعة: ${dateStr} ${timeStr}</span>
      <span class="rpt-footer-page">صفحة 1 من 1</span>
    </div>
  </div>
  </body></html>`;

  const win = window.open('', '_blank', 'width=1050,height=850');
  if (!win) { toast('تعذر فتح نافذة الطباعة — تأكد من السماح النوافذ المنبثقة', 'error'); return; }
  win.document.write(html);
  win.document.close();
  setTimeout(() => { try { win.print(); } catch(e){} }, 600);
}

/* ═══════════════════════════════════════════════════════════════
   ITEMS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printItemsPDF() {
  const h = ['الكود','الصنف','الفئة','سعر الشراء','سعر البيع','الرصيد','الوحدة','الحالة'];
  const rows = DB.items.map(x => {
    const st = x.qty === 0 ? 'نفدت' : x.qty <= x.reorder ? 'منخفض' : 'جيد';
    return [x.code, x.name, x.cat, fmt(x.buy), fmt(x.sell), x.qty, x.unit, st];
  });
  if (!rows.length) { toast('لا توجد أصناف', 'info'); return; }
  _printGenericPDF('قائمة الأصناف', h, rows, { subtitle: 'المخزون والأصناف' });
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOMERS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printCustomersPDF() {
  const h = ['الاسم','الهاتف','العنوان','الرصيد الافتتاحي','المبيعات','الذمة المدينة'];
  const rows = DB.custs.map(c => {
    const recv = custReceivable(c);
    const totalSales = DB.invs.filter(i => i.custId === c.id).reduce((s, i) => s + i.total, 0) + (parseFloat(c.openBal) || 0);
    return [c.name, c.phone || '', c.addr || '', fmt(c.openBal || 0), fmt(totalSales), fmt(recv)];
  });
  if (!rows.length) { toast('لا يوجد زبائن', 'info'); return; }
  const totalReceivable = DB.custs.reduce((s, c) => s + custReceivable(c), 0);
  const totalSalesAll = DB.custs.reduce((s, c) => s + DB.invs.filter(i => i.custId === c.id).reduce((si, i) => si + i.total, 0), 0);
  _printGenericPDF('قائمة الزبائن', h, rows, {
    subtitle: 'بيانات الزبائن والذمم المدينة',
    summary: [
      { label: 'عدد الزبائن', value: DB.custs.length, color: 'blue' },
      { label: 'إجمالي المبيعات', value: fmt(totalSalesAll) + ' د.ل', color: 'green' },
      { label: 'الذمم المدينة', value: fmt(totalReceivable) + ' د.ل', color: 'red' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   SUPPLIERS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printSuppliersPDF() {
  const h = ['الاسم','الهاتف','العنوان','المشتريات','المدفوع','الذمة الدائنة'];
  const rows = DB.sups.map(s => {
    const totalPur = DB.purs.filter(p => p.supId === s.id).reduce((sum, p) => sum + p.total, 0);
    const paid = DB.supPayments.filter(p => p.supId === s.id).reduce((sum, p) => sum + p.amount, 0);
    return [s.name, s.phone || '', s.addr || '', fmt(totalPur), fmt(paid), fmt(totalPur - paid)];
  });
  if (!rows.length) { toast('لا يوجد موردون', 'info'); return; }
  const totalPayable = DB.sups.reduce((s, sup) => {
    const totalPur = DB.purs.filter(p => p.supId === sup.id).reduce((sum, p) => sum + p.total, 0);
    const paid = DB.supPayments.filter(p => p.supId === sup.id).reduce((sum, p) => sum + p.amount, 0);
    return s + (totalPur - paid);
  }, 0);
  _printGenericPDF('قائمة الموردين', h, rows, {
    subtitle: 'بيانات الموردين والذمم الدائنة',
    summary: [
      { label: 'عدد الموردين', value: DB.sups.length, color: 'blue' },
      { label: 'إجمالي المشتريات', value: fmt(DB.purs.reduce((s, p) => s + p.total, 0)) + ' د.ل', color: 'purple' },
      { label: 'الذمم الدائنة', value: fmt(totalPayable) + ' د.ل', color: 'red' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   SALES — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printSalesPDF() {
  const h = ['رقم الفاتورة','الزبون','التاريخ','الإجمالي','المحصَّل','المتبقي','حالة الدفع'];
  const rows = DB.invs.map(inv => {
    const paid = invPaid(inv);
    const rem = invRemaining(inv);
    const pay = paid <= 0 ? 'غير مسدَّدة' : paid >= inv.total - 0.001 ? 'مسددة' : 'جزئي';
    return [inv.num, inv.custName, inv.date, fmt(inv.total), fmt(paid), fmt(rem), pay];
  });
  if (!rows.length) { toast('لا توجد فواتير', 'info'); return; }
  const totalAll = DB.invs.reduce((s, i) => s + i.total, 0);
  const paidAll = DB.invs.reduce((s, i) => s + invPaid(i), 0);
  const remAll = totalAll - paidAll;
  const delivered = DB.invs.filter(i => i.dlvStatus === 'delivered').length;
  _printGenericPDF('فواتير البيع', h, rows, {
    subtitle: 'سجل فواتير البيع',
    footer: ['الإجمالي', '', '', fmt(totalAll), fmt(paidAll), fmt(remAll), ''],
    summary: [
      { label: 'إجمالي الفواتير', value: fmt(totalAll) + ' د.ل', color: 'blue' },
      { label: 'المحصَّل', value: fmt(paidAll) + ' د.ل', color: 'green' },
      { label: 'المتبقي', value: fmt(remAll) + ' د.ل', color: 'red' },
      { label: 'عدد الفواتير', value: DB.invs.length, color: 'purple' },
      { label: 'مسلَّمة', value: delivered, color: 'amber' }
    ],
    infoItems: [
      { label: 'إجمالي الفواتير', value: DB.invs.length + ' فاتورة' },
      { label: 'الفواتير المسلَّمة', value: delivered },
      { label: 'نسبة التحصيل', value: totalAll > 0 ? ((paidAll / totalAll) * 100).toFixed(1) + '%' : '0%' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   PURCHASES — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printPurchasesPDF() {
  const h = ['رقم الفاتورة','المورد','التاريخ','الإجمالي','المدفوع','المتبقي','حالة الدفع'];
  const rows = DB.purs.map(p => {
    const paid = purPaid(p);
    const rem = purRemaining(p);
    const status = paid <= 0 ? 'غير مدفوعة' : paid >= p.total - 0.001 ? 'مدفوعة' : 'جزئي';
    return [p.num, p.supName, p.date, fmt(p.total), fmt(paid), fmt(rem), status];
  });
  if (!rows.length) { toast('لا توجد فواتير شراء', 'info'); return; }
  const totalAll = DB.purs.reduce((s, p) => s + p.total, 0);
  const paidAll = DB.purs.reduce((s, p) => s + purPaid(p), 0);
  const remAll = totalAll - paidAll;
  _printGenericPDF('فواتير الشراء', h, rows, {
    subtitle: 'سجل فواتير الشراء',
    footer: ['الإجمالي', '', '', fmt(totalAll), fmt(paidAll), fmt(remAll), ''],
    summary: [
      { label: 'إجمالي المشتريات', value: fmt(totalAll) + ' د.ل', color: 'blue' },
      { label: 'المدفوع', value: fmt(paidAll) + ' د.ل', color: 'green' },
      { label: 'المتبقي', value: fmt(remAll) + ' د.ل', color: 'red' },
      { label: 'عدد الفواتير', value: DB.purs.length, color: 'purple' }
    ],
    infoItems: [
      { label: 'عدد الفواتير', value: DB.purs.length + ' فاتورة' },
      { label: 'نسبة الدفع', value: totalAll > 0 ? ((paidAll / totalAll) * 100).toFixed(1) + '%' : '0%' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   RETURNS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printReturnsPDF() {
  const h = ['رقم المرتجع','رقم الفاتورة','الزبون','المبلغ','السبب','فحص الجودة','التاريخ'];
  const rows = DB.rets.map(r => {
    const qc = r.qcStatus === 'passed' ? 'مقبول' : r.qcStatus === 'failed' ? 'مرفوض' : 'قيد المراجعة';
    return [r.num, r.invNum, r.custName, fmt(r.amt), r.reason || '', qc, r.date];
  });
  if (!rows.length) { toast('لا توجد مرتجعات', 'info'); return; }
  const totalAll = DB.rets.reduce((s, r) => s + r.amt, 0);
  const passed = DB.rets.filter(r => r.qcStatus === 'passed').length;
  const failed = DB.rets.filter(r => r.qcStatus === 'failed').length;
  const pending = DB.rets.filter(r => r.qcStatus !== 'passed' && r.qcStatus !== 'failed').length;
  _printGenericPDF('مرتجعات المبيعات', h, rows, {
    subtitle: 'سجل مرتجعات البيع',
    footer: ['الإجمالي', '', '', fmt(totalAll), '', '', ''],
    summary: [
      { label: 'إجمالي المرتجعات', value: fmt(totalAll) + ' د.ل', color: 'red' },
      { label: 'عدد المرتجعات', value: DB.rets.length, color: 'blue' },
      { label: 'مقبول', value: passed, color: 'green' },
      { label: 'مرفوض', value: failed, color: 'red' },
      { label: 'قيد المراجعة', value: pending, color: 'amber' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   SUPPLIER PAYMENTS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printSupplierPaymentsPDF() {
  const h = ['رقم الدفعة','المورد','فاتورة الشراء','المبلغ','طريقة الدفع','التاريخ','ملاحظات'];
  const rows = DB.supPayments.map(p => {
    const mode = p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode;
    return [p.id, p.supName || '', p.purNum || '', fmt(p.amount), mode, p.date, p.notes || ''];
  });
  if (!rows.length) { toast('لا توجد دفعات', 'info'); return; }
  const totalAll = DB.supPayments.reduce((s, p) => s + p.amount, 0);
  const cashTotal = DB.supPayments.filter(p => p.mode === 'cash').reduce((s, p) => s + p.amount, 0);
  const checkTotal = DB.supPayments.filter(p => p.mode === 'check').reduce((s, p) => s + p.amount, 0);
  _printGenericPDF('دفعات الموردين', h, rows, {
    subtitle: 'سجل مدفوعات الموردين',
    footer: ['الإجمالي', '', '', fmt(totalAll), '', '', ''],
    summary: [
      { label: 'إجمالي المدفوعات', value: fmt(totalAll) + ' د.ل', color: 'red' },
      { label: 'نقدي', value: fmt(cashTotal) + ' د.ل', color: 'blue' },
      { label: 'صكوك', value: fmt(checkTotal) + ' د.ل', color: 'purple' },
      { label: 'عدد الدفعات', value: DB.supPayments.length, color: 'amber' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   USERS — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printUsersPDF() {
  const h = ['الاسم','اسم الحساب','الصلاحية','الحالة'];
  const rows = DB.users.map(u => {
    const role = u.role === 'admin' ? 'مشرف' : u.role === 'sales' ? 'مبيعات' : u.role === 'inventory' ? 'مخازن' : u.role;
    const status = u.status || (u.isActive === false ? 'غير نشط' : 'نشط');
    return [u.name, u.username, role, status];
  });
  if (!rows.length) { toast('لا يوجد مستخدمون', 'info'); return; }
  const active = DB.users.filter(u => u.status !== 'غير نشط' && u.isActive !== false).length;
  const inactive = DB.users.length - active;
  _printGenericPDF('قائمة المستخدمين', h, rows, {
    subtitle: 'حسابات المستخدمين والصلاحيات',
    summary: [
      { label: 'عدد المستخدمين', value: DB.users.length, color: 'blue' },
      { label: 'نشط', value: active, color: 'green' },
      { label: 'غير نشط', value: inactive, color: 'red' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOMER PAYMENTS (collections) — PDF / PRINT / EXCEL
   ═══════════════════════════════════════════════════════════════ */
function printPaymentsPDF() {
  const h = ['رقم الدفعة','الزبون','رقم الفاتورة','المبلغ','طريقة الدفع','التاريخ','ملاحظات'];
  const rows = DB.payments.map(p => {
    const mode = p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode;
    return [p.id, p.custName || '', p.invNum || '', fmt(p.amount), mode, p.date, p.notes || ''];
  });
  if (!rows.length) { toast('لا توجد محصَّلات', 'info'); return; }
  const totalAll = DB.payments.reduce((s, p) => s + p.amount, 0);
  const cashTotal = DB.payments.filter(p => p.mode === 'cash').reduce((s, p) => s + p.amount, 0);
  const checkTotal = DB.payments.filter(p => p.mode === 'check').reduce((s, p) => s + p.amount, 0);
  _printGenericPDF('المحصَّلات من الزبائن', h, rows, {
    subtitle: 'سجل التحصيل من الزبائن',
    footer: ['الإجمالي', '', '', fmt(totalAll), '', '', ''],
    summary: [
      { label: 'إجمالي التحصيل', value: fmt(totalAll) + ' د.ل', color: 'green' },
      { label: 'نقدي', value: fmt(cashTotal) + ' د.ل', color: 'blue' },
      { label: 'صكوك', value: fmt(checkTotal) + ' د.ل', color: 'purple' },
      { label: 'عدد الدفعات', value: DB.payments.length, color: 'amber' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   FINANCE — EXCEL
   ═══════════════════════════════════════════════════════════════ */
function exportFinance() {
  const h = ['النوع','التاريخ','البيان','المورد/الزبون','المبلغ','طريقة الدفع'];
  const rows = [];
  DB.payments.forEach(p => {
    rows.push(['تحصيل', p.date, p.notes || 'تحصيل من زبون', p.custName || '', p.amount, p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode]);
  });
  DB.supPayments.forEach(p => {
    rows.push(['دفعة', p.date, p.notes || 'دفعة لمورد', p.supName || '', -p.amount, p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode]);
  });
  if (!rows.length) { toast('لا توجد حركات مالية', 'info'); return; }
  _exportTable(h, rows, 'الحركة المالية', 'finance-export');
  toast('تم تصدير الحركات المالية');
}

/* ═══════════════════════════════════════════════════════════════
   FINANCE — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printFinancePDF() {
  const h = ['النوع','التاريخ','البيان','المورد/الزبون','المبلغ','طريقة الدفع'];
  const rows = [];
  DB.payments.forEach(p => {
    rows.push(['تحصيل', p.date, p.notes || 'تحصيل', p.custName || '', '+' + fmt(p.amount), p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode]);
  });
  DB.supPayments.forEach(p => {
    rows.push(['دفعة', p.date, p.notes || 'دفعة', p.supName || '', '-' + fmt(p.amount), p.mode === 'cash' ? 'نقدي' : p.mode === 'check' ? 'صك' : p.mode === 'transfer' ? 'تحويل' : p.mode]);
  });
  if (!rows.length) { toast('لا توجد حركات مالية', 'info'); return; }
  const inflow = DB.payments.reduce((s, p) => s + p.amount, 0);
  const outflow = DB.supPayments.reduce((s, p) => s + p.amount, 0);
  const netFlow = inflow - outflow;
  _printGenericPDF('الحركة المالية', h, rows, {
    subtitle: 'التحصيلات والمدفوعات',
    footer: ['صافي الحركة', '', '', '', (netFlow >= 0 ? '+' : '') + fmt(netFlow), ''],
    summary: [
      { label: 'التحصيلات (وارد)', value: '+' + fmt(inflow) + ' د.ل', color: 'green' },
      { label: 'المدفوعات (صادر)', value: '-' + fmt(outflow) + ' د.ل', color: 'red' },
      { label: 'صافي الحركة', value: (netFlow >= 0 ? '+' : '') + fmt(netFlow) + ' د.ل', color: netFlow >= 0 ? 'blue' : 'red' },
      { label: 'عدد الحركات', value: rows.length, color: 'purple' }
    ],
    infoItems: [
      { label: 'الوارد', value: DB.payments.length + ' دفعة' },
      { label: 'الصادر', value: DB.supPayments.length + ' دفعة' },
      { label: 'الصافي', value: (netFlow >= 0 ? '+' : '') + fmt(netFlow) + ' د.ل' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   P&L — EXCEL
   ═══════════════════════════════════════════════════════════════ */
function exportPL() {
  const totalSales = DB.invs.reduce((s, i) => s + i.total, 0);
  const totalCost = DB.invs.reduce((s, i) => s + i.lines.reduce((ls, l) => ls + (l.cost || 0) * l.qty, 0), 0);
  const gross = totalSales - totalCost;
  const retTotal = DB.rets.reduce((s, r) => s + r.amt, 0);
  const net = gross - retTotal;
  const h = ['البند', 'المبلغ'];
  const rows = [
    ['إجمالي المبيعات', totalSales],
    ['تكلفة البضاعة المباعة (COGS)', totalCost],
    ['إجمالي الربح', gross],
    ['المرتجعات', retTotal],
    ['صافي الربح', net]
  ];
  _exportTable(h, rows, 'قائمة الدخل', 'pl-export');
  toast('تم تصدير قائمة الدخل');
}

/* ═══════════════════════════════════════════════════════════════
   P&L — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printPLPDF() {
  const totalSales = DB.invs.reduce((s, i) => s + i.total, 0);
  const totalCost = DB.invs.reduce((s, i) => s + i.lines.reduce((ls, l) => ls + (l.buyPrice || l.cost || 0) * l.qty, 0), 0);
  const gross = totalSales - totalCost;
  const retTotal = DB.rets.reduce((s, r) => s + r.amt, 0);
  const net = gross - retTotal;
  const margin = totalSales > 0 ? ((net / totalSales) * 100).toFixed(1) : '0.0';
  const deliveredCount = DB.invs.filter(i => i.dlvStatus === 'delivered').length;
  const h = ['البند', 'المبلغ (د.ل)'];
  const rows = [
    ['إجمالي المبيعات (efore)', fmt(totalSales)],
    ['تكلفة البضاعة المباعة (COGS)', fmt(totalCost)],
    ['الربح الإجمالي (Gross)', fmt(gross)],
    ['المرتجعات', fmt(retTotal)],
    ['صافي الربح (Net)', fmt(net)]
  ];
  _printGenericPDF('قائمة الدخل (P&L)', h, rows, {
    subtitle: 'تقرير الأرباح والخسائر',
    summary: [
      { label: 'إجمالي الإيرادات', value: fmt(totalSales) + ' د.ل', color: 'blue' },
      { label: 'التكلفة', value: fmt(totalCost) + ' د.ل', color: 'red' },
      { label: 'صافي الربح', value: fmt(net) + ' د.ل', color: 'green' },
      { label: 'هامش الربح', value: margin + '%', color: 'purple' }
    ],
    infoItems: [
      { label: 'الفواتير المسلَّمة', value: deliveredCount },
      { label: 'هامش الربح', value: margin + '%' },
      { label: 'المرتجعات', value: fmt(retTotal) + ' د.ل' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   AUDIT LOG — EXCEL
   ═══════════════════════════════════════════════════════════════ */
function exportAudit() {
  const h = ['التاريخ','المستخدم','الإجراء','النوع','الرقم','التفاصيل'];
  const rows = DB.log.map(a => [a.date, a.user || '', a.action || '', a.entity || '', a.entityId || '', a.details || '']);
  if (!rows.length) { toast('لا توجد سجلات', 'info'); return; }
  _exportTable(h, rows, 'سجل التدقيق', 'audit-export');
  toast('تم تصدير سجل التدقيق');
}

/* ═══════════════════════════════════════════════════════════════
   AUDIT LOG — PDF / PRINT
   ═══════════════════════════════════════════════════════════════ */
function printAuditPDF() {
  const h = ['التاريخ','المستخدم','الإجراء','النوع','الرقم','التفاصيل'];
  const rows = DB.log.map(l => [l.date + ' ' + (l.time||''), l.user || '', l.action || '', l.detail || '', '', '']);
  if (!rows.length) { toast('لا توجد سجلات', 'info'); return; }
  const users = [...new Set(DB.log.map(l => l.user).filter(Boolean))];
  _printGenericPDF('سجل التدقيق', h, rows, {
    subtitle: 'سجل العمليات والتغييرات',
    landscape: true,
    fontSize: 10,
    summary: [
      { label: 'إجمالي السجلات', value: DB.log.length, color: 'blue' },
      { label: 'المستخدمون', value: users.length, color: 'purple' }
    ]
  });
}