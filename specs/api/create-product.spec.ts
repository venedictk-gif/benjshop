import { test, expect } from '@playwright/test';

test('Создание товара через WooCommerce API', async ({ request }) => {
  const newProduct = await request.post('/wp-json/wc/v3/products', {
    headers: {
      'Authorization': 'Basic Y2tfMzc5YjAyMDVlMzIxMTZiYTY3M2FmOTcxZDVmODFkMzJmYjE2N2UzNTpjc18wMmU1YmQwYWQyNTBmYWViMWVjYThjZjVkZWFhN2U4OTZkZWQwNTlh',
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