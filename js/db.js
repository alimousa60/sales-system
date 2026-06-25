/* ═══════════════════════════════════════════════
   DATABASE
═══════════════════════════════════════════════ */
const STORAGE_KEY='salesSystemDB';
const SESSION_KEY='salesSystemSession';
const AUTH_TOKEN_KEY='salesSystemAuthToken';
const AUTH_USER_KEY='salesSystemAuthUser';
const API_BASE_URL=(window.location.port === '3000' || window.location.port === '' || window.location.port === '443' || window.location.port === '80')
  ? `${window.location.origin}/api/v1`
  : `${window.location.protocol}//${window.location.hostname}:3000/api/v1`;
const CLOUD_STORAGE_KEY='salesSystemCloud';
const CLOUD_ENDPOINT=''; // ضع رابط API السحابة هنا إذا كان متاحاً
const DB={
  users:[],
  stores:{},
  items:[],custs:[],sups:[],
  invs:[],          // sales invoices
  purs:[],          // purchase invoices
  payments:[],      // customer payments (affect cash + SOA)
  supPayments:[],   // supplier payments (affect cash outflow)
  settlements:[],       // customer invoice settlements/discounts
  supSettlements:[],    // supplier invoice settlements/discounts
  rets:[],
  log:[],
  cI:1,cP:1,cRet:1,cPay:1,cSpay:1,cSettle:1,cSupSettle:1
};

let currentUser=null;
let editingCompanyId=null;
// payment methods state
let _siL=[],_piL=[],_colPay='cash',_spPay='cash',_reQC='pending';

const G=id=>document.getElementById(id);
const fmt=(n,d=2)=>parseFloat(n||0).toFixed(d);
const today=()=>new Date().toISOString().split('T')[0];
const THEME_KEY='salesSystemTheme';
let currentSearch='';

function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function normalizeText(value){
  return String(value||'').toLowerCase().trim();
}

