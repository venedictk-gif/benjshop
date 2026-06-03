/*
 Создать заказ → проверить статус pending → обновить на completed через PUT → проверить изменение → обновить на cancelled → проверить.
*/

import {test, expect} from '@playwright/test'
import { getAuthHeader } from '../../utils/api';

test('Проверка изменений статуса заказа', async ({request})=>{
    const newOrder = await request.post('/wp-json/wc/v3/orders', {
    headers: {
      'Authorization': getAuthHeader(),
    }
  });
  console.log('Status:', newOrder.status());
  const body = await newOrder.json();
  console.log('Body:', body);
  expect(body).toHaveProperty('status', 'pending');                 
  expect(newOrder.status()).toBe(201);
  expect(body).toHaveProperty('id');
  const orderId= body.id;
  const completeOrder = await request.put(`/wp-json/wc/v3/orders/${orderId}`, {
        headers: {
      'Authorization': getAuthHeader(),
    },
        data:{
            'customer_id':0,
            'status':'completed'
        }
  });
  const body1 = await completeOrder.json();
  expect(body1).toHaveProperty('status', 'completed');  
  const cancelOrder = await request.put(`/wp-json/wc/v3/orders/${orderId}`, {
        headers: {
      'Authorization': getAuthHeader(),
    },
        data:{
            'customer_id':0,
            'status':'cancelled'
        }
  });
  const body2 = await cancelOrder.json();
  expect(body2).toHaveProperty('status', 'cancelled');
  await request.delete(`/wp-json/wc/v3/orders/${orderId}`, {
  headers: { 'Authorization': getAuthHeader() },
  params: { force: true },
});
});
