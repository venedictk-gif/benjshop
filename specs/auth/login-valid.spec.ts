import {test,expect} from '@playwright/test'
import { LoginPage } from '../../pages/login.page';
import users from '../../test-data/users.json' 

test('Успешный логин @smoke', async ({page, context})=>{
    await context.clearCookies();
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.zigmund.userEmail,users.zigmund.password);
    await expect(page).toHaveURL('https://localhost/my-account/');
});