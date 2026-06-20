/* ═══ SALES INVOICE ═══ */
function onSiItemSelect(){autoSellPrice()}
function autoSellPrice(){
  const id=parseInt(G('si-item-sel').value);
  const item=DB.items.find(x=>x.id===id);
  if(item){G('si-price').value=item.sell;calcSiLine()}
}
function calcSiLine(){
  const q=parseFloat(G('si-qty').value)||0,p=parseFloat(G('si-price').value)||0,d=parseFloat(G('si-disc').value)||0;
  G('si-ltot').value=fmt(Math.max(0,q*p-d))
}
function addSiLine(){
  const id=parseInt(G('si-item-sel').value);
  const item=DB.items.find(x=>x.id===id);
  if(!item){toast('اختر صنفاً','error');return}
  const qty=parseFloat(G('si-qty').value)||1;
  const price=parseFloat(G('si-price').value)||item.sell;
  const disc=parseFloat(G('si-disc').value)||0;
  if(qty<=0){toast('أدخل كمية صحيحة','error');return}
  if(price<=0){toast('أدخل سعراً صالحاً','error');return}
  if(disc<0){toast('الخصم لا يمكن أن يكون سالباً','error');return}
  if(disc>qty*price){toast('الخصم أكبر من قيمة السطر','error');return}
  if(qty>item.qty){toast('الرصيد الحالي أقل من الكمية المطلوبة. سيتم التحقق عند التسليم.','info')}
  _siL.push({itemId:id,name:item.name,qty,price,disc,buyPrice:item.buy,total:Math.max(0,qty*price-disc)});
  renderSiL();
  G('si-qty').value='1';G('si-disc').value='0';G('si-price').value='';G('si-ltot').value='';G('si-item-sel').value='';
}
function renderSiL(){
  const tb=G('si-lines-tb');
  tb.innerHTML=_siL.length?_siL.map((l,i)=>`<tr>
    <td class="td-bold">${l.name}</td>
    <td class="td-mono">${l.qty}</td>
    <td class="td-mono">${fmt(l.price)}</td>
    <td class="td-mono" style="color:var(--red)">${l.disc>0?fmt(l.disc):'—'}</td>
    <td class="td-mono" style="color:var(--green);font-weight:700">${fmt(l.total)}</td>
    <td><button class="btn btn-sm btn-danger btn-icon" onclick="_siL.splice(${i},1);renderSiL()"><i class="ti ti-x"></i></button></td>
  </tr>`).join(''):emptyRow(6,'أضف صنفاً');
  const tot=_siL.reduce((s,l)=>s+l.total,0);
  G('si-tot').textContent=fmt(tot)+' د.ل';
  G('si-tafseet').textContent=tot>0?numToWords(tot):'—'
}
function saveInv(){
  if(!G('si-cust').value){toast('اختر الزبون','error');return}
  if(!_siL.length){toast('أضف صنفاً على الأقل','error');return}
  const total=_siL.reduce((s,l)=>s+l.total,0);
  const custId=parseInt(G('si-cust').value);
  const cust=DB.custs.find(x=>x.id===custId);
  const num=G('si-num').value,date=G('si-date').value;
  // SAVE: no cash, no inventory. Just create the invoice (receivable)
  DB.invs.push({
    id:DB.cI,num,custId,custName:cust?.name||'—',date,
    lines:[..._siL],total,
    dlvStatus:'pending',
    createdAt:date
  });
  DB.cI++;
  addLog('فاتورة بيع (ذمة مدينة)',`${num} — الزبون "${cust?.name}" — ${fmt(total)} د.ل — لا أثر على الخزينة أو المخزون حتى الآن`,'#4f8ef7');
  saveState();
  closeModal('m-invoice');renderSales();updateStats();
  broadcastChange('sales', { num, custName: cust?.name, total });
  toast(`فاتورة ${num}`,'success',{title:'فاتورة بيع جديدة',icon:'ti-receipt',duration:4000})
}
function renderSales(search=''){
  const filter=G('sal-filter')?.value||'';
  const term=normalizeText(search);
  const dateFrom=G('sal-date-from')?.value||'';
  const dateTo=G('sal-date-to')?.value||'';
  let full=[...DB.invs].reverse();
  if(filter==='delivered')full=full.filter(i=>i.dlvStatus==='delivered');
  else if(filter==='pending')full=full.filter(i=>i.dlvStatus==='pending');
  else if(filter==='paid')full=full.filter(i=>invRemaining(i)<=0.001);
  else if(filter==='partial')full=full.filter(i=>{const p=invPaid(i);return p>0&&p<i.total-0.001});
  if(dateFrom){full=full.filter(i=>i.date>=dateFrom)}
  if(dateTo){full=full.filter(i=>i.date<=dateTo)}
  if(term){full=full.filter(i=>normalizeText(i.num).includes(term)||normalizeText(i.custName).includes(term)||normalizeText(i.date).includes(term));}
  const {data}=getPageData('sal-tb', full);
  const tb=G('sal-tb');
  if(!full.length){tb.innerHTML=emptyRow(9,term?'لا توجد نتائج لهذا البحث':'لا توجد فواتير.');renderPag('sal-tb',0,renderSales);return}
  tb.innerHTML=data.map(inv=>{
    const paid=invPaid(inv);
    const rem=invRemaining(inv);
    return`<tr>
      <td class="td-bold" style="color:var(--accent)">${inv.num}</td>
      <td>${inv.custName}</td>
      <td class="td-mono">${inv.date}</td>
      <td class="td-mono" style="font-weight:700">${fmt(inv.total)} د.ل</td>
      <td class="td-mono" style="color:var(--green)">${fmt(paid)} د.ل</td>
      <td class="td-mono" style="color:${rem>0?'var(--red)':'var(--text-muted)'}">${rem>0?fmt(rem)+' د.ل':'✓'}</td>
      <td>${invDlvLabel(inv.dlvStatus)}</td>
      <td>${invPayStatus(inv)}</td>
      <td><div class="td-actions">
        <button class="btn btn-sm btn-icon" onclick="viewInv(${inv.id})" title="عرض"><i class="ti ti-eye"></i></button>
        ${inv.dlvStatus==='pending'?`<button class="btn btn-sm btn-amber btn-icon" onclick="openDeliver(${inv.id})" title="تسليم"><i class="ti ti-truck-delivery"></i></button>`:''}
        ${rem>0.001?`<button class="btn btn-sm btn-success btn-icon" onclick="openCollect(${inv.id})" title="استلام دفعة"><i class="ti ti-cash"></i></button>`:''}
      </div></td>
    </tr>`
  }).join('');
  renderPag('sal-tb',full.length,renderSales)
}

