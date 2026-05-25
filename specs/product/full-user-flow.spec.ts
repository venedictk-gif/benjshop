import { test, expect } from '@playwright/test';
import{ShopPage} from '../../pages/shop.page';
import{ProductPage} from '../../pages/product.page';
import{CheckoutPage} from '../../pages/checkout.page';
import products from '../../test-data/products.json'




test('Проверка страницы товара', async ({page})=> {
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    await page.goto('/shop/');
    await shopPage.open(77)
    await expect(productPage.itemPrice).toContainText(products.punchingBag.price);
    await expect(productPage.itemDesc).toContainText(products.punchingBag.fullDescription);
    await productPage.addItemToCart();
    await page.getByText('Корзина').first().click();
    await expect(page.getByText('Боксерская груша')).toBeVisible();
    await page.locator('.wc-block-components-button').click();
    await checkoutPage.fillBillngForm('Андрей','Бутов','Россия','ул. Фехтовальщиков, д. 5','Рязань','Рязанская область','123123','71231231212');
    await checkoutPage.addressBillCheck.check();
    await checkoutPage.placeOrder();
});