function renderHRM() {
  renderHRMEmployees();
  renderHRMAttendance();
  renderHRMAdvances();
  renderHRMPayroll();
  renderHRMCashLedger();
  renderHRMReports();
  renderHRMCharts();
  renderPerformanceList();
  checkHRMNotifications();
  requestHRMNotificationPermission();
  startHRMAutoBackup();
  populateHRMDeptFilter();
  initEmployeeForm();
  setTimeout(()=>onAdvTypeChange(),100);
}

function initEmployeeForm() {
  const noEl = G('hrm-emp-no');
  const startEl = G('hrm-emp-start');
  if (noEl && !noEl.value) noEl.value = autoGenerateEmpNo();
  if (startEl && !startEl.value) startEl.value = new Date().toISOString().slice(0, 10);
  const emps = DB._hrmEmployees || [];
  const depts = [...new Set(emps.map(e => e.department).filter(Boolean))].sort();
  const dl = G('hrm-dept-list');
  if (dl) dl.innerHTML = depts.map(d => `<option value="${d}">`).join('');
  if (!localStorage.getItem(EMP_DRAFT_KEY)) {
    document.getElementById('hrm-no-tag').style.display = '';
  }
}

function populateHRMDeptFilter() {
  const emps = DB._hrmEmployees || [];
  const depts = [...new Set(emps.map(e => e.department).filter(Boolean))].sort();
  const sel = G('hrm-emp-dept-filter');
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = '<option value="">'+t('hrm_all_departments')+'</option>' + depts.map(d => `<option value="${d}"${d === current ? ' selected' : ''}>${d}</option>`).join('');
}

function showHRMTab(tabId) {
  document.querySelectorAll('.hrm-tab').forEach(t => t.style.display = 'none');
  const tab = G(tabId);
  if (tab) tab.style.display = '';
  document.querySelectorAll('[onclick^="showHRMTab"]').forEach(b => b.classList.remove('btn-primary'));
  event.target.closest('button')?.classList.add('btn-primary');
  if (tabId === 'hrm-reports') {
    renderHRMCharts();
    loadHRMEmployeeDropdown('hrm-perf-list-emp');
    renderPerformanceList();
    if (typeof renderERPTemplates === 'function') renderERPTemplates();
    if (typeof erpLoadSavedReports === 'function') erpLoadSavedReports();
  }
}

/* ═══════════════════════════════════════════════════════════════
   EMPLOYEES — ADD / EDIT / DRAFT / PREVIEW
   ═══════════════════════════════════════════════════════════════ */

const EMP_DRAFT_KEY = 'hrm_emp_draft';
const EMP_FIELDS = {
  basic: ['hrm-emp-no', 'hrm-emp-name', 'hrm-emp-namear', 'hrm-emp-natid', 'hrm-emp-phone', 'hrm-emp-email'],
  job: ['hrm-emp-dept', 'hrm-emp-pos', 'hrm-emp-addr', 'hrm-emp-contract', 'hrm-emp-start', 'hrm-emp-bank', 'hrm-emp-bankacc'],
  salary: ['hrm-emp-rate', 'hrm-emp-ot', 'hrm-emp-salary', 'hrm-emp-hours'],
  notes: ['hrm-emp-notes']
};
const ALL_EMP_FIELDS = Object.values(EMP_FIELDS).flat();

function toggleHRMSection(hd) {
  const sec = hd.closest('.hrm-section');
  const open = sec.dataset.open !== 'false';
  sec.dataset.open = open ? 'false' : 'true';
  hd.querySelector('i:last-child').style.transform = open ? 'rotate(-90deg)' : '';
  sec.querySelector('.hrm-section-body').style.display = open ? 'none' : '';
}

function validateEmployeeField(el, rule) {
  if (rule === 'required') {
    if (!el.value.trim()) {
      el.style.borderColor = 'var(--red)';
      return false;
    }
    el.style.borderColor = '';
    return true;
  }
}

function autoGenerateEmpNo() {
  const emps = DB._hrmEmployees || [];
  const maxNo = emps.reduce((max, e) => {
    const match = (e.employeeNo || '').match(/(\d+)$/);
    return match ? Math.max(max, parseInt(match[1])) : max;
  }, 0);
  const next = maxNo + 1;
  return 'EMP-' + String(next).padStart(3, '0');
}

function onContractTypeChange() {
  const type = G('hrm-emp-contract')?.value;
  const salaryEl = G('hrm-emp-salary');
  const rateEl = G('hrm-emp-rate');
  const hintEl = G('hrm-salary-hint');
  const hintText = G('hrm-salary-hint-text');
  if (type === 'full_time') {
    hintText.textContent = t('hrm_hint_fulltime');
    hintEl.style.display = '';
  } else if (type === 'hourly') {
    hintText.textContent = t('hrm_hint_hourly');
    hintEl.style.display = '';
  } else if (type === 'part_time') {
    hintText.textContent = t('hrm_hint_parttime');
    hintEl.style.display = '';
  } else {
    hintText.textContent = t('hrm_hint_contract');
    hintEl.style.display = '';
  }
}

function calcHourlyFromSalary() {
  const salary = parseFloat(G('hrm-emp-salary')?.value) || 0;
  const hours = parseInt(G('hrm-emp-hours')?.value) || 8;
  if (salary > 0) {
    const hourly = salary / (hours * 26);
    G('hrm-emp-rate').value = hourly.toFixed(3);
    const ot = hourly * 1.5;
    G('hrm-emp-ot').value = ot.toFixed(3);
  }
}

function calcSalaryFromHourly() {
  const rate = parseFloat(G('hrm-emp-rate')?.value) || 0;
  const hours = parseInt(G('hrm-emp-hours')?.value) || 8;
  if (rate > 0) {
    const salary = rate * hours * 26;
    G('hrm-emp-salary').value = salary.toFixed(3);
    G('hrm-emp-ot').value = (rate * 1.5).toFixed(3);
  }
}

function saveEmployeeDraft() {
  const data = {};
  ALL_EMP_FIELDS.forEach(id => {
    const el = G(id);
    if (el) data[id] = el.type === 'checkbox' ? el.checked : el.value;
  });
  localStorage.setItem(EMP_DRAFT_KEY, JSON.stringify(data));
}

function loadEmployeeDraft() {
  try {
    const data = JSON.parse(localStorage.getItem(EMP_DRAFT_KEY) || '{}');
    if (!Object.keys(data).length) { toast(t('hrm_draft_empty'), 'info'); return; }
    ALL_EMP_FIELDS.forEach(id => {
      const el = G(id);
      if (el && data[id] !== undefined) {
        el.type === 'checkbox' ? (el.checked = data[id]) : (el.value = data[id]);
      }
    });
    toast(t('hrm_draft_restored'));
  } catch (e) {
    toast(t('hrm_draft_cleared'), 'error');
  }
}

function clearEmployeeDraft() {
  localStorage.removeItem(EMP_DRAFT_KEY);
  toast(t('hrm_draft_cleared'));
}

function clearEmployeeForm() {
  ALL_EMP_FIELDS.forEach(id => {
    const el = G(id);
    if (el) {
      el.type === 'checkbox' ? (el.checked = false) : (el.value = '');
      el.style.borderColor = '';
    }
  });
  G('hrm-emp-start').value = new Date().toISOString().slice(0, 10);
  G('hrm-emp-hours').value = '8';
  clearEmployeeDraft();
  toast(t('hrm_form_cleared'));
}

function previewEmployee() {
  const data = getEmployeeFormData();
  if (!data.name) { toast(t('hrm_name_required'), 'error'); return; }
  const contractLabel = { full_time: 'دوام كامل', part_time: 'دوام جزئي', hourly: 'بالساعة', contract: 'عقد' }[data.contractType] || data.contractType;
  G('hrm-preview-body').innerHTML = `
    <div style="background:var(--bg-elevated);border-radius:var(--r);padding:14px;margin-bottom:10px">
      <div style="font-size:18px;font-weight:700;color:var(--accent);margin-bottom:8px">${data.employeeNo} — ${data.name}</div>
      ${data.nameAr ? `<div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${data.nameAr}</div>` : ''}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:13px">
        ${data.phone ? `<div><strong>الهاتف:</strong> ${data.phone}</div>` : ''}
        ${data.email ? `<div><strong>البريد:</strong> ${data.email}</div>` : ''}
        ${data.nationalId ? `<div><strong>الهوية:</strong> ${data.nationalId}</div>` : ''}
        ${data.address ? `<div><strong>العنوان:</strong> ${data.address}</div>` : ''}
      </div>
    </div>
    <div style="background:var(--bg-elevated);border-radius:var(--r);padding:14px;margin-bottom:10px">
      <div style="font-size:14px;font-weight:600;margin-bottom:6px"><i class="ti ti-briefcase" style="color:var(--green)"></i> بيانات الوظيفة</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:13px">
        <div><strong>القسم:</strong> ${data.department || '—'}</div>
        <div><strong>المنصب:</strong> ${data.position || '—'}</div>
        <div><strong>نوع العقد:</strong> ${contractLabel}</div>
        <div><strong>تاريخ الالتحاق:</strong> ${data.startDate || '—'}</div>
        ${data.bank ? `<div><strong>البنك:</strong> ${data.bank}</div>` : ''}
        ${data.bankAccount ? `<div><strong>الحساب:</strong> ${data.bankAccount}</div>` : ''}
      </div>
    </div>
    <div style="background:var(--bg-elevated);border-radius:var(--r);padding:14px">
      <div style="font-size:14px;font-weight:600;margin-bottom:6px"><i class="ti ti-cash" style="color:var(--amber)"></i> الراتب</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:13px">
        <div><strong>الراتب الشهري:</strong> ${fmt(data.monthlySalary)} ${t('currency_sym')}</div>
        <div><strong>أجر الساعة:</strong> ${fmt(data.hourlyRate)} ${t('currency_sym')}</div>
        <div><strong>الأوفرتايم:</strong> ${fmt(data.overtimeRate)} ${t('currency_sym')}</div>
        <div><strong>ساعات العمل:</strong> ${data.workHours} س/يوم</div>
      </div>
    </div>
    ${data.notes ? `<div style="margin-top:10px;font-size:12px;color:var(--text-secondary)"><strong>ملاحظات:</strong> ${data.notes}</div>` : ''}`;
  openModal('hrm-preview-modal');
}