function baseCompany(){
  return {id:1,name:'المؤسسة التجارية',address:'طرابلس، ليبيا',phone:'',note:'',logo:'',taxNo:'',items:[],custs:[],sups:[],invs:[],purs:[],payments:[],supPayments:[],rets:[],log:[],pendingSync:[],lastSynced:null,cI:1,cP:1,cRet:1,cPay:1,cSpay:1,cSettle:1,cSupSettle:1};
}
function defaultStore(){
  return {companies:[baseCompany()],companyId:1};
}
function normalizeStore(store){
  const normalized={...store};
  if(!Array.isArray(normalized.companies)){
    const legacyCompany=normalized.company||{name:'المؤسسة التجارية',address:'طرابلس، ليبيا',phone:'',note:''};
    const firstCompany=baseCompany();
    Object.assign(firstCompany,legacyCompany,{items:normalized.items||[],custs:normalized.custs||[],sups:normalized.sups||[],invs:normalized.invs||[],purs:normalized.purs||[],payments:normalized.payments||[],supPayments:normalized.supPayments||[],rets:normalized.rets||[],log:normalized.log||[],pendingSync:normalized.pendingSync||[],lastSynced:normalized.lastSynced||null,cI:normalized.cI||1,cP:normalized.cP||1,cRet:normalized.cRet||1,cPay:normalized.cPay||1,cSpay:normalized.cSpay||1});
    normalized.companies=[firstCompany];
    normalized.companyId=normalized.companyId||firstCompany.id;
  } else {
    normalized.companyId=normalized.companyId||normalized.companies[0]?.id||1;
    normalized.companies=normalized.companies.map(c=>({
      ...baseCompany(),
      ...c,
      id:c.id||Date.now(),
      items:c.items||[],custs:c.custs||[],sups:c.sups||[],invs:c.invs||[],purs:c.purs||[],payments:c.payments||[],supPayments:c.supPayments||[],rets:c.rets||[],log:c.log||[],pendingSync:c.pendingSync||[],lastSynced:c.lastSynced||null,
      cI:c.cI||1,cP:c.cP||1,cRet:c.cRet||1,cPay:c.cPay||1,cSpay:c.cSpay||1,cSettle:c.cSettle||1,cSupSettle:c.cSupSettle||1
    }));
  }
  return normalized;
}
function currentCompanyStore(){
  return DB.companies?.find(c=>c.id===DB.companyId) || DB.companies?.[0] || baseCompany();
}
function companyLogoHtml(company,height){
  height=height||50;
  if(!company||!company.logo)return'';
  return '<img src="'+escapeHtml(company.logo)+'" style="height:'+height+'px;max-width:'+(height*3)+'px;object-fit:contain;border-radius:6px">';
}
function genUniqueBarcode(){
  const used=new Set(DB.items.map(x=>x.barcode).filter(Boolean));
  let num;
  do{num=String(Math.floor(1000000000+Math.random()*9000000000))}while(used.has(num));
  return num;
}
function loadCompanyData(){
  const company=currentCompanyStore();
  Object.assign(DB,{items:company.items,custs:company.custs,sups:company.sups,invs:company.invs,purs:company.purs,payments:company.payments,supPayments:company.supPayments,rets:company.rets,log:company.log,pendingSync:company.pendingSync,lastSynced:company.lastSynced,cI:company.cI,cP:company.cP,cRet:company.cRet,cPay:company.cPay,cSpay:company.cSpay});
}
function saveCompanyData(){
  const company=currentCompanyStore();
  if(!company) return;
  Object.assign(company,{items:DB.items,custs:DB.custs,sups:DB.sups,invs:DB.invs,purs:DB.purs,payments:DB.payments,supPayments:DB.supPayments,rets:DB.rets,log:DB.log,pendingSync:DB.pendingSync,lastSynced:DB.lastSynced,cI:DB.cI,cP:DB.cP,cRet:DB.cRet,cPay:DB.cPay,cSpay:DB.cSpay});
}
function getAuthHeaders(){
  const token=localStorage.getItem(AUTH_TOKEN_KEY);
  return token?{Authorization:`Bearer ${token}`}:{};
}
async function authenticatedFetch(url,options={}){
  const headers={...getAuthHeaders(),'Content-Type':'application/json',...(options.headers||{})};
  const resp=await fetch(url.startsWith('http')?url:`${API_BASE_URL.replace('/api/v1','')}${url}`,{...options,headers});
  if(!resp.ok){const err=await resp.json().catch(()=>({message:resp.statusText}));throw new Error(err.message||resp.statusText);}
  return resp;
}
function setAuthSession(token,user){
  localStorage.setItem(AUTH_TOKEN_KEY,token);
  localStorage.setItem(AUTH_USER_KEY,JSON.stringify(user));
  currentUser=user;
}
function clearAuthSession(){
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(SESSION_KEY);
  currentUser=null;
}
async function validateToken(){
  const token=localStorage.getItem(AUTH_TOKEN_KEY);
  if(!token) return false;
  if(!navigator.onLine) return true;
  try{
    const resp=await fetch(`${API_BASE_URL}/auth/profile`,{headers:{...getAuthHeaders(),'Content-Type':'application/json'}});
    if(!resp.ok){ clearAuthSession(); return false; }
    const profile=await resp.json();
    currentUser=profile;
    localStorage.setItem(AUTH_USER_KEY,JSON.stringify(profile));
    return true;
  }catch(e){
    console.warn('validateToken failed',e);
    return false;
  }
}
function loadStore(username){
  const store=DB.stores?.[username]||defaultStore();
  const normalized=normalizeStore(store);
  Object.assign(DB,defaultStore(),{companies:normalized.companies,companyId:normalized.companyId});
  loadCompanyData();
}
function loadCloudSnapshot(){
  if(!CLOUD_ENDPOINT) return null;
  try{ return JSON.parse(localStorage.getItem(CLOUD_STORAGE_KEY)) || null }catch(e){return null}
}
function saveCloudSnapshot(snapshot){
  if(!CLOUD_ENDPOINT) return false;
  try{ localStorage.setItem(CLOUD_STORAGE_KEY,JSON.stringify(snapshot)); return true }catch(e){return false}
}
function cloudOnline(){
  return navigator.onLine;
}
function syncStatusMsg(){
  const status=G('sync-status');
  if(!status) return;
  if(!cloudOnline()){ status.style.display='inline-block'; status.textContent=t('sync_not_connected'); status.style.color='var(--red)'; return; }
  status.style.display='inline-block';
  status.textContent=DB.lastSynced?`${t('sync_ready')} ${DB.lastSynced}`:t('sync_ready');
  status.style.color='var(--green)';
}
function showSyncButton(){
  const btn=G('sync-btn'); if(btn) btn.style.display='inline-flex';
}
function hideSyncButton(){
  const btn=G('sync-btn'); if(btn) btn.style.display='none';
}
function updateSyncUI(){
  if(!currentUser){ hideSyncButton(); return; }
  showSyncButton(); syncStatusMsg();
}
function saveCurrentStore(){
  if(!currentUser) return;
  saveCompanyData();
  DB.stores[currentUser.username]=({companies:DB.companies,companyId:DB.companyId});
}
function queueCloudSync(){
  DB.pendingSync = DB.pendingSync || [];
  DB.pendingSync.push({type:'update',date:new Date().toISOString()});
}
function mergeCloudStore(local, cloud){
  if(!cloud) return local;
  const localTime = local.lastSynced ? new Date(local.lastSynced).getTime() : 0;
  const cloudTime = cloud.lastSynced ? new Date(cloud.lastSynced).getTime() : 0;
  if(cloudTime > localTime) return cloud;
  return local;
}
async function loadCloudStoreForUser(){
  if(!currentUser) return;
  if(CLOUD_ENDPOINT && cloudOnline()){
    try{
      const resp=await fetch(`${CLOUD_ENDPOINT}?user=${encodeURIComponent(currentUser.username)}`);
      if(resp.ok){
        const payload=await resp.json();
        if(payload?.data){
          const merged=mergeCloudStore(DB.stores[currentUser.username]||defaultStore(),payload.data);
          Object.assign(DB,defaultStore(),merged);
          DB.stores[currentUser.username]=merged;
          DB.lastSynced=merged.lastSynced||DB.lastSynced;
          saveState();
          toast(t('sync_cloud_loaded'),'info');
        }
      }
    }catch(e){console.warn('loadCloudStoreForUser failed',e);}
  } else {
    const cloudSnapshot=loadCloudSnapshot();
    if(cloudSnapshot?.user===currentUser.username && cloudSnapshot.data){
      const merged=mergeCloudStore(DB.stores[currentUser.username]||defaultStore(),cloudSnapshot.data);
      Object.assign(DB,defaultStore(),merged);
      DB.stores[currentUser.username]=merged;
      DB.lastSynced=merged.lastSynced||DB.lastSynced;
      saveState();
      toast(t('sync_cloud_loaded'),'info');
    }
  }
}
async function syncCloud(){
  if(!currentUser){toast(t('sync_login_first'),'error');return}
  if(!cloudOnline()){toast(t('sync_no_connection'),'error');syncStatusMsg();return}
  const btn=G('sync-btn'); if(btn) btn.disabled=true;
  toast(t('sync_in_progress'),'info',{icon:'ti-refresh',sound:false,duration:2000});
  let success=false;
  try{
    const snapshot={
      user:currentUser.username,
      data: DB.stores[currentUser.username],
      timestamp:new Date().toISOString()
    };
    if(CLOUD_ENDPOINT){
      const resp=await fetch(CLOUD_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(snapshot)});
      success=resp.ok;
    } else {
      success=saveCloudSnapshot(snapshot);
    }
    if(success){
      DB.lastSynced=new Date().toLocaleString('ar');
      DB.pendingSync=[];
      saveState();
      toast(t('sync_success'),'success',{icon:'ti-cloud-upload'});
    } else {
      toast(t('sync_cloud_fail'),'error');
    }
  }catch(e){
    console.warn('syncCloud failed',e);
    toast(t('sync_fail_retry'),'error');
  }
  if(btn) btn.disabled=false;
  updateSyncUI();
}
window.addEventListener('online',()=>{document.getElementById('offline-banner').style.display='none';toast(t('online_restored'),'success',{title:t('sync_restored'),icon:'ti-wifi'});syncCloud();});
window.addEventListener('offline',()=>{document.getElementById('offline-banner').style.display='block';toast(t('offline_lost'),'warning',{title:t('sync_disconnected'),icon:'ti-wifi-off',duration:5000});updateSyncUI();});
function resetStore(){
  Object.assign(DB,defaultStore());
}

