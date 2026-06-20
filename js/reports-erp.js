/* ═══════════════════════════════════════════════════════════════
   ERP REPORT ENGINE — نظام التقارير المتقدم
   ═══════════════════════════════════════════════════════════════ */

const ERP = {
  _currentTemplate: null,
  _filters: {},
  _sortCol: null,
  _sortDir: 'asc',
  _groupCol: null,
  _visibleCols: [],
  _rawData: [],
  _filteredData: [],
  _savedReports: [],
  _activeQuickDate: '',
  _charts: {},
  _TEMPLATES: {}
};

const ERP_COL_KEY = 'erp_visible_cols';
const ERP_SAVED_KEY = 'erp_saved_reports';

function erpInit() {
  try { ERP._visibleCols = JSON.parse(localStorage.getItem(ERP_COL_KEY) || '[]'); } catch (e) { ERP._visibleCols = []; }
  try { ERP._savedReports = JSON.parse(localStorage.getItem(ERP_SAVED_KEY) || '[]'); } catch (e) { ERP._savedReports = []; }
  erpRegisterTemplates();
}

/* ═══════════════════════════════════════════════════════════════
   TEMPLATE REGISTRY — 8 قوالب تقارير جاهزة
   ═══════════════════════════════════════════════════════════════ */
function erpRegisterTemplates() {
  ERP._TEMPLATES = {
    'payroll-summary': {
      name: 'ملخص الرواتب', icon: 'ti ti-cash', color: 'blue',
      desc: 'ملخص شامل للرواتب مع الخصومات والصافي',
      defaultCols: ['period', 'employeeNo', 'employeeName', 'totalWorkedHours', 'grossSalary', 'totalDeductions', 'netSalary', 'status'],
      allCols: [
        { key: 'period', label: 'الفترة' }, { key: 'employeeNo', label: 'رقم الموظف' },
        { key: 'employeeName', label: 'الموظف' }, { key: 'department', label: 'القسم' },
        { key: 'totalWorkedHours', label: 'الساعات', num: true },
        { key: 'totalOvertimeHours', label: 'أوفرتايم', num: true },
        { key: 'hourlyRate', label: 'أجر الساعة', num: true, fmt: true },
        { key: 'grossSalary', label: 'الإجمالي الخام', num: true, fmt: true },
        { key: 'advanceDeduction', label: 'خصم السلف', num: true, fmt: true },
        { key: 'loanDeduction', label: 'خصم القروض', num: true, fmt: true },
        { key: 'totalDeductions', label: 'إجمالي الخصومات', num: true, fmt: true },
        { key: 'netSalary', label: 'الصافي', num: true, fmt: true },
        { key: 'status', label: 'الحالة', badge: { draft: 'مسودة', approved: 'معتمدة', paid: 'مدفوعة', cancelled: 'ملغاة' } }
      ],
      groupBy: ['none', 'status', 'department', 'period'],
      groupLabels: { none: 'بدون', status: 'الحالة', department: 'القسم', period: 'الفترة' },
      fetchData: async () => {
        const all = [];
        const months = erpGetRecentMonths(6);
        for (const m of months) {
          try {
            const r = await authenticatedFetch('/api/hrm/payroll/summary/' + m);
            const d = await r.json();
            if (d.status === 'success') (d.payrolls || []).forEach(p => all.push(p));
          } catch (e) {}
        }
        return all;
      },
      kpiBuilder: (data) => {
        const total = data.length;
        const paid = data.filter(r => r.status === 'paid').length;
        const totalGross = data.reduce((s, r) => s + (r.grossSalary || 0), 0);
        const totalNet = data.reduce((s, r) => s + (r.netSalary || 0), 0);
        const totalDed = data.reduce((s, r) => s + (r.totalDeductions || 0), 0);
        const avgSalary = total ? totalNet / total : 0;
        return [
          { label: 'عدد سجلات الرواتب', value: total, icon: 'ti ti-file-invoice', color: 'blue' },
          { label: 'إجمالي الخام', value: fmt(totalGross), icon: 'ti ti-cash', color: 'green' },
          { label: 'إجمالي الخصومات', value: fmt(totalDed), icon: 'ti ti-discount', color: 'amber' },
          { label: 'صافي الرواتب', value: fmt(totalNet), icon: 'ti ti-wallet', color: 'purple' },
          { label: 'متوسط الراتب', value: fmt(avgSalary), icon: 'ti ti-calculator', color: 'cyan' },
          { label: 'مدفوعة', value: paid + ' / ' + total, icon: 'ti ti-check', color: 'green' }
        ];
      },
      chartBuilder: (data) => {
        const byMonth = {};
        data.forEach(r => {
          const m = r.period || 'غير محدد';
          if (!byMonth[m]) byMonth[m] = { gross: 0, net: 0, deductions: 0 };
          byMonth[m].gross += r.grossSalary || 0;
          byMonth[m].net += r.netSalary || 0;
          byMonth[m].deductions += r.totalDeductions || 0;
        });
        const labels = Object.keys(byMonth);
        return [
          { type: 'bar', title: 'الرواتب حسب الشهر', labels, series: [
            { label: 'ال الخام', data: labels.map(l => byMonth[l].gross), color: '79,142,247' },
            { label: 'الصافي', data: labels.map(l => byMonth[l].net), color: '45,209,126' },
            { label: 'الخصومات', data: labels.map(l => byMonth[l].deductions), color: '240,84,84' }
          ]}
        ];
      }
    },

    'attendance-detail': {
      name: 'تقرير الحضور التفصيلي', icon: 'ti ti-clock', color: 'cyan',
      desc: 'سجل حضور وانصراف يومي تفصيلي',
      defaultCols: ['date', 'employeeNo', 'employeeName', 'department', 'checkIn', 'checkOut', 'totalHours', 'overtimeHours', 'status'],
      allCols: [
        { key: 'date', label: 'التاريخ' }, { key: 'employeeNo', label: 'رقم الموظف' },
        { key: 'employeeName', label: 'الموظف' }, { key: 'department', label: 'القسم' },
        { key: 'checkIn', label: 'الدخول' }, { key: 'checkOut', label: 'الخروج' },
        { key: 'totalHours', label: 'الساعات', num: true, dec: 1 },
        { key: 'overtimeHours', label: 'أوفرتايم', num: true, dec: 1 },
        { key: 'status', label: 'الحالة', badge: { present: 'حاضر', absent: 'غائب', late: 'متأخر', half_day: 'نصف يوم', leave: 'إجازة' } }
      ],
      groupBy: ['none', 'status', 'department', 'date'],
      groupLabels: { none: 'بدون', status: 'الحالة', department: 'القسم', date: 'التاريخ' },
      fetchData: async () => {
        const from = ERP._filters.dateFrom || erpGetRecentDate(30);
        const to = ERP._filters.dateTo || erpGetToday();
        try {
          const r = await authenticatedFetch(`/api/hrm/attendance?from=${from}&to=${to}`);
          const d = await r.json();
          return d.status === 'success' ? (d.records || []) : [];
        } catch (e) { return []; }
      },
      kpiBuilder: (data) => {
        const total = data.length;
        const present = data.filter(r => r.status === 'present').length;
        const absent = data.filter(r => r.status === 'absent').length;
        const late = data.filter(r => r.status === 'late').length;
        const hours = data.reduce((s, r) => s + (r.totalHours || 0), 0);
        const ot = data.reduce((s, r) => s + (r.overtimeHours || 0), 0);
        const rate = total ? ((present / total) * 100).toFixed(1) : 0;
        return [
          { label: 'إجمالي السجلات', value: total, icon: 'ti ti-list', color: 'blue' },
          { label: 'حاضرون', value: present, icon: 'ti ti-user-check', color: 'green' },
          { label: 'غائبون', value: absent, icon: 'ti ti-user-x', color: 'red' },
          { label: 'متأخرون', value: late, icon: 'ti ti-clock', color: 'amber' },
          { label: 'إجمالي الساعات', value: hours.toFixed(1), icon: 'ti ti-clock-hour-4', color: 'cyan' },
          { label: 'نسبة الحضور', value: rate + '%', icon: 'ti ti-chart-donut', color: 'purple' }
        ];
      },
      chartBuilder: (data) => {
        const byDate = {};
        data.forEach(r => {
          const d = r.date || 'غير محدد';
          if (!byDate[d]) byDate[d] = { present: 0, absent: 0, late: 0 };
          if (r.status === 'present') byDate[d].present++;
          else if (r.status === 'absent') byDate[d].absent++;
          else if (r.status === 'late') byDate[d].late++;
        });
        const labels = Object.keys(byDate).sort();
        return [
          { type: 'line', title: 'الحضور اليومي', labels, series: [
            { label: 'حاضر', data: labels.map(l => byDate[l].present), color: '45,209,126' },
            { label: 'متأخر', data: labels.map(l => byDate[l].late), color: '245,166,35' },
            { label: 'غائب', data: labels.map(l => byDate[l].absent), color: '240,84,84' }
          ]}
        ];
      }
    },

    'advances-report': {
      name: 'تقرير السلف والقروض', icon: 'ti ti-coins', color: 'amber',
      desc: 'ملخص السلف والقروض النشطة والمدفوعة',
      defaultCols: ['date', 'employeeName', 'department', 'type', 'amount', 'monthlyInstallment', 'remainingBalance', 'installmentsPaid', 'installmentsTotal', 'status'],
      allCols: [
        { key: 'date', label: 'التاريخ' }, { key: 'employeeNo', label: 'رقم الموظف' },
        { key: 'employeeName', label: 'الموظف' }, { key: 'department', label: 'القسم' },
        { key: 'type', label: 'النوع', badge: { advance: 'سلفة', loan: 'قرض' } },
        { key: 'amount', label: 'المبلغ', num: true, fmt: true },
        { key: 'monthlyInstallment', label: 'القسط الشهري', num: true, fmt: true },
        { key: 'remainingBalance', label: 'المتبقي', num: true, fmt: true },
        { key: 'installmentsPaid', label: 'الأقساط المدفوعة', num: true },
        { key: 'installmentsTotal', label: 'عدد الأقساط', num: true },
        { key: 'status', label: 'الحالة', badge: { active: 'نشط', completed: 'مسدد', cancelled: 'ملغي' } },
        { key: 'purpose', label: 'السبب' }
      ],
      groupBy: ['none', 'type', 'status', 'department'],
      groupLabels: { none: 'بدون', type: 'النوع', status: 'الحالة', department: 'القسم' },
      fetchData: async () => {
        try {
          const r = await authenticatedFetch('/api/hrm/advances');
          const d = await r.json();
          return d.status === 'success' ? (d.advances || []) : [];
        } catch (e) { return []; }
      },
      kpiBuilder: (data) => {
        const total = data.length;
        const active = data.filter(r => r.status === 'active').length;
        const totalAmt = data.reduce((s, r) => s + (r.amount || 0), 0);
        const totalRemaining = data.reduce((s, r) => s + (r.remainingBalance || 0), 0);
        const advs = data.filter(r => r.type === 'advance').reduce((s, r) => s + (r.amount || 0), 0);
        const loans = data.filter(r => r.type === 'loan').reduce((s, r) => s + (r.amount || 0), 0);
        return [
          { label: 'إجمالي السلف والقروض', value: total, icon: 'ti ti-coins', color: 'amber' },
          { label: 'نشطة', value: active, icon: 'ti ti-player-play', color: 'green' },
          { label: 'إجمالي المبالغ', value: fmt(totalAmt), icon: 'ti ti-cash', color: 'blue' },
          { label: 'المتبقي', value: fmt(totalRemaining), icon: 'ti ti-wallet', color: 'red' },
          { label: 'السلف', value: fmt(advs), icon: 'ti ti-hand-click', color: 'purple' },
          { label: 'القروض', value: fmt(loans), icon: 'ti ti-building-bank', color: 'cyan' }
        ];
      },
      chartBuilder: (data) => {
        const byEmp = {};
        data.forEach(r => {
          const name = r.employeeName || 'غير محدد';
          if (!byEmp[name]) byEmp[name] = { advance: 0, loan: 0 };
          if (r.type === 'advance') byEmp[name].advance += r.amount || 0;
          else byEmp[name].loan += r.amount || 0;
        });
        const labels = Object.keys(byEmp);
        return [
          { type: 'bar', title: 'السلف حسب الموظف', labels, series: [
            { label: 'سلف', data: labels.map(l => byEmp[l].advance), color: '79,142,247' },
            { label: 'قروض', data: labels.map(l => byEmp[l].loan), color: '155,114,247' }
          ]}
        ];
      }
    },

    'performance-report': {
      name: 'تقرير الأداء', icon: 'ti ti-star', color: 'purple',
      desc: 'تقييمات الأداء مع المقارنات',
      defaultCols: ['employeeName', 'department', 'quality', 'productivity', 'teamwork', 'attendance', 'average', 'grade'],
      allCols: [
        { key: 'employeeNo', label: 'رقم الموظف' }, { key: 'employeeName', label: 'الموظف' },
        { key: 'department', label: 'القسم' }, { key: 'date', label: 'التاريخ' },
        { key: 'quality', label: 'جودة العمل', num: true },
        { key: 'productivity', label: 'الإنتاجية', num: true },
        { key: 'teamwork', label: 'العمل الجماعي', num: true },
        { key: 'attendance', label: 'الحضور', num: true },
        { key: 'average', label: 'المتوسط', num: true, dec: 1 },
        { key: 'grade', label: 'التقدير', badge: { excellent: 'ممتاز', good: 'جيد جداً', acceptable: 'جيد', poor: 'ضعيف' } }
      ],
      groupBy: ['none', 'grade', 'department'],
      groupLabels: { none: 'بدون', grade: 'التقدير', department: 'القسم' },
      fetchData: async () => {
        try {
          const r = await authenticatedFetch('/api/hrm/performance');
          const d = await r.json();
          return d.status === 'success' ? (d.evaluations || []) : [];
        } catch (e) { return []; }
      },
      kpiBuilder: (data) => {
        const total = data.length;
        const avgAll = total ? (data.reduce((s, r) => s + (r.average || 0), 0) / total).toFixed(1) : '0';
        const excellent = data.filter(r => r.average >= 4.5).length;
        const good = data.filter(r => r.average >= 3.5 && r.average < 4.5).length;
        const poor = data.filter(r => r.average < 3).length;
        return [
          { label: 'عدد التقييمات', value: total, icon: 'ti ti-star', color: 'purple' },
          { label: 'متوسط الأداء العام', value: avgAll, icon: 'ti ti-chart-bar', color: 'blue' },
          { label: 'ممتاز', value: excellent, icon: 'ti ti-trophy', color: 'green' },
          { label: 'جيد جداً', value: good, icon: 'ti ti-thumb-up', color: 'cyan' },
          { label: 'ضعيف', value: poor, icon: 'ti ti-alert-triangle', color: 'red' },
          { label: 'نسبة التميز', value: total ? ((excellent / total) * 100).toFixed(0) + '%' : '0%', icon: 'ti ti-percentage', color: 'amber' }
        ];
      },
      chartBuilder: (data) => {
        const byDept = {};
        data.forEach(r => {
          const dept = r.department || 'غير محدد';
          if (!byDept[dept]) byDept[dept] = { total: 0, count: 0 };
          byDept[dept].total += r.average || 0;
          byDept[dept].count++;
        });
        const labels = Object.keys(byDept);
        return [
          { type: 'radar', title: 'مقارنة أداء الأقسام', labels, series: [
            { label: 'متوسط الأداء', data: labels.map(l => +(byDept[l].total / byDept[l].count).toFixed(1)), color: '155,114,247' }
          ]}
        ];
      }
    },

    'cash-ledger': {
      name: 'سجل الخزينة', icon: 'ti ti-wallet', color: 'green',
      desc: 'حركات الخزينة الواردة والصادرة',
      defaultCols: ['date', 'type', 'amount', 'balanceAfter', 'category', 'description', 'employeeName'],
      allCols: [
        { key: 'date', label: 'التاريخ' },
        { key: 'type', label: 'النوع', badge: { in: 'وارد', out: 'صادر' } },
        { key: 'amount', label: 'المبلغ', num: true, fmt: true },
        { key: 'balanceAfter', label: 'الرصيد', num: true, fmt: true },
        { key: 'category', label: 'الفئة' },
        { key: 'description', label: 'الوصف' },
        { key: 'employeeName', label: 'الموظف' }
      ],
      groupBy: ['none', 'type', 'category'],
      groupLabels: { none: 'بدون', type: 'النوع', category: 'الفئة' },
      fetchData: async () => {
        try {
          const r = await authenticatedFetch('/api/hrm/cash-ledger');
          const d = await r.json();
          return d.status === 'success' ? (d.entries || []) : [];
        } catch (e) { return []; }
      },
      kpiBuilder: (data) => {
        const totalIn = data.filter(e => e.type === 'in').reduce((s, e) => s + (e.amount || 0), 0);
        const totalOut = data.filter(e => e.type === 'out').reduce((s, e) => s + (e.amount || 0), 0);
        const net = totalIn - totalOut;
        return [
          { label: 'إجمالي الوارد', value: fmt(totalIn), icon: 'ti ti-arrow-down', color: 'green' },
          { label: 'إجمالي الصادر', value: fmt(totalOut), icon: 'ti ti-arrow-up', color: 'red' },
          { label: 'الصافي', value: fmt(net), icon: 'ti ti-scale', color: net >= 0 ? 'blue' : 'red' },
          { label: 'عدد الحركات', value: data.length, icon: 'ti ti-list', color: 'purple' }
        ];
      },
      chartBuilder: (data) => {
        const byDate = {};
        data.forEach(e => {
          const d = e.date || 'غير محدد';
          if (!byDate[d]) byDate[d] = { in: 0, out: 0 };
          if (e.type === 'in') byDate[d].in += e.amount || 0;
          else byDate[d].out += e.amount || 0;
        });
        const labels = Object.keys(byDate).sort();
        return [
          { type: 'bar', title: 'الحركات اليومية', labels, series: [
            { label: 'وارد', data: labels.map(l => byDate[l].in), color: '45,209,126' },
            { label: 'صادر', data: labels.map(l => byDate[l].out), color: '240,84,84' }
          ]}
        ];
      }
    },

    'department-comparison': {
      name: 'مقارنة الأقسام', icon: 'ti ti-building-community', color: 'cyan',
      desc: 'مقارنة شاملة بين أقسام الموظفين',
      defaultCols: ['department', 'count', 'avgRate', 'totalSalary', 'totalHours', 'avgPerformance', 'contracts'],
      allCols: [
        { key: 'department', label: 'القسم' }, { key: 'count', label: 'العدد', num: true },
        { key: 'avgRate', label: 'متوسط أجر الساعة', num: true, fmt: true },
        { key: 'totalSalary', label: 'إجمالي الرواتب', num: true, fmt: true },
        { key: 'totalHours', label: 'إجمالي الساعات', num: true },
        { key: 'avgPerformance', label: 'متوسط الأداء', num: true, dec: 1 },
        { key: 'contracts', label: 'أنواع العقود' }
      ],
      groupBy: ['none'],
      groupLabels: { none: 'تجميع تلقائي حسب القسم' },
      fetchData: async () => {
        const emps = DB._hrmEmployees || [];
        const deptMap = {};
        emps.forEach(e => {
          const dept = e.department || 'غير محدد';
          if (!deptMap[dept]) deptMap[dept] = { count: 0, totalRate: 0, totalSalary: 0, totalHours: 0, performances: [], contracts: {} };
          deptMap[dept].count++;
          deptMap[dept].totalRate += e.hourlyRate || 0;
          deptMap[dept].totalSalary += e.monthlySalary || 0;
          deptMap[dept].contracts[e.contractType] = (deptMap[dept].contracts[e.contractType] || 0) + 1;
        });
        try {
          const attRes = await authenticatedFetch('/api/hrm/attendance?from=' + erpGetRecentDate(30));
          const attData = await attRes.json();
          if (attData.status === 'success') {
            (attData.records || []).forEach(r => {
              const emp = emps.find(e => e._id === r.employeeId);
              if (emp && deptMap[emp.department]) deptMap[emp.department].totalHours += r.totalHours || 0;
            });
          }
        } catch (e) {}
        try {
          const perfRes = await authenticatedFetch('/api/hrm/performance');
          const perfData = await perfRes.json();
          if (perfData.status === 'success') {
            (perfData.evaluations || []).forEach(p => {
              const emp = emps.find(e => e._id === p.employeeId);
              if (emp && deptMap[emp.department]) deptMap[emp.department].performances.push(p.average || 0);
            });
          }
        } catch (e) {}
        return Object.entries(deptMap).map(([dept, d]) => ({
          department: dept, count: d.count, avgRate: d.count ? +(d.totalRate / d.count).toFixed(2) : 0,
          totalSalary: d.totalSalary, totalHours: +d.totalHours.toFixed(1),
          avgPerformance: d.performances.length ? +(d.performances.reduce((a, b) => a + b, 0) / d.performances.length).toFixed(1) : 0,
          contracts: Object.entries(d.contracts).map(([k, v]) => `${k}:${v}`).join(' / ')
        }));
      },
      kpiBuilder: (data) => {
        const totalEmp = data.reduce((s, d) => s + d.count, 0);
        const totalSalary = data.reduce((s, d) => s + d.totalSalary, 0);
        const avgPerf = data.filter(d => d.avgPerformance).length ? (data.reduce((s, d) => s + d.avgPerformance, 0) / data.filter(d => d.avgPerformance).length).toFixed(1) : '0';
        return [
          { label: 'عدد الأقسام', value: data.length, icon: 'ti ti-building', color: 'blue' },
          { label: 'إجمالي الموظفين', value: totalEmp, icon: 'ti ti-users', color: 'green' },
          { label: 'إجمالي الرواتب', value: fmt(totalSalary), icon: 'ti ti-cash', color: 'amber' },
          { label: 'متوسط الأداء', value: avgPerf, icon: 'ti ti-star', color: 'purple' }
        ];
      },
      chartBuilder: (data) => {
        const labels = data.map(d => d.department);
        return [
          { type: 'bar', title: 'مقارنة الأقسام', labels, series: [
            { label: 'عدد الموظفين', data: data.map(d => d.count), color: '79,142,247' },
            { label: 'إجمالي الرواتب', data: data.map(d => d.totalSalary), color: '45,209,126' }
          ]},
          { type: 'doughnut', title: 'توزيع الموظفين', labels, series: [
            { label: 'الموظفين', data: data.map(d => d.count), color: '79,142,247' }
          ]}
        ];
      }
    },

    'monthly-comparison': {
      name: 'مقارنة الأشهر', icon: 'ti ti-calendar', color: 'amber',
      desc: 'مقارنة أداء الأشهر المختلفة',
      defaultCols: ['month', 'totalGross', 'totalNet', 'totalDeductions', 'attendanceRate', 'totalOT'],
      allCols: [
        { key: 'month', label: 'الشهر' },
        { key: 'totalGross', label: 'إجمالي الخام', num: true, fmt: true },
        { key: 'totalNet', label: 'الصافي', num: true, fmt: true },
        { key: 'totalDeductions', label: 'الخصومات', num: true, fmt: true },
        { key: 'attendanceRate', label: 'نسبة الحضور', num: true, suffix: '%' },
        { key: 'totalOT', label: 'أوفرتايم', num: true, dec: 1 },
        { key: 'empCount', label: 'عدد الموظفين', num: true }
      ],
      groupBy: ['none'],
      groupLabels: { none: 'تجميع تلقائي حسب الشهر' },
      fetchData: async () => {
        const months = erpGetRecentMonths(6);
        const results = [];
        for (const m of months) {
          const row = { month: m, totalGross: 0, totalNet: 0, totalDeductions: 0, attendanceRate: 0, totalOT: 0, empCount: 0 };
          try {
            const r = await authenticatedFetch('/api/hrm/payroll/summary/' + m);
            const d = await r.json();
            if (d.status === 'success' && d.payrolls) {
              row.totalGross = d.payrolls.reduce((s, p) => s + (p.grossSalary || 0), 0);
              row.totalNet = d.payrolls.reduce((s, p) => s + (p.netSalary || 0), 0);
              row.totalDeductions = d.payrolls.reduce((s, p) => s + (p.totalDeductions || 0), 0);
              row.empCount = d.payrolls.length;
            }
          } catch (e) {}
          try {
            const from = m + '-01';
            const to = m + '-31';
            const r2 = await authenticatedFetch(`/api/hrm/attendance?from=${from}&to=${to}`);
            const d2 = await r2.json();
            if (d2.status === 'success' && d2.records) {
              const total = d2.records.length;
              const present = d2.records.filter(r => r.status === 'present').length;
              row.attendanceRate = total ? +((present / total) * 100).toFixed(1) : 0;
              row.totalOT = d2.records.reduce((s, r) => s + (r.overtimeHours || 0), 0);
            }
          } catch (e) {}
          results.push(row);
        }
        return results;
      },
      kpiBuilder: (data) => {
        if (!data.length) return [];
        const latest = data[data.length - 1];
        const prev = data.length > 1 ? data[data.length - 2] : null;
        const grossDelta = prev ? latest.totalGross - prev.totalGross : 0;
        const netDelta = prev ? latest.totalNet - prev.totalNet : 0;
        return [
          { label: 'آخر شهر — الخام', value: fmt(latest.totalGross), icon: 'ti ti-cash', color: 'blue' },
          { label: 'آخر شهر — الصافي', value: fmt(latest.totalNet), icon: 'ti ti-wallet', color: 'green' },
          { label: 'الخصومات', value: fmt(latest.totalDeductions), icon: 'ti ti-discount', color: 'amber' },
          { label: 'نسبة الحضور', value: latest.attendanceRate + '%', icon: 'ti ti-chart-donut', color: 'cyan' },
          { label: 'الفرق — الخام', value: (grossDelta >= 0 ? '+' : '') + fmt(grossDelta), icon: grossDelta >= 0 ? 'ti ti-trending-up' : 'ti ti-trending-down', color: grossDelta >= 0 ? 'green' : 'red' },
          { label: 'الفرق — الصافي', value: (netDelta >= 0 ? '+' : '') + fmt(netDelta), icon: netDelta >= 0 ? 'ti ti-trending-up' : 'ti ti-trending-down', color: netDelta >= 0 ? 'green' : 'red' }
        ];
      },
      chartBuilder: (data) => {
        const labels = data.map(d => d.month);
        return [
          { type: 'line', title: 'تطور الرواتب', labels, series: [
            { label: 'الخام', data: data.map(d => d.totalGross), color: '79,142,247' },
            { label: 'الصافي', data: data.map(d => d.totalNet), color: '45,209,126' },
            { label: 'الخصومات', data: data.map(d => d.totalDeductions), color: '240,84,84' }
          ]},
          { type: 'line', title: 'نسبة الحضور والأوفرتايم', labels, series: [
            { label: 'نسبة الحضور %', data: data.map(d => d.attendanceRate), color: '45,209,126' },
            { label: 'أوفرتايم', data: data.map(d => d.totalOT), color: '245,166,35' }
          ]}
        ];
      }
    },

    'executive-summary': {
      name: 'الملخص التنفيذي', icon: 'ti ti-dashboard', color: 'blue',
      desc: 'نظرة شاملة على جميع مكونات HRM',
      defaultCols: ['metric', 'currentMonth', 'previousMonth', 'change'],
      allCols: [
        { key: 'metric', label: 'المقياس' },
        { key: 'currentMonth', label: 'الشهر الحالي', num: true, fmt: true },
        { key: 'previousMonth', label: 'الشهر السابق', num: true, fmt: true },
        { key: 'change', label: 'التغيير %', num: true, suffix: '%', dec: 1 }
      ],
      groupBy: ['none'],
      groupLabels: { none: 'تجميع تلقائي' },
      fetchData: async () => {
        const thisMonth = erpGetCurrentMonth();
        const lastMonth = erpGetLastMonth();
        const metrics = [];
        let currentPay = { gross: 0, net: 0, deductions: 0, count: 0 };
        let prevPay = { gross: 0, net: 0, deductions: 0, count: 0 };
        let currentAtt = { total: 0, present: 0, ot: 0 };
        let prevAtt = { total: 0, present: 0, ot: 0 };
        let currentAdv = { active: 0, totalBalance: 0 };
        let prevAdv = { active: 0, totalBalance: 0 };

        try {
          const r = await authenticatedFetch('/api/hrm/payroll/summary/' + thisMonth);
          const d = await r.json();
          if (d.status === 'success' && d.payrolls) {
            currentPay.count = d.payrolls.length;
            currentPay.gross = d.payrolls.reduce((s, p) => s + (p.grossSalary || 0), 0);
            currentPay.net = d.payrolls.reduce((s, p) => s + (p.netSalary || 0), 0);
            currentPay.deductions = d.payrolls.reduce((s, p) => s + (p.totalDeductions || 0), 0);
          }
        } catch (e) {}
        try {
          const r2 = await authenticatedFetch('/api/hrm/payroll/summary/' + lastMonth);
          const d2 = await r2.json();
          if (d2.status === 'success' && d2.payrolls) {
            prevPay.count = d2.payrolls.length;
            prevPay.gross = d2.payrolls.reduce((s, p) => s + (p.grossSalary || 0), 0);
            prevPay.net = d2.payrolls.reduce((s, p) => s + (p.netSalary || 0), 0);
            prevPay.deductions = d2.payrolls.reduce((s, p) => s + (p.totalDeductions || 0), 0);
          }
        } catch (e) {}

        try {
          const from = thisMonth + '-01', to = thisMonth + '-31';
          const r3 = await authenticatedFetch(`/api/hrm/attendance?from=${from}&to=${to}`);
          const d3 = await r3.json();
          if (d3.status === 'success' && d3.records) {
            currentAtt.total = d3.records.length;
            currentAtt.present = d3.records.filter(r => r.status === 'present' || r.status === 'late').length;
            currentAtt.ot = d3.records.reduce((s, r) => s + (r.overtimeHours || 0), 0);
          }
        } catch (e) {}
        try {
          const from2 = lastMonth + '-01', to2 = lastMonth + '-31';
          const r4 = await authenticatedFetch(`/api/hrm/attendance?from=${from2}&to=${to2}`);
          const d4 = await r4.json();
          if (d4.status === 'success' && d4.records) {
            prevAtt.total = d4.records.length;
            prevAtt.present = d4.records.filter(r => r.status === 'present' || r.status === 'late').length;
            prevAtt.ot = d4.records.reduce((s, r) => s + (r.overtimeHours || 0), 0);
          }
        } catch (e) {}

        try {
          const r5 = await authenticatedFetch('/api/hrm/advances?status=active');
          const d5 = await r5.json();
          if (d5.status === 'success') {
            currentAdv.active = (d5.advances || []).length;
            currentAdv.totalBalance = (d5.advances || []).reduce((s, a) => s + (a.remainingBalance || 0), 0);
          }
        } catch (e) {}

        const pct = (curr, prev) => prev ? +(((curr - prev) / prev) * 100).toFixed(1) : (curr ? 100 : 0);
        metrics.push(
          { metric: 'عدد الموظفين', currentMonth: currentPay.count, previousMonth: prevPay.count, change: pct(currentPay.count, prevPay.count) },
          { metric: 'إجمالي الرواتب الخام', currentMonth: currentPay.gross, previousMonth: prevPay.gross, change: pct(currentPay.gross, prevPay.gross) },
          { metric: 'صافي الرواتب', currentMonth: currentPay.net, previousMonth: prevPay.net, change: pct(currentPay.net, prevPay.net) },
          { metric: 'الخصومات', currentMonth: currentPay.deductions, previousMonth: prevPay.deductions, change: pct(currentPay.deductions, prevPay.deductions) },
          { metric: 'نسبة الحضور', currentMonth: currentAtt.total ? +((currentAtt.present / currentAtt.total) * 100).toFixed(1) : 0, previousMonth: prevAtt.total ? +((prevAtt.present / prevAtt.total) * 100).toFixed(1) : 0, change: 0 },
          { metric: 'ساعات الأوفرتايم', currentMonth: currentAtt.ot, previousMonth: prevAtt.ot, change: pct(currentAtt.ot, prevAtt.ot) },
          { metric: 'السلف النشطة', currentMonth: currentAdv.active, previousMonth: prevAdv.active, change: pct(currentAdv.active, prevAdv.active) },
          { metric: 'أرصدة السلف', currentMonth: currentAdv.totalBalance, previousMonth: prevAdv.totalBalance, change: pct(currentAdv.totalBalance, prevAdv.totalBalance) }
        );
        return metrics;
      },
      kpiBuilder: (data) => {
        if (!data.length) return [];
        const grossChange = data.find(d => d.metric === 'إجمالي الرواتب الخام');
        const netChange = data.find(d => d.metric === 'صافي الرواتب');
        const attRow = data.find(d => d.metric === 'نسبة الحضور');
        const otRow = data.find(d => d.metric === 'ساعات الأوفرتايم');
        return [
          { label: 'الرواتب الخام', value: fmt(grossChange?.currentMonth || 0), icon: 'ti ti-cash', color: 'blue' },
          { label: 'الرواتب الصافية', value: fmt(netChange?.currentMonth || 0), icon: 'ti ti-wallet', color: 'green' },
          { label: 'نسبة الحضور', value: (attRow?.currentMonth || 0) + '%', icon: 'ti ti-chart-donut', color: 'cyan' },
          { label: 'أوفرتايم', value: (otRow?.currentMonth || 0).toFixed(1) + ' س', icon: 'ti ti-clock', color: 'amber' }
        ];
      },
      chartBuilder: (data) => {
        const labels = data.map(d => d.metric);
        return [
          { type: 'bar', title: 'المقارنة الشهرية', labels, series: [
            { label: 'الشهر الحالي', data: data.map(d => d.currentMonth), color: '79,142,247' },
            { label: 'الشهر السابق', data: data.map(d => d.previousMonth), color: '155,114,247' }
          ]}
        ];
      }
    }
  };
}

