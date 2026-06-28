/* ═══ EXPENSE TRACKING ═══ */
const EXP_CATS={rent:'إيجار',utilities:'مرافق',salaries:'رواتب',supplies:'لوازم',marketing:'تسويق',transport:'نقل',maintenance:'صيانة',insurance:'تأمين',taxes:'ضرائب',office:'مكتبية',travel:'سفر',other:'أخرى'};
const EXP_PAY={cash:'نقداً',check:'صك',bank_transfer:'تحويل بنكي',card:'بطاقة'};
const EXP_STATUSES={pending:'قيد المراجعة',approved:'معتمد',rejected:'مرفوض'};
let _expEditingId=null;

function openExpenseModal(id){
  _expEditingId=id||null;
  const title=G('m-exp-title');
  if(title) title.textContent=id?'تعديل المصروف':'مصروف جديد';
  if(id){
    apiFetch('/api/v1/expenses').then(r=>r.json()).then(d=>{
      const exp=d.expenses?.find(e=>e._id===id);
      if(exp){
        G('exp-category').value=exp.category;
        G('exp-amount').value=exp.amount;
        G('exp-desc').value=exp.description;
        G('exp-date').value=exp.date;
        G('exp-payment').value=exp.paymentMethod;
        G('exp-notes').value=exp.notes||'';
      }
    });
  }else{
    G('exp-category').value='other';
    G('exp-amount').value='';
    G('exp-desc').value='';
    G('exp-date').value=new Date().toISOString().slice(0,10);
    G('exp-payment').value='cash';
    G('exp-notes').value='';
  }
  openModal('m-expense');
}

async function saveExpense(){
  const btn=G('m-expense')?.querySelector('.btn-primary')||document.querySelector('[onclick*="saveExpense"]')?.closest('.btn-primary');setBtnLoading(btn,true);
  try{
    const data={
      category:G('exp-category').value,
      amount:parseFloat(G('exp-amount').value),
      description:G('exp-desc').value.trim(),
      date:G('exp-date').value,
      paymentMethod:G('exp-payment').value,
      notes:G('exp-notes').value.trim()
    };
    if(!data.description){toast(t('pay_enter_amount'),'error');return}
    if(!data.amount||data.amount<=0){toast(t('pay_enter_amount'),'error');return}
    try{
      if(_expEditingId){
        await apiFetch('/api/v1/expenses/'+_expEditingId,{method:'PATCH',body:JSON.stringify(data)});
      }else{
        await apiFetch('/api/v1/expenses',{method:'POST',body:JSON.stringify(data)});
      }
      closeModal('m-expense');
      renderExpenses();
      toast(_expEditingId?'تم تحديث المصروف':'تم إضافة المصروف','success');
    }catch(e){toast(e.message,'error')}
  }finally{
    if(btn)setBtnLoading(btn,false);
  }
}

function apiFetch(url,opts={}){
  const token=localStorage.getItem('salesSystemAuthToken')||'';
  return fetch(url,{...opts,headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json',...(opts.headers||{})}});
}

async function renderExpenses(){
  const catFilter=G('exp-cat-filter')?.value||'';
  const from=G('exp-date-from')?.value||'';
  const to=G('exp-date-to')?.value||'';
  let url='/api/v1/expenses?limit=100';
  if(catFilter)url+='&category='+catFilter;
  if(from)url+='&from='+from;
  if(to)url+='&to='+to;
  try{
    const res=await apiFetch(url);
    const d=await res.json();
    const exps=d.expenses||[];
    const tb=G('exp-tb');
    if(!tb)return;
    if(!exps.length){tb.innerHTML=emptyRow(7,'لا توجد مصروفات');renderPag('exp-tb',0,renderExpenses);return}
    tb.innerHTML=exps.map(e=>{
      const catLabel=EXP_CATS[e.category]||e.category;
      const catColors={rent:'blue',utilities:'cyan',salaries:'purple',supplies:'amber',marketing:'green',transport:'teal',maintenance:'amber',insurance:'blue',taxes:'red',office:'gray',travel:'cyan',other:'gray'};
      const cc=catColors[e.category]||'gray';
      const payLabel=EXP_PAY[e.paymentMethod]||e.paymentMethod;
      const stLabel=EXP_STATUSES[e.status]||e.status;
      const stClass=e.status==='approved'?'b-green':e.status==='rejected'?'b-red':'b-amber';
      return`<tr>
        <td class="td-mono" style="font-size:11px">${e.date}</td>
        <td><span class="badge b-${cc}">${catLabel}</span></td>
        <td style="font-weight:600">${escapeHtml(e.description)}</td>
        <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(e.amount)} ${t('currency_sym')}</td>
        <td style="font-size:11px;color:var(--text-muted)">${payLabel}</td>
        <td><span class="badge ${stClass}">${stLabel}</span></td>
        <td><div class="td-actions">
          <button class="btn btn-sm btn-icon" onclick="openExpenseModal('${e._id}')" title="تعديل"><i class="ti ti-pencil"></i></button>
          <button class="btn btn-sm btn-danger btn-icon" onclick="deleteExpense('${e._id}')" title="حذف"><i class="ti ti-trash"></i></button>
        </div></td>
      </tr>`;
    }).join('');
    renderPag('exp-tb',exps.length,renderExpenses);
    renderExpStats(d.summary||[],d.total||0,d.count||0);
  }catch(e){console.error(e)}
}

async function deleteExpense(id){
  const ok=await confirmDanger('حذف هذا المصروف؟');if(!ok)return;
  try{
    await apiFetch('/api/v1/expenses/'+id,{method:'DELETE'});
    renderExpenses();
    toast('تم حذف المصروف','success');
  }catch(e){toast(e.message,'error')}
}

function renderExpStats(summary,total,count){
  const el=G('exp-stats');
  if(!el)return;
  const catIcons={rent:'ti ti-home',utilities:'ti ti-bolt',salaries:'ti ti-users',supplies:'ti ti-package',marketing:'ti ti-speakerphone',transport:'ti ti-truck',maintenance:'ti ti-tools',insurance:'ti ti-shield',taxes:'ti ti-file-invoice',office:'ti ti-building',travel:'ti ti-plane',other:'ti ti-dots'};
  el.innerHTML=`
    <div class="stat-card red"><div class="stat-lbl">إجمالي المصروفات</div><div class="stat-val">${fmt(total)}</div><div class="stat-sub">${count} مصروف</div></div>
    ${summary.slice(0,3).map(s=>`<div class="stat-card blue"><div class="stat-lbl">${EXP_CATS[s._id]||s._id}</div><div class="stat-val">${fmt(s.total)}</div><div class="stat-sub">${s.count} مصروف</div></div>`).join('')}
  `;
}

function exportExpenses(){
  toast('جاري التصدير...','info');
  apiFetch('/api/v1/expenses').then(r=>r.json()).then(d=>{
    const exps=d.expenses||[];
    const headers=['التاريخ','الفئة','البيان','المبلغ','طريقة الدفع','ملاحظات'];
    const rows=exps.map(e=>[e.date,EXP_CATS[e.category]||e.category,e.description,fmt(e.amount),EXP_PAY[e.paymentMethod]||e.paymentMethod,e.notes||'']);
    _exportTable(headers,rows,'المصروفات','expenses');
  });
}
