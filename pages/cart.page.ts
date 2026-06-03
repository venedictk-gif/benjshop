// POM для страницы корзины 
import {Page,Locator} from '@playwright/test';

export class CartPage {
    readonly page:Page;
    readonly cartItems:Locator;
    readonly cartItemPrice:Locator;
    readonly cartTotalPrice:Locator;
    readonly cartItemCount:Locator;
    readonly removeButton:Locator;
    readonly checkoutButton:Locator;


constructor (page:Page){
    this.page=page;
    this.cartItems=page.locator('tr.wc-block-cart-items__row');
    this.cartItemPrice=page.locator('.wc-block-cart-item__total .wc-block-components-product-price__value');
    this.cartTotalPrice=page.locator('.wc-block-components-totals-footer-item-tax-value');
    this.cartItemCount=page.locator('.wc-block-components-quantity-selector__input');
    this.removeButton=page.locator('.wc-block-cart-item__remove-link');
    this.checkoutButton=page.getByText('Перейти к оформлению заказа');
}
async getItemCount(): Promise<number> {
    return await this.cartItemCount.count();
}
async removeItem(productName: string): Promise<void> {
  await this.page.locator('.wc-block-cart-items__row', { hasText: productName }).locator('.wc-block-cart-item__remove-link').click();
}
async goToCheckout(): Promise<void>{
    await this.checkoutButton.click();
}
}

