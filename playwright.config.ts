import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './specs',
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  workers: isCI ? 4 : 1, 
  reporter: [
    ['html', { open: 'never' }], 
    ['json', { outputFile: 'reports/results.json' }]
  ],
  use: {
    baseURL: 'https://localhost',
    ignoreHTTPSErrors: true,
    screenshot: 'off',
    video: 'off',
    trace: 'on-first-retry',
    testIdAttribute: 'data-testid'
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json'
       },
    dependencies: ['setup'],
    },
    {
    name: 'mobile-chrome',
    use: { ...devices['iPhone 12'],
      storageState: 'playwright/.auth/user.json' },
    dependencies: ['setup'],
    testMatch: '*mobile*.spec.ts',
    },
      {
    name: 'api',
    testDir: './specs/api-pet',
    use: {
      baseURL: 'https://petstore.swagger.io',
    },
  },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json'
       },
        dependencies: ['setup'],
      grep: /@smoke/,
    },
  ],
});