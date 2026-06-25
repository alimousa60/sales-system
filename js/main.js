/* ═══ DASHBOARD ═══ */

function animateCounter(el, target, isFloat){
  const start=parseFloat(el.textContent.replace(/[^0-9.-]/g,''))||0;
  if(start===target){return}
  const dur=600;const st=performance.now();
  function tick(now){
    const p=Math.min((now-st)/dur,1);
    const ease=1-Math.pow(1-p,3);
    const v=start+(target-start)*ease;
    el.textContent=isFloat?v.toFixed(3):Math.round(v);
    if(p<1)requestAnimationFrame(tick);
  }
  el.classList.add('count-anim');
  requestAnimationFrame(tick);
}

function updateStats(){
  const totalSales=DB.invs.reduce((s,x)=>s+x.total,0);
  const openBal=DB.custs.reduce((s,c)=>s+(parseFloat(c.openBal)||0),0);
  const collected=DB.payments.reduce((s,p)=>s+p.amount,0);
  const uncollected=totalSales + openBal - collected;
  const alerts=DB.items.filter(x=>x.qty<=x.reorder);
  const pendingDeliveries=DB.invs.filter(i=>i.dlvStatus!=='delivered').length;
  const overdueInvoices=DB.invs.filter(i=>invRemaining(i)>0.001 && i.dlvStatus==='delivered').length;

  const elSales=G('ds-s'), elCol=G('ds-collected'), elRecv=G('ds-recv'), elA=G('ds-a');
  if(elSales)animateCounter(elSales,totalSales,true);
  if(elCol)animateCounter(elCol,collected,true);
  if(elRecv)animateCounter(elRecv,uncollected,true);
  if(elA)animateCounter(elA,alerts.length,false);

  const ad=G('dash-alerts');
  ad.innerHTML=`<div class="insight-grid">
    <div class="insight-card blue"><span>${t('dash_pending_invoices')}</span><strong>${pendingDeliveries}</strong><small>${t('dash_pending_delivery')}</small></div>
    <div class="insight-card amber"><span>${t('dash_due_receivables')}</span><strong>${overdueInvoices}</strong><small>${t('dash_unpaid_invoices')}</small></div>
    <div class="insight-card red"><span>${t('dash_stock_alerts')}</span><strong>${alerts.length}</strong><small>${t('dash_restock_items')}</small></div>
  </div>
  ${alerts.slice(0,3).map(x=>`<div class="alert-strip"><i class="ti ti-alert-triangle"></i> ${escapeHtml(x.name)} — ${x.qty} ${escapeHtml(x.unit)} (${x.reorder})</div>`).join('')}`;
  renderDash()
}

