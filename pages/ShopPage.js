const { expect } = require('@playwright/test')

exports.ShopPage = class ShopPage{

    constructor(page){

        this.page = page;

        //Locators
        this.productCards = page.locator('.card');
        this.checkoutButton = page.locator('.btn-primary');
    }

    async addProducts(productName){
        //Assert cards are displayed
        await expect(this.productCards.last()).toBeVisible();

        //Count the cards
        const count = await this.productCards.count();

        //Select the product
        for(let i = 0; i < count; i++){
            const name = await this.productCards.nth(i).locator('.card-title').textContent();
            if(productName.includes(name.trim())){
                await this.productCards.nth(i).locator('.btn-info').click();
                
            }
        }

    }

    async checkout(){
        //checkout
        await this.checkoutButton.click();
    }
}