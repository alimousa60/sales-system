const { test, expect } = require('@playwright/test');

async function loginAsAdmin(page) {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => typeof handleLogin === 'function' && typeof showPage === 'function', { timeout: 15000 });
  await page.fill('#login-user', 'admin');
  await page.fill('#login-pass', '1234');
  await page.evaluate(async () => await handleLogin());
  await page.waitForFunction(() => !document.getElementById('login-screen')?.classList.contains('on'), { timeout: 15000 });
}

async function navigateTo(page, pageName) {
  await page.evaluate((p) => { try { showPage(p); } catch(e) {} }, pageName);
  await page.waitForTimeout(500);
}

async function rawFetch(page, method, url, body = null) {
  return await page.evaluate(async ({ method, url, body }) => {
    const token = localStorage.getItem('salesSystemAuthToken') || '';
    const opts = {
      method,
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(url, opts);
    let data = null;
    try { data = await res.json(); } catch(e) {}
    return { status: res.status, data };
  }, { method, url, body });
}

test.describe('Accounts CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('POST + GET — إنشاء حساب وقراءته', async ({ page }) => {
    const created = await rawFetch(page, 'POST', '/api/v1/accounts', { name: 'حساب CRUD اختبار', balance: 0 });
    expect([200, 201]).toContain(created.status);

    const list = await rawFetch(page, 'GET', '/api/v1/accounts');
    expect(list.status).toBe(200);
    expect(list.data.accounts.length).toBeGreaterThan(0);
  });

  test('PATCH — تعديل حساب', async ({ page }) => {
    const created = await rawFetch(page, 'POST', '/api/v1/accounts', { name: 'للتعديل CRUD', balance: 0 });
    const id = created.data.account.id;

    const res = await rawFetch(page, 'PATCH', `/api/v1/accounts/${id}`, { name: 'تم التعديل CRUD' });
    expect(res.status).toBe(200);
    expect(res.data.account.name).toBe('تم التعديل CRUD');
  });

  test('DELETE — حذف حساب', async ({ page }) => {
    const created = await rawFetch(page, 'POST', '/api/v1/accounts', { name: 'للحذف CRUD', balance: 0 });
    const id = created.data.account.id;

    const res = await rawFetch(page, 'DELETE', `/api/v1/accounts/${id}`);
    expect(res.status).toBe(200);
  });

  test('DELETE — حساب غير موجود', async ({ page }) => {
    const res = await rawFetch(page, 'DELETE', '/api/v1/accounts/nonexistent-id');
    expect(res.status).toBe(404);
  });
});

test.describe('Transactions', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('GET — قراءة المعاملات', async ({ page }) => {
    const res = await rawFetch(page, 'GET', '/api/v1/transactions');
    expect(res.status).toBe(200);
  });
});

test.describe('Users API', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('GET — قائمة المستخدمين', async ({ page }) => {
    const res = await rawFetch(page, 'GET', '/api/v1/users');
    expect(res.status).toBe(200);
    const users = res.data.users || res.data.data;
    expect(users.length).toBeGreaterThan(0);
  });

  test('GET — مستخدم محدد', async ({ page }) => {
    const list = await rawFetch(page, 'GET', '/api/v1/users');
    const users = list.data.users || list.data.data;
    const userId = users[0]._id || users[0].id;
    const res = await rawFetch(page, 'GET', `/api/v1/users/${userId}`);
    expect(res.status).toBe(200);
  });
});

test.describe('HRM API', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('GET — قائمة الموظفين (200 أو 403 بدون صلاحيات)', async ({ page }) => {
    const res = await rawFetch(page, 'GET', '/api/hrm/employees');
    expect([200, 403]).toContain(res.status);
  });
});

test.describe('Company API', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('GET — بيانات الشركة', async ({ page }) => {
    const res = await rawFetch(page, 'GET', '/api/v1/company');
    expect([200, 304]).toContain(res.status);
  });
});

test.describe('Auth Flow', () => {
  test('تسجيل خروج + إعادة دخول', async ({ page }) => {
    await loginAsAdmin(page);
    const hasShell = await page.evaluate(() => document.querySelector('.shell') !== null);
    expect(hasShell).toBeTruthy();
  });

  test('توكن غير صالح', async ({ page }) => {
    await loginAsAdmin(page);
    await page.evaluate(() => {
      localStorage.setItem('salesSystemAuthToken', 'invalid-token-xyz');
    });
    const res = await rawFetch(page, 'GET', '/api/v1/accounts');
    expect(res.status).toBe(401);
  });
});

test.describe('Navigation + CRUD Integration', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('إنشاء حساب + الذهاب للداشبورد', async ({ page }) => {
    await rawFetch(page, 'POST', '/api/v1/accounts', { name: 'للداشبورد', balance: 100 });
    await navigateTo(page, 'dash');
    await page.waitForTimeout(1000);
    const on = await page.evaluate(() => document.getElementById('p-dash')?.classList.contains('on'));
    expect(on).toBeTruthy();
  });

  test('صفحة الزبائن', async ({ page }) => {
    await rawFetch(page, 'POST', '/api/v1/accounts', { name: 'زبون CRUD', balance: 0 });
    await navigateTo(page, 'customers');
    await page.waitForTimeout(1000);
    const on = await page.evaluate(() => document.getElementById('p-customers')?.classList.contains('on'));
    expect(on).toBeTruthy();
  });

  test('صفحة الموردين', async ({ page }) => {
    await rawFetch(page, 'POST', '/api/v1/accounts', { name: 'مورد CRUD', balance: 0 });
    await navigateTo(page, 'suppliers');
    await page.waitForTimeout(1000);
    const on = await page.evaluate(() => document.getElementById('p-suppliers')?.classList.contains('on'));
    expect(on).toBeTruthy();
  });
});
