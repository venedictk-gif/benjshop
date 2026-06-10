import {test,expect} from '../../fixtures/shop.fixture';
import {CartPage} from '../../pages/cart.page';
import products from '../../test-data/products.json'

test('Проверка обновления количества товара в корзине через кнопки +/−', async ({shopPage,page})=> {
    const cartPage = new CartPage(page);
    await shopPage.addItemToCart(products.punchingBag.productId);
    await shopPage.goToCart();
    await cartPage.cartItemCount.fill('1');
    await page.getByRole('button', { name: 'Увеличить количество Боксерская груша' }).click();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Увеличить количество Боксерская груша' }).click();
    await page.waitForTimeout(300);
    await expect(cartPage.cartItemCount).toHaveValue('3');
    await expect(cartPage.cartTotalPrice).not.toHaveText(products.punchingBag.price);
});