/* ═══ COLLECT PAYMENT FROM CUSTOMER ═══ */
function openCollect(invId){
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  const paid=invPaid(inv),rem=invRemaining(inv);
  G('col-inv-id').value=invId;
  G('col-date').value=today();
  G('col-amt').value=fmt(rem);
  G('col-notes').value='';
  G('col-check-row').style.display='none';
  document.querySelectorAll('#col-pay .pay-chip').forEach((c,i)=>c.classList.toggle('sel',i===0));
  _colPay='cash';
  const custTotalSold=DB.invs.filter(i=>i.custId===inv.custId).reduce((s,i)=>s+i.total,0);
  const custOpenBal=parseFloat(DB.custs.find(c=>c.id===inv.custId)?.openBal)||0;
  const custTotalPaid=DB.payments.filter(p=>p.custId===inv.custId).reduce((s,p)=>s+p.amount,0);
  const custBalance=custTotalSold+custOpenBal-custTotalPaid;
  const custInvs=DB.invs.filter(i=>i.custId===inv.custId);
  const unpaidInvs=custInvs.filter(i=>invRemaining(i)>0.001).length;
  G('collect-inv-info').innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
      <div><div style="font-size:11px;color:var(--text-muted)">الفاتورة</div><div style="font-weight:700;color:var(--accent)">${inv.num}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">الزبون</div><div style="font-weight:600">${inv.custName}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">الإجمالي</div><div style="font-weight:700">${fmt(inv.total)} د.ل</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">المحصَّل سابقاً</div><div style="font-weight:700;color:var(--green)">${fmt(paid)} د.ل</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">المتبقي</div><div style="font-weight:700;color:var(--red)">${fmt(rem)} د.ل</div></div>
    </div>
    <div class="progress-bar" style="margin-top:8px"><div class="progress-fill" style="width:${Math.min(100,(paid/inv.total)*100).toFixed(1)}%"></div></div>
    <div style="margin-top:10px;padding:8px 10px;background:var(--bg);border-radius:var(--r);font-size:11px;display:flex;gap:16px;flex-wrap:wrap">
      <span>إجمالي مبيعات الزبون: <strong>${fmt(custTotalSold)} د.ل</strong></span>
      <span>رصيد افتتاحي: <strong>${fmt(custOpenBal)} د.ل</strong></span>
      <span>محصَّل ككل: <strong style="color:var(--green)">${fmt(custTotalPaid)} د.ل</strong></span>
      <span>الذمة الإجمالية: <strong style="color:${custBalance>0?'var(--red)':'var(--green)'}">${fmt(custBalance)} د.ل</strong></span>
      ${unpaidInvs>1?`<span style="color:var(--amber)">⚠ ${unpaidInvs} فواتير غير مسددة</span>`:''}
    </div>`;
  openModal('m-collect')
}
function savePayment(){
  const invId=parseInt(G('col-inv-id').value);
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  const amount=parseFloat(G('col-amt').value)||0;
  if(amount<=0){toast('أدخل مبلغاً صحيحاً','error');return}
  const rem=invRemaining(inv);
  if(amount>rem+0.001){toast(`المبلغ (${fmt(amount)}) يتجاوز المتبقي (${fmt(rem)})!`,'error');return}
  const date=G('col-date').value;
  const checkNum=_colPay==='check'?G('col-check-num').value:'';
  const pId='PAY-'+String(DB.cPay).padStart(5,'0');
  DB.cPay++;
  DB.payments.push({
    id:pId,invId,custId:inv.custId,custName:inv.custName,
    amount,date,mode:_colPay,checkNum,
    notes:G('col-notes').value,invNum:inv.num
  });
  const modeLabel=_colPay==='cash'?'نقدي':_colPay==='check'?`صك (${checkNum})`:'آجَل';
  addLog('استلام دفعة (خزينة+)',`${pId} — ${inv.num} — ${inv.custName} — ${fmt(amount)} د.ل — ${modeLabel}`,'#2dd17e');
  saveState();
  closeModal('m-collect');renderSales();updateStats();renderFin();
  broadcastChange('payments', { pId, invId, amount });
  toast(`${fmt(amount)} د.ل — ${inv.custName}`,'success',{title:'تم استلام الدفعة',icon:'ti-cash',duration:4000})
}

function deletePayment(payId){
  const pay=DB.payments.find(p=>p.id===payId);if(!pay)return;
  if(!confirm(`حذف الدفعة ${payId} — ${fmt(pay.amount)} د.ل؟\nسيتم خصم المبلغ من الخزينة.`))return;
  DB.payments=DB.payments.filter(p=>p.id!==payId);
  addLog('حذف دفعة',`${payId} — ${pay.invNum} — ${fmt(pay.amount)} د.ل`,'#f05454');
  saveState();
  renderSales();updateStats();renderFin();
  broadcastChange('payments', { payId, deleted: true });
  toast(`${payId} — ${fmt(pay.amount)} د.ل`,'warning',{title:'تم حذف الدفعة',icon:'ti-trash'})
  const invId=pay.invId;
  if(invId){const inv=DB.invs.find(x=>x.id===invId);if(inv)viewInv(invId)}
  toast(`تم حذف الدفعة ${payId}`)
}

/* ═══ STANDALONE COLLECT PAYMENT (from customer) ═══ */
let _col2Pay='cash';

function openCollectStandalone(){
  _col2Pay='cash';
  popSel('col2-cust',DB.custs,'id','name','-- اختر زبون --');
  G('col2-cust').value='';
  G('col2-amt').value='';
  G('col2-date').value=today();
  G('col2-notes').value='';
  G('col2-check-row').style.display='none';
  document.querySelectorAll('#col2-pay .pay-chip').forEach((c,i)=>c.classList.toggle('sel',i===0));
  G('col2-cust-summary').style.display='none';
  G('col2-invs').innerHTML='';
  openModal('m-collect2');
}

function renderCollect2Invs(){
  const custId=parseInt(G('col2-cust').value);
  const summaryEl=G('col2-cust-summary');
  const invsEl=G('col2-invs');
  if(!custId){summaryEl.style.display='none';invsEl.innerHTML='';return}
  const cust=DB.custs.find(x=>x.id===custId);if(!cust)return;

  const totalSold=DB.invs.filter(i=>i.custId===custId).reduce((s,i)=>s+i.total,0);
  const openBal=parseFloat(cust.openBal)||0;
  const totalPaid=DB.payments.filter(p=>p.custId===custId).reduce((s,p)=>s+p.amount,0);
  const balance=totalSold+openBal-totalPaid;
  const unpaidInvs=DB.invs.filter(i=>i.custId===custId&&invRemaining(i)>0.001).sort((a,b)=>a.date.localeCompare(b.date));
  const totalUnpaid=unpaidInvs.reduce((s,i)=>s+invRemaining(i),0);

  summaryEl.style.display='';
  summaryEl.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
      <div><div style="font-size:11px;color:var(--text-muted)">الزبون</div><div style="font-weight:700;color:var(--accent)">${cust.name}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">إجمالي المبيعات</div><div style="font-weight:700">${fmt(totalSold)} د.ل</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">الرصيد الافتتاحي</div><div style="font-weight:700">${fmt(openBal)} د.ل</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">محصَّل سابقاً</div><div style="font-weight:700;color:var(--green)">${fmt(totalPaid)} د.ل</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">المتبقي</div><div style="font-weight:700;color:${balance>0?'var(--red)':'var(--green)'}">${fmt(balance)} د.ل</div></div>
    </div>`;

  if(!unpaidInvs.length){
    invsEl.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><i class="ti ti-check-circle" style="font-size:24px;display:block;margin-bottom:8px;color:var(--green)"></i>جميع فواتير هذا الزبون مسددة</div>';
    G('col2-amt').value='';
    return;
  }

  invsEl.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:12px">
      <span>فواتير غير مسددة: <strong style="color:var(--red)">${fmt(totalUnpaid)} د.ل</strong></span>
      <span>${unpaidInvs.length} فاتورة</span>
    </div>
    <div class="tbl-wrap"><table style="width:100%;font-size:12px;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--line)">
        <th style="text-align:right;padding:6px"><label style="cursor:pointer"><input type="checkbox" class="col2-select-all" onchange="toggleCollect2All(this)" checked> الكل</label></th>
        <th style="text-align:right;padding:6px">الفاتورة</th><th style="text-align:right;padding:6px">التاريخ</th><th style="text-align:right;padding:6px">الإجمالي</th><th style="text-align:right;padding:6px">المدفوع</th><th style="text-align:right;padding:6px">المتبقي</th>
      </tr></thead>
      <tbody>${unpaidInvs.map(inv=>{
        const rem=invRemaining(inv);
        return`<tr>
          <td style="padding:6px"><input type="checkbox" class="col2-inv-cb" data-inv-id="${inv.id}" data-rem="${rem}" onchange="recalcCollect2Preview()" checked></td>
          <td style="padding:6px;font-weight:600;color:var(--accent)">${inv.num}</td>
          <td style="padding:6px" class="td-mono">${inv.date}</td>
          <td style="padding:6px" class="td-mono">${fmt(inv.total)} د.ل</td>
          <td style="padding:6px" class="td-mono" style="color:var(--green)">${fmt(invPaid(inv))} د.ل</td>
          <td style="padding:6px" class="td-mono" style="color:var(--red);font-weight:700">${fmt(rem)} د.ل</td>
        </tr>`
      }).join('')}</tbody>
    </table></div>
    <div style="margin-top:6px;padding:6px 10px;background:var(--bg);border-radius:var(--r);font-size:12px;display:flex;justify-content:space-between">
      <span>إجمالي المتبقي المحدد: <strong style="color:var(--red)" id="col2-total-unpaid">${fmt(totalUnpaid)} د.ل</strong></span>
      <span>المتبقي بعد الدفع: <strong id="col2-after-pay" style="color:var(--red)">${fmt(totalUnpaid)} د.ل</strong></span>
    </div>`;
}

function toggleCollect2All(el){
  document.querySelectorAll('.col2-inv-cb').forEach(cb=>cb.checked=el.checked);
  recalcCollect2Preview();
}

function recalcCollect2Preview(){
  const amt=parseFloat(G('col2-amt').value)||0;
  let totalUnpaid=0;
  document.querySelectorAll('.col2-inv-cb:checked').forEach(cb=>{totalUnpaid+=parseFloat(cb.dataset.rem)||0});
  const el1=G('col2-total-unpaid');if(el1)el1.textContent=fmt(totalUnpaid)+' د.ل';
  const el2=G('col2-after-pay');if(el2){
    const after=Math.max(0,totalUnpaid-amt);
    el2.textContent=fmt(after)+' د.ل';
    el2.style.color=after>0?'var(--red)':'var(--green)';
  }
}

function saveCollect2(){
  const custId=parseInt(G('col2-cust').value);
  const cust=DB.custs.find(x=>x.id===custId);if(!cust){toast('اختر زبوناً','error');return}
  const amount=parseFloat(G('col2-amt').value)||0;
  if(amount<=0){toast('أدخل مبلغاً صحيحاً','error');return}
  const date=G('col2-date').value;
  const checkNum=_col2Pay==='check'?G('col2-check-num').value:'';
  const notes=G('col2-notes').value;

  const checkedInvs=[];
  document.querySelectorAll('.col2-inv-cb:checked').forEach(cb=>{
    const invId=parseInt(cb.dataset.invId);
    const inv=DB.invs.find(x=>x.id===invId);
    if(inv)checkedInvs.push({inv,rem:invRemaining(inv)});
  });

  // Distribute payment across checked invoices (oldest first)
  let remaining=amount;
  for(const x of checkedInvs){
    if(remaining<=0)break;
    const share=Math.min(remaining,x.rem);
    if(share>0.001){
      const pId='PAY-'+String(DB.cPay).padStart(5,'0');DB.cPay++;
      DB.payments.push({
        id:pId,invId:x.inv.id,invNum:x.inv.num,
        custId,custName:cust.name,
        amount:share,date,mode:_col2Pay,checkNum,notes
      });
      remaining-=share;
    }
  }

  // If no invoices checked or leftover, record as general payment (linked to cust only)
  if(remaining>0.001){
    const pId='PAY-'+String(DB.cPay).padStart(5,'0');DB.cPay++;
    DB.payments.push({
      id:pId,invId:null,invNum:'عام',
      custId,custName:cust.name,
      amount:remaining,date,mode:_col2Pay,checkNum,notes
    });
  }

  const applied=amount-remaining;
  addLog('استلام دفعة (زبون)',`"${cust.name}" — ${fmt(applied)} د.ل — ${_col2Pay}${remaining>0.001?` — ${fmt(remaining)} د.ل لم تُربط`:''}`,'#2d9f6d');
  saveState();
  closeModal('m-collect2');renderSales();updateStats();renderFin();
  broadcastChange('payments', { custId, amount: applied });
  toast(`تم استلام ${fmt(applied)} د.ل من ${cust.name} ✓`);
}

function openSettleForCustomer(){
  const unpaidCusts=DB.custs.filter(c=>{
    const totalSold=DB.invs.filter(i=>i.custId===c.id).reduce((s,i)=>s+i.total,0);
    const totalPaid=DB.payments.filter(p=>p.custId===c.id).reduce((s,p)=>s+p.amount,0);
    const openBal=parseFloat(c.openBal)||0;
    return(totalSold+openBal-totalPaid)>0.001;
  });
  if(!unpaidCusts.length){toast('لا يوجد زبائن عليهم رصيد غير مسدد','info');return}
  const custNames=unpaidCusts.map((c,i)=>{
    const totalSold=DB.invs.filter(inv=>inv.custId===c.id).reduce((s,inv)=>s+inv.total,0);
    const totalPaid=DB.payments.filter(p=>p.custId===c.id).reduce((s,p)=>s+p.amount,0);
    const openBal=parseFloat(c.openBal)||0;
    const bal=totalSold+openBal-totalPaid;
    return`${i+1}. ${c.name} (${fmt(bal)} د.ل)`;
  }).join('\n');
  const choice=prompt('اختر زبوناً (أدخل الرقم):\n'+custNames);
  if(!choice)return;
  const idx=parseInt(choice)-1;
  if(idx>=0&&idx<unpaidCusts.length){openSettlement(unpaidCusts[idx].id)}
}

/* ═══ SETTLEMENT (multi-invoice) ═══ */
let _settleMode='auto'; // 'auto' or 'manual'

function openSettlement(custId){
  if(!custId){
    const invId=G('view-inv-inv-id')?.value;
    if(invId){const inv=DB.invs.find(x=>x.id===parseInt(invId));if(inv)custId=inv.custId}
  }
  if(!custId){toast('اختر زبوناً أولاً','error');return}
  const cust=DB.custs.find(x=>x.id===custId);if(!cust)return;
  _settleMode='auto';
  G('settle-cust-id').value=custId;
  G('settle-amt').value='';
  G('settle-date').value=today();
  G('settle-reason').value='';
  document.querySelectorAll('#settle-mode-btns .settle-mode').forEach((b,i)=>b.classList.toggle('active',i===0));
  renderSettleInvs(custId);
  openModal('m-settle')
}

function renderSettleInvs(custId){
  const unpaidInvs=DB.invs.filter(i=>i.custId===custId&&invRemaining(i)>0.001).sort((a,b)=>a.date.localeCompare(b.date));
  const totalUnpaid=unpaidInvs.reduce((s,i)=>s+invRemaining(i),0);
  const totalOriginal=DB.invs.filter(i=>i.custId===custId).reduce((s,i)=>s+i.total,0);
  const totalPaid=DB.invs.filter(i=>i.custId===custId).reduce((s,i)=>s+invPaid(i),0);
  const totalSettled=(DB.settlements||[]).filter(s=>s.custId===custId).reduce((s,x)=>s+x.amount,0);
  const cust=DB.custs.find(x=>x.id===custId);
  const openBal=parseFloat(cust?.openBal)||0;
  const amt=parseFloat(G('settle-amt').value)||0;
  const el=G('settle-invs');

  // Customer summary
  const summaryEl=G('settle-cust-summary');
  if(summaryEl&&cust){
    summaryEl.style.display='';
    summaryEl.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
        <div><div style="font-size:11px;color:var(--text-muted)">الزبون</div><div style="font-weight:700;color:var(--accent)">${cust.name}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">الرصيد الافتتاحي</div><div style="font-weight:700">${fmt(openBal)} د.ل</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">إجمالي المبيعات</div><div style="font-weight:700">${fmt(totalOriginal)} د.ل</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">محصَّل (دفعات)</div><div style="font-weight:700;color:var(--green)">${fmt(totalPaid)} د.ل</div></div>
        <div><div style="font-size:11px;color:var(--text-muted)">تسويات سابقة</div><div style="font-weight:700;color:var(--amber)">${fmt(totalSettled)} د.ل</div></div>
      </div>`;
  }
  if(!unpaidInvs.length){
    el.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px"><i class="ti ti-check-circle" style="font-size:24px;display:block;margin-bottom:8px;color:var(--green)"></i>جميع فواتير هذا الزبون مسددة</div>';
    return;
  }
  const invRows=unpaidInvs.map(inv=>{
    const rem=invRemaining(inv);
    let applied=0;
    if(_settleMode==='auto'&&amt>0){
      applied=totalUnpaid>0?(rem/totalUnpaid)*amt:0;
      applied=Math.min(applied,rem);
    }
    return`<tr>
      <td><label style="display:flex;align-items:center;gap:6px;cursor:pointer">
        <input type="checkbox" class="settle-inv-cb" data-inv-id="${inv.id}" data-rem="${rem}" onchange="recalcSettlePreview()" checked>
        <span style="font-weight:600;color:var(--accent)">${inv.num}</span>
      </label></td>
      <td class="td-mono">${inv.date}</td>
      <td class="td-mono">${fmt(inv.total)} د.ل</td>
      <td class="td-mono" style="color:var(--green)">${fmt(invPaid(inv))} د.ل</td>
      <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(rem)} د.ل</td>
      <td class="td-mono settle-applied" data-inv-id="${inv.id}" style="color:var(--amber);font-weight:700">${_settleMode==='auto'?fmt(applied)+' د.ل':'0.000 د.ل'}</td>
      <td>${_settleMode==='manual'?`<input type="number" class="settle-manual-amt" data-inv-id="${inv.id}" data-rem="${rem}" step="0.001" min="0" max="${rem}" value="0" onchange="recalcSettlePreview()" style="width:90px;font-size:12px;padding:4px 6px">`:''}</td>
    </tr>`
  });
  el.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:12px">
      <span>إجمالي غير مسدد: <strong style="color:var(--red)">${fmt(totalUnpaid)} د.ل</strong></span>
      <span>${unpaidInvs.length} فواتير</span>
    </div>
    <div class="tbl-wrap"><table style="width:100%;font-size:12px;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--line)"><th style="text-align:right;padding:6px">الفاتورة</th><th style="text-align:right;padding:6px">التاريخ</th><th style="text-align:right;padding:6px">الإجمالي</th><th style="text-align:right;padding:6px">المدفوع</th><th style="text-align:right;padding:6px">المتبقي</th><th style="text-align:right;padding:6px">يُخصَم</th>${_settleMode==='manual'?'<th style="padding:6px">المبلغ</th>':''}</tr></thead>
      <tbody>${invRows.join('')}</tbody>
    </table></div>
    <div style="margin-top:8px;padding:8px 10px;background:var(--bg);border-radius:var(--r);font-size:12px;display:flex;justify-content:space-between">
      <span>إجمالي الخصم: <strong style="color:var(--amber)" id="settle-total-display">${fmt(amt)} د.ل</strong></span>
      <span>المتبقي بعد الخصم: <strong id="settle-remaining-display" style="color:${totalUnpaid-amt>0?'var(--red)':'var(--green)'}">${fmt(Math.max(0,totalUnpaid-amt))} د.ل</strong></span>
    </div>`;
}

function setSettleMode(mode){
  _settleMode=mode;
  document.querySelectorAll('#settle-mode-btns .settle-mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  const custId=parseInt(G('settle-cust-id').value);
  if(custId)renderSettleInvs(custId);
}

function recalcSettlePreview(){
  const amt=parseFloat(G('settle-amt').value)||0;
  const totalUnpaid=calcSettleTotalUnpaid();
  if(_settleMode==='auto'){
    document.querySelectorAll('.settle-inv-cb:checked').forEach(cb=>{
      const invId=parseInt(cb.dataset.invId);
      const rem=parseFloat(cb.dataset.rem);
      const applied=totalUnpaid>0?(rem/totalUnpaid)*amt:0;
      const el=document.querySelector(`.settle-applied[data-inv-id="${invId}"]`);
      if(el)el.textContent=fmt(Math.min(applied,rem))+' د.ل';
    });
  } else {
    let totalManual=0;
    document.querySelectorAll('.settle-manual-amt').forEach(inp=>{
      const max=parseFloat(inp.dataset.rem)||0;
      const val=Math.min(parseFloat(inp.value)||0,max);
      inp.value=val;
      totalManual+=val;
      const el=document.querySelector(`.settle-applied[data-inv-id="${inp.dataset.invId}"]`);
      if(el)el.textContent=fmt(val)+' د.ل';
    });
  }
  const displayedTotal=_settleMode==='auto'?amt:calcSettleManualTotal();
  const el1=G('settle-total-display');if(el1)el1.textContent=fmt(displayedTotal)+' د.ل';
  const el2=G('settle-remaining-display');if(el2){el2.textContent=fmt(Math.max(0,totalUnpaid-displayedTotal))+' د.ل';el2.style.color=totalUnpaid-displayedTotal>0?'var(--red)':'var(--green)'}
}

function calcSettleTotalUnpaid(){
  let total=0;
  document.querySelectorAll('.settle-inv-cb:checked').forEach(cb=>{total+=parseFloat(cb.dataset.rem)||0});
  return total;
}

function calcSettleManualTotal(){
  let total=0;
  document.querySelectorAll('.settle-manual-amt').forEach(inp=>{total+=parseFloat(inp.value)||0});
  return total;
}

function saveSettlement(){
  const custId=parseInt(G('settle-cust-id').value);
  const cust=DB.custs.find(x=>x.id===custId);if(!cust){toast('خطأ في الزبون','error');return}
  const amt=parseFloat(G('settle-amt').value)||0;
  const reason=G('settle-reason').value.trim();
  const date=G('settle-date').value;
  if(amt<=0){toast('أدخل مبلغاً صحيحاً','error');return}
  if(!reason){toast('أدخل سبب التسوية','error');return}
  const checkedInvs=[];
  document.querySelectorAll('.settle-inv-cb:checked').forEach(cb=>{
    const invId=parseInt(cb.dataset.invId);
    const inv=DB.invs.find(x=>x.id===invId);
    if(inv)checkedInvs.push({inv,rem:invRemaining(inv)});
  });
  if(!checkedInvs.length){toast('اختر فاتورة واحدة على الأقل','error');return}
  const totalUnpaid=checkedInvs.reduce((s,x)=>s+x.rem,0);
  const applied=[];
  let remaining=amt;
  for(const x of checkedInvs){
    let share=0;
    if(_settleMode==='auto'){
      share=totalUnpaid>0?(x.rem/totalUnpaid)*amt:0;
      share=Math.min(share,x.rem,remaining);
    } else {
      const inp=document.querySelector(`.settle-manual-amt[data-inv-id="${x.inv.id}"]`);
      share=Math.min(parseFloat(inp?.value)||0,x.rem,remaining);
    }
    if(share>0.001){
      applied.push({invId:x.inv.id,invNum:x.inv.num,amount:share});
      x.inv.discount=(x.inv.discount||0)+share;
      x.inv.total=Math.max(0,x.inv.total-share);
      if(!x.inv.settlements)x.inv.settlements=[];
      x.inv.settlements.push({amount:share,reason,date});
      remaining-=share;
    }
  }
  if(!applied.length){toast('لم يتم تطبيق أي مبلغ','error');return}
  const settlement={
    id:'SETL-'+String(DB.cSettle).padStart(5,'0'),
    custId,custName:cust.name,
    amount:amt,actualApplied:amt-remaining,remaining,
    reason,date,applied,
    mode:_settleMode
  };
  DB.cSettle++;
  DB.settlements.push(settlement);
  addLog('تسوية (خصم)',`${settlement.id} — "${cust.name}" — ${fmt(amt)} د.ل — ${applied.length} فاتورة — ${reason}`,'#f5a623');
  saveState();
  closeModal('m-settle');renderSales();updateStats();
  broadcastChange('settlements', { settlementId: settlement.id, custName: cust.name });
  toast(`${fmt(amt)} د.ل على ${applied.length} فاتورة`,'success',{title:'تم تطبيق التسوية',icon:'ti-discount',duration:4000})
}

/* ═══ DELIVER ═══ */
function openDeliver(invId){
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  G('dlv-inv-id').value=invId;G('dlv-recv').value='';G('dlv-notes').value='';
  const items=inv.lines.map(l=>{
    const item=DB.items.find(x=>x.id===l.itemId);
    const avail=item?item.qty:0;
    const ok=avail>=l.qty;
    return`<tr><td style="padding:6px">${l.name}</td><td style="text-align:center;padding:6px">${l.qty}</td><td style="text-align:center;padding:6px;${ok?'color:var(--green)':'color:var(--red);font-weight:700'}">${avail}</td><td style="text-align:center;padding:6px">${ok?'<i class="ti ti-check" style="color:var(--green)"></i>':'<i class="ti ti-alert-triangle" style="color:var(--red)"></i>'}</td></tr>`
  });
  const allOk=items.every((_,i)=>DB.items.find(x=>x.id===inv.lines[i].itemId)?.qty>=inv.lines[i].qty);
  G('deliver-inv-info').innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div><div style="font-size:11px;color:var(--text-muted)">الفاتورة</div><div style="font-weight:700;color:var(--accent)">${inv.num}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">الزبون</div><div style="font-weight:600">${inv.custName}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">التاريخ</div><div>${inv.date}</div></div>
    </div>
    <table style="width:100%;font-size:12px;border-collapse:collapse">
      <thead><tr style="border-bottom:2px solid var(--line)"><th style="text-align:right;padding:6px">الصنف</th><th style="text-align:center;padding:6px">المطلوب</th><th style="text-align:center;padding:6px">المتوفر</th><th style="text-align:center;padding:6px">الحالة</th></tr></thead>
      <tbody>${items.join('')}</tbody>
    </table>
    ${!allOk?'<div style="margin-top:8px;padding:8px;background:rgba(240,84,84,.1);border-radius:var(--r);color:var(--red);font-size:12px"><i class="ti ti-alert-triangle"></i> بعض الأصناف غير متوفرة بالكمية المطلوبة</div>':''}`;
  openModal('m-deliver')
}
function confirmDeliver(){
  const recv=G('dlv-recv').value.trim();if(!recv){toast('أدخل اسم المستلم','error');return}
  const invId=parseInt(G('dlv-inv-id').value);
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  const failed=[];
  inv.lines.forEach(l=>{
    const item=DB.items.find(x=>x.id===l.itemId);
    if(item){
      if(item.qty<l.qty)failed.push(`${l.name}: المتاح ${item.qty} والمطلوب ${l.qty}`);
    }
  });
  if(failed.length){toast('نقص في المخزون: '+failed.join(' | '),'error');return}
  inv.lines.forEach(l=>{const item=DB.items.find(x=>x.id===l.itemId);if(item)item.qty=Math.max(0,item.qty-l.qty)});
  inv.dlvStatus='delivered';inv.receiver=recv;inv.deliveredAt=today();inv.dlvNotes=G('dlv-notes').value||'';
  addLog('تسليم البضاعة (مخزون-)',`${inv.num} — المستلم: "${recv}" — المخزون مُحدَّث فقط، لا أثر على الخزينة`,'#14b8a6');
  saveState();
  closeModal('m-deliver');renderSales();renderItems();updateStats();
  broadcastChange('sales', { invNum: inv.num, delivered: true });
  toast(`ف. ${inv.num} — المستلم: ${recv}`,'success',{title:'تم التسليم',icon:'ti-truck-delivery',duration:4000})
}

