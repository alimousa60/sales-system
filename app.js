/* ═══════════════════════════════════════════════
   DATABASE
═══════════════════════════════════════════════ */
const STORAGE_KEY='salesSystemDB';
const SESSION_KEY='salesSystemSession';
const AUTH_TOKEN_KEY='salesSystemAuthToken';
const AUTH_USER_KEY='salesSystemAuthUser';
const API_BASE_URL='http://localhost:3000/api/v1';
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
  rets:[],
  log:[],
  cI:1,cP:1,cRet:1,cPay:1,cSpay:1
};

let currentUser=null;
let editingCompanyId=null;
// payment methods state
let _siL=[],_piL=[],_colPay='cash',_spPay='cash',_reQC='pending';

const G=id=>document.getElementById(id);
const fmt=(n,d=3)=>parseFloat(n||0).toFixed(d);
const today=()=>new Date().toISOString().split('T')[0];
const THEME_KEY='salesSystemTheme';
let currentSearch='';

function normalizeText(value){
  return String(value||'').toLowerCase().trim();
}

function baseCompany(){
  return {id:1,name:'المؤسسة التجارية',address:'طرابلس، ليبيا',phone:'',note:'',items:[],custs:[],sups:[],invs:[],purs:[],payments:[],supPayments:[],rets:[],log:[],pendingSync:[],lastSynced:null,cI:1,cP:1,cRet:1,cPay:1,cSpay:1};
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
      cI:c.cI||1,cP:c.cP||1,cRet:c.cRet||1,cPay:c.cPay||1,cSpay:c.cSpay||1
    }));
  }
  return normalized;
}
function currentCompanyStore(){
  return DB.companies?.find(c=>c.id===DB.companyId) || DB.companies?.[0] || baseCompany();
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
    return true;
  }
}
function loadStore(username){
  const store=DB.stores?.[username]||defaultStore();
  const normalized=normalizeStore(store);
  Object.assign(DB,defaultStore(),{companies:normalized.companies,companyId:normalized.companyId});
  loadCompanyData();
}
function loadCloudSnapshot(){
  if(CLOUD_ENDPOINT) return null;
  try{ return JSON.parse(localStorage.getItem(CLOUD_STORAGE_KEY)) || null }catch(e){return null}
}
function saveCloudSnapshot(snapshot){
  if(CLOUD_ENDPOINT) return false;
  try{ localStorage.setItem(CLOUD_STORAGE_KEY,JSON.stringify(snapshot)); return true }catch(e){return false}
}
function cloudOnline(){
  return navigator.onLine;
}
function syncStatusMsg(){
  const status=G('sync-status');
  if(!status) return;
  if(!cloudOnline()){ status.style.display='inline-block'; status.textContent='غير متصل'; status.style.color='var(--red)'; return; }
  status.style.display='inline-block';
  status.textContent=DB.lastSynced?`آخر مزامنة ${DB.lastSynced}`:'جاهز للمزامنة';
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
          toast('تم تحميل البيانات من السحابة','info');
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
      toast('تم تحميل النسخة السحابية المحلية','info');
    }
  }
}
async function syncCloud(){
  if(!currentUser){toast('سجل الدخول أولاً للمزامنة','error');return}
  if(!cloudOnline()){toast('لا يوجد اتصال بالإنترنت حالياً','error');syncStatusMsg();return}
  const btn=G('sync-btn'); if(btn) btn.disabled=true;
  toast('جاري المزامنة مع السحابة...','info');
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
      toast('تمت المزامنة بنجاح','success');
    } else {
      toast('فشل حفظ البيانات السحابية','error');
    }
  }catch(e){
    console.warn('syncCloud failed',e);
    toast('فشل المزامنة، سيتم المحاولة لاحقاً','error');
  }
  if(btn) btn.disabled=false;
  updateSyncUI();
}
window.addEventListener('online',()=>{toast('الاتصال عاد، جاري المزامنة تلقائياً...','info');syncCloud();});
window.addEventListener('offline',()=>{toast('تم فقدان الاتصال، سيتم العمل محلياً','error');updateSyncUI();});
function resetStore(){
  Object.assign(DB,defaultStore());
}

function emptyRow(c,m='لا توجد بيانات'){
  return`<tr><td colspan="${c}"><div class="empty-st"><i class="ti ti-inbox"></i><span>${m}</span></div></td></tr>`
}
function getCurrentPageName(){
  return document.querySelector('.page.on')?.id.replace('p-','') || '';
}
function updateSearchHint(){
  const input=G('global-search');
  if(!input) return;
  const page=getCurrentPageName();
  const placeholders={
    inventory:'ابحث عن صنف أو كود أو باركود...',
    sales:'ابحث عن فاتورة أو زبون أو تاريخ...',
    purchases:'ابحث عن فاتورة أو مورد أو تاريخ...',
    customers:'ابحث عن زبون أو هاتف...',
    suppliers:'ابحث عن مورد أو هاتف...',
    returns:'ابحث عن مرتجع أو فاتورة أو سبب...',
    users:'ابحث عن مستخدم أو اسم حساب...'
  };
  input.placeholder = placeholders[page] || 'بحث سريع...';
  input.value = currentSearch;
}
function applyQuickSearch(term){
  currentSearch = normalizeText(term);
  const page=getCurrentPageName();
  if(page==='inventory') renderItems(currentSearch);
  else if(page==='sales') renderSales(currentSearch);
  else if(page==='purchases') renderPurs(currentSearch);
  else if(page==='customers') renderCusts(currentSearch);
  else if(page==='suppliers') renderSups(currentSearch);
  else if(page==='returns') renderRets(currentSearch);
  else if(page==='users') renderUsers(currentSearch);
  updateSearchHint();
}
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
  const label=theme==='light' ? 'نهاري' : 'ليلي';
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
  if(!currentUser || currentUser.role !== 'admin') return;
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
  if(!username||!password){toast('أدخل اسم المستخدم وكلمة المرور','error');return}
  try{
    const resp=await fetch(`${API_BASE_URL}/auth/login`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({username,password})
    });
    const data=await resp.json();
    if(!resp.ok){
      toast(data?.message||'بيانات الدخول غير صحيحة','error');
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
    toast(`مرحباً ${currentUser.name}`,'info');
  }catch(e){
    console.warn('login failed',e);
    toast('فشل الاتصال بخادم المصادقة','error');
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
    name.textContent=currentUser?.name||'غير مسجل';
    role.textContent=currentUser?.role||'guest';
  }
  if(av){
    av.textContent=currentUser?.name?.slice(0,1) || 'م';
  }
  updateSyncUI();
}
function requireAuth(){
  if(currentUser) return true;
  showLogin();
  toast('يجب تسجيل الدخول أولاً','error');
  return false;
}
function requireAdmin(){
  if(currentUser?.role==='admin')return true;
  toast('هذه الوظيفة متاحة للمشرف فقط','error');
  return false;
}

function toggleSidebar(){
  const sb=document.querySelector('.sidebar');
  sb.classList.toggle('on');
}
function closeSidebarIfMobile(){
  if(window.innerWidth<=1050){
    document.querySelector('.sidebar')?.classList.remove('on');
  }
}


