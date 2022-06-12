export default class LoginPage {
    getEmailInput() {
        return cy.get('input.email.ember-text-field')
    }
    typeEmail(email) {
        return this.getEmailInput().type(email)
    }
    getPasswordInput() {
        return cy.get('input.password.ember-text-field')
    }
    typePassword(password) {
        return this.getPasswordInput().type(password)
    }
    getLoginButton() {
        return cy.get('button.login.gh-btn.gh-btn-login.gh-btn-block.gh-btn-icon.js-login-button.ember-view')
    }
    clickLoginButton() {
        return this.getLoginButton().click()
    }
    login(email, password) {
        this.typeEmail(email);
        this.typePassword(password);
        this.clickLoginButton();
    }
}