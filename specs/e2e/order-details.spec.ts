//После оформления заказа (через API или UI) перейти в /my-account/orders/, проверить,что заказ отображается в списке, открыть детали заказа, проверить статус

import { test,expect } from '@playwright/test'
import { getAuthHeader } from '../../utils/api';
import { LoginPage } from '../../pages/login.page';
import users from '../../test-data/users.json'

test('Проверка заказа в личном кабинете', async ({request,context,page})=>{
  const newOrder = await request.post('/wp-json/wc/v3/orders', {
    headers: {
      'Authorization': getAuthHeader()},
    data:{
        customer_id: 54,
        status: "pending",
        line_items: [
        {
            product_id: 77,
            quantity: 1
        }]
}});
  const body = await newOrder.json();
  expect(newOrder.status()).toBe(201);
  expect(body).toHaveProperty('id');
  const orderId=body.id;
  const loginPage=new LoginPage(page);
  await context.clearCookies()
  await loginPage.goto();
  await loginPage.login(users.testUser.userEmail,users.testUser.password);
  await page.goto('https://localhost/my-account/orders/');
  await expect(page.getByText(`${orderId}`)).toBeVisible();
  await page.locator(`[aria-label="Посмотреть заказ номер ${orderId}"]`).click();
  await page.screenshot({ path: 'order-details.png', fullPage: true });
  await expect(page.locator('.order-status')).toContainText('Ожидается оплата');
  await expect(page.getByText('Боксерская груша')).toBeVisible();
  await expect(page.locator('.woocommerce-Price-amount').nth(1)).toBeVisible();
});