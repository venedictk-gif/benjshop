import {Page,Locator} from '@playwright/test';

/*

4. Создать POM для страницы оформления заказа 
Конкретно: Создать pages/checkout.page.ts. Локаторы: поля формы (имя, фамилия, адрес, город, индекс, телефон), кнопка «Подтвердить заказ». Методы: fillBillingForm(), placeOrder().
Результат: POM для чекаута работает, тест использует POM вместо прямых локаторов.
*/
export class CheckoutPage {
    readonly page=Page;
    readonly firstNameInput:Locator;
    readonly lastNameInput:Locator;
    readonly countryDropdown:Locator;
    readonly addressInput:Locator;
    readonly cityInput:Locator;
    readonly regionInput:Locator;
    readonly indexInput:Locator;
    readonly phoneInput:Locator;
    readonly addressBillCheck:Locator;
    readonly orderButton:Locator

constructor (page:Page) {
    this.page=page;
    this.firstNameInput=page.getByLabel('Имя');
    this.lastNameInput=page.getByLabel('Фамилия');
    this.countryDropdown=page.locator('#shipping-country');
    this.addressInput=page.locator('#shipping-address_1');
    this.cityInput=page.getByLabel('Населённый пункт');
    this.regionInput=page.getByLabel('Область / район');
    this.indexInput=page.getByLabel('Почтовый индекс');
    this.phoneInput=page.getByLabel('Телефон (дополнительно)')
    this.orderButton=page.locator('.wc-block-components-button');
    this.addressBillCheck=page.locator('#checkbox-control-1')
}
async fillBillngForm(firstName:string,lastName:string,option:string,address:string,city:string,region:string,index:string,phone:string): Promise<void>{
    this.firstNameInput.fill(firstName);
    this.lastNameInput.fill(lastName);
    this.countryDropdown.selectOption(option);
    this.addressInput.fill(address);
    this.cityInput.fill(city);
    this.regionInput.fill(region);
    this.indexInput.fill(index);
    this.phoneInput.fill(phone);
}
async placeOrder(): Promise<void>{
    await this.orderButton.click();
}
}