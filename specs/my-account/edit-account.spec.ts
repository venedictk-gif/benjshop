import {test,expect} from '@playwright/test';
/*
Тест на проверку страницы «Мой аккаунт» — детали аккаунта 
Залогиниться, перейти в /my-account/edit-account/
Проверить, что поля имя, фамилия, email заполнены
Изменить имя, сохранить, проверить обновление
*/
test('Проверка страницы «Мой аккаунт» — детали аккаунта', async ({page})=> {
    await page.goto('/my-account/edit-account');
    await expect(page.locator('#account_first_name')).not.toBeEmpty();
    await expect(page.locator('#account_last_name')).not.toBeEmpty();
    await expect(page.locator('#account_email')).not.toBeEmpty();
    await page.locator('#account_first_name').fill('ZigmundZigmund');
    await page.getByText('Сохранить изменения').click();
    await expect(page.locator('#account_first_name')).toHaveValue('ZigmundZigmund')
});