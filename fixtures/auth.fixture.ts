import { test as base, expect } from '@playwright/test'; 

type AuthFixtures = { 
  authenticatedPage: void; 
};

export const test = base.extend<AuthFixtures>({ 
  authenticatedPage: [async ({ page }, use) => {  
    await page.goto('/wp-login.php');
    await page.locator('#user_login').fill('zigmundFreid@mail.ru');
    await page.locator('#user_pass').fill('Zigmund67!');
    await page.locator('#wp-submit').click();
    await expect(page).toHaveURL(/.*my-account/);
    await use();
  }, { auto: false }], 
});

export { expect };