/* ═══ VIEW INVOICE ═══ */
function viewInv(invId){
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  const paid=invPaid(inv),rem=invRemaining(inv);
  const paysForInv=DB.payments.filter(p=>p.invId===invId);
  G('view-inv-title').innerHTML=`<i class="ti ti-receipt" style="color:var(--accent)"></i> فاتورة ${inv.num}`;

  // Status pipeline
  const step1Done=true;
  const step2Done=inv.dlvStatus==='delivered';
  const step3Done=paid>=inv.total-0.001;

  G('view-inv-body').innerHTML=`
    <div class="inv-status-bar">
      <div class="isb-step done">
        <div class="isb-dot"><i class="ti ti-check"></i></div>
        <div class="isb-lbl">صدرت الفاتورة</div>
      </div>
      <div class="isb-step ${step2Done?'done':'active'}">
        <div class="isb-dot">${step2Done?'<i class="ti ti-check"></i>':'<i class="ti ti-truck-delivery"></i>'}</div>
        <div class="isb-lbl">تسليم البضاعة</div>
      </div>
      <div class="isb-step ${step3Done?'done':paid>0?'active':''}">
        <div class="isb-dot">${step3Done?'<i class="ti ti-check"></i>':paid>0?'<i class="ti ti-cash"></i>':'<i class="ti ti-cash"></i>'}</div>
        <div class="isb-lbl">السداد الكامل</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;font-size:12px">
      <div class="card" style="margin:0;padding:10px 12px">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;font-weight:700">معلومات الفاتورة</div>
        <div style="display:flex;flex-direction:column;gap:5px">
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">الزبون</span><strong>${inv.custName}</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">التاريخ</span><span>${inv.date}</span></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">الإجمالي</span><strong style="color:var(--accent)">${fmt(inv.total)} د.ل</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">المستلم</span><span>${inv.receiver||'—'}</span></div>
          ${inv.deliveredAt?`<div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">تاريخ التسليم</span><span>${inv.deliveredAt}</span></div>`:''}
          ${inv.dlvNotes?`<div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">ملاحظات التسليم</span><span>${inv.dlvNotes}</span></div>`:''}
        </div>
      </div>
      <div class="card" style="margin:0;padding:10px 12px">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;font-weight:700">حالة السداد</div>
        <div style="display:flex;flex-direction:column;gap:5px">
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">المحصَّل</span><strong style="color:var(--green)">${fmt(paid)} د.ل</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">المتبقي</span><strong style="color:${rem>0?'var(--red)':'var(--green)'}">${rem>0?fmt(rem)+' د.ل':'مسدَّد ✓'}</strong></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,(paid/inv.total)*100).toFixed(1)}%"></div></div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="card-hd" style="margin-bottom:8px"><h3><i class="ti ti-list"></i> بنود الفاتورة</h3></div>
      <div class="tbl-wrap"><table><thead><tr><th>الصنف</th><th>الكمية</th><th>السعر</th><th>الخصم</th><th>الإجمالي</th></tr></thead>
      <tbody>${inv.lines.map(l=>`<tr><td class="td-bold">${l.name}</td><td class="td-mono">${l.qty}</td><td class="td-mono">${fmt(l.price)}</td><td class="td-mono">${l.disc>0?fmt(l.disc):'—'}</td><td class="td-mono" style="font-weight:700">${fmt(l.total)}</td></tr>`).join('')}</tbody></table></div>
    </div>
    <div class="card" style="margin:0">
      <div class="card-hd" style="margin-bottom:8px"><h3><i class="ti ti-cash" style="color:var(--green)"></i> سجل الدفعات</h3></div>
      ${paysForInv.length?`<div class="pay-history">${paysForInv.map(p=>`<div class="pay-row"><div><span style="font-weight:600;color:var(--text-primary)">${p.id}</span> — ${p.mode==='cash'?'نقدي':p.mode==='check'?`صك ${p.checkNum||''}`:p.mode==='transfer'?'تحويل':p.mode}</div><div class="pr-date">${p.date}</div><div class="pr-amt">+${fmt(p.amount)} د.ل</div><div><button class="btn btn-sm btn-danger btn-icon" onclick="event.stopPropagation();deletePayment('${p.id}')" title="حذف الدفعة"><i class="ti ti-trash"></i></button></div></div>`).join('')}</div>`:'<div style="font-size:12px;color:var(--text-muted);padding:8px 0">لا دفعات مسجَّلة بعد.</div>'}
    </div>
    ${inv.discount?`<div style="margin-top:10px;padding:8px 12px;background:rgba(245,166,35,.1);border-radius:var(--r);font-size:12px;color:var(--amber)"><i class="ti ti-discount"></i> خصم ${fmt(inv.discount)} د.ل — ${inv.discountReason||'تسوية'}${(inv.settlements||[]).length>1?` (${inv.settlements.length} تسويات)`:''}</div>`:''}`;
  G('view-inv-footer').innerHTML=`
    <input type="hidden" id="view-inv-inv-id" value="${invId}">
    <button class="btn" onclick="closeModal('m-view-inv')">إغلاق</button>
    <button class="btn btn-secondary" onclick="printInvoice('sale',${inv.id})"><i class="ti ti-printer"></i> تصدير PDF</button>
    ${rem>0.001?`<button class="btn btn-secondary" onclick="closeModal('m-view-inv');openSettlement(${inv.custId})"><i class="ti ti-discount"></i> تسوية / خصم</button>`:''}
    ${inv.dlvStatus==='pending'?`<button class="btn btn-amber" onclick="closeModal('m-view-inv');openDeliver(${inv.id})"><i class="ti ti-truck-delivery"></i> تسليم البضاعة</button>`:''}
    ${rem>0.001?`<button class="btn btn-success" onclick="closeModal('m-view-inv');openCollect(${inv.id})"><i class="ti ti-cash"></i> استلام دفعة</button>`:''}`;
  openModal('m-view-inv')
}

function viewPur(purId){
  const pur=DB.purs.find(x=>x.id===purId);if(!pur)return;
  const paid=purPaid(pur),rem=purRemaining(pur);
  const purBalanceClass=rem>0?'text-red':'text-green';
  G('view-pur-title').innerHTML=`<i class="ti ti-truck" style="color:var(--amber)"></i> فاتورة ${pur.num}`;
  G('view-pur-body').innerHTML=`<div class="card" style="margin-bottom:12px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border)"><div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--purple));display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px"><i class="ti ti-building-store"></i></div><div><div style="font-size:15px;font-weight:700">${currentCompany().name}</div><div style="font-size:11px;color:var(--text-muted)">${currentCompany().address}</div></div><div style="margin-right:auto;text-align:left"><div style="font-size:11px;color:var(--text-muted)">فاتورة شراء</div><div style="font-size:13px;font-weight:700;color:var(--accent)">${pur.supName}</div><div style="font-size:10px;color:var(--text-muted);font-family:var(--mono)">${pur.date}</div></div></div><div class="soa-meta"><div><div class="soa-ml">الهاتف</div><div class="soa-mv">${pur.supName}</div></div><div><div class="soa-ml">الرصيد</div><div class="soa-mv ${purBalanceClass}">${fmt(rem)} د.ل</div></div><div><div class="soa-ml">المستلم</div><div class="soa-mv">${pur.receivedStock?'<span class="badge b-green">تم الاستلام</span>':'<span class="badge b-amber">غير مستلم</span>'}</div></div></div></div><div class="card" style="margin-bottom:12px"><div class="card-hd"><h3><i class="ti ti-list"></i> بنود الفاتورة</h3></div><div class="tbl-wrap"><table><thead><tr><th>الصنف</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th></tr></thead><tbody>${pur.lines.map(l=>`<tr><td class="td-bold">${l.name}</td><td class="td-mono">${l.qty}</td><td class="td-mono">${fmt(l.price)}</td><td class="td-mono" style="font-weight:700">${fmt(l.total)}</td></tr>`).join('')}</tbody></table></div></div><div class="card"><div class="card-hd" style="margin-bottom:8px"><h3><i class="ti ti-calculator" style="color:var(--accent)"></i> ملخص الفاتورة</h3></div><div style="display:flex;flex-direction:column;gap:4px"><div style="display:flex;justify-content:space-between"><span>الإجمالي</span><strong>${fmt(pur.total)} د.ل</strong></div><div style="display:flex;justify-content:space-between"><span>المدفوع</span><strong style="color:var(--green)">${fmt(paid)} د.ل</strong></div><div style="display:flex;justify-content:space-between"><span>المتبقي</span><strong style="color:${purBalanceClass}">${fmt(rem)} د.ل</strong></div></div></div></div>`;
  G('view-pur-footer').innerHTML=`<button class="btn" onclick="closeModal('m-view-pur')">إغلاق</button><button class="btn btn-secondary" onclick="printInvoice('purchase',${pur.id})"><i class="ti ti-printer"></i> تصدير PDF</button>`;
  openModal('m-view-pur');
}

