import {test,expect} from '../../fixtures/shop.fixture';

test('Пустая корзина', async ({shopPage,page})=>{;
    await shopPage.goToCart();
    await expect(page.getByText('Ваша корзина сейчас пуста!')).toBeVisible();
});

