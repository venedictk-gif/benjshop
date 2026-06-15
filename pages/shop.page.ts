import {Page, Locator, expect} from '@playwright/test';

export class ShopPage {
    readonly page:Page;
    readonly shopTitle:Locator;
    readonly itemsList:Locator;
    readonly cartButton:Locator;
    readonly miniCartButton:Locator;
    readonly productCard:Locator;
    readonly cartBadge:Locator;
    readonly searchInput:Locator;
    readonly searchButton:Locator;
    readonly orderByDropDown:Locator;

constructor (page:Page) {
    this.page=page;
    this.shopTitle = page.getByRole('heading', {name: 'Магазин'});
    this.itemsList = page.locator('[data-block-name="woocommerce/product-template"]');
    this.cartButton = page.getByText('Корзина').first();
    this.miniCartButton = page.locator('.wc-block-mini-cart__button');
    this.productCard = page.locator('.wc-block-product');
    this.cartBadge = page.locator('.wc-block-mini-cart__badge');
    this.searchInput = page.getByPlaceholder('Искать товары…');
    this.searchButton = page.locator('.wp-block-search__button');
    this.orderByDropDown = page.locator('.orderby')
}   
async goto(): Promise<void> {
    await this.page.goto('https://localhost/shop/');
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
async orderBy(option:string): Promise<void>{
    await this.orderByDropDown.selectOption(option);
}
async searchItem(itemName:string): Promise<void>{
    await this.searchInput.fill(itemName);
    await this.searchButton.click();
}
}




