export default class AdminPage {
    constructor(port) {
        this.port = port;
    }
    signOut() {
        cy.get("svg.w3.mr1.fill-darkgrey").click();
        cy.wait(1000);
        cy.get('a[href="#/signout/"]').click();
        cy.wait(1000);
    }
    navigateToTags() {
        cy.visit(`http://localhost:${this.port}/ghost/#/tags`);
        cy.wait(2000);
    }
    navigateToInternalTags() {
        cy.visit(`http://localhost:${this.port}/ghost/#/tags?type=internal`);
        cy.wait(2000);
    }
}
