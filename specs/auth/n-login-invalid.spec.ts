import {test,expect} from '@playwright/test'
import users from '../../test-data/users.json' 

test('Неверные данные при авторизации', async ({page, context})=>{
    await context.clearCookies();
    await page.goto('https://localhost/wp-login.php');
    await page.locator('#user_login').fill(users.zigmund.userEmail);
    await page.locator('#user_pass').fill(users.wrongPassword);
    await page.locator('#wp-submit').click();
    await expect(page.getByText('Ошибка: Введённый вами пароль для адреса zigmundFreid@mail.ru неверен.')).toBeVisible();
});