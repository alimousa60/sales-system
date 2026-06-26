/* ═══ PAGINATION ═══ */
const PAGE_SIZE = 15;
const _pg = {};

function getPageData(key, arr) {
  if (!_pg[key]) _pg[key] = 1;
  const page = _pg[key];
  const total = arr.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page > pages) _pg[key] = pages;
  const cur = Math.min(_pg[key], pages);
  const start = (cur - 1) * PAGE_SIZE;
  return { data: arr.slice(start, start + PAGE_SIZE), page: cur, pages, total, start };
}

function goToPage(key, p, renderFn) {
  _pg[key] = p;
  renderFn(currentSearch);
}

function renderPag(key, total, renderFn) {
  const el = G('pag-' + key);
  if (!el) return;
  const cur = _pg[key] || 1;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (pages <= 1) { el.innerHTML = ''; return; }
  let html = '<div class="pag-inner">';
  html += `<button class="pag-btn" onclick="goToPage('${key}',${cur-1},${renderFn.name})" ${cur<=1?'disabled':''}>&#9654;</button>`;
  for (let i = 1; i <= pages; i++) {
    if (pages > 7 && i > 2 && i < pages - 1 && Math.abs(i - cur) > 1) {
      if (i === 3 || i === pages - 2) html += '<span class="pag-dots">…</span>';
      continue;
    }
    html += `<button class="pag-btn ${i===cur?'pag-active':''}" onclick="goToPage('${key}',${i},${renderFn.name})">${i}</button>`;
  }
  html += `<button class="pag-btn" onclick="goToPage('${key}',${cur+1},${renderFn.name})" ${cur>=pages?'disabled':''}>&#9664;</button>`;
  html += `<span class="pag-info">${total} إجمالي</span>`;
  html += '</div>';
  el.innerHTML = html;
}

/* ═══ TOAST & LOG ═══ */
function _legacyToast(msg,type='success'){
  const t=G('toast');if(!t)return;
  const icon=type==='success'?'ti-check':type==='error'?'ti-alert-triangle':'ti-info-circle';
  t.innerHTML=`<i class="ti ${icon}"></i> ${escapeHtml(msg)}`;
  t.className=`toast on ${type}`;
  setTimeout(()=>t.classList.remove('on'),3400)
}
function addLog(action,detail,color='#4f8ef7'){
  const n=new Date();
  DB.log.unshift({time:n.toLocaleTimeString('ar'),date:n.toLocaleDateString('ar'),action,detail,color,user:currentUser?.name||'مدير النظام'});
  renderAudit();renderDashLog();saveState()
}

/* ═══ HELPERS ═══ */
function selPay(gid,el,m){
  document.querySelectorAll(`#${gid} .pay-chip`).forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  if(gid==='col-pay'){
    _colPay=m;G('col-check-row').style.display=m==='check'?'flex':'none'
  }
  else if(gid==='col2-pay'){
    _col2Pay=m;G('col2-check-row').style.display=m==='check'?'flex':'none'
  }
  else if(gid==='sp-pay'){
    _spPay=m;const r=G('sp-check-row');if(r)r.style.display=m==='check'?'flex':'none'
  }
  else if(gid==='re-qc') _reQC=m;
}
function payLbl(m){
  const map={cash:`<span class="badge b-green">${t('pay_cash')}</span>`,check:`<span class="badge b-blue">${t('pay_check')}</span>`,credit:`<span class="badge b-amber">${t('pay_credit')}</span>`,transfer:`<span class="badge b-cyan">${t('pay_transfer')}</span>`};
  return map[m]||`<span class="badge b-gray">${m}</span>`
}
function popSel(id,arr,vk,lk,def='-- اختر --'){
  const s=G(id);if(!s)return;
  s.innerHTML=`<option value="">${def}</option>`;
  arr.forEach(x=>s.innerHTML+=`<option value="${x[vk]}">${x[lk]}</option>`)
}
function companyById(id){return DB.companies?.find(c=>c.id===Number(id))||DB.companies?.[0]||baseCompany()}
function currentCompany(){return companyById(DB.companyId)}
function renderCompany(){const co=currentCompany();const el=G('company-name');if(el)el.textContent=co.name}
function saveCompany(){
  const name=G('co-name').value.trim();
  if(!name){toast(t('company_name_ph'),'error');return}
  const address=G('co-address').value.trim();
  const phone=G('co-phone').value.trim();
  const note=G('co-note').value.trim();
  const taxNo=G('co-tax-no')?.value?.trim()||'';
  const logo=window._pendingLogo||'';
  if(editingCompanyId===null){
    const id=Date.now();
    const company={...baseCompany(),id,name,address,phone,note,taxNo,logo};
    DB.companies.push(company);
    DB.companyId=id;
    addLog('إضافة شركة',`"${name}"`,'#2dd17e');
    loadCompanyData();
  } else {
    const company=companyById(editingCompanyId);
    if(company){
      Object.assign(company,{name,address,phone,note,taxNo,logo});
      addLog('تحديث بيانات الشركة',`"${name}"`,'#9b72f7');
      if(company.id===DB.companyId) loadCompanyData();
    }
  }
  window._pendingLogo=null;
  saveState();
  closeModal('m-company');
  renderCompany();
  renderSettings();
  broadcastChange('company', { name });
  toast(t('company_saved'));
}

