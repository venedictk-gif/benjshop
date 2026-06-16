/*Тест на проверку страницы «Мой аккаунт» — адреса — 20 мин

Конкретно: Залогиниться, перейти в /my-account/edit-address/. Проверить, что адрес доставки отображается. Изменить адрес, сохранить, проверить обновление.
*/

import {test,expect} from '../../fixtures/shop.fixture'

test('Тес на проверку страницы Мой аккаунт', async ({shopPage,page,context}) => {
    await context.clearCookies();
    await page.goto('/wp-login.php');
    await expect(page).toHaveURL('/wp-login.php')
    await page.locator('#user_login').fill('zigmundFreid@mail.ru');
    await page.locator('#user_pass').fill('Zigmund67!');
    await page.getByRole('button', { name: 'Войти' }).click();
    await expect(page).toHaveURL('/my-account/');
    await page.getByText('Адреса').click();
    await expect(page).toHaveURL('/my-account/edit-address/');
    await expect(page.locator('.u-column2 col-2.woocommerce-Address')).toBeVisible();
    await page.getByText('Изменить Адрес доставки').click();
    await page.screenshot({path:'change.png', fullPage:true});

});