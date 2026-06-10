import {test,expect} from '../../fixtures/shop.fixture';
import products from '../../test-data/products.json';

test('Проверка возврата к покупкам из корзины', async ({shopPage,page}) => {
    await shopPage.addItemToCart(products.punchingBag.productId);
    await shopPage.miniCartButton.click();
    await expect(page.getByText(products.punchingBag.name).first()).toBeVisible();
    await page.screenshot({path:'1234.png', fullPage:true});
    await page.locator('.wc-block-mini-cart__footer-cart').click();
    await expect(page).toHaveURL('/cart/')
});