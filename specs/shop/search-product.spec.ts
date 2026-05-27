import {test,expect} from '../../fixtures/shop.fixture'

test('Поиск товара', async ({shopPage,page})=>{
    await expect(page).toHaveURL(/shop/);
    await page.screenshot({ path: 'search.png', fullPage: true });
    await page.locator('#wp-block-search__input-3').fill('Бокс');
    await page.getByRole('button',{name:'Поиск'}).click();
    await page.waitForTimeout(1500); 
    await page.screenshot({ path: '1search.png', fullPage: true });
    await expect(page.getByText('Футбольный')).not.toBeVisible();
    await expect(page.getByText('Боксерская груша', { exact: true })).toBeAttached();
});