function printInvoice(type,id){
  let title='';let num='';let date='';let name='';let lines=[];let total=0;let paid=0;let rem=0;let notes='';let discount=0;let discountReason='';
  const company=currentCompany();
  if(type==='sale'){
    const inv=DB.invs.find(x=>x.id===id);if(!inv){toast('الفاتورة غير موجودة','error');return}
    title='فاتورة بيع';num=inv.num;date=inv.date;name=inv.custName;lines=inv.lines;total=inv.total;paid=invPaid(inv);rem=invRemaining(inv);notes=company.note||'';discount=inv.discount||0;discountReason=inv.discountReason||'';
  } else {
    const pur=DB.purs.find(x=>x.id===id);if(!pur){toast('فاتورة الشراء غير موجودة','error');return}
    title='فاتورة شراء';num=pur.num;date=pur.date;name=pur.supName;lines=pur.lines;total=pur.total;paid=purPaid(pur);rem=purRemaining(pur);notes=company.note||'';
  }
  const win=window.open('','_blank','width=960,height=1150');
  if(!win){toast('تعذر فتح نافذة الطباعة — تأكد من السماح النوافذ المنبثقة','error');return}
  const now=new Date();
  const dateStr=now.toLocaleDateString('ar-LY');
  const timeStr=now.toLocaleTimeString('ar-LY',{hour:'2-digit',minute:'2-digit'});
  const payStatus=rem<=0.001?'مسددة بالكامل':paid>0?'جزئي':'غير مدفوعة';
  const payColor=rem<=0.001?'#16a34a':paid>0?'#d97706':'#dc2626';
  const payBg=rem<=0.001?'#f0fdf4':paid>0?'#fffbeb':'#fef2f2';
  const payBorder=rem<=0.001?'#bbf7d0':paid>0?'#fde68a':'#fecaca';

  const qrSvg=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#fff"/>
    <rect x="5" y="5" width="28" height="28" rx="3" fill="#1e293b"/>
    <rect x="67" y="5" width="28" height="28" rx="3" fill="#1e293b"/>
    <rect x="5" y="67" width="28" height="28" rx="3" fill="#1e293b"/>
    <rect x="9" y="9" width="20" height="20" rx="2" fill="#fff"/>
    <rect x="71" y="9" width="20" height="20" rx="2" fill="#fff"/>
    <rect x="9" y="71" width="20" height="20" rx="2" fill="#fff"/>
    <rect x="13" y="13" width="12" height="12" fill="#1e293b"/>
    <rect x="75" y="13" width="12" height="12" fill="#1e293b"/>
    <rect x="13" y="75" width="12" height="12" fill="#1e293b"/>
    <rect x="38" y="5" width="6" height="6" fill="#1e293b" opacity=".8"/>
    <rect x="48" y="5" width="6" height="6" fill="#1e293b" opacity=".5"/>
    <rect x="56" y="10" width="6" height="6" fill="#1e293b" opacity=".6"/>
    <rect x="38" y="18" width="6" height="6" fill="#1e293b" opacity=".4"/>
    <rect x="48" y="24" width="6" height="6" fill="#1e293b" opacity=".7"/>
    <rect x="5" y="38" width="6" height="6" fill="#1e293b" opacity=".5"/>
    <rect x="18" y="38" width="6" height="6" fill="#1e293b" opacity=".3"/>
    <rect x="38" y="38" width="24" height="24" rx="4" fill="#1e293b" opacity=".12"/>
    <rect x="44" y="44" width="12" height="12" rx="2" fill="#1e293b" opacity=".5"/>
    <rect x="67" y="38" width="6" height="6" fill="#1e293b" opacity=".4"/>
    <rect x="80" y="38" width="6" height="6" fill="#1e293b" opacity=".6"/>
    <rect x="67" y="50" width="6" height="6" fill="#1e293b" opacity=".5"/>
    <rect x="80" y="50" width="6" height="6" fill="#1e293b" opacity=".3"/>
    <rect x="67" y="67" width="28" height="28" rx="3" fill="#1e293b"/>
    <rect x="71" y="71" width="20" height="20" rx="2" fill="#fff"/>
    <rect x="75" y="75" width="12" height="12" fill="#1e293b"/>
    <rect x="38" y="70" width="6" height="6" fill="#1e293b" opacity=".4"/>
    <rect x="50" y="78" width="6" height="6" fill="#1e293b" opacity=".5"/>
    <rect x="5" y="50" width="6" height="6" fill="#1e293b" opacity=".3"/>
    <rect x="18" y="55" width="6" height="6" fill="#1e293b" opacity=".6"/>
  </svg>`;

  const linesHtml=lines.map((l,i)=>{
    const item=DB.items.find(x=>x.id===l.itemId);
    const barcode=item?.barcode||'';
    const code=item?.code||'';
    const discCell=type==='sale'?`<td>${l.disc>0?fmt(l.disc)+' د.ل':'—'}</td>`:'';
    const barcodeHtml=barcode||code?`<div style="font-family:monospace;font-size:8px;color:#64748b;direction:ltr;letter-spacing:1px;margin-top:1px">${barcode||code}</div>`:'';
    return`<tr>
      <td style="text-align:center;color:#94a3b8;font-size:10px">${i+1}</td>
      <td style="font-weight:600;color:#1e293b">${l.name}${barcodeHtml}</td>
      <td style="text-align:center">${l.qty}</td>
      <td style="direction:ltr;text-align:right;font-family:monospace">${fmt(l.price)} د.ل</td>
      ${discCell}
      <td style="direction:ltr;text-align:right;font-family:monospace;font-weight:700;color:#1e293b">${fmt(l.total)} د.ل</td>
    </tr>`;
  }).join('');

  const html=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>${title} ${num}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
  @page{size:A4 portrait;margin:14mm 18mm 16mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Cairo',Helvetica,Arial,sans-serif;direction:rtl;color:#1e293b;padding:0;font-size:12px;line-height:1.5;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}

  .inv{position:relative;padding:24px 28px 70px;min-height:100vh}

  .inv-accent{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(135deg,#4f8ef7 0%,#6c5ce7 50%,#a855f7 100%)}
  .inv-side{position:absolute;top:0;right:0;width:4px;height:100%;background:linear-gradient(180deg,#4f8ef7,#6c5ce7,#a855f7);opacity:.25}
  .inv-watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-32deg);font-size:56px;font-weight:900;color:rgba(79,142,247,.03);pointer-events:none;z-index:0;white-space:nowrap;letter-spacing:6px}

  /* Header */
  .inv-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-top:12px;gap:20px}
  .inv-company{flex:1}
  .inv-company-name{font-size:24px;font-weight:800;color:#4f8ef7;margin-bottom:3px;letter-spacing:-.3px}
  .inv-company-sub{font-size:11px;color:#64748b;line-height:1.6}
  .inv-company-sub span{display:inline-block;margin-left:12px}
  .inv-title-box{text-align:left;min-width:220px}
  .inv-type{font-size:28px;font-weight:800;color:#1e293b;margin-bottom:4px;letter-spacing:-.5px}
  .inv-type-badge{display:inline-block;width:100%;height:4px;background:linear-gradient(90deg,#4f8ef7,#6c5ce7);border-radius:2px;margin-top:4px}
  .inv-meta{font-size:11px;color:#64748b;line-height:1.8;margin-top:10px}
  .inv-meta strong{color:#1e293b;font-weight:600}
  .inv-status{display:inline-flex;align-items:center;gap:5px;padding:5px 16px;border-radius:20px;font-size:12px;font-weight:700;color:${payColor};background:${payBg};border:1.5px solid ${payBorder};margin-top:6px}
  .inv-status i{font-size:14px}

  /* Info grid */
  .inv-info{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px;padding:14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0}
  .inv-info-box{font-size:12px}
  .inv-info-box label{font-size:10px;color:#94a3b8;display:block;margin-bottom:2px;font-weight:500}
  .inv-info-box span{font-weight:600;color:#1e293b}

  /* Items table */
  .inv-table{width:100%;border-collapse:collapse;margin:0;font-size:11px}
  .inv-table thead th{background:linear-gradient(135deg,#4f8ef7,#5b9cf7);color:#fff;padding:10px 8px;font-weight:600;text-align:right;font-size:11px}
  .inv-table thead th:first-child{border-radius:0 8px 0 0}
  .inv-table thead th:last-child{border-radius:8px 0 0 0}
  .inv-table tbody td{padding:9px 8px;border-bottom:1px solid #f1f5f9}
  .inv-table tbody tr:nth-child(even){background:#f8fafc}
  .inv-table tbody tr:nth-child(odd){background:#fff}
  .inv-table tbody tr:last-child td{border-bottom:2px solid #e2e8f0}

  /* Summary */
  .inv-summary{display:flex;justify-content:space-between;margin-top:22px;gap:20px}
  .inv-qr-section{text-align:center;width:120px;flex-shrink:0}
  .inv-qr-box{width:100px;height:100px;margin:0 auto 6px;border:2px solid #e2e8f0;border-radius:8px;display:flex;align-items:center;justify-content:center;background:#fff;padding:5px}
  .inv-qr-box svg{width:100%;height:100%}
  .inv-qr-label{font-size:9px;color:#94a3b8;font-weight:500}
  .inv-totals{width:300px;background:#f8fafc;border-radius:10px;padding:16px;border:1px solid #e2e8f0}
  .inv-totals-row{display:flex;justify-content:space-between;padding:6px 0;font-size:12px;border-bottom:1px dashed #e2e8f0}
  .inv-totals-row:last-child{border-bottom:none}
  .inv-totals-row.total-final{border-top:2.5px solid #4f8ef7;margin-top:4px;padding-top:10px;font-size:15px;font-weight:800;color:#4f8ef7}
  .inv-totals .paid-val{color:#16a34a;font-weight:700}
  .inv-totals .rem-val{color:${rem>0.001?'#dc2626':'#16a34a'};font-weight:700}

  /* Terms */
  .inv-terms{margin-top:18px;padding:14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:10px;color:#64748b;line-height:1.8}
  .inv-terms-title{font-weight:700;color:#1e293b;margin-bottom:6px;font-size:11px;display:flex;align-items:center;gap:4px}
  .inv-terms-title i{font-size:13px;color:#4f8ef7}
  .inv-terms ol{padding-right:16px}
  .inv-terms li{margin-bottom:2px}
  .inv-notes{margin-top:8px;padding:8px 12px;background:#fff;border-radius:6px;border:1px solid #e2e8f0;font-weight:600;color:#1e293b}

  /* Stamps */
  .inv-stamps{display:flex;gap:24px;margin-top:18px}
  .inv-stamp{width:140px;height:60px;border:1.5px dashed #cbd5e1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#94a3b8;flex-direction:column;gap:3px;background:#fafbfc}
  .inv-stamp i{font-size:15px;opacity:.4}

  /* Footer */
  .inv-footer{margin-top:20px;padding-top:12px;border-top:2px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;font-size:9px;color:#94a3b8}
  .inv-footer-brand{font-weight:700;color:#4f8ef7;font-size:11px}

  @media print{
    body{padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .inv{padding:0 6mm 12mm}
    .inv-watermark{display:none}
    .inv-accent{height:4px}
    .inv-table{page-break-inside:auto}
    .inv-table tr{page-break-inside:avoid;page-break-after:auto}
    .inv-table thead{display:table-header-group}
  }
  </style></head><body>
  <div class="inv">
    <div class="inv-accent"></div>
    <div class="inv-side"></div>
    <div class="inv-watermark">${title} ${num}</div>

    <!-- HEADER -->
    <div class="inv-header">
      <div class="inv-company">
        ${company.logo?'<div style="margin-bottom:6px">'+companyLogoHtml(company,55)+'</div>':''}
        <div class="inv-company-name">${company.name}</div>
        <div class="inv-company-sub">
          ${company.address?'<span>'+company.address+'</span>':''}
          ${company.phone?'<span>'+company.phone+'</span>':''}
          ${company.email?'<span>'+company.email+'</span>':''}
          ${company.taxNo?'<span>الرقم الضريبي: '+company.taxNo+'</span>':''}
        </div>
      </div>
      <div class="inv-title-box">
        <div class="inv-type">${title}</div>
        <div class="inv-type-badge"></div>
        <div class="inv-meta">
          <div>الرقم: <strong>${num}</strong></div>
          <div>التاريخ: <strong>${date}</strong></div>
          <div>${type==='sale'?'الزبون':'المورد'}: <strong>${name}</strong></div>
        </div>
        <div class="inv-status"><i class="ti ti-${rem<=0.001?'circle-check':paid>0?'alert-triangle':'circle-x'}"></i>${payStatus}</div>
      </div>
    </div>

    <!-- INFO -->
    <div class="inv-info">
      <div class="inv-info-box"><label>${type==='sale'?'اسم الزبون':'اسم المورد'}</label><span>${name}</span></div>
      <div class="inv-info-box"><label>رقم الفاتورة</label><span>${num}</span></div>
      <div class="inv-info-box"><label>تاريخ الفاتورة</label><span>${date}</span></div>
      <div class="inv-info-box"><label>تاريخ الطباعة</label><span>${dateStr} ${timeStr}</span></div>
    </div>

    <!-- ITEMS TABLE -->
    <table class="inv-table">
      <thead><tr>
        <th style="width:30px;text-align:center">#</th>
        <th>الصنف</th>
        <th style="text-align:center;width:50px">الكمية</th>
        <th style="width:80px">سعر الوحدة</th>
        ${type==='sale'?'<th style="width:70px">الخصم</th>':''}
        <th style="width:90px">الإجمالي</th>
      </tr></thead>
      <tbody>${linesHtml}</tbody>
    </table>

    <!-- SUMMARY: QR right + Totals left -->
    <div class="inv-summary">
      <div class="inv-qr-section">
        <div class="inv-qr-box">${qrSvg}</div>
        <div class="inv-qr-label">امسح للتحقق</div>
      </div>
      <div class="inv-totals">
        <div class="inv-totals-row"><span>الإجمالي قبل الخصم</span><span>${fmt(total+discount)} د.ل</span></div>
        ${discount>0?`<div class="inv-totals-row"><span>خصم ${discountReason?'('+discountReason+')':''}</span><span style="color:#d97706">-${fmt(discount)} د.ل</span></div>`:''}
        <div class="inv-totals-row total-final"><span>الإجمالي النهائي</span><span>${fmt(total)} د.ل</span></div>
        ${type==='sale'?`<div class="inv-totals-row"><span>المدفوع</span><span class="paid-val">${fmt(paid)} د.ل</span></div><div class="inv-totals-row"><span>المتبقي</span><span class="rem-val">${rem>0.001?fmt(rem)+' د.ل':'مسدّد بالكامل ✓'}</span></div>`:''}
      </div>
    </div>

    <!-- TERMS -->
    <div class="inv-terms">
      <div class="inv-terms-title"><i class="ti ti-file-text"></i> الشروط والأحكام</div>
      <ol>
        <li>هذه الفاتورة صادرة إلكترونياً ولا تحتاج إلى توقيع أو ختم.</li>
        <li>في حالة عدم الدفع خلال المدة المحددة تُضاف فائدة تأخير بنسبة 2% شهرياً.</li>
        <li>المرتجعات تخضع لسياسة الشركة المعلنة.</li>
        <li>يُرجى الحفاظ على هذه الفاتورة للمراجعة.</li>
      </ol>
      ${notes?`<div class="inv-notes"><i class="ti ti-note" style="font-size:11px;color:#4f8ef7"></i> ملاحظات: ${notes}</div>`:''}
    </div>

    <!-- STAMPS -->
    <div class="inv-stamps">
      <div class="inv-stamp"><i class="ti ti-stamp"></i>ختم المؤسسة</div>
      <div class="inv-stamp"><i class="ti ti-signature"></i>توقيع المسؤول</div>
    </div>

    <!-- FOOTER -->
    <div class="inv-footer">
      <span class="inv-footer-brand">${company.name}</span>
      <span>تاريخ الطباعة: ${dateStr} ${timeStr} • ${num}</span>
      <span>${company.name} © ${now.getFullYear()}</span>
    </div>
  </div>
  <script>window.onload=function(){window.print();window.onafterprint=function(){window.close()}}<\/script>
  </body></html>`;
  win.document.write(html);win.document.close();
}

