import {test,expect} from '../../fixtures/shop.fixture';
import {ProductPage} from '../../pages/product.page';
import {CheckoutPage} from '../../pages/checkout.page';
import products from '../../test-data/products.json'

test('Проверка страницы товара @smoke', async ({shopPage,page})=> {
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    await shopPage.open(77)
    await expect(productPage.itemPrice).toContainText(products.punchingBag.price);
    await expect(productPage.itemDesc).toContainText(products.punchingBag.fullDescription);
    await productPage.addItemToCart();
    await page.getByText('Корзина').first().click();
    await expect(page.getByText('Боксерская груша')).toBeVisible();
    await page.locator('.wc-block-components-button').click();
    await checkoutPage.addressBillCheck.check();
    await page.getByRole('button', { name: 'Оформить заказ' }).click();
});