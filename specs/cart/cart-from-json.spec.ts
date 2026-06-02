import { test, expect } from '../../fixtures/shop.fixture';
import productsToAdd from '../../test-data/products-to-add.json';

test('Добавление товаров из JSON и проверка корзины', async ({ shopPage, page }) => {
  for (const { productId } of productsToAdd) {
    await shopPage.addItemToCart(productId);
    await page.waitForTimeout(500);
  }
  await shopPage.goToCart();
  for (const { name } of productsToAdd) {
    await expect(page.getByText(name)).toBeVisible();
  }
});