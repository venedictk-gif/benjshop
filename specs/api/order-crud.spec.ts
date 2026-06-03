import {test, expect} from '@playwright/test'
import { getAuthHeader } from '../../utils/api';

test('Создание заказа', async ({request})=>{
      const newOrder = await request.post('/wp-json/wc/v3/orders', {
    headers: {
      'Authorization': getAuthHeader(),
    }
  });
  console.log('Status:', newOrder.status());
  const body = await newOrder.json();
  console.log('Body:', body);
  expect(newOrder.status()).toBe(201);
  expect(body).toHaveProperty('id');
});

test('Запрос заказа', async ({request})=> {
    const getOrder = await request.get('/wp-json/wc/v3/orders/114', {
         headers: {
          'Authorization': getAuthHeader(),
    },
  });   
  const body = await getOrder.json();
  console.log(body);
  expect(getOrder.status()).toBe(200);
  expect(body).toHaveProperty('created_via');
});
