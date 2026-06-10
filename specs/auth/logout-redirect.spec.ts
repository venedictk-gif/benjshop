import {test,expect} from '@playwright/test'

/*2. Написать тест на проверку редиректа после логаута — 15 мин

Конкретно: Залогиниться, нажать «Выйти», проверить редирект на страницу логина и отсутствие доступа к /my-account/.*/

test('Проверка редиректа после логаута', async ({page})=> {
    await page.goto('/my-account/');
    await expect(page).toHaveURL('/my-account/');
    await page.getByRole('link', {name:'Выйти'}).first().click();
    await expect(page.locator('#user_login')).toBeVisible();
    await page.goto('/my-account/');
    await expect(page.locator('#user_login')).toBeVisible();
});