/* ═══ TOAST & LOG ═══ */
function toast(msg,type='success'){
  const t=G('toast');
  const icon=type==='success'?'ti-check':type==='info'?'ti-info-circle':'ti-alert-triangle';
  t.innerHTML=`<i class="ti ${icon}"></i> ${msg}`;
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
  else if(gid==='sp-pay') _spPay=m;
  else if(gid==='re-qc') _reQC=m;
}
function payLbl(m){
  const map={cash:'<span class="badge b-green">نقدي</span>',check:'<span class="badge b-blue">صك</span>',credit:'<span class="badge b-amber">آجَل</span>',transfer:'<span class="badge b-cyan">تحويل</span>'};
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
  if(!name){toast('أدخل اسم الشركة','error');return}
  const address=G('co-address').value.trim();
  const phone=G('co-phone').value.trim();
  const note=G('co-note').value.trim();
  if(editingCompanyId===null){
    const id=Date.now();
    const company={...baseCompany(),id,name,address,phone,note};
    DB.companies.push(company);
    DB.companyId=id;
    addLog('إضافة شركة',`"${name}"`,'#2dd17e');
    loadCompanyData();
  } else {
    const company=companyById(editingCompanyId);
    if(company){
      Object.assign(company,{name,address,phone,note});
      addLog('تحديث بيانات الشركة',`"${name}"`,'#9b72f7');
      if(company.id===DB.companyId) loadCompanyData();
    }
  }
  saveState();
  closeModal('m-company');
  renderCompany();
  renderSettings();
  toast('تم حفظ بيانات الشركة');
}
function updateSOASelector(){const type=G('soa-type').value;const label=type==='supplier'?'اختر مورد':'اختر زبون';const placeholder=`-- اختر ${type==='supplier'?'مورد':'زبون'} --`;if(G('soa-cust-label'))G('soa-cust-label').textContent=label;popSel('soa-cust',type==='supplier'?DB.sups:DB.custs,'id','name',placeholder);renderSOA()}

/* Invoice paid amount */
function invPaid(inv){
  return DB.payments.filter(p=>p.invId===inv.id).reduce((s,p)=>s+p.amount,0)
}
function invRemaining(inv){return Math.max(0,inv.total-invPaid(inv))}
function invPayStatus(inv){
  const paid=invPaid(inv);
  if(paid<=0)return'<span class="badge b-red">غير مسدَّدة</span>';
  if(paid>=inv.total-0.001)return'<span class="badge b-green">مسدَّدة كاملاً</span>';
  return'<span class="badge b-amber">جزئي</span>'
}
function invDlvLabel(s){
  const map={pending:'<span class="badge b-gray">غير مسلَّم</span>',delivered:'<span class="badge b-teal">تم التسليم</span>'};
  return map[s]||map.pending
}

/* Purchase paid */
function purPaid(pur){return DB.supPayments.filter(p=>p.purId===pur.id).reduce((s,p)=>s+p.amount,0)}
function purRemaining(pur){return Math.max(0,pur.total-purPaid(pur))}
function purPayStatus(pur){
  const paid=purPaid(pur);
  if(paid<=0)return'<span class="badge b-red">غير مدفوعة</span>';
  if(paid>=pur.total-0.001)return'<span class="badge b-green">مدفوعة</span>';
  return'<span class="badge b-amber">جزئي</span>'
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
  dash:{t:'الرئيسية',i:'ti-layout-dashboard'},
  inventory:{t:'الأصناف والمخزون',i:'ti-package'},
  sales:{t:'فواتير البيع',i:'ti-receipt'},
  returns:{t:'مرتجع المبيعات',i:'ti-receipt-refund'},
  purchases:{t:'فواتير الشراء',i:'ti-truck'},
  suppay:{t:'دفعات الموردين',i:'ti-wallet'},
  customers:{t:'الزبائن',i:'ti-user-circle'},
  suppliers:{t:'الموردون',i:'ti-users'},
  soa:{t:'كشف الحساب',i:'ti-file-description'},
  finance:{t:'الخزينة',i:'ti-cash'},
  pl:{t:'الأرباح والخسائر',i:'ti-chart-bar'},
  users:{t:'حسابات المستخدمين',i:'ti-users-pin'},
  audit:{t:'سجل التدقيق',i:'ti-shield-check'},
  settings:{t:'الإعدادات',i:'ti-settings'}
};

function showPage(pg){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.page===pg));
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  const page=G('p-'+pg);
  if(!page) return;
  page.classList.add('on');
  const m=PAGE_META[pg]||{t:pg,i:'ti-circle'};
  G('pg-title').innerHTML=`<i class="ti ${m.i}"></i> ${m.t}`;
  closeSidebarIfMobile();
  updateSearchHint();
  if(pg==='dash')renderDash();
  if(pg==='audit')renderAudit();
  if(pg==='finance')renderFin();
  if(pg==='pl')renderPL();
  if(pg==='users')renderUsers(currentSearch);
  if(pg==='settings')renderSettings();
  if(pg==='soa'){updateSOASelector();G('soa-out').innerHTML=''}
  if(pg==='suppay')renderSupPays();
  if(pg==='suppliers')renderSups(currentSearch);
  if(pg==='customers')renderCusts(currentSearch);
  if(pg==='returns')renderRets(currentSearch);
  if(pg==='sales')renderSales(currentSearch);
  if(pg==='purchases')renderPurs(currentSearch);
  if(pg==='inventory')renderItems(currentSearch);
}

document.querySelectorAll('.nav-item').forEach(el=>{
  el.addEventListener('click',()=>{ showPage(el.dataset.page) })
});

G('global-search')?.addEventListener('input', e=>applyQuickSearch(e.target.value));
G('clear-search')?.addEventListener('click', ()=>{
  currentSearch='';
  applyQuickSearch('');
});