/* ═══════════════════════════════════════════════════════════════
   DATE HELPERS
   ═══════════════════════════════════════════════════════════════ */
function erpGetToday() { return new Date().toISOString().slice(0, 10); }
function erpGetRecentDate(days) { const d = new Date(); d.setDate(d.getDate() - days); return d.toISOString().slice(0, 10); }
function erpGetCurrentMonth() { return new Date().toISOString().slice(0, 7); }
function erpGetLastMonth() { const d = new Date(); d.setMonth(d.getMonth() - 1); return d.toISOString().slice(0, 7); }
function erpGetRecentMonths(n) {
  const months = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    months.unshift(d.toISOString().slice(0, 7));
    d.setMonth(d.getMonth() - 1);
  }
  return months;
}

/* ═══════════════════════════════════════════════════════════════
   RENDER ENGINE — الواجهة الرئيسية
   ═══════════════════════════════════════════════════════════════ */
function renderERPTemplates(containerId) {
  const el = G(containerId || 'erp-templates');
  if (!el) return;
  const templates = Object.entries(ERP._TEMPLATES);
  el.innerHTML = templates.map(([id, t]) => `
    <div class="rpt-template${ERP._currentTemplate === id ? ' active' : ''}" onclick="erpSelectTemplate('${id}')">
      <div class="rpt-template-icon" style="background:rgba(var(--${t.color}-rgb,79,142,247),.12);color:var(--${t.color})"><i class="${t.icon}"></i></div>
      <div class="rpt-template-name">${t.name}</div>
      <div class="rpt-template-desc">${t.desc}</div>
    </div>
  `).join('');
}

