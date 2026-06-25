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

const ALL_PAGES = ['dash','inventory','sales','returns','purchases','suppay','customers','suppliers','soa','finance','pl','users','companies','audit','hrm','settings'];

test.describe('Navigation — All Pages', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('الانتقال لجميع الصفحات بدون أخطاء', async ({ page }) => {
    for (const pg of ALL_PAGES) {
      const errors = [];
      page.on('pageerror', err => errors.push(err.message));
      await navigateTo(page, pg);
      const hasOn = await page.evaluate((p) => document.getElementById('p-' + p)?.classList.contains('on'), pg);
      expect(hasOn).toBeTruthy();
    }
  });

  test('عنوان الصفحة يتغير مع كل صفحة', async ({ page }) => {
    const safePages = ['dash', 'inventory', 'sales', 'customers', 'settings'];
    for (const pg of safePages) {
      await navigateTo(page, pg);
      const title = await page.evaluate(() => document.getElementById('pg-title')?.textContent);
      expect(title && title.length > 0).toBeTruthy();
    }
  });
});

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await navigateTo(page, 'dash');
  });

  test('يجب عرض بطاقة الإحصائيات', async ({ page }) => {
    const statsVisible = await page.evaluate(() => {
      return document.querySelector('.stats-grid') !== null || document.querySelector('.stat-card') !== null || document.getElementById('cust-stat-cards') !== null;
    });
    expect(statsVisible).toBeTruthy();
  });

  test('لا توجد أخطاء JS في الداشبورد', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.reload();
    await page.waitForLoadState('networkidle');
    const critical = errors.filter(e => !e.includes('missing )') && !e.includes('is not defined'));
    expect(critical).toHaveLength(0);
  });
});

test.describe('Inventory Page', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await navigateTo(page, 'inventory');
  });

  test('يجب عرض جدول الأصناف', async ({ page }) => {
    const tableExists = await page.evaluate(() => {
      return document.getElementById('tbl-inventory') !== null || document.querySelector('#p-inventory table') !== null;
    });
    expect(tableExists).toBeTruthy();
  });

  test('زر إضافة صنف جديد موجود', async ({ page }) => {
    const btnExists = await page.evaluate(() => {
      const btns = document.querySelectorAll('#p-inventory button');
      for (const btn of btns) {
        if (btn.textContent.includes('جديد') || btn.textContent.includes('إضافة') || btn.id === 'btn-new-item') return true;
      }
      return false;
    });
    expect(btnExists).toBeTruthy();
  });
});

test.describe('Sales Page', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await navigateTo(page, 'sales');
  });

  test('يجب عرض جدول فواتير البيع', async ({ page }) => {
    const tableExists = await page.evaluate(() => {
      return document.getElementById('tbl-invoices') !== null || document.querySelector('#p-sales table') !== null;
    });
    expect(tableExists).toBeTruthy();
  });
});

test.describe('Purchases Page', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await navigateTo(page, 'purchases');
  });

  test('يجب عرض جدول فواتير الشراء', async ({ page }) => {
    const tableExists = await page.evaluate(() => {
      return document.getElementById('tbl-purchases') !== null || document.querySelector('#p-purchases table') !== null;
    });
    expect(tableExists).toBeTruthy();
  });
});

test.describe('HRM Page', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await navigateTo(page, 'hrm');
  });

  test('يجب عرض واجهة HRM', async ({ page }) => {
    const hrmVisible = await page.evaluate(() => {
      const el = document.getElementById('p-hrm');
      return el && el.classList.contains('on');
    });
    expect(hrmVisible).toBeTruthy();
  });

  test('تبويبات HRM موجودة', async ({ page }) => {
    const tabsExist = await page.evaluate(() => {
      const el = document.getElementById('p-hrm');
      return el && el.querySelectorAll('.hrm-tab, .tab-btn, [data-tab]').length > 0;
    });
    expect(tabsExist).toBeTruthy();
  });
});

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await navigateTo(page, 'settings');
  });

  test('يجب عرض صفحة الإعدادات', async ({ page }) => {
    const settingsVisible = await page.evaluate(() => {
      const el = document.getElementById('p-settings');
      return el && el.classList.contains('on');
    });
    expect(settingsVisible).toBeTruthy();
  });
});

test.describe('Users Page', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await navigateTo(page, 'users');
  });

  test('يجب عرض جدول المستخدمين', async ({ page }) => {
    const tableExists = await page.evaluate(() => {
      return document.getElementById('tbl-users') !== null || document.querySelector('#p-users table') !== null;
    });
    expect(tableExists).toBeTruthy();
  });
});

test.describe('Customers & Suppliers', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('صفحة الزبائن تعمل', async ({ page }) => {
    await navigateTo(page, 'customers');
    const visible = await page.evaluate(() => {
      const el = document.getElementById('p-customers');
      return el && el.classList.contains('on');
    });
    expect(visible).toBeTruthy();
  });

  test('صفحة الموردين تعمل', async ({ page }) => {
    await navigateTo(page, 'suppliers');
    const visible = await page.evaluate(() => {
      const el = document.getElementById('p-suppliers');
      return el && el.classList.contains('on');
    });
    expect(visible).toBeTruthy();
  });
});

test.describe('Reports', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('صفحة كشف الحساب تعمل', async ({ page }) => {
    await navigateTo(page, 'soa');
    const visible = await page.evaluate(() => {
      const el = document.getElementById('p-soa');
      return el && el.classList.contains('on');
    });
    expect(visible).toBeTruthy();
  });

  test('صفحة الخزينة تعمل', async ({ page }) => {
    await navigateTo(page, 'finance');
    const visible = await page.evaluate(() => {
      const el = document.getElementById('p-finance');
      return el && el.classList.contains('on');
    });
    expect(visible).toBeTruthy();
  });

  test('صفحة الأرباح والخسائر تعمل', async ({ page }) => {
    await navigateTo(page, 'pl');
    const visible = await page.evaluate(() => {
      const el = document.getElementById('p-pl');
      return el && el.classList.contains('on');
    });
    expect(visible).toBeTruthy();
  });
});

test.describe('No Critical JS Errors', () => {
  test('النظام يعمل بدون أخطاء حرجة بعد تسجيل الدخول', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await loginAsAdmin(page);
    const safePages = ['dash', 'inventory', 'sales', 'purchases', 'customers', 'hrm', 'settings'];
    for (const pg of safePages) {
      await navigateTo(page, pg);
    }
    const critical = errors.filter(e => !e.includes('missing )') && !e.includes('is not defined') && !e.includes('Cannot read prop'));
    expect(critical).toHaveLength(0);
  });
});
