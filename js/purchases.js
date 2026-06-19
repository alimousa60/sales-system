/* ═══ PURCHASE INVOICE ═══ */
function autoBuyPrice(){
  const id=parseInt(G('pi-item-sel').value);
  const item=DB.items.find(x=>x.id===id);
  if(item){G('pi-price').value=item.buy;calcPiLine()}
}
function calcPiLine(){
  const q=parseFloat(G('pi-qty').value)||0,p=parseFloat(G('pi-price').value)||0;
  G('pi-ltot').value=fmt(q*p)
}
function addPiLine(){
  const id=parseInt(G('pi-item-sel').value);
  const item=DB.items.find(x=>x.id===id);
  if(!item){toast('اختر صنفاً','error');return}
  const qty=parseFloat(G('pi-qty').value)||1;
  const price=parseFloat(G('pi-price').value)||item.buy;
  if(qty<=0){toast('أدخل كمية صحيحة','error');return}
  if(price<=0){toast('أدخل سعراً صالحاً','error');return}
  _piL.push({itemId:id,name:item.name,qty,price,total:qty*price});
  renderPiL();
  G('pi-qty').value='1';G('pi-price').value='';G('pi-ltot').value='';G('pi-item-sel').value=''
}
function renderPiL(){
  const tb=G('pi-lines-tb');
  tb.innerHTML=_piL.length?_piL.map((l,i)=>`<tr>
    <td class="td-bold">${l.name}</td>
    <td class="td-mono">${l.qty}</td>
    <td class="td-mono">${fmt(l.price)}</td>
    <td class="td-mono" style="font-weight:700">${fmt(l.total)}</td>
    <td><button class="btn btn-sm btn-danger btn-icon" onclick="_piL.splice(${i},1);renderPiL()"><i class="ti ti-x"></i></button></td>
  </tr>`).join(''):emptyRow(5,'أضف صنفاً');
  G('pi-tot').textContent=fmt(_piL.reduce((s,l)=>s+l.total,0))+' د.ل'
}
function savePur(){
  if(!_piL.length){toast('أضف صنفاً على الأقل','error');return}
  if(!G('pi-sup').value){toast('اختر المورد','error');return}
  const supId=parseInt(G('pi-sup').value);
  const sup=DB.sups.find(x=>x.id===supId);
  const num=G('pi-num').value,date=G('pi-date').value;
  const total=_piL.reduce((s,l)=>s+l.total,0);
  const receiveNow=G('pi-recv').checked;
  // Update item buy prices
  _piL.forEach(l=>{const item=DB.items.find(x=>x.id===l.itemId);if(item)item.buy=l.price});
  // If receiving now: add to inventory
  if(receiveNow){_piL.forEach(l=>{const item=DB.items.find(x=>x.id===l.itemId);if(item)item.qty+=l.qty})}
  DB.purs.push({id:DB.cP,num,supId,supName:sup?.name||'مورد',date,lines:[..._piL],total,receivedStock:receiveNow});
  DB.cP++;
  const note=receiveNow?'مع استلام فوري للمخزون':'ذمة دائنة فقط — المخزون لم يُستلَم بعد';
  addLog('فاتورة شراء (ذمة دائنة)',`${num} — "${sup?.name}" — ${fmt(total)} د.ل — ${note}`,'#f5a623');
  saveState();
  closeModal('m-pur');renderPurs();renderItems();updateStats();
  toast(`تم حفظ فاتورة الشراء ${num} — ${note}`)
}
function renderPurs(search=''){
  const tb=G('pur-tb');
  const term=normalizeText(search);
  const dateFrom=G('pur-date-from')?.value||'';
  const dateTo=G('pur-date-to')?.value||'';
  const recvFilter=G('pur-recv-filter')?.value||'';
  let full=[...DB.purs].reverse();
  if(term){full=full.filter(p=>normalizeText(p.num).includes(term)||normalizeText(p.supName).includes(term)||normalizeText(p.date).includes(term));}
  if(dateFrom){full=full.filter(p=>p.date>=dateFrom)}
  if(dateTo){full=full.filter(p=>p.date<=dateTo)}
  if(recvFilter==='yes'){full=full.filter(p=>p.receivedStock)}
  else if(recvFilter==='no'){full=full.filter(p=>!p.receivedStock)}
  if(!full.length){tb.innerHTML=emptyRow(8,term?'لا توجد نتائج لهذا البحث':'لا توجد فواتير شراء.');renderPag('pur-tb',0,renderPurs);return}
  const {data}=getPageData('pur-tb', full);
  tb.innerHTML=data.map(p=>{
    const paid=purPaid(p),rem=purRemaining(p);
    return`<tr>
      <td class="td-bold" style="color:var(--amber)">${p.num}</td>
      <td>${p.supName}</td>
      <td class="td-mono">${p.date}</td>
      <td class="td-mono" style="font-weight:700">${fmt(p.total)} د.ل</td>
      <td class="td-mono" style="color:var(--green)">${fmt(paid)} د.ل</td>
      <td class="td-mono ${rem>0?'text-red':'text-muted'}">${rem>0?fmt(rem)+' د.ل':'✓'}</td>
      <td>${purPayStatus(p)}</td>
      <td><button class="btn btn-sm" onclick="viewPur(${p.id})"><i class="ti ti-eye"></i></button></td>
    </tr>`
  }).join('');
  renderPag('pur-tb',full.length,renderPurs)
}