async function erpSelectTemplate(id) {
  ERP._currentTemplate = id;
  ERP._sortCol = null;
  ERP._sortDir = 'asc';
  ERP._groupCol = 'none';
  ERP._rawData = [];
  ERP._filteredData = [];
  const tpl = ERP._TEMPLATES[id];
  if (!tpl) return;
  ERP._visibleCols = [...tpl.defaultCols];
  renderERPTemplates();
  erpRenderToolbar();
  erpShowLoading();
  try {
    ERP._rawData = await tpl.fetchData();
    erpApplyFiltersAndRender();
  } catch (e) {
    console.error('ERP fetch error:', e);
    erpRenderEmpty('خطأ في تحميل البيانات');
  }
}

function erpShowLoading() {
  const tableEl = G('erp-table-container');
  if (tableEl) tableEl.innerHTML = '<div class="rpt-loading"><i class="ti ti-loader"></i> جاري تحميل البيانات...</div>';
  const kpiEl = G('erp-kpi-container');
  if (kpiEl) kpiEl.innerHTML = '';
  const chartEl = G('erp-charts-container');
  if (chartEl) chartEl.innerHTML = '';
}

function erpRenderEmpty(msg) {
  const tableEl = G('erp-table-container');
  if (tableEl) tableEl.innerHTML = `<div class="rpt-empty"><i class="ti ti-file-search"></i><h4>${msg || 'اختر تقريراً من القائمة'}</h4><p>اختر نوع التقرير أعلاه لبدء عرض البيانات</p></div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOOLBAR — شريط الأدوات
   ═══════════════════════════════════════════════════════════════ */
function erpRenderToolbar() {
  const el = G('erp-toolbar');
  if (!el) return;
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl) { el.innerHTML = ''; return; }

  const groupOpts = (tpl.groupBy || []).map(g => `<option value="${g}"${ERP._groupCol === g ? ' selected' : ''}>${(tpl.groupLabels || {})[g] || g}</option>`).join('');
  el.innerHTML = `
    <span class="rpt-label"><i class="ti ti-filter"></i> تجميع</span>
    <select onchange="erpSetGroupBy(this.value)" style="min-width:130px">${groupOpts}</select>
    <div class="rpt-sep"></div>
    <button class="btn btn-sm" onclick="erpExportPDF()" title="تصدير PDF"><i class="ti ti-file-code"></i> PDF</button>
    <button class="btn btn-sm" onclick="erpExportExcel()" title="تصدير Excel"><i class="ti ti-file-spreadsheet"></i> Excel</button>
    <button class="btn btn-sm" onclick="erpExportCSV()" title="تصدير CSV"><i class="ti ti-file"></i> CSV</button>
    <button class="btn btn-sm" onclick="erpPrintReport()" title="طباعة"><i class="ti ti-printer"></i></button>
    <div class="rpt-sep"></div>
    <button class="btn btn-sm" onclick="erpSaveReport()" title="حفظ كقالب"><i class="ti ti-bookmark"></i></button>
    <button class="btn btn-sm" onclick="erpOpenColumnSelector()" title="اختيار الأعمدة"><i class="ti ti-columns"></i></button>
  `;
}

/* ═══════════════════════════════════════════════════════════════
   COLUMN SELECTOR — اختيار الأعمدة
   ═══════════════════════════════════════════════════════════════ */
function erpOpenColumnSelector() {
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl) return;
  const el = G('erp-col-selector');
  if (!el) return;
  el.style.display = el.style.display === 'none' ? '' : 'none';
  el.innerHTML = tpl.allCols.map(c => `
    <div class="rpt-col-chip${ERP._visibleCols.includes(c.key) ? ' active' : ''}" onclick="erpToggleCol('${c.key}')">
      <i class="ti ti-${ERP._visibleCols.includes(c.key) ? 'eye' : 'eye-off'}"></i> ${c.label}
    </div>
  `).join('');
}

function erpToggleCol(key) {
  const idx = ERP._visibleCols.indexOf(key);
  if (idx >= 0) ERP._visibleCols.splice(idx, 1);
  else ERP._visibleCols.push(key);
  try { localStorage.setItem(ERP_COL_KEY, JSON.stringify(ERP._visibleCols)); } catch (e) {}
  erpOpenColumnSelector();
  erpRenderTable();
}

/* ═══════════════════════════════════════════════════════════════
   FILTERS & SORT
   ═══════════════════════════════════════════════════════════════ */
function erpApplyFiltersAndRender() {
  let data = [...ERP._rawData];

  if (ERP._sortCol) {
    const tpl = ERP._TEMPLATES[ERP._currentTemplate];
    const colDef = tpl?.allCols.find(c => c.key === ERP._sortCol);
    data.sort((a, b) => {
      let va = a[ERP._sortCol], vb = b[ERP._sortCol];
      if (colDef?.num) { va = parseFloat(va) || 0; vb = parseFloat(vb) || 0; }
      else { va = (va || '').toString(); vb = (vb || '').toString(); }
      if (va < vb) return ERP._sortDir === 'asc' ? -1 : 1;
      if (va > vb) return ERP._sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  ERP._filteredData = data;
  erpRenderKPIs();
  erpRenderCharts();
  erpRenderTable();
  erpRenderSummary();
}

function erpSort(colKey) {
  if (ERP._sortCol === colKey) {
    ERP._sortDir = ERP._sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    ERP._sortCol = colKey;
    ERP._sortDir = 'asc';
  }
  erpApplyFiltersAndRender();
}

function erpSetGroupBy(val) {
  ERP._groupCol = val;
  erpApplyFiltersAndRender();
}

/* ═══════════════════════════════════════════════════════════════
   KPI RENDERING
   ═══════════════════════════════════════════════════════════════ */
function erpRenderKPIs() {
  const el = G('erp-kpi-container');
  if (!el) return;
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl?.kpiBuilder) { el.innerHTML = ''; return; }
  const kpis = tpl.kpiBuilder(ERP._filteredData);
  el.innerHTML = '<div class="rpt-kpi-grid">' + kpis.map(k => `
    <div class="rpt-kpi ${k.color}">
      <div class="rpt-kpi-icon"><i class="${k.icon}"></i></div>
      <div class="rpt-kpi-val">${k.value}</div>
      <div class="rpt-kpi-lbl">${k.label}</div>
    </div>
  `).join('') + '</div>';
}

/* ═══════════════════════════════════════════════════════════════
   CHART RENDERING
   ═══════════════════════════════════════════════════════════════ */
function erpRenderCharts() {
  const el = G('erp-charts-container');
  if (!el) return;
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl?.chartBuilder) { el.innerHTML = ''; return; }
  const charts = tpl.chartBuilder(ERP._filteredData);
  el.innerHTML = '<div class="rpt-charts-grid">' + charts.map((c, i) => `
    <div class="rpt-chart-card">
      <div class="card-hd"><h3 style="font-size:12px;font-weight:700">${c.title}</h3></div>
      <div class="card-body" style="height:260px"><canvas id="erp-chart-${i}"></canvas></div>
    </div>
  `).join('') + '</div>';

  charts.forEach((c, i) => {
    const canvas = document.getElementById('erp-chart-' + i);
    if (!canvas) return;
    if (canvas._chart) canvas._chart.destroy();
    const datasets = c.series.map(s => ({
      label: s.label, data: s.data,
      backgroundColor: c.type === 'line' ? `rgba(${s.color},.15)` : (c.type === 'doughnut' ? s.data.map(() => `rgba(${s.color},.7)`) : `rgba(${s.color},.7)`),
      borderColor: c.type === 'line' ? `rgba(${s.color},1)` : (c.type === 'radar' ? `rgba(${s.color},.7)` : 'transparent'),
      borderWidth: c.type === 'line' ? 2 : (c.type === 'radar' ? 2 : 1),
      tension: 0.3, fill: c.type === 'line', pointRadius: 3,
      pointBackgroundColor: `rgba(${s.color},1)`
    }));
    canvas._chart = new Chart(canvas, {
      type: c.type === 'radar' ? 'radar' : (c.type === 'doughnut' ? 'doughnut' : c.type),
      data: { labels: c.labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 10 } },
          tooltip: { backgroundColor: 'rgba(15,23,42,.92)', titleFont: { size: 12, weight: 'bold' }, bodyFont: { size: 11 }, padding: 10, cornerRadius: 8 }
        },
        scales: (c.type === 'bar' || c.type === 'line') ? {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.04)' }, ticks: { font: { size: 10 } } },
          x: { grid: { display: false }, ticks: { font: { size: 10 } } }
        } : (c.type === 'radar' ? {
          r: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.08)' }, pointLabels: { font: { size: 10 } } }
        } : undefined)
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   TABLE RENDERING — الجدول الرئيسي
   ═══════════════════════════════════════════════════════════════ */
function erpRenderTable() {
  const el = G('erp-table-container');
  if (!el) return;
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl) { erpRenderEmpty(); return; }

  const visibleCols = ERP._visibleCols.map(key => tpl.allCols.find(c => c.key === key)).filter(Boolean);
  if (!visibleCols.length) {
    el.innerHTML = '<div class="rpt-empty"><i class="ti ti-columns-off"></i><h4>لم يتم اختيار أي عمود</h4><p>اضغط على أيقونة الأعمدة لاختيار الأعمدة المطلوبة</p></div>';
    return;
  }

  const data = ERP._filteredData;
  if (!data.length) {
    el.innerHTML = '<div class="rpt-empty"><i class="ti ti-database-search"></i><h4>لا توجد بيانات</h4><p>لا توجد سجلات تطابق الفلاتر المحددة</p></div>';
    return;
  }

  let rowsHtml = '';
  if (ERP._groupCol && ERP._groupCol !== 'none') {
    const groups = {};
    data.forEach(row => {
      const gKey = row[ERP._groupCol] || 'غير محدد';
      if (!groups[gKey]) groups[gKey] = [];
      groups[gKey].push(row);
    });
    Object.entries(groups).sort((a, b) => a[0] < b[0] ? -1 : 1).forEach(([gKey, gRows]) => {
      rowsHtml += `<tr class="group-row"><td colspan="${visibleCols.length}"><i class="ti ti-folder" style="margin-left:6px"></i> ${ERP._groupCol}: ${gKey} <span style="opacity:.5;margin-right:6px">(${gRows.length})</span></td></tr>`;
      gRows.forEach(row => { rowsHtml += erpBuildRow(row, visibleCols); });
    });
  } else {
    data.forEach(row => { rowsHtml += erpBuildRow(row, visibleCols); });
  }

  const headers = visibleCols.map(c => {
    const isSorted = ERP._sortCol === c.key;
    const arrow = isSorted ? (ERP._sortDir === 'asc' ? 'ti ti-arrow-up' : 'ti ti-arrow-down') : 'ti ti-selector';
    return `<th class="${isSorted ? 'sorted' : ''}" onclick="erpSort('${c.key}')"><i class="${arrow}"></i>${c.label}</th>`;
  }).join('');

  el.innerHTML = `
    <div class="rpt-table-wrap">
      <table class="rpt-table">
        <thead><tr>${headers}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>`;
}

function erpBuildRow(row, cols) {
  const cells = cols.map(c => {
    let val = row[c.key];
    if (val === undefined || val === null) val = '—';
    else if (c.fmt) val = fmt(val);
    else if (c.dec !== undefined) val = parseFloat(val || 0).toFixed(c.dec);
    else if (c.suffix) val = val + c.suffix;
    else if (c.badge) {
      const badgeClass = { present: 'green', paid: 'green', completed: 'green', active: 'green', approved: 'green', excellent: 'green', good: 'cyan', acceptable: 'amber', in: 'green', draft: 'amber', late: 'amber', part_time: 'amber', half_day: 'amber', loan: 'purple', absent: 'red', cancelled: 'red', poor: 'red', out: 'red', leave: 'purple', full_time: 'blue', contract: 'cyan', hourly: 'amber' }[val] || 'blue';
      val = `<span class="badge badge-${badgeClass}">${c.badge[val] || val}</span>`;
    }
    else if (c.num) val = `<span class="rpt-col-num">${val}</span>`;
    return `<td>${val}</td>`;
  }).join('');
  return `<tr>${cells}</tr>`;
}

/* ═══════════════════════════════════════════════════════════════
   SUMMARY ROW — صف الإجمالي
   ═══════════════════════════════════════════════════════════════ */
function erpRenderSummary() {
  const el = G('erp-summary');
  if (!el) return;
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl) { el.innerHTML = ''; return; }
  const data = ERP._filteredData;
  const numCols = tpl.allCols.filter(c => c.num && c.fmt);
  if (!numCols.length || !data.length) { el.innerHTML = ''; return; }
  const items = numCols.map(c => {
    const total = data.reduce((s, r) => s + (parseFloat(r[c.key]) || 0), 0);
    return `<div class="rpt-summary-item"><span class="rpt-s-label">${c.label}:</span><span class="rpt-s-val">${fmt(total)}</span></div>`;
  }).join('');
  el.innerHTML = `<div class="rpt-summary">${items}</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   EXPORT — تصدير التقارير
   ═══════════════════════════════════════════════════════════════ */
function erpExportPDF() {
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl || !ERP._filteredData.length) { toast('لا توجد بيانات للتصدير', 'error'); return; }
  const cols = ERP._visibleCols.map(key => tpl.allCols.find(c => c.key === key)).filter(Boolean);
  const headers = cols.map(c => c.label);
  const rows = ERP._filteredData.map(row => cols.map(c => {
    let val = row[c.key];
    if (val === undefined || val === null) val = '—';
    else if (c.fmt) val = fmt(val);
    else if (c.dec !== undefined) val = parseFloat(val || 0).toFixed(c.dec);
    else if (c.suffix) val = val + c.suffix;
    else if (c.badge) val = c.badge[val] || val;
    return val;
  }));
  _printGenericPDF(tpl.name, headers, rows, {
    subtitle: new Date().toLocaleDateString('ar-LY'),
    landscape: cols.length > 5
  });
}

