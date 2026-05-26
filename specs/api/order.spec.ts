import {test, expect} from '@playwright/test'

test('Создание заказа', async ({request})=>{
      const newOrder = await request.post('/wp-json/wc/v3/orders', {
    headers: {
      'Authorization': 'Basic Y2tfMzc5YjAyMDVlMzIxMTZiYTY3M2FmOTcxZDVmODFkMzJmYjE2N2UzNTpjc18wMmU1YmQwYWQyNTBmYWViMWVjYThjZjVkZWFhN2U4OTZkZWQwNTlh',
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
      'Authorization': 'Basic Y2tfMzc5YjAyMDVlMzIxMTZiYTY3M2FmOTcxZDVmODFkMzJmYjE2N2UzNTpjc18wMmU1YmQwYWQyNTBmYWViMWVjYThjZjVkZWFhN2U4OTZkZWQwNTlh',
    },
  });   
  const body = await getOrder.json();
  console.log(body);
  expect(getOrder.status()).toBe(200);
  expect(body).toHaveProperty('created_via');
});