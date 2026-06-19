const request = require('supertest');
const { connectTestDB, disconnectTestDB, clearTestDB, createTestUser, createTestCompany, generateToken } = require('./setup');
const { createApp } = require('./app-factory');

describe('Accounts API — /api/v1/accounts', () => {
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

  async function createAuth() {
    const company = await createTestCompany();
    const user = await createTestUser({ companyId: company._id, role: 'admin' });
    const token = generateToken(user);
    return { company, user, token };
  }

  test('GET / — يجب إرجاع قائمة الحسابات (فارغة)', async () => {
    const { token } = await createAuth();

    const res = await request(app)
      .get('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.accounts).toEqual([]);
  });

  test('POST / — يجب إنشاء حساب جديد', async () => {
    const { token } = await createAuth();

    const res = await request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'حساب نقدي', balance: 1000 });

    expect(res.status).toBe(201);
    expect(res.body.account.name).toBe('حساب نقدي');
    expect(res.body.account.balance).toBe(1000);
  });

  test('POST / — اسم فارغ يجب إرجاع 400', async () => {
    const { token } = await createAuth();

    const res = await request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: '', balance: 100 });

    expect(res.status).toBe(400);
  });

  test('PATCH /:accountId — يجب تحديث الحساب', async () => {
    const { token } = await createAuth();

    const created = await request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'حساب قابل للتحديث', balance: 500 });

    const accountId = created.body.account.id;

    const res = await request(app)
      .patch(`/api/v1/accounts/${accountId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'حساب محدَّث', balance: 2000 });

    expect(res.status).toBe(200);
    expect(res.body.account.name).toBe('حساب محدَّث');
    expect(res.body.account.balance).toBe(2000);
  });

  test('DELETE /:accountId — يجب حذف الحساب', async () => {
    const { token } = await createAuth();

    const created = await request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'حساب للحذف' });

    const accountId = created.body.account.id;

    const res = await request(app)
      .delete(`/api/v1/accounts/${accountId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('تم حذف الحساب بنجاح');
  });

  test('DELETE /:accountId — حساب غير موجود يجب إرجاع 404', async () => {
    const { token } = await createAuth();

    const res = await request(app)
      .delete('/api/v1/accounts/nonexistent-id')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});
