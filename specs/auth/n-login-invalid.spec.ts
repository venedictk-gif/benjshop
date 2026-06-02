import {test,expect} from '@playwright/test'
import { LoginPage } from '../../pages/login.page';
import users from '../../test-data/users.json' 

test('Неверные данные при авторизации @regression', async ({page, context})=>{
    await context.clearCookies();
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.zigmund.userEmail,users.wrongPassword);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('неверен');
});