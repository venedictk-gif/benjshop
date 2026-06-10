import{ProductPage} from '../../pages/product.page';
import {test,expect} from '../../fixtures/shop.fixture';
import { getAuthHeader } from '../../utils/api';

test('Проверка отображения цены со скидкой', async ({page,shopPage,request})=> {
  const productPage = new ProductPage(page);
    const discountProduct = await request.post('/wp-json/wc/v3/products', {
    headers: {
      'Authorization': getAuthHeader(),
    },
    data: {
      name: 'Товар со скидкой',
      regular_price: '1000',
      sale_price: '799',
      type: 'simple',
    },
  });
    expect(discountProduct.status()).toBe(201);
    const body = await discountProduct.json();
    expect(body).toHaveProperty('id');
    const itemName=body.name
    await expect(page).toHaveURL('/shop/');
    await page.locator('.page-numbers').filter({ hasText: '2' }).click();
    await page.getByText(`${itemName}`).first().click();
    await expect(productPage.oldPrice).toBeVisible();
    await expect(productPage.newPrice).toHaveText('799,00 ₽');
});

/*
const productSlug = body.slug;
await page.goto(`/shop/${productSlug}/`);
*/