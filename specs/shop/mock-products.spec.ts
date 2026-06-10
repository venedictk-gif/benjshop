import {test,expect} from '../../fixtures/shop.fixture'

test('Мок списка товаров, проверка, отсутствия товара при получении 500', async({shopPage,page})=>{
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
});

test('Мок 404 при добавлении в корзину', async ({ shopPage, page }) => {
  await page.route('https://localhost/wp-json/wc/store/v1/batch', async route => {
    await route.fulfill({ status: 404 });
  });
  await shopPage.addItemToCart(77);
  await shopPage.goToCart();
  await expect(page.getByText('Боксерская груша')).not.toBeVisible();
});

test('Мок 503 при добавлении в корзину', async ({ shopPage, page }) => {
  await page.route('https://localhost/wp-json/wc/store/v1/batch', async route => {
    await route.fulfill({ status: 503 });
  });
  await shopPage.addItemToCart(77);
  await shopPage.goToCart();
  await expect(page.getByText('Боксерская груша')).not.toBeVisible();
});
//Три кейса через массив (проверки по статусу ошибки)
const mockErrors = [
    {status:404},
    {status:500},
    {status:503}
];
mockErrors.forEach(({ status }) => {
  test(`Мок ошибка для каждого ${status}`, async ({ shopPage, page }) => {
      await page.route('https://localhost/wp-json/wc/store/v1/batch', async route => {
    await route.fulfill({status});
  });
  await shopPage.addItemToCart(77);
  await shopPage.goToCart();
  await expect(page.getByText('Боксерская груша')).not.toBeVisible();
});
});