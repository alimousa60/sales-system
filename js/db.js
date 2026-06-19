/* ═══════════════════════════════════════════════
   DATABASE
═══════════════════════════════════════════════ */
const STORAGE_KEY='salesSystemDB';
const SESSION_KEY='salesSystemSession';
const AUTH_TOKEN_KEY='salesSystemAuthToken';
const AUTH_USER_KEY='salesSystemAuthUser';
const API_BASE_URL=(window.location.port === '3000' || window.location.port === '')
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
const fmt=(n,d=3)=>parseFloat(n||0).toFixed(d);
const today=()=>new Date().toISOString().split('T')[0];
const THEME_KEY='salesSystemTheme';
let currentSearch='';

function normalizeText(value){
  return String(value||'').toLowerCase().trim();
}

function baseCompany(){
  return {id:1,name:'المؤسسة التجارية',address:'طرابلس، ليبيا',phone:'',note:'',logo:'',taxNo:'',items:[],custs:[],sups:[],invs:[],purs:[],payments:[],supPayments:[],rets:[],log:[],pendingSync:[],lastSynced:null,cI:1,cP:1,cRet:1,cPay:1,cSpay:1};
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
function companyLogoHtml(company,height){
  height=height||50;
  if(!company||!company.logo)return'';
  return '<img src="'+company.logo+'" style="height:'+height+'px;max-width:'+(height*3)+'px;object-fit:contain;border-radius:6px">';
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
    users:'ابحث عن مستخدم أو اسم حساب...',
    suppay:'ابحث عن دفعة أو مورد أو رقم فاتورة...',
    finance:'ابحث في الحركات المالية...',
    pl:'ابحث في الأصناف أو الأرباح...',
    audit:'ابحث في السجلات...',
    soa:'ابحث في كشف الحساب...',
    hrm:'ابحث عن موظف...'
  };
  input.placeholder = placeholders[page] || 'بحث سريع في كل الصفحات...';
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
  if(['admin','system_admin'].includes(currentUser?.role))return true;
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

/* ═══ BACKUP / EXPORT / IMPORT ═══ */
function exportLocalBackup(){
  const data={...DB,exportedAt:new Date().toISOString(),version:'3.0'};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`sales-backup-${today()}.json`;
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('تم تصدير النسخة الاحتياطية بنجاح');
}
function importLocalBackup(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=function(ev){
    try{
      const data=JSON.parse(ev.target.result);
      if(!data||typeof data!=='object'){toast('ملف غير صالح','error');return}
      if(!confirm('سيتم استبدال جميع البيانات الحالية. هل أنت متأكد؟'))return;
      const keys=['items','invs','purs','custs','sups','payments','supPayments','rets','log','cI','cP','cRet','cPay','cSpay','companyId','companies'];
      keys.forEach(k=>{if(data[k]!==undefined)DB[k]=data[k]});
      saveState();
      toast(`تم استيراد البيانات بنجاح — ${(data.items||[]).length} صنف، ${(data.invs||[]).length} فاتورة بيع`);
      refreshCurrentPage();
    }catch(err){toast('خطأ في قراءة الملف: '+err.message,'error')}
  };
  reader.readAsText(file);
  e.target.value='';
}
async function saveCloudBackup(){
  if(!currentUser){toast('سجّل الدخول أولاً','error');return}
  const data={...DB};
  try{
    const token=localStorage.getItem(AUTH_TOKEN_KEY);
    const r=await fetch(API_BASE_URL+'/backups',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({data,label:'نسخة '+new Date().toLocaleDateString('ar')})});
    const j=await r.json();
    if(j.status==='success'){toast('تم الحفظ في السحابة بنجاح');loadCloudBackups()}
    else{toast(j.message||'خطأ في الحفظ','error')}
  }catch(err){toast('خطأ في الاتصال بالسحابة: '+err.message,'error')}
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
        const dt=new Date(b.createdAt).toLocaleString('ar');
        return`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--line);font-size:13px">
          <div><strong>${b.label||'نسخة'}</strong> <span style="color:var(--muted)">${dt} — ${sz}</span></div>
          <div style="display:flex;gap:4px">
            <button class="btn btn-sm btn-icon" onclick="downloadCloudBackup('${b._id}')" title="تحميل"><i class="ti ti-download"></i></button>
            <button class="btn btn-sm btn-danger btn-icon" onclick="deleteCloudBackup('${b._id}')" title="حذف"><i class="ti ti-trash"></i></button>
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
      toast('تم تحميل النسخة الاحتياطية');
    }
  }catch(err){toast('خطأ في التحميل','error')}
}
async function deleteCloudBackup(id){
  if(!confirm('حذف هذه النسخة الاحتياطية نهائياً؟'))return;
  try{
    const token=localStorage.getItem(AUTH_TOKEN_KEY);
    await fetch(API_BASE_URL+'/backups/'+id,{method:'DELETE',headers:{'Authorization':'Bearer '+token}});
    toast('تم حذف النسخة الاحتياطية');
    loadCloudBackups();
  }catch(err){toast('خطأ في الحذف','error')}
}