function erpExportExcel() {
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl || !ERP._filteredData.length) { toast('لا توجد بيانات للتصدير', 'error'); return; }
  const cols = ERP._visibleCols.map(key => tpl.allCols.find(c => c.key === key)).filter(Boolean);
  const headers = cols.map(c => c.label);
  const rows = ERP._filteredData.map(row => cols.map(c => {
    let val = row[c.key];
    if (val === undefined || val === null) val = '';
    else if (c.badge) val = c.badge[val] || val;
    return val;
  }));
  _exportTable(headers, rows, tpl.name, 'erp-report');
}

function erpExportCSV() {
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl || !ERP._filteredData.length) { toast('لا توجد بيانات للتصدير', 'error'); return; }
  const cols = ERP._visibleCols.map(key => tpl.allCols.find(c => c.key === key)).filter(Boolean);
  const headers = cols.map(c => c.label);
  const rows = ERP._filteredData.map(row => cols.map(c => {
    let val = row[c.key];
    if (val === undefined || val === null) val = '';
    else if (c.badge) val = c.badge[val] || val;
    return '"' + String(val).replace(/"/g, '""') + '"';
  }));
  const csv = '\uFEFF' + headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${tpl.name}-${erpGetToday()}.csv`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('تم التصدير بنجاح');
}

function erpPrintReport() {
  const tpl = ERP._TEMPLATES[ERP._currentTemplate];
  if (!tpl || !ERP._filteredData.length) { toast('لا توجد بيانات للطباعة', 'error'); return; }
  erpExportPDF();
}

/* ═══════════════════════════════════════════════════════════════
   SAVE / LOAD REPORTS
   ═══════════════════════════════════════════════════════════════ */
function erpSaveReport() {
  if (!ERP._currentTemplate) { toast('اختر تقريراً أولاً', 'error'); return; }
  const name = prompt('اسم التقرير المحفوظ:');
  if (!name) return;
  ERP._savedReports.push({
    id: Date.now(), name, template: ERP._currentTemplate,
    cols: [...ERP._visibleCols], groupCol: ERP._groupCol,
    filters: { ...ERP._filters }, createdAt: new Date().toISOString()
  });
  try { localStorage.setItem(ERP_SAVED_KEY, JSON.stringify(ERP._savedReports)); } catch (e) {}
  toast('تم حفظ التقرير: ' + name);
}

function erpLoadSavedReports() {
  const el = G('erp-saved-reports');
  if (!el) return;
  if (!ERP._savedReports.length) { el.innerHTML = ''; return; }
  el.innerHTML = '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">' + ERP._savedReports.map(r => `
    <div class="rpt-filter-chip" onclick="erpApplySavedReport(${r.id})">
      <i class="ti ti-bookmark"></i> ${r.name}
      <i class="ti ti-x" style="opacity:.5;margin-right:4px" onclick="event.stopPropagation();erpDeleteSavedReport(${r.id})"></i>
    </div>
  `).join('') + '</div>';
}

function erpApplySavedReport(id) {
  const saved = ERP._savedReports.find(r => r.id === id);
  if (!saved) return;
  ERP._visibleCols = saved.cols || [];
  ERP._groupCol = saved.groupCol || 'none';
  ERP._filters = saved.filters || {};
  erpSelectTemplate(saved.template);
}

function erpDeleteSavedReport(id) {
  ERP._savedReports = ERP._savedReports.filter(r => r.id !== id);
  try { localStorage.setItem(ERP_SAVED_KEY, JSON.stringify(ERP._savedReports)); } catch (e) {}
  erpLoadSavedReports();
}

/* ═══════════════════════════════════════════════════════════════
   INIT — بدء النظام
   ═══════════════════════════════════════════════════════════════ */
erpInit();
