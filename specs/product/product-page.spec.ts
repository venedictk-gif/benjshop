import { test, expect } from '@playwright/test';
import{ShopPage} from '../../pages/shop.page';
import{ProductPage} from '../../pages/product.page';
import products from '../../test-data/products.json'




test('Проверка страницы товара', async ({page})=> {
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page);
    await page.goto('/shop/');
    await shopPage.open(77);
    await expect(productPage.itemName).toContainText(products.punchingBag.name);
    await expect(productPage.itemPrice).toContainText(products.punchingBag.price);
    await expect(productPage.itemDesc).toContainText(products.punchingBag.fullDescription);
    await expect(page).toHaveURL(/.*punchingbag/);
});