import {test,expect} from '@playwright/test'
import users from '../../test-data/users.json' 

test('Неверные данные при авторизации', async ({page, context})=>{
    await context.clearCookies();
    await page.goto('https://localhost/wp-login.php');
    await page.locator('.wp-login-lost-password').click();
    await expect(page).toHaveURL('https://localhost/wp-login.php?action=lostpassword');
    await page.locator('#user_login').fill(users.zigmund.userEmail);
    await page.locator('#wp-submit').click();
    await expect(page).toHaveURL('https://localhost/wp-login.php?checkemail=confirm');
    await expect(page.getByText('Проверьте вашу почту для ссылки с подтверждением')).toBeVisible();
});