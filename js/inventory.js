/* ═══ SMART ITEM SEARCH (Autocomplete) ═══ */
let _itemSearchIdx={}; // prefix -> current highlighted index
let _itemSearchResults={}; // prefix -> filtered results

function itemSearch(val,prefix){
  const term=(val||'').trim().toLowerCase();
  const dd=G(prefix+'-item-dd');
  const hidden=G(prefix+'-item-sel');
  if(!dd)return;
  _itemSearchIdx[prefix]=-1;
  if(!term){
    // Show all items when empty
    _itemSearchResults[prefix]=[...DB.items].slice(0,50);
  } else {
    _itemSearchResults[prefix]=DB.items.filter(x=>{
      const bc=String(x.barcode||'').toLowerCase();
      const nm=String(x.name||'').toLowerCase();
      const cd=String(x.code||'').toLowerCase();
      return nm.includes(term)||bc.includes(term)||cd.includes(term);
    }).slice(0,30);
  }
  const results=_itemSearchResults[prefix];
  if(!results.length){
    dd.innerHTML=`<div class="item-search-empty">لا توجد نتائج — اضغط Enter لإضافة صنف جديد</div>`;
    dd.classList.add('on');
    return;
  }
  const t=term;
  dd.innerHTML=results.map((x,i)=>{
    let nameHtml=x.name;
    if(t){
      const idx=x.name.toLowerCase().indexOf(t);
      if(idx>=0) nameHtml=x.name.substring(0,idx)+'<mark>'+x.name.substring(idx,idx+t.length)+'</mark>'+x.name.substring(idx+t.length);
    }
    const stock=x.qty>0?`<span class="isb-stock">${x.qty} ${x.unit||''}</span>`:`<span class="isb-stock out">نفد</span>`;
    return`<div class="item-search-row${i===_itemSearchIdx[prefix]?' active':''}" onmousedown="selectItem(${x.id},'${prefix}')" data-idx="${i}">
      <div class="isb-info">
        <div class="isb-name">${nameHtml}</div>
        <div class="isb-meta">${x.code||''} ${x.barcode?'• '+x.barcode:''} ${x.cat?'• '+x.cat:''}</div>
      </div>
      <div class="isb-right">
        <div class="isb-price">${fmt(x.sell)} د.ل</div>
        ${stock}
      </div>
    </div>`;
  }).join('');
  dd.classList.add('on');
  // Position dropdown with fixed positioning to escape modal overflow
  const wrap=G(prefix+'-item-wrap');
  if(wrap){
    const r=wrap.getBoundingClientRect();
    dd.style.position='fixed';
    dd.style.top=(r.bottom+2)+'px';
    dd.style.left=r.left+'px';
    dd.style.width=r.width+'px';
    dd.style.zIndex='99999';
  }
}

function selectItem(id,prefix){
  const item=DB.items.find(x=>x.id===id);
  if(!item)return;
  const hidden=G(prefix+'-item-sel');
  const input=G(prefix+'-item-search');
  hidden.value=id;
  input.value=item.name;
  // Auto-fill price
  if(prefix==='si'){
    G('si-price').value=item.sell;
    calcSiLine();
  } else {
    G('pi-price').value=item.buy;
    calcPiLine();
  }
  closeItemSearch(prefix);
  // Focus qty field
  G(prefix+'-qty').focus();
}

function itemSearchKey(e,prefix){
  const dd=G(prefix+'-item-dd');
  const results=_itemSearchResults[prefix]||[];
  if(e.key==='ArrowDown'){
    e.preventDefault();
    _itemSearchIdx[prefix]=Math.min(_itemSearchIdx[prefix]+1,results.length-1);
    _highlightItem(dd,prefix);
  } else if(e.key==='ArrowUp'){
    e.preventDefault();
    _itemSearchIdx[prefix]=Math.max(_itemSearchIdx[prefix]-1,0);
    _highlightItem(dd,prefix);
  } else if(e.key==='Enter'){
    e.preventDefault();
    if(_itemSearchIdx[prefix]>=0 && results[_itemSearchIdx[prefix]]){
      selectItem(results[_itemSearchIdx[prefix]].id,prefix);
    } else if(results.length===1){
      selectItem(results[0].id,prefix);
    }
  } else if(e.key==='Escape'){
    closeItemSearch(prefix);
  }
}