/* ═══ RETURNS ═══ */
function saveRet(){
  const invNum=G('re-inv').value,amt=parseFloat(G('re-amt').value)||0;
  if(!invNum||amt<=0){toast('تحقق من البيانات','error');return}
  const inv=DB.invs.find(x=>x.num===invNum);
  const num='RET-'+String(DB.cRet).padStart(5,'0'),date=G('re-date').value;
  // If QC passed: re-add to inventory
  if(_reQC==='passed'&&inv){
    inv.lines.forEach(l=>{const item=DB.items.find(x=>x.id===l.itemId);if(item)item.qty+=l.qty})
  }
  DB.rets.push({id:DB.cRet++,num,invNum,custName:inv?.custName||'—',amt,reason:G('re-reason').value,qcStatus:_reQC,date});
  addLog('مرتجع مبيعات',`${num} — فاتورة ${invNum} — ${fmt(amt)} د.ل — QC: ${_reQC}`,'#f05454');
  saveState();
  closeModal('m-return');renderRets();renderItems();updateStats();
  broadcastChange('returns', { num, invNum });
  const qcMsg=_reQC==='passed'?' وأُعيد للمخزون':_reQC==='failed'?' ولن يُعاد للمخزون':' والجودة قيد المراجعة';
  toast(`تم تسجيل المرتجع ${num}${qcMsg}`)
}
function renderRets(search=''){
  const tb=G('ret-tb');
  const term=normalizeText(search);
  const qcFilter=G('ret-qc-filter')?.value||'';
  let full=[...DB.rets].reverse();
  if(term){full=full.filter(r=>normalizeText(r.num).includes(term)||normalizeText(r.invNum).includes(term)||normalizeText(r.reason).includes(term));}
  if(qcFilter){full=full.filter(r=>r.qcStatus===qcFilter)}
  if(!full.length){tb.innerHTML=emptyRow(6,term?'لا توجد نتائج':'لا توجد مرتجعات.');renderPag('ret-tb',0,renderRets);return}
  const {data}=getPageData('ret-tb', full);
  function qcLbl(s){return s==='passed'?'<span class="badge b-green">مقبول</span>':s==='failed'?'<span class="badge b-red">مرفوض</span>':'<span class="badge b-amber">قيد المراجعة</span>'}
  tb.innerHTML=data.map(r=>`<tr>
    <td class="td-bold">${r.num}</td>
    <td class="td-mono">${r.invNum}</td>
    <td>${r.custName}</td>
    <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(r.amt)} د.ل</td>
    <td style="color:var(--text-muted)">${r.reason||'—'}</td>
    <td>${qcLbl(r.qcStatus)}</td>
    <td class="td-mono">${r.date}</td>
  </tr>`).join('');
  renderPag('ret-tb',full.length,renderRets)
}

