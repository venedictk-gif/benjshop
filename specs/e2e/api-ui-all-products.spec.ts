import { test, expect } from '../../fixtures/shop.fixture';
import { getAuthHeader } from '../../utils/api';

test('Проверка консистентности API и UI', async ({ request, shopPage, page }) => {
  // 1. Получить товары через API
  const apiResponse = await request.get('/wp-json/wc/v3/products', {
    headers: { 'Authorization': getAuthHeader() },
  });
  expect(apiResponse.status()).toBe(200);
  const apiBody = await apiResponse.json();
  const apiNames = apiBody.map((p: any) => p.name);
  console.log('API товаров:', apiNames.length, apiNames);

  // 2. Собрать товары из UI
  await expect(page).toHaveURL(/shop/);
  const uiElements = await page.locator('.wc-block-product-template h2 a').all();
  const uiNames = await Promise.all(
    uiElements.map(async (el) => await el.textContent())
  );
  console.log('UI товаров:', uiNames.length, uiNames);

  // 3. Сравнить
  expect(uiNames.length).toBe(apiNames.length);
  for (const name of apiNames) {
    expect(uiNames).toContain(name);
  }
});