function _highlightItem(dd,prefix){
  const rows=dd.querySelectorAll('.item-search-row');
  rows.forEach((r,i)=>r.classList.toggle('active',i===_itemSearchIdx[prefix]));
  if(rows[_itemSearchIdx[prefix]]) rows[_itemSearchIdx[prefix]].scrollIntoView({block:'nearest'});
}

function closeItemSearch(prefix){
  const dd=G(prefix+'-item-dd');
  if(dd)dd.classList.remove('on');
}

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
  updateStats();
  broadcastChange('items', { id: item.id, name });
  toast(`"${name}" — سعر البيع: ${fmt(item.sell)} د.ل`,{icon:'ti-package',title:'صنف جديد'})
}
function filterItems(q){renderItems(q)}
function renderItems(q=''){
  const term=normalizeText(q);
  const catFilter=G('inv-cat-filter')?.value||'';
  const stockFilter=G('inv-stock-filter')?.value||'';
  const catSel=G('inv-cat-filter');
  if(catSel&&!catSel._populated){
    const cats=[...new Set(DB.items.map(x=>x.cat).filter(Boolean))].sort();
    catSel.innerHTML='<option value="">كل الفئات</option>'+cats.map(c=>`<option value="${c}">${c}</option>`).join('');
    catSel._populated=true;
  }
  let full=DB.items;
  if(term){full=full.filter(x=>normalizeText(x.name).includes(term)||normalizeText(x.barcode).includes(term)||normalizeText(x.code).includes(term)||normalizeText(x.cat).includes(term))}
  if(catFilter){full=full.filter(x=>x.cat===catFilter)}
  if(stockFilter==='out'){full=full.filter(x=>x.qty===0)}
  else if(stockFilter==='low'){full=full.filter(x=>x.qty>0&&x.qty<=x.reorder)}
  else if(stockFilter==='ok'){full=full.filter(x=>x.qty>x.reorder)}
  const {data,pages,page,start}=getPageData('inv-tb', full);
  const tb=G('inv-tb');
  if(!full.length){tb.innerHTML=emptyRow(10,term?'لا توجد نتائج لهذا البحث':'لا توجد أصناف — أضف صنفاً جديداً.');renderPag('inv-tb',0,renderItems);return}
  tb.innerHTML=data.map(x=>{
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
  }).join('');
  renderPag('inv-tb',full.length,renderItems)
}
function delItem(id){
  const it=DB.items.find(x=>x.id===id);
  if(!confirm(`حذف الصنف "${it?.name}"?`))return;
  addLog('حذف صنف',`"${it?.name}"`,'#f05454');
  DB.items=DB.items.filter(x=>x.id!==id);
  saveState();
  renderItems();updateStats();
  broadcastChange('items', { id, deleted: true });
}

