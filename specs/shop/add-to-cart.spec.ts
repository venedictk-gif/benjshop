import {test,expect} from"@playwright/test";
import {ShopPage} from '../../pages/shop.page';
import products from '../../test-data/products.json'

let shopPage : ShopPage;

test.beforeEach(async ({page})=>{
 shopPage = new ShopPage(page);
 await shopPage.goto();
});

test('Добавление товара Боксерская груша в корзину @smoke', async ({page})=> {
    await expect(page).toHaveURL('/shop/');
    await shopPage.addItemToCart(products.punchingBag.productId);
    await expect(shopPage.cartBadge).toHaveText('1');
    await shopPage.goToCart();
    await expect(page.getByText('Боксерская груша')).toBeVisible();
});