function emptyRow(c,m){
  const msg=m||(typeof t==='function'?t('lbl_no_data'):'');
  return`<tr><td colspan="${c}"><div class="empty-st"><i class="ti ti-inbox"></i><span>${escapeHtml(msg)}</span></div></td></tr>`
}
function getCurrentPageName(){
  return document.querySelector('.page.on')?.id.replace('p-','') || '';
}
function updateSearchHint(){
  const input=G('global-search');
  if(!input) return;
  const page=getCurrentPageName();
  const placeholders={
    inventory:'ph_inventory',
    sales:'ph_sales',
    purchases:'ph_purchases',
    customers:'ph_customers',
    suppliers:'ph_suppliers',
    returns:'ph_returns',
    users:'ph_users',
    suppay:'ph_suppay',
    finance:'ph_finance',
    pl:'ph_pl',
    audit:'ph_audit',
    soa:'ph_soa',
    hrm:'ph_hrm'
  };
  input.placeholder = t(placeholders[page] || 'search_quick');
  input.value = currentSearch;
}
function applyQuickSearch(term){
  currentSearch = normalizeText(term);
  const page=getCurrentPageName();
  // Sync global search with local search inputs — clear local if global is used
  const localInputs=['fin-local-search','pl-local-search','audit-local-search'];
  localInputs.forEach(id=>{const e=G(id);if(e&&currentSearch)e.value=''});
  const keyMap={inventory:'inv-tb',sales:'sal-tb',purchases:'pur-tb',customers:'cust-tb',suppliers:'sup-tb',returns:'ret-tb',users:'user-tb',suppay:'suppay-tb'};
  if (keyMap[page]) _pg[keyMap[page]] = 1;
  if(page==='inventory') renderItems(currentSearch);
  else if(page==='sales') renderSales(currentSearch);
  else if(page==='purchases') renderPurs(currentSearch);
  else if(page==='customers') renderCusts(currentSearch);
  else if(page==='suppliers') renderSups(currentSearch);
  else if(page==='returns') renderRets(currentSearch);
  else if(page==='users') renderUsers(currentSearch);
  else if(page==='suppay') renderSupPays(currentSearch);
  else if(page==='finance') renderFin(currentSearch);
  else if(page==='pl') renderPL(currentSearch);
  else if(page==='audit') renderAudit(currentSearch);
  else if(page==='soa') renderSOA();
  updateSearchHint();
}

