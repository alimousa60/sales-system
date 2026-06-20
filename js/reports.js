/* ═══ SOA ═══ */
function renderSOA(){
  const type=G('soa-type')?.value||'customer';
  const id=parseInt(G('soa-cust').value);
  const out=G('soa-out');
  const company=currentCompany();
  const from=G('soa-from').value,to=G('soa-to').value;
  if(type==='supplier'){
    const s=DB.sups.find(x=>x.id===id);
    if(!s){out.innerHTML='<div class="card" style="text-align:center;color:var(--text-muted);padding:40px"><i class="ti ti-users" style="font-size:36px;display:block;margin-bottom:8px;opacity:.3"></i>اختر موردًا لعرض كشف حسابه</div>';return}
    let txns=[];
    DB.purs.filter(p=>p.supId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`فاتورة شراء ${p.num}`,dr:p.total,cr:0,type:'pur'})});
    DB.supPayments.filter(p=>p.supId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`دفعة ${p.id}`,dr:0,cr:p.amount,type:'pay'})});
    txns.sort((a,b)=>a.date.localeCompare(b.date));
    let bal=0;
    const rows=txns.map(t=>{bal+=t.dr-t.cr;return`<tr><td>${t.date}</td><td>${t.desc}</td><td class="td-mono" style="color:var(--red)">${t.dr?fmt(t.dr)+' د.ل':'—'}</td><td class="td-mono" style="color:var(--green)">${t.cr?fmt(t.cr)+' د.ل':'—'}</td><td class="td-mono" style="font-weight:700">${fmt(bal)} د.ل</td></tr>`}).join('');
    out.innerHTML=renderSOATable(company,s.name,rows,bal,txns)
  } else {
    const c=DB.custs.find(x=>x.id===id);
    if(!c){out.innerHTML='<div class="card" style="text-align:center;color:var(--text-muted);padding:40px"><i class="ti ti-user-circle" style="font-size:36px;display:block;margin-bottom:8px;opacity:.3"></i>اختر زبوناً لعرض كشف حسابه</div>';return}
    let txns=[];
    const openBal=parseFloat(c.openBal)||0;
    if(openBal>0){txns.push({date:'—',desc:'رصيد افتتاحي (مديونية سابقة)',dr:openBal,cr:0,type:'obal'})}
    DB.invs.filter(i=>i.custId===id).forEach(i=>{if(from&&i.date<from)return;if(to&&i.date>to)return;txns.push({date:i.date,desc:`فاتورة ${i.num}`,dr:i.total,cr:0,type:'inv'})});
    DB.payments.filter(p=>p.custId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`دفعة ${p.id || ''}`,dr:0,cr:p.amount,type:'pay'})});
    DB.rets.filter(r=>{const inv=DB.invs.find(i=>i.num===r.invNum);return inv&&inv.custId===id}).forEach(r=>{if(from&&r.date<from)return;if(to&&r.date>to)return;txns.push({date:r.date,desc:`مرتجع ${r.num}`,dr:-r.amt,cr:r.amt,type:'ret'})});
    txns.sort((a,b)=>a.date.localeCompare(b.date));
    let bal=0;
    const rows=txns.map(t=>{bal+=t.dr-t.cr;const drAmount=t.dr<0?0:t.dr;return`<tr><td>${t.date}</td><td>${t.desc}</td><td class="td-mono" style="color:var(--red)">${drAmount?fmt(drAmount)+' د.ل':'—'}</td><td class="td-mono" style="color:var(--green)">${t.cr?fmt(t.cr)+' د.ل':'—'}</td><td class="td-mono" style="font-weight:700">${fmt(bal)} د.ل</td></tr>`}).join('');
    out.innerHTML=renderSOATable(company,c.name,rows,bal,txns)
  }
}
function renderSOATable(company,name,rows,bal,txns){
  const totalDr=(txns||[]).reduce((s,t)=>s+(t.dr>0?t.dr:0),0);
  const totalCr=(txns||[]).reduce((s,t)=>s+(t.cr||0),0);
  return`<div class="card"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><div><h2 style="font-size:18px;margin:0">${company.name}</h2><div style="font-size:11px;color:var(--text-muted)">${company.address}</div></div><h3 style="color:var(--accent)">${name}</h3></div><div class="tbl-wrap"><table><thead><tr><th>التاريخ</th><th>البيان</th><th>مدين</th><th>دائن</th><th>الرصيد</th></tr></thead><tbody>${rows||'<tr><td colspan="5"><div class="empty-st">لا توجد حركات.</div></td></tr>'}</tbody></table></div><div style="display:flex;gap:30px;margin-top:12px;padding:10px;border-top:1px solid var(--border)"><span><strong>إجمالي المدين:</strong> ${fmt(totalDr)} د.ل</span><span><strong>إجمالي الدائن:</strong> ${fmt(totalCr)} د.ل</span><span style="color:${bal>0?'var(--red)':'var(--green)'}"><strong>الرصيد النهائي:</strong> ${fmt(bal)} د.ل</span></div></div>`;
}

