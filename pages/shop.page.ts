import {Page, Locator, expect} from '@playwright/test';

export class ShopPage {
    readonly page:Page;
    readonly shopTitle:Locator;
    readonly itemsList:Locator;
    readonly cartButton:Locator;
    readonly productCard:Locator
    readonly cartBadge:Locator

constructor (page:Page) {
    this.page=page;
    this.shopTitle = page.getByRole('heading', {name: 'Магазин'});
    this.itemsList = page.locator('[data-block-name="woocommerce/product-template"]');
    this.cartButton = page.getByText('Корзина').first();
    this.productCard = page.locator('.wc-block-product');
    this.cartBadge = page.locator('.wc-block-mini-cart__badge');
}   
async goto(): Promise<void> {
    await this.page.goto('http://localhost:8080/shop/');
}
async getProductCount(): Promise<number> {
    return await this.productCard.count();
}
async open(productId:number): Promise<void>{
    await this.page.locator(`li[data-wp-key="product-item-${productId}"] h2 a`).click();
}
async addItemToCart(productId: number): Promise<void> {
    await this.page.locator(`button[data-product_id="${productId}"]`).click();
}
async getProductPrice(productId: number): Promise<string> {
  const price = await this.page.locator(`li[data-wp-key="product-item-${productId}"] .woocommerce-Price-amount`).textContent();
  return price?.trim() || '';
}
async goToCart(): Promise<void>{
    await this.cartButton.click();
}
}




