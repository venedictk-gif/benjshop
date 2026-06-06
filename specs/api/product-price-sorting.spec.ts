import { test, expect } from '@playwright/test';
import { getAuthHeader } from '../../utils/api';

test('Получение товаров и проверка сортировки по цене', async ({request}) => {
  const getProducts = await request.get('/wp-json/wc/v3/products', {
      headers: {
      'Authorization': getAuthHeader(),
    },
      params:{
        orderby:'price',
        order:'asc'
      }
  });
  const body = await getProducts.json();
  expect(getProducts.status()).toBe(200);
  const prices = body.map((product: any) => parseFloat(product.price));
  expect(prices.length).toBeGreaterThan(0);
  for (let i = 0; i < prices.length - 1; i++) {
  expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
}
});