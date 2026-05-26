import{ProductPage} from '../../pages/product.page';
import products from '../../test-data/products.json'
import {test,expect} from '../../fixtures/shop.fixture';

test('Проверка страницы товара', async ({shopPage,page})=> {
    const productPage = new ProductPage(page);
    await shopPage.open(77);
    await expect(productPage.itemName).toContainText(products.punchingBag.name);
    await expect(productPage.itemPrice).toContainText(products.punchingBag.price);
    await expect(productPage.itemDesc).toContainText(products.punchingBag.fullDescription);
    await expect(page).toHaveURL(/.*punchingbag/);
});