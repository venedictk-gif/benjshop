//Создать POM для страницы оформления заказа
import {Page,Locator} from '@playwright/test';

export class CheckoutPage {
    readonly page:Page;
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
    readonly orderConfirmButton:Locator;

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
    this.orderConfirmButton=page.getByRole('button', { name: 'Оформить заказ' })
    this.addressBillCheck=page.locator('#checkbox-control-1')
}
async fillBillngForm(firstName:string,lastName:string,option:string,address:string,city:string,region:string,index:string,phone:string): Promise<void>{
  await this.firstNameInput.fill(firstName);
  await this.lastNameInput.fill(lastName);
  await this.countryDropdown.selectOption(option);
  await this.addressInput.fill(address);
  await this.cityInput.fill(city)
  await this.regionInput.fill(region);
  await this.indexInput.fill(index);
  await this.phoneInput.fill(phone);
}
async clearBillingForm(): Promise<void> {
  await this.firstNameInput.clear();
  await this.lastNameInput.clear();
  await this.addressInput.clear();
  await this.indexInput.clear();
  await this.phoneInput.clear();
}
async placeOrder(): Promise<void>{
    await this.orderButton.click();
}
}