/* Company Logo helpers */
let _logoDataUrl='';
function handleCompanyLogo(input){
  const file=input.files[0];
  if(!file)return;
  if(file.size>512000){toast(t('company_logo_too_big'),'error');return}
  const reader=new FileReader();
  reader.onload=function(e){
    _logoDataUrl=e.target.result;
    window._pendingLogo=_logoDataUrl;
    const preview=G('co-logo-preview');
    if(preview) preview.innerHTML='<img src="'+_logoDataUrl+'" style="width:100%;height:100%;object-fit:contain">';
  };
  reader.readAsDataURL(file);
}
function removeCompanyLogo(){
  _logoDataUrl='';
  window._pendingLogo='';
  const preview=G('co-logo-preview');
  if(preview) preview.innerHTML='<i class="ti ti-photo" style="font-size:24px;color:var(--text-muted)"></i>';
  const input=G('co-logo-input');
  if(input) input.value='';
}
function loadCompanyLogo(){
  const co=currentCompany();
  if(co&&co.logo){
    _logoDataUrl=co.logo;
    const preview=G('co-logo-preview');
    if(preview) preview.innerHTML='<img src="'+co.logo+'" style="width:100%;height:100%;object-fit:contain">';
  }
}
function updateSOASelector(){const type=G('soa-type').value;const label=type==='supplier'?t('soa_choose_supplier'):t('soa_choose_customer');const placeholder=`-- ${type==='supplier'?t('nav_suppliers'):t('nav_customers')} --`;if(G('soa-cust-label'))G('soa-cust-label').textContent=label;popSel('soa-cust',type==='supplier'?DB.sups:DB.custs,'id','name',placeholder);renderSOA()}

/* Invoice paid amount */
function invPaid(inv){
  return DB.payments.filter(p=>p.invId===inv.id).reduce((s,p)=>s+p.amount,0)
}
function invRemaining(inv){return Math.max(0,inv.total-invPaid(inv))}
function invPayStatus(inv){
  const paid=invPaid(inv);
  if(paid<=0)return`<span class="badge b-red">${t('inv_unpaid')}</span>`;
  if(paid>=inv.total-0.001)return`<span class="badge b-green">${t('inv_paid_full')}</span>`;
  return`<span class="badge b-amber">${t('inv_paid_partial')}</span>`
}
function invDlvLabel(s){
  const map={pending:`<span class="badge b-gray">${t('inv_undelivered')}</span>`,delivered:`<span class="badge b-teal">${t('inv_delivered')}</span>`};
  return map[s]||map.pending
}

