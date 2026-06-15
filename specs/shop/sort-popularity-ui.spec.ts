import {test,expect} from '../../fixtures/shop.fixture'
/*
Тест на сортировку товаров по популярности 
Выбрать сортировку popularity
Проверить, что товары отображаются (хотя бы что страница не пустая)
*/
test('Проверка сортировки по популярности', async ({shopPage,page})=> {
    await shopPage.orderBy('popularity');
    await expect(shopPage.itemsList).toBeVisible();
});