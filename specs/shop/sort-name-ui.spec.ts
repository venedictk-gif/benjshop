import {test,expect} from '../../fixtures/shop.fixture'
//Тест на проверку сортировки товаров по названию через UI 
test ('Проверка сортировки товаров по цене через UI', async ({shopPage,page})=> {
    //Выбрать сортировку «По возрастанию цены»
    await shopPage.orderBy('alphabetical');
    await page.waitForTimeout(500);
    //Собрать все цены со страницы
    const namesElements = page.locator('.wp-block-post-title');
    const names = await Promise.all(
    (await namesElements.all()).map(async (el)=> await el.textContent()));
    //Проверить, что названия идут по возрастанию
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
});