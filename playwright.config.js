const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/frontend',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'list',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true
  },
  webServer: {
    command: 'node server.js',
    port: 3000,
    timeout: 60000,
    reuseExistingServer: !process.env.CI,
    env: {
      NODE_ENV: 'development',
      CORS_ORIGIN: 'http://localhost:3000,http://localhost:5500'
    }
  }
});
