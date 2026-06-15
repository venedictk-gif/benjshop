import {test,expect} from '../../fixtures/shop.fixture'

test ('Проверка сортировки товаров по цене через UI', async ({shopPage,page})=> {
    //Выбрать сортировку «По возрастанию цены»
    await page.locator('.orderby').selectOption('price');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'debug-sort.png', fullPage: true });
    //Собрать все цены со страницы
    const priceElements = page.locator('.woocommerce-Price-amount');
    const prices = await Promise.all(
    (await priceElements.all()).map(async (el)=> await el.textContent()));
    //Очистить от валюты и пробелов, преобразовать в числа
  const numericPrices = prices
    .map(p => p?.replace(/[^0-9,]/g, '').replace(',', '.') || '0')
    .map(Number);

    //Проверить, что массив не пустой
    expect(numericPrices.length).toBeGreaterThan(0);
    console.log('Цены как строки:', prices);
    console.log('Цены как числа:', numericPrices);
    //Проверить, что цены идут по возрастанию
    for (let i = 0; i < numericPrices.length - 1; i++) {
    expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i + 1]);
  }
});