/* ═══ SUPPLIER PAYMENTS ═══ */
function saveSupPay(){
  const supId=parseInt(G('sp-sup').value);
  if(!supId){toast('اختر المورد','error');return}
  const amount=parseFloat(G('sp-amt').value)||0;
  if(amount<=0){toast('أدخل مبلغاً صحيحاً','error');return}
  const sup=DB.sups.find(x=>x.id===supId);
  const date=G('sp-date').value;
  const checkNum=_spPay==='check'?G('sp-check-num')?.value:'';
  const notes=G('sp-notes')?.value||'';

  const checkedPurs=[];
  document.querySelectorAll('.sp-pur-cb:checked').forEach(cb=>{
    const purId=parseInt(cb.dataset.purId);
    const pur=DB.purs.find(x=>x.id===purId);
    if(pur)checkedPurs.push({pur,rem:purRemaining(pur)});
  });

  let remaining=amount;
  for(const x of checkedPurs){
    if(remaining<=0)break;
    const share=Math.min(remaining,x.rem);
    if(share>0.001){
      const pid='SPAY-'+String(DB.cSpay).padStart(5,'0');DB.cSpay++;
      DB.supPayments.push({
        id:pid,supId,supName:sup?.name||'—',
        purId:x.pur.id,purNum:x.pur.num,
        amount:share,date,mode:_spPay,checkNum,notes
      });
      remaining-=share;
    }
  }

  // Leftover → general payment
  if(remaining>0.001){
    const pid='SPAY-'+String(DB.cSpay).padStart(5,'0');DB.cSpay++;
    DB.supPayments.push({
      id:pid,supId,supName:sup?.name||'—',
      purId:null,purNum:'عام',
      amount:remaining,date,mode:_spPay,checkNum,notes
    });
  }

  const applied=amount-remaining;
  addLog('دفعة للمورد (خزينة-)',`"${sup?.name}" — ${fmt(applied)} د.ل — ${_spPay}${remaining>0.001?` — ${fmt(remaining)} د.ل لم تُربط`:''}`,'#f05454');
  saveState();
  closeModal('m-suppay');renderSupPays();renderPurs();renderSups();updateStats();renderFin();
  toast(`تم تسجيل دفعة ${fmt(applied)} د.ل للمورد ${sup?.name}`)
}

function renderSupPays(search=''){
  const tb=G('suppay-tb');
  const term=normalizeText(search);
  const dateFrom=G('spay-date-from')?.value||'';
  const dateTo=G('spay-date-to')?.value||'';
  let full=[...DB.supPayments].reverse();
  if(term){full=full.filter(p=>normalizeText(p.id).includes(term)||normalizeText(p.supName).includes(term)||normalizeText(p.purNum).includes(term))}
  if(dateFrom){full=full.filter(p=>p.date>=dateFrom)}
  if(dateTo){full=full.filter(p=>p.date<=dateTo)}
  if(!full.length){tb.innerHTML=emptyRow(6);renderPag('suppay-tb',0,renderSupPays);return}
  const {data}=getPageData('suppay-tb', full);
  tb.innerHTML=data.map(p=>`<tr>
    <td class="td-bold" style="color:var(--teal)">${p.id}</td>
    <td>${p.supName}</td>
    <td class="td-mono">${p.purNum||'—'}</td>
    <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(p.amount)} د.ل</td>
    <td>${payLbl(p.mode)}</td>
    <td class="td-mono">${p.date}</td>
  </tr>`).join('');
  renderPag('suppay-tb',full.length,renderSupPays)
}

