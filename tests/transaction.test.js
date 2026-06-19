const request = require('supertest');
const { connectTestDB, disconnectTestDB, clearTestDB, createTestUser, createTestCompany, generateToken } = require('./setup');
const { createApp } = require('./app-factory');

describe('Transactions API — /api/v1/transactions', () => {
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

  test('POST / — يجب إنشاء معاملة جديدة', async () => {
    const { token } = await createAuth();

    const res = await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'invoice', amount: 500, direction: 'credit', description: 'فاتورة بيع' });

    expect(res.status).toBe(201);
    expect(res.body.transaction.type).toBe('invoice');
    expect(res.body.transaction.amount).toBe(500);
  });

  test('POST / — بيانات ناقصة يجب إرجاع 400', async () => {
    const { token } = await createAuth();

    const res = await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 100 });

    expect(res.status).toBe(400);
  });

  test('GET / — يجب إرجاع قائمة المعاملات', async () => {
    const { token } = await createAuth();

    await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'fee', amount: 200, direction: 'debit', description: 'مصروف' });

    const res = await request(app)
      .get('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /?type=fee — يجب تصفية حسب النوع', async () => {
    const { token } = await createAuth();

    await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'fee', amount: 100, direction: 'debit' });

    await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'invoice', amount: 300, direction: 'credit' });

    const res = await request(app)
      .get('/api/v1/transactions?type=fee')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    res.body.data.forEach(t => expect(t.type).toBe('fee'));
  });

  test('GET /:transactionId — يجب إرجاع معاملة محددة', async () => {
    const { token } = await createAuth();

    const created = await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'invoice', amount: 999, direction: 'credit' });

    const txnId = created.body.transaction.id;

    const res = await request(app)
      .get(`/api/v1/transactions/${txnId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.transaction.amount).toBe(999);
  });

  test('PATCH /:transactionId — يجب تحديث المعاملة', async () => {
    const { token } = await createAuth();

    const created = await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'invoice', amount: 150, direction: 'credit' });

    const txnId = created.body.transaction.id;

    const res = await request(app)
      .patch(`/api/v1/transactions/${txnId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'تم التحديث', status: 'completed' });

    expect(res.status).toBe(200);
    expect(res.body.transaction.description).toBe('تم التحديث');
    expect(res.body.transaction.status).toBe('completed');
  });

  test('POST /receive — يجب إنشاء معاملة استلام', async () => {
    const { token } = await createAuth();

    const res = await request(app)
      .post('/api/v1/transactions/receive')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 1000, description: 'دفعة من زبون' });

    expect(res.status).toBe(201);
    expect(res.body.transaction.direction).toBe('credit');
    expect(res.body.transaction.type).toBe('payment');
  });

  test('POST /send — يجب إنشاء معاملة دفع', async () => {
    const { token } = await createAuth();

    const res = await request(app)
      .post('/api/v1/transactions/send')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 500, description: 'دفعة لمورد' });

    expect(res.status).toBe(201);
    expect(res.body.transaction.direction).toBe('debit');
    expect(res.body.transaction.type).toBe('payment');
  });

  test('POST /:transactionId/reconcile — يجب تسوية المعاملة', async () => {
    const { token } = await createAuth();

    const created = await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'invoice', amount: 300, direction: 'credit' });

    const txnId = created.body.transaction.id;

    const res = await request(app)
      .post(`/api/v1/transactions/${txnId}/reconcile`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.transaction.status).toBe('reconciled');
  });
});
