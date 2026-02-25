const { expect } = require('@playwright/test')

exports.PurchasePage = class PurchasePage{

    constructor(page) {
        
        this.page = page;

        //Locators
        this.countryInput = page.getByRole('textbox', { name: 'Please choose your delivery' });
        this.countrySuggestions = page.locator('div.suggestions');
        this.termsAndConditionsCheckbox = page.getByText('I agree with the term &');
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
        this.successMessage = page.locator('div.alert-success');
    }

    async selectCountry(countryFirstThreeLetters, FullCountryName){

        await this.countryInput.click();
        await this.countryInput.type(countryFirstThreeLetters);

        await expect(this.countrySuggestions.last()).toBeVisible();

        await this.page.getByText(FullCountryName).click();
        
        await expect.soft(this.countrySuggestions.last()).toBeHidden();

    }

    async acceptTermsAndConditions(){

        await this.termsAndConditionsCheckbox.click();
    }

    async purchase(){
        await this.purchaseButton.click();
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('Success!');

    }

    async completePurchase(countryFirstThreeLetters, FullCountryName){
        await this.selectCountry(countryFirstThreeLetters, FullCountryName);
        await this.acceptTermsAndConditions();
        await this.purchase();

    }
}