/* ═══ SEARCH DROPDOWN ═══ */
function showSearchDropdown(term){
  const dd=G('search-dropdown');
  if(!dd||!term||term.length<2){if(dd)dd.style.display='none';return}
  const t2=normalizeText(term);
  let html='';
  const items=DB.items.filter(x=>normalizeText(x.name).includes(t2)||normalizeText(x.barcode).includes(t2)||normalizeText(x.code).includes(t2)).slice(0,5);
  if(items.length){
    html+='<div style="padding:4px 8px;font-size:10px;font-weight:700;color:var(--text-muted)">الأصناف</div>';
    items.forEach(x=>{html+=`<div class="search-dd-item" style="padding:6px 10px;cursor:pointer;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:8px" onmousedown="navigateToPage('inventory')"><i class="ti ti-package" style="color:var(--cyan)"></i>${escapeHtml(x.name)} <span style="color:var(--text-muted);font-family:var(--mono);font-size:10px">${x.code}</span></div>`});
  }
  const custs=DB.custs.filter(x=>normalizeText(x.name).includes(t2)).slice(0,3);
  if(custs.length){
    html+='<div style="padding:4px 8px;font-size:10px;font-weight:700;color:var(--text-muted);margin-top:4px">الزبائن</div>';
    custs.forEach(x=>{html+=`<div class="search-dd-item" style="padding:6px 10px;cursor:pointer;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:8px" onmousedown="navigateToPage('customers')"><i class="ti ti-user-circle" style="color:var(--green)"></i>${escapeHtml(x.name)} <span style="color:var(--text-muted);font-family:var(--mono);font-size:10px">${fmt(x.balance)}</span></div>`});
  }
  const sups=DB.sups.filter(x=>normalizeText(x.name).includes(t2)).slice(0,3);
  if(sups.length){
    html+='<div style="padding:4px 8px;font-size:10px;font-weight:700;color:var(--text-muted);margin-top:4px">الموردون</div>';
    sups.forEach(x=>{html+=`<div class="search-dd-item" style="padding:6px 10px;cursor:pointer;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:8px" onmousedown="navigateToPage('suppliers')"><i class="ti ti-users" style="color:var(--amber)"></i>${escapeHtml(x.name)} <span style="color:var(--text-muted);font-family:var(--mono);font-size:10px">${fmt(x.balance)}</span></div>`});
  }
  const invs=DB.invs.filter(x=>normalizeText(x.num).includes(t2)||normalizeText(x.custName).includes(t2)).slice(0,3);
  if(invs.length){
    html+='<div style="padding:4px 8px;font-size:10px;font-weight:700;color:var(--text-muted);margin-top:4px">فواتير البيع</div>';
    invs.forEach(x=>{html+=`<div class="search-dd-item" style="padding:6px 10px;cursor:pointer;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:8px" onmousedown="navigateToPage('sales')"><i class="ti ti-receipt" style="color:var(--accent)"></i>${escapeHtml(x.num)} — ${escapeHtml(x.custName)} <span style="color:var(--text-muted);font-family:var(--mono);font-size:10px">${fmt(x.total)}</span></div>`});
  }
  if(!html){html='<div style="padding:12px;text-align:center;color:var(--text-muted);font-size:12px">لا توجد نتائج</div>'}
  dd.innerHTML=html;
  dd.style.display='block';
  dd.querySelectorAll('.search-dd-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>el.style.background='var(--bg-hover)');
    el.addEventListener('mouseleave',()=>el.style.background='');
  });
}
function hideSearchDropdown(){const dd=G('search-dropdown');if(dd)dd.style.display='none'}
function navigateToPage(pg){hideSearchDropdown();showPage(pg)}

