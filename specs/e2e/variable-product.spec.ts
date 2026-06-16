import {test,expect} from '../../fixtures/shop.fixture'
import { getAuthHeader } from '../../utils/api'
import { ProductPage } from '../../pages/product.page';
/*
Тест на проверку страницы товара с вариациями 
Создать товар с атрибутами (размер, цвет) через API
Открыть товар, проверить, что вариации отображаются
Выбрать вариацию, проверить изменение цены
*/
test('Проверка вариаций товара', async ({request,shopPage,page})=> {
    const productPage = new ProductPage(page);
    const newProduct = await request.post('/wp-json/wc/v3/products', {
        headers: {
            'Authorization': getAuthHeader()
        },
        data: {
            name: "Бейсболка с принтом",
            type: "variable",
            description: "Описание товара",
            attributes: [
    {
      id: 0,
      name: "Размер",
      position: 0,
      visible: true,
      variation: true,
      options: ["S", "M", "L"]
    },
    {
      id: 0,
      name: "Цвет",
      position: 1,
      visible: true,
      variation: true,
      options: ["Красный", "Синий"] 
        }]}
        });
        const body = await newProduct.json();
        expect(newProduct.status()).toBe(201);
        //console.log(body);
        const productId=body.id
        const addVariation1 = await request.post(`/wp-json/wc/v3/products/${productId}/variations`, {
                    headers:{
                    'Authorization': getAuthHeader()
                    },
                    data:{
                        
            regular_price: "1500",
            attributes: [
            {
            name: "Размер",
            option: "S"
            },
            {
            name: "Цвет",
            option: "Красный"
            }]}                   
        });
        await expect(addVariation1.status()).toBeTruthy();
        const addVariation2 = await request.post(`/wp-json/wc/v3/products/${productId}/variations`, {
                    headers:{
                    'Authorization': getAuthHeader()
                    },
                    data:{
                        
            regular_price: "1700",
            attributes: [
            {
            name: "Размер",
            option: "M"
            },
            {
            name: "Цвет",
            option: "Красный"
            }]}                   
        });
        await expect(addVariation2.status()).toBeTruthy();
        await page.waitForTimeout(1000);
        await shopPage.searchItem('Бейсболка с принтом');     
        await shopPage.open(productId);
        await page.getByLabel('Размер').selectOption('S');
        await page.getByLabel('Цвет').selectOption('Красный');
        await page.waitForTimeout(1000);
        const priceBefore = await productPage.variationPrice.textContent();
        await page.getByLabel('Размер').selectOption('M');
        await page.waitForTimeout(1000);
        const priceAfter = await productPage.variationPrice.textContent();
        expect(priceAfter).not.toBe(priceBefore);
        const delProduct = await request.delete('//wp-json/wc/v3/products/${productId}', {
                            headers:{
                    'Authorization': getAuthHeader()
        }});
        await expect(delProduct.status()).toBeTruthy();
});

