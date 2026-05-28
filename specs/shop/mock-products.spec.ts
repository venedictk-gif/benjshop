import {test,expect} from '../../fixtures/shop.fixture'

test('Мок списка товаров', async({shopPage,page})=>{
    await page.route('https://localhost/wp-json/wc/store/v1/batch', async route =>{
        const json = 
        [
    {
        status: 500,
    contentType: 'application/json',
    body: JSON.stringify({ 
      error: 'Internal Server Error', 
      message: 'Database connection failed' 
    })
    },
    ];
    await route.fulfill({json});    
    });
    await expect(page).toHaveURL(/shop/);
    await shopPage.addItemToCart(77);
    await shopPage.goToCart();
    await expect(page.getByText('Боксерская груша')).not.toBeVisible();
    await page.screenshot({ path: 'error.png', fullPage: true });
});



    //await page.goto('https://localhost/wp-json/wc/store/v1/batch')
    //await expect(page.getByText('Internal Server Error')).toBeVisible();