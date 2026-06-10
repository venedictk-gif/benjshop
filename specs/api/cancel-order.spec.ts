import {test,expect} from '@playwright/test';
import { getAuthHeader } from '../../utils/api';

test('Проверка отмены заказа API', async ({page,context,request})=>{
    const newOrder = await request.post('/wp-json/wc/v3/orders', {
        headers: {
          'Authorization': getAuthHeader(),
        },
        data:{
  "customer_id": 54,
  "status": "pending",
  "line_items": [
    {
      "product_id": 77,
      "quantity": 1
    }
  ]
        }
      });
      const body = await newOrder.json();
      expect(newOrder.status()).toBe(201);
      expect(body).toHaveProperty('id');
      const orderId=body.id;
      const cancelOrder = await request.put(`/wp-json/wc/v3/orders/${orderId}`, {
        headers: {
      'Authorization': getAuthHeader(),
    },
        data:{
            'customer_id':54,
            'status':'cancelled'
        }
  });
     expect(cancelOrder.status()).toBe(200);
     const cancelBody = await cancelOrder.json();
    expect(cancelBody.status).toBe('cancelled');
    await request.delete(`/wp-json/wc/v3/orders/${orderId}`, {
    headers: { 'Authorization': getAuthHeader() },
    params: { force: true },
});
});