/* ═══ REVERSE SETTLEMENT ═══ */
function loadReverseSettlements(){
  const type=document.querySelector('input[name="rev-settle-type"]:checked')?.value||'customer';
  const el=G('rev-settle-list');
  const allSettlements=type==='customer'?(DB.settlements||[]):(DB.supSettlements||[]);
  const reversed=allSettlements.slice().reverse();
  if(!reversed.length){
    el.innerHTML='<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px"><i class="ti ti-check-circle" style="font-size:28px;display:block;margin-bottom:8px;color:var(--green)"></i>لا توجد تسويات ${type==="customer"?"للزبائن":"للموردين"}</div>';
    return;
  }
  el.innerHTML=reversed.map(s=>{
    const isCust=type==='customer';
    const name=isCust?s.custName:s.supName;
    const invoiceInfo=s.applied.map(a=>isCust?a.invNum:a.purNum).join(', ');
    return`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid var(--line);border-radius:var(--r);margin-bottom:6px;font-size:12px;transition:background .15s" onmouseover="this.style.background='var(--bg-elevated)'" onmouseout="this.style.background=''">
      <div style="display:flex;gap:12px;align-items:center;flex:1">
        <span style="font-weight:700;color:var(--amber);min-width:90px">${s.id}</span>
        <span style="min-width:100px">${name}</span>
        <span style="color:var(--red);font-weight:700;min-width:80px">${fmt(s.amount)} د.ل</span>
        <span style="color:var(--text-muted);flex-shrink:0">${s.applied.length} فاتورة: ${invoiceInfo}</span>
        <span style="color:var(--text-muted)">${s.date}</span>
      </div>
      <button class="btn btn-sm btn-danger" onclick="reverseSettlement('${type}','${s.id}')"><i class="ti ti-undo"></i> عكس</button>
    </div>`
  }).join('');
}