setInterval(()=>G('clock').textContent=new Date().toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'}),1000);

/* ═══ MODALS ═══ */
function openModal(id){
  if(!requireAuth())return;
  if(id==='m-invoice'){
    G('si-num').value='INV-'+String(DB.cI).padStart(5,'0');
    G('si-date').value=today();
    popSel('si-cust',DB.custs,'id','name','-- اختر زبون --');
    popSel('si-item-sel',DB.items,'id','name','-- اختر صنف --');
    _siL=[];renderSiL();
    G('si-price').value='';G('si-qty').value='1';G('si-disc').value='0';G('si-ltot').value='';
  }
  if(id==='m-pur'){
    G('pi-num').value='PUR-'+String(DB.cP).padStart(5,'0');
    G('pi-date').value=today();
    popSel('pi-sup',DB.sups,'id','name','-- اختر مورد --');
    popSel('pi-item-sel',DB.items,'id','name','-- اختر صنف --');
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
  if(id==='m-item'){G('fi-code').value='ITM'+String(DB.items.length+1).padStart(3,'0');['fi-barcode','fi-name','fi-buy','fi-sell','fi-qty','fi-reorder','fi-unit','fi-cat'].forEach(x=>G(x).value='')}
  if(id==='m-company'){const co=currentCompany();G('co-name').value=co.name;G('co-address').value=co.address;G('co-phone').value=co.phone;G('co-note').value=co.note;}
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
  G(id).classList.add('on')
}
function closeModal(id){G(id).classList.remove('on')}

/* ═══ ITEMS ═══ */
function saveItem(){
  const name=G('fi-name').value.trim();
  if(!name){toast('أدخل اسم الصنف','error');return}
  const item={
    id:Date.now(),
    code:G('fi-code').value||'ITM'+String(DB.items.length+1).padStart(3,'0'),
    barcode:G('fi-barcode').value.trim(),
    name,
    buy:parseFloat(G('fi-buy').value)||0,
    sell:parseFloat(G('fi-sell').value)||0,
    qty:parseFloat(G('fi-qty').value)||0,
    reorder:parseFloat(G('fi-reorder').value)||5,
    unit:G('fi-unit').value||'قطعة',
    cat:G('fi-cat').value||'عام'
  };
  DB.items.push(item);
  addLog('إضافة صنف',`"${name}" — سعر البيع: ${fmt(item.sell)} د.ل`,'#2dd17e');
  closeModal('m-item');renderItems();
  if(G('si-item-sel')) popSel('si-item-sel',DB.items,'id','name','-- اختر صنف --');
  if(G('pi-item-sel')) popSel('pi-item-sel',DB.items,'id','name','-- اختر صنف --');
  updateStats();
  toast(`تم إضافة الصنف "${name}" بنجاح`)
}
function filterItems(q){renderItems(q)}
function renderItems(q=''){
  const term=normalizeText(q);
  const arr=term?DB.items.filter(x=>normalizeText(x.name).includes(term)||normalizeText(x.barcode).includes(term)||normalizeText(x.code).includes(term)||normalizeText(x.cat).includes(term)):DB.items;
  const tb=G('inv-tb');
  if(!arr.length){tb.innerHTML=emptyRow(10,term?'لا توجد نتائج لهذا البحث':'لا توجد أصناف — أضف صنفاً جديداً.');return}
  tb.innerHTML=arr.map(x=>{
    const low=x.qty<=x.reorder;
    const diff=x.qty - x.reorder;
    const diffLabel = diff >= 0 ? `<span class="text-green">+${fmt(diff)}</span>` : `<span class="text-red">${fmt(diff)}</span>`;
    const st=x.qty===0?'<span class="badge b-red">نفدت</span>':low?'<span class="badge b-amber">منخفض</span>':'<span class="badge b-green">جيد</span>';
    return`<tr>
      <td class="td-mono">${x.code}</td>
      <td class="td-bold">${x.name}</td>
      <td style="color:var(--text-muted)">${x.cat}</td>
      <td class="td-mono">${fmt(x.buy)}</td>
      <td class="td-mono" style="color:var(--green);font-weight:700">${fmt(x.sell)}</td>
      <td class="td-mono" style="${low?'color:var(--amber);font-weight:700':''}">${x.qty}</td>
      <td class="td-mono">${diffLabel}</td>
      <td style="color:var(--text-muted)">${x.unit}</td>
      <td>${st}</td>
      <td><div class="td-actions"><button class="btn btn-sm btn-danger btn-icon" onclick="delItem(${x.id})" title="حذف"><i class="ti ti-trash"></i></button></div></td>
    </tr>`
  }).join('')
}
function delItem(id){
  const it=DB.items.find(x=>x.id===id);
  if(!confirm(`حذف الصنف "${it?.name}"?`))return;
  addLog('حذف صنف',`"${it?.name}"`,'#f05454');
  DB.items=DB.items.filter(x=>x.id!==id);
  saveState();
  renderItems();updateStats()
}

function renderUsers(search=''){
  const tb=G('user-tb');
  if(!tb)return;
  if(!requireAdmin()){tb.innerHTML=emptyRow(4,'هذه الصفحة متاحة للمشرف فقط');return}
  const term=normalizeText(search);
  const users=term?DB.users.filter(u=>normalizeText(u.name).includes(term)||normalizeText(u.username).includes(term)||normalizeText(u.role).includes(term)):DB.users;
  if(!users.length){tb.innerHTML=emptyRow(4,term?'لا توجد نتائج لهذا البحث':'لا توجد حسابات مستخدمين.');return}
  tb.innerHTML=users.map(u=>{
    const status = u.status || (u.isActive === false ? 'inactive' : 'active');
    const roleLabel = u.role==='admin'?'مشرف':u.role==='sales'?'مبيعات':u.role==='inventory'?'مخازن':'مستخدم';
    const roleClass = u.role==='admin'?'b-purple':u.role==='sales'?'b-blue':u.role==='inventory'?'b-teal':'b-gray';
    const statusClass = status==='active'?'b-green':status==='suspended'?'b-red':'b-amber';
    const statusLabel = status==='active'?'نشط':status==='suspended'?'موقوف':'غير نشط';
    return `<tr>
      <td class="td-bold">${u.name || '-'}</td>
      <td class="td-mono">${u.username || '-'}</td>
      <td><span class="badge ${roleClass}">${roleLabel}</span></td>
      <td><span class="badge ${statusClass}">${statusLabel}</span></td>
      <td><div class="td-actions">
        <button class="btn btn-sm btn-danger btn-icon" onclick="delUser('${u.id || ''}')" title="حذف"><i class="ti ti-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('')
}
function renderSettings(){
  const co=currentCompany();
  const el=G('settings-company-name');
  if(el) el.textContent = co?.name || 'المؤسسة غير محددة';
  const sel=G('settings-company-select');
  if(sel){
    popSel('settings-company-select',DB.companies,'id','name','-- اختر شركة --');
    sel.value=DB.companyId||'';
  }
}
function openCompanyModal(id){
  if(!requireAdmin()) return;
  editingCompanyId = id===null ? null : id || DB.companyId;
  const title = G('m-company-title');
  const co = editingCompanyId===null ? {name:'',address:'',phone:'',note:''} : currentCompany();
  if(title) title.textContent = editingCompanyId===null ? 'شركة جديدة' : 'بيانات المؤسسة';
  G('co-name').value=co.name||'';
  G('co-address').value=co.address||'';
  G('co-phone').value=co.phone||'';
  G('co-note').value=co.note||'';
  openModal('m-company');
}
function switchCompany(id){
  if(!id || Number(id)===DB.companyId) return;
  saveCompanyData();
  DB.companyId = Number(id);
  loadCompanyData();
  saveState();
  renderCompany();
  renderSettings();
  refreshCurrentPage();
}
function refreshCurrentPage(){
  const active=document.querySelector('.page.on');
  if(!active) return;
  const pg=active.id.replace('p-','');
  if(pg==='dash') renderDash();
  if(pg==='inventory') renderItems();
  if(pg==='sales') renderSales();
  if(pg==='returns') renderReturns();
  if(pg==='purchases') renderPurs();
  if(pg==='suppay') renderSupPays();
  if(pg==='customers') renderCusts();
  if(pg==='suppliers') renderSups();
  if(pg==='soa'){updateSOASelector();G('soa-out').innerHTML=''}
  if(pg==='finance') renderFin();
  if(pg==='pl') renderPL();
  if(pg==='users') renderUsers();
}
function openUsersPage(){
  showPage('users');
}
async function saveUser(){
  if(!requireAdmin())return;
  const username=G('uu-username').value.trim();
  const password=G('uu-pass').value;
  const name=G('uu-name').value.trim();
  const role=G('uu-role').value;
  if(!username||!password||!name){toast('املأ جميع الحقول المطلوبة','error');return}
  try{
    const resp=await fetch(`${API_BASE_URL}/users`,{
      method:'POST',
      headers:{...getAuthHeaders(),'Content-Type':'application/json'},
      body:JSON.stringify({username,password,name,role,companyId:currentUser?.companyId})
    });
    const payload=await resp.json();
    if(!resp.ok){
      toast(payload?.message || payload?.status || 'فشل إنشاء المستخدم','error');
      return;
    }
    const createdUser = payload.user || payload.data || payload;
    if(createdUser){
      DB.users.unshift({
        ...createdUser,
        id: createdUser.id || createdUser._id,
        role: createdUser.role || role
      });
    }
    addLog('إضافة مستخدم',`"${name}" — ${role}`,'#9b72f7');
    closeModal('m-user');
    renderUsers();
    toast(`تم إضافة المستخدم ${name}`)
  }catch(e){
    console.warn('saveUser failed',e);
    toast('فشل الاتصال بخادم المستخدمين','error');
  }
}
async function delUser(id){
  if(!requireAdmin())return;
  if(!id){toast('تعذر تحديد المستخدم','error');return}
  const user=DB.users.find(u=>String(u.id||u._id)===String(id));
  if(!user)return;
  if(String(user.id||user._id)===String(currentUser?.id || currentUser?._id)){toast('لا يمكن حذف المستخدم الحالي','error');return}
  const admins=DB.users.filter(u=>String(u.role).toLowerCase()==='admin');
  if(String(user.role).toLowerCase()==='admin' && admins.length===1){toast('يجب أن يبقى مشرف واحد على الأقل','error');return}
  if(!confirm(`حذف المستخدم "${user.name}"?`))return;
  try{
    const resp=await fetch(`${API_BASE_URL}/admin/users/${id}`,{
      method:'DELETE',
      headers:{...getAuthHeaders(),'Content-Type':'application/json'}
    });
    const payload=await resp.json();
    if(!resp.ok){
      toast(payload?.message || 'فشل حذف المستخدم','error');
      return;
    }
    DB.users=DB.users.filter(u=>String(u.id||u._id)!==String(id));
    addLog('حذف مستخدم',`"${user.name}"`,'#f05454');
    renderUsers();
    toast(`تم حذف المستخدم ${user.name}`)
  }catch(e){
    console.warn('delUser failed',e);
    toast('فشل الاتصال بخادم المستخدمين','error');
  }
}

/* ═══ CUSTOMERS ═══ */
function saveCust(){
  const name=G('cu-name').value.trim();if(!name){toast('أدخل اسم الزبون','error');return}
  const openBal=parseFloat(G('cu-bal').value)||0;
  const id=Date.now();
  DB.custs.push({id,name,phone:G('cu-phone').value,addr:G('cu-addr').value,openBal});
  // Opening balance as a pre-existing receivable note only (not adding to cash)
  addLog('إضافة زبون',`"${name}" رصيد افتتاحي: ${fmt(openBal)} د.ل`,'#9b72f7');
  closeModal('m-cust');renderCusts();toast(`تم إضافة الزبون "${name}"`)
}
function renderCusts(search=''){
  const tb=G('cust-tb');
  const term=normalizeText(search);
  const custs=term?DB.custs.filter(c=>normalizeText(c.name).includes(term)||normalizeText(c.phone).includes(term)||normalizeText(c.addr).includes(term)):DB.custs;
  if(!custs.length){tb.innerHTML=emptyRow(6,term?'لا توجد نتائج لهذا البحث':'لا يوجد زبائن.');return}
  tb.innerHTML=custs.map(c=>{
    const recv=custReceivable(c);
    const totalSales=DB.invs.filter(i=>i.custId===c.id).reduce((s,i)=>s+i.total,0) + (parseFloat(c.openBal)||0);
    return`<tr>
      <td class="td-bold">${c.name}</td>
      <td class="td-mono">${c.phone||'—'}</td>
      <td class="td-mono" style="color:${recv>0?'var(--red)':'var(--green)'};font-weight:700">${fmt(recv)} د.ل</td>
      <td class="td-mono">${fmt(totalSales)} د.ل</td>
      <td><span class="badge b-green">نشط</span></td>
      <td><button class="btn btn-sm" onclick="openSOA(${c.id})"><i class="ti ti-file-description"></i> كشف</button></td>
    </tr>`
  }).join('')
}
function openSOA(cid){document.querySelector('.nav-item[data-page="soa"]').click();setTimeout(()=>{G('soa-type').value='customer';updateSOASelector();G('soa-cust').value=cid;renderSOA()},60)}

/* ═══ SUPPLIERS ═══ */
function saveSup(){
  const name=G('su-name').value.trim();if(!name){toast('أدخل اسم المورد','error');return}
  DB.sups.push({id:Date.now(),name,phone:G('su-phone').value,addr:G('su-addr').value});
  addLog('إضافة مورد',`"${name}"`,'#22d3ee');
  closeModal('m-sup');renderSups();toast(`تم إضافة المورد "${name}"`)
}
function renderSups(search=''){
  const tb=G('sup-tb');
  const term=normalizeText(search);
  const sups=term?DB.sups.filter(s=>normalizeText(s.name).includes(term)||normalizeText(s.phone).includes(term)||normalizeText(s.addr).includes(term)):DB.sups;
  if(!sups.length){tb.innerHTML=emptyRow(6,term?'لا توجد نتائج لهذا البحث':'لا يوجد موردون.');return}
  tb.innerHTML=sups.map(s=>{
    const bal=supBalance(s);
    const totalPur=DB.purs.filter(p=>p.supId===s.id).reduce((sum,p)=>sum+p.total,0);
    return`<tr>
      <td class="td-bold">${s.name}</td>
      <td class="td-mono">${s.phone||'—'}</td>
      <td style="color:var(--text-muted)">${s.addr||'—'}</td>
      <td class="td-mono" style="color:${bal>0?'var(--red)':'var(--green)'};font-weight:700">${fmt(bal)} د.ل</td>
      <td class="td-mono">${fmt(totalPur)} د.ل</td>
      <td><span class="badge b-green">نشط</span></td>
    </tr>`
  }).join('')
}

/* ═══ SALES INVOICE ═══ */
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
  G('si-qty').value='1';G('si-disc').value='0';G('si-price').value='';G('si-ltot').value='';G('si-item-sel').value=''
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
  toast(`تم حفظ الفاتورة ${num} — الذمة المدينة مسجَّلة`)
}
function renderSales(search=''){
  const filter=G('sal-filter')?.value||'';
  const term=normalizeText(search);
  let arr=[...DB.invs].reverse();
  if(filter==='delivered')arr=arr.filter(i=>i.dlvStatus==='delivered');
  else if(filter==='pending')arr=arr.filter(i=>i.dlvStatus==='pending');
  else if(filter==='paid')arr=arr.filter(i=>invRemaining(i)<=0.001);
  else if(filter==='partial')arr=arr.filter(i=>{const p=invPaid(i);return p>0&&p<i.total-0.001});
  if(term){arr=arr.filter(i=>normalizeText(i.num).includes(term)||normalizeText(i.custName).includes(term)||normalizeText(i.date).includes(term));}
  const tb=G('sal-tb');
  if(!arr.length){tb.innerHTML=emptyRow(9,term?'لا توجد نتائج لهذا البحث':'لا توجد فواتير.');return}
  tb.innerHTML=arr.map(inv=>{
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
  }).join('')
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
  G('collect-inv-info').innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
      <div><div style="font-size:11px;color:var(--text-muted)">الفاتورة</div><div style="font-weight:700;color:var(--accent)">${inv.num}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">الزبون</div><div style="font-weight:600">${inv.custName}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">الإجمالي</div><div style="font-weight:700">${fmt(inv.total)} د.ل</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">المحصَّل سابقاً</div><div style="font-weight:700;color:var(--green)">${fmt(paid)} د.ل</div></div>
      <div><div style="font-size:11px;color:var(--text-muted)">المتبقي</div><div style="font-weight:700;color:var(--red)">${fmt(rem)} د.ل</div></div>
    </div>
    <div class="progress-bar" style="margin-top:8px"><div class="progress-fill" style="width:${Math.min(100,(paid/inv.total)*100).toFixed(1)}%"></div></div>`;
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
  toast(`تم استلام ${fmt(amount)} د.ل من الزبون ${inv.custName} ✓`)
}

/* ═══ DELIVER ═══ */
function openDeliver(invId){
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  G('dlv-inv-id').value=invId;G('dlv-recv').value='';G('dlv-notes').value='';
  G('deliver-inv-info').innerHTML=`
    <div style="margin-bottom:8px;font-weight:700;color:var(--accent)">${inv.num} — ${inv.custName}</div>
    <table style="width:100%;font-size:11px"><thead><tr><th style="text-align:right;padding:4px 6px">الصنف</th><th style="text-align:center;padding:4px 6px">الكمية</th></tr></thead>
    <tbody>${inv.lines.map(l=>`<tr><td style="padding:4px 6px">${l.name}</td><td style="text-align:center;padding:4px 6px">${l.qty}</td></tr>`).join('')}</tbody></table>`;
  openModal('m-deliver')
}
function confirmDeliver(){
  const recv=G('dlv-recv').value.trim();if(!recv){toast('أدخل اسم المستلم','error');return}
  const invId=parseInt(G('dlv-inv-id').value);
  const inv=DB.invs.find(x=>x.id===invId);if(!inv)return;
  // Deduct inventory only
  const failed=[];
  inv.lines.forEach(l=>{
    const item=DB.items.find(x=>x.id===l.itemId);
    if(item){
      if(item.qty<l.qty)failed.push(`${l.name}: المتاح ${item.qty} والمطلوب ${l.qty}`);
    }
  });
  if(failed.length){toast('نقص في المخزون: '+failed.join(' | '),'error');return}
  inv.lines.forEach(l=>{const item=DB.items.find(x=>x.id===l.itemId);if(item)item.qty=Math.max(0,item.qty-l.qty)});
  inv.dlvStatus='delivered';inv.receiver=recv;
  addLog('تسليم البضاعة (مخزون-)',`${inv.num} — المستلم: "${recv}" — المخزون مُحدَّث فقط، لا أثر على الخزينة`,'#14b8a6');
  saveState();
  closeModal('m-deliver');renderSales();renderItems();updateStats();
  toast(`تم تسليم الفاتورة ${inv.num} — المخزون خُصِم ✓`)
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
      ${paysForInv.length?`<div class="pay-history">${paysForInv.map(p=>`<div class="pay-row"><div><span style="font-weight:600;color:var(--text-primary)">${p.id}</span> — ${p.mode==='cash'?'نقدي':p.mode==='check'?`صك ${p.checkNum||''}`:p.mode}</div><div class="pr-date">${p.date}</div><div class="pr-amt">+${fmt(p.amount)} د.ل</div></div>`).join('')}</div>`:'<div style="font-size:12px;color:var(--text-muted);padding:8px 0">لا دفعات مسجَّلة بعد.</div>'}
    </div>`;
  G('view-inv-footer').innerHTML=`
    <button class="btn" onclick="closeModal('m-view-inv')">إغلاق</button>
    <button class="btn btn-secondary" onclick="printInvoice('sale',${inv.id})"><i class="ti ti-printer"></i> تصدير PDF</button>
    ${inv.dlvStatus==='pending'?`<button class="btn btn-amber" onclick="closeModal('m-view-inv');openDeliver(${inv.id})"><i class="ti ti-truck-delivery"></i> تسليم البضاعة</button>`:''}
    ${rem>0.001?`<button class="btn btn-success" onclick="closeModal('m-view-inv');openCollect(${inv.id})"><i class="ti ti-cash"></i> استلام دفعة</button>`:''}`;
  openModal('m-view-inv')
}

function viewPur(purId){
  const pur=DB.purs.find(x=>x.id===purId);if(!pur)return;
  const paid=purPaid(pur),rem=purRemaining(pur);
  const purBalanceClass=rem>0?'text-red':'text-green';
  G('view-pur-title').innerHTML=`<i class="ti ti-truck" style="color:var(--amber)"></i> فاتورة ${pur.num}`;
  G('view-pur-body').innerHTML=`<div class="card" style="margin-bottom:12px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border)"><div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--purple));display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px"><i class="ti ti-building-store"></i></div><div><div style="font-size:15px;font-weight:700">${currentCompany().name}</div><div style="font-size:11px;color:var(--text-muted)">${currentCompany().address}</div></div><div style="margin-right:auto;text-align:left"><div style="font-size:11px;color:var(--text-muted)">فاتورة شراء</div><div style="font-size:13px;font-weight:700;color:var(--accent)">${pur.supName}</div><div style="font-size:10px;color:var(--text-muted);font-family:var(--mono)">${pur.date}</div></div></div><div class="soa-meta"><div><div class="soa-ml">الهاتف</div><div class="soa-mv">${pur.supName}</div></div><div><div class="soa-ml">الرصيد</div><div class="soa-mv ${purBalanceClass}">${fmt(rem)} د.ل</div></div><div><div class="soa-ml">المستلم</div><div class="soa-mv">${pur.receivedStock?'<span class="badge b-green">تم الاستلام</span>':'<span class="badge b-amber">غير مستلم</span>'}</div></div></div></div><div class="card" style="margin-bottom:12px"><div class="card-hd"><h3><i class="ti ti-list"></i> بنود الفاتورة</h3></div><div class="tbl-wrap"><table><thead><tr><th>الصنف</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th></tr></thead><tbody>${pur.lines.map(l=>`<tr><td class="td-bold">${l.name}</td><td class="td-mono">${l.qty}</td><td class="td-mono">${fmt(l.price)}</td><td class="td-mono" style="font-weight:700">${fmt(l.total)}</td></tr>`).join('')}</tbody></table></div></div><div class="card"><div class="card-hd" style="margin-bottom:8px"><h3><i class="ti ti-calculator" style="color:var(--accent)"></i> ملخص الفاتورة</h3></div><div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0"><div style="font-size:12px;color:var(--text-muted)">الإجمالي</div><div style="font-weight:700;color:var(--accent)">${fmt(pur.total)} د.ل</div></div><div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0"><div style="font-size:12px;color:var(--text-muted)">المدفوع</div><div style="font-weight:700;color:var(--green)">${fmt(paid)} د.ل</div></div><div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0"><div style="font-size:12px;color:var(--text-muted)">المتبقي</div><div class="${purBalanceClass}" style="font-weight:700">${fmt(rem)} د.ل</div></div></div>`;
  G('view-pur-footer').innerHTML=`<button class="btn" onclick="closeModal('m-view-pur')">إغلاق</button><button class="btn btn-secondary" onclick="printInvoice('purchase',${pur.id})"><i class="ti ti-printer"></i> تصدير PDF</button>`;
  openModal('m-view-pur');
}

function printInvoice(type,id){
  let title='';let header='';let num='';let date='';let name='';let lines=[];let total=0;let paid=0;let rem=0;
  const company=currentCompany();
  if(type==='sale'){
    const inv=DB.invs.find(x=>x.id===id);if(!inv){toast('الفاتورة غير موجودة','error');return}
    title='فاتورة بيع';num=inv.num;date=inv.date;name=inv.custName;lines=inv.lines;total=inv.total;paid=invPaid(inv);rem=invRemaining(inv);
  } else {
    const pur=DB.purs.find(x=>x.id===id);if(!pur){toast('فاتورة الشراء غير موجودة','error');return}
    title='فاتورة شراء';num=pur.num;date=pur.date;name=pur.supName;lines=pur.lines;total=pur.total;paid=purPaid(pur);rem=purRemaining(pur);
  }
  const win=window.open('','_blank','width=900,height=1100');
  if(!win){toast('تعذر فتح نافذة الطباعة','error');return}
  const html=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>${title} ${num}</title><style>
  @page{size:A4 portrait;margin:20mm}
  body{font-family:Helvetica,Arial,sans-serif;direction:rtl;color:#111;margin:0;padding:20px}
  h1,h2,h3{margin:0}
  .header{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:20px}
  .company{max-width:55%}
  .company h1{font-size:24px;margin-bottom:8px}
  .company p{margin:2px 0;font-size:12px}
  .info{font-size:12px;text-align:left}
  .info div{margin-bottom:6px}
  table{width:100%;border-collapse:collapse;margin-top:20px;font-size:12px}
  th,td{border:1px solid #444;padding:8px}
  th{background:#f3f3f3}
  .totals{margin-top:18px;width:100%;font-size:12px}
  .totals div{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #ddd}
  .totals div:last-child{border-bottom:none;font-weight:700}
  .footer{margin-top:25px;font-size:11px;color:#555}
  </style></head><body>
    <div class="header"><div class="company"><h1>${company.name}</h1><p>${company.address}</p><p>${company.phone||''}</p></div><div class="info"><div><strong>${title}</strong></div><div>الرقم: ${num}</div><div>التاريخ: ${date}</div><div>${type==='sale'?'الزبون':'المورد'}: ${name}</div></div></div>
    <table><thead><tr><th>الصنف</th><th>الكمية</th><th>السعر</th>${type==='sale'?'<th>الخصم</th>':''}<th>الإجمالي</th></tr></thead><tbody>${lines.map(l=>`<tr><td>${l.name}</td><td>${l.qty}</td><td>${fmt(l.price)}</td>${type==='sale'?`<td>${l.disc>0?fmt(l.disc):'—'}</td>`:''}<td>${fmt(l.total)}</td></tr>`).join('')}</tbody></table>
    <div class="totals"><div><span>الإجمالي</span><span>${fmt(total)} د.ل</span></div>${type==='sale'?`<div><span>المدفوع</span><span>${fmt(paid)} د.ل</span></div><div><span>المتبقي</span><span>${fmt(rem)} د.ل</span></div>`:''}</div>
    <div class="footer">${company.note||''}</div>
    <script>window.onload=function(){window.print();window.onafterprint=function(){window.close()}}<\/script>
  </body></html>`;
  win.document.write(html);win.document.close();
}

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
  let purs=[...DB.purs].reverse();
  if(term){purs=purs.filter(p=>normalizeText(p.num).includes(term)||normalizeText(p.supName).includes(term)||normalizeText(p.date).includes(term));}
  if(!purs.length){tb.innerHTML=emptyRow(8,term?'لا توجد نتائج لهذا البحث':'لا توجد فواتير شراء.');return}
  tb.innerHTML=purs.map(p=>{
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
  }).join('')
}

/* ═══ SUPPLIER PAYMENTS ═══ */
function saveSupPay(){
  const supId=parseInt(G('sp-sup').value);
  if(!supId){toast('اختر المورد','error');return}
  const amount=parseFloat(G('sp-amt').value)||0;
  if(amount<=0){toast('أدخل مبلغاً صحيحاً','error');return}
  const sup=DB.sups.find(x=>x.id===supId);
  const purNum=G('sp-pur').value;
  const pur=purNum?DB.purs.find(x=>x.num===purNum):null;
  const date=G('sp-date').value;
  const pid='SPAY-'+String(DB.cSpay).padStart(5,'0');DB.cSpay++;
  DB.supPayments.push({
    id:pid,supId,supName:sup?.name||'—',
    purId:pur?.id||null,purNum:purNum||'—',
    amount,date,mode:_spPay,notes:G('sp-notes').value
  });
  addLog('دفعة للمورد (خزينة-)',`${pid} — "${sup?.name}" — ${fmt(amount)} د.ل — ${_spPay}`,'#f05454');
  saveState();
  closeModal('m-suppay');renderSupPays();renderPurs();renderSups();updateStats();renderFin();
  toast(`تم تسجيل الدفعة ${pid} للمورد ${sup?.name}`)
}
function renderSupPays(){
  const tb=G('suppay-tb');
  if(!DB.supPayments.length){tb.innerHTML=emptyRow(6);return}
  tb.innerHTML=[...DB.supPayments].reverse().map(p=>`<tr>
    <td class="td-bold" style="color:var(--teal)">${p.id}</td>
    <td>${p.supName}</td>
    <td class="td-mono">${p.purNum||'—'}</td>
    <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(p.amount)} د.ل</td>
    <td>${payLbl(p.mode)}</td>
    <td class="td-mono">${p.date}</td>
  </tr>`).join('')
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
  closeModal('m-return');renderRets();renderItems();
  toast(`تم تسجيل المرتجع ${num}`)
}
function renderRets(search=''){
  const tb=G('ret-tb');
  const term=normalizeText(search);
  let rets=[...DB.rets].reverse();
  if(term){rets=rets.filter(r=>normalizeText(r.num).includes(term)||normalizeText(r.invNum).includes(term)||normalizeText(r.custName).includes(term)||normalizeText(r.reason).includes(term));}
  if(!rets.length){tb.innerHTML=emptyRow(7,term?'لا توجد نتائج لهذا البحث':'لا توجد مرتجعات.');return}
  const qcLbl=s=>s==='passed'?'<span class="badge b-green">اجتاز</span>':s==='failed'?'<span class="badge b-red">رُفض</span>':'<span class="badge b-amber">قيد الفحص</span>';
  tb.innerHTML=rets.map(r=>`<tr>
    <td class="td-bold" style="color:var(--red)">${r.num}</td>
    <td style="color:var(--accent)">${r.invNum}</td>
    <td>${r.custName}</td>
    <td class="td-mono">${fmt(r.amt)} د.ل</td>
    <td style="color:var(--text-muted)">${r.reason||'—'}</td>
    <td>${qcLbl(r.qcStatus)}</td>
    <td class="td-mono">${r.date}</td>
  </tr>`).join('')
}

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
    let rb=0;
    const rows=txns.map(t=>{rb+=t.cr-t.dr;const bcClass=rb>=0?'text-green':'text-red';return`<tr><td class="td-mono">${t.date}</td><td>${t.desc}</td><td class="td-mono text-red">${t.dr>0?fmt(t.dr):'—'}</td><td class="td-mono text-green">${t.cr>0?fmt(t.cr):'—'}</td><td class="td-mono ${bcClass}" style="font-weight:700">${fmt(rb)}</td></tr>`}).join('');
    const balanceClass=rb>=0?'text-green':'text-red';
    const ifs=DB.purs.filter(p=>p.supId===id);
    const now_=new Date();
    const ag=(d1,d2)=>ifs.filter(x=>{const d=(now_-new Date(x.date))/86400000;return d>=d1&&d<d2}).reduce((s,x)=>s+purRemaining(x),0);
    out.innerHTML=`<div class="card" style="margin-bottom:12px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border)"><div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--purple));display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px"><i class="ti ti-building-store"></i></div><div><div style="font-size:15px;font-weight:700">${company.name}</div><div style="font-size:11px;color:var(--text-muted)">${company.address}</div></div><div style="margin-right:auto;text-align:left"><div style="font-size:11px;color:var(--text-muted)">كشف حساب المورد</div><div style="font-size:13px;font-weight:700;color:var(--accent)">${s.name}</div><div style="font-size:10px;color:var(--text-muted);font-family:var(--mono)">${from||'البداية'} — ${to||'الآن'}</div></div></div><div class="soa-meta"><div><div class="soa-ml">الهاتف</div><div class="soa-mv">${s.phone||'—'}</div></div><div><div class="soa-ml">العنوان</div><div class="soa-mv">${s.addr||'—'}</div></div><div><div class="soa-ml">الرصيد الختامي</div><div class="soa-mv ${balanceClass}">${fmt(Math.abs(rb))} د.ل ${rb>=0?'(دائن)':'(مدين)'}</div></div></div></div><div class="aging-grid"><div class="aging-cell"><div class="l" style="color:var(--green)">0–30 يوم</div><div class="v" style="color:var(--green)">${fmt(ag(0,30))}</div></div><div class="aging-cell"><div class="l" style="color:var(--accent)">31–60 يوم</div><div class="v" style="color:var(--accent)">${fmt(ag(30,60))}</div></div><div class="aging-cell"><div class="l" style="color:var(--amber)">61–90 يوم</div><div class="v" style="color:var(--amber)">${fmt(ag(60,90))}</div></div><div class="aging-cell"><div class="l" style="color:var(--red)">أكثر من 90</div><div class="v" style="color:var(--red)">${fmt(ag(90,99999))}</div></div></div><div class="card"><div class="card-hd"><h3><i class="ti ti-list" style="color:var(--accent)"></i> سجل الحركات</h3></div><div class="tbl-wrap"><table><thead><tr><th>التاريخ</th><th>البيان</th><th>مدين (فواتير)</th><th>دائن (دفعات)</th><th>الرصيد المتراكم</th></tr></thead><tbody>${rows||emptyRow(5,'لا حركات في هذه الفترة')}</tbody></table></div><div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:12px;padding-top:10px;border-top:1px solid var(--border)"><div style="font-size:11px;color:var(--text-muted)">${numToWords(Math.abs(rb))}</div><div style="text-align:left"><div style="font-size:10px;color:var(--text-muted)">الرصيد الختامي</div><div class="${rb>=0?'text-green':'text-red'}" style="font-size:18px;font-weight:700;font-family:var(--mono)">${fmt(Math.abs(rb))} د.ل</div></div></div></div>`;
    return;
  }
  const c=DB.custs.find(x=>x.id===id);
  if(!c){out.innerHTML='<div class="card" style="text-align:center;color:var(--text-muted);padding:40px"><i class="ti ti-user-circle" style="font-size:36px;display:block;margin-bottom:8px;opacity:.3"></i>اختر زبوناً لعرض كشف حسابه</div>';return}
  let txns=[];
  DB.invs.filter(i=>i.custId===id).forEach(i=>{if(from&&i.date<from)return;if(to&&i.date>to)return;txns.push({date:i.date,desc:`فاتورة بيع ${i.num}`,dr:i.total,cr:0,type:'inv'})});
  DB.payments.filter(p=>p.custId===id).forEach(p=>{if(from&&p.date<from)return;if(to&&p.date>to)return;txns.push({date:p.date,desc:`دفعة ${p.id} — ${p.mode==='cash'?'نقدي':p.mode==='check'?'صك':'آجَل'}`,dr:0,cr:p.amount,type:'pay'})});
  if(c.openBal>0)txns.unshift({date:'—',desc:'رصيد افتتاحي',dr:c.openBal,cr:0,type:'open'});
  txns.sort((a,b)=>a.date.localeCompare(b.date));
  let rb=0;
  const rows=txns.map(t=>{rb+=t.cr-t.dr;const bcClass=rb>=0?'text-green':'text-red';return`<tr><td class="td-mono">${t.date}</td><td>${t.desc}</td><td class="td-mono text-red">${t.dr>0?fmt(t.dr):'—'}</td><td class="td-mono text-green">${t.cr>0?fmt(t.cr):'—'}</td><td class="td-mono ${bcClass}" style="font-weight:700">${fmt(rb)}</td></tr>`}).join('');
  const balanceClass=rb<=0?'text-red':'text-green';
  const invs=DB.invs.filter(i=>i.custId===id);
  const now_=new Date();
  const ag=(d1,d2)=>invs.filter(x=>{const d=(now_-new Date(x.date))/86400000;return d>=d1&&d<d2}).reduce((s,x)=>s+invRemaining(x),0);
  out.innerHTML=`<div class="card" style="margin-bottom:12px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border)"><div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--purple));display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px"><i class="ti ti-building-store"></i></div><div><div style="font-size:15px;font-weight:700">${company.name}</div><div style="font-size:11px;color:var(--text-muted)">${company.address}</div></div><div style="margin-right:auto;text-align:left"><div style="font-size:11px;color:var(--text-muted)">كشف حساب</div><div style="font-size:13px;font-weight:700;color:var(--accent)">${c.name}</div><div style="font-size:10px;color:var(--text-muted);font-family:var(--mono)">${from||'البداية'} — ${to||'الآن'}</div></div></div><div class="soa-meta"><div><div class="soa-ml">الهاتف</div><div class="soa-mv">${c.phone||'—'}</div></div><div><div class="soa-ml">العنوان</div><div class="soa-mv">${c.addr||'—'}</div></div><div><div class="soa-ml">الرصيد الختامي</div><div class="soa-mv ${balanceClass}">${fmt(Math.abs(rb))} د.ل ${rb<=0?'(مدين)':'(دائن)'}</div></div></div></div><div class="aging-grid"><div class="aging-cell"><div class="l" style="color:var(--green)">0–30 يوم</div><div class="v" style="color:var(--green)">${fmt(ag(0,30))}</div></div><div class="aging-cell"><div class="l" style="color:var(--accent)">31–60 يوم</div><div class="v" style="color:var(--accent)">${fmt(ag(30,60))}</div></div><div class="aging-cell"><div class="l" style="color:var(--amber)">61–90 يوم</div><div class="v" style="color:var(--amber)">${fmt(ag(60,90))}</div></div><div class="aging-cell"><div class="l" style="color:var(--red)">أكثر من 90</div><div class="v" style="color:var(--red)">${fmt(ag(90,99999))}</div></div></div><div class="card"><div class="card-hd"><h3><i class="ti ti-list" style="color:var(--accent)"></i> سجل الحركات</h3></div><div class="tbl-wrap"><table><thead><tr><th>التاريخ</th><th>البيان</th><th>مدين (فواتير)</th><th>دائن (دفعات)</th><th>الرصيد المتراكم</th></tr></thead><tbody>${rows||emptyRow(5,'لا حركات في هذه الفترة')}</tbody></table></div><div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:12px;padding-top:10px;border-top:1px solid var(--border)"><div style="font-size:11px;color:var(--text-muted)">${numToWords(Math.abs(rb))}</div><div style="text-align:left"><div style="font-size:10px;color:var(--text-muted)">الرصيد الختامي</div><div class="${rb<=0?'text-red':'text-green'}" style="font-size:18px;font-weight:700;font-family:var(--mono)">${fmt(Math.abs(rb))} د.ل</div></div></div></div>`
}