function renderDash(){
  const it=G('d-inv-tb');
  const cvInv=G('d-inv-cv');
  const recent=[...DB.invs].slice(-5).reverse();

  /* Table view */
  it.innerHTML=recent.length?recent.map(inv=>`<tr>
    <td style="color:var(--accent);font-weight:600">${escapeHtml(inv.num)}</td>
    <td>${escapeHtml(inv.custName)}</td>
    <td class="td-mono" style="font-weight:700">${fmt(inv.total)} ${t('currency_sym')}</td>
    <td>${invPayStatus(inv)}</td>
  </tr>`).join(''):emptyRow(4,t('dash_no_invoices'));

  /* Card view — mobile */
  if(cvInv){
    cvInv.innerHTML=recent.length?recent.map(inv=>{
      const payLabel=inv.payStatus==='paid'?'cv-green':inv.payStatus==='partial'?'cv-amber':'cv-blue';
      return `<div class="dash-cv-item ${payLabel}">
        <div class="dash-cv-header">
          <div class="dash-cv-title">${escapeHtml(inv.num)}</div>
          <div class="dash-cv-badge badge badge-${inv.payStatus==='paid'?'green':inv.payStatus==='partial'?'amber':'blue'}">${invPayStatus(inv)}</div>
        </div>
        <div class="dash-cv-body">
          <div class="dash-cv-field"><div class="dash-cv-field-label">${t('dash_col_customer')}</div><div class="dash-cv-field-value">${escapeHtml(inv.custName)}</div></div>
          <div class="dash-cv-field"><div class="dash-cv-field-label">${t('dash_col_total')}</div><div class="dash-cv-field-value mono">${fmt(inv.total)} ${t('currency_sym')}</div></div>
        </div>
      </div>`;
    }).join(''):`<div class="dash-cv-item"><div class="dash-cv-body"><div class="dash-cv-field"><div class="dash-cv-field-value" style="text-align:center;color:var(--text-muted)">${t('dash_no_invoices')}</div></div></div></div>`;
  }

  const lt=G('d-low-tb');
  const cvLow=G('d-low-cv');
  const low=DB.items.filter(x=>x.qty<=x.reorder);

  /* Table view */
  lt.innerHTML=low.length?low.map(x=>{
    const shortage = x.reorder - x.qty;
    const shortageLabel = shortage > 0 ? `<span class="text-red">${fmt(shortage)}</span>` : `<span class="text-green">0</span>`;
    return `<tr>
      <td>${escapeHtml(x.name)}</td>
      <td class="td-mono" style="color:var(--amber);font-weight:700">${x.qty}</td>
      <td class="td-mono">${x.reorder}</td>
      <td class="td-mono">${shortageLabel}</td>
    </tr>`
  }).join(''):`<tr><td colspan="4"><div class="empty-st" style="padding:18px"><i class="ti ti-check"></i><span>${t('dash_all_stock_ok')}</span></div></td></tr>`;

  /* Card view — mobile */
  if(cvLow){
    cvLow.innerHTML=low.length?low.map(x=>{
      const shortage=x.reorder-x.qty;
      const colorClass=shortage>0?'cv-red':'cv-green';
      return `<div class="dash-cv-item ${colorClass}">
        <div class="dash-cv-header">
          <div class="dash-cv-title">${escapeHtml(x.name)}</div>
          <div class="dash-cv-badge badge badge-${shortage>0?'red':'green'}">${shortage>0?t('dash_shortage'):t('dash_good')}</div>
        </div>
        <div class="dash-cv-body">
          <div class="dash-cv-field"><div class="dash-cv-field-label">${t('dash_balance')}</div><div class="dash-cv-field-value mono" style="color:var(--amber)">${x.qty} ${escapeHtml(x.unit)}</div></div>
          <div class="dash-cv-field"><div class="dash-cv-field-label">${t('dash_reorder')}</div><div class="dash-cv-field-value mono">${x.reorder}</div></div>
          <div class="dash-cv-field"><div class="dash-cv-field-label">${t('dash_shortage_label')}</div><div class="dash-cv-field-value mono" style="color:var(--red)">${shortage>0?shortage:'-'}</div></div>
        </div>
      </div>`;
    }).join(''):'<div class="dash-cv-item cv-green"><div class="dash-cv-body"><div class="dash-cv-field"><div class="dash-cv-field-value" style="text-align:center;color:var(--green)"><i class="ti ti-check"></i> '+t('dash_all_stock_ok_cv')+'</div></div></div></div>';
  }

  renderDashLog();
  setTimeout(renderDashCharts,50);
}

/* ═══ NAVIGATION — الانتقال السريع ═══ */
function navigateTo(page){
  const navItem=document.querySelector(`.nav-item[data-page="${page}"]`);
  if(navItem)navItem.click();
}

/* ═══ FAB — الزر العائم ═══ */
let fabOpen=false;
function toggleFab(){
  fabOpen=!fabOpen;
  const menu=G('fab-menu');
  const backdrop=G('fab-backdrop');
  const btn=G('fab-btn');
  if(menu)menu.classList.toggle('open',fabOpen);
  if(backdrop)backdrop.classList.toggle('on',fabOpen);
  if(btn)btn.style.transform=fabOpen?'rotate(45deg)':'rotate(0)';
  document.body.style.overflow=fabOpen?'hidden':'';
}

