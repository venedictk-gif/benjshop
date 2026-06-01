import { test as base, expect } from '@playwright/test'; 
import {ProductPage} from '../pages/product.page';

type ProductFixtures = { 
  productPage: ProductPage; 
};

export const test = base.extend<ProductFixtures>({ 
  productPage: [async ({ page }, use) => {  
    await page.goto('https://localhost/shop/punchingbag/');
    const productPage = new ProductPage(page);
    await use(productPage);
  }, { auto: false }], 
});

export { expect };