import {test,expect} from '../../fixtures/shop.fixture'

test('Проверка фильтрации по категории', async ({shopPage, page})=> {
    await page.getByRole('link', { name: 'Футбол' }).click();
    await expect(page.getByText('Боксерск')).not.toBeVisible();
    await expect(page.getByText('Футбольный')).toBeVisible();
});


[
  { category: 'Футбол', visibleHref: 'soccerball', hiddenHref: 'punchingbag' },
  { category: 'Бокс', visibleHref: 'punchingbag', hiddenHref: 'soccerball' },
].forEach(({ category, visibleHref, hiddenHref }) => {
  test(`Фильтрация по категории "${category}"`, async ({ shopPage, page }) => {
    await page.getByRole('link', { name: category, exact: true }).click();
    await page.waitForTimeout(500);
    await expect(page.locator(`a[href*="${visibleHref}"]`).first()).toBeVisible();
    await expect(page.locator(`a[href*="${hiddenHref}"]`)).not.toBeVisible();
  });
});