function getEmployeeFormData() {
  return {
    employeeNo: G('hrm-emp-no')?.value?.trim() || '',
    name: G('hrm-emp-name')?.value?.trim() || '',
    nameAr: G('hrm-emp-namear')?.value?.trim() || '',
    nationalId: G('hrm-emp-natid')?.value?.trim() || '',
    phone: G('hrm-emp-phone')?.value?.trim() || '',
    email: G('hrm-emp-email')?.value?.trim() || '',
    department: G('hrm-emp-dept')?.value?.trim() || '',
    position: G('hrm-emp-pos')?.value?.trim() || '',
    address: G('hrm-emp-addr')?.value?.trim() || '',
    contractType: G('hrm-emp-contract')?.value || 'full_time',
    startDate: G('hrm-emp-start')?.value || '',
    bank: G('hrm-emp-bank')?.value?.trim() || '',
    bankAccount: G('hrm-emp-bankacc')?.value?.trim() || '',
    hourlyRate: +(G('hrm-emp-rate')?.value || 0),
    overtimeRate: +(G('hrm-emp-ot')?.value || 0),
    monthlySalary: +(G('hrm-emp-salary')?.value || 0),
    workHours: +(G('hrm-emp-hours')?.value || 8),
    notes: G('hrm-emp-notes')?.value?.trim() || ''
  };
}

