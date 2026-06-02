import {test,expect} from '../../fixtures/shop.fixture';
import {CartPage} from '../../pages/cart.page';

test('Именение количества товара @regression', async ({shopPage,page})=>{
    const cartPage = new CartPage(page);
    await shopPage.addItemToCart(77);
    await page.waitForTimeout(1000);
    await shopPage.goToCart();
    const totalBefore = await page.locator('.wc-block-components-totals-footer-item-tax-value').textContent()
    await cartPage.cartItemCount.first().fill('3');
    await page.waitForTimeout(2000);
    const totalAfter = await page.locator('.wc-block-components-totals-footer-item-tax-value').textContent();
    expect(totalAfter).not.toBe(totalBefore);
    await expect(cartPage.cartItemCount).toHaveValue('3');
});