function updateSupPaySummary(){
  const supId=parseInt(G('sp-sup')?.value);
  const summaryEl=G('spay-summary');
  const pursEl=G('spay-purs');
  if(!supId){if(summaryEl)summaryEl.style.display='none';if(pursEl)pursEl.innerHTML='';return}
  const sup=DB.sups.find(x=>x.id===supId);if(!sup){summaryEl.style.display='none';return}
  const totalPur=DB.purs.filter(p=>p.supId===supId).reduce((s,p)=>s+p.total,0);
  const totalPaid=DB.supPayments.filter(p=>p.supId===supId).reduce((s,p)=>s+p.amount,0);
  const unpaidPurs=DB.purs.filter(p=>p.supId===supId&&purRemaining(p)>0.001).sort((a,b)=>a.date.localeCompare(b.date));
  const totalUnpaid=unpaidPurs.reduce((s,p)=>s+purRemaining(p),0);

  summaryEl.style.display='';
  summaryEl.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
      <div><div style="font-size:11px;color:var(--text-muted)">المورد</div><div style="font-weight:700;color:var(--teal)">${sup.name}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">إجمالي المشتريات</div><div style="font-weight:700">${fmt(totalPur)} د.ل</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">محصَّل سابقاً</div><div style="font-weight:700;color:var(--green)">${fmt(totalPaid)} د.ل</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">المتبقي</div><div style="font-weight:700;color:${totalUnpaid>0?'var(--red)':'var(--green)'}">${fmt(totalUnpaid)} د.ل</div></div>
    </div>`;

  if(!unpaidPurs.length){
    pursEl.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><i class="ti ti-check-circle" style="font-size:24px;display:block;margin-bottom:8px;color:var(--green)"></i>جميع فواتير هذا المورد مسددة</div>';
    return;
  }

  pursEl.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:12px">
      <span>فواتير شراء غير مسددة: <strong style="color:var(--red)">${fmt(totalUnpaid)} د.ل</strong></span>
      <span>${unpaidPurs.length} فاتورة</span>
    </div>
    <div class="tbl-wrap"><table style="width:100%;font-size:12px;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--line)">
        <th style="text-align:right;padding:6px"><label style="cursor:pointer"><input type="checkbox" class="sp-select-all" onchange="toggleSupPayAll(this)" checked> الكل</label></th>
        <th style="text-align:right;padding:6px">الفاتورة</th><th style="text-align:right;padding:6px">التاريخ</th><th style="text-align:right;padding:6px">الإجمالي</th><th style="text-align:right;padding:6px">المدفوع</th><th style="text-align:right;padding:6px">المتبقي</th>
      </tr></thead>
      <tbody>${unpaidPurs.map(pur=>{
        const rem=purRemaining(pur);
        return`<tr>
          <td style="padding:6px"><input type="checkbox" class="sp-pur-cb" data-pur-id="${pur.id}" data-rem="${rem}" onchange="recalcSupPayPreview()" checked></td>
          <td style="padding:6px;font-weight:600;color:var(--amber)">${pur.num}</td>
          <td style="padding:6px" class="td-mono">${pur.date}</td>
          <td style="padding:6px" class="td-mono">${fmt(pur.total)} د.ل</td>
          <td style="padding:6px" class="td-mono" style="color:var(--green)">${fmt(purPaid(pur))} د.ل</td>
          <td style="padding:6px" class="td-mono" style="color:var(--red);font-weight:700">${fmt(rem)} د.ل</td>
        </tr>`
      }).join('')}</tbody>
    </table></div>
    <div style="margin-top:6px;padding:6px 10px;background:var(--bg);border-radius:var(--r);font-size:12px;display:flex;justify-content:space-between">
      <span>إجمالي المتبقي المحدد: <strong style="color:var(--red)" id="sp-total-unpaid">${fmt(totalUnpaid)} د.ل</strong></span>
      <span>المتبقي بعد الدفع: <strong id="sp-after-pay" style="color:var(--red)">${fmt(totalUnpaid)} د.ل</strong></span>
    </div>`;
}

