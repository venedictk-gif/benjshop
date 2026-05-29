import { test, expect } from '@playwright/test';

test('Страница магазина на мобильной версии @regression', async ({ page }) => {
  await page.goto('/shop/');
  await page.waitForTimeout(1000);
  await expect(page.locator('.wc-block-product-template')).toBeVisible();
});