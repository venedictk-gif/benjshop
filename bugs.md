1.ошибка order-status.spec.ts
{
    "code": "rest_invalid_param",
    "message": "Неверный параметр: status",
    "data": {
        "status": 400,
        "params": {
            "status": "status не принадлежит к auto-draft, pending, processing, on-hold, completed, cancelled, refunded, failed и checkout-draft."
        },
        "details": {
            "status": {
                "code": "rest_not_in_enum",
                "message": "status не принадлежит к auto-draft, pending, processing, on-hold, completed, cancelled, refunded, failed и checkout-draft.",
                "data": null
            }
        }
    }
}
Причина: complete вместо completed

2.ошибка ajax 
Во многих тестах (addItemToCart) ajax не успевает подгрузить страницу или локаторы
Решение : добавлены таймауты

3.ошибка сессионной куки в в api-ui-full-flow.spec.ts
в кнопках «В корзину» имеюются nonce токены, привязанные к сессии пользователя(AJAX):

<button data-product_id="77" data-wp-on--click="actions.addCartItem">
Сама кнопка не содержит nonce, но JavaScript-обработчик WooCommerce берёт его из глобальной переменной wc_cart_fragments_params или из данных мини-корзины.

await context.clearCookies();
// Создание пользователя через API
const newCustomer = await request.post('/wp-json/wc/v3/customers', {})
// Логин через UI
await page.goto('https://localhost/wp-login.php');
await page.locator('#user_login').fill(email);
await page.locator('#user_pass').fill(users.zigmund.password);
await page.locator('#wp-submit').click();
// Сразу после логина:
await page.goto('https://localhost/shop');
await page.getByRole('link',{name:'Абв'}).first().click();
await productPage.addItemToCart(); // ← ПАДАЛО: товар не добавлялся

Причина: 
После #wp-submit.click() WordPress отправлял POST-запрос на /wp-login.php, сервер аутентифицировал пользователя и делал редирект на /wp-admin/ или /my-account/. Playwright ждал завершения навигации, но проблема была в том, что сразу выполнялся page.goto('/shop') и клик «В корзину».
clearCookies()` удалял сессионную куку `woocommerce_session_*` и связанные с ней nonce-токены. После ручного логина WordPress восстанавливал куки авторизации, но WooCommerce-виджеты не успевали инициализироваться до первого AJAX-запроса — JS ещё не отработал, nonce не обновились, требовалась перезагрузка страницы.

Решение: использовать POM LoginPage

const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login(email, "Zigmund67!1");

Почему работает: 
заменил прямые локаторы на `LoginPage.login()`.LoginPage.login() делает fill + click, POM-метод дожидается завершения редиректа после логина, что гарантирует полную загрузку страницы, генерацию nonce токенов и инициализацию WooCommerce-виджетов.

4.ошибка с переходом на страницу Оформления заказа в тесте (header-links.spec.ts)
При переходе на страницу Оформления заказа структура страницы менялась и поэтому тест падал при попытке перейти на следующую вкладку хидера (Пример страницы)
Решение: Поставить Оформление заказа в конец массива 
5.ошибка сортировки товаров по цене в WooCommerce (баг на стороне wooCommerce sort-price-ui.spec.ts)
При сортировке `price` (по возрастанию) товар с ценой 1000 отображается перед товаром с ценой 799.
WooCommerce использует строковое сравнение цен вместо числового.
Цены как строки: [
  '299,00 ₽', '499,00 ₽',
  '599,00 ₽', '699,00 ₽',
  '699,00 ₽', '1000,00 ₽',
  '799,00 ₽', '1000,00 ₽',
  '799,00 ₽', '1000,00 ₽',
  '799,00 ₽', '1000,00 ₽',
  '799,00 ₽', '1000,00 ₽',
  '799,00 ₽', '1000,00 ₽',
  '799,00 ₽', '899,00 ₽',
  '999,00 ₽', '999,00 ₽',
  '999,00 ₽', '1299,00 ₽'
]
Цены как числа: [
   299,  499,  599,  699,  699,
  1000,  799, 1000,  799, 1000,
   799, 1000,  799, 1000,  799,
  1000,  799,  899,  999,  999,
   999, 1299
]



