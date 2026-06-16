//Добавить проект mobile-chrome в конфиг. Написать тест на /shop/ с эмуляцией iPhone 12.
import {test,expect} from '../../fixtures/shop.fixture'

test('Страница магазина на мобильной версии @regression', async ({ shopPage, page }) => {
  await page.waitForTimeout(1000);
  await expect(shopPage.itemsList).toBeVisible();
});