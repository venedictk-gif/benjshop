import {test,expect} from '../../fixtures/shop.fixture';
import { ProductPage } from '../../pages/product.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { CartPage } from '../../pages/cart.page';
import products from '../../test-data/products.json'

test('Проверка нотификации при оформлении заказа ui @smoke', async ({shopPage,page})=> {
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const cartPage= new CartPage(page);
    await shopPage.open(77)
    await expect(productPage.itemPrice).toContainText(products.punchingBag.price);
    await expect(productPage.itemDesc).toContainText(products.punchingBag.fullDescription);
    await productPage.addItemToCart();
    await page.getByText('Корзина').first().click();
    await expect(page.getByText('Боксерская груша')).toBeVisible();
    await cartPage.checkoutButton.click();
    await checkoutPage.addressBillCheck.check();
    await page.getByRole('button', { name: 'Оформить заказ' }).click();
    await expect(page).toHaveURL(/.*order-received/);
    await page.screenshot({path:"321.png",fullPage:true});
    await expect(page.getByText('Ваш заказ принят. Благодарим вас. ')).toBeVisible();
});