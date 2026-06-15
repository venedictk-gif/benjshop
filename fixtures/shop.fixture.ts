import { test as base, expect } from '@playwright/test'; 
import {ShopPage} from '../pages/shop.page';

type ShopFixtures = { 
  shopPage: ShopPage; 
};

export const test = base.extend<ShopFixtures>({ 
  shopPage: [async ({ page }, use) => {  
    await page.goto('/shop/');
    await expect(page).toHaveURL(/.*shop/);
    // Очистить корзину
    await page.goto('/cart/');
    const removeButtons = page.locator('.wc-block-cart-item__remove-link');
    for (let i = 0; i < 10; i++) {
    if (await removeButtons.count() === 0) break;
    await removeButtons.first().click();
    await page.waitForTimeout(500);
  }
    await page.goto('/shop/');
    const shopPage = new ShopPage(page);
    await use(shopPage);
  }, { auto: false }], 
});

export { expect };