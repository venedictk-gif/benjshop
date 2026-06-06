import {test,expect} from '../../fixtures/shop.fixture'


test('Проверить отображение копирайта в хидере на разных страницах', async ({ shopPage, page }) => {
  const links = [
    { pageUrl: 'cart/', expected: 'Twenty Twenty-Five' },
    { pageUrl: 'shop/', expected: 'Twenty Twenty-Five' },
    { pageUrl: 'my-account/', expected: 'Twenty Twenty-Five' },
    { pageUrl: 'sample-page/', expected: 'Twenty Twenty-Five' },
  ];
  for (const { pageUrl, expected } of links) {
    await page.goto(`https://localhost/${pageUrl}`);
    await expect(page.getByText(expected)).toBeVisible();
  }
});