/* ═══ PULL TO REFRESH ═══ */
(function initPTR(){
  let startY=0,pulling=false,canPull=false;
  const ptr=G('ptr-indicator');
  if(!ptr)return;
  document.addEventListener('touchstart',e=>{
    const content=document.querySelector('.content');
    if(content&&content.scrollTop<=0){canPull=true;startY=e.touches[0].clientY}
  },{passive:true});
  document.addEventListener('touchmove',e=>{
    if(!canPull)return;
    const dy=e.touches[0].clientY-startY;
    if(dy>30&&dy<150){
      pulling=true;
      ptr.classList.add('on');
      ptr.querySelector('.ti').style.transform=`rotate(${dy*2}deg)`;
    }
  },{passive:true});
  document.addEventListener('touchend',()=>{
    if(pulling){
      ptr.classList.add('loading');
      setTimeout(()=>{
        updateStats();
        renderDash();
        ptr.classList.remove('loading','on');
        ptr.querySelector('.ti').style.transform='';
        toast(t('ptr_refreshed'),'success');
      },800);
    }
    pulling=false;canPull=false;
  });
})();

let deferredInstallPrompt=null;
window.addEventListener('beforeinstallprompt', e=>{
  e.preventDefault();
  deferredInstallPrompt=e;
  const btn=G('install-btn');
  if(btn) btn.style.display='inline-flex';
});
async function installApp(){
  if(!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const choice=await deferredInstallPrompt.userChoice;
  if(choice.outcome==='accepted'){
    toast(t('install_done'),'success');
  } else {
    toast(t('install_cancelled'),'info');
  }
  deferredInstallPrompt=null;
  const btn=G('install-btn');
  if(btn) btn.style.display='none';
}
window.addEventListener('appinstalled', ()=>{toast(t('install_success'),'success')});
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('service-worker.js')
      .then(()=>console.log('Service worker registered'))
      .catch(err=>console.warn('SW registration failed',err));
  });
}

/* ═══ NUMBER TO ARABIC ═══ */
function numToWords(n){
  n=Math.round(parseFloat(n||0)*1000)/1000;
  if(n===0)return'صفر دينار ليبي لا غير';
  const ones=['','واحد','اثنان','ثلاثة','أربعة','خمسة','ستة','سبعة','ثمانية','تسعة','عشرة','أحد عشر','اثنا عشر','ثلاثة عشر','أربعة عشر','خمسة عشر','ستة عشر','سبعة عشر','ثمانية عشر','تسعة عشر'];
  const tens=['','','عشرون','ثلاثون','أربعون','خمسون','ستون','سبعون','ثمانون','تسعون'];
  const int_=Math.floor(n);const dec=Math.round((n-int_)*1000);let res='';
  if(int_>=1000){const t=Math.floor(int_/1000);res+=(t===1?'ألف':(t<=10?ones[t]+' آلاف':ones[t]+' ألف'))+' '}
  const rem=int_%1000;if(rem>=100){res+=ones[Math.floor(rem/100)]+' مئة '}
  const last=rem%100;if(last>=20){res+=tens[Math.floor(last/10)];if(last%10)res+=' و'+ones[last%10]}
  else if(last>0)res+=ones[last];
  res+=' دينار ليبي';if(dec>0)res+=` و ${dec} درهم`;
  return'فقط '+res.trim()+' لا غير'
}

/* ═══ INIT ═══ */
async function initApp(){
  loadTheme();
  loadState();
  if(localStorage.getItem(AUTH_TOKEN_KEY)){
    await validateToken();
    await fetchUsersFromApi();
  }
  renderCurrentUser();
  renderCompany();
  if(!currentUser){
    showLogin();
  } else {
    hideLogin();
  }
  updateStats();renderDash();
  G('clock').textContent=new Date().toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'});
}
initApp();