/* Purchase paid */
function purPaid(pur){return DB.supPayments.filter(p=>p.purId===pur.id).reduce((s,p)=>s+p.amount,0)}
function purRemaining(pur){return Math.max(0,pur.total-purPaid(pur))}
function purPayStatus(pur){
  const paid=purPaid(pur);
  if(paid<=0)return`<span class="badge b-red">${t('pur_unpaid')}</span>`;
  if(paid>=pur.total-0.001)return`<span class="badge b-green">${t('pur_paid')}</span>`;
  return`<span class="badge b-amber">${t('pur_partial')}</span>`
}

/* Supplier balance */
function supBalance(sup){
  const purchased=DB.purs.filter(p=>p.supId===sup.id).reduce((s,p)=>s+p.total,0);
  const paid=DB.supPayments.filter(p=>p.supId===sup.id).reduce((s,p)=>s+p.amount,0);
  return purchased-paid
}
/* Customer balance (receivable) */
function custReceivable(cust){
  const sold=DB.invs.filter(i=>i.custId===cust.id).reduce((s,i)=>s+i.total,0);
  const collected=DB.payments.filter(p=>p.custId===cust.id).reduce((s,p)=>s+p.amount,0);
  const openBal=parseFloat(cust.openBal)||0;
  return sold + openBal - collected;
}

/* ═══ NAVIGATION ═══ */
const PAGE_META={
  dash:{t:()=>t('page_dash'),i:'ti-layout-dashboard'},
  inventory:{t:()=>t('page_inventory'),i:'ti-package'},
  sales:{t:()=>t('page_sales'),i:'ti-receipt'},
  returns:{t:()=>t('page_returns'),i:'ti-receipt-refund'},
  purchases:{t:()=>t('page_purchases'),i:'ti-truck'},
  suppay:{t:()=>t('page_suppay'),i:'ti-wallet'},
  customers:{t:()=>t('page_customers'),i:'ti-user-circle'},
  suppliers:{t:()=>t('page_suppliers'),i:'ti-users'},
  soa:{t:()=>t('page_soa'),i:'ti-file-description'},
  finance:{t:()=>t('page_finance'),i:'ti-cash'},
  pl:{t:()=>t('page_pl'),i:'ti-chart-bar'},
  users:{t:()=>t('page_users'),i:'ti-users-pin'},
  companies:{t:()=>t('page_companies'),i:'ti-building'},
  audit:{t:()=>t('page_audit'),i:'ti-shield-check'},
  hrm:{t:()=>t('page_hrm'),i:'ti-users-group'},
  settings:{t:'الإعدادات',i:'ti-settings'}
};

function showPage(pg){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.page===pg));
  document.querySelectorAll('.page').forEach(p=>{p.classList.remove('on');p.classList.add('exiting')});
  const page=G('p-'+pg);
  if(!page) return;
  page.classList.remove('exiting');
  page.classList.add('on');
  /* Show skeleton while loading */
  const content=page.querySelector('.card:not(.no-skeleton),.stats-grid:not(.no-skeleton),.tbl-wrap:not(.no-skeleton)');
  if(content&&!content.classList.contains('no-skeleton')){
    content._origHTML=content.innerHTML;
    content.innerHTML='<div class="skeleton-card" style="margin-bottom:12px"><div class="skeleton-line w-75 h-lg"></div><div class="skeleton-line w-50 h-xl" style="margin-top:8px"></div><div class="skeleton-line w-full"></div><div class="skeleton-line w-full"></div><div class="skeleton-line w-75"></div></div>';
    content.classList.add('skeleton-active');
  }
  const m=PAGE_META[pg]||{t:()=>pg,i:'ti-circle'};
  G('pg-title').innerHTML=`<i class="ti ${m.i}"></i> ${typeof m.t==='function'?m.t():m.t}`;
  closeSidebarIfMobile();
  updateSearchHint();
  const pageKeyMap={inventory:'inv-tb',sales:'sal-tb',purchases:'pur-tb',customers:'cust-tb',suppliers:'sup-tb',returns:'ret-tb',users:'user-tb',suppay:'suppay-tb'};
  if (pageKeyMap[pg]) _pg[pageKeyMap[pg]] = 1;
  /* Defer render to next frame for skeleton visibility */
  requestAnimationFrame(()=>{
    if(pg==='dash')renderDash();
    if(pg==='audit')renderAudit();
    if(pg==='finance')renderFin();
    if(pg==='pl')renderPL();
    if(pg==='users')renderUsers(currentSearch);
    if(pg==='settings')renderSettings();
    if(pg==='soa'){updateSOASelector();G('soa-out').innerHTML=''}
    if(pg==='suppay')renderSupPays(currentSearch);
    if(pg==='suppliers')renderSups(currentSearch);
    if(pg==='customers')renderCusts(currentSearch);
    if(pg==='returns')renderRets(currentSearch);
    if(pg==='sales')renderSales(currentSearch);
    if(pg==='purchases')renderPurs(currentSearch);
    if(pg==='inventory')renderItems(currentSearch);
    if(pg==='hrm'){
      renderHRM();
      loadHRMEmployeeDropdown('hrm-att-emp');
      loadHRMEmployeeDropdown('hrm-adv-emp');
    }
    /* Restore original content */
    requestAnimationFrame(()=>{
      if(content&&content._origHTML){
        content.innerHTML=content._origHTML;
        delete content._origHTML;
        content.classList.remove('skeleton-active');
      }
    });
    /* Wire keyboard nav */
    const tbls=page.querySelectorAll('table');
    tbls.forEach(tbl=>{if(!tbl._navWired){tbl.setAttribute('tabindex','0');tbl._navWired=true}});
    if(typeof initTooltips==='function')initTooltips();
    page.scrollIntoView({behavior:'smooth',block:'start'});
  });
}

