import {test,expect} from '../../fixtures/shop.fixture';
import {CartPage} from '../../pages/cart.page';
import products from '../../test-data/products.json'

test('Именение суммы покупки при нескольких товара @regression', async ({shopPage,page})=>{
    const cartPage = new CartPage(page);
    await shopPage.addItemToCart(products.punchingBag.productId);
    await page.waitForTimeout(1000);
    await shopPage.goToCart();
    const totalBefore = await cartPage.cartTotalPrice.textContent()
    await cartPage.cartItemCount.first().fill('3');
    await page.waitForTimeout(2000);
    const totalAfter = await cartPage.cartTotalPrice.textContent();
    expect(totalAfter).not.toBe(totalBefore);
    await expect(cartPage.cartItemCount).toHaveValue('3');
});