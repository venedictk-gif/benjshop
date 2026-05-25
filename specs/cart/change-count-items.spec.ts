import {test,expect} from"@playwright/test";
import {ShopPage} from '../../pages/shop.page';
import {CartPage} from '../../pages/cart.page';



/*
4. Написать тест на изменение количества товара в корзине 
Конкретно: Добавить товар, перейти в корзину, изменить количество с 1 на 3 через инпут, проверить, что сумма пересчиталась.
Результат:* Тест проверяет изменение количества.
*/
test('Именение количества товара', async ({page})=>{
 const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);
    await shopPage.goto();
    await shopPage.addItemToCart(77);
    await page.waitForTimeout(1000);
    await shopPage.goToCart();
    const totalBefore = await page.locator('.wc-block-components-totals-footer-item-tax-value').textContent()
    await cartPage.cartItemCount.fill('3');
    await page.waitForTimeout(2000);
    const totalAfter = await page.locator('.wc-block-components-totals-footer-item-tax-value').textContent();
    expect(totalAfter).not.toBe(totalBefore);
    await expect(cartPage.cartItemCount).toHaveValue('3');
});