function loadState(){
  try{
    const stored=localStorage.getItem(STORAGE_KEY);
    const authUser=localStorage.getItem(AUTH_USER_KEY);
    const session=localStorage.getItem(SESSION_KEY);
    if(stored){
      const saved=JSON.parse(stored);
      DB.users=saved.users||DB.users;
      DB.stores=saved.stores||DB.stores;
    }
    if(authUser){
      try{ currentUser=JSON.parse(authUser); }catch(e){ currentUser=null; }
    }
    if(!currentUser && session){
      const sess=JSON.parse(session);
      if(sess.userId){
        currentUser=DB.users.find(u=>u.id===sess.userId) || null;
      }
    }
    if(currentUser){
      loadStore(currentUser.username);
    } else {
      resetStore();
    }
  }catch(e){console.warn('loadState failed',e)}
}
function saveState(){
  try{
    queueCloudSync();
    saveCurrentStore();
    const usersSnapshot=DB.users.map(({password,passwordHash,...u})=>u);
    const snapshot={users:usersSnapshot,stores:DB.stores};
    localStorage.setItem(STORAGE_KEY,JSON.stringify(snapshot));
    localStorage.setItem(SESSION_KEY,JSON.stringify({userId:currentUser?.id||null}));
  }catch(e){console.warn('saveState failed',e)}
}
function setTheme(theme){
  document.body.classList.toggle('light-mode',theme==='light');
  localStorage.setItem(THEME_KEY,theme);
  const btn=G('theme-btn');
  if(!btn) return;
  const icon=theme==='light' ? 'ti-sun' : 'ti-moon';
  const label=theme==='light' ? t('theme_light') : t('theme_dark');
  btn.innerHTML=`<i class="ti ${icon}"></i> ${label}`;
}
function loadTheme(){
  const saved=localStorage.getItem(THEME_KEY) || 'dark';
  setTheme(saved);
}
function toggleTheme(){
  const active=document.body.classList.contains('light-mode') ? 'light' : 'dark';
  setTheme(active==='light' ? 'dark' : 'light');
}

