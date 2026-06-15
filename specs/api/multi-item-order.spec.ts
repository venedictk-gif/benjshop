import {test,expect} from '@playwright/test';
import { getAuthHeader } from '../../utils/api';
/*
Тест на проверку создания заказа с несколькими товарами — 25 мин
Создать заказ через API с тремя разными товарами
Проверить, что статус 201
Получить заказ по ID и проверить, что в line_items три товара
Проверить общую сумму заказа
*/

test ('Проверка заказа с несколькоми товарами', async ({request})=> {
    const newOrder = await request.post('/wp-json/wc/v3/orders' ,{
        headers:{
            'Authorization':getAuthHeader()
        },
        data:{
            "customer_id": 54,
  "status": "pending",
  "line_items": [
    {
      "product_id": 77,
      "quantity": 1
    },
    {
      "product_id": 78,
      "quantity": 1
    },
    {
      "product_id": 79,
      "quantity": 1
    }
  ]
}
});
    const body = await newOrder.json();
    expect(newOrder.status()).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body.customer_id).toBe(54);
    const id=body.id;
    const getOrder = await request.get(`/wp-json/wc/v3/orders/${id}`, {
        headers:{
            'Authorization':getAuthHeader()
        }
    })
    const body2= await getOrder.json();
    expect(getOrder.status()).toBe(200);
    console.log(body2);
    expect(body2).toHaveProperty('line_items');
    expect(body2.line_items).toHaveLength(3);
    expect(body2).toMatchObject({total:'7597.00'});
    const delOrder = await request.delete(`/wp-json/wc/v3/orders/${id}`, {
        headers: {
            'Authorization': getAuthHeader()
        }
    });
    expect(delOrder.status()).toBeTruthy();
});