function toggleSupPayAll(el){
  document.querySelectorAll('.sp-pur-cb').forEach(cb=>cb.checked=el.checked);
  recalcSupPayPreview();
}

function recalcSupPayPreview(){
  const amt=parseFloat(G('sp-amt')?.value)||0;
  let totalUnpaid=0;
  document.querySelectorAll('.sp-pur-cb:checked').forEach(cb=>{totalUnpaid+=parseFloat(cb.dataset.rem)||0});
  const el1=G('sp-total-unpaid');if(el1)el1.textContent=fmt(totalUnpaid)+' د.ل';
  const el2=G('sp-after-pay');if(el2){
    const after=Math.max(0,totalUnpaid-amt);
    el2.textContent=fmt(after)+' د.ل';
    el2.style.color=after>0?'var(--red)':'var(--green)';
  }
}

/* ═══ SUPPLIER SETTLEMENT (multi-invoice) ═══ */
let _supSettleMode='auto';

function openSupSettlement(supId){
  if(!supId){
    supId=parseInt(G('sup-settle-sup')?.value)||0;
  }
  if(!supId){_supSettleMode='auto';openModal('m-sup-settle');popSel('sup-settle-sup',DB.sups,'id','name','-- اختر مورد --');return}
  const sup=DB.sups.find(x=>x.id===supId);if(!sup)return;
  _supSettleMode='auto';
  popSel('sup-settle-sup',DB.sups,'id','name','-- اختر مورد --');
  G('sup-settle-sup').value=supId;
  G('sup-settle-amt').value='';
  G('sup-settle-date').value=today();
  G('sup-settle-reason').value='';
  document.querySelectorAll('#sup-settle-mode-btns .settle-mode').forEach((b,i)=>b.classList.toggle('active',i===0));
  renderSupSettlePurs();
  openModal('m-sup-settle');
}

