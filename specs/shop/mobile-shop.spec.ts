//Добавить проект mobile-chrome в конфиг. Написать тест на /shop/ с эмуляцией iPhone 12.
import { test, expect } from '@playwright/test';

test('Страница магазина на мобильной версии @regression', async ({ page }) => {
  await page.goto('/shop/');
  await page.waitForTimeout(1000);
  await expect(page.locator('.wc-block-product-template')).toBeVisible();
});