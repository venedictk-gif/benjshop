import {Page, Locator} from '@playwright/test';

export class ProductPage {
    readonly page:Page;
    readonly itemName:Locator;
    readonly itemPrice:Locator;
    readonly oldPrice:Locator;
    readonly newPrice:Locator;
    readonly itemDesc:Locator;
    readonly addToCart:Locator;
    readonly countInput:Locator;
    readonly variationPrice:Locator;
    readonly reviews:Locator;
    readonly comment:Locator;

constructor (page:Page){
    this.page=page;
    this.itemName = page.locator('.wp-block-column .wp-block-post-title')
    this.itemPrice = page.locator('.wp-block-column .woocommerce-Price-amount')
    this.oldPrice = page.locator('del .woocommerce-Price-amount');
    this.newPrice  = page.locator('ins .woocommerce-Price-amount');
    this.itemDesc = page.locator('.woocommerce-Tabs-panel--description');
    this.addToCart = page.locator('.single_add_to_cart_button');
    this.countInput = page.locator('.wp-block-column .input-text');
    this.variationPrice = page.locator('.woocommerce-variation-price .woocommerce-Price-amount');
    this.reviews = page.getByRole('tab', { name: 'Отзывы (0)' })
    this.comment = page.locator('#comment')
}
async goto(productName:string): Promise<void> {
    await this.page.goto(`https://localhost/shop/${productName}`)
}
async addItemToCart(): Promise<void>{
    await this.addToCart.click();
}
async getPrice(): Promise<string> {
  const price = await this.itemPrice.textContent();
  return price?.trim() || '';
}
}