/* ═══ FINANCE ═══ */
function finTab(t,el){
  document.querySelectorAll('#p-finance .tab').forEach(x=>x.classList.remove('on'));
  el.classList.add('on');
  ['cash','check','supout','credit'].forEach(x=>{const d=G(`fin-${x}`);if(d)d.style.display=x===t?'block':'none'})
}
function renderFin(){
  // Cash in from customers (cash payments only)
  const cashIn=DB.payments.filter(p=>p.mode==='cash').reduce((s,p)=>s+p.amount,0);
  const checkIn=DB.payments.filter(p=>p.mode==='check').reduce((s,p)=>s+p.amount,0);
  const supOut=DB.supPayments.reduce((s,p)=>s+p.amount,0);
  G('f-ci').textContent=fmt(cashIn);G('f-chv').textContent=fmt(checkIn);G('f-sup-out').textContent=fmt(supOut);

  // Cash in table
  const cashPays=DB.payments.filter(p=>p.mode==='cash');
  G('cash-tb').innerHTML=cashPays.length?[...cashPays].reverse().map(p=>`<tr>
    <td class="td-mono">${p.date}</td>
    <td>${p.invNum}</td>
    <td>${p.custName}</td>
    <td class="td-mono" style="color:var(--green);font-weight:700">${fmt(p.amount)} د.ل</td>
  </tr>`).join(''):emptyRow(4);

  // Checks
  const checkPays=DB.payments.filter(p=>p.mode==='check');
  G('chk-tb').innerHTML=checkPays.length?[...checkPays].reverse().map(p=>`<tr>
    <td>${p.invNum}</td>
    <td class="td-mono">${p.date}</td>
    <td>${p.custName}</td>
    <td class="td-mono">${fmt(p.amount)} د.ل</td>
    <td><span class="badge b-amber">قيد التحصيل</span></td>
  </tr>`).join(''):emptyRow(5);

  // Sup out
  G('supout-tb').innerHTML=DB.supPayments.length?[...DB.supPayments].reverse().map(p=>`<tr>
    <td class="td-mono">${p.date}</td>
    <td>${p.id} ${p.purNum!=='—'?`— فاتورة ${p.purNum}`:''}</td>
    <td>${p.supName}</td>
    <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(p.amount)} د.ل</td>
    <td>${payLbl(p.mode)}</td>
  </tr>`).join(''):emptyRow(5);

  // Credit (unpaid invoices)
  const creditInvs=DB.invs.filter(i=>invRemaining(i)>0.001);
  G('crd-tb').innerHTML=creditInvs.length?[...creditInvs].reverse().map(i=>`<tr>
    <td style="color:var(--accent)">${i.num}</td>
    <td>${i.custName}</td>
    <td class="td-mono">${fmt(i.total)} د.ل</td>
    <td class="td-mono" style="color:var(--green)">${fmt(invPaid(i))} د.ل</td>
    <td class="td-mono" style="color:var(--red);font-weight:700">${fmt(invRemaining(i))} د.ل</td>
    <td class="td-mono">${i.date}</td>
  </tr>`).join(''):emptyRow(6,'لا ذمم مستحقة ✓')
}

