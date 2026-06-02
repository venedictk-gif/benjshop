import {test,expect} from '@playwright/test'
import users from '../../test-data/users.json' 
import { LoginPage } from '../../pages/login.page';
test('Восстановление пароля @smoke @regression', async ({page, context})=>{
    await context.clearCookies();
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.recoveryLink.click();
    await expect(page).toHaveURL('https://localhost/wp-login.php?action=lostpassword');
    await page.locator('#user_login').fill(users.zigmund.userEmail);
    await page.locator('#wp-submit').click();
    await expect(page).toHaveURL('https://localhost/wp-login.php?checkemail=confirm');
    await expect(page.getByText('Проверьте вашу почту для ссылки с подтверждением')).toBeVisible();
});


