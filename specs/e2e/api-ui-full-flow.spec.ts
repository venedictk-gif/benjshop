/*E2E-тест (API + UI)
Создать товар через WooCommerce API → открыть его в магазине через UI → добавить в корзину → оформить заказ → через API проверить, что заказ появился в системе со статусом "processing".
*/
import {test,expect} from '../../fixtures/shop.fixture';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { ProductPage } from '../../pages/product.page';
import { LoginPage } from '../../pages/login.page';
import { getAuthHeader } from '../../utils/api';

test('Full flow api + ui @smoke', async ({request,shopPage,page, context})=> {
    const random = Math.floor(Math.random() * 100000);
    const username = `user${random}`;
    const email = `user${random}@mail.ru`;
    await context.clearCookies();
    const newCustomer = await request.post('/wp-json/wc/v3/customers', {
    headers: {
      'Authorization': getAuthHeader(),
    },
    data: {
    email: email,
    first_name: "Zigmund90",
    last_name: "Freid111",
    role: 'user',
    username: username,
    password: "Zigmund67!1",
    confirm_password: "Zigmund67!",
    },
  });
    const body0 =  await newCustomer.json();
    //console.log(body0);
    expect(newCustomer.status()).toBeTruthy();
    expect(body0).toHaveProperty('id');
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email,"Zigmund67!1");
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const productPage = new ProductPage(page);
    const newProduct = await request.post('/wp-json/wc/v3/products', {
        headers:{
            'Authorization':getAuthHeader()
        },
        data:{
            name: 'Теннисные ракетки',
            regular_price: '5999',
            type: 'simple',
            description: 'Ракетки для игры в теннис',
            short_description: 'Ракетки',
        },
    });
    const body = await newProduct.json();
    //console.log(body);
    expect(body).toHaveProperty('id');
    expect(newProduct.status()).toBeTruthy();
    await page.goto('https://localhost/shop')
    await page.getByRole('link',{name:'Теннисные ракетки'}).first().click();
    await productPage.addItemToCart();
    await page.getByRole('link',{name:'Корзина'}).click();
    await cartPage.goToCheckout();
    await checkoutPage.addressBillCheck.check();
    await checkoutPage.fillBillngForm('Андрей','Бутов','Россия','ул. Фехтовальщиков, д. 5','Жуковский','Рязанская область','123412','71231231212');
    //await page.screenshot({ path: 'after-order.png', fullPage: true });
    await page.getByRole('button', { name: 'Оформить заказ' }).click();
    await expect(page).toHaveURL(/.*order-received/);
    //ID заказа из URL
    const orderId = page.url().match(/order-received\/(\d+)/)?.[1];
    console.log('Order ID:', orderId);
    const getOrder = await request.get(`/wp-json/wc/v3/orders/${orderId}`,{
        headers:{
            'Authorization':getAuthHeader()
        },
    });
    const body1 = await getOrder.json();
    //пconsole.log(body1);
    expect(getOrder.status()).toBeTruthy();
    expect(body1.status).toBe('processing');
    const productId = body.id;
    const delProduct = await request.delete(`/wp-json/wc/v3/products/${productId}`, {
  headers: {
    'Authorization':getAuthHeader()
  },
  params: {
    force: true,
  },
});
    expect(delProduct.status()).toBe(200);
});