function reverseSettlement(type,settleId){
  const isCust=type==='customer';
  const arr=isCust?DB.settlements:DB.supSettlements;
  const idx=arr.findIndex(s=>s.id===settleId);
  if(idx===-1){toast('التسوية غير موجودة','error');return}
  const s=arr[idx];
  const name=isCust?s.custName:s.supName;
  if(!confirm(`هل تريد عكس التسوية ${s.id} — ${name} — ${fmt(s.amount)} د.ل؟\nسيُعيد المبلغ المُخصم إلى الفواتير.`))return;

  // Reverse each applied share
  s.applied.forEach(a=>{
    if(isCust){
      const inv=DB.invs.find(x=>x.id===a.invId);
      if(inv){
        inv.discount=Math.max(0,(inv.discount||0)-a.amount);
        inv.total+=a.amount;
        if(inv.settlements){
          inv.settlements=inv.settlements.filter(x=>!(Math.abs(x.amount-a.amount)<0.001&&x.reason===s.reason&&x.date===s.date));
        }
      }
    } else {
      const pur=DB.purs.find(x=>x.id===a.purId);
      if(pur){
        pur.discount=Math.max(0,(pur.discount||0)-a.amount);
        pur.total+=a.amount;
        if(pur.settlements){
          pur.settlements=pur.settlements.filter(x=>!(Math.abs(x.amount-a.amount)<0.001&&x.reason===s.reason&&x.date===s.date));
        }
      }
    }
  });

  arr.splice(idx,1);
  addLog(`عكس تسوية ${isCust?'زبون':'مورد'}`,`${s.id} — "${name}" — ${fmt(s.amount)} د.ل — أُعيدت ${s.applied.length} فاتورة`,'#f05454');
  saveState();
  loadReverseSettlements();
  if(isCust){renderSales();}else{renderPurs();renderSups();}
  updateStats();
  broadcastChange('settlements', { settleId, reversed: true });
  toast(`تم عكس التسوية ${s.id} ✓ — أُعيد ${fmt(s.amount)} د.ل`);
}

