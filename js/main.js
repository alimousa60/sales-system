/* ═══ DASHBOARD ═══ */
function updateStats(){
  const totalSales=DB.invs.reduce((s,x)=>s+x.total,0);
  const openBal=DB.custs.reduce((s,c)=>s+(parseFloat(c.openBal)||0),0);
  const collected=DB.payments.reduce((s,p)=>s+p.amount,0);
  const uncollected=totalSales + openBal - collected;
  const alerts=DB.items.filter(x=>x.qty<=x.reorder);
  const pendingDeliveries=DB.invs.filter(i=>i.dlvStatus!=='delivered').length;
  const overdueInvoices=DB.invs.filter(i=>invRemaining(i)>0.001 && i.dlvStatus==='delivered').length;
  G('ds-s').textContent=fmt(totalSales);
  G('ds-collected').textContent=fmt(collected);
  G('ds-recv').textContent=fmt(uncollected);
  G('ds-a').textContent=alerts.length;
  const ad=G('dash-alerts');
  ad.innerHTML=`<div class="insight-grid">
    <div class="insight-card blue"><span>فواتير معلقة</span><strong>${pendingDeliveries}</strong><small>في انتظار التسليم</small></div>
    <div class="insight-card amber"><span>ذمم مستحقة</span><strong>${overdueInvoices}</strong><small>فواتير غير مسددة</small></div>
    <div class="insight-card red"><span>تنبيهات مخزون</span><strong>${alerts.length}</strong><small>أصناف تحتاج تجديد</small></div>
  </div>
  ${alerts.slice(0,3).map(x=>`<div class="alert-strip"><i class="ti ti-alert-triangle"></i> الصنف "<strong>${x.name}</strong>" — الرصيد: ${x.qty} ${x.unit} (حد الأمان: ${x.reorder})</div>`).join('')}`;
  renderDash()
}
function renderDash(){
  const it=G('d-inv-tb');
  const recent=[...DB.invs].slice(-5).reverse();
  it.innerHTML=recent.length?recent.map(inv=>`<tr>
    <td style="color:var(--accent);font-weight:600">${inv.num}</td>
    <td>${inv.custName}</td>
    <td class="td-mono" style="font-weight:700">${fmt(inv.total)} د.ل</td>
    <td>${invPayStatus(inv)}</td>
  </tr>`).join(''):emptyRow(4,'لا فواتير');
  const lt=G('d-low-tb');
  const low=DB.items.filter(x=>x.qty<=x.reorder);
  lt.innerHTML=low.length?low.map(x=>{
    const shortage = x.reorder - x.qty;
    const shortageLabel = shortage > 0 ? `<span class="text-red">${fmt(shortage)}</span>` : `<span class="text-green">0</span>`;
    return `<tr>
      <td>${x.name}</td>
      <td class="td-mono" style="color:var(--amber);font-weight:700">${x.qty}</td>
      <td class="td-mono">${x.reorder}</td>
      <td class="td-mono">${shortageLabel}</td>
    </tr>`
  }).join(''):'<tr><td colspan="4"><div class="empty-st" style="padding:18px"><i class="ti ti-check"></i><span>كل الأصناف بمستويات جيدة</span></div></td></tr>';
  renderDashLog();
  setTimeout(renderDashCharts,50);
}

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
    toast('تم تثبيت التطبيق','success');
  } else {
    toast('تم إلغاء التثبيت','info');
  }
  deferredInstallPrompt=null;
  const btn=G('install-btn');
  if(btn) btn.style.display='none';
}
window.addEventListener('appinstalled', ()=>{toast('تم تثبيت التطبيق بنجاح','success')});
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
  renderItems();renderSales();renderPurs();renderSups();renderCusts();renderRets();renderAudit();updateStats();renderDash();
  G('clock').textContent=new Date().toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'});
}
initApp();
