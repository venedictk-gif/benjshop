import {test,expect} from '../../fixtures/shop.fixture';
import {CartPage} from '../../pages/cart.page';

test('Визуальный регресс тест ', async ({shopPage,page})=>{
    await shopPage.addItemToCart(77);
    await page.waitForTimeout(1000);
    await shopPage.goToCart();
    await expect(page).toHaveScreenshot('cart-with-item.png');
});