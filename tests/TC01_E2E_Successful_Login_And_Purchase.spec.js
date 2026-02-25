 const { test } = require('@playwright/test')
 const { LoginPage } = require('../pages/LoginPage')
 const { ShopPage } = require('../pages/ShopPage')
 const { CheckoutPage } = require('../pages/CheckoutPage')
 const { PurchasePage } = require('../pages/PurchasePage')
 const testData = require("../testData/testData.json")



 testData.forEach((data,index) => {
 test(`E2E Successful Login And Purchase_TestData ${index+1}`, async({page}) =>{
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);
    const checkoutPage = new CheckoutPage(page);
    const purchasePage = new PurchasePage(page);

    //Navigate to the login page and login as admin
    await loginPage.navigate();
    await loginPage.loginAsAdmin(data.valid_username, data.valid_password, data.role);

    //Add products in shop page and checkout
    await shopPage.addProducts(data.products);
    await shopPage.checkout();

    //checkout in checkout page
    await checkoutPage.checkout();

    //Add country in purchase page and purchase
    await purchasePage.selectCountry(data.firstThreeLettersOfCountry, data.fullCountryName);
    await purchasePage.acceptTermsAndConditions();
    await purchasePage.purchase();

 });
});