async function addEmployee() {
  const d = getEmployeeFormData();
  if (!d.name) { toast(t('hrm_name_req'), 'error'); return; }
  if (!d.employeeNo) {
    d.employeeNo = autoGenerateEmpNo();
    G('hrm-emp-no').value = d.employeeNo;
  }
  if (!d.startDate) {
    d.startDate = new Date().toISOString().slice(0, 10);
    G('hrm-emp-start').value = d.startDate;
  }
  try {
    const res = await authenticatedFetch('/api/hrm/employees', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(d)
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    if(typeof notify==='function') notify('تم إضافة الموظف: ' + d.name + ' (' + d.employeeNo + ')', 'success', {icon:'ti-user-plus'});
    else toast(t('hrm_employee_added')+' — ' + d.employeeNo, 'success');
    clearEmployeeForm();
    renderHRMEmployees();
    populateHRMDeptFilter();
    broadcastChange('hrm', { section: 'employees', action: 'add' });
  } catch (err) {
    if(typeof notify==='function') notify(err.message, 'error', {icon:'ti-alert-triangle'});
    else toast(err.message, 'error');
  }
}

async function renderHRMEmployees() {
  const search = G('hrm-emp-search')?.value || '';
  const status = G('hrm-emp-status')?.value || '';
  const dept = G('hrm-emp-dept-filter')?.value || '';
  const contract = G('hrm-emp-contract-filter')?.value || '';
  let url = `/api/hrm/employees?`;
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (status) url += `status=${status}&`;
  if (dept) url += `department=${encodeURIComponent(dept)}&`;
  if (contract) url += `contractType=${contract}&`;
  try {
    const res = await authenticatedFetch(url);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const employees = data.employees || [];
    DB._hrmEmployees = employees;
    const tbody = G('hrm-emp-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!employees.length) { tbody.innerHTML = '<tr><td colspan="8" class="text-center p-3 text-muted">'+t('hrm_no_employees')+'</td></tr>'; return; }
    employees.forEach(e => {
      const statusBadge = e.status === 'active'
        ? '<span class="badge bg-success">نشط</span>'
        : `<span class="badge bg-secondary">${e.status === 'inactive' ? 'غير نشط' : 'منتهي'}</span>`;
      const contractBadge = {
        full_time: 'دوام كامل', part_time: 'دوام جزئي', hourly: 'بالساعة', contract: 'عقد'
      }[e.contractType] || e.contractType;
      tbody.innerHTML += `<tr>
        <td>${e.employeeNo}</td>
        <td>${e.name}</td>
        <td>${contractBadge}</td>
        <td>${e.department || '—'}</td>
        <td>${e.position || '—'}</td>
        <td>${fmt(e.hourlyRate || 0)}</td>
        <td>${statusBadge}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="editEmployee('${e._id}')">تعديل</button>
          <button class="btn btn-sm btn-outline" onclick="openEmployeeArchive('${e._id}')" title="أرشيف">أرشيف</button>
          ${e.status === 'active' ? `<button class="btn btn-sm btn-outline-danger" onclick="deactivateEmployee('${e._id}','${e.name}')">إنهاء</button>` : ''}
        </td>
      </tr>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل الموظفين:', err);
  }
}

async function editEmployee(id) {
  try {
    const res = await authenticatedFetch(`/api/hrm/employees/${id}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const e = data.employee;
    openModal('hrm-edit-modal');
    G('hrm-edit-id').value = e._id;
    G('hrm-edit-no').value = e.employeeNo;
    G('hrm-edit-name').value = e.name;
    G('hrm-edit-phone').value = e.phone || '';
    G('hrm-edit-dept').value = e.department || '';
    G('hrm-edit-pos').value = e.position || '';
    G('hrm-edit-contract').value = e.contractType || 'full_time';
    G('hrm-edit-rate').value = e.hourlyRate || 0;
    G('hrm-edit-ot').value = e.overtimeRate || 0;
    G('hrm-edit-salary').value = e.monthlySalary || 0;
    G('hrm-edit-notes').value = e.notes || '';
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function saveEmployeeEdit() {
  const id = G('hrm-edit-id')?.value;
  const payload = {
    name: G('hrm-edit-name')?.value?.trim(),
    phone: G('hrm-edit-phone')?.value?.trim(),
    department: G('hrm-edit-dept')?.value?.trim(),
    position: G('hrm-edit-pos')?.value?.trim(),
    contractType: G('hrm-edit-contract')?.value,
    hourlyRate: +(G('hrm-edit-rate')?.value || 0),
    overtimeRate: +(G('hrm-edit-ot')?.value || 0),
    monthlySalary: +(G('hrm-edit-salary')?.value || 0),
    notes: G('hrm-edit-notes')?.value?.trim()
  };
  if (!payload.name) { toast(t('hrm_name_req'), 'error'); return; }
  try {
    const res = await authenticatedFetch(`/api/hrm/employees/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_employee_updated'));
    closeModal('hrm-edit-modal');
    renderHRMEmployees();
    broadcastChange('hrm', { section: 'employees', action: 'edit' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function deactivateEmployee(id, name) {
  if (!confirm(`هل أنت متأكد من إنهاء عقد ${name}؟`)) return;
  try {
    const res = await authenticatedFetch(`/api/hrm/employees/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'inactive', endDate: new Date().toISOString().slice(0, 10) })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_contract_ended'));
    renderHRMEmployees();
    broadcastChange('hrm', { section: 'employees', action: 'deactivate' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ═══════════════════════════════════════════════════════════════
   ATTENDANCE
   ═══════════════════════════════════════════════════════════════ */
async function renderHRMAttendance() {
  const date = G('hrm-att-date')?.value || new Date().toISOString().slice(0, 10);
  const search = G('hrm-att-search')?.value || '';
  try {
    const res = await authenticatedFetch(`/api/hrm/attendance?date=${date}&search=${encodeURIComponent(search)}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const records = data.records || [];
    DB._hrmAttendance = records;
    const tbody = G('hrm-att-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!records.length) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center p-3 text-muted">'+t('hrm_no_attendance')+'</td></tr>';
      return;
    }
    records.forEach(r => {
      const statusBadge = { present: 'حاضر', absent: 'غائب', late: 'متأخر', half_day: 'نصف يوم', leave: 'إجازة' }[r.status] || r.status;
      tbody.innerHTML += `<tr>
        <td>${r.employeeNo}</td>
        <td>${r.employeeName}</td>
        <td>${r.checkIn || '—'}</td>
        <td>${r.checkOut || '—'}</td>
        <td>${r.totalHours.toFixed(1)}</td>
        <td>${statusBadge}</td>
        <td>${r.isLocked ? '<span class="badge bg-secondary">مقفل</span>' : `<button class="btn btn-sm btn-outline" onclick="lockAttendance('${r._id}')">قفل</button>`}</td>
      </tr>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل الحضور:', err);
  }
}

let _attStatus='present';
function setAttStatus(status){
  _attStatus=status;
  const el=G('hrm-att-status');if(el)el.value=status;
  document.querySelectorAll('#hrm-att-chips .hrm-att-chip').forEach(c=>{
    c.classList.toggle('sel',c.dataset.status===status);
  });
  const ci=G('hrm-att-checkin'),co=G('hrm-att-checkout');
  if(status==='absent'||status==='leave'){
    if(ci)ci.value='';if(co)co.value='';
    if(ci)ci.disabled=true;if(co)co.disabled=true;
  }else{
    if(ci)ci.disabled=false;if(co)co.disabled=false;
  }
}

async function saveAttendance() {
  const empId = G('hrm-att-emp')?.value;
  const date = G('hrm-att-date-add')?.value || new Date().toISOString().slice(0, 10);
  const checkIn = G('hrm-att-checkin')?.value || '';
  const checkOut = G('hrm-att-checkout')?.value || '';
  const status = G('hrm-att-status')?.value || 'present';
  const notes = G('hrm-att-notes')?.value?.trim() || '';
  if (!empId) { toast(t('hrm_choose_employee'), 'error'); return; }
  try {
    const res = await authenticatedFetch('/api/hrm/attendance', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: empId, date, checkIn, checkOut, status, notes })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_attendance_logged'));
    G('hrm-att-checkin').value = '';
    G('hrm-att-checkout').value = '';
    G('hrm-att-notes').value = '';
    renderHRMAttendance();
    broadcastChange('hrm', { section: 'attendance', action: 'add' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function lockAttendance(id) {
  if (!confirm('قفل هذا السجل؟ لن يمكن تعديله بعد القفل')) return;
  try {
    const res = await authenticatedFetch(`/api/hrm/attendance/${id}/lock`, { method: 'PATCH' });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_record_locked_done'));
    renderHRMAttendance();
    broadcastChange('hrm', { section: 'attendance', action: 'lock' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCES & LOANS
   ═══════════════════════════════════════════════════════════════ */
async function renderHRMAdvances() {
  const search = G('hrm-adv-search')?.value || '';
  const status = G('hrm-adv-status')?.value || '';
  let url = `/api/hrm/advances?`;
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (status) url += `status=${status}&`;
  try {
    const res = await authenticatedFetch(url);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const advances = data.advances || [];
    DB._hrmAdvances = advances;
    const tbody = G('hrm-adv-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!advances.length) { tbody.innerHTML = '<tr><td colspan="8" class="text-center p-3 text-muted">'+t('hrm_no_advances')+'</td></tr>'; return; }
    advances.forEach(a => {
      const typeLabel = a.type === 'advance' ? 'سلفة' : 'قرض';
      const statusBadge = { active: 'نشط', completed: 'مسدد', cancelled: 'ملغي' }[a.status] || a.status;
      tbody.innerHTML += `<tr>
        <td>${a.date}</td>
        <td>${a.employeeName}</td>
        <td>${typeLabel}</td>
        <td>${fmt(a.amount)}</td>
        <td>${fmt(a.remainingBalance)}</td>
        <td>${a.installmentsPaid}/${a.installmentsTotal}</td>
        <td><span class="badge bg-${a.status === 'active' ? 'warning' : a.status === 'completed' ? 'success' : 'secondary'}">${statusBadge}</span></td>
        <td>${a.status === 'active' ? `<button class="btn btn-sm btn-outline-primary" onclick="repayAdvance('${a._id}',${a.remainingBalance})">تسديد</button>` : '—'}</td>
      </tr>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل السلف:', err);
  }
}

function onAdvTypeChange(){
  const type=G('hrm-adv-type')?.value;
  const wrap=G('hrm-adv-monthly-wrap');
  const hint=G('hrm-adv-hint');
  const hintTxt=G('hrm-adv-hint-text');
  if(type==='advance'){
    if(wrap){wrap.classList.add('hidden');wrap.classList.remove('visible')}
    if(hint){hint.style.display='none'}
    G('hrm-adv-total').value='1';
  }else{
    if(wrap){wrap.classList.remove('hidden');wrap.classList.add('visible')}
    if(hint&&hintTxt){hint.style.display='flex';hintTxt.textContent=t('hrm_hint_loan')}
    if(!G('hrm-adv-total').value||G('hrm-adv-total').value==='1')G('hrm-adv-total').value='12';
  }
}

async function addAdvance() {
  const empId = G('hrm-adv-emp')?.value;
  const type = G('hrm-adv-type')?.value;
  const amount = +(G('hrm-adv-amount')?.value || 0);
  const monthly = +(G('hrm-adv-monthly')?.value || 0);
  const total = +(G('hrm-adv-total')?.value || 1);
  const purpose = G('hrm-adv-purpose')?.value?.trim() || '';
  const date = G('hrm-adv-date')?.value || new Date().toISOString().slice(0, 10);
  if (!empId || !amount || amount <= 0) { toast(t('hrm_choose_emp_amount'), 'error'); return; }
  if (type === 'loan' && (!monthly || monthly <= 0)) { toast(t('hrm_enter_installment'), 'error'); return; }
  try {
    const res = await authenticatedFetch('/api/hrm/advances', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: empId, type, amount, monthlyInstallment: monthly, installmentsTotal: total, purpose, date })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_advance_issued')+' — '+t('hrm_cash_balance')+': '+fmt(data.cashBalance));
    G('hrm-adv-amount').value = '';
    G('hrm-adv-purpose').value = '';
    renderHRMAdvances();
    broadcastChange('hrm', { section: 'advances', action: 'add' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function repayAdvance(id, remaining) {
  const amountStr = prompt(`المبلغ المتبقي: ${fmt(remaining)}\nأدخل مبلغ التسديد:`);
  if (!amountStr) return;
  const amount = +amountStr;
  if (!amount || amount <= 0) { toast(t('hrm_invalid_amount'), 'error'); return; }
  try {
    const res = await authenticatedFetch(`/api/hrm/advances/${id}/repay`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, date: new Date().toISOString().slice(0, 10) })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_repayment_done')+' — '+t('hrm_cash_balance')+': '+fmt(data.cashBalance));
    renderHRMAdvances();
    broadcastChange('hrm', { section: 'advances', action: 'repay' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ═══════════════════════════════════════════════════════════════
   PAYROLL
   ═══════════════════════════════════════════════════════════════ */
async function renderHRMPayroll() {
  const period = G('hrm-pay-period')?.value || '';
  const status = G('hrm-pay-status')?.value || '';
  let url = `/api/hrm/payroll?`;
  if (period) url += `period=${period}&`;
  if (status) url += `status=${status}&`;
  try {
    const res = await authenticatedFetch(url);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const payrolls = data.payrolls || [];
    DB._hrmPayrows = payrolls;
    const tbody = G('hrm-pay-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!payrolls.length) { tbody.innerHTML = '<tr><td colspan="10" class="text-center p-3 text-muted">'+t('hrm_no_payroll')+'</td></tr>'; return; }
    payrolls.forEach(p => {
      const statusBadge = { draft: 'مسودة', approved: 'معتمدة', paid: 'مدفوعة', cancelled: 'ملغاة' }[p.status] || p.status;
      tbody.innerHTML += `<tr>
        <td>${p.period}</td>
        <td>${p.employeeNo}</td>
        <td>${p.employeeName}</td>
        <td>${p.totalWorkedHours.toFixed(1)}</td>
        <td>${fmt(p.grossSalary)}</td>
        <td>${fmt(p.totalDeductions)}</td>
        <td><strong>${fmt(p.netSalary)}</strong></td>
        <td><span class="badge bg-${p.status === 'paid' ? 'success' : p.status === 'approved' ? 'primary' : 'secondary'}">${statusBadge}</span></td>
        <td>
          ${p.status === 'draft' ? `<button class="btn btn-sm btn-outline-primary" onclick="approvePayroll('${p._id}')">اعتماد</button>` : ''}
          ${p.status === 'approved' ? `<button class="btn btn-sm btn-success" onclick="payPayroll('${p._id}')">دفع</button>` : ''}
          ${p.status === 'paid' ? `<span class="text-muted">${p.paidDate}</span>` : ''}
        </td>
      </tr>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل الرواتب:', err);
  }
}

async function generatePayroll() {
  const period = G('hrm-pay-gen-period')?.value;
  if (!period) { toast(t('hrm_choose_period'), 'error'); return; }
  if (!confirm(`توليد رواتب لشهر ${period}؟`)) return;
  try {
    const res = await authenticatedFetch('/api/hrm/payroll/generate', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ period })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_payroll_generated')+' '+data.count);
    renderHRMPayroll();
    broadcastChange('hrm', { section: 'payroll', action: 'generate' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function approvePayroll(id) {
  if (!confirm('اعتماد هذا الراتب؟')) return;
  try {
    const res = await authenticatedFetch(`/api/hrm/payroll/${id}/approve`, { method: 'POST' });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_payroll_approved'));
    renderHRMPayroll();
    broadcastChange('hrm', { section: 'payroll', action: 'approve' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function payPayroll(id) {
  if (!confirm('تأكيد دفع هذا الراتب؟')) return;
  try {
    const res = await authenticatedFetch(`/api/hrm/payroll/${id}/pay`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: new Date().toISOString().slice(0, 10) })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_payroll_paid')+' — '+t('hrm_cash_balance')+': '+fmt(data.cashBalance));
    renderHRMPayroll();
    broadcastChange('hrm', { section: 'payroll', action: 'pay' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ═══════════════════════════════════════════════════════════════
   CASH LEDGER
   ═══════════════════════════════════════════════════════════════ */
async function renderHRMCashLedger() {
  const from = G('hrm-cl-from')?.value || '';
  const to = G('hrm-cl-to')?.value || '';
  const cat = G('hrm-cl-cat')?.value || '';
  let url = `/api/hrm/cash-ledger?`;
  if (from) url += `from=${from}&`;
  if (to) url += `to=${to}&`;
  if (cat) url += `category=${cat}&`;
  try {
    const res = await authenticatedFetch(url);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const entries = data.entries || [];
    DB._hrmCashLedger = entries;
    const tbody = G('hrm-cl-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!entries.length) { tbody.innerHTML = '<tr><td colspan="6" class="text-center p-3 text-muted">'+t('hrm_no_movements')+'</td></tr>'; return; }
    entries.forEach(e => {
      const typeBadge = e.type === 'in'
        ? `<span class="text-success fw-bold">وارد +${fmt(e.amount)}</span>`
        : `<span class="text-danger fw-bold">صادر -${fmt(e.amount)}</span>`;
      tbody.innerHTML += `<tr>
        <td>${e.date}</td>
        <td>${typeBadge}</td>
        <td>${fmt(e.balanceAfter)}</td>
        <td>${e.category}</td>
        <td>${e.description}</td>
        <td>${e.employeeName || '—'}</td>
      </tr>`;
    });
    G('hrm-cl-balance').textContent = t('hrm_cash_balance')+': '+fmt(data.currentBalance)+' '+t('currency_sym');
  } catch (err) {
    console.error('خطأ في تحميل سجل الخزينة:', err);
  }
}

async function adjustCashLedger() {
  const amount = +(G('hrm-cl-adj-amount')?.value || 0);
  const reason = G('hrm-cl-adj-reason')?.value?.trim() || '';
  if (!amount || !reason) { toast(t('hrm_enter_amount_reason'), 'error'); return; }
  try {
    const res = await authenticatedFetch('/api/hrm/cash-ledger/adjust', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, reason, date: new Date().toISOString().slice(0, 10) })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_adjustment_done'));
    G('hrm-cl-adj-amount').value = '';
    G('hrm-cl-adj-reason').value = '';
    renderHRMCashLedger();
    broadcastChange('hrm', { section: 'cash-ledger', action: 'adjust' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

/* ═══════════════════════════════════════════════════════════════
   EMPLOYEE DROPDOWN LOADER
   ═══════════════════════════════════════════════════════════════ */
async function loadHRMEmployeeDropdown(selectId) {
  try {
    const res = await authenticatedFetch('/api/hrm/employees?status=active');
    const data = await res.json();
    if (data.status !== 'success') return;
    const sel = G(selectId);
    if (!sel) return;
    sel.innerHTML = '<option value="">'+t('hrm_choose_employee')+'</option>';
    (data.employees || []).forEach(e => {
      sel.innerHTML += `<option value="${e._id}">${e.employeeNo} — ${e.name}</option>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل قائمة الموظفين:', err);
  }
}

/* ═══════════════════════════════════════════════════════════════
   PRINT PAYROLL
   ═══════════════════════════════════════════════════════════════ */
function printPayroll(period) {
  const payrows = DB._hrmPayrows || [];
  if (!payrows.length) { toast(t('hrm_no_payroll'), 'error'); return; }
  const company = currentCompany();
  const win = window.open('', '_blank', 'width=900,height=1100');
  if (!win) { toast(t('barcode_print_err'), 'error'); return; }
  const now = new Date().toLocaleString('ar');
  const totalGross = payrows.reduce((s, p) => s + p.grossSalary, 0);
  const totalDeductions = payrows.reduce((s, p) => s + p.totalDeductions, 0);
  const totalNet = payrows.reduce((s, p) => s + p.netSalary, 0);
  const rowsHtml = payrows.map((p, i) => `<tr>
    <td>${i + 1}</td><td>${p.employeeNo}</td><td>${p.employeeName}</td>
    <td>${p.totalWorkedHours.toFixed(1)}</td><td>${p.totalOvertimeHours.toFixed(1)}</td>
    <td>${fmt(p.hourlyRate)}</td><td>${fmt(p.grossSalary)}</td>
    <td>${fmt(p.loanDeduction + p.advanceDeduction)}</td><td style="font-weight:700;color:#4f8ef7">${fmt(p.netSalary)}</td>
  </tr>`).join('');
  const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>كشف رواتب ${period}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
  @page{size:A4 landscape;margin:12mm 15mm}*{box-sizing:border-box}
  body{font-family:'Cairo',Helvetica,Arial,sans-serif;direction:rtl;color:#1a1a1a;margin:0;padding:20px;font-size:12px;line-height:1.5}
  h1,h2,h3{margin:0}
  .header{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:16px;padding-bottom:12px;border-bottom:3px solid #4f8ef7}
  .company h1{font-size:20px;color:#4f8ef7;margin-bottom:4px}
  .company p{margin:2px 0;font-size:11px;color:#555}
  .info{text-align:left;font-size:11px}
  .info div{margin-bottom:3px}
  table{width:100%;border-collapse:collapse;margin-top:12px;font-size:11px}
  th{background:#4f8ef7;color:#fff;padding:8px 6px;font-weight:600;text-align:right}
  td{padding:7px 6px;border-bottom:1px solid #e5e5e5}
  tr:nth-child(even){background:#f8f9fa}
  .totals{margin-top:14px;width:320px;margin-left:0;margin-right:auto;font-size:12px}
  .totals div{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee}
  .totals .total-row{border-bottom:2px solid #4f8ef7;font-weight:700;font-size:13px;color:#4f8ef7}
  .footer{margin-top:20px;padding-top:10px;border-top:1px solid #ddd;font-size:10px;color:#888;display:flex;justify-content:space-between}
  @media print{body{padding:0}}
  </style></head><body>
  <div class="header">
    <div class="company"><h1>${company.name}</h1><p>${company.address || ''}</p><p>${company.phone || ''}</p></div>
    <div class="info">
      <div style="font-size:15px;font-weight:700;color:#4f8ef7">كشف رواتب</div>
      <div>الفترة: <strong>${period}</strong></div>
      <div>عدد الموظفين: <strong>${payrows.length}</strong></div>
      <div>تاريخ الطباعة: ${now}</div>
    </div>
  </div>
  <table><thead><tr><th>#</th><th>رقم</th><th>الموظف</th><th>ساعات العمل</th><th>أوفرتايم</th><th>أجر الساعة</th><th>الإجمالي</th><th>الخصومات</th><th>الصافي</th></tr></thead>
  <tbody>${rowsHtml}</tbody></table>
  <div class="totals">
    <div>الإجمالي الخام: <span>${fmt(totalGross)}</span></div>
    <div>إجمالي الخصومات: <span style="color:#f05454">${fmt(totalDeductions)}</span></div>
    <div class="total-row">صافي الرواتب: <span>${fmt(totalNet)}</span></div>
  </div>
  <div class="footer"><span>${company.name}</span><span>طباعة: ${now}</span></div>
  </body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 600);
}

function printEmployeeList() {
  const emps = DB._hrmEmployees || [];
  if (!emps.length) { toast(t('hrm_no_employees'), 'error'); return; }
  const company = currentCompany();
  const win = window.open('', '_blank', 'width=900,height=1100');
  if (!win) { toast(t('barcode_print_err'), 'error'); return; }
  const now = new Date().toLocaleString('ar');
  const rowsHtml = emps.map((e, i) => {
    const statusLabel = e.status === 'active' ? 'نشط' : e.status === 'inactive' ? 'غير نشط' : 'منتهي';
    const contractLabel = { full_time: 'دوام كامل', part_time: 'دوام جزئي', hourly: 'بالساعة', contract: 'عقد' }[e.contractType] || e.contractType;
    return `<tr><td>${i + 1}</td><td>${e.employeeNo}</td><td>${e.name}</td><td>${e.phone || '—'}</td><td>${contractLabel}</td><td>${e.department || '—'}</td><td>${e.position || '—'}</td><td>${fmt(e.hourlyRate || 0)}</td><td>${statusLabel}</td></tr>`;
  }).join('');
  const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>قائمة الموظفين</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
  @page{size:A4 landscape;margin:12mm 15mm}*{box-sizing:border-box}
  body{font-family:'Cairo',Helvetica,Arial,sans-serif;direction:rtl;color:#1a1a1a;margin:0;padding:20px;font-size:12px;line-height:1.5}
  h1{margin:0;font-size:20px;color:#4f8ef7}
  .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:3px solid #4f8ef7}
  table{width:100%;border-collapse:collapse;margin-top:12px;font-size:11px}
  th{background:#4f8ef7;color:#fff;padding:8px 6px;font-weight:600;text-align:right}
  td{padding:7px 6px;border-bottom:1px solid #e5e5e5}
  tr:nth-child(even){background:#f8f9fa}
  .footer{margin-top:20px;padding-top:10px;border-top:1px solid #ddd;font-size:10px;color:#888;display:flex;justify-content:space-between}
  @media print{body{padding:0}}
  </style></head><body>
  <div class="header"><h1>قائمة الموظفين</h1><div style="font-size:11px">العدد: ${emps.length} — ${now}</div></div>
  <table><thead><tr><th>#</th><th>رقم</th><th>الاسم</th><th>الهاتف</th><th>العقد</th><th>القسم</th><th>المنصب</th><th>أجر الساعة</th><th>الحالة</th></tr></thead>
  <tbody>${rowsHtml}</tbody></table>
  <div class="footer"><span>${company.name}</span><span>طباعة: ${now}</span></div>
  </body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 600);
}

/* ═══════════════════════════════════════════════════════════════
   HRM REPORTS
   ═══════════════════════════════════════════════════════════════ */
async function renderHRMReports() {
  const period = G('hrm-rpt-period')?.value || '';
  try {
    const res = await authenticatedFetch(`/api/hrm/payroll/summary/${period || 'all'}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const s = data.summary || {};
    const el = G('hrm-rpt-summary');
    if (!el) return;
    el.innerHTML = `
      <div class="hrm-rpt-grid">
        <div class="hrm-rpt-card blue"><div class="rpt-icon"><i class="ti ti-users"></i></div><div class="rpt-val">${s.totalEmployees || 0}</div><div class="rpt-lbl">عدد الموظفين</div></div>
        <div class="hrm-rpt-card green"><div class="rpt-icon"><i class="ti ti-cash"></i></div><div class="rpt-val">${fmt(s.totalGross || 0)}</div><div class="rpt-lbl">إجمالي الرواتب الخام</div></div>
        <div class="hrm-rpt-card amber"><div class="rpt-icon"><i class="ti ti-discount"></i></div><div class="rpt-val">${fmt(s.totalDeductions || 0)}</div><div class="rpt-lbl">إجمالي الخصومات</div></div>
        <div class="hrm-rpt-card red"><div class="rpt-icon"><i class="ti ti-wallet"></i></div><div class="rpt-val">${fmt(s.totalNet || 0)}</div><div class="rpt-lbl">صافي الرواتب</div></div>
      </div>
      <div class="hrm-rpt-grid">
        <div class="hrm-rpt-card cyan"><div class="rpt-icon"><i class="ti ti-clock"></i></div><div class="rpt-val">${(s.totalHours || 0).toFixed(1)}</div><div class="rpt-lbl">إجمالي ساعات العمل</div></div>
        <div class="hrm-rpt-card purple"><div class="rpt-icon"><i class="ti ti-clock-hour-4"></i></div><div class="rpt-val">${(s.totalOT || 0).toFixed(1)}</div><div class="rpt-lbl">إجمالي الأوفرتايم</div></div>
        <div class="hrm-rpt-card amber"><div class="rpt-icon"><i class="ti ti-file"></i></div><div class="rpt-val">${s.draft || 0}</div><div class="rpt-lbl">مسودات</div></div>
        <div class="hrm-rpt-card green"><div class="rpt-icon"><i class="ti ti-check"></i></div><div class="rpt-val">${s.paid || 0}</div><div class="rpt-lbl">مدفوعة</div></div>
      </div>`;
  } catch (err) {
    console.error('خطأ في تقرير الرواتب:', err);
  }
  try {
    const res2 = await authenticatedFetch('/api/hrm/advances?status=active');
    const data2 = await res2.json();
    if (data2.status !== 'success') throw new Error(data2.message);
    const advances = data2.advances || [];
    const totalActive = advances.reduce((s, a) => s + a.remainingBalance, 0);
    const el2 = G('hrm-rpt-advances');
    if (el2) {
      el2.innerHTML = `<div class="accounting-note acn-blue">
        <i class="ti ti-info-circle" style="font-size:14px;flex-shrink:0;margin-top:1px"></i>
        <span>إجمالي السلف والقروض النشطة: <strong>${fmt(totalActive)}</strong> t('currency_sym') — عدد: <strong>${advances.length}</strong></span>
      </div>`;
    }
  } catch (err) {
    console.error('خطأ في تقرير السلف:', err);
  }
  renderCustomAlerts();
  renderComparativeReports();
  checkCustomAlerts();
}

/* ═══════════════════════════════════════════════════════════════
   EXCEL EXPORT
   ═══════════════════════════════════════════════════════════════ */
function exportHRMEmployees() {
  const emps = DB._hrmEmployees || [];
  if (!emps.length) { toast(t('hrm_no_employees'), 'error'); return; }
  const headers = ['رقم', t('hrm_name_req'), 'الهاتف', 'نوع العقد', 'القسم', 'المنصب', 'أجر الساعة', 'أجر الأوفرتايم', 'الراتب الشهري', 'تاريخ الالتحاق', 'الحالة'];
  const rows = emps.map(e => {
    const statusLabel = e.status === 'active' ? 'نشط' : e.status === 'inactive' ? 'غير نشط' : 'منتهي';
    const contractLabel = { full_time: 'دوام كامل', part_time: 'دوام جزئي', hourly: 'بالساعة', contract: 'عقد' }[e.contractType] || e.contractType;
    return [e.employeeNo, e.name, e.phone || '', contractLabel, e.department || '', e.position || '', e.hourlyRate || 0, e.overtimeRate || 0, e.monthlySalary || 0, e.startDate || '', statusLabel];
  });
  _exportTable(headers, rows, 'الموظفين', 'hrm-employees');
}

function exportHRMAttendance() {
  const recs = DB._hrmAttendance || [];
  if (!recs.length) { toast(t('hrm_no_attendance'), 'error'); return; }
  const headers = ['التاريخ', 'رقم الموظف', 'الموظف', 'وقت الدخول', 'وقت الخروج', 'الساعات', 'أوفرتايم', 'الحالة'];
  const rows = recs.map(r => {
    const statusLabel = { present: 'حاضر', absent: 'غائب', late: 'متأخر', half_day: 'نصف يوم', leave: 'إجازة' }[r.status] || r.status;
    return [r.date, r.employeeNo, r.employeeName, r.checkIn || '', r.checkOut || '', r.totalHours, r.overtimeHours, statusLabel];
  });
  _exportTable(headers, rows, 'الحضور', 'hrm-attendance');
}

function exportHRMPayroll() {
  const payrows = DB._hrmPayrows || [];
  if (!payrows.length) { toast(t('hrm_no_payroll'), 'error'); return; }
  const headers = ['الفترة', 'رقم', 'الموظف', 'ساعات العمل', 'أوفرتايم', 'أجر الساعة', 'الإجمالي الخام', 'خصم السلف', 'خصم القروض', 'إجمالي الخصومات', 'الصافي', 'الحالة'];
  const rows = payrows.map(p => {
    const statusLabel = { draft: 'مسودة', approved: 'معتمدة', paid: 'مدفوعة', cancelled: 'ملغاة' }[p.status] || p.status;
    return [p.period, p.employeeNo, p.employeeName, p.totalWorkedHours, p.totalOvertimeHours, p.hourlyRate, p.grossSalary, p.advanceDeduction, p.loanDeduction, p.totalDeductions, p.netSalary, statusLabel];
  });
  _exportTable(headers, rows, 'الرواتب', 'hrm-payroll');
}

function exportHRMAdvances() {
  const advances = DB._hrmAdvances || [];
  if (!advances.length) { toast(t('hrm_no_advances'), 'error'); return; }
  const headers = ['التاريخ', 'الموظف', 'النوع', 'المبلغ', 'المتبقي', 'القسط الشهري', 'عدد الأقساط', 'المدفوع', 'الحالة', 'السبب'];
  const rows = advances.map(a => {
    const typeLabel = a.type === 'advance' ? 'سلفة' : 'قرض';
    const statusLabel = { active: 'نشط', completed: 'مسدد', cancelled: 'ملغي' }[a.status] || a.status;
    return [a.date, a.employeeName, typeLabel, a.amount, a.remainingBalance, a.monthlyInstallment, a.installmentsTotal, a.installmentsPaid, statusLabel, a.purpose || ''];
  });
  _exportTable(headers, rows, 'السلف', 'hrm-advances');
}

function exportHRMCashLedger() {
  const entries = DB._hrmCashLedger || [];
  if (!entries.length) { toast(t('hrm_no_movements'), 'error'); return; }
  const headers = ['التاريخ', 'النوع', 'المبلغ', 'الرصيد', 'الفئة', 'الوصف', 'الموظف'];
  const rows = entries.map(e => [e.date, e.type === 'in' ? 'وارد' : 'صادر', e.amount, e.balanceAfter, e.category, e.description, e.employeeName || '']);
  _exportTable(headers, rows, 'سجل-الخزينة', 'hrm-cash-ledger');
}

/* ═══════════════════════════════════════════════════════════════
   HRM NOTIFICATIONS
   ═══════════════════════════════════════════════════════════════ */
async function checkHRMNotifications() {
  const notifications = [];
  try {
    const res = await authenticatedFetch('/api/hrm/employees?status=active');
    const data = await res.json();
    if (data.status === 'success') {
      const employees = data.employees || [];
      const today = new Date().toISOString().slice(0, 10);
      employees.forEach(e => {
        if (e.endDate && e.endDate <= today) {
          notifications.push({ type: 'warning', msg: `الموظف ${e.name} (${e.employeeNo}) — العقد انتهى أو ينتهي قريباً`, icon: 'ti ti-alert-triangle' });
        } else if (e.endDate) {
          const diff = Math.ceil((new Date(e.endDate) - new Date(today)) / (1000 * 60 * 60 * 24));
          if (diff <= 30) {
            notifications.push({ type: 'info', msg: `الموظف ${e.name} — العقد ينتهي خلال ${diff} يوم`, icon: 'ti ti-clock' });
          }
        }
      });
    }
  } catch (err) {}
  try {
    const res2 = await authenticatedFetch('/api/hrm/attendance?date=' + new Date().toISOString().slice(0, 10));
    const data2 = await res2.json();
    if (data2.status === 'success') {
      const records = data2.records || [];
      const absents = records.filter(r => r.status === 'absent');
      const lates = records.filter(r => r.status === 'late');
      if (absents.length) {
        notifications.push({ type: 'danger', msg: `${absents.length} موظف غائب اليوم`, icon: 'ti ti-user-off' });
      }
      if (lates.length) {
        notifications.push({ type: 'warning', msg: `${lates.length} موظف متأخر اليوم`, icon: 'ti ti-clock' });
      }
    }
  } catch (err) {}
  try {
    const res3 = await authenticatedFetch('/api/hrm/advances?status=active');
    const data3 = await res3.json();
    if (data3.status === 'success') {
      const advances = data3.advances || [];
      const highBalance = advances.filter(a => a.remainingBalance > a.amount * 0.5);
      if (highBalance.length) {
        notifications.push({ type: 'info', msg: `${highBalance.length} سلف/قرض برصيد مرتفع (أكثر من 50%)`, icon: 'ti ti-wallet' });
      }
    }
  } catch (err) {}
  renderHRMNotifications(notifications);
}

function renderHRMNotifications(notifications) {
  const el = G('hrm-notifications');
  if (!el) return;
  if (!notifications.length) { el.innerHTML = ''; return; }
  const colorMap = { danger: '#f05454', warning: '#f5a623', info: '#4f8ef7', success: '#2dd17e' };
  el.innerHTML = notifications.map(n => `<div class="hrm-notif ${n.type}">
    <i class="${n.icon}" style="font-size:16px;flex-shrink:0"></i>
    <span>${n.msg}</span>
  </div>`).join('');
  if ('Notification' in window && Notification.permission === 'granted') {
    const critical = notifications.filter(n => n.type === 'danger' || n.type === 'warning');
    if (critical.length) {
      try { new Notification('HRM — تنبيه', { body: critical.map(n => n.msg).join('\n'), icon: 'icon.svg' }); } catch (e) {}
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   PUSH NOTIFICATIONS PERMISSION
   ═══════════════════════════════════════════════════════════════ */
function requestHRMNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCED HRM CHARTS
   ═══════════════════════════════════════════════════════════════ */
function renderHRMCharts() {
  const payrows = DB._hrmPayrows || [];
  const attendance = DB._hrmAttendance || [];
  const advances = DB._hrmAdvances || [];
  renderHRMPayrollChart(payrows);
  renderHRMAttendanceChart(attendance);
  renderHRMAdvancesChart(advances);
}

function renderHRMPayrollChart(payrows) {
  const el = G('hrm-chart-payroll');
  if (!el || !payrows.length) return;
  const labels = payrows.map(p => p.employeeName);
  const gross = payrows.map(p => p.grossSalary);
  const deductions = payrows.map(p => p.totalDeductions);
  const net = payrows.map(p => p.netSalary);
  if (el._chart) el._chart.destroy();
  el._chart = new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'الإجمالي الخام', data: gross, backgroundColor: 'rgba(79,142,247,0.7)' },
        { label: 'الخصومات', data: deductions, backgroundColor: 'rgba(240,84,84,0.7)' },
        { label: 'الصافي', data: net, backgroundColor: 'rgba(45,209,126,0.7)' }
      ]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
  });
}

function renderHRMAttendanceChart(records) {
  const el = G('hrm-chart-attendance');
  if (!el || !records.length) return;
  const statusCounts = {};
  records.forEach(r => { statusCounts[r.status] = (statusCounts[r.status] || 0) + 1; });
  const labels = Object.keys(statusCounts).map(k => ({ present: 'حاضر', absent: 'غائب', late: 'متأخر', half_day: 'نصف يوم', leave: 'إجازة' }[k] || k));
  const data = Object.values(statusCounts);
  const colors = ['#2dd17e', '#f05454', '#f5a623', '#4f8ef7', '#9b59b6'];
  if (el._chart) el._chart.destroy();
  el._chart = new Chart(el, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors.slice(0, data.length) }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });
}

function renderHRMAdvancesChart(advances) {
  const el = G('hrm-chart-advances');
  if (!el || !advances.length) return;
  const byType = { advance: 0, loan: 0 };
  advances.forEach(a => { byType[a.type] = (byType[a.type] || 0) + a.remainingBalance; });
  if (el._chart) el._chart.destroy();
  el._chart = new Chart(el, {
    type: 'pie',
    data: { labels: ['سلف', 'قروض'], datasets: [{ data: [byType.advance, byType.loan], backgroundColor: ['#f5a623', '#4f8ef7'] }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });
}

/* ═══════════════════════════════════════════════════════════════
   PDF EXPORT — PAYROLL SHEET
   ═══════════════════════════════════════════════════════════════ */
function exportPayrollPDF() {
  const payrows = DB._hrmPayrows || [];
  if (!payrows.length) { toast(t('hrm_no_payroll'), 'error'); return; }
  const period = G('hrm-pay-period')?.value || '';
  const totalGross = payrows.reduce((s, p) => s + p.grossSalary, 0);
  const totalDeductions = payrows.reduce((s, p) => s + p.totalDeductions, 0);
  const totalNet = payrows.reduce((s, p) => s + p.netSalary, 0);
  const h = ['#','رقم','الموظف','ساعات العمل','أوفرتايم','أجر الساعة','الإجمالي','الخصومات','الصافي'];
  const rows = payrows.map((p, i) => [
    i + 1, p.employeeNo, p.employeeName,
    p.totalWorkedHours.toFixed(1), p.totalOvertimeHours.toFixed(1),
    fmt(p.hourlyRate), fmt(p.grossSalary),
    fmt(p.totalDeductions), fmt(p.netSalary)
  ]);
  _printGenericPDF('كشف رواتب — ' + period, h, rows, {
    subtitle: 'كشف رواتب الموظفين للفترة: ' + period,
    landscape: true,
    summary: [
      { label: 'الإجمالي الخام', value: fmt(totalGross) + ' '+t('currency_sym'), color: 'blue' },
      { label: 'إجمالي الخصومات', value: fmt(totalDeductions) + ' '+t('currency_sym'), color: 'red' },
      { label: 'صافي الرواتب', value: fmt(totalNet) + ' '+t('currency_sym'), color: 'green' },
      { label: 'عدد الموظفين', value: payrows.length, color: 'purple' }
    ],
    infoItems: [
      { label: 'الفترة', value: period },
      { label: 'عدد الموظفين', value: payrows.length }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   PERFORMANCE TRACKING
   ═══════════════════════════════════════════════════════════════ */
function openPerformanceEval(empId) {
  const emps = DB._hrmEmployees || [];
  const emp = emps.find(e => e._id === empId);
  if (!emp) { toast(t('hrm_choose_employee'), 'error'); return; }
  openModal('hrm-perf-modal');
  G('hrm-perf-emp-id').value = empId;
  G('hrm-perf-emp-name').textContent = `${emp.employeeNo} — ${emp.name}`;
  G('hrm-perf-date').value = new Date().toISOString().slice(0, 10);
}

async function savePerformanceEval() {
  const empId = G('hrm-perf-emp-id')?.value;
  const date = G('hrm-perf-date')?.value || new Date().toISOString().slice(0, 10);
  const quality = +(G('hrm-perf-quality')?.value || 3);
  const productivity = +(G('hrm-perf-productivity')?.value || 3);
  const teamwork = +(G('hrm-perf-teamwork')?.value || 3);
  const attendance = +(G('hrm-perf-attendance')?.value || 3);
  const notes = G('hrm-perf-notes')?.value?.trim() || '';
  if (!empId) { toast(t('hrm_name_required'), 'error'); return; }
  const avg = ((quality + productivity + teamwork + attendance) / 4).toFixed(1);
  const grade = avg >= 4.5 ? 'ممتاز' : avg >= 3.5 ? 'جيد جداً' : avg >= 2.5 ? 'جيد' : avg >= 1.5 ? 'مقبول' : 'ضعيف';
  try {
    const res = await authenticatedFetch('/api/hrm/performance', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: empId, date, quality, productivity, teamwork, attendance, average: +avg, grade, notes })
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    toast(t('hrm_adjustment_done'));
    closeModal('hrm-perf-modal');
    broadcastChange('hrm', { section: 'performance', action: 'add' });
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function renderPerformanceList() {
  const empId = G('hrm-perf-list-emp')?.value || '';
  if (!empId) { G('hrm-perf-list-tbody').innerHTML = '<tr><td colspan="6" class="text-center p-3 text-muted">'+t('hrm_choose_employee')+'</td></tr>'; return; }
  try {
    const res = await authenticatedFetch(`/api/hrm/performance?employeeId=${empId}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const evals = data.evaluations || [];
    const tbody = G('hrm-perf-list-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!evals.length) { tbody.innerHTML = '<tr><td colspan="6" class="text-center p-3 text-muted">'+t('hrm_no_movements')+'</td></tr>'; return; }
    evals.forEach(e => {
      const gradeColor = { 'ممتاز': 'success', 'جيد جداً': 'primary', 'جيد': 'warning', 'مقبول': 'secondary', 'ضعيف': 'danger' }[e.grade] || 'secondary';
      tbody.innerHTML += `<tr>
        <td>${e.date}</td><td>${e.quality}</td><td>${e.productivity}</td><td>${e.teamwork}</td>
        <td><strong>${e.average}</strong></td>
        <td><span class="badge bg-${gradeColor}">${e.grade}</span></td>
      </tr>`;
    });
  } catch (err) {
    console.error('خطأ في تحميل التقييمات:', err);
  }
}

/* ═══════════════════════════════════════════════════════════════
   AUTO BACKUP (periodic HRM data snapshot)
   ═══════════════════════════════════════════════════════════════ */
let _hrmAutoBackupTimer = null;

function startHRMAutoBackup() {
  if (_hrmAutoBackupTimer) return;
  _hrmAutoBackupTimer = setInterval(async () => {
    try {
      const emps = DB._hrmEmployees || [];
      const payrows = DB._hrmPayrows || [];
      const advances = DB._hrmAdvances || [];
      const attendance = DB._hrmAttendance || [];
      const snapshot = {
        date: new Date().toISOString(),
        employees: emps.length,
        activePayrolls: payrows.filter(p => p.status === 'paid').length,
        activeAdvances: advances.filter(a => a.status === 'active').length,
        todayAttendance: attendance.length
      };
      console.log('[HRM Auto-Backup]', JSON.stringify(snapshot));
    } catch (e) {}
  }, 30 * 60 * 1000);
}

function stopHRMAutoBackup() {
  if (_hrmAutoBackupTimer) { clearInterval(_hrmAutoBackupTimer); _hrmAutoBackupTimer = null; }
}

/* ═══════════════════════════════════════════════════════════════
   PERFORMANCE EXPORT — EXCEL & PDF
   ═══════════════════════════════════════════════════════════════ */
async function exportPerformanceExcel() {
  const empId = G('hrm-perf-list-emp')?.value || '';
  if (!empId) { toast(t('hrm_choose_employee'), 'error'); return; }
  try {
    const res = await authenticatedFetch(`/api/hrm/performance?employeeId=${empId}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const evals = data.evaluations || [];
    if (!evals.length) { toast(t('hrm_no_movements'), 'error'); return; }
    const headers = ['التاريخ', 'جودة', 'إنتاجية', 'فريق', 'حضور', 'المتوسط', 'التقدير', 'ملاحظات'];
    const rows = evals.map(e => [e.date, e.quality, e.productivity, e.teamwork, e.attendance, e.average, e.grade, e.notes || '']);
    _exportTable(headers, rows, 'تقييمات-' + empId, 'hrm-performance');
  } catch (err) {
    toast(err.message, 'error');
  }
}

function exportPerformancePDF() {
  const empId = G('hrm-perf-list-emp')?.value || '';
  if (!empId) { toast(t('hrm_choose_employee'), 'error'); return; }
  const emps = DB._hrmEmployees || [];
  const emp = emps.find(e => e._id === empId);
  if (!emp) { toast(t('hrm_choose_employee'), 'error'); return; }
  const tbody = G('hrm-perf-list-tbody');
  if (!tbody || !tbody.rows.length) { toast(t('hrm_no_movements'), 'error'); return; }
  const h = ['التاريخ','جودة','إنتاجية','فريق','حضور','المتوسط','التقدير','ملاحظات'];
  const rows = Array.from(tbody.rows).map(r => Array.from(r.cells).map(c => c.textContent));
  const scores = Array.from(tbody.rows).map(r => parseFloat(r.cells[5]?.textContent) || 0);
  const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '0.0';
  _printGenericPDF('تقييمات الأداء — ' + emp.name, h, rows, {
    subtitle: 'تقييمات أداء الموظف: ' + emp.employeeNo + ' — ' + emp.name,
    summary: [
      { label: 'عدد التقييمات', value: rows.length, color: 'blue' },
      { label: 'متوسط الدرجات', value: avgScore, color: 'purple' }
    ],
    infoItems: [
      { label: 'الموظف', value: emp.employeeNo + ' — ' + emp.name },
      { label: 'عدد التقييمات', value: rows.length }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM ALERTS SETTINGS
   ═══════════════════════════════════════════════════════════════ */
const HRM_ALERTS_KEY = 'hrm_custom_alerts';
function getHRMCustomAlerts() {
  try { return JSON.parse(localStorage.getItem(HRM_ALERTS_KEY) || '[]'); } catch (e) { return []; }
}
function saveHRMCustomAlerts(alerts) {
  localStorage.setItem(HRM_ALERTS_KEY, JSON.stringify(alerts));
}
function addCustomAlert() {
  const type = G('hrm-alert-type')?.value || 'absence';
  const threshold = +(G('hrm-alert-threshold')?.value || 3);
  const enabled = G('hrm-alert-enabled')?.checked !== false;
  const alerts = getHRMCustomAlerts();
  alerts.push({ id: Date.now(), type, threshold, enabled, createdAt: new Date().toISOString() });
  saveHRMCustomAlerts(alerts);
  renderCustomAlerts();
  toast(t('hrm_employee_added'));
}
function removeCustomAlert(id) {
  const alerts = getHRMCustomAlerts().filter(a => a.id !== id);
  saveHRMCustomAlerts(alerts);
  renderCustomAlerts();
}
function renderCustomAlerts() {
  const el = G('hrm-custom-alerts-list');
  if (!el) return;
  const alerts = getHRMCustomAlerts();
  const typeLabels = { absence: 'غياب متتالي', late: 'تأخر متكرر', high_advance: 'رصيد مرتفع', no_checkout: 'بدون خروج' };
  el.innerHTML = alerts.length ? alerts.map(a => `<div style="display:flex;align-items:center;gap:8px;padding:8px;border-bottom:1px solid var(--line)">
    <span style="flex:1">${typeLabels[a.type] || a.type} — ${a.threshold} مرات ${a.enabled ? '(مفعّل)' : '(معطّل)'}</span>
    <button class="btn btn-sm btn-outline-danger" onclick="removeCustomAlert(${a.id})">حذف</button>
  </div>`).join('') : '<div class="text-center text-muted p-3">لا توجد تنبيهات مخصصة</div>';
}
async function checkCustomAlerts() {
  const alerts = getHRMCustomAlerts().filter(a => a.enabled);
  if (!alerts.length) return;
  const notifications = [];
  try {
    const res = await authenticatedFetch('/api/hrm/attendance?from=' + getRecentDate(7));
    const data = await res.json();
    if (data.status === 'success') {
      const records = data.records || [];
      const empDays = {};
      records.forEach(r => {
        if (!empDays[r.employeeId]) empDays[r.employeeId] = { name: r.employeeName, absences: 0, lates: 0, noCheckout: 0 };
        if (r.status === 'absent') empDays[r.employeeId].absences++;
        if (r.status === 'late') empDays[r.employeeId].lates++;
        if (r.checkIn && !r.checkOut) empDays[r.employeeId].noCheckout++;
      });
      alerts.forEach(a => {
        Object.values(empDays).forEach(emp => {
          const count = a.type === 'absence' ? emp.absences : a.type === 'late' ? emp.lates : emp.noCheckout;
          if (count >= a.threshold) {
            notifications.push({ type: 'danger', msg: `${emp.name} — ${a.threshold}+ ${a.type === 'absence' ? 'غياب' : a.type === 'late' ? 'تأخر' : 'خروج'} في آخر 7 أيام`, icon: 'ti ti-alert-triangle' });
          }
        });
      });
    }
  } catch (e) {}
  if (notifications.length) renderHRMNotifications(notifications);
}
function getRecentDate(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

/* ═══════════════════════════════════════════════════════════════
   EMPLOYEE ARCHIVE
   ═══════════════════════════════════════════════════════════════ */
async function openEmployeeArchive(empId) {
  const emps = DB._hrmEmployees || [];
  const emp = emps.find(e => e._id === empId);
  if (!emp) { toast(t('hrm_choose_employee'), 'error'); return; }
  openModal('hrm-archive-modal');
  G('hrm-archive-name').textContent = `${emp.employeeNo} — ${emp.name}`;
  const sections = G('hrm-archive-sections');
  if (!sections) return;
  sections.innerHTML = '<div class="text-center p-3">'+t('loading')+'</div>';
  try {
    const [attRes, advRes, perfRes, payRes] = await Promise.all([
      authenticatedFetch(`/api/hrm/attendance?employeeId=${empId}&from=2020-01-01`),
      authenticatedFetch(`/api/hrm/advances?employeeId=${empId}`),
      authenticatedFetch(`/api/hrm/performance?employeeId=${empId}`),
      authenticatedFetch(`/api/hrm/payroll?employeeId=${empId}`)
    ]);
    const attData = await attRes.json();
    const advData = await advRes.json();
    const perfData = await perfRes.json();
    const payData = await payRes.json();
    const att = attData.records || [];
    const adv = advData.advances || [];
    const perf = perfData.evaluations || [];
    const pay = payData.payrolls || [];
    const totalHours = att.reduce((s, r) => s + r.totalHours, 0);
    const totalOT = att.reduce((s, r) => s + r.overtimeHours, 0);
    const absences = att.filter(r => r.status === 'absent').length;
    const totalPay = pay.reduce((s, p) => s + p.netSalary, 0);
    const activeAdv = adv.filter(a => a.status === 'active').reduce((s, a) => s + a.remainingBalance, 0);
    const avgPerf = perf.length ? (perf.reduce((s, p) => s + p.average, 0) / perf.length).toFixed(1) : '—';
    sections.innerHTML = `
      <div class="stats-grid" style="margin-bottom:14px">
        <div class="stat-card blue"><div class="stat-lbl">إجمالي أيام العمل</div><div class="stat-val">${att.length}</div></div>
        <div class="stat-card green"><div class="stat-lbl">ساعات العمل</div><div class="stat-val">${totalHours.toFixed(1)}</div></div>
        <div class="stat-card amber"><div class="stat-lbl">أوفرتايم</div><div class="stat-val">${totalOT.toFixed(1)}</div></div>
        <div class="stat-card red"><div class="stat-lbl">أيام الغياب</div><div class="stat-val">${absences}</div></div>
      </div>
      <div class="stats-grid" style="margin-bottom:14px">
        <div class="stat-card blue"><div class="stat-lbl">إجمالي الرواتب</div><div class="stat-val">${fmt(totalPay)}</div></div>
        <div class="stat-card green"><div class="stat-lbl">سلف نشطة</div><div class="stat-val">${adv.filter(a=>a.status==='active').length}</div></div>
        <div class="stat-card amber"><div class="stat-lbl">مبلغ السلف المتبقي</div><div class="stat-val">${fmt(activeAdv)}</div></div>
        <div class="stat-card green"><div class="stat-lbl">متوسط التقييم</div><div class="stat-val">${avgPerf}</div></div>
      </div>
      <div class="accounting-note acn-blue">
        <i class="ti ti-info-circle" style="font-size:14px;flex-shrink:0"></i>
        <span>نوع العقد: <strong>${{ full_time: 'دوام كامل', part_time: 'دوام جزئي', hourly: 'بالساعة', contract: 'عقد' }[emp.contractType] || emp.contractType}</strong>
        — القسم: <strong>${emp.department || '—'}</strong> — المنصب: <strong>${emp.position || '—'}</strong>
        — تاريخ الالتحاق: <strong>${emp.startDate || '—'}</strong></span>
      </div>`;
  } catch (err) {
    sections.innerHTML = `<div class="text-center text-danger p-3">${t('barcode_error')}: ${err.message}</div>`;
  }
}

/* ═══════════════════════════════════════════════════════════════
   COMPARATIVE REPORTS — BY DEPARTMENT
   ═══════════════════════════════════════════════════════════════ */
async function renderComparativeReports() {
  const el = G('hrm-comparative');
  if (!el) return;
  try {
    const res = await authenticatedFetch('/api/hrm/employees?status=active');
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message);
    const employees = data.employees || [];
    const deptMap = {};
    employees.forEach(e => {
      const dept = e.department || 'غير محدد';
      if (!deptMap[dept]) deptMap[dept] = { count: 0, totalRate: 0, totalSalary: 0, contracts: {} };
      deptMap[dept].count++;
      deptMap[dept].totalRate += e.hourlyRate || 0;
      deptMap[dept].totalSalary += e.monthlySalary || 0;
      deptMap[dept].contracts[e.contractType] = (deptMap[dept].contracts[e.contractType] || 0) + 1;
    });
    const rows = Object.entries(deptMap).map(([dept, d]) => {
      const avgRate = d.count ? (d.totalRate / d.count).toFixed(2) : 0;
      const contracts = Object.entries(d.contracts).map(([k, v]) => `${k}:${v}`).join(' / ');
      return `<tr><td><strong>${dept}</strong></td><td>${d.count}</td><td>${fmt(avgRate)}</td><td>${fmt(d.totalSalary)}</td><td>${contracts}</td></tr>`;
    }).join('');
    el.innerHTML = `
      <div class="card">
        <div class="card-hd"><h3><i class="ti ti-building-community" style="color:var(--accent)"></i> مقارنة أقسام الموظفين</h3></div>
        <div class="tbl-wrap"><table class="table"><thead><tr><th>القسم</th><th>العدد</th><th>متوسط أجر الساعة</th><th>إجمالي الرواتب</th><th>أنواع العقود</th></tr></thead><tbody>${rows || '<tr><td colspan="5" class="text-center p-3 text-muted">لا توجد بيانات</td></tr>'}</tbody></table></div>
      </div>`;
    renderComparativeChart(deptMap);
  } catch (err) {
    el.innerHTML = `<div class="text-center text-danger p-3">${t('barcode_error')}: ${err.message}</div>`;
  }
}

function renderComparativeChart(deptMap) {
  const el = G('hrm-chart-comparative');
  if (!el) return;
  const labels = Object.keys(deptMap);
  const counts = labels.map(d => deptMap[d].count);
  const salaries = labels.map(d => deptMap[d].totalSalary);
  if (el._chart) el._chart.destroy();
  el._chart = new Chart(el, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'عدد الموظفين', data: counts, backgroundColor: 'rgba(79,142,247,0.7)', yAxisID: 'y' },
        { label: 'إجمالي الرواتب', data: salaries, backgroundColor: 'rgba(45,209,126,0.7)', yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      scales: {
        y: { type: 'linear', position: 'left', beginAtZero: true, title: { display: true, text: 'العدد' } },
        y1: { type: 'linear', position: 'right', beginAtZero: true, title: { display: true, text: 'الرواتب' }, grid: { drawOnChartArea: false } }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   PWA SERVICE WORKER REGISTRATION
   ═══════════════════════════════════════════════════════════════ */
function registerHRMSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

/* ═══════════════════════════════════════════════════════════════
   PDF EXPORT — ATTENDANCE SHEET
   ═══════════════════════════════════════════════════════════════ */
function exportAttendancePDF() {
  const records = DB._hrmAttendance || [];
  if (!records.length) { toast(t('hrm_no_attendance'), 'error'); return; }
  const date = G('hrm-att-date')?.value || new Date().toISOString().slice(0, 10);
  const h = ['#','رقم الموظف','الموظف','دخول','خروج','الساعات','الحالة'];
  const rows = records.map((r, i) => {
    const statusLabel = { present: 'حاضر', absent: 'غائب', late: 'متأخر', half_day: 'نصف يوم', leave: 'إجازة' }[r.status] || r.status;
    return [i + 1, r.employeeNo, r.employeeName, r.checkIn || '—', r.checkOut || '—', r.totalHours.toFixed(1), statusLabel];
  });
  const present = records.filter(r => r.status === 'present').length;
  const absent = records.filter(r => r.status === 'absent').length;
  const late = records.filter(r => r.status === 'late').length;
  _printGenericPDF('سجل الحضور — ' + date, h, rows, {
    subtitle: 'سجل حضور وانصراف الموظفين',
    landscape: true,
    summary: [
      { label: 'العدد الإجمالي', value: records.length, color: 'blue' },
      { label: 'حاضرون', value: present, color: 'green' },
      { label: 'غائبون', value: absent, color: 'red' },
      { label: 'متأخرون', value: late, color: 'amber' }
    ],
    infoItems: [
      { label: 'التاريخ', value: date },
      { label: 'العدد', value: records.length + ' سجل' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   PDF EXPORT — CASH LEDGER SHEET
   ═══════════════════════════════════════════════════════════════ */
function exportCashLedgerPDF() {
  const entries = DB._hrmCashLedger || [];
  if (!entries.length) { toast(t('hrm_no_movements'), 'error'); return; }
  const h = ['التاريخ','النوع','المبلغ','الرصيد','الفئة','الوصف','الموظف'];
  const rows = entries.map(e => {
    const typeLabel = e.type === 'in' ? 'وارد' : 'صادر';
    return [e.date, typeLabel, fmt(e.amount), fmt(e.balanceAfter), e.category, e.description, e.employeeName || '—'];
  });
  const totalIn = entries.filter(e => e.type === 'in').reduce((s, e) => s + e.amount, 0);
  const totalOut = entries.filter(e => e.type === 'out').reduce((s, e) => s + e.amount, 0);
  _printGenericPDF('سجل الخزينة', h, rows, {
    subtitle: 'سجل الحركات النقدية',
    landscape: true,
    summary: [
      { label: 'الوارد', value: fmt(totalIn) + ' '+t('currency_sym'), color: 'green' },
      { label: 'الصادر', value: fmt(totalOut) + ' '+t('currency_sym'), color: 'red' },
      { label: 'الصافي', value: fmt(totalIn - totalOut) + ' '+t('currency_sym'), color: 'blue' },
      { label: 'عدد الحركات', value: entries.length, color: 'purple' }
    ]
  });
}

/* ═══════════════════════════════════════════════════════════════
   PDF EXPORT — ADVANCES SHEET
   ═══════════════════════════════════════════════════════════════ */
function exportAdvancesPDF() {
  const advances = DB._hrmAdvances || [];
  if (!advances.length) { toast(t('hrm_no_advances'), 'error'); return; }
  const h = ['#','التاريخ','الموظف','النوع','المبلغ','المتبقي','الأقساط','الحالة'];
  const rows = advances.map((a, i) => {
    const typeLabel = a.type === 'advance' ? 'سلفة' : 'قرض';
    const statusLabel = { active: 'نشط', completed: 'مسدد', cancelled: 'ملغي' }[a.status] || a.status;
    return [i + 1, a.date, a.employeeName, typeLabel, fmt(a.amount), fmt(a.remainingBalance), a.installmentsPaid + '/' + a.installmentsTotal, statusLabel];
  });
  const totalAdvance = advances.filter(a => a.type === 'advance').reduce((s, a) => s + a.amount, 0);
  const totalLoan = advances.filter(a => a.type === 'loan').reduce((s, a) => s + a.amount, 0);
  const totalRemaining = advances.reduce((s, a) => s + a.remainingBalance, 0);
  _printGenericPDF('السلف والقروض', h, rows, {
    subtitle: 'سجل سلف وقروض الموظفين',
    landscape: true,
    summary: [
      { label: 'إجمالي السلف', value: fmt(totalAdvance) + ' '+t('currency_sym'), color: 'blue' },
      { label: 'إجمالي القروض', value: fmt(totalLoan) + ' '+t('currency_sym'), color: 'purple' },
      { label: 'المتبقي', value: fmt(totalRemaining) + ' '+t('currency_sym'), color: 'red' },
      { label: 'العدد', value: advances.length, color: 'amber' }
    ]
  });
}

