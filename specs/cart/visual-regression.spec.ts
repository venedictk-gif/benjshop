import {test,expect} from '../../fixtures/shop.fixture';
import products from '../../test-data/products.json'

test('Визуальный регресс тест @regression', async ({shopPage,page})=>{
    await shopPage.addItemToCart(products.punchingBag.productId);
    await page.waitForTimeout(1000);
    await shopPage.goToCart();
    await expect(page).toHaveScreenshot('cart-with-item.png');
});