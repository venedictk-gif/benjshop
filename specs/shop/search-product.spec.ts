import {test,expect} from '../../fixtures/shop.fixture'

test('Поиск товара @regression', async ({shopPage,page})=>{
    await expect(page).toHaveURL(/shop/);
    await page.locator('#wp-block-search__input-3').fill('Бокс');
    await page.getByRole('button',{name:'Поиск'}).click();
    await page.waitForTimeout(1500); 
    await expect(page.getByText('Футбольный')).not.toBeVisible();
    await expect(page.getByText('груша').first()).toBeVisible();
});