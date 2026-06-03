import {test,expect} from '../../fixtures/shop.fixture'
test('Проверка пагинации страниц', async ({shopPage,page})=>{
    await expect(page.locator('.page-numbers.current')).toHaveText('1');
    await expect(page.locator('.page-numbers').filter({ hasText: '2' })).toBeVisible();
    await page.locator('.page-numbers').filter({ hasText: '2' }).click();
    await page.waitForTimeout(500);
    await expect(page.locator('.page-numbers.current')).toHaveText('2');
});

test('Проверка пагинации товаров на странице', async ({shopPage,page})=>{
      // Первая страница — текущая
  await expect(page.locator('.page-numbers.current')).toHaveText('1');

  // Собрать названия товаров на первой странице
  const firstPageItems = await page.locator('.wc-block-product-template h2 a').all();
  const firstPageNames = await Promise.all(firstPageItems.map(async (el) => await el.textContent()));

  // Перейти на вторую страницу
  await page.locator('.page-numbers').filter({ hasText: '2' }).click();
  await page.waitForTimeout(500);

  // Вторая страница — текущая
  await expect(page.locator('.page-numbers.current')).toHaveText('2');

  // Собрать названия товаров на второй странице
  const secondPageItems = await page.locator('.wc-block-product-template h2 a').all();
  const secondPageNames = await Promise.all(secondPageItems.map(async (el) => await el.textContent()));

  // Проверить, что товары на страницах разные
  for (const name of firstPageNames) {
    expect(secondPageNames).not.toContain(name);
  }

  // Вернуться на первую
  await page.locator('.page-numbers').filter({ hasText: '1' }).click();
  await page.waitForTimeout(500);
  await expect(page.locator('.page-numbers.current')).toHaveText('1');
});