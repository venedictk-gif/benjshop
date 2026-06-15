import {test,expect} from '@playwright/test'
import { getAuthHeader } from '../../utils/api';
/*
5. Тест на проверку получения списка заказов конкретного пользователя — 20 мин
Создать заказ с customer_id через API
Запросить список заказов через API с фильтром по customer_id
Проверить, что созданный заказ есть в списке
*/

test('Проверка получения списка заказов пользователя', async ({request})=> {
    const newOrder = await request.post('/wp-json/wc/v3/orders', {
        headers:{
            'Authorization': getAuthHeader()
        },
        data:{
            'customer_id':54,
             "status": "pending",
            "line_items": [
                    {
                    "product_id": 77,
                    "quantity": 1
    }],
        }
    });
    const body = await newOrder.json();
    expect(newOrder.status()).toBe(201);
    console.log(newOrder.status());
    const orderId=body.id;
    const getOrders = await request.get('/wp-json/wc/v3/orders', {
        headers:{
            'Authorization':getAuthHeader()
        },
        params:{
            customer_id:54
        }
    });
    expect(getOrders.status()).toBe(200);
    const orders = await getOrders.json();
    //проверка, что получен массив
    expect(Array.isArray(orders)).toBeTruthy();
    expect(orders.length).toBeGreaterThan(0);
    //поиск конкретного заказа по 54 покупателю
    const foundOrder = orders.find((order: any) => order.id === orderId);
    //проверка, что он существует и определен
    expect(foundOrder).toBeDefined();
    expect(foundOrder.customer_id).toBe(54);
});