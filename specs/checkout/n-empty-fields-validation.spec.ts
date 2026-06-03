import {test,expect} from '../../fixtures/shop.fixture'
import { CheckoutPage } from '../../pages/checkout.page'
import { CartPage } from '../../pages/cart.page';

test('Валидация ошибок у формы', async ({shopPage, page})=>{
  const checkoutPage = new CheckoutPage(page);
  const cartPage = new CartPage(page)
  await expect(page).toHaveURL(/shop/);
  await shopPage.addItemToCart(77);
  await shopPage.goToCart();
  await page.waitForTimeout(2000);
  await cartPage.goToCheckout();
  await checkoutPage.addressBillCheck.check();
  await checkoutPage.changeAddressButton.click();
  await checkoutPage.clearBillingForm();
  await checkoutPage.fillBillngForm('','','Россия','','','','','');
  await checkoutPage.placeOrder();
  await expect(page.getByText('Укажите действительный имя')).toBeVisible();
  await expect(page.getByText('Укажите действительный фамилия')).toBeVisible();
  await expect(page.getByText('Укажите действительный адрес')).toBeVisible();
  await expect(page.getByText('Укажите действительный населённый пункт')).toBeVisible();
  await expect(page.getByText('Укажите действительный область / район')).toBeVisible();
  await expect(page.getByText('Укажите действительный почтовый индекс')).toBeVisible();
});