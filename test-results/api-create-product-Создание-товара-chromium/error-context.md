# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\create-product.spec.ts >> Создание товара
- Location: specs\api\create-product.spec.ts:4:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | 
  4  | test('Создание товара', async ({request})=>{
  5  |     const newProduct = await request.post('/wp-json/wc/v3/products', {
  6  |             headers: {
  7  |               'Authorization':'Basic YWRtaW46T1pkdUVoSzVLYiohWXhRTnBm'
  8  |     },
  9  |         data: {
  10 |   name: "Тестовый товар",
  11 |   regular_price: "999",
  12 |   type: "simple",
  13 | }
  14 | });
  15 | const body = await newProduct.json();
  16 | console.log(body)
> 17 | expect(newProduct.status()).toBe(200);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  18 | expect(body).toHaveProperty('id');
  19 | });
```