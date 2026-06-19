const request = require('supertest');
const { connectTestDB, disconnectTestDB, clearTestDB, createTestUser, createTestCompany, generateToken } = require('./setup');
const { createApp } = require('./app-factory');

describe('Users API — /api/v1/users', () => {
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

  test('GET / — يجب إرجاع قائمة المستخدمين', async () => {
    const company = await createTestCompany();
    const user = await createTestUser({ companyId: company._id, role: 'admin' });
    const token = generateToken(user);

    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test('GET / — بدون توكن يجب إرجاع 401', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.status).toBe(401);
    expect(res.body.status).toBe('error');
  });

  test('GET /:userId — يجب إرجاع مستخدم محدد', async () => {
    const company = await createTestCompany();
    const user = await createTestUser({ companyId: company._id, role: 'admin' });
    const token = generateToken(user);

    const res = await request(app)
      .get(`/api/v1/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.username).toBe('testuser');
  });

  test('GET /:userId — مستخدم غير موجود يجب إرجاع 404', async () => {
    const company = await createTestCompany();
    const user = await createTestUser({ companyId: company._id, role: 'admin' });
    const token = generateToken(user);
    const fakeId = '000000000000000000000000';

    const res = await request(app)
      .get(`/api/v1/users/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });

  test('PATCH /:userId/status — يجب تحديث الحالة', async () => {
    const company = await createTestCompany();
    const user = await createTestUser({ companyId: company._id, role: 'admin' });
    const token = generateToken(user);

    const res = await request(app)
      .patch(`/api/v1/users/${user._id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'suspended' });

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('suspended');
  });

  test('PATCH /:userId/status — حالة غير صحيحة يجب إرجاع 400', async () => {
    const company = await createTestCompany();
    const user = await createTestUser({ companyId: company._id, role: 'admin' });
    const token = generateToken(user);

    const res = await request(app)
      .patch(`/api/v1/users/${user._id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'invalid' });

    expect(res.status).toBe(400);
  });
});
