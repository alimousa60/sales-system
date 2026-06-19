const request = require('supertest');
const express = require('express');
const { connectTestDB, disconnectTestDB, clearTestDB, createTestUser, generateToken } = require('./setup');

function createApp() {
  const app = express();
  app.use(express.json());

  const authRoutes = require('../routes/auth.routes');
  app.use('/api/v1/auth/login', authRoutes);

  const { errorHandler } = require('../middleware/errorHandler');
  app.use(errorHandler);

  return app;
}

describe('Auth API — /api/v1/auth/login', () => {
  let app;

  beforeAll(async () => {
    await connectTestDB();
    app = createApp();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  test('تسجيل دخول ناجح — يجب إرجاع token ومعلومات المستخدم', async () => {
    await createTestUser();

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'testuser', password: 'test1234' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toBe('testuser');
    expect(res.body.user.name).toBe('مستخدم اختبار');
  });

  test('اسم مستخدم غير موجود — يجب إرجاع 401', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'ghost', password: 'test1234' });

    expect(res.status).toBe(401);
    expect(res.body.status).toBe('error');
  });

  test('كلمة مرور خاطئة — يجب إرجاع 401', async () => {
    await createTestUser();

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'testuser', password: 'wrongpass' });

    expect(res.status).toBe(401);
    expect(res.body.status).toBe('error');
  });

  test('حقول مفقودة — يجب إرجاع 400', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: '' });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  test('حساب غير نشط — يجب إرجاع 403', async () => {
    await createTestUser({ username: 'inactiveuser', status: 'inactive', isActive: false });

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'inactiveuser', password: 'test1234' });

    expect(res.status).toBe(403);
    expect(res.body.status).toBe('error');
  });
});