document.querySelectorAll('.nav-item').forEach(el=>{
  el.addEventListener('click',()=>{ showPage(el.dataset.page) })
});

G('global-search')?.addEventListener('input', e=>applyQuickSearch(e.target.value));
G('clear-search')?.addEventListener('click', ()=>{
  currentSearch='';
  applyQuickSearch('');
});

setInterval(()=>{const c=G('clock');if(c)c.textContent=new Date().toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'})},1000);

/* ═══ MODALS ═══ */
/* ═══ MODAL STACK — professional layered modals ═══ */
let _modalStack=[];
let _modalReturnTo=null; // {id, restoreFn} — reopen this modal after child closes

function _initModalFields(id){
  if(id==='m-invoice'){
    G('si-num').value='INV-'+String(DB.cI).padStart(5,'0');
    G('si-date').value=today();
    popSel('si-cust',DB.custs,'id','name','-- اختر زبون --');
    popSel('si-item-sel',DB.items,'id','name','-- اختر صنف --');
    if(G('si-item-search'))G('si-item-search').value='';
    _siL=[];renderSiL();
    G('si-price').value='';G('si-qty').value='1';G('si-disc').value='0';G('si-ltot').value='';
  }
  if(id==='m-pur'){
    G('pi-num').value='PUR-'+String(DB.cP).padStart(5,'0');
    G('pi-date').value=today();
    popSel('pi-sup',DB.sups,'id','name','-- اختر مورد --');
    popSel('pi-item-sel',DB.items,'id','name','-- اختر صنف --');
    if(G('pi-item-search'))G('pi-item-search').value='';
    _piL=[];renderPiL();
    G('pi-price').value='';G('pi-qty').value='1';G('pi-ltot').value='';
    G('pi-recv').checked=false;
  }
  if(id==='m-suppay'){
    G('sp-date').value=today();G('sp-amt').value='';G('sp-notes').value='';
    popSel('sp-sup',DB.sups,'id','name','-- اختر مورد --');
    popSel('sp-pur',DB.purs,'num','num','غير مرتبط بفاتورة');
    document.querySelectorAll('#sp-pay .pay-chip').forEach((c,i)=>c.classList.toggle('sel',i===0));
    _spPay='cash';
  }
  if(id==='m-cust'){['cu-name','cu-phone','cu-addr'].forEach(x=>G(x).value='');G('cu-bal').value='0'}
  if(id==='m-sup'){['su-name','su-phone','su-addr'].forEach(x=>G(x).value='')}
  if(id==='m-item'){G('fi-code').value='ITM'+String(DB.items.length+1).padStart(3,'0');['fi-name','fi-buy','fi-sell','fi-qty','fi-reorder','fi-unit','fi-cat'].forEach(x=>G(x).value='');G('fi-barcode').value=genUniqueBarcode()}
  if(id==='m-return'){
    G('re-date').value=today();
    const delivered=DB.invs.filter(i=>i.dlvStatus==='delivered');
    popSel('re-inv',delivered,'num','num','اختر فاتورة');
    G('re-amt').value='';G('re-reason').value='';
    document.querySelectorAll('#re-qc .pay-chip').forEach((c,i)=>c.classList.toggle('sel',i===0));
    _reQC='pending';
  }
  if(id==='m-user'){
    if(!requireAdmin())return;
    G('uu-username').value='';G('uu-pass').value='';G('uu-name').value='';G('uu-role').value='sales';
  }
}

/* Which modals are "children" — when opened, their parent closes first, then reopens on child close */
const _childParentMap={
  'm-item':'m-pur',
  'm-cust':'m-pur',
  'm-sup':'m-pur'
};

function openModal(id){
  if(!requireAuth())return;
  const parentId = _childParentMap[id];
  const isChild = !!parentId;

  // If opening a child modal, close parent first and save return info
  if(isChild && _modalStack.includes(parentId)){
    _modalReturnTo={id:parentId};
    const parentEl=G(parentId);
    parentEl.classList.remove('on');
    _modalStack=_modalStack.filter(x=>x!==parentId);
  }

  _initModalFields(id);
  const el=G(id);
  document.body.appendChild(el);
  el.classList.add('on');
  _modalStack.push(id);
  /* Focus trap */
  if(typeof trapFocus==='function')trapFocus(el);
}

function closeModal(id){
  const el=G(id);
  el.classList.remove('on');
  _modalStack=_modalStack.filter(x=>x!==id);

  // If this was a child modal and parent expects return, reopen parent
  if(_modalReturnTo && _modalReturnTo.id){
    const returnId=_modalReturnTo.id;
    _modalReturnTo=null;
    // Reopen parent without triggering child logic again
    const parentEl=G(returnId);
    _initModalFields(returnId);
    document.body.appendChild(parentEl);
    parentEl.classList.add('on');
    _modalStack.push(returnId);
  }
}

/* ═══ UTILITY FUNCTIONS ═══ */
function debounce(fn,ms=300){
  let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms)}
}