function showLogin(){
  G('login-screen').classList.add('on');
}
function hideLogin(){
  G('login-screen').classList.remove('on');
}
async function fetchUsersFromApi(){
  if(!currentUser || !['admin','system_admin'].includes(currentUser.role)) return;
  try{
    const resp=await fetch(`${API_BASE_URL}/users`,{
      headers:{...getAuthHeaders(),'Content-Type':'application/json'}
    });
    if(!resp.ok){
      console.warn('fetchUsersFromApi failed', await resp.text());
      return;
    }
    const payload=await resp.json();
    const rawUsers=Array.isArray(payload) ? payload : (payload.data || payload.users || []);
    DB.users=(rawUsers || []).map(u=>({
      ...u,
      id: u.id || u._id,
      role: u.role || u.roleName || 'user'
    }));
    renderUsers();
  }catch(e){
    console.warn('fetchUsersFromApi error',e);
  }
}
async function handleLogin(){
  const username=G('login-user').value.trim();
  const password=G('login-pass').value;
  if(!username||!password){toast(t('login_err_empty'),'error');return}
  try{
    const resp=await fetch(`${API_BASE_URL}/auth/login`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({username,password})
    });
    const data=await resp.json();
    if(!resp.ok){
      toast(data?.message||t('login_err_invalid'),'error',{title:t('login_failed')});
      return;
    }
    if(currentUser && currentUser.username!==data.user.username){
      saveCurrentStore();
    }
    setAuthSession(data.token,data.user);
    await fetchUsersFromApi();
    loadStore(currentUser.username);
    await loadCloudStoreForUser();
    saveState();
    renderCurrentUser();
    hideLogin();
    toast(t('login_welcome')+' '+currentUser.name,'success',{title:t('login_success'),icon:'ti-user'});
  }catch(e){
    console.warn('login failed',e);
    toast(t('login_err_conn'),'error');
  }
}
function logout(){
  clearAuthSession();
  saveState();
  resetStore();
  renderCurrentUser();
  showLogin();
}
function renderCurrentUser(){
  const name=G('user-name');
  const role=G('user-role');
  const av=G('user-av');
  if(name && role){
    name.textContent=currentUser?.name||t('user_not_logged');
    role.textContent=currentUser?.role||'guest';
  }
  if(av){
    av.textContent=currentUser?.name?.slice(0,1) || t('user_guest_initial');
  }
  if(typeof updateLangButton==='function') updateLangButton();
  updateSyncUI();
}
function requireAuth(){
  if(currentUser) return true;
  showLogin();
  toast(t('auth_required'),'error');
  return false;
}
function requireAdmin(){
  if(['admin','system_admin'].includes(currentUser?.role))return true;
  toast(t('auth_admin_only'),'error');
  return false;
}

function toggleSidebar(){
  const sb=document.querySelector('.sidebar');
  const bd=document.getElementById('sidebar-backdrop');
  const isOpen=sb.classList.contains('on');
  if(isOpen){
    sb.classList.remove('on');
    if(bd)bd.classList.remove('on');
  }else{
    sb.classList.add('on');
    if(bd)bd.classList.add('on');
  }
}
function closeSidebarIfMobile(){
  if(window.innerWidth<=1050){
    const sb=document.querySelector('.sidebar');
    const bd=document.getElementById('sidebar-backdrop');
    if(sb)sb.classList.remove('on');
    if(bd)bd.classList.remove('on');
  }
}

// Touch swipe for sidebar
(function(){
  let sx=0,sy=0,sw=false;
  document.addEventListener('touchstart',function(e){
    if(e.target.closest('.sidebar')||e.target.closest('.modal-backdrop')||e.target.closest('.modal'))return;
    sx=e.touches[0].clientX;sy=e.touches[0].clientY;sw=true;
  },{passive:true});
  document.addEventListener('touchmove',function(e){
    if(!sw)return;
    const dx=e.touches[0].clientX-sx;
    const dy=Math.abs(e.touches[0].clientY-sy);
    if(dy>40)sw=false;
  },{passive:true});
  document.addEventListener('touchend',function(e){
    if(!sw)return;sw=false;
    const dx=e.changedTouches[0].clientX-sx;
    const sb=document.querySelector('.sidebar');
    if(!sb)return;
    if(window.innerWidth<=1050){
      if(dx>60&&!sb.classList.contains('on'))toggleSidebar();
      else if(dx<-60&&sb.classList.contains('on'))toggleSidebar();
    }
  },{passive:true});
})();

