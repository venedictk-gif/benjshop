import { test, expect } from '@playwright/test';
import { getAuthHeader } from '../../utils/api';

test('Создание товара через WooCommerce API', async ({ request }) => {
  const newProduct = await request.post('/wp-json/wc/v3/products', {
    headers: {
      'Authorization': getAuthHeader(),
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