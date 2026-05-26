import { test as setup } from '../fixtures/auth.fixture';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({authenticatedPage,page}) => {
  await page.context().storageState({ path: authFile });
});