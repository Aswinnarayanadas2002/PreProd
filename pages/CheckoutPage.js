const { expect } = require('@playwright/test')

exports.CheckoutPage = class CheckoutPage{

    constructor(page){

        this.page = page;

        //Locators
        this.checkoutButton = page.locator('.btn-success');
    }

    async checkout(){
        await expect(this.checkoutButton).toBeVisible();
        await this.checkoutButton.click();
    }

}