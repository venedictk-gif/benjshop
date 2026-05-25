import {test,expect} from"@playwright/test";
import {ShopPage} from '../../pages/shop.page';


test('Пустая корзина', async ({page})=>{
    const shopPage = new ShopPage(page);
    await shopPage.goto();
    await shopPage.goToCart();
    await expect(page.getByText('Ваша корзина сейчас пуста!')).toBeVisible();
});

