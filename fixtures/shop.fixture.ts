import { test as base, expect } from '@playwright/test'; 
import {ShopPage} from '../pages/shop.page';

type ShopFixtures = { 
  shopPage: ShopPage; 
};

export const test = base.extend<ShopFixtures>({ 
  shopPage: [async ({ page }, use) => {  
    await page.goto('/shop/');
    await expect(page).toHaveURL(/.*shop/);
    const shopPage = new ShopPage(page);
    await use(shopPage);
  }, { auto: false }], 
});

export { expect };