function setSupSettleMode(mode){
  _supSettleMode=mode;
  document.querySelectorAll('#sup-settle-mode-btns .settle-mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  const supId=parseInt(G('sup-settle-sup').value);
  if(supId)renderSupSettlePurs();
}

function renderSupSettlePurs(){
  const supId=parseInt(G('sup-settle-sup').value);
  if(!supId){
    // Show summary for selected supplier
    const el=G('sup-settle-summary');
    if(el)el.style.display='none';
    G('sup-settle-purs').innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><i class="ti ti-arrow-left" style="font-size:24px;display:block;margin-bottom:8px"></i>اختر مورداً أولاً</div>';
    return;
  }
  const sup=DB.sups.find(x=>x.id===supId);
  const unpaidPurs=DB.purs.filter(p=>p.supId===supId&&purRemaining(p)>0.001).sort((a,b)=>a.date.localeCompare(b.date));
  const totalUnpaid=unpaidPurs.reduce((s,p)=>s+purRemaining(p),0);
  const totalPur=DB.purs.filter(p=>p.supId===supId).reduce((s,p)=>s+p.total,0);
  const totalPaid=DB.supPayments.filter(p=>p.supId===supId).reduce((s,p)=>s+p.amount,0);
  const totalSettled=(DB.supSettlements||[]).filter(s=>s.supId===supId).reduce((s,x)=>s+x.amount,0);

  // Summary card
  const summaryEl=G('sup-settle-summary');
  if(summaryEl){
    summaryEl.style.display='';
    summaryEl.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
        <div><div style="font-size:11px;color:var(--text-muted)">المورد</div><div style="font-weight:700;color:var(--teal)">${sup.name}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">إجمالي المشتريات</div><div style="font-weight:700">${fmt(totalPur)} د.ل</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">محصَّل (دفعات)</div><div style="font-weight:700;color:var(--green)">${fmt(totalPaid)} د.ل</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">تسويات سابقة</div><div style="font-weight:700;color:var(--amber)">${fmt(totalSettled)} د.ل</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">المتبقي</div><div style="font-weight:700;color:${totalUnpaid>0?'var(--red)':'var(--green)'}">${fmt(totalUnpaid)} د.ل</div></div>
      </div>`;
  }

  const amt=parseFloat(G('sup-settle-amt').value)||0;
  const el=G('sup-settle-purs');
  if(!unpaidPurs.length){
    el.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><i class="ti ti-check-circle" style="font-size:24px;display:block;margin-bottom:8px;color:var(--green)"></i>جميع فواتير هذا المورد مسددة</div>';
    return;
  }
  const purRows=unpaidPurs.map(pur=>{
    const rem=purRemaining(pur);
    let applied=0;
    if(_supSettleMode==='auto'&&amt>0){
      applied=totalUnpaid>0?(rem/totalUnpaid)*amt:0;
      applied=Math.min(applied,rem);
    }
    return`<tr>
      <td><label style="display:flex;align-items:center;gap:6px;cursor:pointer">
        <input type="checkbox" class="sup-settle-pur-cb" data-pur-id="${pur.id}" data-rem="${rem}" onchange="recalcSupSettlePreview()" checked>
        <span style="font-weight:600;color:var(--amber)">${pur.num}</span>
      </label></td>
      <td class="td-mono">${pur.date}</td>
      <td class="td-mono">${fmt(pur.total)} د.ل</td>
      <td class="td-mono" style="color:var(--green)">${fmt(purPaid(pur))} د.ل</td>
      <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(rem)} د.ل</td>
      <td class="td-mono sup-settle-applied" data-pur-id="${pur.id}" style="color:var(--amber);font-weight:700">${_supSettleMode==='auto'?fmt(applied)+' د.ل':'0.000 د.ل'}</td>
      <td>${_supSettleMode==='manual'?`<input type="number" class="sup-settle-manual-amt" data-pur-id="${pur.id}" data-rem="${rem}" step="0.001" min="0" max="${rem}" value="0" onchange="recalcSupSettlePreview()" style="width:90px;font-size:12px;padding:4px 6px">`:''}</td>
    </tr>`
  });
  el.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:12px">
      <span>إجمالي غير مسدد: <strong style="color:var(--red)">${fmt(totalUnpaid)} د.ل</strong></span>
      <span>${unpaidPurs.length} فواتير</span>
    </div>
    <div class="tbl-wrap"><table style="width:100%;font-size:12px;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--line)"><th style="text-align:right;padding:6px">الفاتورة</th><th style="text-align:right;padding:6px">التاريخ</th><th style="text-align:right;padding:6px">الإجمالي</th><th style="text-align:right;padding:6px">المدفوع</th><th style="text-align:right;padding:6px">المتبقي</th><th style="text-align:right;padding:6px">يُخصَم</th>${_supSettleMode==='manual'?'<th style="padding:6px">المبلغ</th>':''}</tr></thead>
      <tbody>${purRows.join('')}</tbody>
    </table></div>
    <div style="margin-top:8px;padding:8px 10px;background:var(--bg);border-radius:var(--r);font-size:12px;display:flex;justify-content:space-between">
      <span>إجمالي الخصم: <strong style="color:var(--amber)" id="sup-settle-total-display">${fmt(amt)} د.ل</strong></span>
      <span>المتبقي بعد الخصم: <strong id="sup-settle-remaining-display" style="color:${totalUnpaid-amt>0?'var(--red)':'var(--green)'}">${fmt(Math.max(0,totalUnpaid-amt))} د.ل</strong></span>
    </div>`;
}

function recalcSupSettlePreview(){
  const amt=parseFloat(G('sup-settle-amt').value)||0;
  const totalUnpaid=calcSupSettleTotalUnpaid();
  if(_supSettleMode==='auto'){
    document.querySelectorAll('.sup-settle-pur-cb:checked').forEach(cb=>{
      const purId=parseInt(cb.dataset.purId);
      const rem=parseFloat(cb.dataset.rem);
      const applied=totalUnpaid>0?(rem/totalUnpaid)*amt:0;
      const el=document.querySelector(`.sup-settle-applied[data-pur-id="${purId}"]`);
      if(el)el.textContent=fmt(Math.min(applied,rem))+' د.ل';
    });
  } else {
    document.querySelectorAll('.sup-settle-manual-amt').forEach(inp=>{
      const max=parseFloat(inp.dataset.rem)||0;
      const val=Math.min(parseFloat(inp.value)||0,max);
      inp.value=val;
      const el=document.querySelector(`.sup-settle-applied[data-pur-id="${inp.dataset.purId}"]`);
      if(el)el.textContent=fmt(val)+' د.ل';
    });
  }
  const displayedTotal=_supSettleMode==='auto'?amt:calcSupSettleManualTotal();
  const el1=G('sup-settle-total-display');if(el1)el1.textContent=fmt(displayedTotal)+' د.ل';
  const el2=G('sup-settle-remaining-display');if(el2){el2.textContent=fmt(Math.max(0,totalUnpaid-displayedTotal))+' د.ل';el2.style.color=totalUnpaid-displayedTotal>0?'var(--red)':'var(--green)'}
}

function calcSupSettleTotalUnpaid(){
  let total=0;
  document.querySelectorAll('.sup-settle-pur-cb:checked').forEach(cb=>{total+=parseFloat(cb.dataset.rem)||0});
  return total;
}

function calcSupSettleManualTotal(){
  let total=0;
  document.querySelectorAll('.sup-settle-manual-amt').forEach(inp=>{total+=parseFloat(inp.value)||0});
  return total;
}

function saveSupSettlement(){
  const supId=parseInt(G('sup-settle-sup').value);
  const sup=DB.sups.find(x=>x.id===supId);if(!sup){toast('خطأ في المورد','error');return}
  const amt=parseFloat(G('sup-settle-amt').value)||0;
  const reason=G('sup-settle-reason').value.trim();
  const date=G('sup-settle-date').value;
  if(amt<=0){toast('أدخل مبلغاً صحيحاً','error');return}
  if(!reason){toast('أدخل سبب التسوية','error');return}
  const checkedPurs=[];
  document.querySelectorAll('.sup-settle-pur-cb:checked').forEach(cb=>{
    const purId=parseInt(cb.dataset.purId);
    const pur=DB.purs.find(x=>x.id===purId);
    if(pur)checkedPurs.push({pur,rem:purRemaining(pur)});
  });
  if(!checkedPurs.length){toast('اختر فاتورة واحدة على الأقل','error');return}
  const totalUnpaid=checkedPurs.reduce((s,x)=>s+x.rem,0);
  const applied=[];
  let remaining=amt;
  for(const x of checkedPurs){
    let share=0;
    if(_supSettleMode==='auto'){
      share=totalUnpaid>0?(x.rem/totalUnpaid)*amt:0;
      share=Math.min(share,x.rem,remaining);
    } else {
      const inp=document.querySelector(`.sup-settle-manual-amt[data-pur-id="${x.pur.id}"]`);
      share=Math.min(parseFloat(inp?.value)||0,x.rem,remaining);
    }
    if(share>0.001){
      applied.push({purId:x.pur.id,purNum:x.pur.num,amount:share});
      x.pur.discount=(x.pur.discount||0)+share;
      x.pur.total=Math.max(0,x.pur.total-share);
      if(!x.pur.settlements)x.pur.settlements=[];
      x.pur.settlements.push({amount:share,reason,date});
      remaining-=share;
    }
  }
  if(!applied.length){toast('لم يتم تطبيق أي مبلغ','error');return}
  const settlement={
    id:'SSETL-'+String(DB.cSupSettle).padStart(5,'0'),
    supId,supName:sup.name,
    amount:amt,actualApplied:amt-remaining,remaining,
    reason,date,applied,
    mode:_supSettleMode
  };
  DB.cSupSettle++;
  if(!DB.supSettlements)DB.supSettlements=[];
  DB.supSettlements.push(settlement);
  addLog('تسوية مورد (خصم)',`${settlement.id} — "${sup.name}" — ${fmt(amt)} د.ل — ${applied.length} فاتورة — ${reason}`,'#f5a623');
  saveState();
  closeModal('m-sup-settle');renderPurs();renderSups();updateStats();
  toast(`تم تطبيق تسوية ${fmt(amt)} د.ل على ${applied.length} فاتورة شراء ✓`)
}
