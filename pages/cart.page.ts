/*1. Создать POM для страницы корзины 
Конкретно: Создать pages/cart.page.ts. 
Локаторы: список товаров, название товара в корзине, цена, количество, кнопка «Удалить», кнопка «Оформить заказ». 
Методы: getItemCount(), removeItem(name), goToCheckout().
Результат:POM для корзины работает.*/

import {Page,Locator} from '@playwright/test';

export class CartPage {
    readonly page:Page;
    readonly cartItems:Locator;
    //readonly cartItemName:Locator;
    readonly cartItemPrice:Locator;
    readonly cartItemCount:Locator;
    readonly removeButton:Locator;
    readonly checkoutButton:Locator;

constructor (page:Page){
    this.page=page;
    this.cartItems=page.locator('tr.wc-block-cart-items__row');
    //this.cartItemName=page.locator('.wc-block-components-product-name');
    this.cartItemPrice=page.locator('.wc-block-cart-item__total .wc-block-components-product-price__value');
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

