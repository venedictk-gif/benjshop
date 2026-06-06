import{ProductPage} from '../../pages/product.page';
import products from '../../test-data/products.json'
import {test,expect} from '../../fixtures/shop.fixture';

test('Проверка хлебных крошек на содержание', async ({shopPage,page})=>{
    const productPage = new ProductPage(page);
    await productPage.goto(products.boxingGloves.name);
    await expect(page.locator('.woocommerce-breadcrumb')).toBeVisible();
    await expect(page.locator('.woocommerce-breadcrumb a[href="/"]')).toHaveText('Главная');
    await expect(page.locator('.woocommerce-breadcrumb a[href*="/shop/"]')).toHaveText('Магазин');
    await expect(page.locator('.woocommerce-breadcrumb')).toContainText('Боксерская груша');
    await page.locator('.woocommerce-breadcrumb a[href*="/shop/"]').click();
    await expect(page).toHaveURL(/.*shop/);
});