/* ═══ KEYBOARD SHORTCUTS ═══ */
(function(){
  const PAGES=['dash','inventory','sales','returns','purchases','suppay','customers','suppliers','soa','finance','pl','users','companies','audit','hrm','settings'];
  const NEW_MODALS={inventory:'m-item',sales:'m-invoice',purchases:'m-pur',customers:'m-cust',suppliers:'m-sup',users:'m-user',hrm:'m-hrm'};
  function isInput(){const t=document.activeElement;return t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT')}
  function openHelp(){openModal('m-help')}
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      if(_modalStack.length>0){
        closeModal(_modalStack[_modalStack.length-1]);
      } else {
        const m=document.querySelector('.modal-backdrop.on');
        if(m) closeModal(m.id);
      }
      e.preventDefault();
      return;
    }
    if(e.ctrlKey&&e.key==='k'){e.preventDefault();G('global-search')?.focus();return}
    if(e.ctrlKey&&e.key==='n'){
      if(isInput())return;
      const pg=getCurrentPageName();
      const m=NEW_MODALS[pg];
      if(m){e.preventDefault();openModal(m)}
      return;
    }
    if(e.ctrlKey&&/^[0-9]$/.test(e.key)){
      if(isInput())return;
      e.preventDefault();
      const idx=parseInt(e.key);
      const page=idx===0?PAGES[PAGES.length-1]:PAGES[idx-1];
      if(page)showPage(page);
      return;
    }
    if(e.key==='?'&&!isInput()){
      const m=G('m-help');
      if(m&&m.classList.contains('on'))closeModal('m-help');
      else openHelp();
      return;
    }
  });
})();
