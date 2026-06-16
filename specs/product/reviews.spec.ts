import {test,expect} from '../../fixtures/product.fixture'
/*
Тест на проверку отзывов к товару 
Открыть страницу товара
Проверить, что вкладка «Отзывы» видна
Проверить, что форма отправки отзыва отображается
*/

test('Проверка отзывов к товару', async ({productPage,page})=> {
    await expect(productPage.reviews).toBeVisible();
    await productPage.reviews.click();
    await expect (productPage.comment).toBeVisible();
});