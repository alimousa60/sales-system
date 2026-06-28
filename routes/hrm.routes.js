const express = require('express');
const Employee = require('../models/employee.model');
const Attendance = require('../models/attendance.model');
const Advance = require('../models/advance.model');
const CashLedger = require('../models/cashLedger.model');
const Payroll = require('../models/payroll.model');
const Performance = require('../models/performance.model');
const { logAudit } = require('../utils/helpers');
const logger = require('../utils/logger');
const { requireFields, maxLength, positiveNumber, validEmail, validEnum, maxArrayLength, VALID_CONTRACT_TYPES, VALID_ATTENDANCE_STATUS } = require('../middleware/validation');

const router = express.Router();

let checkPermissionRBAC;
try {
  const rbac = require('../middleware/rbac.middleware');
  checkPermissionRBAC = rbac.checkPermission;
} catch (e) {}

function hrmGuard(resource, action) {
  return (req, res, next) => {
    if (req.user?.role === 'system_admin') return next();
    if (checkPermissionRBAC) return checkPermissionRBAC(resource, action)(req, res, next);
    next();
  };
}

async function trySession() {
  try {
    const session = await require('mongoose').startSession();
    session.startTransaction();
    await require('mongoose').connection.db.command({ ping: 1 }, { session });
    return session;
  } catch (e) {
    return null;
  }
}
async function safeCommit(session) {
  if (!session) return;
  try { await session.commitTransaction(); } catch (e) {}
}
async function safeAbort(session) {
  if (!session) return;
  try { await session.abortTransaction(); } catch (e) {}
}
async function safeEnd(session) {
  if (!session) return;
  try { session.endSession(); } catch (e) {}
}