/* ═══ SETTLEMENTS LOG ═══ */
function renderSettleLog(){
  const search=(G('settle-log-search')?.value||'').trim().toLowerCase();
  const dateFrom=G('settle-log-from')?.value||'';
  const dateTo=G('settle-log-to')?.value||'';
  const typeFilter=G('settle-log-type')?.value||'';
  const tb=G('settle-log-tb');

  let customerSett=(DB.settlements||[]).map(s=>({...s,_type:'customer'}));
  let supplierSett=(DB.supSettlements||[]).map(s=>({...s,_type:'supplier'}));
  let all=[...customerSett,...supplierSett].sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id));

  if(typeFilter)all=all.filter(s=>s._type===typeFilter);
  if(dateFrom)all=all.filter(s=>s.date>=dateFrom);
  if(dateTo)all=all.filter(s=>s.date<=dateTo);
  if(search){
    all=all.filter(s=>{
      const name=s._type==='customer'?s.custName:s.supName;
      return normalizeText(s.id).includes(search)||normalizeText(name).includes(search)||normalizeText(s.reason).includes(search);
    });
  }

  if(!all.length){
    tb.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px"><i class="ti ti-folder-open" style="font-size:28px;display:block;margin-bottom:8px"></i>لا توجد تسويات</td></tr>`;
    return;
  }
  tb.innerHTML=all.map(s=>{
    const isCust=s._type==='customer';
    const name=isCust?s.custName:s.supName;
    const invoiceInfo=s.applied.map(a=>isCust?a.invNum:a.purNum).join(', ');
    const typeBadge=isCust?'<span class="badge b-accent">زبون</span>':'<span class="badge b-teal">مورد</span>';
    return`<tr>
      <td class="td-bold" style="color:var(--amber)">${s.id}</td>
      <td>${typeBadge}</td>
      <td>${name}</td>
      <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(s.amount)} د.ل</td>
      <td style="color:var(--text-muted);font-size:11px">${invoiceInfo}</td>
      <td style="color:var(--text-muted)">${s.reason||'—'}</td>
      <td class="td-mono">${s.date}</td>
      <td><button class="btn btn-sm btn-danger" onclick="reverseSettlement('${s._type}','${s.id}')"><i class="ti ti-undo"></i></button></td>
    </tr>`
  }).join('');
}
