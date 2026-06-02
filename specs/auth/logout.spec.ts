import {test,expect} from '@playwright/test'
import { LoginPage } from '../../pages/login.page';
import users from '../../test-data/users.json' 

test('Успешный логаут @smoke', async ({page, context})=>{
    await context.clearCookies();
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.zigmund.userEmail,users.zigmund.password);
    await expect(page).toHaveURL('https://localhost/my-account/');
    const logoutLink = await page.locator('.woocommerce-MyAccount-navigation-link--customer-logout a').getAttribute('href');
    await page.goto(logoutLink!);
    await expect(page.locator('#user_login')).toBeVisible();
});