/* ═══ EMPLOYEES ═══ */
router.get('/employees', hrmGuard('hrm', 'read'), async (req, res) => {
  try {
    const { search, status, department, contractType } = req.query;
    const filter = { companyId: req.user.companyId };
    if (status) filter.status = status;
    if (department) filter.department = department;
    if (contractType) filter.contractType = contractType;
    if (search) {
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { name: { $regex: safeSearch, $options: 'i' } },
        { nameAr: { $regex: safeSearch, $options: 'i' } },
        { employeeNo: { $regex: safeSearch, $options: 'i' } },
        { phone: { $regex: safeSearch, $options: 'i' } }
      ];
    }
    const employees = await Employee.find(filter).sort('-createdAt');
    res.json({ status: 'success', employees });
  } catch (error) {
    logger.error('خطأ في جلب الموظفين: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.get('/employees/:id', hrmGuard('hrm', 'read'), async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id, companyId: req.user.companyId });
    if (!employee) return res.status(404).json({ status: 'error', message: 'الموظف غير موجود' });
    res.json({ status: 'success', employee });
  } catch (error) {
    logger.error('خطأ في جلب الموظف: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/employees', hrmGuard('hrm', 'create'),
  requireFields('name', 'employeeNo'),
  maxLength('name', 100),
  maxLength('employeeNo', 50),
  maxLength('phone', 20),
  maxLength('nationalId', 30),
  maxLength('address', 200),
  maxLength('notes', 500),
  maxLength('position', 100),
  maxLength('department', 100),
  maxLength('bank', 100),
  maxLength('bankAccount', 50),
  validEmail,
  validEnum('contractType', VALID_CONTRACT_TYPES),
  positiveNumber('hourlyRate', 'overtimeRate', 'monthlySalary'),
  async (req, res) => {
  try {
    const { name, employeeNo, contractType, hourlyRate, overtimeRate, monthlySalary, startDate, position, department, phone, email, nationalId, address, notes, nameAr, bank, bankAccount, workHours } = req.body;
    if (!name || !employeeNo) return res.status(400).json({ status: 'error', message: 'الاسم ورقم الموظف مطلوبان' });
    const existing = await Employee.findOne({ companyId: req.user.companyId, employeeNo });
    if (existing) return res.status(409).json({ status: 'error', message: 'رقم الموظف موجود بالفعل' });
    const employee = await Employee.create({
      companyId: req.user.companyId, employeeNo, name, nameAr: nameAr || '',
      contractType: contractType || 'full_time', hourlyRate: hourlyRate || 0, overtimeRate: overtimeRate || 0,
      monthlySalary: monthlySalary || 0, startDate: startDate || new Date().toISOString().slice(0, 10),
      position: position || '', department: department || '', phone: phone || '', email: email || '',
      nationalId: nationalId || '', address: address || '', notes: notes || '',
      bank: bank || '', bankAccount: bankAccount || '', workHours: workHours || 8
    });
    await logAudit(req.user.userId, 'CREATE_EMPLOYEE', 'Employee', employee._id.toString(), { name, employeeNo }, req);
    res.status(201).json({ status: 'success', employee });
  } catch (error) {
    logger.error('خطأ في إنشاء موظف: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.patch('/employees/:id', hrmGuard('hrm', 'update'),
  maxLength('name', 100),
  maxLength('phone', 20),
  maxLength('nationalId', 30),
  maxLength('address', 200),
  maxLength('notes', 500),
  maxLength('position', 100),
  maxLength('department', 100),
  maxLength('bank', 100),
  maxLength('bankAccount', 50),
  validEmail,
  validEnum('contractType', VALID_CONTRACT_TYPES),
  positiveNumber('hourlyRate', 'overtimeRate', 'monthlySalary'),
  async (req, res) => {
  try {
    const allowed = ['name', 'nameAr', 'phone', 'email', 'address', 'position', 'department', 'contractType', 'hourlyRate', 'overtimeRate', 'monthlySalary', 'status', 'notes', 'endDate', 'nationalId', 'bank', 'bankAccount', 'workHours'];
    const updates = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });
    if (Object.keys(updates).length === 0) return res.status(400).json({ status: 'error', message: 'لا توجد بيانات للتحديث' });
    const employee = await Employee.findOneAndUpdate({ _id: req.params.id, companyId: req.user.companyId }, updates, { new: true, runValidators: true });
    if (!employee) return res.status(404).json({ status: 'error', message: 'الموظف غير موجود' });
    await logAudit(req.user.userId, 'UPDATE_EMPLOYEE', 'Employee', employee._id.toString(), updates, req);
    res.json({ status: 'success', employee });
  } catch (error) {
    logger.error('خطأ في تحديث الموظف: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

/* ═══ ATTENDANCE ═══ */
router.get('/attendance', hrmGuard('hrm', 'read'), async (req, res) => {
  try {
    const { date, employeeId, from, to } = req.query;
    const filter = { companyId: req.user.companyId };
    if (employeeId) filter.employeeId = employeeId;
    if (date) filter.date = date;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (to) filter.date.$lte = to;
    }
    const records = await Attendance.find(filter).sort({ date: -1, employeeNo: 1 });
    res.json({ status: 'success', records });
  } catch (error) {
    logger.error('خطأ في جلب الحضور: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/attendance', hrmGuard('hrm', 'create'),
  requireFields('employeeId', 'date'),
  validEnum('status', VALID_ATTENDANCE_STATUS),
  maxLength('notes', 500),
  async (req, res) => {
  try {
    const { employeeId, date, checkIn, checkOut, totalHours, overtimeHours, status, notes } = req.body;
    if (!employeeId || !date) return res.status(400).json({ status: 'error', message: 'الموظف والتاريخ مطلوبان' });
    const employee = await Employee.findOne({ _id: employeeId, companyId: req.user.companyId });
    if (!employee) return res.status(404).json({ status: 'error', message: 'الموظف غير موجود' });
    if (employee.status !== 'active') return res.status(400).json({ status: 'error', message: 'الموظف غير نشط' });
    let computedHours = totalHours || 0;
    let computedOT = overtimeHours || 0;
    if (checkIn && checkOut && !totalHours) {
      const [inH, inM] = checkIn.split(':').map(Number);
      const [outH, outM] = checkOut.split(':').map(Number);
      const diff = (outH * 60 + outM) - (inH * 60 + inM);
      computedHours = Math.max(0, diff / 60);
      computedOT = Math.max(0, computedHours - 8);
      computedHours = Math.min(computedHours, 8);
    }
    const existing = await Attendance.findOne({ companyId: req.user.companyId, employeeId, date });
    if (existing) {
      if (existing.isLocked) return res.status(400).json({ status: 'error', message: 'هذه الفترة مقفلة ولا يمكن التعديل' });
      existing.checkIn = checkIn || existing.checkIn;
      existing.checkOut = checkOut || existing.checkOut;
      existing.totalHours = computedHours;
      existing.overtimeHours = computedOT;
      existing.status = status || existing.status;
      existing.notes = notes || existing.notes;
      existing.recordedBy = req.user.username || 'system';
      existing.recordedById = req.user.userId;
      await existing.save();
      return res.json({ status: 'success', record: existing });
    }
    const record = await Attendance.create({
      companyId: req.user.companyId, employeeId, employeeNo: employee.employeeNo,
      employeeName: employee.name, date, checkIn: checkIn || '', checkOut: checkOut || '',
      totalHours: computedHours, overtimeHours: computedOT, status: status || 'present',
      notes: notes || '', recordedBy: req.user.username || 'system', recordedById: req.user.userId
    });
    res.status(201).json({ status: 'success', record });
  } catch (error) {
    logger.error('خطأ في تسجيل الحضور: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/attendance/bulk', hrmGuard('hrm', 'create'),
  maxArrayLength('records', 100),
  async (req, res) => {
  try {
    const { records } = req.body;
    if (!Array.isArray(records) || !records.length) return res.status(400).json({ status: 'error', message: 'لا توجد سجلات' });
    const results = [];
    for (const r of records) {
      const emp = await Employee.findOne({ _id: r.employeeId, companyId: req.user.companyId });
      if (!emp || emp.status !== 'active') continue;
      let computedHours = r.totalHours || 0;
      let computedOT = r.overtimeHours || 0;
      if (r.checkIn && r.checkOut && !r.totalHours) {
        const [inH, inM] = r.checkIn.split(':').map(Number);
        const [outH, outM] = r.checkOut.split(':').map(Number);
        const diff = (outH * 60 + outM) - (inH * 60 + inM);
        computedHours = Math.max(0, diff / 60);
        computedOT = Math.max(0, computedHours - 8);
        computedHours = Math.min(computedHours, 8);
      }
      const existing = await Attendance.findOne({ companyId: req.user.companyId, employeeId: r.employeeId, date: r.date });
      if (existing && existing.isLocked) continue;
      if (existing) {
        existing.checkIn = r.checkIn || existing.checkIn;
        existing.checkOut = r.checkOut || existing.checkOut;
        existing.totalHours = computedHours;
        existing.overtimeHours = computedOT;
        existing.status = r.status || existing.status;
        existing.recordedBy = req.user.username || 'system';
        await existing.save();
        results.push(existing);
      } else {
        const rec = await Attendance.create({
          companyId: req.user.companyId, employeeId: r.employeeId, employeeNo: emp.employeeNo,
          employeeName: emp.name, date: r.date, checkIn: r.checkIn || '', checkOut: r.checkOut || '',
          totalHours: computedHours, overtimeHours: computedOT, status: r.status || 'present',
          recordedBy: req.user.username || 'system', recordedById: req.user.userId
        });
        results.push(rec);
      }
    }
    res.json({ status: 'success', count: results.length, records: results });
  } catch (error) {
    logger.error('خطأ في الحضور الجماعي: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.patch('/attendance/:id/lock', hrmGuard('hrm', 'update'), async (req, res) => {
  try {
    const record = await Attendance.findOneAndUpdate({ _id: req.params.id, companyId: req.user.companyId }, { isLocked: true }, { new: true });
    if (!record) return res.status(404).json({ status: 'error', message: 'السجل غير موجود' });
    res.json({ status: 'success', record });
  } catch (error) {
    logger.error('خطأ في قفل السجل: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

/* ═══ ADVANCES & LOANS ═══ */
router.get('/advances', hrmGuard('hrm', 'read'), async (req, res) => {
  try {
    const { employeeId, status, type } = req.query;
    const filter = { companyId: req.user.companyId };
    if (employeeId) filter.employeeId = employeeId;
    if (status) filter.status = status;
    if (type) filter.type = type;
    const advances = await Advance.find(filter).sort('-date');
    res.json({ status: 'success', advances });
  } catch (error) {
    logger.error('خطأ في جلب السلف: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/advances', hrmGuard('hrm', 'create'),
  requireFields('employeeId', 'type', 'amount'),
  positiveNumber('amount'),
  validEnum('type', ['advance', 'loan']),
  maxLength('purpose', 500),
  async (req, res) => {
  const session = await trySession();
  try {
    const { employeeId, type, amount, monthlyInstallment, installmentsTotal, purpose, date, approvedBy } = req.body;
    if (!employeeId || !type || !amount || amount <= 0) {
      return res.status(400).json({ status: 'error', message: 'البيانات غير مكتملة' });
    }
    const employeeQ = Employee.findOne({ _id: employeeId, companyId: req.user.companyId });
    if (session) employeeQ.session(session);
    const employee = await employeeQ;
    if (!employee) { await safeAbort(session); return res.status(404).json({ status: 'error', message: 'الموظف غير موجود' }); }

    const ledgerQ = CashLedger.findOne({ companyId: req.user.companyId }).sort('-createdAt');
    if (session) ledgerQ.session(session);
    const lastLedger = await ledgerQ;
    const currentBalance = lastLedger ? lastLedger.balanceAfter : 0;
    if (amount > currentBalance + 0.001) {
      await safeAbort(session);
      return res.status(400).json({ status: 'error', message: `رصيد الخزينة غير كافٍ. الرصيد الحالي: ${currentBalance.toFixed(3)} د.ل` });
    }

    const installment = type === 'loan' ? (monthlyInstallment || amount / (installmentsTotal || 1)) : amount;
    const totalInst = type === 'loan' ? (installmentsTotal || 1) : 1;
    const newBalance = currentBalance - amount;

    const createOpts = session ? { session } : {};
    const ledger = await CashLedger.create([{
      companyId: req.user.companyId, type: 'out',
      category: type === 'advance' ? 'advance' : 'loan_disbursement',
      amount, balanceAfter: newBalance,
      description: `${type === 'advance' ? 'سلفة' : 'قرض'} — ${employee.name} — ${purpose || ''}`,
      date: date || new Date().toISOString().slice(0, 10),
      employeeId: employee._id, employeeNo: employee.employeeNo, employeeName: employee.name,
      userId: req.user.userId
    }], createOpts);

    const advance = await Advance.create([{
      companyId: req.user.companyId, employeeId: employee._id,
      employeeNo: employee.employeeNo, employeeName: employee.name,
      type, amount, remainingBalance: amount,
      monthlyInstallment: installment, installmentsTotal: totalInst,
      installmentsPaid: 0, purpose: purpose || '',
      date: date || new Date().toISOString().slice(0, 10),
      cashLedgerId: ledger[0]._id, approvedBy: approvedBy || req.user.username || ''
    }], createOpts);

    await safeCommit(session);
    await logAudit(req.user.userId, 'ADVANCE_DISBURSE', 'Advance', advance[0]._id.toString(), { type, amount, employee: employee.name }, req);
    res.status(201).json({ status: 'success', advance: advance[0], cashBalance: newBalance });
  } catch (error) {
    await safeAbort(session);
    logger.error('خطأ في إنشاء سلفة: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  } finally {
    await safeEnd(session);
  }
});

router.post('/advances/:id/repay', hrmGuard('hrm', 'update'),
  positiveNumber('amount'),
  async (req, res) => {
  const session = await trySession();
  try {
    const advanceQ = Advance.findOne({ _id: req.params.id, companyId: req.user.companyId, status: 'active' });
    if (session) advanceQ.session(session);
    const advance = await advanceQ;
    if (!advance) { await safeAbort(session); return res.status(404).json({ status: 'error', message: 'السلفة غير موجودة أو مسددة' }); }

    const amount = Math.min(req.body.amount || advance.monthlyInstallment, advance.remainingBalance);
    if (amount <= 0) { await safeAbort(session); return res.status(400).json({ status: 'error', message: 'مبلغ غير صالح' }); }

    const ledgerQ = CashLedger.findOne({ companyId: req.user.companyId }).sort('-createdAt');
    if (session) ledgerQ.session(session);
    const lastLedger = await ledgerQ;
    const currentBalance = lastLedger ? lastLedger.balanceAfter : 0;
    const newBalance = currentBalance + amount;

    const createOpts = session ? { session } : {};
    await CashLedger.create([{
      companyId: req.user.companyId, type: 'in', category: 'loan_repayment',
      amount, balanceAfter: newBalance,
      description: `تسديد ${advance.type === 'advance' ? 'سلفة' : 'قرض'} — ${advance.employeeName}`,
      date: req.body.date || new Date().toISOString().slice(0, 10),
      employeeId: advance.employeeId, employeeNo: advance.employeeNo, employeeName: advance.employeeName,
      userId: req.user.userId
    }], createOpts);

    advance.remainingBalance = Math.max(0, advance.remainingBalance - amount);
    advance.installmentsPaid += 1;
    if (advance.remainingBalance <= 0.001) advance.status = 'completed';
    if (session) { await advance.save({ session }); } else { await advance.save(); }

    await safeCommit(session);
    res.json({ status: 'success', advance, cashBalance: newBalance });
  } catch (error) {
    await safeAbort(session);
    logger.error('خطأ في تسديد السلفة: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  } finally {
    await safeEnd(session);
  }
});

/* ═══ CASH LEDGER ═══ */
router.get('/cash-ledger', hrmGuard('hrm', 'read'), async (req, res) => {
  try {
    const { from, to, category } = req.query;
    const filter = { companyId: req.user.companyId };
    if (category) filter.category = category;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (to) filter.date.$lte = to;
    }
    const entries = await CashLedger.find(filter).sort('-date');
    const lastEntry = await CashLedger.findOne({ companyId: req.user.companyId }).sort('-createdAt');
    const currentBalance = lastEntry ? lastEntry.balanceAfter : 0;
    res.json({ status: 'success', entries, currentBalance });
  } catch (error) {
    logger.error('خطأ في جلب سجل الخزينة: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/cash-ledger/adjust', hrmGuard('hrm', 'update'),
  requireFields('amount', 'reason'),
  maxLength('reason', 500),
  async (req, res) => {
  try {
    const { amount, reason, date } = req.body;
    if (!amount || !reason) return res.status(400).json({ status: 'error', message: 'المبلغ والسبب مطلوبان' });
    const lastEntry = await CashLedger.findOne({ companyId: req.user.companyId }).sort('-createdAt');
    const currentBalance = lastEntry ? lastEntry.balanceAfter : 0;
    const newBalance = currentBalance + amount;
    const entry = await CashLedger.create({
      companyId: req.user.companyId, type: amount >= 0 ? 'in' : 'out', category: 'adjustment',
      amount: Math.abs(amount), balanceAfter: newBalance,
      description: `تسوية — ${reason}`, date: date || new Date().toISOString().slice(0, 10),
      userId: req.user.userId
    });
    res.status(201).json({ status: 'success', entry, currentBalance: newBalance });
  } catch (error) {
    logger.error('خطأ في التسوية: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

/* ═══ PAYROLL ═══ */
router.get('/payroll', hrmGuard('hrm_payroll', 'read'), async (req, res) => {
  try {
    const { period, status } = req.query;
    const filter = { companyId: req.user.companyId };
    if (period) filter.period = period;
    if (status) filter.status = status;
    const payrolls = await Payroll.find(filter).sort('-period');
    res.json({ status: 'success', payrolls });
  } catch (error) {
    logger.error('خطأ في جلب الرواتب: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/payroll/generate', hrmGuard('hrm_payroll', 'create'),
  requireFields('period'),
  async (req, res) => {
  const session = await trySession();
  try {
    const { period } = req.body;
    if (!period) return res.status(400).json({ status: 'error', message: 'الفترة مطلوبة (YYYY-MM)' });

    const existingQ = Payroll.find({ companyId: req.user.companyId, period, status: { $in: ['approved', 'paid'] } });
    if (session) existingQ.session(session);
    const existingPayrolls = await existingQ;
    if (existingPayrolls.length > 0) {
      await safeAbort(session);
      return res.status(400).json({ status: 'error', message: 'تم اعتماد أو دفع رواتب هذه الفترة بالفعل' });
    }

    const deleteOpts = session ? { session } : {};
    await Payroll.deleteMany({ companyId: req.user.companyId, period, status: 'draft' }, deleteOpts);

    const empQ = Employee.find({ companyId: req.user.companyId, status: 'active' });
    if (session) empQ.session(session);
    const employees = await empQ;
    const startDate = period + '-01';
    const endDate = period + '-31';

    const attQ = Attendance.find({ companyId: req.user.companyId, date: { $gte: startDate, $lte: endDate } });
    if (session) attQ.session(session);
    const attendance = await attQ;

    const advQ = Advance.find({ companyId: req.user.companyId, status: 'active' });
    if (session) advQ.session(session);
    const advances = await advQ;

    const createOpts = session ? { session } : {};
    const generated = [];
    for (const emp of employees) {
      const empAttendance = attendance.filter(a => a.employeeId.toString() === emp._id.toString());
      const totalWorkedHours = empAttendance.reduce((s, a) => s + a.totalHours, 0);
      const totalOvertimeHours = empAttendance.reduce((s, a) => s + a.overtimeHours, 0);
      const hourlyRate = emp.hourlyRate || (emp.monthlySalary / 176) || 0;
      const overtimeRate = emp.overtimeRate || (hourlyRate * 1.5);

      const grossSalary = (totalWorkedHours * hourlyRate) + (totalOvertimeHours * overtimeRate);

      const empAdvances = advances.filter(a => a.employeeId.toString() === emp._id.toString());
      const loanDeduction = empAdvances.filter(a => a.type === 'loan').reduce((s, a) => s + a.monthlyInstallment, 0);
      const advanceDeduction = empAdvances.filter(a => a.type === 'advance').reduce((s, a) => s + a.monthlyInstallment, 0);
      const totalDeductions = loanDeduction + advanceDeduction;
      const netSalary = Math.max(0, grossSalary - totalDeductions);

      const payroll = await Payroll.create([{
        companyId: req.user.companyId, employeeId: emp._id, employeeNo: emp.employeeNo,
        employeeName: emp.name, period, hourlyRate, overtimeRate,
        totalWorkedHours, totalOvertimeHours, grossSalary,
        loanDeduction, advanceDeduction, totalDeductions, netSalary,
        status: 'draft'
      }], createOpts);
      generated.push(payroll[0]);
    }

    await safeCommit(session);
    res.json({ status: 'success', count: generated.length, payrolls: generated });
  } catch (error) {
    await safeAbort(session);
    logger.error('خطأ في توليد الرواتب: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  } finally {
    await safeEnd(session);
  }
});

router.post('/payroll/:id/approve', hrmGuard('hrm_payroll', 'approve'), async (req, res) => {
  try {
    const payroll = await Payroll.findOne({ _id: req.params.id, companyId: req.user.companyId });
    if (!payroll) return res.status(404).json({ status: 'error', message: 'الراتب غير موجود' });
    if (payroll.status !== 'draft') return res.status(400).json({ status: 'error', message: 'يمكن اعتماد الراتب في وضع المسودة فقط' });
    payroll.status = 'approved';
    payroll.approvedBy = req.user.username || '';
    payroll.approvedAt = new Date().toISOString();
    await payroll.save();

    await Attendance.updateMany(
      { companyId: req.user.companyId, employeeId: payroll.employeeId, date: { $gte: payroll.period + '-01', $lte: payroll.period + '-31' } },
      { isLocked: true }
    );

    await logAudit(req.user.userId, 'PAYROLL_APPROVE', 'Payroll', payroll._id.toString(), { period: payroll.period, net: payroll.netSalary }, req);
    res.json({ status: 'success', payroll });
  } catch (error) {
    logger.error('خطأ في اعتماد الراتب: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/payroll/:id/pay', hrmGuard('hrm_payroll', 'pay'), async (req, res) => {
  const session = await trySession();
  try {
    const payrollQ = Payroll.findOne({ _id: req.params.id, companyId: req.user.companyId });
    if (session) payrollQ.session(session);
    const payroll = await payrollQ;
    if (!payroll) { await safeAbort(session); return res.status(404).json({ status: 'error', message: 'الراتب غير موجود' }); }
    if (payroll.status !== 'approved') { await safeAbort(session); return res.status(400).json({ status: 'error', message: 'يجب اعتماد الراتب أولاً' }); }

    const ledgerQ = CashLedger.findOne({ companyId: req.user.companyId }).sort('-createdAt');
    if (session) ledgerQ.session(session);
    const lastLedger = await ledgerQ;
    const currentBalance = lastLedger ? lastLedger.balanceAfter : 0;
    if (payroll.netSalary > currentBalance + 0.001) {
      await safeAbort(session);
      return res.status(400).json({ status: 'error', message: `رصيد الخزينة غير كافٍ. المطلوب: ${payroll.netSalary.toFixed(3)} — الرصيد: ${currentBalance.toFixed(3)}` });
    }

    const newBalance = currentBalance - payroll.netSalary;
    const createOpts = session ? { session } : {};
    const ledger = await CashLedger.create([{
      companyId: req.user.companyId, type: 'out', category: 'payroll',
      amount: payroll.netSalary, balanceAfter: newBalance,
      description: `راتب ${payroll.employeeName} — ${payroll.period}`,
      date: req.body.date || new Date().toISOString().slice(0, 10),
      employeeId: payroll.employeeId, employeeNo: payroll.employeeNo, employeeName: payroll.employeeName,
      userId: req.user.userId
    }], createOpts);

    payroll.status = 'paid';
    payroll.paidDate = req.body.date || new Date().toISOString().slice(0, 10);
    payroll.cashLedgerId = ledger[0]._id;
    if (session) { await payroll.save({ session }); } else { await payroll.save(); }

    const advQ = Advance.find({ companyId: req.user.companyId, employeeId: payroll.employeeId, status: 'active' });
    if (session) advQ.session(session);
    const empAdvances = await advQ;

    for (const adv of empAdvances) {
      const installment = Math.min(adv.monthlyInstallment, adv.remainingBalance);
      if (installment > 0) {
        adv.remainingBalance = Math.max(0, adv.remainingBalance - installment);
        adv.installmentsPaid += 1;
        if (adv.remainingBalance <= 0.001) adv.status = 'completed';
        if (session) { await adv.save({ session }); } else { await adv.save(); }
      }
    }

    await safeCommit(session);
    await logAudit(req.user.userId, 'PAYROLL_PAY', 'Payroll', payroll._id.toString(), { period: payroll.period, amount: payroll.netSalary }, req);
    res.json({ status: 'success', payroll, cashBalance: newBalance });
  } catch (error) {
    await safeAbort(session);
    logger.error('خطأ في دفع الراتب: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  } finally {
    await safeEnd(session);
  }
});

router.post('/payroll/bulk-pay', hrmGuard('hrm_payroll', 'pay'),
  maxArrayLength('payrollIds', 50),
  async (req, res) => {
  const session = await trySession();
  try {
    const { payrollIds, date } = req.body;
    if (!Array.isArray(payrollIds) || !payrollIds.length) {
      await safeAbort(session);
      return res.status(400).json({ status: 'error', message: 'اختر رواتب للدفع' });
    }
    const payQ = Payroll.find({ _id: { $in: payrollIds }, companyId: req.user.companyId, status: 'approved' });
    if (session) payQ.session(session);
    const payrolls = await payQ;
    const totalPay = payrolls.reduce((s, p) => s + p.netSalary, 0);

    const ledgerQ = CashLedger.findOne({ companyId: req.user.companyId }).sort('-createdAt');
    if (session) ledgerQ.session(session);
    const lastLedger = await ledgerQ;
    const currentBalance = lastLedger ? lastLedger.balanceAfter : 0;
    if (totalPay > currentBalance + 0.001) {
      await safeAbort(session);
      return res.status(400).json({ status: 'error', message: `الرصيد غير كافٍ. المطلوب: ${totalPay.toFixed(3)} — الرصيد: ${currentBalance.toFixed(3)}` });
    }

    let runningBalance = currentBalance;
    const payDate = date || new Date().toISOString().slice(0, 10);
    const createOpts = session ? { session } : {};
    for (const payroll of payrolls) {
      runningBalance -= payroll.netSalary;
      const ledger = await CashLedger.create([{
        companyId: req.user.companyId, type: 'out', category: 'payroll',
        amount: payroll.netSalary, balanceAfter: runningBalance,
        description: `راتب ${payroll.employeeName} — ${payroll.period}`,
        date: payDate, employeeId: payroll.employeeId,
        employeeNo: payroll.employeeNo, employeeName: payroll.employeeName,
        userId: req.user.userId
      }], createOpts);
      payroll.status = 'paid';
      payroll.paidDate = payDate;
      payroll.cashLedgerId = ledger[0]._id;
      if (session) { await payroll.save({ session }); } else { await payroll.save(); }
    }

    await safeCommit(session);
    res.json({ status: 'success', count: payrolls.length });
  } catch (error) {
    await safeAbort(session);
    logger.error('خطأ في الدفع الجماعي: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  } finally {
    await safeEnd(session);
  }
});

router.get('/payroll/summary/:period', hrmGuard('hrm_payroll', 'read'), async (req, res) => {
  try {
    const period = req.params.period;
    const payrolls = await Payroll.find({ companyId: req.user.companyId, period });
    const summary = {
      totalEmployees: payrolls.length,
      totalGross: payrolls.reduce((s, p) => s + p.grossSalary, 0),
      totalDeductions: payrolls.reduce((s, p) => s + p.totalDeductions, 0),
      totalNet: payrolls.reduce((s, p) => s + p.netSalary, 0),
      totalHours: payrolls.reduce((s, p) => s + p.totalWorkedHours, 0),
      totalOT: payrolls.reduce((s, p) => s + p.totalOvertimeHours, 0),
      draft: payrolls.filter(p => p.status === 'draft').length,
      approved: payrolls.filter(p => p.status === 'approved').length,
      paid: payrolls.filter(p => p.status === 'paid').length
    };
    res.json({ status: 'success', summary, payrolls });
  } catch (error) {
    logger.error('خطأ في ملخص الرواتب: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

/* ═══ PERFORMANCE ═══ */
router.get('/performance', hrmGuard('hrm_performance', 'read'), async (req, res) => {
  try {
    const { employeeId } = req.query;
    const filter = { companyId: req.user.companyId };
    if (employeeId) filter.employeeId = employeeId;
    const evaluations = await Performance.find(filter).sort('-date');
    res.json({ status: 'success', evaluations });
  } catch (error) {
    logger.error('خطأ في جلب التقييمات: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

router.post('/performance', hrmGuard('hrm_performance', 'create'),
  requireFields('employeeId'),
  positiveNumber('quality', 'productivity', 'teamwork', 'attendance'),
  maxLength('notes', 500),
  async (req, res) => {
  try {
    const { employeeId, date, quality, productivity, teamwork, attendance, average, grade, notes } = req.body;
    if (!employeeId) return res.status(400).json({ status: 'error', message: 'الموظف مطلوب' });
    const employee = await Employee.findOne({ _id: employeeId, companyId: req.user.companyId });
    if (!employee) return res.status(404).json({ status: 'error', message: 'الموظف غير موجود' });
    const evaluation = await Performance.create({
      companyId: req.user.companyId, employeeId: employee._id,
      employeeNo: employee.employeeNo, employeeName: employee.name,
      date: date || new Date().toISOString().slice(0, 10),
      quality: quality || 3, productivity: productivity || 3,
      teamwork: teamwork || 3, attendance: attendance || 3,
      average: average || 0, grade: grade || '', notes: notes || '',
      evaluatedBy: req.user.username || ''
    });
    res.status(201).json({ status: 'success', evaluation });
  } catch (error) {
    logger.error('خطأ في إنشاء تقييم: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

module.exports = router;
