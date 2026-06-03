//Создать купон через API (или админку), применить его в корзине, проверить, что сумма пересчиталась со скидкой. Проверить, 
// что невалидный купон показывает ошибку.

import {test,expect} from '../../fixtures/shop.fixture';
import { CartPage } from '../../pages/cart.page';
import { LoginPage } from '../../pages/login.page';
import { getAuthHeader } from '../../utils/api';
import users from '../../test-data/users.json'

test('Проверка купона', async ({request,shopPage,page,context})=>{
    await context.clearCookies();
    const random = Math.floor(Math.random() * 100000);
    const discountName = `discount${random}`;
    const newCoupon = await request.post('/wp-json/wc/v3/coupons', {
    headers: { 'Authorization': getAuthHeader() },
    data: {
    code: `${discountName}`,
    discount_type: 'percent',
    amount: '50',
  },
});
  const body =  await newCoupon.json();
  console.log(body);
  expect(newCoupon.status()).toBeTruthy();
  expect(body).toHaveProperty('id');
  const loginPage=new LoginPage(page);
  const cartPage=new CartPage(page);
  await loginPage.goto();
  await loginPage.login(users.testUser.userEmail,users.testUser.password);
  await page.goto('https://localhost/shop/');
  await shopPage.addItemToCart(77);
  await shopPage.goToCart();
  await page.locator('.wc-block-components-panel__button').click();
  await page.getByLabel('Введите код').fill('Несуществующий код');
  await page.screenshot({path:'123.png', fullPage:true});
  await page.getByRole('button', { name: 'Применить' }).click();
  await expect(page.getByText('Купон «несуществующий код» не может быть применён, поскольку его не существует.')).toBeVisible();
  const totalBefore = await cartPage.cartTotalPrice.textContent();
  await page.getByLabel('Введите код').fill(`${discountName}`);
  await page.getByRole('button', { name: 'Применить' }).click();
  await page.waitForTimeout(2000);
  const totalAfter = await cartPage.cartTotalPrice.textContent();
  expect(totalAfter).not.toBe(totalBefore);
  await request.delete(`/wp-json/wc/v3/coupons/${body.id}`, {
  headers: { 'Authorization': getAuthHeader() },
  params: { force: true },
});
});