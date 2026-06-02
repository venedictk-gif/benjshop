import {test,expect} from '../../fixtures/shop.fixture'
import products from '../../test-data/products.json'
test('Добавление разных товаров в корзину @regression', async ({shopPage,page}) => {

    const items = [ 
        { productId: products.punchingBag.productId, name: products.punchingBag.name },
        { productId: products.soccerBall.productId, name: products.soccerBall.name },
        { productId: products.boxingGloves.productId, name: products.boxingGloves.name },
    ];

    for (const {productId} of items) { 
      await shopPage.addItemToCart(productId)
      await page.waitForTimeout(1000);
    }
    await shopPage.goToCart();
    await page.waitForTimeout(2000);
    await expect(page.locator('.wc-block-components-product-name').first()).toBeVisible();

    const itemNames = await Promise.all(
    (await page.locator('.wc-block-components-product-name').all()).map(async (el) => await el.textContent())
    );
    for (const { name } of items) {
   expect(itemNames).toContain(name);
    }
});