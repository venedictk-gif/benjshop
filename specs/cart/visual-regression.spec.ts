import {test,expect} from '../../fixtures/shop.fixture';

test('Визуальный регресс тест @regression', async ({shopPage,page})=>{
    await shopPage.addItemToCart(77);
    await page.waitForTimeout(1000);
    await shopPage.goToCart();
    await expect(page).toHaveScreenshot('cart-with-item.png');
});