function printSOA(){
  const type=G('soa-type')?.value||'customer';
  const id=parseInt(G('soa-cust').value);
  const company=currentCompany();
  const from=G('soa-from').value,to=G('soa-to').value;
  let name='';let txns=[];
  if(type==='supplier'){
    const s=DB.sups.find(x=>x.id===id);if(!s){toast('اختر مورداً أولاً','error');return}
    name=s.name;
    DB.purs.filter(p=>p.supId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`فاتورة شراء ${p.num}`,dr:p.total,cr:0})});
    DB.supPayments.filter(p=>p.supId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`دفعة ${p.id}`,dr:0,cr:p.amount})});
  } else {
    const c=DB.custs.find(x=>x.id===id);if(!c){toast('اختر زبوناً أولاً','error');return}
    name=c.name;
    const openBal=parseFloat(c.openBal)||0;
    if(openBal>0)txns.push({date:'—',desc:'رصيد افتتاحي',dr:openBal,cr:0});
    DB.invs.filter(i=>i.custId===id).forEach(i=>{if(from&&i.date<from)return;if(to&&i.date>to)return;txns.push({date:i.date,desc:`فاتورة ${i.num}`,dr:i.total,cr:0})});
    DB.payments.filter(p=>p.custId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`دفعة ${p.id||''}`,dr:0,cr:p.amount})});
    DB.rets.filter(r=>{const inv=DB.invs.find(i=>i.num===r.invNum);return inv&&inv.custId===id}).forEach(r=>{if(from&&r.date<from)return;if(to&&r.date>to)return;txns.push({date:r.date,desc:`مرتجع ${r.num}`,dr:-r.amt,cr:r.amt})});
  }
  txns.sort((a,b)=>a.date.localeCompare(b.date));
  let bal=0;txns.forEach(t=>{bal+=t.dr-t.cr});
  const totalDr=txns.reduce((s,t)=>s+(t.dr>0?t.dr:0),0);
  const totalCr=txns.reduce((s,t)=>s+(t.cr||0),0);
  const win=window.open('','_blank','width=960,height=1150');
  if(!win){toast('تعذر فتح نافذة الطباعة — تأكد من السماح النوافذ المنبثقة','error');return}
  const now=new Date();
  const dateStr=now.toLocaleDateString('ar-LY');
  const timeStr=now.toLocaleTimeString('ar-LY',{hour:'2-digit',minute:'2-digit'});
  const dateRange=(from||to)?`من ${from||'...'} إلى ${to||'...'}`:'كل الفترة';
  const balColor=bal>0.001?'#dc2626':bal<-0.001?'#16a34a':'#1e293b';
  const balBg=bal>0.001?'#fef2f2':bal<-0.001?'#f0fdf4':'#f8fafc';
  const balBorder=bal>0.001?'#fecaca':bal<-0.001?'#bbf7d0':'#e2e8f0';
  const balLabel=bal>0.001?'(مدين)':bal<-0.001?'(دائن)':'(متساوي)';
  let runningBal=0;
  const rowsHtml=txns.length?txns.map(t=>{
    runningBal+=t.dr-t.cr;
    const drAmt=t.dr<0?0:t.dr;
    const rowBal=runningBal;
    const rowColor=rowBal>0.001?'#dc2626':rowBal<-0.001?'#16a34a':'#1e293b';
    return`<tr>
      <td style="font-family:monospace;direction:ltr;text-align:right">${t.date}</td>
      <td>${t.desc}</td>
      <td style="direction:ltr;text-align:right;font-family:monospace;font-weight:600">${drAmt?fmt(drAmt):'—'}</td>
      <td style="direction:ltr;text-align:right;font-family:monospace;font-weight:600">${t.cr?fmt(t.cr):'—'}</td>
      <td style="font-weight:700;color:${rowColor};direction:ltr;text-align:right;font-family:monospace">${fmt(rowBal)}</td>
    </tr>`
  }).join(''):'<tr><td colspan="5" style="text-align:center;padding:40px;color:#94a3b8"><i class="ti ti-inbox" style="font-size:28px;display:block;margin-bottom:8px;opacity:.3"></i>لا توجد حركات في الفترة المحددة</td></tr>';

  const html=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>كشف حساب ${name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
  @page{size:A4 portrait;margin:14mm 18mm 16mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Cairo',Helvetica,Arial,sans-serif;direction:rtl;color:#1e293b;padding:0;font-size:12px;line-height:1.5;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}

  .soa{position:relative;padding:20px 24px 60px}

  /* Accent bars */
  .soa-accent{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(135deg,#4f8ef7 0%,#6c5ce7 50%,#a855f7 100%);border-radius:0 0 4px 4px}
  .soa-side{position:absolute;top:0;right:0;width:4px;height:100%;background:linear-gradient(180deg,#4f8ef7,#6c5ce7,#a855f7);border-radius:0 0 4px 4px;opacity:.25}

  /* Watermark */
  .soa-watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:52px;font-weight:900;color:rgba(79,142,247,0.03);pointer-events:none;z-index:0;white-space:nowrap;letter-spacing:6px}

  /* Header */
  .soa-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px;padding-top:10px;gap:20px}
  .soa-company{flex:1}
  .soa-company-name{font-size:22px;font-weight:800;color:#4f8ef7;margin-bottom:3px;letter-spacing:-0.3px}
  .soa-company-sub{font-size:11px;color:#64748b;line-height:1.6}
  .soa-company-sub span{display:inline-block;margin-left:12px}
  .soa-title-box{text-align:left;min-width:220px}
  .soa-title{font-size:26px;font-weight:800;color:#1e293b;margin-bottom:4px}
  .soa-title::after{content:'';display:block;width:60px;height:3px;background:linear-gradient(90deg,#4f8ef7,#6c5ce7);border-radius:2px;margin-top:6px;margin-left:auto}
  .soa-meta{font-size:11px;color:#64748b;line-height:1.8;margin-top:8px}
  .soa-meta strong{color:#1e293b;font-weight:600}

  /* Summary cards */
  .soa-summary{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap}
  .soa-sc{flex:1;min-width:140px;padding:12px 16px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;text-align:center}
  .soa-sc-label{font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:3px}
  .soa-sc-value{font-size:18px;font-weight:800}
  .soa-sc.red{border-color:#fecaca;background:#fef2f2}
  .soa-sc.red .soa-sc-value{color:#dc2626}
  .soa-sc.green{border-color:#bbf7d0;background:#f0fdf4}
  .soa-sc.green .soa-sc-value{color:#16a34a}
  .soa-sc.blue{border-color:#bfdbfe;background:#eff6ff}
  .soa-sc.blue .soa-sc-value{color:#4f8ef7}

  /* Info grid */
  .soa-info{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;padding:12px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;font-size:12px}
  .soa-info label{font-size:9px;color:#94a3b8;display:block;margin-bottom:1px;font-weight:600;text-transform:uppercase}
  .soa-info span{font-weight:600;color:#1e293b}

  /* Table */
  table{width:100%;border-collapse:collapse;margin:0;font-size:11px}
  thead th{background:linear-gradient(135deg,#4f8ef7,#5b9cf7);color:#fff;padding:10px 8px;font-weight:600;text-align:right;font-size:11px}
  thead th:first-child{border-radius:0 8px 0 0}
  thead th:last-child{border-radius:8px 0 0 0}
  tbody td{padding:8px;border-bottom:1px solid #f1f5f9}
  tbody tr.alt{background:#f8fafc}
  tbody tr:hover{background:#eff6ff}
  tbody tr:last-child td{border-bottom:2px solid #e2e8f0}

  /* Footer */
  .soa-footer{margin-top:18px;padding-top:12px;border-top:2px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;font-size:9px;color:#94a3b8}
  .soa-footer-brand{font-weight:700;color:#4f8ef7;font-size:11px}

  @media print{
    body{padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .soa{padding:0 4mm 10mm}
    .soa-watermark{display:none}
    .soa-accent{height:4px}
    table{page-break-inside:auto}
    tr{page-break-inside:avoid;page-break-after:auto}
    thead{display:table-header-group}
  }
  </style></head><body>
  <div class="soa">
    <div class="soa-accent"></div>
    <div class="soa-side"></div>
    <div class="soa-watermark">كشف حساب ${name}</div>

    <div class="soa-header">
      <div class="soa-company">
        ${company.logo?'<div style="margin-bottom:6px">'+companyLogoHtml(company,45)+'</div>':''}
        <div class="soa-company-name">${company.name}</div>
        <div class="soa-company-sub">
          ${company.address ? '<span><i class="ti ti-map-pin" style="font-size:10px"></i> '+company.address+'</span>' : ''}
          ${company.phone ? '<span><i class="ti ti-phone" style="font-size:10px"></i> '+company.phone+'</span>' : ''}
          ${company.email ? '<span><i class="ti ti-mail" style="font-size:10px"></i> '+company.email+'</span>' : ''}
        </div>
      </div>
      <div class="soa-title-box">
        <div class="soa-title">كشف حساب</div>
        <div class="soa-meta">
          <div>${type==='supplier'?'المورد':'الزبون'}: <strong>${name}</strong></div>
          <div>الفترة: <strong>${dateRange}</strong></div>
          <div>تاريخ الطباعة: <strong>${dateStr} ${timeStr}</strong></div>
        </div>
      </div>
    </div>

    <div class="soa-summary">
      <div class="soa-sc red">
        <div class="soa-sc-label">إجمالي المدين</div>
        <div class="soa-sc-value">${fmt(totalDr)} د.ل</div>
      </div>
      <div class="soa-sc green">
        <div class="soa-sc-label">إجمالي الدائن</div>
        <div class="soa-sc-value">${fmt(totalCr)} د.ل</div>
      </div>
      <div class="soa-sc blue" style="border-color:${balBorder};background:${balBg}">
        <div class="soa-sc-label">الرصيد النهائي</div>
        <div class="soa-sc-value" style="color:${balColor}">${fmt(Math.abs(bal))} د.ل ${balLabel}</div>
      </div>
    </div>

    <div class="soa-info">
      <div><label>${type==='supplier'?'اسم المورد':'اسم الزبون'}</label><span>${name}</span></div>
      <div><label>عدد الحركات</label><span>${txns.length} حركة</span></div>
      <div><label>الفترة</label><span>${dateRange}</span></div>
    </div>

    <table>
      <thead><tr>
        <th style="width:80px">التاريخ</th>
        <th>البيان</th>
        <th style="width:90px">مدين (د.ل)</th>
        <th style="width:90px">دائن (د.ل)</th>
        <th style="width:100px">الرصيد (د.ل)</th>
      </tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>

    <div class="soa-footer">
      <span class="soa-footer-brand">${company.name}</span>
      <span>كشف حساب ${type==='supplier'?'المورد':'الزبون'}: ${name}</span>
      <span>${dateStr} ${timeStr}</span>
    </div>
  </div>
  <script>window.onload=function(){window.print();window.onafterprint=function(){window.close()}}<\/script>
  </body></html>`;
  win.document.write(html);win.document.close();
}

/* ═══ FINANCE ═══ */
function renderFin(search){
  const localTerm=G('fin-local-search')?.value||'';
  const term = normalizeText(localTerm || search || '');
  const from=G('fin-date-from')?.value||'', to=G('fin-date-to')?.value||'';
  const typeFilter=G('fin-type-filter')?.value||'';

  let cashPayments=DB.payments.filter(p=>p.mode==='cash');
  let checkPayments=DB.payments.filter(p=>p.mode==='check');
  let supOutPayments=[...DB.supPayments];

  if(term){
    cashPayments=cashPayments.filter(p=>normalizeText(p.custName||'').includes(term)||normalizeText(p.invNum||'').includes(term)||normalizeText(p.id||'').includes(term)||normalizeText(p.date||'').includes(term));
    checkPayments=checkPayments.filter(p=>normalizeText(p.custName||'').includes(term)||normalizeText(p.invNum||'').includes(term)||normalizeText(p.id||'').includes(term)||normalizeText(p.date||'').includes(term));
    supOutPayments=supOutPayments.filter(p=>normalizeText(p.supName||'').includes(term)||normalizeText(p.purNum||'').includes(term)||normalizeText(p.id||'').includes(term)||normalizeText(p.date||'').includes(term));
  }
  if(from){
    cashPayments=cashPayments.filter(p=>p.date>=from);
    checkPayments=checkPayments.filter(p=>p.date>=from);
    supOutPayments=supOutPayments.filter(p=>p.date>=from);
  }
  if(to){
    cashPayments=cashPayments.filter(p=>p.date<=to);
    checkPayments=checkPayments.filter(p=>p.date<=to);
    supOutPayments=supOutPayments.filter(p=>p.date<=to);
  }

  const totalCash=cashPayments.reduce((s,p)=>s+p.amount,0);
  const totalCheck=checkPayments.reduce((s,p)=>s+p.amount,0);
  const totalSupOut=supOutPayments.reduce((s,p)=>s+p.amount,0);
  const cashEl=G('f-ci');if(cashEl)cashEl.textContent=fmt(totalCash);
  const checkEl=G('f-chv');if(checkEl)checkEl.textContent=fmt(totalCheck);
  const supEl=G('f-sup-out');if(supEl)supEl.textContent=fmt(totalSupOut);
  const cashTb=G('cash-tb');
  if(cashTb){cashTb.innerHTML=cashPayments.length?[...cashPayments].reverse().map(p=>`<tr><td class="td-mono">${p.date}</td><td>${p.id} — ${p.invNum||''}</td><td>${p.custName||''}</td><td class="td-mono" style="font-weight:700;color:var(--green)">+${fmt(p.amount)} د.ل</td></tr>`).join(''):emptyRow(4,'لا توجد دفعات نقدية واردة')}
  const chkTb=G('chk-tb');
  if(chkTb){chkTb.innerHTML=checkPayments.length?[...checkPayments].reverse().map(p=>`<tr><td>${p.id} — ${p.invNum||''}</td><td class="td-mono">${p.date}</td><td>${p.custName||''}</td><td class="td-mono" style="font-weight:700;color:var(--green)">+${fmt(p.amount)} د.ل</td><td>${payLbl(p.mode)}</td></tr>`).join(''):emptyRow(5,'لا توجد صكوك واردة')}
  const supoutTb=G('supout-tb');
  if(supoutTb){supoutTb.innerHTML=supOutPayments.length?[...supOutPayments].reverse().map(p=>`<tr><td class="td-mono">${p.date}</td><td>${p.id} — ${p.purNum||''}</td><td>${p.supName||''}</td><td class="td-mono" style="font-weight:700;color:var(--red)">-${fmt(p.amount)} د.ل</td><td>${payLbl(p.mode)}</td></tr>`).join(''):emptyRow(5,'لا توجد مدفوعات للموردين')}
  const crdTb=G('crd-tb');
  if(crdTb){
    let creditInvs=DB.invs.filter(i=>{const rem=invRemaining(i);return rem>0.001});
    if(term) creditInvs=creditInvs.filter(i=>normalizeText(i.num||'').includes(term)||normalizeText(i.custName||'').includes(term)||normalizeText(i.date||'').includes(term));
    if(from) creditInvs=creditInvs.filter(i=>i.date>=from);
    if(to) creditInvs=creditInvs.filter(i=>i.date<=to);
    crdTb.innerHTML=creditInvs.length?creditInvs.map(i=>`<tr><td class="td-bold" style="color:var(--accent)">${i.num}</td><td>${i.custName}</td><td class="td-mono">${fmt(i.total)} د.ل</td><td class="td-mono" style="color:var(--green)">${fmt(invPaid(i))} د.ل</td><td class="td-mono" style="color:var(--red);font-weight:700">${fmt(invRemaining(i))} د.ل</td><td class="td-mono">${i.date}</td></tr>`).join(''):emptyRow(6,'لا توجد ذمم مدينة')
  }
  // Type filter: show/hide tabs
  const tabs=document.querySelectorAll('#p-finance .tabs .tab');
  const tabIds=['fin-cash','fin-check','fin-supout','fin-credit'];
  if(typeFilter){
    const map={cash:0,check:1,supplier:2,credit:3};
    tabIds.forEach((id,i)=>{
      const el=G(id);
      if(el) el.style.display = i===map[typeFilter]?'':'none';
      if(tabs[i]) tabs[i].style.display = i===map[typeFilter]?'':'none';
    });
    if(tabs[map[typeFilter]]) tabs[map[typeFilter]].classList.add('on');
  } else {
    tabIds.forEach(id=>{const el=G(id);if(el)el.style.display='none'});
    if(tabs[0]) tabs[0].classList.add('on');
    G('fin-cash').style.display='';
  }
}

function finTab(tab,el){
  document.querySelectorAll('#p-finance .tab').forEach(t=>t.classList.remove('on'));
  if(el)el.classList.add('on');
  ['fin-cash','fin-check','fin-supout','fin-credit'].forEach(id=>{const e=G(id);if(e)e.style.display='none'});
  const target=G('fin-'+tab);
  if(target)target.style.display='';
}

/* ═══ P&L ═══ */
function renderPL(search){
  const localTerm=G('pl-local-search')?.value||'';
  const term = normalizeText(localTerm || search || '');
  const from=G('pl-date-from')?.value||'', to=G('pl-date-to')?.value||'';
  let invs=DB.invs.filter(i=>i.dlvStatus==='delivered');
  if(from) invs=invs.filter(i=>i.date>=from);
  if(to) invs=invs.filter(i=>i.date<=to);
  let totalRev=0,totalCost=0;
  invs.forEach(i=>{
    i.lines.forEach(l=>{totalRev+=l.total;totalCost+=(l.buyPrice||0)*l.qty})
  });
  const profit=totalRev-totalCost;
  const margin=totalRev>0?((profit/totalRev)*100).toFixed(1):0;
  G('pl-rev').textContent=fmt(totalRev);
  G('pl-cogs').textContent=fmt(totalCost);
  G('pl-gp').textContent=fmt(profit);
  G('pl-margin').textContent=margin+'%';
  const itemPL={};
  invs.forEach(i=>{
    i.lines.forEach(l=>{
      const key=l.itemId||l.name;
      if(!itemPL[key])itemPL[key]={name:l.name,qty:0,rev:0,cost:0};
      itemPL[key].qty+=l.qty;
      itemPL[key].rev+=l.total;
      itemPL[key].cost+=(l.buyPrice||0)*l.qty
    })
  });
  let rows=Object.values(itemPL);
  if(term) rows=rows.filter(r=>normalizeText(r.name).includes(term));
  const tb=G('pl-tb');
  if(!rows.length){tb.innerHTML=emptyRow(5,'لا توجد بيانات.');return}
  tb.innerHTML=rows.map(r=>{
    const profit=r.rev-r.cost;
    const m=r.rev>0?((profit/r.rev)*100).toFixed(1):0;
    return`<tr>
      <td class="td-bold">${r.name}</td>
      <td class="td-mono">${r.qty}</td>
      <td class="td-mono">${fmt(r.rev)} د.ل</td>
      <td class="td-mono">${fmt(r.cost)} د.ل</td>
      <td class="td-mono ${profit>=0?'text-green':'text-red'}" style="font-weight:700">${fmt(profit)} د.ل</td>
      <td><span class="badge ${profit>=0?'b-green':'b-red'}">${m}%</span></td>
    </tr>`
  }).join('');
  setTimeout(renderPLChart,50);
}

/* ═══ AUDIT ═══ */
function renderAudit(search){
  const localTerm=G('audit-local-search')?.value||'';
  const term = normalizeText(localTerm || search || '');
  const userFilter=G('audit-user-filter')?.value||'';
  const actionFilter=G('audit-action-filter')?.value||'';
  const userSelect=G('audit-user-filter');
  if(userSelect && userSelect.options.length<=1){
    const users=[...new Set(DB.log.map(l=>l.user).filter(Boolean))];
    users.forEach(u=>{const o=document.createElement('option');o.value=u;o.textContent=u;userSelect.appendChild(o)});
  }
  let logs=[...DB.log];
  if(term) logs=logs.filter(l=>normalizeText(l.action||'').includes(term)||normalizeText(l.detail||'').includes(term)||normalizeText(l.user||'').includes(term)||normalizeText(l.date||'').includes(term));
  if(userFilter) logs=logs.filter(l=>normalizeText(l.user||'').includes(userFilter));
  if(actionFilter) logs=logs.filter(l=>normalizeText(l.action||'').includes(actionFilter));
  const d=G('audit-list');
  if(!logs.length){d.innerHTML='<div class="empty-st" style="padding:40px"><i class="ti ti-shield-check" style="font-size:32px;display:block;margin-bottom:8px;opacity:.2"></i><span>لا توجد سجلات مطابقة</span></div>';return}
  d.innerHTML=logs.map(l=>`<div class="log-entry">
    <div class="log-dot" data-color="${l.color}"></div>
    <div class="log-text">
      <div class="log-action">${l.action}<span style="font-weight:400;color:var(--text-secondary)"> — ${l.detail}</span></div>
      <div class="log-time"><i class="ti ti-user" style="font-size:11px"></i> ${l.user} &nbsp;•&nbsp; ${l.date} ${l.time}</div>
    </div>
  </div>`).join('');
  d.querySelectorAll('.log-dot').forEach(el=>{const c=el.dataset.color;if(c)el.style.background=c})
}
function renderDashLog(){
  const d=G('d-log-list');if(!d)return;
  if(!DB.log.length){d.innerHTML='<div style="font-size:11px;color:var(--text-muted);padding:8px">لا سجلات بعد.</div>';return}
  d.innerHTML=DB.log.slice(0,8).map(l=>{
    const c=l.color||'#798ef7';
    let dotClass='dot-blue';
    if(c.includes('45,209')||c.includes('green')||c==='#2dd17e') dotClass='dot-green';
    else if(c.includes('245,166')||c.includes('amber')||c==='#f5a623') dotClass='dot-amber';
    else if(c.includes('240,84')||c.includes('red')||c==='#f05454') dotClass='dot-red';
    return `<div class="dash-log-item">
      <div class="dash-log-dot ${dotClass}"></div>
      <div class="dash-log-content">
        <div class="dash-log-title">${l.action}</div>
        <div class="dash-log-meta">${l.detail}</div>
      </div>
      <div class="dash-log-meta" style="white-space:nowrap">${l.date} ${l.time}</div>
    </div>`;
  }).join('');
}

/* ═══ SOA — EXCEL EXPORT ═══ */
function exportSOA() {
  const type = G('soa-type')?.value || 'customer';
  const id = parseInt(G('soa-cust').value);
  if (!id) { toast('اختر جهة أولاً', 'info'); return; }
  const from = G('soa-from')?.value, to = G('soa-to')?.value;
  const h = ['التاريخ', 'البيان', 'مدين', 'دائن', 'الرصيد'];
  const rows = [];
  if (type === 'supplier') {
    const s = DB.sups.find(x => x.id === id);
    if (!s) { toast('المورد غير موجود', 'info'); return; }
    let txns = [];
    DB.purs.filter(p => p.supId === id).forEach(p => { if (from && p.date < from) return; if (to && p.date > to) return; txns.push({ date: p.date, desc: `فاتورة شراء ${p.num}`, dr: p.total, cr: 0 }); });
    DB.supPayments.filter(p => p.supId === id).forEach(p => { if (from && p.date < from) return; if (to && p.date > to) return; txns.push({ date: p.date, desc: `دفعة ${p.id}`, dr: 0, cr: p.amount }); });
    txns.sort((a, b) => a.date.localeCompare(b.date));
    let bal = 0;
    txns.forEach(t => { bal += t.dr - t.cr; rows.push([t.date, t.desc, t.dr || '', t.cr || '', bal]); });
    if (!rows.length) { toast('لا توجد حركات', 'info'); return; }
    _exportTable(h, rows, `كشف حساب ${s.name}`, `soa-${s.name}`);
  } else {
    const c = DB.custs.find(x => x.id === id);
    if (!c) { toast('الزبون غير موجود', 'info'); return; }
    let txns = [];
    const openBal = parseFloat(c.openBal) || 0;
    if (openBal > 0) txns.push({ date: '—', desc: 'رصيد افتتاحي', dr: openBal, cr: 0 });
    DB.invs.filter(i => i.custId === id).forEach(i => { if (from && i.date < from) return; if (to && i.date > to) return; txns.push({ date: i.date, desc: `فاتورة ${i.num}`, dr: i.total, cr: 0 }); });
    DB.payments.filter(p => p.custId === id).forEach(p => { if (from && p.date < from) return; if (to && p.date > to) return; txns.push({ date: p.date, desc: `دفعة ${p.id || ''}`, dr: 0, cr: p.amount }); });
    DB.rets.filter(r => { const inv = DB.invs.find(i => i.num === r.invNum); return inv && inv.custId === id; }).forEach(r => { if (from && r.date < from) return; if (to && r.date > to) return; txns.push({ date: r.date, desc: `مرتجع ${r.num}`, dr: -r.amt, cr: r.amt }); });
    txns.sort((a, b) => a.date.localeCompare(b.date));
    let bal = 0;
    txns.forEach(t => { bal += t.dr - t.cr; rows.push([t.date, t.desc, t.dr > 0 ? t.dr : '', t.cr || '', bal]); });
    if (!rows.length) { toast('لا توجد حركات', 'info'); return; }
    _exportTable(h, rows, `كشف حساب ${c.name}`, `soa-${c.name}`);
  }
  toast('تم التصدير بنجاح');
}