/* ═══ P&L ═══ */
function renderPL(){
  // Only count delivered invoices for P&L
  const deliveredInvs=DB.invs.filter(i=>i.dlvStatus==='delivered');
  let rev=0,cogs=0;
  const byItem={};
  deliveredInvs.forEach(inv=>{
    inv.lines.forEach(l=>{
      rev+=l.total;
      const cost=l.buyPrice*l.qty;cogs+=cost;
      if(!byItem[l.itemId])byItem[l.itemId]={name:l.name,qty:0,rev:0,cost:0};
      byItem[l.itemId].qty+=l.qty;
      byItem[l.itemId].rev+=l.total;
      byItem[l.itemId].cost+=cost;
    })
  });
  const gp=rev-cogs;
  G('pl-rev').textContent=fmt(rev);G('pl-cogs').textContent=fmt(cogs);G('pl-gp').textContent=fmt(gp);
  G('pl-margin').textContent=rev>0?((gp/rev)*100).toFixed(1)+'%':'0%';
  const tb=G('pl-tb');
  const rows=Object.values(byItem).sort((a,b)=>b.rev-a.rev);
  if(!rows.length){tb.innerHTML=emptyRow(6,'لا مبيعات مسلَّمة بعد');return}
  tb.innerHTML=rows.map(r=>{
    const profit=r.rev-r.cost;
    const margin=r.rev>0?((profit/r.rev)*100).toFixed(1):'0';
    return`<tr>
      <td class="td-bold">${r.name}</td>
      <td class="td-mono">${r.qty}</td>
      <td class="td-mono">${fmt(r.rev)} د.ل</td>
      <td class="td-mono">${fmt(r.cost)} د.ل</td>
      <td class="td-mono ${profit>=0?'text-green':'text-red'}" style="font-weight:700">${fmt(profit)} د.ل</td>
      <td><span class="badge ${profit>=0?'b-green':'b-red'}">${margin}%</span></td>
    </tr>`
  }).join('')
}

/* ═══ AUDIT ═══ */
function renderAudit(){
  const d=G('audit-list');
  if(!DB.log.length){d.innerHTML='<div class="empty-st" style="padding:40px"><i class="ti ti-shield-check" style="font-size:32px;display:block;margin-bottom:8px;opacity:.2"></i><span>لا سجلات بعد</span></div>';return}
  d.innerHTML=DB.log.map(l=>`<div class="log-entry">
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
  d.innerHTML=DB.log.slice(0,6).map(l=>`<div class="log-entry" style="padding:6px 0">
    <div class="log-dot" data-color="${l.color}" style="margin-top:4px"></div>
    <div class="log-text" style="font-size:11px">
      <span style="font-weight:600;color:var(--text-primary)">${l.action}</span> — ${l.detail}
      <div class="log-time">${l.date} ${l.time}</div>
    </div>
  </div>`).join('');
  d.querySelectorAll('.log-dot').forEach(el=>{const c=el.dataset.color;if(c)el.style.background=c})
}

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
  renderDashLog()
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