/* ═══ BACKUP / EXPORT / IMPORT ═══ */
function exportLocalBackup(){
  const data={...DB,exportedAt:new Date().toISOString(),version:'3.0'};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`sales-backup-${today()}.json`;
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast(t('backup_exported'));
}
function importLocalBackup(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=function(ev){
    try{
      const data=JSON.parse(ev.target.result);
      if(!data||typeof data!=='object'){toast(t('backup_invalid_file'),'error');return}
      if(!confirm(t('backup_confirm_replace')))return;
      const keys=['items','invs','purs','custs','sups','payments','supPayments','rets','log','cI','cP','cRet','cPay','cSpay','companyId','companies'];
      keys.forEach(k=>{if(data[k]!==undefined)DB[k]=data[k]});
      saveState();
      toast(t('backup_imported')+' — '+(data.items||[]).length+' '+t('nav_inventory')+', '+(data.invs||[]).length+' '+t('nav_sales_inv'));
      refreshCurrentPage();
    }catch(err){toast(t('backup_read_error')+': '+err.message,'error')}
  };
  reader.readAsText(file);
  e.target.value='';
}
async function saveCloudBackup(){
  if(!currentUser){toast(t('sync_login_first'),'error');return}
  const data={...DB};
  try{
    const token=localStorage.getItem(AUTH_TOKEN_KEY);
    const r=await fetch(API_BASE_URL+'/backups',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({data,label:t('backup_label')+' '+new Date().toLocaleDateString(i18nLocale())})});
    const j=await r.json();
    if(j.status==='success'){toast(t('sync_success'));loadCloudBackups()}
    else{toast(j.message||t('backup_save_error'),'error')}
  }catch(err){toast(t('backup_save_error')+': '+err.message,'error')}
}
async function loadCloudBackups(){
  if(!currentUser)return;
  try{
    const token=localStorage.getItem(AUTH_TOKEN_KEY);
    const r=await fetch(API_BASE_URL+'/backups',{headers:{'Authorization':'Bearer '+token}});
    const j=await r.json();
    if(j.status==='success'&&j.backups.length){
      const el=G('backup-list');if(el)el.style.display='';
      const items=G('backup-items');if(!items)return;
      items.innerHTML=j.backups.map(b=>{
        const sz=b.size?(b.size/1024).toFixed(1)+' KB':'—';
        const dt=new Date(b.createdAt).toLocaleString(i18nLocale());
        return`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--line);font-size:13px">
          <div><strong>${b.label||t('backup_copy')}</strong> <span style="color:var(--muted)">${dt} — ${sz}</span></div>
          <div style="display:flex;gap:4px">
            <button class="btn btn-sm btn-icon" onclick="downloadCloudBackup('${b._id}')" title="${t('backup_download')}"><i class="ti ti-download"></i></button>
            <button class="btn btn-sm btn-danger btn-icon" onclick="deleteCloudBackup('${b._id}')" title="${t('backup_del_btn')}"><i class="ti ti-trash"></i></button>
          </div>
        </div>`
      }).join('');
    }
  }catch(err){/* silent */}
}
async function downloadCloudBackup(id){
  try{
    const token=localStorage.getItem(AUTH_TOKEN_KEY);
    const r=await fetch(API_BASE_URL+'/backups/'+id,{headers:{'Authorization':'Bearer '+token}});
    const j=await r.json();
    if(j.status==='success'&&j.backup?.data){
      const blob=new Blob([JSON.stringify(j.backup.data,null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;a.download=`cloud-backup-${j.backup.label||id}.json`;
      document.body.appendChild(a);a.click();document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast(t('backup_exported'));
    }
  }catch(err){toast(t('backup_save_error')+': '+err.message,'error')}
}
async function deleteCloudBackup(id){
  if(!confirm(t('confirm_delete')))return;
  try{
    const token=localStorage.getItem(AUTH_TOKEN_KEY);
    await fetch(API_BASE_URL+'/backups/'+id,{method:'DELETE',headers:{'Authorization':'Bearer '+token}});
    toast(t('backup_exported'));
    loadCloudBackups();
  }catch(err){toast(t('backup_save_error')+': '+err.message,'error')}
}
