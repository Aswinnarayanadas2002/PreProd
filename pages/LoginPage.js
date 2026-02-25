const { expect } = require('@playwright/test')

exports.LoginPage = class LoginPage {

    constructor(page){

         
        //Login Page Locators
        this.userNameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.adminRadioButton = page.locator('input[value="admin"]');
        this.userRadioButton = page.locator('input[value="user"]');
        this.roleDropdown = page.locator('select[class="form-control"]');
        this.termsCheckbox = page.locator('#terms');
        this.signInbutton = page.locator('#signInBtn');

        //User Popup Locators
        this.userPopupMessage = page.locator('.modal-body p');
        this.userPopupCancelButton = page.locator('#cancelBtn');
        this.userPopupOkayButton = page.locator('#okayBtn');

        //Invalid Login Error Message Locator
        this.invalidLoginErrorMessage = page.locator('.alert-danger');
    }

    async navigate(){
        //Navigate to url
        await this.page.goto(
            "https://rahulshettyacademy.com/loginpagePractise/",
            { waitUntil: 'domcontentloaded' }
        );
        
    }

    async enterUserNameAndPassword(username, password){
        //Enter username
        await this.userNameInput.click();
        await this.userNameInput.fill(username);

        //Enter password
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
    }

    async selectRole(role){
        //Select Role
        await this.roleDropdown.selectOption(role);
    }

    async agreeTerms(){
        await this.termsCheckbox.click();
    }

    async signIn(){
        //SignIn
        await this.signInbutton.click();
    }

    //Verify Invalid Login Message
    async verifyInvalidLoginErrorMessage(){
        await expect(this.invalidLoginErrorMessage).toBeVisible();
        await expect(this.invalidLoginErrorMessage).toContainText('Incorrect username/password.');
        await expect(this.invalidLoginErrorMessage).toBeHidden();
    }

    //Login as Admin
    async loginAsAdmin(username, password, role){
        await this.enterUserNameAndPassword(username,password);
        await this.adminRadioButton.click();
        await this.selectRole(role);
        await this.agreeTerms();
        await this.signIn();
    }

    //Login as User 
    async loginAsUser(username, password, role){
        await this.enterUserNameAndPassword(username,password);
        await this.userRadioButton.click();
        //Verify the User Popup Message
        await expect(this.userPopupMessage).toBeVisible();
        await this.userPopupOkayButton.click();
        await this.selectRole(role);
        await this.agreeTerms();
        await this.signIn();
    }


}