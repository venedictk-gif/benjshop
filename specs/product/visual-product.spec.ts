import {test,expect} from '../../fixtures/product.fixture';
/*
визуальный тест для страницы товара 
Открыть товар «Боксерская груша»
Сделать скриншот и сравнить с эталоном через toHaveScreenshot
*/
test('Визуальный тест для страницы товара', async ({productPage,page})=> {
    await expect(page).toHaveScreenshot('product-item.png');
});