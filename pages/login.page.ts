import {Page,Locator, expect} from '@playwright/test'

export class LoginPage {
    readonly page:Page;
    readonly loginInput:Locator;
    readonly passInput:Locator;
    readonly loginButton:Locator;
    readonly errorMessage:Locator;
    readonly recoveryLink:Locator;

constructor (page:Page) {
    this.page=page;
    this.loginInput=page.locator('#user_login');
    this.passInput=page.locator('#user_pass');
    this.loginButton=page.locator('#wp-submit');
    this.errorMessage=page.locator('#login_error');
    this.recoveryLink=page.locator('.wp-login-lost-password');    
}
async goto(): Promise<void>{
    await this.page.goto('https://localhost/wp-login.php'); 
}
async login(login:string,password:string): Promise<void>{
    await this.loginInput.fill(login);
    await this.passInput.fill(password);
    await this.loginButton.click();
}
async getErrorMessage(): Promise<string> {
  await this.errorMessage.waitFor({ state: 'visible' });
  return (await this.errorMessage.textContent()) || '';
}
}