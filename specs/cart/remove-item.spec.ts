import {test,expect} from"@playwright/test";
import {ShopPage} from '../../pages/shop.page';
import {CartPage} from '../../pages/cart.page';
import products from '../../test-data/products.json'


/*
2. Написать тест на удаление товара из корзины 
Конкретно: Добавить два товара в корзину, удалить один, проверить, что остался один, проверить счётчик.
Результат: Тест на удаление работает.
*/

test('Удаление товара из корзины', async ({page}) => {
    const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);
    await shopPage.goto();
    await shopPage.addItemToCart(77);
    await page.waitForTimeout(1000);
    await shopPage.addItemToCart(78);
    await page.waitForTimeout(1000);
    await shopPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(2);
    await cartPage.removeItem(products.punchingBag.name);
    await expect(cartPage.cartItems).toHaveCount(1);
});