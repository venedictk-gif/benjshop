import {test,expect} from '../../fixtures/shop.fixture';
import {CartPage} from '../../pages/cart.page';
import products from '../../test-data/products.json'

//Очистка корзины перед тестами
test.beforeEach(async ({shopPage,page }) => {
  await page.goto('/cart/');
  const removeButtons = page.locator('.wc-block-cart-item__remove-link');
  for (let i = 0; i < 10; i++) {
    if (await removeButtons.count() === 0) break;
    await removeButtons.first().click();
    await page.waitForTimeout(500);
  }
  await shopPage.goto();
});

test('Удаление товара из корзины @regression', async ({shopPage, page}) => {
    const cartPage = new CartPage(page);
    await shopPage.addItemToCart(products.punchingBag.productId);
    await page.waitForTimeout(1000);
    await shopPage.addItemToCart(products.boxingGloves.productId);
    await page.waitForTimeout(1000);
    await shopPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(2);
    await cartPage.removeItem(products.punchingBag.name);
    await expect(cartPage.cartItems).toHaveCount(1);
    await page.waitForTimeout(1000);
    await cartPage.removeItem(products.boxingGloves.name);
    await expect(cartPage.cartItems).toHaveCount(0);
});

test('Удаление товара из корзины цикл @regression', async ({shopPage, page}) => {
    const cartPage = new CartPage(page);
    await shopPage.addItemToCart(products.punchingBag.productId);
    await page.waitForTimeout(1000);
    await shopPage.addItemToCart(products.boxingGloves.productId);
    await page.waitForTimeout(1000);
    await shopPage.goToCart();
    const  itemNames = [products.punchingBag.name,products.boxingGloves.name]
    for (const name of itemNames) {
        await cartPage.removeItem(name);
    }
    await expect(cartPage.cartItems).toHaveCount(0);
});