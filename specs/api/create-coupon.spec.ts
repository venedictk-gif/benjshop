import {test, expect} from '@playwright/test';
import { getAuthHeader } from '../../utils/api';

test('Создать купон', async ({request})=>{
const newCoupon = await request.post('/wp-json/wc/v3/coupons', {
  headers: { 'Authorization': getAuthHeader() },
  data: {
    code: 'DISCOUNT10',
    discount_type: 'percent',
    amount: '10',
  },
});
  const body =  await newCoupon.json();
  console.log(body);
  expect(newCoupon.status()).toBeTruthy();
  expect(body).toHaveProperty('id');
});