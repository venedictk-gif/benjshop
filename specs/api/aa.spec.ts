import { test, expect } from '@playwright/test';

test('Создание товара через WooCommerce API', async ({ request }) => {
  const newProduct = await request.post('/wp-json/wc/v3/products', {
    params: {
      consumer_key: 'ck_87f108422a8571ae6a96f85c36571c3ded2eb5b3',
      consumer_secret: 'cs_fbfb3d32f430c8071973c3e5647198a807bd0f56',
    },
    data: {
      name: 'Тестовый товар',
      regular_price: '999',
      type: 'simple',
    },
  });
  
  console.log('Status:', newProduct.status());
  const body = await newProduct.json();
  console.log('Body:', body);
  expect(newProduct.status()).toBe(201);
  expect(body).toHaveProperty('id');
});