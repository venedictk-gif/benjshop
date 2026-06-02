import {test,expect} from '../../fixtures/shop.fixture';
import {CartPage} from '../../pages/cart.page';
import products from '../../test-data/products.json'

test('Удаление товара из корзины @regression', async ({shopPage, page}) => {
    await shopPage.goto();
    const cartPage = new CartPage(page);
    await shopPage.addItemToCart(77);
    await page.waitForTimeout(1000);
    await shopPage.addItemToCart(78);
    await page.waitForTimeout(1000);
    await shopPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(2);
    await cartPage.removeItem(products.punchingBag.name);
    await expect(cartPage.cartItems).toHaveCount(1);
    await page.waitForTimeout(1000);
    await cartPage.removeItem(products.soccerBall.name);
    await expect(cartPage.cartItems).toHaveCount(0);
});