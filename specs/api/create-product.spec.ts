import { test, expect } from '@playwright/test';


test('Создание товара', async ({request})=>{
    const newProduct = await request.post('/wp-json/wc/v3/products', {
            headers: {
              'Authorization':'Basic YWRtaW46T1pkdUVoSzVLYiohWXhRTnBm'
    },
        data: {
  name: "Тестовый товар",
  regular_price: "999",
  type: "simple",
}
});
const body = await newProduct.json();
console.log(body)
expect(newProduct.status()).toBe(200);
expect(body).toHaveProperty('id');
});