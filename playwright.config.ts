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
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']
       }
    },
    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox']
       }
    },*/
  ],
});