function renderUsers(search=''){
  const tb=G('user-tb');
  if(!tb)return;
  if(!requireAdmin()){tb.innerHTML=emptyRow(4,'هذه الصفحة متاحة للمشرف فقط');renderPag('user-tb',0,renderUsers);return}
  const term=normalizeText(search);
  const roleFilter=G('user-role-filter')?.value||'';
  const statusFilter=G('user-status-filter')?.value||'';
  let full=DB.users;
  if(term){full=full.filter(u=>normalizeText(u.name).includes(term)||normalizeText(u.username).includes(term)||normalizeText(u.role).includes(term))}
  if(roleFilter){full=full.filter(u=>u.role===roleFilter)}
  if(statusFilter){full=full.filter(u=>{const st=u.status||(u.isActive===false?'inactive':'active');return st===statusFilter})}
  if(!full.length){tb.innerHTML=emptyRow(4,term?'لا توجد نتائج لهذا البحث':'لا توجد حسابات مستخدمين.');renderPag('user-tb',0,renderUsers);return}
  const {data}=getPageData('user-tb', full);
  tb.innerHTML=data.map(u=>{
    const status = u.status || (u.isActive === false ? 'inactive' : 'active');
    const roleLabel = u.role==='admin'||u.role==='system_admin'?'مشرف':u.role==='sales'?'مبيعات':u.role==='inventory'?'مخازن':'مستخدم';
    const roleClass = u.role==='admin'||u.role==='system_admin'?'b-purple':u.role==='sales'?'b-blue':u.role==='inventory'?'b-teal':'b-gray';
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
  }).join('');
  renderPag('user-tb',full.length,renderUsers)
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
  loadCloudBackups();
}
function openCompanyModal(id){
  if(!requireAdmin()) return;
  editingCompanyId = id===null ? null : id || DB.companyId;
  const title = G('m-company-title');
  const co = editingCompanyId===null ? {name:'',address:'',phone:'',note:'',logo:'',taxNo:''} : currentCompany();
  if(title) title.textContent = editingCompanyId===null ? 'شركة جديدة' : 'بيانات المؤسسة';
  G('co-name').value=co.name||'';
  G('co-address').value=co.address||'';
  G('co-phone').value=co.phone||'';
  G('co-note').value=co.note||'';
  if(G('co-tax-no'))G('co-tax-no').value=co.taxNo||'';
  window._pendingLogo=co.logo||'';
  const preview=G('co-logo-preview');
  if(preview){
    if(co.logo) preview.innerHTML='<img src="'+co.logo+'" style="width:100%;height:100%;object-fit:contain">';
    else preview.innerHTML='<i class="ti ti-photo" style="font-size:24px;color:var(--text-muted)"></i>';
  }
  const input=G('co-logo-input');
  if(input) input.value='';
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
  if(pg==='returns') renderRets();
  if(pg==='purchases') renderPurs();
  if(pg==='suppay') renderSupPays(G('spay-search')?.value||'');
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
    broadcastChange('users', { name, role });
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
  const admins=DB.users.filter(u=>['admin','system_admin'].includes(String(u.role).toLowerCase()));
  if(['admin','system_admin'].includes(String(user.role).toLowerCase()) && admins.length===1){toast('يجب أن يبقى مشرف واحد على الأقل','error');return}
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
    broadcastChange('users', { id, deleted: true });
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
  addLog('إضافة زبون',`"${name}" رصيد افتتاحي: ${fmt(openBal)} د.ل`,'#9b72f7');
  closeModal('m-cust');renderCusts();
  broadcastChange('customers', { id, name });
  toast(`"${name}" — رصيد افتتاحي: ${fmt(openBal)} د.ل`,{icon:'ti-user',title:'زبون جديد'})
}
function renderCusts(search=''){
  const tb=G('cust-tb');
  const term=normalizeText(search);
  const full=term?DB.custs.filter(c=>normalizeText(c.name).includes(term)||normalizeText(c.phone).includes(term)||normalizeText(c.addr).includes(term)):DB.custs;
  if(!full.length){tb.innerHTML=emptyRow(6,term?'لا توجد نتائج لهذا البحث':'لا يوجد زبائن.');renderPag('cust-tb',0,renderCusts);return}
  const {data}=getPageData('cust-tb', full);
  tb.innerHTML=data.map(c=>{
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
  }).join('');
  renderPag('cust-tb',full.length,renderCusts)
}
function openSOA(cid){document.querySelector('.nav-item[data-page="soa"]').click();setTimeout(()=>{G('soa-type').value='customer';updateSOASelector();G('soa-cust').value=cid;renderSOA()},60)}

/* ═══ SUPPLIERS ═══ */
function saveSup(){
  const name=G('su-name').value.trim();if(!name){toast('أدخل اسم المورد','error');return}
  DB.sups.push({id:Date.now(),name,phone:G('su-phone').value,addr:G('su-addr').value});
  addLog('إضافة مورد',`"${name}"`,'#22d3ee');
  closeModal('m-sup');renderSups();
  broadcastChange('suppliers', { name });
  toast(`"${name}"`,{icon:'ti-truck',title:'مورد جديد'})
}
function renderSups(search=''){
  const tb=G('sup-tb');
  const term=normalizeText(search);
  const full=term?DB.sups.filter(s=>normalizeText(s.name).includes(term)||normalizeText(s.phone).includes(term)||normalizeText(s.addr).includes(term)):DB.sups;
  if(!full.length){tb.innerHTML=emptyRow(6,term?'لا توجد نتائج لهذا البحث':'لا يوجد موردون.');renderPag('sup-tb',0,renderSups);return}
  const {data}=getPageData('sup-tb', full);
  tb.innerHTML=data.map(s=>{
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
  }).join('');
  renderPag('sup-tb',full.length,renderSups)
}
