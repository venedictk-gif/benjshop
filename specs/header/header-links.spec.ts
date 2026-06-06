import {test,expect} from '../../fixtures/shop.fixture'


test('Проверить переходы по линкам хидера', async ({ shopPage, page }) => {
  const links = [
    { pageName: 'Корзина', expected: '/cart/' },
    { pageName: 'Магазин', expected: '/shop/' },
    { pageName: 'Мой аккаунт', expected: '/my-account/' },
    { pageName: 'Пример страницы', expected: '/sample-page/' },
    { pageName: 'Оформление заказа', expected: '/checkout/' },
  ];
  for (const { pageName, expected } of links) {
    await page.getByRole('link', { name: pageName }).first().click();
    await expect(page).toHaveURL(expected);
  }
});