import {test,expect} from '../../fixtures/shop.fixture'

test('Поиск несуществующего товара', async ({shopPage, page})=> {
    await shopPage.searchInput.fill('ZXC123');
    await shopPage.searchButton.click();
    await expect(page.getByText('Не найдено товаров, соответствующих вашему выбору.')).toBeVisible();
});