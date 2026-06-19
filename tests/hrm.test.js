const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { connectTestDB, disconnectTestDB, clearTestDB, createTestUser, createTestCompany, generateToken } = require('./setup');

function createApp() {
  const app = express();
  app.use(express.json());

  const authGuard = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ status: 'error', message: 'غير مصرح' });
    const token = authHeader.split(' ')[1];
    try {
      const jwt = require('jsonwebtoken');
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: payload.userId, role: payload.role, username: payload.username, companyId: payload.companyId, permissions: payload.permissions || [] };
      next();
    } catch (err) {
      res.status(401).json({ status: 'error', message: 'توكن غير صالح' });
    }
  };

  const hrmRoutes = require('../routes/hrm.routes');
  app.use('/api/hrm', authGuard, hrmRoutes);

  const { errorHandler } = require('../middleware/errorHandler');
  app.use(errorHandler);

  return app;
}

describe('HRM API — /api/hrm', () => {
  let app, user, token, companyId;

  beforeAll(async () => {
    await connectTestDB();
    app = createApp();
  });

  beforeEach(async () => {
    await clearTestDB();
    user = await createTestUser();
    companyId = user.companyId;
    token = generateToken(user, [
      { resource: 'hrm', actions: ['read', 'create', 'update', 'delete', 'export'] },
      { resource: 'hrm_payroll', actions: ['read', 'create', 'update', 'delete', 'approve', 'pay', 'export'] },
      { resource: 'hrm_performance', actions: ['read', 'create', 'update', 'delete', 'export'] }
    ]);
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  /* ═══ EMPLOYEES ═══ */
  describe('الموظفين', () => {
    test('GET /employees — يجب إرجاع قائمة فارغة', async () => {
      const res = await request(app)
        .get('/api/hrm/employees')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.employees).toEqual([]);
    });

    test('POST /employees — يجب إنشاء موظف جديد', async () => {
      const res = await request(app)
        .post('/api/hrm/employees')
        .set('Authorization', `Bearer ${token}`)
        .send({
          employeeNo: 'EMP-001',
          name: 'أحمد محمد',
          phone: '0912345678',
          department: 'المبيعات',
          position: 'مندوب',
          contractType: 'full_time',
          hourlyRate: 10,
          overtimeRate: 15,
          monthlySalary: 2000,
          startDate: '2026-01-01'
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.employee.employeeNo).toBe('EMP-001');
      expect(res.body.employee.name).toBe('أحمد محمد');
      expect(res.body.employee.contractType).toBe('full_time');
    });

    test('POST /employees — بدون اسم يجب إرجاع 400', async () => {
      const res = await request(app)
        .post('/api/hrm/employees')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeNo: 'EMP-002' });

      expect(res.status).toBe(400);
    });

    test('POST /employees — رقم موظف مكرر يجب إرجاع 409', async () => {
      await request(app)
        .post('/api/hrm/employees')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeNo: 'EMP-001', name: 'أحمد' });

      const res = await request(app)
        .post('/api/hrm/employees')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeNo: 'EMP-001', name: 'محمد' });

      expect(res.status).toBe(409);
    });

    test('PATCH /employees/:id — يجب تحديث الموظف', async () => {
      const createRes = await request(app)
        .post('/api/hrm/employees')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeNo: 'EMP-001', name: 'أحمد' });

      const id = createRes.body.employee._id;

      const res = await request(app)
        .patch(`/api/hrm/employees/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ department: 'المحاسبة', hourlyRate: 12 });

      expect(res.status).toBe(200);
      expect(res.body.employee.department).toBe('المحاسبة');
      expect(res.body.employee.hourlyRate).toBe(12);
    });

    test('GET /employees/:id — يجب إرجاع موظف محدد', async () => {
      const createRes = await request(app)
        .post('/api/hrm/employees')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeNo: 'EMP-001', name: 'أحمد' });

      const id = createRes.body.employee._id;

      const res = await request(app)
        .get(`/api/hrm/employees/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.employee.name).toBe('أحمد');
    });
  });

  /* ═══ ATTENDANCE ═══ */
  describe('الحضور', () => {
    let employeeId;

    beforeEach(async () => {
      const empRes = await request(app)
        .post('/api/hrm/employees')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeNo: 'EMP-001', name: 'أحمد', contractType: 'full_time', hourlyRate: 10 });
      employeeId = empRes.body.employee._id;
    });

    test('POST /attendance — يجب تسجيل حضور', async () => {
      const res = await request(app)
        .post('/api/hrm/attendance')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, date: '2026-06-15', checkIn: '09:00', checkOut: '17:00', status: 'present' });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.record.totalHours).toBe(8);
    });

    test('POST /attendance — حضور بدون خروج يحسب تلقائياً', async () => {
      const res = await request(app)
        .post('/api/hrm/attendance')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, date: '2026-06-15', checkIn: '08:00', checkOut: '18:00' });

      expect(res.status).toBe(201);
      expect(res.body.record.totalHours).toBe(8);
      expect(res.body.record.overtimeHours).toBe(2);
    });

    test('GET /attendance — يجب إرجاع سجلات الحضور', async () => {
      await request(app)
        .post('/api/hrm/attendance')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, date: '2026-06-15', status: 'present' });

      const res = await request(app)
        .get('/api/hrm/attendance?date=2026-06-15')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.records.length).toBe(1);
    });

    test('POST /attendance — تعديل سجل موجود', async () => {
      await request(app)
        .post('/api/hrm/attendance')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, date: '2026-06-15', status: 'present' });

      const res = await request(app)
        .post('/api/hrm/attendance')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, date: '2026-06-15', status: 'late', checkIn: '09:30' });

      expect(res.status).toBe(200);
      expect(res.body.record.status).toBe('late');
    });

    test('POST /attendance/bulk — حضور جماعي', async () => {
      const res = await request(app)
        .post('/api/hrm/attendance/bulk')
        .set('Authorization', `Bearer ${token}`)
        .send({
          records: [
            { employeeId, date: '2026-06-15', checkIn: '09:00', checkOut: '17:00', status: 'present' },
            { employeeId, date: '2026-06-16', checkIn: '09:00', checkOut: '17:00', status: 'present' }
          ]
        });

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
    });
  });

  /* ═══ ADVANCES ═══ */
  describe('السلف والقروض', () => {
    let employeeId;

    beforeEach(async () => {
      const empRes = await request(app)
        .post('/api/hrm/employees')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeNo: 'EMP-001', name: 'أحمد', contractType: 'full_time', hourlyRate: 10 });
      employeeId = empRes.body.employee._id;

      await request(app)
        .post('/api/hrm/cash-ledger/adjust')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 50000, reason: 'رأس المال' });
    });

    test('POST /advances — صرف سلفة', async () => {
      const res = await request(app)
        .post('/api/hrm/advances')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, type: 'advance', amount: 500, purpose: 'احتياج شخصي' });

      expect(res.status).toBe(201);
      expect(res.body.advance.amount).toBe(500);
      expect(res.body.advance.remainingBalance).toBe(500);
      expect(res.body.advance.status).toBe('active');
    });

    test('POST /advances — صرف قرض مع أقساط', async () => {
      const res = await request(app)
        .post('/api/hrm/advances')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, type: 'loan', amount: 1200, monthlyInstallment: 200, installmentsTotal: 6 });

      expect(res.status).toBe(201);
      expect(res.body.advance.type).toBe('loan');
      expect(res.body.advance.monthlyInstallment).toBe(200);
      expect(res.body.advance.installmentsTotal).toBe(6);
    });

    test('POST /advances/:id/repay — تسديد سلفة', async () => {
      const createRes = await request(app)
        .post('/api/hrm/advances')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, type: 'advance', amount: 500 });

      const id = createRes.body.advance._id;

      const res = await request(app)
        .post(`/api/hrm/advances/${id}/repay`)
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 200 });

      expect(res.status).toBe(200);
      expect(res.body.advance.remainingBalance).toBe(300);
      expect(res.body.advance.installmentsPaid).toBe(1);
    });

    test('POST /advances/:id/repay — تسديد كامل', async () => {
      const createRes = await request(app)
        .post('/api/hrm/advances')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, type: 'advance', amount: 500 });

      const id = createRes.body.advance._id;

      const res = await request(app)
        .post(`/api/hrm/advances/${id}/repay`)
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 500 });

      expect(res.status).toBe(200);
      expect(res.body.advance.remainingBalance).toBe(0);
      expect(res.body.advance.status).toBe('completed');
    });

    test('GET /advances — يجب إرجاع السلف', async () => {
      await request(app)
        .post('/api/hrm/advances')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, type: 'advance', amount: 500 });

      const res = await request(app)
        .get('/api/hrm/advances')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.advances.length).toBe(1);
    });
  });

  /* ═══ PAYROLL ═══ */
  describe('الرواتب', () => {
    let employeeId;

    beforeEach(async () => {
      const empRes = await request(app)
        .post('/api/hrm/employees')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeNo: 'EMP-001', name: 'أحمد', contractType: 'full_time', hourlyRate: 10, overtimeRate: 15 });
      employeeId = empRes.body.employee._id;

      await request(app)
        .post('/api/hrm/cash-ledger/adjust')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 50000, reason: 'رأس المال' });

      await request(app)
        .post('/api/hrm/attendance')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, date: '2026-06-05', checkIn: '09:00', checkOut: '17:00', status: 'present' });

      await request(app)
        .post('/api/hrm/attendance')
        .set('Authorization', `Bearer ${token}`)
        .send({ employeeId, date: '2026-06-06', checkIn: '08:00', checkOut: '18:00', status: 'present' });
    });

    test('POST /payroll/generate — توليد رواتب', async () => {
      const res = await request(app)
        .post('/api/hrm/payroll/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({ period: '2026-06' });

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(1);
      expect(res.body.payrolls[0].totalWorkedHours).toBe(16);
      expect(res.body.payrolls[0].totalOvertimeHours).toBe(2);
    });

    test('POST /payroll/generate — توليد مرتين يحذف المسودات', async () => {
      await request(app)
        .post('/api/hrm/payroll/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({ period: '2026-06' });

      const res = await request(app)
        .post('/api/hrm/payroll/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({ period: '2026-06' });

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(1);
    });

    test('POST /payroll/:id/approve — اعتماد راتب', async () => {
      const genRes = await request(app)
        .post('/api/hrm/payroll/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({ period: '2026-06' });

      const payrollId = genRes.body.payrolls[0]._id;

      const res = await request(app)
        .post(`/api/hrm/payroll/${payrollId}/approve`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.payroll.status).toBe('approved');
    });

    test('POST /payroll/:id/pay — دفع راتب', async () => {
      const genRes = await request(app)
        .post('/api/hrm/payroll/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({ period: '2026-06' });

      const payrollId = genRes.body.payrolls[0]._id;

      await request(app)
        .post(`/api/hrm/payroll/${payrollId}/approve`)
        .set('Authorization', `Bearer ${token}`);

      const res = await request(app)
        .post(`/api/hrm/payroll/${payrollId}/pay`)
        .set('Authorization', `Bearer ${token}`)
        .send({ date: '2026-06-30' });

      expect(res.status).toBe(200);
      expect(res.body.payroll.status).toBe('paid');
      expect(res.body.payroll.paidDate).toBe('2026-06-30');
    });

    test('POST /payroll/:id/pay — دفع بدون اعتماد يجب إرجاع 400', async () => {
      const genRes = await request(app)
        .post('/api/hrm/payroll/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({ period: '2026-06' });

      const payrollId = genRes.body.payrolls[0]._id;

      const res = await request(app)
        .post(`/api/hrm/payroll/${payrollId}/pay`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(400);
    });

    test('GET /payroll — يجب إرجاع الرواتب', async () => {
      await request(app)
        .post('/api/hrm/payroll/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({ period: '2026-06' });

      const res = await request(app)
        .get('/api/hrm/payroll?period=2026-06')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.payrolls.length).toBe(1);
    });

    test('GET /payroll/summary/:period — ملخص الرواتب', async () => {
      await request(app)
        .post('/api/hrm/payroll/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({ period: '2026-06' });

      const res = await request(app)
        .get('/api/hrm/payroll/summary/2026-06')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.summary.totalEmployees).toBe(1);
      expect(res.body.summary.draft).toBe(1);
    });
  });

  /* ═══ CASH LEDGER ═══ */
  describe('سجل الخزينة', () => {
    test('GET /cash-ledger — يجب إرجاع الرصيد وال Movements', async () => {
      const res = await request(app)
        .get('/api/hrm/cash-ledger')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.currentBalance).toBe(0);
      expect(res.body.entries).toEqual([]);
    });

    test('POST /cash-ledger/adjust — تسوية إيداع', async () => {
      const res = await request(app)
        .post('/api/hrm/cash-ledger/adjust')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 10000, reason: 'رأس المال' });

      expect(res.status).toBe(201);
      expect(res.body.currentBalance).toBe(10000);
    });

    test('POST /cash-ledger/adjust — تسوية خصم', async () => {
      await request(app)
        .post('/api/hrm/cash-ledger/adjust')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 10000, reason: 'رأس المال' });

      const res = await request(app)
        .post('/api/hrm/cash-ledger/adjust')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: -500, reason: 'مصروف' });

      expect(res.status).toBe(201);
      expect(res.body.currentBalance).toBe(9500);
    });
  });

  /* ═══ AUTH ═══ */
  describe('المصادقة', () => {
    test('GET /employees — بدون توكن يجب إرجاع 401', async () => {
      const res = await request(app)
        .get('/api/hrm/employees');

      expect(res.status).toBe(401);
    });
  });
});
